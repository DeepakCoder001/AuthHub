import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/classic.css';
import './Profile.css';

const API = 'https://authhub-backend-wyyr.onrender.com';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name,
        email: storedUser.email,
        phone: storedUser.phone
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API}/user/${user._id}`, formData);

      alert('Profile Updated');
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setEditMode(false);
    } catch {
      alert('Update failed');
    }
  };

  if (!user) {
    return (
      <div className="classic-page">
        <div className="classic-card">
          <h2 className="classic-title">Profile</h2>
          <p className="classic-subtitle">Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="classic-page">
      <div className="classic-card profile-card">
        <h2 className="classic-title">My Profile</h2>
        <p className="classic-subtitle">Manage your account details</p>

        <div className="profile-field">
          <label>Name</label>
          {editMode ? (
            <input name="name" value={formData.name} onChange={handleChange} />
          ) : (
            <p className="profile-value">{user.name}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Email</label>
          <p className="profile-value">{user.email}</p>
        </div>

        <div className="profile-field">
          <label>Phone</label>
          {editMode ? (
            <input name="phone" value={formData.phone} onChange={handleChange} />
          ) : (
            <p className="profile-value">{user.phone}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Verified</label>
          <p className="profile-value">{user.isVerified ? 'Yes (Gmail OTP)' : 'No'}</p>
        </div>

        <div className="btn-group">
          {editMode ? (
            <>
              <button onClick={handleUpdate} className="classic-btn">
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="classic-btn classic-btn-outline"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="classic-btn">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
