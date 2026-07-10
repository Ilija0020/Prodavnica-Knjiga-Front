import AxiosClient from "../../../core/services/AxiosClient";

const RESOURCE = "/reviews";

const createReview = async (reviewData) => {
  try {
    await AxiosClient.post(RESOURCE, reviewData);
  } catch (error) {
    console.error("Error creating review", error);
    throw error;
  }
};

const reviewService = {
  createReview,
};

export default reviewService;
