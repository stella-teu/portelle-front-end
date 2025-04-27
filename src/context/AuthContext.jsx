import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('jwtToken');  // Get token from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(storedToken ? true : false);  // Initialize based on token
  const [token, setToken] = useState(storedToken);
  

  useEffect(() => {
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, [storedToken]);

  const login = (newToken) => {
    localStorage.setItem('jwtToken', newToken);  // Store token in localStorage
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
