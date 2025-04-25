import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/eventService"; // go up two levels from /pages/events

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    city: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = await create(formData);
    if (newEvent?._id) {
      navigate("/dashboard");
    } else {
      alert("Failed to create event.");
    }
  };

  return (
    <section className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create a New Event</h2>
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
          Submit
        </button>
      </form>
    </section>
  );

  }

;

export default CreateEvent;
