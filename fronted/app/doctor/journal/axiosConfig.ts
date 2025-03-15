import axios, {AxiosRequestConfig} from 'axios'

const axiosInstance = axios.create({
   baseURL : 'https://api-mordi-dev.almi.co.ke',
});


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers['Authorization']  = `Bearer ${token}`;
    }

    return config;
})


export default axiosInstance;