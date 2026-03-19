from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import registro
from app.database.db_config import engine, Base

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Hackathon API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(registro.router, prefix="/api/v1")
@app.get("/")
def home():
    return {}