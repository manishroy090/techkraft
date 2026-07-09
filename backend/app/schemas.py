from pydantic import BaseModel
from datetime import date, datetime, time, timedelta
from fastapi import APIRouter,Depends,Header,HTTPException,status,Query




class Registration(BaseModel):
    name:str
    email:str
    password:str
    role_applied:str
    status :str
    skill : list
    

class RegistrationUserResponse(BaseModel):
    name:str
    email:str
    role_applied:str
    status:str
    skill:list
     
class RegistrationResponse(BaseModel):
    user:RegistrationUserResponse
    token:str
      


class Login(BaseModel):
     email:str
     password:str


class LoginResponse(BaseModel):
    message:str
    id:int
    email:str
    name:str
    role:str
    token:str
    
class FilteRequest(BaseModel):
    skip:int = Query(0,ge=0,description="Number of record to skip")
    limit:int= Query(2,ge=0, le=50,description="max record return")
    status:str | None= None 
    role_applied:str | None =None 
    skill:str | None =None 
    keyword:str | None = None
    




class candidateResponse(BaseModel):
   role_applied:str
   skill:list
   created_at:datetime
   status:str


class uResponse(BaseModel):
      id:int
      email:str
      role:str
      name:str
      created_at:datetime

class candiadatesResponse(BaseModel):
     id:int
     name:str
     email:str
     role_applied:str
     status:str
     candidate_id:int
     skill:list



class candidateDetailResponse(BaseModel):
        user_id:int
        email:str
        role:str
        name:str
        created_at:datetime
        role_applied:str
        skill:list
        score:int
        category:str

class AiSummaryResponse(BaseModel):
    event:str
    data:str

    

class SubmitScore(BaseModel):
      category:str
      score:int
      note:str

class SubmitScoreResponse(BaseModel):
      id:int
      Score:int
      note:str
      candidate_id:int
      category:str
      reviewer_id:int
      created_at:datetime
    


      class Config:
        from_attributes = True 
       
# class GenerateAiSummary():
        