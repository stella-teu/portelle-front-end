import React from "react";
export default function SignupPage() {
    return (
      <div>
        <h1>Sign Up</h1>
        <p>Your Journey Begins Here.</p>
        
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          
          <label htmlFor="city">Select your destination city:</label>
          <select id="city" name="city">
            <option value="new-york">New York</option>
            <option value="paris">Paris</option>
          </select>
          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }