import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import { router } from './router'

import './api'
import { formatDuration, formatDateLong } from './mixins/Temporal'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import solidIcons from '@fortawesome/fontawesome-free-solid'
import regularIcons from '@fortawesome/fontawesome-free-regular'

fontawesome.library.add(solidIcons, regularIcons)
Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.filter('duration', formatDuration)
Vue.filter('longDate', formatDateLong)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

console.log(window.CONFIG)
