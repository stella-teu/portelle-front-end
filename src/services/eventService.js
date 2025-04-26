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

export { create, getAllEvents };
