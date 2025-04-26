const API_URL = `${import.meta.env.VITE_API_URL}`;  

const showInterestedEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/api/`);
        const data = await response.json();
    } catch (error) {

    }
}