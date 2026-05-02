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

const PublishersService = {
  getPublishers,
};

export default PublishersService;
