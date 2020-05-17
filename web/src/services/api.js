import axios from 'axios';

// https://www.receitaws.com.br/v1/cnpj/32864763000177

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
