import React, { useEffect, useState } from "react";
import BooksService from "../services/BookService";
import { useNavigate } from "react-router-dom";

const BooksList = () => {

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadBooks = async () => {
        try {
            const data = await BooksService.getBooks();
            setBooks(data);
            setError('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await BooksService.deleteBook(id);
                setBooks(books.filter(book => book.id !== id));
                setError('');
            } catch (error) {
                setError(error.message);
            } 
        }
    }

    useEffect(() => {
        loadBooks();
    }, []);
    return (
        <div>
            {loading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            <h1>Books</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>author</th>
                        <th>published date</th>
                        <th>isbn</th>
                        <th>pages</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(b => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.title}</td>
                                <td>{b.author?.fullName}</td>
                                <td>{new Date(b.publishedDate).toLocaleDateString()}</td>
                                <td>{b.isbn}</td>
                                <td>{b.pageCount}</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => navigate(`/books/edit/${b.id}`)}>Edit</button>
                                    <button className="btn btn-delete" onClick={() => handleDelete(b.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BooksList;
