import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { deleteEvent } from "../../services/eventService.js";
import { toggleInterestedEvent } from "../../services/userServices.jsx";

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

        const userResponse = await fetch(`${API_URL}/api/users/user-events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();

        const isEventInterested = userData.user.interestedEvents.some(
          (interestedEvent) => interestedEvent._id === eventId
        );
        setIsInterested(isEventInterested);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    if (currentUser) {
      fetchEvent();
    }
  }, [eventId, currentUser, token]);

  if (!event) return <div>Loading...</div>;

  const handleEdit = () => {
    navigate(`/events/${eventId}/edit`);
  };

  const handleInterested = async () => {
    try {
      const updatedEvent = await toggleInterestedEvent(eventId);
      if (updatedEvent) {
        setIsInterested((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling interested status:", error);
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
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          {isInterested ? (
            <button onClick={handleInterested}>Uninterested</button>
          ) : (
            <button onClick={handleInterested}>Interested</button>
          )}
        </div>
      )}
    </div>
  );
}