import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
import joblib
import os

# Load Data
data_path = os.path.join(os.path.dirname(__file__), "../data/student_performance_time_series.csv")
df = pd.read_csv(data_path)

# Define Features and Target
features = ["quiz_scores", "time_spent", "reading_volume", "peer_comparison", "past_performance_trend"]
target = "performance_label"

# Normalize Features
scaler = MinMaxScaler()
df[features] = scaler.fit_transform(df[features])

# Convert "performance_label" to numerical values
df[target] = df[target].map({"Below": 0, "At": 1, "Above": 2})

# Save the scaler for later use in predictions
scaler_path = os.path.join(os.path.dirname(__file__), "../models/scaler_future.pkl")
joblib.dump(scaler, scaler_path)

# Prepare Time-Series Sequences
sequence_length = 5  # Use the last 5 weeks to predict the next
X, y = [], []

students = df["student_id"].unique()
for student in students:
    student_data = df[df["student_id"] == student].sort_values("week")
    for i in range(len(student_data) - sequence_length):
        X.append(student_data[features].iloc[i:i + sequence_length].values)
        y.append(student_data[target].iloc[i + sequence_length])

X, y = np.array(X), np.array(y)

# Split Data (80% Training, 20% Testing)
split = int(0.8 * len(X))
X_train, X_test, y_train, y_test = X[:split], X[split:], y[:split], y[split:]

# Build LSTM Model
# model = Sequential([
#     LSTM(64, activation="relu", return_sequences=True, input_shape=(sequence_length, len(features))),
#     LSTM(32, activation="relu"),
#     Dense(16, activation="relu"),
#     Dense(3, activation="softmax")  # Predicts probabilities for "Below", "At", "Above"
# ])

# model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])

model = Sequential([
    LSTM(64, activation="relu", return_sequences=True, input_shape=(sequence_length, len(features))),
    LSTM(32, activation="relu"),
    Dense(16, activation="relu"),
    Dense(3, activation="softmax")  # Predicts probabilities for "Below", "At", "Above"
])

# Use a lower learning rate for better stability
optimizer = tf.keras.optimizers.Adam(learning_rate=0.0005)  # Lower learning rate
model.compile(optimizer=optimizer, loss="sparse_categorical_crossentropy", metrics=["accuracy"])


# Train Model
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_data=(X_test, y_test))

# Save Model
model_path = os.path.join(os.path.dirname(__file__), "../models/lstm_future_predictor.h5")
model.save(model_path)
print("Future Prediction Model Saved Successfully!")
