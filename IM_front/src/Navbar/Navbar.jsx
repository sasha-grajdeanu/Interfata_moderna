import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink exact to="/" onClick={removeActive}>
          I.M. project
        </NavLink>
      </div>

      <div className={`navbar-section ${isActive ? "active" : ""}`}>
        <div className="hamburger-menu" onClick={toggleActiveClass}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="navbar-menu">
          <li>
            <NavLink exact to="/login" activeClassName="active" onClick={removeActive}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/dashboard" activeClassName="active" onClick={removeActive}>
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
