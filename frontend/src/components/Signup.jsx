import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const Signup = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(username, email, password);
    if (!res.success) setError(res.message);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <p>Create an account to join the conversation.</p>
        
        {error && <div className="error-msg">{error}</div>}
        
        <div className="input-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

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
        
        <button type="submit" className="login-btn">Sign Up</button>
        
        <p className="switch-text">
          Already have an account? <button type="button" onClick={switchToLogin} className="link-btn">Login</button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
