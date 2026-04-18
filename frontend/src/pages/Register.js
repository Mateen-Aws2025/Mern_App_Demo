import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import '../styles/Auth.css';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.firstName.trim()) {
      setError('Name is required');
      return false;
    }
    if (!form.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!form.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await register(form);
      setSuccess("Account created successfully! ✅ Redirecting to login...");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again. ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-icon">🎉</span>
          <h1>Join Us Today!</h1>
          <p className="auth-subtitle">Create an account and start shopping</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={form.firstName}
              onChange={e => setForm({ ...form, firstName: e.target.value })}
              onKeyPress={handleKeyPress}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onKeyPress={handleKeyPress}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password (min 6 characters)"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyPress={handleKeyPress}
              className="form-input"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="auth-button"
          >
            {loading ? 'Creating Account..' : 'Create Account'}
          </button>
        </div>

        <div className="auth-footer">
          <p className="footer-text">
            Already have an account?
            <span
              className="link-text"
              onClick={() => navigate('/')}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;