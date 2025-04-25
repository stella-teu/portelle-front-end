import "./App.css";
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext'; 

import Navbar from './components/Navbar/Navbar.jsx'; 
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import LoginPage from './pages/LogInPage/LoginPage.jsx';
import SignupPage from './pages/SignUpPage/SignupPage.jsx';

import DashboardPage from './pages/DashboardPage';
import EventPage from './pages/Events/EventPage';  

// Log the EventPage import to verify it's being correctly resolved
console.log("EventPage imported:", EventPage);

function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext); 
  if (!isAuthenticated) {
    return <Navigate to="/login" />; 
  }
  return children; 
}

function App() {
  return (
    <AuthProvider>  
      <Navbar /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />
        <Route path="/explore" element={<EventPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
