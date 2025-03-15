import axios from 'axios'

export interface Service {
    id?:number,
    name: string,
    description: string,
    cost: number,
    charged_per: string
}

const BASEURL = "http://localhost:5000"

export const addService = async(
    data:{name: string,
        description: string, 
        cost: number,
        charged_per: string}) =>{
    const res = await axios.post("http://localhost:5000/hospital/service", data)
    return res.data
}