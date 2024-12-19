import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const apiClient = axios.create({
  
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (request) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log("Starting Request", request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
