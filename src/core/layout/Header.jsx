import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../userContext";
import LogoutButton from "../../features/auth/components/LogoutButton";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);
  return (
    <header className="main-header">
      <div className="logo">
        <NavLink to="/">
          <span>📚</span> Bookstore App
        </NavLink>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink to="/publishers"> Publishers </NavLink>
          </li>
          <li>
            <NavLink to="/publishers/sort"> Sort Publishers </NavLink>
          </li>
          <li>
            <NavLink to="/authors/pagination"> Authors </NavLink>
          </li>
          <li>
            <NavLink to="/books" end>
              Books
            </NavLink>
          </li>

          {user?.role === "Editor" && (
            <li>
              <NavLink to="/volumes/search">Search Volumes</NavLink>
            </li>
          )}

          {user && (
            <li>
              <NavLink to="/books/create">Create Book</NavLink>
            </li>
          )}

          {!user && (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>

              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}

          {user && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
