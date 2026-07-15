import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/classic.css';

const API = 'https://authhub-backend-wyyr.onrender.com';

const Login = () => {
  const navigate = useNavigate();

  const [loginMode, setLoginMode] = useState('password');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveSession = (user) => {
    localStorage.setItem('token', 'loggedIn');
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/login`, {
        email: formData.email,
        password: formData.password
      });

      saveSession(res.data.user);
      alert(res.data.message);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
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
        purpose: 'login'
      });
      setOtpSent(true);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();

    if (!formData.otp) {
      alert('Please enter the OTP from your Gmail');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/login-otp`, {
        email: formData.email,
        otp: formData.otp
      });

      saveSession(res.data.user);
      alert(res.data.message);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="classic-page">
      <div className="classic-card classic-card-wide">

        <div className="classic-sidebar">
          <h1>Welcome Back</h1>
          <p>
            Sign in with your password or use a one-time code
            sent to your Gmail. Your profile data is stored in MongoDB.
          </p>
        </div>

        <div className="classic-form-section">
          <h2 className="classic-title">Login</h2>
          <p className="classic-subtitle">Choose your sign-in method</p>

          <div className="classic-tabs">
            <button
              type="button"
              className={`classic-tab ${loginMode === 'password' ? 'active' : ''}`}
              onClick={() => setLoginMode('password')}
            >
              Password
            </button>
            <button
              type="button"
              className={`classic-tab ${loginMode === 'otp' ? 'active' : ''}`}
              onClick={() => setLoginMode('otp')}
            >
              Gmail OTP
            </button>
          </div>

          {loginMode === 'password' ? (
            <form className="classic-form" onSubmit={handlePasswordLogin}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password-box">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>

              <button type="submit" className="classic-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form className="classic-form" onSubmit={handleOtpLogin}>
              <label htmlFor="otp-email">Email</label>
              <input
                id="otp-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="classic-btn classic-btn-outline"
                onClick={handleSendOtp}
                disabled={otpLoading}
              >
                {otpLoading ? 'Sending...' : 'Send OTP to Gmail'}
              </button>

              {otpSent && (
                <p className="otp-sent-msg">
                  OTP sent to {formData.email}. Check your Gmail inbox.
                </p>
              )}

              <label htmlFor="otp">Enter OTP</label>
              <input
                id="otp"
                type="text"
                name="otp"
                placeholder="6-digit code from Gmail"
                value={formData.otp}
                onChange={handleChange}
                maxLength={6}
                required
              />

              <button type="submit" className="classic-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Login with OTP'}
              </button>
            </form>
          )}

          <p className="classic-link">
            New user? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
