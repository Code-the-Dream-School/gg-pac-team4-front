import axios from 'axios';

const API_BASE_URL = `http://localhost:8000/api/v1`;

export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/student`, studentData);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerTeacher = async (teacherData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/teacher`, teacherData);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
