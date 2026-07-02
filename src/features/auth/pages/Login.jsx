import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../core/userContext";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      const token = await AuthService.login(data);

      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));

      setUser(payload);

      navigate("/books");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="form-container">
      <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
