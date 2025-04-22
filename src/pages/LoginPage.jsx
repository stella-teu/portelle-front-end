import React from "react";
export default function LoginPage() {
    return (
      <div>
        <h1>Log In</h1>
        <p>Welcome back, Traveler!</p>
        
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }