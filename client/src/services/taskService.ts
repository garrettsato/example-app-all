import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000', // Adjust to your Express app's URL
    withCredentials: true, // Enable sending cookies
});

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

export const addTaskQuery = async() => {
    try {
        const response = await api.post<any>('/api/tasks', { });
        localStorage.setItem('tasks', response.data.tasks);
        return response.data.tasks;
    } catch (error) {
        console.error('Get tasks error:', error.response.data);
        return false;
    }
}