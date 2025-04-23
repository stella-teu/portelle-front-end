import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, we just mock the login by storing the token
    localStorage.setItem("jwtToken", "mocked-jwt-token");

    // After login, we trigger the login function from AuthContext
    // login("mocked-jwt-token"); // Mock token for testing

    // Redirect the user to the Dashboard after successful login
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Log In</h1>
      <p>Welcome back, Traveler!</p>
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