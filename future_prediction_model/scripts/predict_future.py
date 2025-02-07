import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import joblib
import os
import sys

# Load Model and Scaler
model_path = os.path.join(os.path.dirname(__file__), "../models/lstm_future_predictor.h5")
scaler_path = os.path.join(os.path.dirname(__file__), "../models/scaler_future.pkl")

model = load_model(model_path)
scaler = joblib.load(scaler_path)

# Define the expected feature names
feature_columns = ["quiz_scores", "time_spent", "reading_volume", "peer_comparison", "past_performance_trend"]

# Read Input Data (Last 5 Weeks of Student Data)
input_values = [float(i) for i in sys.argv[1:]]
input_data = np.array(input_values).reshape(5, len(feature_columns))  # (5 weeks, 5 features)

# Convert to DataFrame with Correct Column Names
input_df = pd.DataFrame(input_data, columns=feature_columns)

# Normalize Input Data
input_normalized = scaler.transform(input_df)

# Reshape for LSTM
input_reshaped = input_normalized.reshape(1, 5, len(feature_columns))

# Predict Future Performance
prediction_proba = model.predict(input_reshaped)[0]
predicted_class = np.argmax(prediction_proba)

# Map Predicted Label
performance_mapping = {0: "Below", 1: "At", 2: "Above"}
confidence = np.max(prediction_proba)

# Print Prediction
print(f"{performance_mapping[predicted_class]} (Confidence: {confidence:.2f})")
