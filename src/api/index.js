import Vue from 'vue'
import LiveApi from './LiveApi'
import MockApi from './MockApi'

// Choose the api class depending on the MOCK_API env variable
const ApiType = process.env.MOCK_API
  ? MockApi
  : LiveApi

// Create an instance of the api & install it on Vue
let api = new ApiType(process.env.API_URL)
Vue.use(api)

// Export the api instance
export default api
