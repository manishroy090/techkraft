from sqlalchemy import create_engine
from sqlmodel import  Session, SQLModel, create_engine
from typing import Annotated
from fastapi import FastAPI,Depends
from contextlib import asynccontextmanager
from pathlib import Path
from models import User
from pwdlib import PasswordHash
from sqlmodel import select
from contextlib import contextmanager






# this part of code is use to config database
BASE_DIR = Path(__file__).resolve().parent
sqlite_file_name = BASE_DIR / "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)



# this function create db and tables
def create_db_and_tables():
        SQLModel.metadata.create_all(engine)


# this function is use to get session
def get_session():
    with Session(engine) as session:
        yield session





SessionDep = Annotated[Session, Depends(get_session)]


# this function call whenever the app got start
@asynccontextmanager
async def lifespan(app: FastAPI):
  with Session(engine) as db:
   create_db_and_tables()
  statement = select(User).where(User.email =="rose@gmail.com")
  user = db.exec(statement).first()
  if not user:
   Password_hash = PasswordHash.recommended()
   db_user = User(name="rose",email="rose@gmail.com", hashed_password=Password_hash.hash("9824845020@Ab"),role="admin")
   db.add(db_user)
   db.commit()
   db.refresh(db_user)
  yield




