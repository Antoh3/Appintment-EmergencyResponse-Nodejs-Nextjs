import { AppointmentStatus } from "@/types";
import createAxiosInstance from "../../context/axiosInstance";
const axiosInstance = createAxiosInstance();

export interface Appointment {
    id?: string;
    schedule: string;
    reason: string;
    patientName: string;
    status: AppointmentStatus;
  }


export const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get("/appointment/patient")
      return response.data;
    } catch (error) {
      console.error('Error getting beds:', error);
      throw error;
    }
};