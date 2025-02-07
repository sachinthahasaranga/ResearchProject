import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load Dataset
df = pd.read_csv("../data/student_performance2.csv")

# Define Features and Target
features = ["quiz_scores", "time_spent", "reading_volume", "peer_comparison", "past_performance_trend"]
target = "performance_label"

# Convert categorical labels into numerical values
df[target] = df[target].map({"Below": 0, "At": 1, "Above": 2})

# Handle missing values
df.dropna(inplace=True)

# Define X and y
X = df[features]
y = df[target]

# Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make Predictions
y_pred = model.predict(X_test)

# Evaluate Model
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save Model
joblib.dump(model, "../models/predictive_model.pkl")
print("Model saved successfully!")
