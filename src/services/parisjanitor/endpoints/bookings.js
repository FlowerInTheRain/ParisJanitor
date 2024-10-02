import axios from '../axios';

const endpoint = "/bookings";

const checkAvailability = async (propertyId, startDate, endDate) => {
    try {
        const response = await axios.get(`${endpoint}/availability?propertyId=${propertyId}&startDate=${startDate}&endDate=${endDate}`);
        console.log("Réponse complète de l'API :", response);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la vérification de la disponibilité :", error.response ? error.response : error);
        throw error;
    }
};

export {
    checkAvailability
};
