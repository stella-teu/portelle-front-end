const API_URL = import.meta.env.VITE_API_URL;  

//  SIGN UP FUNCTION
export const signUpUser = async (username, password, city) => {
  console.log("Sending to API with city:", city);  // Debugging log

  if (!API_URL) {
    console.error("API_URL is not defined!");  
    throw new Error("API_URL is not defined.");
  }

  //  Corrected path with /api
  const response = await fetch(`${API_URL}/api/users/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, city }),
  });

  console.log("Signup response:", response);  // Log the full response

  if (!response.ok) {
    console.error("Signup request failed with status:", response.status);
    throw new Error("Signup failed");
  }

  const data = await response.json();
  console.log(" Signup success, data received:", data);
  return data;  // Should return your JWT token
};

//  LOGIN FUNCTION
export const loginUser = async (username, password) => {
  console.log("Logging in with:", { username, password });  // Debugging log

  if (!API_URL) {
    console.error("API_URL is not defined!");
    throw new Error("API_URL is not defined.");
  }

  //  Corrected path with /api
  const response = await fetch(`${API_URL}/api/users/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  console.log("Login response:", response);  // Log the full response

  if (!response.ok) {
    console.error("Login request failed with status:", response.status);
    throw new Error("Login failed");
  }

  const data = await response.json();
  console.log(" Login success, data received:", data);
  return data;  // Should return your JWT token
};

const showUserEvents = async (token) => {
    try {
        const response = await fetch(`${API_URL}/api/users/user-events`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export { showUserEvents };