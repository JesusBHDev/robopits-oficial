import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://back-end-robopits.vercel.app/api',
  withCredentials: true,
});

export default instance;
