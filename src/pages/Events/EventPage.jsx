import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Logging to check the events being fetched
console.log('EventPage loaded');

export default function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:5000/api/events");
      const data = await response.json();
      console.log("Fetched events:", data);  // Log the events to check what data we're getting
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Explore Events</h1>
      <div>
        {events.map((event) => (
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
