import axios from 'axios';

const userTraits = JSON.parse(localStorage.getItem('user_traits')) || false;
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: userTraits?.token,
  },
});

export default axiosInstance;
