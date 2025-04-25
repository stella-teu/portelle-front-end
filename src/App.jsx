import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext'; 
import Navbar from './components/Navbar'; 
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
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
        <Route path="/users/sign-in" element={<LoginPage />} />
        <Route path="/users/sign-up" element={<SignupPage />} />
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
