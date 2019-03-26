import * as ROUTES from '@/const/routes'

const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')
const Forgot = () => import('@/views/auth/Forgot')
const Reset = () => import('@/views/auth/Reset')
const Verify = () => import('@/views/auth/Verify')
const AcceptInvite = () => import('@/views/auth/AcceptInvite')

export default [
  {
    path: '/login',
    name: ROUTES.LOGIN_ROUTE,
    component: Login,
    meta: { title: 'Log in' }
  },
  {
    path: '/register',
    name: ROUTES.REGISTER_ROUTE,
    component: Register,
    meta: { title: 'Register' }
  },
  {
    path: '/forgot',
    name: ROUTES.FORGOT_ROUTE,
    component: Forgot,
    meta: { title: 'Forgotten Password' }
  },
  {
    path: '/reset/:code',
    name: ROUTES.RESET_ROUTE,
    component: Reset,
    meta: { title: 'Reset Password' }
  },
  {
    path: '/verify/:token',
    name: ROUTES.VERIFY_ROUTE,
    component: Verify
  },
  {
    path: '/accept/:token',
    name: ROUTES.ACCEPT_INVITE_ROUTE,
    component: AcceptInvite
  }
]
