import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import comicService from "../services/comicService";

const SearchVolumes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";

  const [query, setQuery] = useState(queryFromUrl);
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!query.trim()) {
      setError("Please enter a volume name.");
      return;
    }

    setSearchParams({ query: query.trim() });
  };

  useEffect(() => {
    const loadVolumes = async () => {
      if (!queryFromUrl.trim()) return;

      try {
        setLoading(true);
        setError(null);

        const data = await comicService.searchVolumes(queryFromUrl);
        setVolumes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadVolumes();
  }, [queryFromUrl]);

  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  return (
    <div>
      <h1>Search Volumes</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search volumes..."
        />

        <button className="btn btn-primary search-button" type="submit">
          Search
        </button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p className="error-msg">{error}</p>}

      {volumes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Year</th>
              <th>Issues Count</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {volumes.map((volume) => (
              <tr key={volume.id}>
                <td>{volume.name}</td>
                <td>{volume.start_year}</td>
                <td>{volume.count_of_issues}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() =>
                      navigate(`/volumes/${volume.id}/issues`, {
                        state: { volumeName: volume.name },
                      })
                    }
                  >
                    Issues
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default SearchVolumes;
