import axios from '../axios';

const endpoint = "/users"

/**
 * @param {UserCreationRequestDto} requestBody
 */
const signUp = async (requestBody) => {
    try {
        const response = await axios.post(`${endpoint}`, requestBody);
        return response.data;
    } catch (error) {
        console.error('Error while creating user account: ', error)
        throw error;
    }
}

/**
 * @param {UserLogRequestDto} requestBody
 */
const signIn = async (requestBody) => {
    try {
        const response = await axios.post(`${endpoint}/log`, requestBody);
        return response.data;
    } catch (error) {
        console.error('Error while logging user account: ', error)
        throw error;
    }
}

const getMyProfile = async () => {
    try {
        const response = await axios.get(`${endpoint}/me`);
        return response.data;
    } catch (error) {
        console.error('Error while getting user account: ', error)
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${endpoint}/id/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error while getting user account: ', error)
        throw error;
    }
}

export const getUserByEmail = async (email) => {
    try {
        const url = `${endpoint}/email/${email}`;
        console.log('Sending request to URL:', url);
        const response = await axios.get(`${endpoint}/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error while getting user account: ', error)
        throw error;
    }
};

const getAllUser = async () => {
    try {
        const response = await axios.get(`${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error while getting user account: ', error)
        throw error;
    }
}

export {signUp, signIn, getMyProfile, getUserById, getAllUser}