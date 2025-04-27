import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetail.css";

const API_URL = import.meta.env.VITE_API_URL;  

export default function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/events/${eventId}`);
        const data = await response.json();
        setEvent(data.event);
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
        <button className="btn btn-primary" onClick={() => navigate(`/events/${eventId}/edit`)}>
          <i className="fas fa-edit"></i>
          Edit Event
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
          Back to Events
        </button>
      </div>
    </div>
  );
}
