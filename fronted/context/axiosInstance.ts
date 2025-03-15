import { useAuth } from "./AuthContext";
import axios from "axios";

const createAxiosInstance = () => {
    const { auth, setAuth } = useAuth();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:5001",
    });

    // Attach access token to every request
    axiosInstance.interceptors.request.use(
        (config) => {
            const accessToken = auth?.accessToken || localStorage.getItem("accessToken");

            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Handle 401 responses and refresh tokens
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const refreshToken = auth?.refreshToken || localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    console.error("No refresh token available");
                    return Promise.reject(error);
                }

                try {
                    const response = await axios.post("http://localhost:5001/token/refreshToken", {}, {
                        headers: { 'x-refresh-token': refreshToken },
                    });

                    const newAccessToken = response.data.accessToken;

                    // Update auth context and localStorage
                    setAuth({
                        accessToken: newAccessToken,
                        refreshToken: refreshToken,
                    });
                    localStorage.setItem("accessToken", newAccessToken);

                    // Retry the original request with the new token
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error("Failed to refresh token", refreshError);
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default createAxiosInstance;
