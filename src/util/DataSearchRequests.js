import axios from 'axios';
const API_BASE_URL = `http://localhost:8000/api/v1`;

export const getClassesData = async (
  search,
  page = 1,
  limit = 5,
  sortBy = 'classTitle',
  sortOrder = 'asc'
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes`, {
      params: { search, page, limit, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    console.error('Error during search:', error);
    throw error;
  }
};
