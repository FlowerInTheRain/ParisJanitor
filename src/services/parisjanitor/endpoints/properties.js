import axios from '../axios';

const getAllProperty = async () => {
    const url = `/properties/validated`;
    try {
        const response = await axios.get(url);
        console.log("Appel de la route GET :", url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des propriétés :", error);
        throw error;
    }
};

const getPropertyById = async (propertyId) => {
    const url = `/properties/${propertyId}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la propriété :", error);
        throw error;
    }
};

const addProperty = async (propertyData) => {
    const url = `/properties`;
    try {
        const response = await axios.post(url, propertyData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la propriété :", error);
        throw error;
    }
};

const addFavoriteProperty = async (propertyId) => {
    const url = `/favorites/add?propertyId=${propertyId}`;
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout aux favoris :", error);
        throw error;
    }
};

const removeFavoriteProperty = async (propertyId) => {
    const url = `/favorites/remove?propertyId=${propertyId}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression des favoris :", error);
        throw error;
    }
};

const getUserFavorites = async () => {
    const url = `/favorites/user/me`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log("Favoris récupérés :", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error.response ? error.response : error);
        throw error;
    }
};

const getAwaitedProperties = async () => {
    const url = `/properties/awaited`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des propriétés en attente :", error);
        throw error;
    }
};


const validateProperty = async (propertyId) => {
    const url = `/properties/${propertyId}/validate`;
    try {
        const response = await axios.put(url);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la validation de la propriété ${propertyId} :`, error);
        throw error;
    }
};

const refuseProperty = async (propertyId) => {
    const url = `/properties/${propertyId}/refuse`;
    try {
        const response = await axios.put(url);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors du refus de la propriété ${propertyId} :`, error);
        throw error;
    }
};

export {
    getAllProperty,
    addProperty,
    addFavoriteProperty,
    getUserFavorites,
    removeFavoriteProperty,
    getPropertyById,
    validateProperty,
    refuseProperty,
    getAwaitedProperties
};
