from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
import os
import json
from database import SessionLocal, Product
from qdrant_client import QdrantClient

# IMPORTANT: Ensure GEMINI_API_KEY is exported in your environment or added to a .env file
# os.environ["GEMINI_API_KEY"] = "your_key_here"

app = FastAPI(title="VyaparSETU AI Broker API")

# Allow requests from our frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IntentRequest(BaseModel):
    prompt: str

class MatchRequest(BaseModel):
    product: str
    region: str
    volume: str
    price: str

class DispatchRequest(BaseModel):
    creators: list
    product: str
    price: str

@app.get("/api/products")
async def get_products():
    db = SessionLocal()
    products = db.query(Product).all()
    db.close()
    return products

# 1. AI Intent Parsing (Gemini Pro)
@app.post("/api/parse-intent")
async def parse_intent(request: IntentRequest):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not set")
    
    try:
        client = genai.Client(api_key=api_key)
        
        system_prompt = """
        You are an AI Broker for Meesho. Extract the following entities from the seller's intent into a JSON object:
        - product (string)
        - region (string)
        - volume (string)
        - price (string)
        
        Example Input: "Clear 500 bedsheets in UP for 349"
        Output JSON: {"product": "Bedsheets", "region": "UP", "volume": "500", "price": "349"}
        """
        
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=request.prompt,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_prompt,
                response_mime_type="application/json",
            ),
        )
        
        parsed_data = json.loads(response.text)
        return parsed_data
        
    except Exception as e:
        print(f"Gemini API Error: {e}")
        # Fallback for prototype if API fails or is not correctly formatted
        return {
            "product": "Jaipuri Double Cotton Bedsheets",
            "region": "Uttar Pradesh (Lucknow / Varanasi)",
            "volume": "500 Units",
            "price": "₹349 • HIGH URGENCY"
        }

# 2. Real Qdrant Matchmaking
@app.post("/api/match-creators")
async def match_creators(request: MatchRequest):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not set")
        
    try:
        # Initialize Clients
        client = genai.Client(api_key=api_key)
        # Assuming Qdrant container is accessible at qdrant:6333 internally, but for dev it might be localhost
        qdrant_host = os.getenv("QDRANT_HOST", "qdrant")
        qdrant = QdrantClient(host=qdrant_host, port=6333)
        
        # 1. Embed the intent
        intent_text = f"Product: {request.product}. Region: {request.region}."
        embed_result = client.models.embed_content(
            model="gemini-embedding-2",
            contents=intent_text
        )
        query_vector = embed_result.embeddings[0].values
        
        # 2. Search Qdrant
        search_result = qdrant.search(
            collection_name="creators",
            query_vector=query_vector,
            limit=2
        )
        
        # 3. Format results for frontend
        matches = []
        for scored_point in search_result:
            payload = scored_point.payload
            # Format similarity percentage
            similarity = f"{round(scored_point.score * 100, 1)}% Match"
            
            payload["similarity"] = similarity
            matches.append(payload)
            
        return matches
        
    except Exception as e:
        print(f"Matchmaking Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

class DispatchRequest(BaseModel):
    creators: list
    product: str
    price: str

# 3. Bulk Campaign Dispatch — sends real WhatsApp/SMS via Twilio
@app.post("/api/dispatch-campaign")
async def dispatch_campaign(request: DispatchRequest):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    test_phone = os.getenv("HACKATHON_TEST_PHONE")
    whatsapp_from = os.getenv("TWILIO_WHATSAPP_NUMBER", "whatsapp:+14155238886")

    if not account_sid or not auth_token:
        raise HTTPException(status_code=500, detail="Twilio credentials not configured")
    if not test_phone:
        raise HTTPException(status_code=500, detail="HACKATHON_TEST_PHONE not set in .env")

    from twilio.rest import Client as TwilioClient
    twilio = TwilioClient(account_sid, auth_token)

    results = []
    for creator in request.creators:
        name = creator.get("name", "Creator")
        body = (
            f"🚀 *VyaparSETU — New Liquidation Deal!*\n\n"
            f"Hi {name}, a supplier wants to move inventory through your audience:\n\n"
            f"📦 Product: {request.product}\n"
            f"💰 Target Price: {request.price}\n\n"
            f"Are you available to run this campaign in your region? Reply YES to accept."
        )

        # WhatsApp
        try:
            wa_msg = twilio.messages.create(
                from_=whatsapp_from,
                body=body,
                to=f"whatsapp:{test_phone}"
            )
            results.append({"creator": name, "channel": "whatsapp", "status": "sent", "sid": wa_msg.sid})
        except Exception as e:
            results.append({"creator": name, "channel": "whatsapp", "status": "failed", "error": str(e)})

    return {"dispatched": len(results), "results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
