const API_URL = import.meta.env.VITE_API_URL;

export const signUpUser = async (username, password, city) => {
  const response = await fetch(`${API_URL}/api/users/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, city }),
  });

  if (!response.ok) throw new Error("Signup failed");

  const data = await response.json();
  return data;
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/api/users/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json();
  return data;
};

export const showUserEvents = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/users/user-events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user events:", error);
  }
};

export const toggleInterestedEvent = async (eventId) => {
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`${API_URL}/api/users/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling interested event:", error);
    return { error: error.message };
  }
};