import React from "react";
import { Link } from "react-router-dom"; // Import Link to navigate to EventDetails

export default function EventPage() {
  // Mock event data (you can replace this with real data later)
  const events = [
    {
      id: 1,
      title: "New York City Tour",
      date: "2025-06-01",
      description: "A guided tour of GA in NYC.",
    },
    {
      id: 2,
      title: "Paris Sightseeing",
      date: "2025-06-10",
      description: "Roam Paris, and eat some snacks",
    },
  ];

  return (
    <div>
      <h1>Explore Events</h1>
      <div>
        {events.map((event) => (
          <div key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <Link to={`/events/${event.id}`}>View Details</Link> {/* Link to event details page */}
          </div>
        ))}
      </div>
    </div>
  );
}