import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export const resetPassword = async ({ token, newPassword }) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/reset-password`,
      {
        token,
        newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const sendResetLink = async ({ email }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/forgot-password`,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserData = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
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


export const updateUser = async (id, token, formData) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.config.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserPhoto = async (id, token, formData) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error.response;
    }
};

export const getTeacherClasses = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes`);
    return response
  } catch (error) {
    throw error.response;
  }
};