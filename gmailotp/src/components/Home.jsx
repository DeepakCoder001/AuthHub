import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="home-page">
      <div className="home-card">
        <h1>{user ? `Welcome, ${user.name}` : 'Welcome Guest'}</h1>
        <p>Your phone app dashboard — data stored in MongoDB</p>

        {user ? (
          <>
            <div className="home-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Status:</strong> {user.isVerified ? 'Verified via Gmail OTP' : 'Registered'}</p>
            </div>
            <div className="home-actions">
              <Link to="/profile">Edit Profile</Link>
              <Link to="/logout" className="outline">Logout</Link>
            </div>
          </>
        ) : (
          <div className="home-actions">
            <Link to="/login">Login</Link>
            <Link to="/register" className="outline">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
