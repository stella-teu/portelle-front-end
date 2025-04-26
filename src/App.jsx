import "./App.css";
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar/Navbar.jsx'; 
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import LoginPage from './pages/LogInPage/LoginPage.jsx';
import SignupPage from './pages/SignUpPage/SignupPage.jsx';
import DashboardPage from './pages/Dashboard/DashboardPage';
import EventPage from './pages/Events/EventPage';
import EventDetail from "./pages/Events/EventDetail.jsx";
import CreateEvents from './pages/Events/CreateEvents';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/log-in" />;
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
        <Route
          path="/create-events"
          element={
            <PrivateRoute>
              <CreateEvents />
            </PrivateRoute>
          }
        />
                <Route
          path="/events/:eventId"
          element={
            <PrivateRoute>
              <EventDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
