const BASE_URL = `${import.meta.env.VITE_API_URL}/api/events`;

const create = async (formData) => {
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data.event;
  } catch (error) {
    console.error("Error creating event:", error);
    return { error: error.message };
  }
};

const edit = async (eventId, formData) => {
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`${BASE_URL}/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing event:", error);
    return { error: error.message };
  }
};

const getAllEvents = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const deleteEvent = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete event");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const editInterestedEvent = async (eventId) => {
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${eventId}`, 
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling interested event:", error);
    return { error: error.message };
  }
};
export { create, edit, getAllEvents, deleteEvent, editInterestedEvent };