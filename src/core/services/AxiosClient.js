import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:5234/api",
});

AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AxiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized. Please log in again.");
    }

    return Promise.reject(error);
  },
);

export default AxiosClient;
