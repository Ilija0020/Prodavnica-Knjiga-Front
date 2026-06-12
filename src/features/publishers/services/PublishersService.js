import AxiosClient from "../../../core/services/AxiosClient";

const RESOURCE = "/publishers";

const getPublishers = async () => {
  try {
    const response = await AxiosClient.get(RESOURCE);
    return response.data;
  } catch (error) {
    console.error("Error fetching publishers:", error);
    throw error;
  }
};

const getSortedPublishers = async (sortType) => {
  try {
    const response = await AxiosClient.get(
      `${RESOURCE}/sort?sortType=${sortType}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sorted publishers:", error);
    throw error;
  }
};

const getSortTypes = async () => {
  try {
    const response = await AxiosClient.get(`${RESOURCE}/sortTypes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sort types:", error);
    throw error;
  }
};

const PublishersService = {
  getPublishers,
  getSortedPublishers,
  getSortTypes,
};

export default PublishersService;
