import axiosInstance from '../axios';

const endpoint = "/users"

/**
 * @param {UserCreationRequestDto} requestBody
 */
const signUp = async (requestBody) => {
    try {
        const response = await axiosInstance.post(`${endpoint}`, requestBody);
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
        const response = await axiosInstance.post(`${endpoint}/log`, requestBody);
        return response.data;
    } catch (error) {
        console.error('Error while logging user account: ', error)
        throw error;
    }
}

const providerSignIn = async (requestBody) => {
    try {
        const response = await axiosInstance.post(`${endpoint}/providers-login`, requestBody);
        return response.data;
    } catch (error) {
        console.error('Error while logging user account: ', error)
        throw error;
    }
}

const getMyProfile = async () => {
    try {
        const response = await axiosInstance.get(`${endpoint}/me`);
        return response.data;
    } catch (error) {
        console.error('Error while getting user account: ', error)
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`${endpoint}/id/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error while getting user account: ', error)
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        return await axiosInstance.get(`${endpoint}/email/${email}`);
    } catch (error) {
        console.error('Error while getting user account: ', error);
        throw error;
    }
};

const findProviderByEmail = async (email) => {
    try {
        const response = await axiosInstance.get(`${endpoint}/provides-finder/find-by-mail/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error while getting Provider account: ', error);
        throw error;
    }
};

const getAllUser = async () => {
    try {
        const response = await axiosInstance.get(`${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error while getting user account: ', error)
        throw error;
    }
}

const updateUserProfile = async (userProfile) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put('http://localhost:4000/parisjanitor-api/users/update', userProfile, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error while updating user profile: ', error);
        throw error;
    }
};

const requestSecurityModification = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`${endpoint}/securityModifier`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while requesting security modification: ', error);
        throw error;
    }
};

const verifyPasswordCode = async (code) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${endpoint}/verifyPasswordCode/${code}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while verifying password code: ', error);
        throw error;
    }

};

const updatePassword = async (newPassword) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.patch(`${endpoint}/updatePassword`, { password: newPassword }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error while updating password: ', error);
        throw error;
    }
};

const verifyPassword = async (password) => {
    const token = localStorage.getItem('token');
    const data = { password };
    console.log("Sending password for verification:", data);
    try {
        const response = await axiosInstance.post(`${endpoint}/verifyPassword`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("Password verification response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to verify password:", error);
        throw error;
    }
};

export {
    signUp,
    signIn,
    getMyProfile,
    getUserByEmail,
    getUserById,
    getAllUser,
    updateUserProfile,
    requestSecurityModification,
    verifyPasswordCode,
    updatePassword,
    findProviderByEmail,
    providerSignIn,
    verifyPassword}