import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token); 
  } else {
    delete apiClient.defaults.headers["Authorization"];
    localStorage.removeItem("token"); 
  }
};

const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthToken(savedToken);
}

const thresholds = {
    easy: 0.5,
    medium: 0.7,
    hard: 0.8
}


export default apiClient;
