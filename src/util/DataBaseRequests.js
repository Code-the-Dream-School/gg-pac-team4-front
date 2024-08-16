import axios from 'axios';

const API_BASE_URL = `http://localhost:8000/api/v1`;

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  return await axios.post(`${API_BASE_URL}/logout`, {});
};

export const getClassesData = async (
  search = '',
  classTitle = '',
  description = '',
  category = '',
  page = 1,
  limit = 5,
  sortBy = 'classTitle',
  sortOrder = 'asc'
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes`, {
      params: {
        search,
        classTitle,
        description,
        category,
        page,
        limit,
        sortBy,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during search:', error);
    throw error;
  }
};
