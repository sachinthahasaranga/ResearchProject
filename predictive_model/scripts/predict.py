import sys
import joblib
import numpy as np
import os

# Get absolute path to model file
model_path = os.path.join(os.path.dirname(__file__), "../models/predictive_model.pkl")

# Load Model
model = joblib.load(model_path)

# Read Input from Command Line
input_data = np.array([sys.argv[1:]], dtype=float)

# Predict
prediction = model.predict(input_data)

# Convert prediction back to label
label_mapping = {0: "Below", 1: "At", 2: "Above"}
print(label_mapping[prediction[0]])
