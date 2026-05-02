import React, { useEffect, useState } from "react";
import PublishersService from "../services/PublishersService";

const PublishersList = () => {

    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPublishers = async () => {
        try {
            const data = await PublishersService.getPublishers();
            setPublishers(data);
            setError('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }; 

    useEffect(() => {
        loadPublishers();
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <h1>Publishers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.address}</td>
                            <td>{p.website}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PublishersList;