import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { showUserEvents } from "../services/eventServices.jsx";

export default function DashboardPage() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [userEvents, setUserEvents] = useState([]);
  const [userInterestedEvents, setUserInterestedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/log-in");
    } else {
      const fetchUserEvents = async () => {
        try {
          const response = await showUserEvents(token);
          console.log(response)
          setUserEvents(response.userCreatedEvents);
          setUserInterestedEvents(response.user.interestedEvents);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };

      fetchUserEvents();
    }
  }, [isAuthenticated, token, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Your Dashboard</h1>

      <button onClick={() => navigate("/create-events")}>
        Create New Event
      </button>


      <h2>Your Events</h2>
      <div>
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <div key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
              <Link to={`/events/${event._id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>You haven't created any events yet.</p>
        )}
      </div>
      <h2>Interested Events</h2>
      <div>
        {userInterestedEvents.length > 0 ? (
          userInterestedEvents.map((event) => (
            <div key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <Link to={`/events/${event._id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>You haven't added any interested events yet.</p>
        )}
      </div>
    </div>
  );
}
