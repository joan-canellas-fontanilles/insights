import axios from 'axios';

module.exports = async function () {
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '4001';
  axios.defaults.baseURL = `http://${host}:${port}/api/v1/`;
  axios.defaults.validateStatus = () => true;
};
