import axiosInstance from '../axios';
const creditCardPayment = async (paymentRequest) => {
	const url = `payment/pay`;
	
	try {
		return await axiosInstance.post(url,
			paymentRequest
		);
	} catch (error) {
		console.error("Erreur lors de la récupération de la propriété :", error.response ? error.response : error);
		throw error;
	}
};

export {
	creditCardPayment
};
