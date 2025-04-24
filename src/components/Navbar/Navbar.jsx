import styles from "./Navbar.module.css";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);  
  
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        
        {/* Conditional rendering based on authentication status */}
        {!isAuthenticated ? (  
          < section className={styles.auth}>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </section >
        ) : (  
          <>
            <li><Link to="/explore">Explore</Link></li>
            <li><button onClick={logout}>Log Out</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}