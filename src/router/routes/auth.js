import * as ROUTES from '@/const/routes'

import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Forgot from '@/views/auth/Forgot'
import Reset from '@/views/auth/Reset'
import Verify from '@/views/auth/Verify'
import AcceptInvite from '@/views/auth/AcceptInvite'

export default [
  {
    path: '/login',
    name: ROUTES.LOGIN_ROUTE,
    component: Login
  },
  {
    path: '/register',
    name: ROUTES.REGISTER_ROUTE,
    component: Register
  },
  {
    path: '/forgot',
    name: ROUTES.FORGOT_ROUTE,
    component: Forgot
  },
  {
    path: '/reset/:code',
    name: ROUTES.RESET_ROUTE,
    component: Reset
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
