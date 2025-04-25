import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;  

export default function DashboardPage() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [userEvents, setUserEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const fetchUserEvents = async () => {
        try {
          const response = await fetch(`${API_URL}/api/events`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }

          const data = await response.json();
          setUserEvents(data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };

      fetchUserEvents();
    }
  }, [isAuthenticated, token, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Your Dashboard</h1>
<<<<<<< HEAD
      {/* :white_check_mark: Create Event Button */}
      <button onClick={() => navigate("/create-events")}>
        Create New Event
      </button>
      
    <div>
      <h1>Your Dashboard</h1>
=======

      {/* ✅ Create Event Button */}
      <button onClick={() => navigate("/create-events")}>
        Create New Event
      </button>

>>>>>>> 6b542c50e3590ae0e2b3696d1d183d7b96f36d35
      <h2>Your Events</h2>
      <div>
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <div key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
              <Link to={`/events/${event._id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>You haven't created any events yet.</p>
        )}
      </div>
    </div>
  );
}