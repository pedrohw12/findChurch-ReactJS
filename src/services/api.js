import axios from 'axios';

const api = axios.create({
  baseURL: 'https://findchurch.herokuapp.com/'
});

export default api;