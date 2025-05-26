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

from collections import Counter
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import string
import re




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

# ----- ML Prediction Model Setup My-----
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

# -- thisara's function ------

def soundex(word):
    if not word:
        return ""
    word = word.upper()
    soundex_code = word[0]
    mapping = {
        "BFPV": "1", "CGJKQSXZ": "2", "DT": "3",
        "L": "4", "MN": "5", "R": "6", "AEIOUHWY": "."
    }
    for char in word[1:]:
        for key in mapping:
            if char in key:
                code = mapping[key]
                if code != '.':
                    if code != soundex_code[-1]:
                        soundex_code += code
                break
    soundex_code = soundex_code.replace(".", "")
    soundex_code = soundex_code.ljust(4, "0")[:4]
    return soundex_code

# --- Levenshtein Distance ---
def levenshtein_distance(s1, s2):
    rows = len(s1) + 1
    cols = len(s2) + 1
    dist_matrix = np.zeros((rows, cols), dtype=int)
    for i in range(1, rows): dist_matrix[i][0] = i
    for j in range(1, cols): dist_matrix[0][j] = j
    for i in range(1, rows):
        for j in range(1, cols):
            cost = 0 if s1[i-1] == s2[j-1] else 1
            dist_matrix[i][j] = min(
                dist_matrix[i-1][j] + 1,
                dist_matrix[i][j-1] + 1,
                dist_matrix[i-1][j-1] + cost
            )
    return dist_matrix[rows-1][cols-1]

# --- Semantic Similarity ---
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
def semantic_similarity(text1, text2):
    emb1 = sentence_model.encode(text1, convert_to_tensor=True)
    emb2 = sentence_model.encode(text2, convert_to_tensor=True)
    score = cosine_similarity(emb1.reshape(1, -1), emb2.reshape(1, -1))[0][0]
    return float(score)

# --- Preprocessing ---
def preprocess(text):
    text = text.lower()
    text = re.sub(f"[{string.punctuation}]", "", text)
    return text

# --- Error Type Codes ---
error_code_map = {
    "NO_ERROR": 0,
    "PHONETIC_ERROR": 1,
    "SEMANTIC_ERROR": 2,
    "SPELLING_ERROR": 3,
    "UNKNOWN_ERROR": 4,
    "EXTRA_WORD": 5,
    "MISSING_WORD": 6
}

# --- Find Defect Words ---
def find_defect_words(original, given, semantic_threshold=0.7):
    original_words = preprocess(original).split()
    given_words = preprocess(given).split()
    defect_words = []

    max_len = max(len(original_words), len(given_words))

    for i in range(max_len):
        orig_word = original_words[i] if i < len(original_words) else None
        given_word = given_words[i] if i < len(given_words) else None

        if orig_word and given_word:
            if orig_word == given_word:
                defect_words.append((orig_word, given_word, "NO_ERROR"))
            elif soundex(orig_word) == soundex(given_word):
                defect_words.append((orig_word, given_word, "PHONETIC_ERROR"))
            elif semantic_similarity(orig_word, given_word) >= semantic_threshold:
                sim_score = semantic_similarity(orig_word, given_word)
                defect_words.append((orig_word, given_word, f"SEMANTIC_ERROR (score={sim_score:.2f})"))
            elif levenshtein_distance(orig_word, given_word) <= 2:
                defect_words.append((orig_word, given_word, "SPELLING_ERROR"))
            else:
                defect_words.append((orig_word, given_word, "UNKNOWN_ERROR"))
        elif orig_word and not given_word:
            defect_words.append((orig_word, "", "MISSING_WORD"))
        elif given_word and not orig_word:
            defect_words.append(("", given_word, "EXTRA_WORD"))

    return defect_words

# --- Calculate Overall Score ---
def calculate_overall_score(original, given, defects, semantic_weight=0.7):
    original = preprocess(original)
    given = preprocess(given)

    semantic_score = semantic_similarity(original, given)

    total_words = max(len(original.split()), len(given.split()))
    defect_penalty = sum(1 for _, _, e in defects if e != "NO_ERROR") / total_words if total_words else 1

    final_score = (semantic_weight * semantic_score) + ((1 - semantic_weight) * (1 - defect_penalty))
    return round(final_score * 100, 2)

# ------word_similarity--------------
def preprocess_word(word):
    return word.lower()

def vectorize_word(word):
    char_counts = Counter(word)
    chars = 'abcdefghijklmnopqrstuvwxyz'
    vector = np.zeros(len(chars))
    for i, char in enumerate(chars):
        vector[i] = char_counts.get(char, 0)
    return vector

def word_cosine_sim(word1, word2):
    word1 = preprocess_word(word1)
    word2 = preprocess_word(word2)
    vec1 = vectorize_word(word1).reshape(1, -1)
    vec2 = vectorize_word(word2).reshape(1, -1)
    similarity = cosine_similarity(vec1, vec2)
    return similarity[0][0]


# ----- My REST API Routes -----
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


@flask_app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    original = data.get('original')
    given = data.get('given')

    if not original or not given:
        return jsonify({"error": "Both 'original' and 'given' fields are required."}), 400

    defects = find_defect_words(original, given)
    score = calculate_overall_score(original, given, defects)

    result = []
    for o, g, e in defects:
        base_error = e.split()[0]  # e.g., "SEMANTIC_ERROR" from "SEMANTIC_ERROR (score=0.78)"
        error_type_id = error_code_map.get(base_error, 0)

        result.append({
            "original": o or "",
            "given": g or "",
            "error": base_error,
            "error_type": error_type_id
        })

    return jsonify({
        "defects": result,
        "score": score,
        "score_description": f"{score}% similarity"
    }), 200

@flask_app.route('/cosine-similarity', methods=['POST'])
def cosine_similarity_api():
    try:
        data = request.get_json()
        word1_list = data.get('word1')
        word2_list = data.get('word2')
        if not word1_list or not word2_list or len(word1_list) != len(word2_list):
            error_message = 'word1 and word2 must be non-empty lists of the same length'
            return jsonify({'error': error_message}), 400

        results = []
        for w1, w2 in zip(word1_list, word2_list):
            score = word_cosine_sim(w1, w2)
            results.append({
                'word1': w1,
                'word2': w2,
                'score': round(score, 4)
            })

        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ----- Start Server -----
if __name__ == '__main__':
    print("🚀 Server is running on http://localhost:5000")
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
