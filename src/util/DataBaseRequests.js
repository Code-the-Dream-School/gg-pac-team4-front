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

export const getAllUsersInfo = async (token) => {
  try {
    const allUsers = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage }, // Pass the page parameter to the API
      });
      // Add the results to the allUsers array
      allUsers.push(...response.data.results);
      totalPages = response.data.totalPages; // Update totalPages
      currentPage += 1; // Move to the next page
    }
    return allUsers;
  } catch (error) {
    console.error('Error fetching users info:', error);
    throw error.response ? error.response.data : error;
  }
};

export const getClassesData = async (
  search = '',
  classTitle = '',
  description = '',
  category = '',
  page = 1,
  limit = 50,
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
export const getClassDetails = async (classId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes/${classId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching class details:', error);
    throw error.response.data || { message: 'Error fetching class details' };
  }
};

export const updateUser = async (id, token, formData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.config.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserPhoto = async (id, token, formData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register/student`,
      studentData
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerTeacher = async (teacherData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register/teacher`,
      teacherData
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const addClassForm = async (token, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/classes/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getAllStudentLessons = async (token, studentId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/myStudents/${studentId}/lessons/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const bookLesson = async (token, classId, availableTimeId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/classes/${classId}/apply`,
      { availableTimeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const approveApplication = async (token, classId, applicationId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/classes/${classId}/approve/${applicationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const rejectApplication = async (token, classId, applicationId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/classes/${classId}/reject/${applicationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteLesson = async (token, studentId, lessonId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/myStudents/${studentId}/lessons/${lessonId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
