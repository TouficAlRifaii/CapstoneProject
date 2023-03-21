import React from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/Nav.css'; // Import your CSS file for navbar styling

function Nav() {
  return (
    <nav className="navbar"> {/* Add a class name for styling */}
      <div className="logo">
        TESTT
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
