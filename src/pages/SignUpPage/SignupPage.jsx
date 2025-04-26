import styles from "./SignupPage.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../services/userServices";  

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Selected city:", city); 
    
    if (city !== "new-york" && city !== "paris") {
      alert("Please select a valid city: New York or Paris!");
      return;
    }

    try {
      const data = await signUpUser(username, password, city);

      localStorage.setItem("jwtToken", data.token);

      navigate("/log-in");  
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <p>Your Journey Begins Here.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label htmlFor="city">Select your destination city:</label>
        <select
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option value="">Select a city</option>
          <option value="new-york">New York</option>
          <option value="paris">Paris</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
