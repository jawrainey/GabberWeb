/*
 * The entrypoint for the api instance, this exports the current api instance
 * - Will create the api based on the MOCK_API variable
 * - Will use API_URL to direct api calls to the desired server
 * - Variables can be set from window.CONFIG.* or process.env.*
 */

import Vue from 'vue'
import LiveApi from './LiveApi'
import MockApi from './MockApi'

// Get the config variables from either window.CONFIG or process.env
let { MOCK_API, API_URL } = {
  ...(process.env || {}),
  ...(window.CONFIG || {})
}

// Choose the Api class depending on the MOCK_API env variable
const ApiType = MOCK_API
  ? MockApi
  : LiveApi

// Create an instance of the api & install it on Vue
let api = new ApiType(API_URL)
Vue.use(api)

// Export the api instance
export default api
