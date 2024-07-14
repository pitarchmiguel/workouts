import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getWorkouts = () => api.get('/api/workouts');
export const addWorkout = (workout) => api.post('/api/workouts', workout);
export const login = (credentials) => api.post('/api/users/login', credentials);

// Añade más funciones según sea necesario

export default api;