const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const create = async (formData) => {
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`${BASE_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //  Send JWT for auth
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

export { create };
