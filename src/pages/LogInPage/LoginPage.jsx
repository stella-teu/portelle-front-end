import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css"; // Import CSS module

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("jwtToken", "mocked-jwt-token");
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h1>Log In</h1>
      <p>Welcome back!</p>
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