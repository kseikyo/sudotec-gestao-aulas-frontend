import axios from "axios";
import AuthContext from "../context/auth-context";

const api = axios.create({
  baseURL: "http://api.sudotect.test/api"
});

api.interceptors.request.use(async config => {
  const token = AuthContext.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;