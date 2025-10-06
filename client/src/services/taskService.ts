import axios, {InternalAxiosRequestConfig} from "axios";
import {jwtDecode} from "jwt-decode";
import {refreshToken} from "./authService";

const api = axios.create({
    baseURL: 'http://localhost:8090', // Adjust to your Express app's URL
    withCredentials: true, // Enable sending cookies
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        let token = localStorage.getItem('accessToken');
        console.log("token: " + token + "")

        if (token) {
            const { exp } = jwtDecode(token);
            const isTokenExpired = Date.now() >= exp * 1000;

            if (isTokenExpired) {
                token = await refreshToken();
            }

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
)

export const getTasks = async () => {
    try {
        const response = await api.post<any>('/api/tasks', { });
        localStorage.setItem('tasks', response.data.tasks);
        return response.data.tasks;
    } catch (error) {
        console.error('Get tasks error:', error.response.data);
        return false;
    }
};

export const getTaskQuery = async() => {
    try {
        const response = await api.post<any>('/api/tasks', { });
        localStorage.setItem('tasks', response.data.tasks);
        return response.data.tasks;
    } catch (error) {
        console.error('Get tasks error:', error.response.data);
        return false;
    }
}

export const addTaskQuery = async(task) => {
    try {
        const response = await api.post<any>("api/createTask", {
            title: task.title,
            description: task.description
        });

        return response.data;
    } catch (error) {
        console.error('Get tasks error:', error.response.data);
        return false;
    }
}