import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password
        });
        console.log(response)
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const logout = async () => {
    return await axios.post(`${API_BASE_URL}/logout`, {});
};

export const resetPassword = async ({ token, newPassword }) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/reset-password`, {
            token,
            newPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const sendResetLink = async ({ email }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
            email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateProfile = async (id, token, formData) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}