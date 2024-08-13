import axios from './axios';

const endpoint = "/webrtc"

/**
 * @param {WebRTCMessage} message
 */
const sendOffer = async (message) => {
    try {
        const response = await axios.post(`${endpoint}/offer`, JSON.stringify(message));
        return response.data;
    } catch (error) {
        console.error('Error webrtc offer: ', error)
        throw error;
    }
}


/**
 * @param {WebRTCMessage} message
 */
const sendAnswer = async (message) => {
    try {
        const response = await axios.post(`${endpoint}/answer`, JSON.stringify(message));
        return response.data;
    } catch (error) {
        console.error('Error webrtc answer: ', error)
        throw error;
    }
}


/**
 * @param {WebRTCMessage} message
 */
const sendCandidate = async (message) => {
    try {
        const response = await axios.post(`${endpoint}/candidate`, JSON.stringify(message));
        return response.data;
    } catch (error) {
        console.error('Error webrtc candidate: ', error)
        throw error;
    }
}


export {
    sendOffer,
    sendAnswer,
    sendCandidate,
}
