import createAxiosInstance from "../../context/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const { setTokens } = useAuth();
const axiosInstance = createAxiosInstance();