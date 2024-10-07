import React from 'react';
import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <div className="sidenav">
      <h2>Navigation</h2>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/">Home</Link></li>
      </ul>
    </div>
  );
}

export default SideNav;
