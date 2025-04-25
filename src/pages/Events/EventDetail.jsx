import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
      const data = await response.json();
      setEvent(data.event);
    };

    fetchEvent();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>City: {event.city}</p>
    </div>
  );
}
