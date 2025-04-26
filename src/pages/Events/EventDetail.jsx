import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;  

export default function EventDetail() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate(); // Add useNavigate
  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`${API_URL}/api/events/${eventId}`);
      const data = await response.json();
      setEvent(data.event);
      if (isAuthenticated) {
        const currentUserData = JSON.parse(atob(token.split(".")[1])).payload;
        setCurrentUser(currentUserData);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  // Handle Edit button click
  const handleEdit = () => {
    navigate(`/events/${eventId}/edit`);  // Redirect to the Edit Event page
  };

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>City: {event.city}</p>
      {event.creator === currentUser._id ? (
        <div>
          <button onClick={handleEdit}>Edit</button> {/* Edit button to navigate */}
          <button>Delete</button>
        </div>
      ) : (
        <button>Attend</button>
      )}
    </div>
  );
}