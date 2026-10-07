import datetime
from typing import Annotated

from fastapi import Depends, FastAPI
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