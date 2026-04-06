import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (!res.success) setError(res.message);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Login with your email to start chatting.</p>
        
        {error && <div className="error-msg">{error}</div>}
        
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="login-btn">Login</button>
        
        <p className="switch-text">
          Don't have an account? <button type="button" onClick={switchToSignup} className="link-btn">Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
