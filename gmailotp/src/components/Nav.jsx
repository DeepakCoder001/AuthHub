import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            Auth <span>HUB</span>
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/home" className={isActive('/home') ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/login" className={isActive('/login') ? 'active' : ''}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className={isActive('/register') ? 'active' : ''}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/logout" className={isActive('/logout') ? 'active' : ''}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
};

export default Nav;
