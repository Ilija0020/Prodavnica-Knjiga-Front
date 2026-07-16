import React from "react";
import { useForm } from "react-hook-form";
import comicService from "../services/comicService";

const SaveIssueModal = ({ issue, volumeId, onClose, onSaved }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!issue) return null;

  const releaseDate = issue.store_date || issue.cover_date;

  const imagePath =
    issue.image?.original_url ||
    issue.image?.super_url ||
    issue.image?.medium_url ||
    issue.image?.small_url;

  const onSubmit = async (data) => {
    const issueData = {
      externalIssueId: issue.id,
      pageCount: Number(data.pageCount),
      price: Number(data.price),
      availableCopies: Number(data.availableCopies),
    };

    await comicService.saveIssue(issueData);
    onSaved();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Save Issue</h2>

        <div className="issue-preview">
          {imagePath && (
            <img
              className="issue-preview-image"
              src={imagePath}
              alt={issue.name || "Issue cover"}
            />
          )}

          <div className="issue-details">
            <p>
              <strong>Name:</strong> {issue.name}
            </p>

            <p>
              <strong>Issue number:</strong> {issue.issue_number}
            </p>

            <p>
              <strong>Release date:</strong> {releaseDate}
            </p>

            <p>
              <strong>External issue ID:</strong> {issue.id}
            </p>

            <p>
              <strong>External volume ID:</strong> {volumeId}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="book-form">
          <div className="form-group">
            <label>Page Count</label>
            <input
              type="number"
              {...register("pageCount", {
                required: "Page count is required",
                min: { value: 1, message: "Page count must be greater than 0" },
              })}
            />
            {errors.pageCount && (
              <p className="error-msg">{errors.pageCount.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" },
              })}
            />
            {errors.price && (
              <p className="error-msg">{errors.price.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Available Copies</label>
            <input
              type="number"
              {...register("availableCopies", {
                required: "Available copies is required",
                min: {
                  value: 0,
                  message: "Available copies cannot be negative",
                },
              })}
            />
            {errors.availableCopies && (
              <p className="error-msg">{errors.availableCopies.message}</p>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-edit">
              Save
            </button>

            <button type="button" className="btn btn-delete" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveIssueModal;
