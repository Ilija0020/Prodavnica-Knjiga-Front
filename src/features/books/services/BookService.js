import AxiosClient from "../../../core/services/AxiosClient";

const RESOURCE = "/books";

const getBooks = async () => {
  try {
    const response = await AxiosClient.get(RESOURCE);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const deleteBook = async (bookId) => {
  try {
    await AxiosClient.delete(`${RESOURCE}/${bookId}`);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

const BooksService = {
  getBooks,
  deleteBook,
};

export default BooksService;
