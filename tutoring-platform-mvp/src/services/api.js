import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth Services
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

// Tutor Services
export const getTutors = async () => {
  const response = await api.get('/tutors');
  return response.data;
};

export const getTutor = async (id) => {
  const response = await api.get(`/tutors/${id}`);
  return response.data;
};

export const createTutorProfile = async (profileData) => {
  const response = await api.post('/tutors', profileData);
  return response.data;
};

// Request Services
export const createRequest = async (requestData) => {
  const response = await api.post('/requests', requestData);
  return response.data;
};

export const getTutorRequests = async () => {
  const response = await api.get('/requests/tutor');
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.put(`/requests/${id}`, { status });
  return response.data;
};

export default api;
