import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;  

export default function DashboardPage() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [userEvents, setUserEvents] = useState([]);
  const [userInterestedEvents, setInterestedEvents] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/log-in");
    } else {
      const fetchUserEvents = async () => {
        try {

          const response = await fetch(`${API_URL}/api/events`, {
            headers: {
              "Authorization": `Bearer ${token}`,  // Send token for protected route
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }

          const data = await response.json();
          setUserEvents(data);
        } catch (error) {
          console.error("❌ Error fetching events:", error);
        }
      };

      fetchUserEvents();

      const fetchInterestedEvents = async () => {
        try {

        } catch (error) {

        }
      }
    }
  }, [isAuthenticated, token, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Your Dashboard</h1>
      <h2>Your Events</h2>
      <div>
        {userEvents.map((event) => (
          <div key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <Link to={`/events/${event._id}`}>View Details</Link>
          </div>
        ))}
      </div>
      <h2>Interested Events</h2>
      <div>
        {userInterestedEvents.map((event) => {
          <div key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <Link to={`/events/${event._id}`}>View Details</Link>
            </div >
        })}
      </div>
    </div>
  );
}