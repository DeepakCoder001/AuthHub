import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/classic.css';

const API = 'https://authhub-backend-wyyr.onrender.com';

function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      alert('Please enter your email first');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await axios.post(`${API}/send-otp`, {
        email: formData.email,
        purpose: 'register'
      });
      setOtpSent(true);
      alert(res.data.message);
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.otp) {
      alert('Please enter the OTP sent to your Gmail');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        otp: formData.otp
      });

      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration Failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="classic-page">
      <div className="classic-card classic-card-wide">

        <div className="classic-sidebar">
          <h1>Join Us</h1>
          <p>
            Create your account with phone number verification.
            An OTP will be sent to your Gmail to confirm your email address.
            All data is stored securely in MongoDB.
          </p>
        </div>

        <div className="classic-form-section">
          <h2 className="classic-title">Register</h2>
          <p className="classic-subtitle">Step {step} of 2 — Email verification via Gmail OTP</p>

          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`} />
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`} />
          </div>

          <form className="classic-form" onSubmit={handleSubmit}>

            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your.email@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {step === 1 && (
              <button
                type="button"
                className="classic-btn"
                onClick={handleSendOtp}
                disabled={otpLoading}
              >
                {otpLoading ? 'Sending OTP...' : 'Send OTP to Gmail'}
              </button>
            )}

            {step === 2 && (
              <>
                {otpSent && (
                  <p className="otp-sent-msg">
                    OTP sent to {formData.email}. Check your Gmail inbox.
                  </p>
                )}

                <label htmlFor="otp">Enter OTP</label>
                <div className="otp-row">
                  <input
                    id="otp"
                    type="text"
                    name="otp"
                    placeholder="6-digit code"
                    value={formData.otp}
                    onChange={handleChange}
                    maxLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="classic-btn classic-btn-outline"
                    onClick={handleSendOtp}
                    disabled={otpLoading}
                  >
                    Resend
                  </button>
                </div>

                <button type="submit" className="classic-btn" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </>
            )}
          </form>

          <p className="classic-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
