import datetime
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from sqlmodel import Field, Session, SQLModel, create_engine, select


# ---------- Models ----------
class PracticeBase(SQLModel):
    date: datetime.date
    total_yards: int
    duration_min: int | None = None
    feel: int | None = None  # 1-5, how you felt
    notes: str = ""


class Practice(PracticeBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class PracticeCreate(PracticeBase):
    pass


class PracticeUpdate(SQLModel):
    date: datetime.date | None = None
    total_yards: int | None = None
    duration_min: int | None = None
    feel: int | None = None
    notes: str | None = None

# ---------- Database ----------
engine = create_engine("sqlite:///swim.db", connect_args={"check_same_thread": False})
SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


# ---------- App ----------
app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/practices")
def create_practice(practice: PracticeCreate, session: SessionDep):
    db_practice = Practice.model_validate(practice)
    session.add(db_practice)
    session.commit()
    session.refresh(db_practice)
    return db_practice

@app.get("/practices")
def get_practices(session: SessionDep):
    return session.exec(select(Practice)).all()

@app.get("/practices/{practice_id}")
def get_practice(practice_id: int, session: SessionDep):
    practice = session.get(Practice, practice_id)
    if not practice:
        raise HTTPException(status_code=404, detail="Practice not found")
    return practice

@app.delete("/practices/{practice_id}")
def delete_practice(practice_id: int, session: SessionDep):
    practice = session.get(Practice, practice_id)
    if not practice:
        raise HTTPException(status_code=404, detail="Practice not found")
    session.delete(practice)
    session.commit()
    return {"message": "Practice deleted"}

@app.patch("/practices/{practice_id}")
def update_practice(practice_id: int, practice_update: PracticeUpdate, session: SessionDep):
    practice = session.get(Practice, practice_id)
    if not practice:
        raise HTTPException(status_code=404, detail="Practice not found")
    
    update_data = practice_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(practice, key, value)
    
    session.add(practice)
    session.commit()
    session.refresh(practice)
    return practice