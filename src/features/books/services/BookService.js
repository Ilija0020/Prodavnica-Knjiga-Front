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

const getSortTypes = async () => {
  try {
    const response = await AxiosClient.get(`${RESOURCE}/sortTypes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sort types:", error);
    throw error;
  }
};

const getSortedBooks = async (sortType) => {
  try {
    const response = await AxiosClient.get(
      `${RESOURCE}/sort?sortType=${sortType}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sorted books:", error);
    throw error;
  }
};

const fetchFilteredAndSortedBooks = async (filterData, sortType) => {
  try {
    const response = await AxiosClient.post(
      `${RESOURCE}/filterAndSort?sortType=${sortType}`,
      filterData,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered and sorted books:", error);
    throw error;
  }
};

const getBookById = async (bookId) => {
  try {
    const response = await AxiosClient.get(`${RESOURCE}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

const createBook = async (bookData) => {
  try {
    const response = await AxiosClient.post(RESOURCE, bookData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

const updateBook = async (bookId, bookData) => {
  try {
    const response = await AxiosClient.put(`${RESOURCE}/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
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
  getSortTypes,
  getSortedBooks,
  fetchFilteredAndSortedBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

export default BooksService;
