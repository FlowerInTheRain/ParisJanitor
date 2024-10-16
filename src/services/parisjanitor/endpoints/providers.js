import axios from '../axios';

const getPendingProviders = async () => {
    const url = `providers-admin/list-pending-providers`;
    try {
        const response = await axios.get(url);
        console.log("Appel de la route GET :", url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des prestataires :", error);
        throw error;
    }
};

export {
    getPendingProviders,
};
