import axios from '../axios';

const getAllProperty = async () => {
    const url = `/properties`;
    try {
        const response = await axios.get(url);
        console.log("Appel de la route GET :", url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des propriétés :", error);
        throw error;
    }
};

const addFavoriteProperty = async (propertyId) => {
    const url = `http://localhost:4001/parisjanitor-api/favorites/add?propertyId=${propertyId}`;
    try {
        const response = await axios.post(url);
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
        const response = await axios.get(url);
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
        const response = await axios.delete(url);
        console.log("Propriété supprimée des favoris :", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression des favoris :", error.response ? error.response : error);
        throw error;
    }
};

export {
    getAllProperty,
    addFavoriteProperty,
    getUserFavorites,
    removeFavoriteProperty
};
