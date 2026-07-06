from fastapi import FastAPI,APIRouter,Request,Depends,HTTPException,Depends,status
from typing import Annotated
from database import lifespan
from routers.auth import router as authrouter
from routers.candidates import router as candidateRouter
from fastapi.responses import JSONResponse
from auth import decodeToken
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware





app = FastAPI(lifespan=lifespan);
origins = [
    "http://silveroakhospital.localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
def root():
    return "server is running"



app.include_router(authrouter)
app.include_router(candidateRouter)



