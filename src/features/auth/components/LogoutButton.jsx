import React, { useContext } from "react";
import UserContext from "../../../core/userContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <button type="button" className="btn btn-secondary" onClick={handleLogout}>
      Logout
    </button>
  );
};
export default LogoutButton;
