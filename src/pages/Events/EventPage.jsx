import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;  

console.log('EventPage loaded');

export default function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`${API_URL}/api/events`);
      const data = await response.json();
      console.log("Fetched events:", data);  
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className='dashboard'>
      <h1>Explore Events</h1>
      <div className="cards">
        {events.map((event) => (
          <div className="card" key={event._id}>
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
