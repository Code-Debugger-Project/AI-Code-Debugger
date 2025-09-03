import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/home');
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.?\)/, ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.?\)/, ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Animated Debug Background */}
      <div className="debug-background">
        {/* Code Blocks */}
        <div className="code-block">
          function debug() {'{'}
          <br />
          {'  '}console.log("test");
          <br />
          {'}'}
        </div>
        <div className="code-block">
          if (error) {'{'}
          <br />
          {'  '}throw new Error();
          <br />
          {'}'}
        </div>
        <div className="code-block">
          try {'{'}
          <br />
          {'  '}executeCode();
          <br />
          {'}'} catch(e) {'{}'}
        </div>
        <div className="code-block">
          debugger;
          <br />
          const result = func();
          <br />
          return result;
        </div>
        <div className="code-block">
          console.error(
          <br />
          {'  '}"Debug mode active"
          <br />
          );
        </div>
        
        {/* Binary Rain */}
        <div className="binary-rain" style={{left: '5%', animationDelay: '0s'}}>
          01010101<br />11001100<br />00110011
        </div>
        <div className="binary-rain" style={{left: '15%', animationDelay: '1s'}}>
          10101010<br />01100110<br />11001100
        </div>
        <div className="binary-rain" style={{left: '25%', animationDelay: '2s'}}>
          11110000<br />00001111<br />10101010
        </div>
        <div className="binary-rain" style={{left: '35%', animationDelay: '3s'}}>
          01010101<br />10101010<br />11110000
        </div>
        <div className="binary-rain" style={{left: '45%', animationDelay: '4s'}}>
          11001100<br />00110011<br />01010101
        </div>
        <div className="binary-rain" style={{left: '55%', animationDelay: '5s'}}>
          00110011<br />11001100<br />10101010
        </div>
        <div className="binary-rain" style={{left: '65%', animationDelay: '6s'}}>
          10101010<br />01010101<br />11110000
        </div>
        <div className="binary-rain" style={{left: '75%', animationDelay: '7s'}}>
          11110000<br />00001111<br />11001100
        </div>
        <div className="binary-rain" style={{left: '85%', animationDelay: '0.5s'}}>
          01100110<br />10011001<br />00110011
        </div>
        <div className="binary-rain" style={{left: '95%', animationDelay: '1.5s'}}>
          10011001<br />01100110<br />10101010
        </div>
        
        {/* Bug Icons */}
        <div className="bug-icon">🐛</div>
        <div className="bug-icon">🐛</div>
        <div className="bug-icon">🐛</div>
        
        {/* Circuit Lines */}
        <div className="circuit-line"></div>
        <div className="circuit-line"></div>
        <div className="circuit-line"></div>
        
        {/* Debug Consoles */}
        <div className="debug-console">
          <div className="console-header">
            <div className="console-dot"></div>
            <div className="console-dot"></div>
            <div className="console-dot"></div>
          </div>
          <div className="console-content">
            {'>'} Debugging session started<br />
            {'>'} Breakpoint set at line 42<br />
            <span className="error-line">{'>'} Error: undefined variable</span><br />
            {'>'} Stack trace generated
          </div>
        </div>
        <div className="debug-console">
          <div className="console-header">
            <div className="console-dot"></div>
            <div className="console-dot"></div>
            <div className="console-dot"></div>
          </div>
          <div className="console-content">
            {'>'} Variable watch active<br />
            {'>'} Memory usage: 45%<br />
            {'>'} Performance: OK<br />
            <span className="error-line">{'>'} Warning: Memory leak</span>
          </div>
        </div>
        
        {/* Particles */}
        <div className="particle" style={{left: '10%', animationDelay: '0s'}}></div>
        <div className="particle" style={{left: '20%', animationDelay: '1s'}}></div>
        <div className="particle" style={{left: '30%', animationDelay: '2s'}}></div>
        <div className="particle" style={{left: '40%', animationDelay: '3s'}}></div>
        <div className="particle" style={{left: '50%', animationDelay: '4s'}}></div>
        <div className="particle" style={{left: '60%', animationDelay: '5s'}}></div>
        <div className="particle" style={{left: '70%', animationDelay: '6s'}}></div>
        <div className="particle" style={{left: '80%', animationDelay: '7s'}}></div>
        <div className="particle" style={{left: '90%', animationDelay: '8s'}}></div>
      </div>

      {/* Login Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3658/3658758.png"
          alt="logo"
          className="auth-form__logo"
        />
        <h2 className="auth-form__title">CodeDebugger</h2>
        <p className="auth-form__subtitle">Welcome back! Please login</p>

        {error && <div className="auth-form__error">{error}</div>}

        <div className="auth-form__input-group">
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
        </div>

        <button type="submit" className="auth-form__button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <button
          type="button"
          className="auth-form__button auth-form__button--google"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          Continue with Google
        </button>

        <p className="auth-form__footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-form__link">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;