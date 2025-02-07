import pandas as pd
import numpy as np
import os

# Define number of students and weeks
num_students = 2000  # Increase as needed
num_weeks = 30  # More weeks allow better future prediction

# Generate synthetic student IDs and weeks
np.random.seed(42)
student_ids = np.repeat(np.arange(1001, 1001 + num_students), num_weeks)
weeks = np.tile(np.arange(1, num_weeks + 1), num_students)

# Generate features with realistic trends
quiz_scores = np.clip(np.random.normal(75, 10, num_students * num_weeks), 40, 100)  # Scores follow normal distribution
time_spent = np.random.randint(30, 200, num_students * num_weeks)  # Study time per week
reading_volume = np.random.randint(200, 800, num_students * num_weeks)  # Words read
peer_comparison = np.round(np.random.uniform(0.5, 1.5, num_students * num_weeks), 2)  # Peer performance ratio
past_performance_trend = np.round(np.random.uniform(0.3, 1.2, num_students * num_weeks), 2)  # Trend factor

# Compute moving average of quiz scores over last 5 weeks
df = pd.DataFrame({
    "student_id": student_ids,
    "week": weeks,
    "quiz_scores": quiz_scores,
    "time_spent": time_spent,
    "reading_volume": reading_volume,
    "peer_comparison": peer_comparison,
    "past_performance_trend": past_performance_trend
})

df["avg_quiz_last_5_weeks"] = df.groupby("student_id")["quiz_scores"].rolling(5, min_periods=1).mean().reset_index(0, drop=True)

# Assign performance labels based on new trends
performance_label = []
for i in range(len(df)):
    if df["avg_quiz_last_5_weeks"].iloc[i] >= 85 and df["time_spent"].iloc[i] >= 120 and (
            df["peer_comparison"].iloc[i] >= 0.9 or df["past_performance_trend"].iloc[i] >= 0.8):
        performance_label.append("Above")
    elif 65 <= df["avg_quiz_last_5_weeks"].iloc[i] < 85 and df["time_spent"].iloc[i] >= 80 and df["peer_comparison"].iloc[i] >= 0.8 and df["past_performance_trend"].iloc[i] >= 0.7:
        performance_label.append("At")
    else:
        performance_label.append("Below")

df["performance_label"] = performance_label

# Save dataset
data_path = os.path.join(os.path.dirname(__file__), "../data/student_performance_time_series2.csv")
df.to_csv(data_path, index=False)
print(f"Time-Series Student Performance Dataset saved at: {data_path}")
