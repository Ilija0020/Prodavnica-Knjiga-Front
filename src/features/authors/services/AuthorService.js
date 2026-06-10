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

const getAuthorsPage = async (page) => {
  try {
    const response = await AxiosClient.get(`${RESOURCE}/paging?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching authors page:", error);
    throw error;
  }
};

const AuthorService = {
  getAuthors,
  getAuthorsPage,
};

export default AuthorService;
