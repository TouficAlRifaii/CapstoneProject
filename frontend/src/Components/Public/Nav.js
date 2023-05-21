import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/Nav.css";
//Navbar
function Nav() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Course Offering software</div>
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
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
