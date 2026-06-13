import React, { useEffect, useState } from "react";
import BooksService from "../services/BookService";
import AuthorService from "../../authors/services/AuthorService";
import { useNavigate } from "react-router-dom";
import SortTypeDropdown from "../../../core/components/SortTypeDropdown";
import FilterSection from "./FilterSection";

const BooksList = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortType, setSortType] = useState(0);
  const [sortTypeOptions, setSortTypeOptions] = useState([]);

  const [authors, setAuthors] = useState([]);
  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    const loadSortTypes = async () => {
      try {
        const options = await BooksService.getSortTypes();
        setSortTypeOptions(options);
      } catch (error) {
        console.error("Error loading sort types:", error.message);
      }
    };

    const loadAuthors = async () => {
      try {
        const data = await AuthorService.getAuthors();
        setAuthors(data);
      } catch (err) {
        console.error("Error loading authors:", err.message);
      }
    };

    loadSortTypes();
    loadAuthors();
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await BooksService.fetchFilteredAndSortedBooks(
          filterParams,
          Number(sortType),
        );
        setBooks(data);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [sortType, filterParams]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await BooksService.deleteBook(id);
        setBooks(books.filter((book) => book.id !== id));
        setError("");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleFilter = (filters) => {
    setFilterParams(filters);
  };

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <h1>Books</h1>

      <FilterSection authors={authors} onFilter={handleFilter} />

      <SortTypeDropdown
        sortType={sortType}
        options={sortTypeOptions}
        onSelect={setSortType}
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Published Date</th>
            <th>ISBN</th>
            <th>Pages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => {
            const formattedDate = b.publishedDate
              ? new Date(b.publishedDate).toLocaleDateString()
              : "";
            return (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.authorFullName}</td>
                <td>{b.publisherName}</td>
                <td>{formattedDate}</td>
                <td>{b.isbn}</td>
                <td>{b.pageCount}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => navigate(`/books/edit/${b.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
