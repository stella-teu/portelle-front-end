import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LandingPage() {
  const { isAuthenticated } = useContext(AuthContext); 

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />; 
  }

  return (
    <div>
      <h1>Welcome to Portelle!</h1>
      <p>Explore the best events around the world.</p>
      <p>Log in or sign up to get started!</p>
    </div>
  );
}
