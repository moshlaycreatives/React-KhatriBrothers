import axios from 'axios';
import { BASE_URL } from './baseURL';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
    const accessToken = window.localStorage.getItem('token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
