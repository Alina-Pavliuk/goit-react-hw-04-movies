import axios from 'axios';

const apiKey = 'd9f494d2e98a32f89d80492058ec3fcd'

export const withCredentials = url => `${url}${apiKey}`;

export const request = async (method, url, body = null) => {
  const result = await axios[method](url, body);
  return result.data;
}
