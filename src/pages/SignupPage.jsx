import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

export default function SignupPage() {
  // Set up state for each form field
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Add state for confirmPassword
  const [city, setCity] = useState("");

  const navigate = useNavigate();  // Initialize useNavigate

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the form from refreshing the page

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // For now, we just log the data to the console (you can later handle this with an API)
    console.log("Signed up with:", { username, password, city });

    // Simulate storing the data (mock sign-up)
    localStorage.setItem("username", username);
    localStorage.setItem("jwtToken", "mocked-jwt-token"); // Store a mock token

    // Redirect to login page or dashboard after successful signup
    navigate("/login");  // Redirect to login page (or /dashboard)
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Your Journey Begins Here.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Capture username
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Capture password
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Capture confirmPassword
        />

        <label htmlFor="city">Select your destination city:</label>
        <select
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Capture selected city
        >
          <option value="new-york">New York</option>
          <option value="paris">Paris</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}



