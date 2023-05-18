import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/Nav.css"; // Import your CSS file for navbar styling

function Nav() {
  return (
    <container>
      <nav className="navbar">
        {" "}
        {/* Add a class name for styling */}
        <div className="logo">TESTT</div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/doctors">Doctors</Link>
          </li>
          <li>
            <Link to="/majors">Majors</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </container>
  );
}

export default Nav;
