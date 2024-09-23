import axios from '../axios';

const endpoint = "/properties"

const getAllProperty = async () => {
    try {
        const response = await axios.get(`${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error while getting user account: ', error)
        throw error;
    }
}
