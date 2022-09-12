import axios from 'axios';
import Swal from 'sweetalert2';
declare const API_ENDPOINT: string;

console.log(API_ENDPOINT);

const axiosRequest = axios.create({
  baseURL: API_ENDPOINT,
});

axiosRequest.interceptors.response.use(
  (response) => {
    if (!response.data.data) {
      Swal.fire(response.data.status.toString(), response.data?.message, 'error');
      return null;
    }
    return response.data.data;
  },
  (err) => {
    if (err.response.status >= 500) {
      return Promise.reject(null);
    } else {
      return Promise.reject(err.response.data.message);
    }
  },
);

export default axiosRequest;
