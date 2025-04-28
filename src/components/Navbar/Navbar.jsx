import styles from "./Navbar.module.css";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx'; 

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);  
  
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        
        {}
        {!isAuthenticated ? (  
          < section className={styles.auth}>
            <li><Link to="/log-in">Log In</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
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
