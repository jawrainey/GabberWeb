import Vue from 'vue'
import LiveApi from './LiveApi'
import MockApi from './MockApi'

const ApiType = process.env.MOCK_API
  ? MockApi
  : LiveApi

let api = new ApiType(process.env.API_URL)
Vue.use(api)

export default api
