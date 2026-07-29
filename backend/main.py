from fastapi import FastAPI
from backend.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)


@app.get("/")
def root():
    return {"message": "Workshop Management System API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}