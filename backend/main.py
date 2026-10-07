from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/practices")
def get_practices():
    return [
        {"id": 1, "date": "2026-10-06", "total_yards": 4500, "notes": "Sprint free, felt fast"},
        {"id": 2, "date": "2026-10-08", "total_yards": 5000, "notes": "Endurance day, focused on pacing"},
    ]