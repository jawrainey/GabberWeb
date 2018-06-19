import * as ROUTES from '@/const/routes'

import Home from '@/views/base/Home'
import About from '@/views/base/About'
import Terms from '@/views/base/Terms'
import Privacy from '@/views/base/Privacy'
import Research from '@/views/base/Research'
import Cookies from '@/views/base/Cookies'

export default [
  {
    path: '/',
    name: ROUTES.HOME_ROUTE,
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/about',
    name: ROUTES.ABOUT_ROUTE,
    component: About,
    meta: { title: 'About' }
  },
  {
    path: '/privacy',
    name: ROUTES.PRIVACY_ROUTE,
    component: Privacy,
    meta: { title: 'Privacy' }
  },
  {
    path: '/terms',
    name: ROUTES.TERMS_ROUTE,
    component: Terms,
    meta: { title: 'Terms' }
  },
  {
    path: '/research',
    name: ROUTES.RESEARCH_ROUTE,
    component: Research,
    meta: { title: 'Research' }
  },
  {
    path: '/cookies',
    name: ROUTES.COOKIES_ROUTE,
    component: Cookies,
    meta: { title: 'Cookies' }
  }
]
