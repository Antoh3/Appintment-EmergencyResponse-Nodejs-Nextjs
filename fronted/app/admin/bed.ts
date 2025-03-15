import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your Flask API URL

export interface Bed {
  id?: number;
  bed_number: string;
  ward_assigned:string;
  bed_type:string;
  occupied: boolean;
}

export const addBed = async (bed: Bed): Promise<void> => {
  try {
    await axios.post(`${API_URL}/hospital/add_bed`, bed);
  } catch (error) {
    console.error('Error adding bed:', error);
    throw error;
  }
};

export const getAllBeds = async (): Promise<Bed[]> => {
  try {
    const response = await axios.get(`${API_URL}/hospital/beds_data`);
    return response.data;
  } catch (error) {
    console.error('Error getting beds:', error);
    throw error;
  }
};

export const updateBed = async (bed_id: number, bed: Bed): Promise<void> => {
  try {
    await axios.put(`${API_URL}/hospital/update_bed/${bed_id}`, bed);
  } catch (error) {
    console.error('Error updating bed:', error);
    throw error;
  }
};

export const deleteBed = async (bed_id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/hospital/delete_bed/${bed_id}`);
  } catch (error) {
    console.error('Error deleting bed:', error);
    throw error;
  }
};


export const fetchBedStatus = async () =>{
  try {
    const response = await axios.get(`${API_URL}/hospital/all_beds`)
    return  response.data;
  } catch (error) {
    console.error(error);
    throw error
    
  }
}