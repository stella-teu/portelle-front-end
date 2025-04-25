const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`; // ✅ Fixed here!

const create = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔒 Send JWT for auth
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating event:", error);
    return { error: error.message };
  }
};

export { create };
