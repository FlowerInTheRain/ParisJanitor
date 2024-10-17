import axiosInstance from '../axios';

const endpoint = "/bookings";

const checkAvailability = async (propertyId, startDate, endDate) => {
    try {
        const response = await axiosInstance.get(`${endpoint}/availability?propertyId=${propertyId}&startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la vérification de la disponibilité :", error.response ? error.response : error);
        throw error;
    }
};

const createBooking = async (bookingDetails) => {
    try {
        const response = await axiosInstance.post(endpoint, bookingDetails);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la réservation :", error.response ? error.response : error);
        throw error;
    }
};

const hasBooking = async (startDate, endDate) => {
    try {
        const response = await axiosInstance.get(`${endpoint}/has-booking?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la vérification des réservations existantes :", error.response ? error.response : error);
        throw error;
    }
};

export {
    checkAvailability,
    hasBooking,
    createBooking
};