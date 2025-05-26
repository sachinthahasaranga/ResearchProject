import cv2
import numpy as np
import socketio
import base64
from tensorflow.keras.models import load_model
from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import eventlet
import eventlet.wsgi
import pickle
import os
from datetime import datetime
import insightface
from insightface.app import FaceAnalysis
import mediapipe as mp


mp_face = mp.solutions.face_detection
face_detection = mp_face.FaceDetection(model_selection=0, min_detection_confidence=0.6)

# ----- Init Flask and Socket.IO -----
flask_app = Flask(__name__)
CORS(flask_app, origins="*")

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio, flask_app)

# ----- Emotion Detection Setup -----
model_emotion = load_model('emotion_model.h5')
model_emotion.load_weights('emotion.weights.h5')
emotion_dict = {
    0: "Angry", 1: "Disgusted", 2: "Fearful",
    3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"
}
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# ----- ML Prediction Model Setup -----
minmax_scl = pickle.load(open('scaler_minmax.pkl', 'rb'))
std_scl = pickle.load(open('scaler_standard.pkl', 'rb'))
trgt_scl_std = pickle.load(open('targeted_sclar_standard.pkl', 'rb'))
model_forecast = pickle.load(open('model.pkl', 'rb'))
scaler_forecast = pickle.load(open('minmax.pkl', 'rb'))
score_model = load_model('student_level_pred.h5')

# Load the model once globally
face_app = FaceAnalysis(name="buffalo_l", providers=['CPUExecutionProvider'])
face_app.prepare(ctx_id=0)

def get_embedding(image_np):
    faces = face_app.get(image_np)

    if not faces:
        raise ValueError("No face detected.")

    # Use the first detected face
    return faces[0].embedding

# ----- SOCKET.IO Events -----
@sio.event
def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
def send_image(sid, data):
    try:
        # Step 1: Decode base64 image
        if "," in data:
            img_data = data.split(",")[1]
        else:
            img_data = data

        image_bytes = base64.b64decode(img_data)
        pil_img = Image.open(BytesIO(image_bytes)).convert('RGB')
        img_np = np.array(pil_img)

        img_bgr = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
        h, w, _ = img_bgr.shape

        img_mediapipe_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        results = face_detection.process(img_mediapipe_rgb)

        if results.detections:
            for detection in results.detections:
                bbox = detection.location_data.relative_bounding_box
                x = int(bbox.xmin * w)
                y = int(bbox.ymin * h)
                bw = int(bbox.width * w)
                bh = int(bbox.height * h)

                # Clamp values to image size to avoid out-of-bounds
                x = max(0, x)
                y = max(0, y)
                bw = min(w - x, bw)
                bh = min(h - y, bh)

                # Step 4: Convert to grayscale and extract ROI
                gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
                roi = gray[y:y + bh, x:x + bw]

                if roi.shape[0] > 0 and roi.shape[1] > 0:
                    roi_resized = cv2.resize(roi, (48, 48))
                    roi_ready = np.expand_dims(np.expand_dims(roi_resized, -1), 0)

                    # Step 5: Predict emotion
                    prediction = model_emotion.predict(roi_ready)
                    emotion = emotion_dict[int(np.argmax(prediction))]

                    # Emit emotion result
                    sio.emit("emotion_result", {"emotion": emotion}, to=sid)
                    return

        # No face found
        sio.emit("emotion_result", {"emotion": "No Face Detected"}, to=sid)

    except Exception as e:
        print(f"Error in send_image: {e}")
        sio.emit("emotion_result", {"emotion": "Error processing image"}, to=sid)

# ----- REST API Routes -----
@flask_app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        resrc_score = float(data.get('resources_score'))
        minutes_spent = int(data.get('minutes_spent'))
        quiz_score = float(data.get('quiz_score'))

        rs = np.log1p(resrc_score)
        ts = np.log1p(minutes_spent)
        qs = minmax_scl.transform([[quiz_score]])
        transformed_standard = std_scl.transform([[rs, ts]])
        final_input = np.hstack((transformed_standard, qs))
        predicted = score_model.predict(final_input)
        unscaled = trgt_scl_std.inverse_transform(predicted)
        unscaled = np.expm1(unscaled)

        return jsonify({'performance_score': float(unscaled[0][0])})
    except Exception as e:
        return jsonify({'error': str(e)})

@flask_app.route('/validate-face', methods=['POST'])
def validate_face():
    try:
        data = request.get_json()
        img_data = data.get("image")

        if "," in img_data:
            img_data = img_data.split(",")[1]

        image_bytes = base64.b64decode(img_data)
        img = Image.open(BytesIO(image_bytes)).convert('RGB')
        img_np = np.array(img)

        gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        for (x, y, w, h) in faces:
            if w > 100 and h > 100:  # Ensure it's a good-sized face
                return jsonify({'valid': True})

        return jsonify({'valid': False, 'message': 'No proper face detected'})
    except Exception as e:
        return jsonify({'valid': False, 'message': f'Error processing image: {str(e)}'})

@flask_app.route('/predict-forecast', methods=['POST'])
def predict_forecast():
    try:
        data = request.get_json()
        scores = np.array(data.get('scores')).reshape(-1, 1)
        time_frames = int(data.get('time_frame'))

        scores_scaled = scaler_forecast.transform(scores)
        X, y = [], []
        for i in range(len(scores_scaled) - time_frames):
            X.append(scores_scaled[i:i+time_frames])
            y.append(scores_scaled[i+time_frames])
        X = np.array(X)

        forecast = model_forecast.predict(X)
        forecast = scaler_forecast.inverse_transform(forecast).flatten().tolist()

        return jsonify({'performance_score': forecast})
    except Exception as e:
        return jsonify({'error': str(e)})

@flask_app.route('/compare-faces', methods=['POST'])
def compare_faces():
    try:
        data = request.get_json()
        captured_image_b64 = data.get("captured_image")
        stored_image_url = data.get("stored_image_url")

        if not captured_image_b64 or not stored_image_url:
            return jsonify({"success": False, "message": "Missing image data"})

        # Load captured image (base64)
        if "," in captured_image_b64:
            captured_image_b64 = captured_image_b64.split(",")[1]
        captured_bytes = base64.b64decode(captured_image_b64)
        captured_img = Image.open(BytesIO(captured_bytes)).convert('RGB')

        # Load stored image from URL
        response = requests.get(stored_image_url)
        stored_img = Image.open(BytesIO(response.content)).convert('RGB')

        # Convert to numpy
        captured_np = np.asarray(captured_img)
        stored_np = np.asarray(stored_img)

        # Preprocess and get embeddings (assumes you already have FaceNet model loaded)
        captured_emb = get_embedding(captured_np)
        stored_emb = get_embedding(stored_np)

        # Compare embeddings (cosine or euclidean distance)
        distance = np.linalg.norm(captured_emb - stored_emb)
        threshold = 15  # adjust based on your model and validation set

        print(f"the distance {distance}")

        if distance < threshold:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "message": "Faces do not match"})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)})


# ----- Start Server -----
if __name__ == '__main__':
    print("🚀 Server is running on http://localhost:5000")
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
