import axiosInstance from './axiosConfig';


export const createJournal = async (data: any) => {
       const response =  await axiosInstance.post(`/patient/create_journal/`, data)
       console.log(response)
       return response;
}

export const getAllJournals = async (data: object) => {
        const response = await axiosInstance.post(`/patient/get_journals/`, data);
        return response;
}

export const updateJournal = async (data: any) => {
       const response = await axiosInstance.patch(`/patient/update_journal/`, data);
        return response;
}

export const deleteJournal = async (data: any) => {
        console.log(data)
        const response = await axiosInstance.delete(`/patient/delete_journal/`, {data:data})
        return response;
}