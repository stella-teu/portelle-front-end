const API_URL = import.meta.env.VITE_API_URL;  

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