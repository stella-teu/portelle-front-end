import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/service';  // Correctly importing loginUser from service.jsx

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);  // Access the login function from AuthContext
  const navigate = useNavigate();  // Used for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login service
      const data = await loginUser(username, password);

      // If login is successful, save the token and navigate to dashboard
      login(data.token);
      navigate('/dashboard');  // Redirect to dashboard after login
    } catch (error) {
      console.log('Login failed', error);
      alert('Login failed! Please try again.');
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
