import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
    baseURL: 'http://localhost:8090', // Adjust to your Express app's URL
    withCredentials: true, // Enable sending cookies
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      let token = localStorage.getItem('accessToken');

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

export const login = async (username: string, password: string) => {
    console.log("login called for port 8090");
    console.log("base url: ", api.defaults.baseURL);
  try {
    const response = await api.post<any>('/api/login', { username, password });
    localStorage.setItem('accessToken', response.data.accessToken);
    return true;
  } catch (error) {
    console.error('Login error:', error.response.data);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/api/logout');
    console.log(response);
    localStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Logout error:', error.response.data);
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post<any>('/token');
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Refresh token error:', error.response.data);
    await logout();
    return null;
  }
};

export const isUserAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  console.log(`tokenValue: ${token}`);
  if (!token) return false;

  // const { exp } = jwtDecode(token);
  // console.log(exp);
  // return Date.now() < exp * 1000;
  return true;
};