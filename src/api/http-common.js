import axios from 'axios'

export const REST_API = axios.create({
  baseURL: `http://0.0.0.0:5000/api/`,
  timeout: 5000
})
