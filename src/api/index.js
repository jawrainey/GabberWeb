import Vue from 'vue'
import LiveApi from './LiveApi'
import MockApi from './MockApi'

// Choose the api class depending on the MOCK_API env variable
const ApiType = process.env.MOCK_API
  ? MockApi
  : LiveApi

// Create an instance of the api & install it on Vue
let host = (window.CONFIG && window.CONFIG.API_URL) || process.env.API_URL
let api = new ApiType(host)
Vue.use(api)

// Export the api instance
export default api
