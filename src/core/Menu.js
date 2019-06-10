import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { logout , isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" }
    else return { colour: "#ffffff" }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/login")} to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>
                </>
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <a className="nav-link" style={
                            (isActive(history, "/logout"), { cursor: "pointer", color: "#fff" })
                        } onClick={() => logout(() => history.push('/'))} to="/logout">Logout</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={({ cursor: "pointer", color: "#fff" })}>
                        {isAuthenticated().user.name}
                        </a>
                    </li>
                </>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);

