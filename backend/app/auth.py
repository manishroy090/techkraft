import jwt
from pwdlib import PasswordHash
from fastapi import HTTPException,Depends
from database import SessionDep
from models import User
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
    SecurityScopes,
)
from fastapi.responses import JSONResponse
from typing import Annotated




SECRET_KEY = "84caf6135cd07b1fda5dd2067947afde243ad631d1caed9a62e0c329f59cc2b9"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



# uu
async def verify_password(plain_password, hashed_passwod):
 Password_hash = PasswordHash.recommended()
 return Password_hash.verify(plain_password,hashed_passwod)


#uu
async def get_password_hash(password):
 return PasswordHash.hash(password)



async def create_token(data):
 try:
   token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
   return token
 except Exception as error:
   raise  HTTPException(status_code=500,detail=str(error))
 
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
    scopes={"me": "Read information about the current user.", "items": "Read items."},
)


async def decodeToken(token):
 try:
   token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
   if token:
    return token
 except Exception as error:
    HTTPException(status_code=401,detail="Invalid Token")
   


async def login_for_access_token():
 return
     
     