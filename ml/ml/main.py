from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pathlib import Path
import uvicorn
from PIL import Image
import numpy as np
import tensorflow as tf
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from bson import ObjectId
import bcrypt
import logging
import os
import shutil
from face_identification import FaceRecognition


app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FACES_DIR = "./faces"



# Setting up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# DB Configurations
MONGODB_CONNECTION_URL = "mongodb+srv://kavishisirisena177:Y7bu1PEcGOW74aMB@cluster0.s5foz.mongodb.net/"
client = AsyncIOMotorClient(MONGODB_CONNECTION_URL)
db = client["elearning_db"]
user_collection = db["users"]


# Child Faces Identification =====================================================================================================
class FaceID(BaseModel):
    username: str

@app.post("/face-identification/upload")
async def upload_face(file: UploadFile = File(...)):
    file_location = os.path.join(FACES_DIR, file.filename)
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    return {"info": "File uploaded successfully"}
@app.post("/face-identification/recognize")
async def recognize_face(user: FaceID):
    name = user.username
    face_rec = FaceRecognition()
    detected = face_rec.run_recognition(name)  
    print(detected)
    return {"detected": detected}

class UserModel(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str
    avatar: str

class UserResponseModel(BaseModel):
    id: str
    username: str
    email: EmailStr
    role: str
    avatar: str

async def get_user_by_email(email: str):
    return await user_collection.find_one({"email": email})

async def get_user_by_id(user_id: ObjectId):
    return await user_collection.find_one({"_id": user_id})

@app.post("/users", response_model=UserResponseModel)
async def create_user(user: UserModel):
    # Check if user already exists
    user_exists = await get_user_by_email(user.email)
    if user_exists:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Hash the user's password
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    user.password = hashed_password.decode('utf-8')
    
    # Insert the user into the database
    user_dict = jsonable_encoder(user)
    result = await user_collection.insert_one(user_dict)
    
    # Retrieve the inserted user
    new_user = await get_user_by_id(result.inserted_id)
    
    # Map _id to id for the response model
    new_user_response = {
        "id": str(new_user["_id"]),  # Convert ObjectId to string and map to id
        "username": new_user["username"],
        "email": new_user["email"],
        "role": new_user["role"],
        "avatar": new_user["avatar"]
    }
    
    return UserResponseModel(**new_user_response)




if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
