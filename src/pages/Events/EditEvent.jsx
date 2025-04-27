import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { edit } from "../../services/eventService"; // Correct import

const EditEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    city: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
      const data = await response.json();

      // Prefill the form with the existing event data
      setFormData({
        title: data.event.title,
        description: data.event.description,
        date: data.event.date, // Assuming it's in yyyy-mm-dd format
        city: data.event.city,
      });
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = await edit(eventId, formData);

    if (updatedEvent?._id) {
      navigate(`/events/${eventId}`); // Redirect to event detail page after successful update
    } else {
      alert("Failed to update event.");
    }
  };

  return (
    <section className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <label htmlFor="city">Select your destination city:</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Select a city</option>
          <option value="new-york">New York</option>
          <option value="paris">Paris</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Update Event
        </button>
      </form>
    </section>
  );
};

export default EditEvent;