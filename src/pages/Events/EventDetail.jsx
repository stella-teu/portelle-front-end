import React from "react";
import { useParams } from "react-router-dom"; 

export default function EventDetail() {
  const { eventId } = useParams(); 

  // Mock event data (replace with real data later)
  const event = {
    id: eventId,
    title: "New York City Tour",
    date: "2025-06-01",
    description: "A guided tour through the best spots in NYC.",
    location: "New York, NY",
  };

  return (
    <div>
      <h1>{event.title}</h1>
      <p>Date: {event.date}</p>
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
    </div>
  );
}