import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AuthorService from "../../authors/services/AuthorService";
import PublishersService from "../../publishers/services/PublishersService";
import BooksService from "../services/BookService";

const BookForm = () => {

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorsData = await AuthorService.getAuthors();
                const publishersData = await PublishersService.getPublishers();
                setAuthors(authorsData);
                setPublishers(publishersData);
            
                if (id) {
                    const bookData = await BooksService.getBookById(id);
                    if (bookData.publishedDate) {
                        bookData.publishedDate = bookData.publishedDate.split('T')[0];
                    }
                    reset(bookData);
                } else {
                    reset({
                        title: '',
                        isbn: '',
                        pageCount: '',
                        publishedDate: '',
                        authorId: '',
                        publisherId: ''
                    });
                }
            } catch (error) {
                console.log("Error loading form data:", error.message);
            }
        }
        fetchData();
    }, [id, reset])

    const onSubmit = async (data) => {
        try {
            if (id) {
                await BooksService.updateBook(id, data);
            } else {
                 await BooksService.createBook(data);
            }
            navigate('/books');
        } catch (error) {
            console.log("Error saving book:", error.message);
        }
    }

    return (
        <div className="form-container">
            {id ? <h1>Edit Book</h1> : <h1>Create Book</h1>}
            <form onSubmit={handleSubmit(onSubmit)} className="book-form">

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="e.g. The Lord of the Rings"
                     {...register('title', { required: "Title is required" })} />
                    {errors.title && <p className="error-msg">{errors.title.message}</p>}
                </div>
                
                <div className="form-group">
                    <label>ISBN</label>
                    <input type="text" placeholder="e.g. 9780618053267"
                    {...register('isbn', { required: "ISBN is required" })} />
                    {errors.isbn && <p className="error-msg">{errors.isbn.message}</p>}
                </div>

                <div className="form-group">
                    <label>Page Count</label>
                    <input type="number" placeholder="e.g. 357"
                     {...register('pageCount', 
                        { 
                            required: "Page count is required",
                            min: { value: 1, message: "Page count must be greater than 0" }
                        })} 
                    />
                    {errors.pageCount && <p className="error-msg">{errors.pageCount.message}</p>}
                </div>

                <div className="form-group">
                    <label>Published Date</label>
                    <input type="date" {...register('publishedDate', { required: "Published date is required" })} />
                    {errors.publishedDate && <p className="error-msg">{errors.publishedDate.message}</p>}
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <select {...register('authorId', { required: "Author is required" })} >
                        <option value="">-- Select an author --</option>
                        {authors.map(a => (
                            <option key={a.id} value={a.id}>{a.fullName}</option>
                        ))}
                    </select>
                    {errors.authorId && <p className="error-msg">{errors.authorId.message}</p>}
                </div>

                <div className="form-group">
                    <label>Publisher</label>
                    <select {...register('publisherId', { required: "Publisher is required" })} >
                        <option value="">-- Select a publisher --</option>
                        {publishers.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    {errors.publisherId && <p className="error-msg">{errors.publisherId.message}</p>}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-edit">
                        {id ? 'Update' : 'Create'}
                    </button>
                    <button type="button" className="btn btn-delete" onClick={() => navigate('/books')}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default BookForm;
