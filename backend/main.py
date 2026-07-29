from fastapi import FastAPI

app = FastAPI(
    title="Workshop Management System",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "Workshop Management System API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}