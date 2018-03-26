import * as ROUTES from '@/const/routes'

import Home from '@/views/base/Home'
import About from '@/views/base/About'
import Terms from '@/views/base/Terms'
import Privacy from '@/views/base/Privacy'

export default [
  {
    path: '/',
    name: ROUTES.HOME_ROUTE,
    component: Home
  },
  {
    path: '/about',
    name: ROUTES.ABOUT_ROUTE,
    component: About
  },
  {
    path: '/privacy',
    name: ROUTES.PRIVACY_ROUTE,
    component: Privacy
  },
  {
    path: '/terms',
    name: ROUTES.TERMS_ROUTE,
    component: Terms
  }
]
