from pydantic import BaseModel
from sqlmodel import Field, Session,DateTime, SQLModel, create_engine, select,Relationship,Column,JSON
import datetime
from typing import List




#      response_model=UserRead

class User(SQLModel,table=True):
   __tablename__ = "users"
   id: int | None = Field(default=None , primary_key=True)
   name:str = Field(index=True, nullable=False)
   email:str = Field(index=True,unique=True,)
   hashed_password:str =Field(nullable=False)
   verified_at:str | None=None
   role:str 
   created_at:datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow,
    )

  


class Candidate(SQLModel, table=True):
 __tablename__ = "candidates"
 id: int = Field(default=None , primary_key=True)
 user_id:int =Field(foreign_key="users.id")
 user:User = Relationship()
 role_applied :str = Field(index=True)
 status :str = Field(index=True)
 skill :  List[str] = Field(default=[], sa_column=Column(JSON))
 internal_notes : str | None = None
 created_at:datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow,
  )


class Score(SQLModel, table=True):
  __tablename__ = "scores"
  id: int | None = Field(default=None , primary_key=True)
  candidate_id:int = Field(foreign_key="candidates.id")
  canidate:Candidate = Relationship()
  category:str = Field(index=True)
  Score:int
  reviewer_id:int= Field(foreign_key="users.id")
  reviewer:User =  Relationship()
  note:str | None = None
  created_at:datetime.datetime = Field(
        default_factory=datetime.datetime.utcnow,
  )


 