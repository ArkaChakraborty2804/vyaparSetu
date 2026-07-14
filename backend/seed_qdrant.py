import os
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from google import genai
import json

# Initialize Qdrant Client
qdrant_host = os.getenv("QDRANT_HOST", "qdrant")
qdrant = QdrantClient(host=qdrant_host, port=6333)
COLLECTION_NAME = "creators"

# Initialize Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("WARNING: GEMINI_API_KEY not set. Cannot seed Qdrant.")
    exit(1)
client = genai.Client(api_key=api_key)

def get_embedding(text):
    result = client.models.embed_content(
        model="gemini-embedding-2",
        contents=text
    )
    return result.embeddings[0].values

def seed_qdrant():
    # Recreate collection to ensure it's clean
    if qdrant.collection_exists(collection_name=COLLECTION_NAME):
        qdrant.delete_collection(collection_name=COLLECTION_NAME)

    # gemini-embedding-2 has 3072 dimensions
    qdrant.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=3072, distance=Distance.COSINE),
    )

    creators = [
        {
            "id": 1,
            "name": "Anjali Singh",
            "avatar": "https://i.pravatar.cc/150?u=anjali",
            "followers": "120K Followers",
            "region": "Uttar Pradesh (Lucknow, Varanasi)",
            "niche": "Home Decor, Traditional Wear, Budget Finds",
            "hook": "🎬 Reel Hook: Quick unfold of product showing premium quality.",
            "valueProps": "💎 High quality, direct from factory, fast shipping.",
            "payout": "💰 ₹15,000 Flat + 10% Rev Share",
            "phone": "+919876543210", # Mocked for now, will use twilio sandbox later
            "approved": True
        },
        {
            "id": 2,
            "name": "Priya Verma",
            "avatar": "https://i.pravatar.cc/150?u=priya",
            "followers": "85K Followers",
            "region": "Bihar (Patna, Gaya)",
            "niche": "Sarees, Kitchenware, Household Items",
            "hook": "🎬 Reel Hook: Close-up quality test and reaction.",
            "valueProps": "💎 Affordable price, great colors.",
            "payout": "💰 ₹11,000 Flat + 12% Rev Share",
            "phone": "+919876543211",
            "approved": True
        },
        {
            "id": 3,
            "name": "Rohan Tech",
            "avatar": "https://i.pravatar.cc/150?u=rohan",
            "followers": "200K Followers",
            "region": "Delhi NCR",
            "niche": "Electronics, Gadgets, TWS Earbuds",
            "hook": "🎬 Reel Hook: Unboxing and sound test.",
            "valueProps": "💎 Bass quality, battery life, budget price.",
            "payout": "💰 ₹25,000 Flat",
            "phone": "+919876543212",
            "approved": True
        }
    ]

    points = []
    print("Generating embeddings for creators...")
    for c in creators:
        # Create a rich text representation of the creator for the embedding model
        text_representation = f"Name: {c['name']}. Region: {c['region']}. Niche: {c['niche']}. Audience: {c['followers']}"
        print(f"Embedding: {text_representation}")
        
        vector = get_embedding(text_representation)
        
        points.append(PointStruct(
            id=c['id'],
            vector=vector,
            payload=c
        ))

    print("Uploading to Qdrant...")
    qdrant.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )
    
    print("Successfully seeded Qdrant Database with real Creator Embeddings!")

if __name__ == "__main__":
    seed_qdrant()
