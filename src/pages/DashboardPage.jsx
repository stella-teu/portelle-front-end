import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../context/AuthContext"; 

export default function DashboardPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();  

  // Mock user data (can be fetched from backend later)
  const [userData, setUserData] = useState({
    username: "JohnDoe",
    city: "New York",
  });

  // Mock event data (replace with actual data from backend later)
  const [userEvents, setUserEvents] = useState([
    { id: 1, title: "New York City Tour", date: "2025-06-01", description: "A guided tour through the best spots in NYC." },
    { id: 2, title: "Paris Sightseeing", date: "2025-06-10", description: "Visit iconic landmarks in Paris." },
  ]);

  const [attendingEvents, setAttendingEvents] = useState([
    { id: 3, title: "Eiffel Tower Tour", date: "2025-07-01", description: "A tour of the Eiffel Tower." },
  ]);

  // Filter out events the user has created from the "attending" section
  const filteredAttendingEvents = attendingEvents.filter(
    (event) => !userEvents.some((userEvent) => userEvent.id === event.id)
  );

  // Use effect to trigger redirect if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); 
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div>
      <h1>Welcome to your Dashboard, {userData.username}!</h1>
      <p>City: {userData.city}</p>

      <h2>Your Created Events</h2>
      {userEvents.length > 0 ? (
        <div>
          {userEvents.map((event) => (
            <div key={event.id}>
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>{event.description}</p>
              <button onClick={() => navigate(`/events/${event.id}`)}>View Event Details</button> {/* Event details link */}
              <button>Edit</button> {/* Edit Event */}
              <button>Delete</button> {/* Delete Event */}
            </div>
          ))}
        </div>
      ) : (
        <p>You have not created events yet.</p>
      )}

      <h2>Events You Will Attend</h2>
      {filteredAttendingEvents.length > 0 ? (
        <div>
          {filteredAttendingEvents.map((event) => (
            <div key={event.id}>
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>{event.description}</p>
              <button onClick={() => navigate(`/events/${event.id}`)}>View Event Details</button> {/* Event details link */}
            </div>
          ))}
        </div>
      ) : (
        <p>You are not attending any events at the moment.</p>
      )}
    </div>
  );
}