import axios from "axios";

export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/login`, {
            email,
            password
        });
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const logout = async () => {
    return await axios.post(`http://localhost:8000/api/v1/logout`, {});
};