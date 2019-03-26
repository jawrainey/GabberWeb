import * as ROUTES from '@/const/routes'

const Home = () => import('@/views/base/Home')
const About = () => import('@/views/base/About')
const Terms = () => import('@/views/base/Terms')
const Privacy = () => import('@/views/base/Privacy')
const Research = () => import('@/views/base/Research')
const Cookies = () => import('@/views/base/Cookies')

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
