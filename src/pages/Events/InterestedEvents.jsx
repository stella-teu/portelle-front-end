import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { showUserEvents } from "../../services/userServices.jsx";

export default function InterestedEvents() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [userInterestedEvents, setUserInterestedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/log-in");
    } else {
      const fetchInterestedEvents = async () => {
        try {
          const response = await showUserEvents(token);
          setUserInterestedEvents(response.user.interestedEvents);
        } catch (error) {
          console.error("Error fetching interested events:", error);
        }
      };

      fetchInterestedEvents();
    }
  }, [isAuthenticated, token, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="interested-events">
      <h1>Your Interested Events</h1>
      <div className="cards">
        {userInterestedEvents.length > 0 ? (
          userInterestedEvents.map((event) => (
            <div className="card" key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
              <button onClick={() => navigate(`/events/${event._id}`)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>You haven't added any interested events yet.</p>
        )}
      </div>
    </div>
  );
}