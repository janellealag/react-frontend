import axios from 'axios';
import { LOCAL_STORAGE } from '../helpers/constants';

const requestHandler = (request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

  return {
    ...request,
    headers: {
      ...request.headers,
      'X-Access-Token': accessToken,
    },
  };
};

const successHandler = (response) => {
  if (response.data.status === 'success') {
    return response.data.data;
  }
  return response;
};

const backend = axios.create({
  baseURL: 'http://localhost:5001/backend/',
  // withCredentials: true
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
  headers: { 'Content-Type': 'application/json' },
});

backend.interceptors.request.use(requestHandler);
backend.interceptors.response.use(successHandler);

export default backend

