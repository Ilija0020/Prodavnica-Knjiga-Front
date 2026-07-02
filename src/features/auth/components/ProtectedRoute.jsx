import React, { useContext } from "react";
import UserContext from "../../../core/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  const token = localStorage.getItem("token");
  let currentUser = user;

  if (!currentUser && token) {
    try {
      currentUser = JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/books" replace />;
  }

  return children;
};

export default ProtectedRoute;
