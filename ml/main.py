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
import io
import cv2
import tempfile
import traceback


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

UPLOADS_DIR = "./uploads"
FACES_DIR = "./faces"

Path(UPLOADS_DIR).mkdir(parents=True, exist_ok=True)


# Setting up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# DB Configurations
MONGODB_CONNECTION_URL = "mongodb+srv://dbuser:111222333@cluster0.frzat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = AsyncIOMotorClient(MONGODB_CONNECTION_URL)
db = client["elearning_db"]
user_collection = db["users"]

# Hand Sign Detect ===============================================================================================================
MODEL_PATH = 'hand_sign_numbers.h5'
MODEL_SIGN = 'model_ssl_v5.h5'

# Load model with handling for potential custom objects
def load_model_with_custom_objects(model_path, custom_objects=None):
    model = tf.keras.models.load_model(model_path, custom_objects=custom_objects)
    return model

# Function to preprocess the uploaded image and make predictions
def predict_hand_sign(model, image_path):
    # Open the image and preprocess it
    img = Image.open(image_path)
    img = img.resize((48, 48))  # Resize the image to match the model input size (48x48)
    img = np.array(img)  # Convert image to numpy array
    img = img / 255.0  # Normalize pixel values to be between 0 and 1
    
    # Make prediction
    prediction = model.predict(np.expand_dims(img, axis=0))  # Add batch dimension
    predicted_class_index = np.argmax(prediction)  # Get the index of the highest probability
    
    class_names = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']  # Class labels for hand signs (digits 0-9)
    predicted_class = class_names[predicted_class_index]
    
    return predicted_class

@app.post("/predict-handsign")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded file
        file_path = os.path.join(UPLOADS_DIR, file.filename)
        os.makedirs(UPLOADS_DIR, exist_ok=True)  # Ensure the upload directory exists
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        
        # Load the model
        model = load_model_with_custom_objects(MODEL_PATH, custom_objects=None)

        # Make prediction
        predicted_class = predict_hand_sign(model, file_path)
        
        return {"predicted_class": predicted_class}
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Sign Alpabet Sinhala
def predict_hand_sign_alpabet(model, image_path):
    # Open the image and convert it to RGB
    img = Image.open(image_path).convert("RGB")  # Convert image to RGB to remove the alpha channel
    img = img.resize((48, 48))  # Resize to match model input size
    img = np.array(img)  # Convert image to numpy array
    img = img / 255.0  # Normalize pixel values to be between 0 and 1

    # Ensure the input has the correct shape for the model
    img = np.expand_dims(img, axis=0)  # Add batch dimension

    # Make prediction
    prediction = model.predict(img)  
    predicted_class_index = np.argmax(prediction)  # Get the index of the highest probability
    
    class_names = ['අ', 'අං', 'ආ', 'ඇ', 'ඈ', 'ඉ', 'ඊ', 'උ', 'ඌ', 'එ', 'ඒ', 'ඔ', 'ඕ', 'ක්', 'ග්', 'ඟ', 'ච්', 'ජ්', 'ට්', 'ඩ්', 'ණ්', 'ඬ', 'ත්', 'ද්', 'න්', 'ඳ', 'ප', 'ප්', 'බ්', 'ම්', 'ඹ', 'ය්', 'ර්', 'ල්', 'ව්', 'ස්', 'හ්', 'ළ්']
    predicted_class = class_names[predicted_class_index]
    
    return predicted_class




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


async def get_user_by_username(username: str):
    return await user_collection.find_one({"username": username})

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
        "id": str(new_user["_id"]),  # Convert ObjectId to string and map to relevant id
        "username": new_user["username"],
        "email": new_user["email"],
        "role": new_user["role"],
        "avatar": new_user["avatar"]
    }
    
    return UserResponseModel(**new_user_response)


@app.get("/users/{username}", response_model=UserResponseModel)
async def get_user(username: str):
    user = await get_user_by_username(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return UserResponseModel(
        id=str(user["_id"]),
        username=user["username"],
        email=user["email"],
        role=user["role"],
        avatar=user["avatar"]
    )

@app.get("/users", response_model=list[UserResponseModel])
async def get_all_users():
    users_cursor = user_collection.find({})
    users = await users_cursor.to_list(None)  # Fetch all users

    return [
        UserResponseModel(
            id=str(user["_id"]),
            username=user["username"],
            email=user["email"],
            role=user["role"],
            avatar=user["avatar"]
        ) for user in users
    ]






if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
