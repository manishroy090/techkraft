from fastapi import APIRouter,Depends,Header,HTTPException,status,Query
from fastapi.requests import Request
from auth import decodeToken
from typing import Annotated,Any
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth import decodeToken
from fastapi.responses import JSONResponse
from database import SessionDep
from models import Score
from schemas import SubmitScore,FilteRequest,candidateDetailResponse,SubmitScoreResponse,candiadatesResponse
from sqlmodel import select
from models import User , Score,Candidate
from services.ollama import generateSummary
from fastapi.responses import StreamingResponse
from collections.abc import AsyncIterable, Iterable,AsyncGenerator
from sse_starlette.sse import EventSourceResponse
from datetime import datetime
import json
import asyncio
from typing import Any


router = APIRouter(
  prefix="/candidates"

)




security_scheme = HTTPBearer()


#  this middleware is use for verify jwt token
async def verify_token(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security_scheme)],db:SessionDep,request: Request):
    token = credentials.credentials
    if not token:
       raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized")
    decodeToen = await decodeToken(token)
    if not decodeToen:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return decodeToen




#  this middleware check token and reviewer role access
async def reviewer(id:int,credentials: Annotated[HTTPAuthorizationCredentials, Depends(security_scheme)],db:SessionDep):
       token = credentials.credentials
       if not token:
          raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized")
       decodeToen = await decodeToken(token)
       statement = select(User).where(User.email ==decodeToen["email"])
       user =  db.exec(statement).first()

       candidateStatement = select(Candidate).where(Candidate.user_id ==id)
       candidate = db.exec(candidateStatement).first()
       if decodeToen["role"]== "reviewer" and user.id!=candidate.user_id:
          print(user.id)
          print(candidate.user_id)
          raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")
  



@router.get("/")
async def get_candidates(db:SessionDep,credentials: Annotated[str, Depends(verify_token)],filter:FilteRequest =Query()):
   satement = (select(Candidate,User).join(User,Candidate.user_id == User.id))
   if filter.status :
      satement= satement.where(Candidate.status==filter.status)
   if filter.keyword :
      print("keyword comes in ")
   if filter.role_applied :
     satement= satement.where(Candidate.role_applied==filter.role_applied)
   if filter.skill :
      satement= satement.where(Candidate.skill.contains(filter.skill))
      
      # .offset(filter.skip).limit(filter.limit))
   
   results = db.exec(satement)
   response = []
   for candidate, user  in results:
       response.append(
            candiadatesResponse(
                id=candidate.id,
                name=user.name,
                email=user.email,
                role_applied=candidate.role_applied,
                status=candidate.status,
                candidate_id=candidate.id,
                skill=candidate.skill
            )
        )
   return response



#  this endpoint is use to get candidate details
@router.get("/{id}")
async def get_canididate_details(id:int,authUser: Annotated[str, Depends(reviewer)],db:SessionDep):
   satement = select(Candidate,User,Score).join(User,Candidate.user_id == User.id).join(Score,Candidate.id == Score.candidate_id).where(Candidate.id==id)
   results = db.exec(satement)
   response = []
   for candidate, user , score in results:
      response.append(
         candidateDetailResponse(
            user_id=user.id,
            email=user.email,
            role=user.role,
            name=user.name,
            created_at=user.created_at,
            role_applied=candidate.role_applied,
            skill=candidate.skill,
            status=candidate.status,
            score=score.Score,
            category=score.category
         )

      )
   return response
   
     


#  apply scoring to registration id
@router.post("/{id}/scores",response_model=SubmitScoreResponse)
async def submit_score(id:int,authUser: Annotated[str, Depends(verify_token)],scoreDetails:SubmitScore,db:SessionDep):
  try:
   statement = select(User).where(User.email ==authUser["email"])
   user =  db.exec(statement).first()
   userId = user.id
   score = Score(candidate_id=id,category=scoreDetails.category,Score=scoreDetails.score,reviewer_id=userId,note=scoreDetails.note)
   db.add(score)
   db.commit()
   db.refresh(score)
   return score;
  except Exception as error :
    raise  HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(error))


     
async def _event_generator(request:Request,data)->AsyncGenerator[dict[str,Any],None]:

   yield {"event":"info","data":"connected","retry":10_000}
   result =  await generateSummary(data)
   for line in  result[0]["content"]:
      if await request.is_disconnected():
         break
      payload : dict[str,Any] ={
         "message":line,
         "time": ""
      }


      yield  {"event":"message","data":json.dumps(payload)}
      await asyncio.sleep(1)
   yield {"event":"end","data":"done"}


# # this end point is use to generate ai summary
@router.post("/{id}/summary",response_class=StreamingResponse)
async def summary_generation(id:int,authUser: Annotated[str, Depends(verify_token)],db:SessionDep,request:Request) -> EventSourceResponse:
   """
   Streams Server-Sent Events (SSE).
   Content-Type: text/event-stream; charset=utf-8
   """
   satement = select(Candidate,User).join(User,Candidate.user_id == User.id).where(Candidate.id==id)
   results = db.exec(satement)
   response = []
   for candidate, user  in results:
      response.append({
            "user_id" :user.id,
            "email":user.email,
            "role":user.role,
            "name":user.name,
            "created_at":user.created_at,
            "role_applied":candidate.role_applied,
            "skill":candidate.skill,
            "status":candidate.status,
      }
      )
    

   return EventSourceResponse(_event_generator(request,str(response)),ping=15)



# # this end point is use to stream candidates score
@router.get("/{id}/stream",response_class=StreamingResponse)
async def streams_score(id:str,authUser: Annotated[str, Depends(reviewer)],db:SessionDep)  -> AsyncIterable[str]:
   scoreStatement =  select(Score).where(Score.candidate_id==id)
   scores = db.exec(scoreStatement).all()
   for score in scores:
      yield score.model_dump_json()
