import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
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
                        <NavLink to="/authors/pagination"> Authors </NavLink>
                    </li>
                    <li>
                        <NavLink to="/books" end> Books </NavLink>
                    </li>
                    <li>
                        <NavLink to="/books/create"> Create Book </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;