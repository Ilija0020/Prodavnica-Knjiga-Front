import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import UserContext from "../../../core/userContext";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
        navigate("/books");
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [setUser, navigate]);

  const onSubmit = async (data) => {
    setError("");
    try {
      await AuthService.register(data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };
  return (
    <div className="form-container">
      <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Register as Librarian</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            id="surname"
            type="text"
            {...register("surname", { required: "Surname is required" })}
          />
          {errors.surname && (
            <p className="error-message">{errors.surname.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of birth:</label>
          <input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
          />
          {errors.dateOfBirth && (
            <p className="error-message">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
