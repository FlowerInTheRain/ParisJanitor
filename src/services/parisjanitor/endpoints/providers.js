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

const getPendingCertificates = async () => {
    const url = 'providers-admin/list-pending-certificates';
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des certificats en attente :', error);
        throw error;
    }
};

const approveProvider = async (id) => {
    const url = `providers-admin/approve-provider/${id}`;
    try {
        const response = await axios.put(url, {
            status: "approved"
        });
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
        return response.data;
    } catch (error) {
        console.error(`Erreur lors du refus du prestataire ${id} :`, error);
        throw error;
    }
};

const approveCertificate = async (id) => {
    const url = `providers-admin/approve-provider/${id}`;
    try {
        const response = await axios.put(url);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de l'approbation du certificat ${id} :`, error);
        throw error;
    }
};

const refuseCertificate = async (id) => {
    const url = `providers-admin/refuse-provider/${id}`;
    try {
        const response = await axios.put(url);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors du refus du certificat ${id} :`, error);
        throw error;
    }
};

export {
    getPendingProviders,
    approveProvider,
    refuseProvider,
    getPendingCertificates,
    approveCertificate,
    refuseCertificate
};
