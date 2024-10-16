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

const providersSignUp = async (requestBody) => {
	try {
		const response = await axiosInstance.post(`/providers-creation/candidate`, requestBody);
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
		const response = await axiosInstance.post(`/providers-login`, requestBody);
		return response;
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
		const response = await axiosInstance.get(`${endpoint}/email/${email}`);
		return response.data;
	} catch (error) {
		console.error('Error while getting user account: ', error);
		throw error;
	}
};

const doUserExist = async (email) => {
	try {
		await axiosInstance.get(`${endpoint}/email/${email}`);
		return true;
	} catch (error) {
		return false;
	}
};
const findProviderByEmail = async (email) => {
	try {
		const response = await axiosInstance.get(`/providers-finder/email-exist/${email}`);
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
		const response = await axiosInstance.put(`${endpoint}/update`, userProfile, {
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
		const response = await axiosInstance.patch(`${endpoint}/updatePassword`, {password: newPassword}, {
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


const findMyPrestations = async (providerId) => {
	try {
		const response = await axiosInstance.get(`/providers-referenced-prestations/list-providers-prestations/${providerId}`);
		return response;
	} catch (error) {
		console.error('Error while updating password: ', error);
		throw error;
	}
};


const findRefPrestationDetails = async (refPrestId) => {
	try {
		return await axiosInstance.get(`/providers-referenced-prestations/find-provider-prestation-details/${refPrestId}`);
	} catch (error) {
		console.error('Error while updating password: ', error);
		throw error;
	}
};

const addOrUpdateCertificateForRefPrestation = async (refPrestationId, file) => {
	try {
		return await axiosInstance.post(`/providers-certificates/add-certificate/${refPrestationId}`, file, {
			headers: {
				'Content-Type': 'multipart/form-data', // Specify the content type
			}
		});
	} catch (error) {
		console.error('Error while updating password: ', error);
		throw error;
	}
};

const updateRefPrestationDetails = async (refPrestDetails) => {
	try {
		return await axiosInstance.put(`/providers-referenced-prestations/update-provider-prestation-details`, refPrestDetails);
	} catch (error) {
		console.error('Error while updating password: ', error);
		throw error;
	}
};
const verifyPassword = async (password) => {
	const token = localStorage.getItem('token');
	const data = {password};
	try {
		const response = await axiosInstance.post(`${endpoint}/verifyPassword`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error("Failed to verify password:", error);
		throw error;
	}
};

/**
 * Rechercher les utilisateurs en fonction de la requête donnée.
 * @param {string} query - La requête de recherche.
 */
const searchUsers = async (query) => {
	try {
		const response = await axiosInstance.get(`${endpoint}/search`, {
			params: {
				query: query,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Erreur lors de la recherche des utilisateurs :', error);
		throw error;
	}
};

const setUserRole = async (userId, role) => {
	const url = `/users/setRole/${role}/${userId}`;
	try {
		const token = localStorage.getItem('token');
		const response = await axiosInstance.put(url, {}, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		return response.data;
	} catch (error) {
		console.error(`Erreur lors de la mise à jour du rôle de l'utilisateur ${userId} :`, error);
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
	
	doUserExist,
	providerSignIn,
	providersSignUp,
	findMyPrestations,
	findRefPrestationDetails,
	updateRefPrestationDetails,
	setUserRole,
	searchUsers,
	addOrUpdateCertificateForRefPrestation,
	verifyPassword
}
