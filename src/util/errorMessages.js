const handleError = (error, setFormErrors) => {
  console.error('Error:', error);
  let errorMessage = 'An unexpected error occurred';

  if (error.response) {
    switch (error.response.status) {
      case 400:
        errorMessage = 'Bad Request: ' + (error.response.data?.message || 'Invalid request');
        break;
      case 401:
        errorMessage = 'Unauthorized: ' + (error.response.data?.message || 'Invalid credentials');
        break;
      case 404:
        errorMessage = 'Not Found: ' + (error.response.data?.message || 'Resource not found');
        break;
      default:
        errorMessage = 'Error: ' + (error.response.data?.message || 'An error occurred');
    }
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response received from the server. Please try again later.';
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = 'Request error: ' + error.message;
  }

  setFormErrors({ form: errorMessage });
};

export default handleError;