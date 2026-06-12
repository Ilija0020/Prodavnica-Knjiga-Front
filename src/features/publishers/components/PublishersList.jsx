import React, { useEffect, useState } from "react";
import PublishersService from "../services/PublishersService";

const PublishersList = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState(0);
  const [sortTypesOptions, setSortTypesOptions] = useState([]);

  const loadSortTypes = async () => {
    try {
      const options = await PublishersService.getSortTypes();
      setSortTypesOptions(options);
    } catch (error) {
      setError(error.message);
    }
  };

  const loadPublishers = async () => {
    try {
      setLoading(true);
      const data = await PublishersService.getSortedPublishers(
        Number(sortType),
      );
      setPublishers(data);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSortTypes();
  }, []);

  useEffect(() => {
    loadPublishers();
  }, [sortType]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Publishers</h1>
      <div>
        <label htmlFor="sortSelect" style={{ marginRight: "10px" }}>
          Sort by:
        </label>
        <select
          name="sortSelect"
          id="sortSelect"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          {sortTypesOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.address}</td>
              <td>{p.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublishersList;
