import axios from '../axios';

const endpoint = "/properties"

const getAllProperty = async () => {
    console.log("Début de getAllProperty"); // Log avant l'appel API
    try {
        const response = await axios.get(`${endpoint}`);
        console.log("Appel de la route GET :", `http://localhost:4001/parisjanitor-api${endpoint}`);
        console.log("Réponse de l'API :", response);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'appel API :", error.response ? error.response : error);
        throw error;
    }
};

export {
    getAllProperty
}