from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/practices")
def get_practices():
    return ["id", "date", "total yards", "notes"]