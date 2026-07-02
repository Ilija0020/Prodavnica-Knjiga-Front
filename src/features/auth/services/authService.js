import AxiosClient from "../../../core/services/AxiosClient";

const RESOURCE = "/Auth";

const login = async (data) => {
  try {
    const response = await AxiosClient.post(`${RESOURCE}/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const register = async (data) => {
  try {
    const response = await AxiosClient.post(`${RESOURCE}/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

const getProfile = async () => {
  try {
    const response = await AxiosClient.get(`${RESOURCE}/profile`);
    return response.data;
  } catch (error) {
    console.error("Error getting profile:", error);
    throw error;
  }
};

const AuthService = {
  login,
  register,
  getProfile,
};

export default AuthService;
