import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/', // Replace with your API base URL
    headers: {
      'Content-Type': 'application/json' // Example default header
    }
  });
  
  const token = localStorage.getItem('token');
  
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
  }
  
  export default axiosInstance;