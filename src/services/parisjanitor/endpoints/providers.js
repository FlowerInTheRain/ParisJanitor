import axios from '../axios';

const getPendingProviders = async () => {
    const url = `providers-admin/list-pending-providers`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des prestataires :", error);
        throw error;
    }
};

const approveProvider = async (id) => {
    const url = `providers-admin/approve-provider/${id}`;
    try {
        const response = await axios.put(url, {
            status: "approved"
        });
        console.log(`Prestataire approuvé avec succès : ${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de l'approbation du prestataire ${id} :`, error);
        throw error;
    }
};

const refuseProvider = async (id) => {
    const url = `providers-admin/refuse-provider/${id}`;
    try {
        const response = await axios.put(url);
        console.log(`Prestataire refusé avec succès : ${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors du refus du prestataire ${id} :`, error);
        throw error;
    }
};

export {
    getPendingProviders,
    approveProvider,
    refuseProvider
};
