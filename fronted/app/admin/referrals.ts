import axios from "axios";

const BASEURL = "http://localhost:5000"

export interface Refferal {
    id?: number;
    patient_name: string;
    reffering_hospital:string;
    receiving_hospital:string;
    reason: string;
    status: string;
  }


export async function referPatient(patientData:{
    patient_name: string, 
    reffering_hospital: string, 
    receiving_hospital: string,
    reason: string}) {
    const res = await axios.post(`${BASEURL}/hospital/refer`, patientData)
    return res.data;
}

export async function getAllReferrals() {
    const res = await axios.get(`${BASEURL}/hospital/all_refferal`)
    return res.data;
}

export async function approveReferals(id:number, status: string) {
    const res = await axios.put(`${BASEURL}/hospital/approve_referral/${id}`, {status});
    return res.data;
}

export async function getRefferalStats() {
    const res = await axios.get(`${BASEURL}/hospital/referrals/stats`)
    return res.data
}