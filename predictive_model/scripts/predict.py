import sys
import joblib
import numpy as np

# Load Model
model = joblib.load("../models/predictive_model.pkl")

# Read Input from Command Line
input_data = np.array([sys.argv[1:]], dtype=float)

# Predict
prediction = model.predict(input_data)

# Convert prediction back to label
label_mapping = {0: "Below", 1: "At", 2: "Above"}
print(label_mapping[prediction[0]])
