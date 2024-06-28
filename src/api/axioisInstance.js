import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
  // baseURL: "https://breakaway-points-system-api.onrender.com",
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  if (state.auth.accessToken) {
    config.headers.Authorization = `Bearer ${state.auth.accessToken}`;
  }
  return config;
});

export default api;
