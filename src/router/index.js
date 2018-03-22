import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/base/Home'
import About from '../views/base/About'
import Terms from '../views/base/Terms'
import Privacy from '../views/base/Privacy'
import Holder from '../views/base/Holder'
import NotFound from '../views/base/NotFound'

import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import Forgot from '../views/auth/Forgot'
import Reset from '../views/auth/Reset'
import Verify from '../views/auth/Verify'
import AcceptInvite from '../views/auth/AcceptInvite'

import ProjectList from '../views/project/ProjectList'
import SessionList from '../views/project/SessionList'
import SessionDetail from '../views/project/SessionDetail'
import Consent from '../views/project/Consent'

import * as ROUTES from '../const/routes'

Vue.use(VueRouter)

const routes = [
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
    path: '/projects',
    component: Holder,
    meta: {
      crumb: 'Projects',
      crumbIcon: 'home',
      holderFor: ROUTES.PROJECT_LIST_ROUTE
    },
    children: [
      {
        path: '',
        name: ROUTES.PROJECT_LIST_ROUTE,
        component: ProjectList
      },
      {
        path: ':project_id',
        component: Holder,
        children: [
          {
            path: 'sessions',
            component: Holder,
            meta: {
              crumb: 'Gabbers',
              holderFor: ROUTES.SESSION_LIST_ROUTE
            },
            children: [
              {
                path: '',
                name: ROUTES.SESSION_LIST_ROUTE,
                component: SessionList
              },
              {
                path: ':session_id',
                name: ROUTES.SESSION_DETAIL_ROUTE,
                component: SessionDetail,
                meta: {
                  crumb: 'Gabber'
                }
              }
            ]
          }
          // {
          //   path: 'playlists',
          //   name: ROUTES.PLAYLIST_LIST_ROUTE,
          //   component: RegionSelection,
          //   meta: {
          //     crumb: 'Playlists'
          //   }
          // }
        ]
      }
    ]
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
  },
  
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
  },
  {
    path: '/consent/:token',
    name: ROUTES.CONSENT_ROUTE,
    component: Consent
  },
  
  // Only Project Members of Private projects can view sessions and playlists
  // {
  //   path: '/project/:project_id/sessions',
  //   name: ROUTES.SESSION_LIST_ROUTE,
  //   component: SessionList
  // },
  // {
  //   path: '/project/:project_id/playlists',
  //   name: ROUTES.PLAYLIST_LIST_ROUTE,
  //   component: RegionSelection
  // },
  // {
  //   path: '/me/playlist/:playlist_id',
  //   name: ROUTES.USER_PLAYLIST_ROUTE,
  //   component: UserPlaylist
  // },
  
  /* 404 - Page Not Found */
  {
    path: '*',
    component: NotFound
  }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})
