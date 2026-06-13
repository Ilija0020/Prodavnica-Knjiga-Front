import React, { useState } from "react";

const FilterSection = ({ authors, onFilter }) => {
    const [title, setTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [publishedDateFrom, setPublishedDateFrom] = useState("");
    const [publishedDateTo, setPublishedDateTo] = useState("");
    const [authorDateOfBirthFrom, setAuthorDateOfBirthFrom] = useState("");
    const [authorDateOfBirthTo, setAuthorDateOfBirthTo] = useState("");

    const handleSearch = () => {
        const filterData = {
            title: title !== "" ? title : null,
            authorFullName: authorName !== "" ? authorName : null,
            authorId: authorId !== "" ? Number(authorId) : null,
            publishedDateFrom: publishedDateFrom !== "" ? new Date(publishedDateFrom).toISOString() : null,
            publishedDateTo: publishedDateTo !== "" ? new Date(publishedDateTo).toISOString() : null,
            authorDateOfBirthFrom: authorDateOfBirthFrom !== "" ? new Date(authorDateOfBirthFrom).toISOString() : null,
            authorDateOfBirthTo: authorDateOfBirthTo !== "" ? new Date(authorDateOfBirthTo).toISOString() : null
        };
        onFilter(filterData);
    };

    const handleReset = () => {
        setTitle("");
        setAuthorName("");
        setAuthorId("");
        setPublishedDateFrom("");
        setPublishedDateTo("");
        setAuthorDateOfBirthFrom("");
        setAuthorDateOfBirthTo("");
        onFilter({}); // Šaljemo prazan filter da povuče sve knjige
    };

    return (
        <div className="filter-section">
            <h3>Filter Books</h3>
            
            <div className="filter-row">
                <div className="form-group">
                    <label>Book Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g. Harry Potter" />
                </div>

                <div className="form-group">
                    <label>Author Name (Contains):</label>
                    <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="E.g. J.K." />
                </div>

                <div className="form-group">
                    <label>Or select specific Author:</label>
                    <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                        <option value="">-- All Authors --</option>
                        {authors && authors.map(a => (
                            <option key={a.id} value={a.id}>{a.fullName}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="filter-row">
                <div className="form-group">
                    <label>Published After:</label>
                    <input type="date" value={publishedDateFrom} onChange={(e) => setPublishedDateFrom(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Published Before:</label>
                    <input type="date" value={publishedDateTo} onChange={(e) => setPublishedDateTo(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Author Born After:</label>
                    <input type="date" value={authorDateOfBirthFrom} onChange={(e) => setAuthorDateOfBirthFrom(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Author Born Before:</label>
                    <input type="date" value={authorDateOfBirthTo} onChange={(e) => setAuthorDateOfBirthTo(e.target.value)} />
                </div>
            </div>

            <div className="filter-actions">
                <button className="btn btn-secondary" onClick={handleReset}>
                    Reset
                </button>
                <button className="btn btn-primary" onClick={handleSearch}>
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSection;