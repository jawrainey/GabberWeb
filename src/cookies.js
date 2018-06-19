import Vue from 'vue'

import * as cookie from 'cookie'
import 'cookieconsent/build/cookieconsent.min.css'
import 'cookieconsent'
import { getConfig } from './mixins/Config'

const CookieConsent = window.cookieconsent

const cookieConsentConfig = {
  palette: {
    popup: {
      background: '#2ECC71',
      text: '#FFF'
    },
    button: {
      background: '#282f2f',
      text: '#FFF'
    },
    highlight: {
      background: '#343C3D',
      text: '#FFF'
    }
  },
  position: 'bottom-right',
  type: 'opt-in',
  location: true,
  autoAttach: false,
  revokable: true,
  content: {
    allow: 'Allow Cookies',
    dismiss: 'Disable Cookies',
    href: 'https://gabber.audio/cookies',
    message: 'We use cookies on this website to analyse traffic, remember your preferences, and optimise your experience.',
    policy: 'Cookie Policy'
  },
  onStatusChange (status, hasChanged) {
    if (status === 'allow') enableCookies()
    else disableCookies()
  }
}

function enableCookies () {
  Vue.$ga.enable()
}

function deleteCookie (name) {
  document.cookie = name + `=;path=/;expires=${new Date().toUTCString()};`
}

function disableCookies () {
  Object.keys(cookie.parse(document.cookie)).forEach(name => {
    if (name !== 'cookieconsent_status') deleteCookie(name)
  })
  Vue.$ga.disable()
}

let cookiePopup = new CookieConsent.Popup(cookieConsentConfig)

export function configureCookieConsent () {
  // Temporary workaround until they merge an update to support this in config
  cookiePopup.revokeBtn.innerHTML = cookiePopup.options.content.policy
  document.body.appendChild(cookiePopup.element)
  document.body.appendChild(cookiePopup.revokeBtn)
}

window.addEventListener('load', () => {
  if (!getConfig('ANALYTICS_ID')) return
  if (!cookiePopup.hasConsented()) {
    cookiePopup.open()
  } else {
    if (cookiePopup.getStatus() === 'allow') {
      enableCookies()
    } else {
      disableCookies()
    }
    cookiePopup.toggleRevokeButton(true)
  }
})
