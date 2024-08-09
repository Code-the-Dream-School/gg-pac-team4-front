import axios from "axios";

const API_BASE_URL = `http://localhost:8000/api/v1`;

export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password
        });
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const logout = async () => {
    return await axios.post(`${API_BASE_URL}/logout`, {});
};

export const getUserData = async ( id, token ) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}`}});
        return response;
    } catch (error) {
        throw error.response.data;
    }
};