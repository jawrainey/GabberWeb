//
// The entrypoint to the web app, sets up Vue with the api, router & store
//

import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'
import { store } from './store/index'
import { router } from './router'
import { i18n } from './i18n'

import './api'
import { formatDuration, formatDateLong } from './mixins/Temporal'
import { getConfig } from './mixins/Config'

import { configureCookieConsent } from './cookies'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGlobe,
  faStar,
  faBackward,
  faForward,
  faPlay,
  faPause,
  faCog,
  faLock,
  faUnlock,
  faInfo,
  faPaperPlane,
  faAmbulance,
  faRocket,
  faFlask,
  faNewspaper,
  faCar,
  faBicycle,
  faBell,
  faBinoculars,
  faBolt,
  faBook,
  faBug,
  faCamera,
  faChessPawn,
  faChessKnight,
  faUniversity,
  faMotorcycle,
  faFilter,
  faClock,
  faUsers,
  faComment,
  faMagic,
  faTrash,
  faChevronRight,
  faMicrophone,
  faCheck,
  faTimes,
  faUserTimes,
  faUserPlus,
  faSearch,
  faPlus,
  faCircleNotch,
  faToggleOn,
  faToggleOff } from '@fortawesome/free-solid-svg-icons'

// Add Fontawesome libraries
library.add(
  faGlobe,
  faStar,
  faBackward,
  faForward,
  faPlay,
  faPause,
  faCog,
  faLock,
  faUnlock,
  faInfo,
  faAmbulance,
  faRocket,
  faFlask,
  faNewspaper,
  faCar,
  faBicycle,
  faBell,
  faBinoculars,
  faBolt,
  faBook,
  faBug,
  faCamera,
  faChessPawn,
  faChessKnight,
  faUniversity,
  faMotorcycle,
  faMagic,
  faFilter,
  faClock,
  faUsers,
  faComment,
  faTrash,
  faChevronRight,
  faMicrophone,
  faCheck,
  faTimes,
  faUserTimes,
  faUserPlus,
  faSearch,
  faPaperPlane,
  faPlus,
  faCircleNotch,
  faToggleOn,
  faToggleOff
)
Vue.component('fa', FontAwesomeIcon)

// Turn of the production tip
Vue.config.productionTip = false

// Add custom filters
Vue.filter('duration', formatDuration)
Vue.filter('longDate', formatDateLong)

let docHead = document.querySelector('head')

// Add the app smart banner if the id is set
let iOSAppId = getConfig('IOS_APP_ID')
if (docHead && iOSAppId) {
  let itunesTag = document.createElement('meta')
  itunesTag.setAttribute('name', 'apple-itunes-app')
  itunesTag.setAttribute('content', `app-id=${iOSAppId}`)
  docHead.appendChild(itunesTag)
}

let gaId = getConfig('ANALYTICS_ID')

if (gaId) {
  Vue.use(VueAnalytics, {
    id: gaId,
    disabled: true,
    router,
    set: [ { field: 'anonymizeIp', value: 'true' } ]
  })
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

configureCookieConsent()
