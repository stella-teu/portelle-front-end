import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetail.css";
import { deleteEvent } from "../../services/eventService.js";

const API_URL = import.meta.env.VITE_API_URL;  

export default function EventDetail() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate(); // Add useNavigate
  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/events/${eventId}`);
        const data = await response.json();
        setEvent(data.event);
        if (isAuthenticated) {
          const currentUserData = JSON.parse(atob(token.split(".")[1])).payload;
          setCurrentUser(currentUserData);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

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

  // Handle Edit button click
  const handleEdit = () => {
    navigate(`/events/${eventId}/edit`);  // Redirect to the Edit Event page
  };

  const handleDelete = async () => {
    navigate("/dashboard")
    await deleteEvent(eventId, token);
  }

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
{event.creator === currentUser._id ? (
  <>
        <button className="btn btn-primary" onClick={handleEdit}>
          <i className="fas fa-edit"></i>
          Edit Event
        </button>
        <button onClick={handleDelete}>Delete</button>
 </>
      ): (
        <button>Attend</button>
              )}
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
          Back to Events
        </button>
      </div>
      </div>
  );
}