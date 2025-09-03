import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with full name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*?\)/, ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-page__container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__header">
            <div className="auth-form__header-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3658/3658758.png"
                alt="logo"
                className="auth-form__logo"
              />
              <div className="auth-form__text-content">
                <h2 className="auth-form__title">CodeDebugger</h2>
                <p className="auth-form__subtitle">Register to start debugging</p>
              </div>
            </div>
          </div>

          {error && <div className="auth-form__error">{error}</div>}

          <div className="auth-form__input-group">
            <input
              className="auth-form__input"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              className="auth-form__input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className="auth-form__input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              className="auth-form__input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form__actions">
            <button 
              type="submit" 
              className="auth-form__button"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Account'}
            </button>
          </div>

          <p className="auth-form__footer">
            Already have an account? <Link to="/login" className="auth-form__link">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;