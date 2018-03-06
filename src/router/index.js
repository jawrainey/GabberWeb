import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'
import Terms from '../views/Terms'
import Privacy from '../views/Privacy'
import Register from '../views/Register'
import Sessions from '../views/Sessions'
import RegionSelection from '../views/RegionSelection'
import UserPlaylist from '../views/UserPlaylist'
import ProjectList from '../views/ProjectList'

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
    name: ROUTES.PROJECT_LIST_ROUTE,
    component: ProjectList
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
  
  // Only Project Members of Private projects can view sessions and playlists
  {
    path: '/project/:projectID/sessions',
    name: ROUTES.SESSIONS_ROUTE,
    component: Sessions
  },
  {
    path: '/project/:projectID/playlists',
    name: ROUTES.PROJECT_PLAYLIST_ROUTE,
    component: RegionSelection
  },
  {
    path: '/me/playlist/:playlistID',
    name: ROUTES.USER_PLAYLIST_ROUTE,
    component: UserPlaylist
  }
]

export const router = new VueRouter({ routes })
