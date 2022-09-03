import axios from 'axios';
import Swal from 'sweetalert2';

const axiosRequest = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (err.response.status >= 500) {
      Swal.fire(err.code, err.response?.data?.message, 'error');
      return Promise.reject(null);
    } else {
      return Promise.reject(err.response.data.message);
    }
  },
);

export default axiosRequest;
