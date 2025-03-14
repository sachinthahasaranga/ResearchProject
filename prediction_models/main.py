from flask import Flask, request, jsonify
import pickle
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# Initialize Flask app
app = Flask(__name__)

minmax_scl = None
std_scl = None
trgt_scl_std = None
model_forecast = None
scaler_forecast = None

score_model = None
def predict_value(model,resource_score,time_spent,quiz_score,scaler_minmax,scaler_standard,targeted_sclar_standard):
  rs = np.log1p(resource_score)
  ts = np.log1p(time_spent)
  qs = scaler_minmax.transform([[quiz_score]])
  transformed_standard = scaler_standard.transform([[rs, ts]])
  final_transformed_record = np.hstack((transformed_standard, qs))
  predicted_value=model.predict(final_transformed_record)
  unscaled_value = targeted_sclar_standard.inverse_transform(predicted_value)
  unscaled_value = np.expm1(unscaled_value)
  return unscaled_value[0][0]


# Define prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        resrc_score = float(data.get('resources_score'))
        minutes_spent = int(data.get('minutes_spent'))
        quiz_score = float(data.get('quiz_score'))

        result = predict_value(score_model,resrc_score,minutes_spent,quiz_score,minmax_scl,std_scl,trgt_scl_std)

        return jsonify({'performance_score': float(result)})

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/predict-forecast', methods=['POST'])
def predict_forecast():
    try:

        data = request.get_json()
        scores = data.get('scores')
        times_frames = int(data.get('time_frame'))

        prd_frcast = forcast_values(np.array(scores).reshape(-1,1),times_frames)
        prd_frcast = prd_frcast.flatten().tolist()

        return jsonify({'performance_score': prd_frcast})
    except Exception as e:
        return jsonify({'error': str(e)})

def create_sequences(data, time_steps=10):
    X, y = [], []
    for i in range(len(data) - time_steps):
        X.append(data[i:i+time_steps])
        y.append(data[i+time_steps])
    return np.array(X), np.array(y)


def forcast_values(scores,timeframes):

  scores = scaler_forecast.transform(scores)
  X,y = create_sequences(scores,timeframes)

  return scaler_forecast.inverse_transform(model_forecast.predict(X))


# Run the Flask app
if __name__ == '__main__':

    with open('scaler_minmax.pkl', 'rb') as file:
        minmax_scl = pickle.load(file)
    with open('scaler_standard.pkl', 'rb') as file:
        std_scl = pickle.load(file)
    with open('targeted_sclar_standard.pkl', 'rb') as file:
        trgt_scl_std = pickle.load(file)
    with open('model.pkl', 'rb') as f:
        model_forecast = pickle.load(f)
    with open('minmax.pkl', 'rb') as f:
        scaler_forecast = pickle.load(f)

    score_model = load_model('student_level_pred.keras')
    app.run(debug=True)