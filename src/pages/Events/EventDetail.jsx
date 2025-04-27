import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { deleteEvent, editInterestedEvent } from "../../services/eventService.js";


const API_URL = import.meta.env.VITE_API_URL;

export default function EventDetail() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const currentUserData = JSON.parse(atob(token.split(".")[1])).payload;
      setCurrentUser(currentUserData);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${eventId}`);
        const data = await response.json();
        setEvent(data.event);

        if (data.event && currentUser) {
          if (data.event.interestedUsers.includes(currentUser._id)) {
            setIsInterested(true);
          }
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    if (currentUser) {
      fetchEvent();
    }
  }, [eventId, currentUser]); 

  if (!event) return <div>Loading...</div>;

  const handleEdit = () => {
    navigate(`/events/${eventId}/edit`);
  };

  const handleInterested = async () => {
    if (isInterested) return; 

    try {
      const updatedEvent = await editInterestedEvent(eventId);
      if (updatedEvent) {
        setIsInterested(true);
      } else {
        console.error("Failed to mark as interested.");
      }
    } catch (error) {
      console.error("Error marking event as interested:", error);
    }
  };

  const handleDelete = async () => {
    await deleteEvent(eventId, token);
    navigate("/dashboard"); 
  };

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>City: {event.city}</p>
      {event.creator === currentUser?._id ? (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button> {}
        </div>
      ) : (
        <div>
          {isInterested ? (
            <button disabled>Already Interested</button>
          ) : (
            <button onClick={handleInterested}>Interested</button>
          )}
        </div>
      )}
    </div>
  );
}