import AxiosClient from "../../../core/services/AxiosClient";

const RESOURCE = "/authors";

const getAuthors = async () => {
  try {
    const response = await AxiosClient.get(RESOURCE);
    return response.data;
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

const AuthorService = {
  getAuthors,
};

export default AuthorService;
