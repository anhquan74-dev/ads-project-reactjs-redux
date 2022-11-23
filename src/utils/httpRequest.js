import axios from 'axios';

const httpRequest = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'https://ads-project-springboot-restapi.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpRequest;
