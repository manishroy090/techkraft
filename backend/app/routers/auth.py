from fastapi import APIRouter,HTTPException,status,Response
from database import SessionDep
from schemas import Registration,Login,RegistrationResponse,LoginResponse
from database import SessionDep
from models import User , Candidate
from pwdlib import PasswordHash
from auth import create_token,verify_password
from sqlmodel import select
import json
from config import get_settings ,Settings





router = APIRouter(
     prefix="/auth",
)



# this endpoint is use for login (admin/candiadates)
@router.post("/login")
async def login(login:Login,db:SessionDep,response: Response):
   try :
      statement = select(User).where(User.email ==login.email)
      user =  db.exec(statement).first()
      print(user)
      if not user:
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid credentials")
      matched =  await verify_password(login.password,user.hashed_password)

      if matched:
        token = await create_token({"email":user.email,"role":user.role})
        response.set_cookie(key="token", value=token, httponly=True, secure=True, samesite="lax")
        userResponse = []
        userResponse.append(
          LoginResponse(
            message ="Logged in",
            id = user.id,
            email = user.email,
            name = user.name,
            role =user.role,
            token=token
          )
          )
        return userResponse
     
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid credentials")
   except Exception as error :
     raise HTTPException(status_code=500,detail=str(error))




#  this endpoint is use for the candidates registration
@router.post("/registration",response_model=RegistrationResponse)
async def registration(user:Registration,db:SessionDep):
    try:
     Password_hash = PasswordHash.recommended()
     userStatement = select(User).where(User.email==user.email)
     userExistance = db.exec(userStatement).first()
     if userExistance :
      raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,detail="Email all ready taken")
     db_user = User(name=user.name,email=user.email, hashed_password=Password_hash.hash(user.password),role="reviewer")
     db.add(db_user)
     db.commit()
     db.refresh(db_user)
     db_registration = Candidate(user_id=db_user.id,role_applied=user.role_applied,status=user.status,skill = user.skill)
     db.add(db_registration)
     db.commit()
     db.refresh(db_registration)
     token = await create_token({"email":user.email,"role":"reviewer"})
     return {"user":user ,"token":token}
    except Exception as error:
     raise  HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=str(error))
 
   
@router.post("/logout")
async def logout(response:Response):
  response.delete_cookie(key="token")
  return {"message": "Logged out successfully"}

