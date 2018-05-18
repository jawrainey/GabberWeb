//
// The entrypoint to the web app, sets up Vue with the api, router & store
//

import Vue from 'vue'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'
import { store } from './store/index'
import { router } from './router'
import { i18n } from './i18n'

import './api'
import { formatDuration, formatDateLong } from './mixins/Temporal'
import { getConfig } from './mixins/Config'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import solidIcons from '@fortawesome/fontawesome-free-solid'
import regularIcons from '@fortawesome/fontawesome-free-regular'

// Add Fontawesome libraries
fontawesome.library.add(solidIcons, regularIcons)
Vue.component('fa', FontAwesomeIcon)

// Turn of the production tip
Vue.config.productionTip = false

// Add custom filters
Vue.filter('duration', formatDuration)
Vue.filter('longDate', formatDateLong)

// Setup analytics if the id is set
let gaId = getConfig('ANALYTICS_ID')
if (gaId) {
  Vue.use(VueAnalytics, { id: gaId, router })
}

let docHead = document.querySelector('head')

// Add the app smart banner if the id is set
let iOSAppId = getConfig('IOS_APP_ID')
if (docHead && iOSAppId) {
  let itunesTag = document.createElement('meta')
  itunesTag.setAttribute('name', 'apple-itunes-app')
  itunesTag.setAttribute('content', `app-id=${iOSAppId}`)
  docHead.appendChild(itunesTag)
}

/* eslint-disable no-new */
// Create the webapp and mount on the #app element
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
