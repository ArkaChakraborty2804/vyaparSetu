from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./meesho.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    category = Column(String, index=True)
    subCategory = Column(String)
    price = Column(Float)
    originalPrice = Column(Float)
    discount = Column(Integer)
    rating = Column(Float)
    reviews = Column(Integer)
    image = Column(String)
    badge = Column(String, nullable=True)
    freeDelivery = Column(Boolean, default=True)

# Create tables
Base.metadata.create_all(bind=engine)

# Seed Database
def seed_database():
    db = SessionLocal()
    if db.query(Product).first():
        db.close()
        return

    products = [
        {
            "id": "m101", "title": "Banarasi Kanjivaram Silk Woven Saree", "category": "women-ethnic", "subCategory": "Saree",
            "price": 699, "originalPrice": 1499, "discount": 53, "rating": 4.1, "reviews": 1240,
            "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80", "badge": "Bestseller", "freeDelivery": True
        },
        {
            "id": "m102", "title": "Women Rayon Anarkali Kurta Set", "category": "women-ethnic", "subCategory": "Kurta Sets",
            "price": 450, "originalPrice": 899, "discount": 49, "rating": 3.8, "reviews": 850,
            "image": "https://images.unsplash.com/photo-1583391733958-6c7827810dc1?w=400&q=80", "badge": "Trending", "freeDelivery": True
        },
        {
            "id": "m103", "title": "TWS Earbuds Bluetooth v5.3", "category": "electronics", "subCategory": "Audio",
            "price": 399, "originalPrice": 999, "discount": 60, "rating": 4.5, "reviews": 3200,
            "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", "badge": None, "freeDelivery": True
        }
    ]
    
    for p in products:
        db_product = Product(**p)
        db.add(db_product)
        
    db.commit()
    db.close()

seed_database()
