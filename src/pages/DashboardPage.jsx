import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;  
console.log("✅ API_URL in DashboardPage:", API_URL);  // Confirm it's correct

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
          console.log("🔎 Fetching events with token:", token);  // Log token

          const response = await fetch(`${API_URL}/api/events`, {
            headers: {
              "Authorization": `Bearer ${token}`,  // Send token for protected route
            },
          });

          if (!response.ok) {
            console.error("❌ Failed to fetch events. Status:", response.status);
            throw new Error("Failed to fetch events");
          }

          const data = await response.json();
          console.log("✅ Fetched events:", data);  // Log events data
          setUserEvents(data);
        } catch (error) {
          console.error("❌ Error fetching events:", error);
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
    </div>
  );
}