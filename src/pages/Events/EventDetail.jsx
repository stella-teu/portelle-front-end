import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./EventDetail.css";
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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchEvent();
    }
  }, [eventId, currentUser, token]);

  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }

  if (!event) {
    return <div className="loading">Event not found</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
    <div className="event-detail">
      <div className="event-header">
        <h1 className="event-title">{event.title}</h1>
        <div className="event-meta">
          <div className="meta-item">
            <i className="fas fa-calendar"></i>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="meta-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{event.city}</span>
          </div>
          {event.location && (
            <div className="meta-item">
              <i className="fas fa-location-dot"></i>
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="event-description">
        <h2>About this event</h2>
        <p>{event.description}</p>
      </div>

      <div className="event-actions">
        {event.creator === currentUser?._id ? (
          <>
            <button className="btn btn-primary" onClick={handleEdit}>
              <i className="fas fa-edit"></i> Edit Event
            </button>
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <>
            {isInterested ? (
              <button onClick={handleInterested}>Uninterested</button>
            ) : (
              <button onClick={handleInterested}>Interested</button>
            )}
          </>
        )}
        <button className="btn btn-secondary" onClick={() => navigate("/explore")}>
  <i className="fas fa-arrow-left"></i> Back to Events
</button>
      </div>
    </div>
  );
}