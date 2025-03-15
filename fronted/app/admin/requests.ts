import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface Request {
    id?: number;
    request_type: string;
    details:string;
    status: string;
  }

export const sendRequest = async (requestData:{request_type:string,details:string}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/hospital/request`,requestData)
        return response.data;
    } catch (error) {
        console.error('Error in sending request');
        throw error;
    }
}

export const getAllRequests = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/hospital/all_requests`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all requests:', error);
        throw error;
    }
};

export const getLabRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/hospital/lab_requests`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lab requests:', error);
        throw error;
    }
};

export const getPatientRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/hospital/patient_requests`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient requests:', error);
        throw error;
    }
};

export async function aproveRequests(id: number, status: string) {
    try {
        const res = await axios.put(`${API_BASE_URL}/hospital/approve_request/${id}`, { status });
        return res.data;
    } catch (error) {
        console.error("Failed to approve request:", error);
        throw error;  // Re-throw to propagate the error if necessary
    }
}
