const BASE_URL = "http://localhost:3000/";
const BASE_MODEL_URL = "http://localhost:5000/cosine-similarity"


export const thresholds = {
    easy: 0.5,
    medium: 0.7,
    hard: 0.8
}


export default { BASE_URL, thresholds, BASE_MODEL_URL };