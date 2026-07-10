import React, { useState } from "react";
import { useForm } from "react-hook-form";
import reviewService from "../services/reviewService";

const ReviewModal = ({ book, onClose, onSaved }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      const reviewData = {
        bookId: book.id,
        rating: Number(data.rating),
        comment: data.comment,
      };

      await reviewService.createReview(reviewData);

      onSaved();
    } catch (error) {
      setSubmitError("Failed to save review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!book) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Review Book</h2>
        <p>
          <strong>Book:</strong>
          {book.title}
        </p>

        {submitError && <p className="error-msg">{submitError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="book-form">
          <div className="form-group">
            <label>Rating</label>
            <select
              {...register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating cannot be greater than 5" },
              })}
            >
              <option value="">-- Select rating --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.rating && (
              <p className="error-msg">{errors.rating.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Comment</label>
            <textarea placeholder="Optional comment" {...register("comment")} />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-edit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className="btn btn-delete"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReviewModal;
