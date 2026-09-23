from fastapi import FastAPI

from backend.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
)


@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}"}


@app.get("/health")
async def health():
    return {"status": "healthy"}