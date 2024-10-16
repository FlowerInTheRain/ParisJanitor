import axiosInstance from '../axios';

const getAllProperty = async () => {
    const url = `/properties/validated`;
    try {
        const response = await axiosInstance.get(url);
        console.log("Appel de la route GET :", url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des propriétés :", error);
        throw error;
    }
};

const addProperty = async (propertyData) => {
    const url = 'http://localhost:4001/parisjanitor-api/properties';
    try {
        const response = await axiosInstance.post(url, propertyData);
        console.log("Propriété ajoutée avec succès :", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la propriété :", error.response ? error.response.data : error);
        throw error;
    }
};


const addFavoriteProperty = async (propertyId) => {
    const url = `http://localhost:4001/parisjanitor-api/favorites/add?propertyId=${propertyId}`;
    try {
        const response = await axiosInstance.post(url);
        console.log("Propriété ajoutée aux favoris :", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout aux favoris :", error.response ? error.response : error);
        throw error;
    }
};

const getUserFavorites = async () => {
    const url = `http://localhost:4001/parisjanitor-api/favorites/user/me`;
    try {
        const response = await axiosInstance.get(url, {
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

const removeFavoriteProperty = async (propertyId) => {
    const url = `http://localhost:4001/parisjanitor-api/favorites/remove?propertyId=${propertyId}`;
    try {
        const response = await axiosInstance.delete(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log("Propriété supprimée des favoris :", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression des favoris :", error.response ? error.response : error);
        throw error;
    }
};

const getPropertyById = async (propertyId) => {
    const url = `http://localhost:4001/parisjanitor-api/properties/${propertyId}`;
    try {
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la propriété :", error.response ? error.response : error);
        throw error;
    }
};

export {
    getAllProperty,
    addProperty,
    addFavoriteProperty,
    getUserFavorites,
    removeFavoriteProperty,
    getPropertyById
};
