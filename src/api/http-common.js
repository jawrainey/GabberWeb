import axios from 'axios'

export const GABBER_API = axios.create({
  baseURL: `http://0.0.0.0:5000/api/`,
  timeout: 5000
})
