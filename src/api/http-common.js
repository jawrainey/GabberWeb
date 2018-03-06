import axios from 'axios'

export const REST_API = axios.create({
  baseURL: `http://localhost:5000/api/`,
  timeout: 5000
})
