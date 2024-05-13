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
        <NavLink exact to="/">
          I.M. project
        </NavLink>
      </div>
      <div className={`navbar-section ${isActive ? "active":""}`} >
        <ul className="navbar-menu">
          <li>
            <NavLink exact to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/Dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
