import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.onet.pl',
  timeout: 1000,
});

export default instance;
