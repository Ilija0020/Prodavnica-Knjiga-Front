import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:5234/api",
});

export default AxiosClient;
