import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../auth";
import logo from "./logo.png";
import "./Home.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { colour: "#ffffff" };
};

const Menu = ({ history }) => (
  <nav className="navbar">
    <a className="navbar-brand" href="/">
      <img className="logo" src={logo} />
    </a>

    <div>
      <ul
        className="nav selection mr-auto"
        style={{ backgroundColor: "#3e66ef" }}
      >
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/login")}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <a className="nav-link" style={{ cursor: "pointer" }}>
                {isAuthenticated().user.name}
              </a>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/userItem")}
                to="/userItem"
              >
                Items
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/chat")}
                to="/chat"
              >
                Chats
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={(isActive(history, "/logout"), { cursor: "pointer" })}
                onClick={() => logout(() => history.push("/"))}
                to="/logout"
              >
                Logout
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
);

export default withRouter(Menu);
