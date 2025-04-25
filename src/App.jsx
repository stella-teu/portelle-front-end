import "./App.css";
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext'; 
import Navbar from './components/Navbar/Navbar.jsx'; 
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage';
import EventPage from './pages/Events/EventPage';  

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />
        <Route path="/explore" element={<EventPage />} />  {/* Add the Explore Page Route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;