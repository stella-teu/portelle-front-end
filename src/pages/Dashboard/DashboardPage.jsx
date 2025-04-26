import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from '../../services/eventService'; // Import the new service
import './Dashboard.css'; // Keep using Dashboard.css

export default function DashboardPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>

      <div className="cards">
        {events.length > 0 ? (
          events.map(event => (
            <div className="card" key={event._id}>
              <h2>{event.title}</h2>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
          ))
        ) : (
          <p>No events yet! Click the button below to create one.</p>
        )}
      </div>

      <button 
        className="create-event-button"
        onClick={() => navigate('/create-events')}
      >
        Create New Event
      </button>
    </div>
  );
}
