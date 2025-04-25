import styles from "./LogInPage.module.css"
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { AuthContext } from "../../context/AuthContext.jsx";
import { loginUser } from "../../services/service.jsx";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  const data = await loginUser(username, password);
  login(data.token);
  navigate("/dashboard");
} catch (error){
  console.log('Login failed', error);
  alert('Login failed! Please try again.');
}
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
