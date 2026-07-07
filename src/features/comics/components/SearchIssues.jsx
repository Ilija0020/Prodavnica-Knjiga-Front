import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import comicService from "../services/comicService";
import SaveIssueModal from "./SaveIssueModal";

const SearchIssues = () => {
  const { volumeId } = useParams();
  const location = useLocation();

  const volumeName = location.state?.volumeName;

  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await comicService.searchIssuesByVolumeId(volumeId);
        setIssues(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, [volumeId]);

  return (
    <div>
      <h1>Issues</h1>
      {volumeName && <h2>{volumeName}</h2>}

      {loading && <p>Loading issues...</p>}
      {error && <p className="error-msg">{error}</p>}
      {successMessage && <p className="success-msg">{successMessage}</p>}

      {issues.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Name</th>
              <th>Issue Number</th>
              <th>Cover Date</th>
              <th>Store Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>
                  {issue.image?.small_url && (
                    <img
                      src={issue.image.small_url}
                      alt={issue.name || "Issue cover"}
                      style={{ width: "60px" }}
                    />
                  )}
                </td>
                <td>{issue.name}</td>
                <td>{issue.issue_number}</td>
                <td>{issue.cover_date}</td>
                <td>{issue.store_date}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedIssue && (
        <SaveIssueModal
          issue={selectedIssue}
          volumeId={volumeId}
          onClose={() => setSelectedIssue(null)}
          onSaved={() => setSuccessMessage("Issue saved successfully.")}
        />
      )}
    </div>
  );
};
export default SearchIssues;
