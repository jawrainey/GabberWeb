import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Sessions from '../views/Sessions.vue'
import RegionSelection from '../views/RegionSelection.vue'
import UserPlaylist from '../views/UserPlaylist.vue'
import ProjectList from '../views/ProjectList.vue'

import * as ROUTES from '../const/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: ROUTES.HOME_ROUTE,
    component: Home
  },
  {
    path: '/about/',
    name: ROUTES.ABOUT_ROUTE,
    component: About
  },
  {
    path: '/login/',
    name: ROUTES.LOGIN_ROUTE,
    component: Login
  },
  {
    path: '/register/',
    name: ROUTES.REGISTER_ROUTE,
    component: Register
  },
  {
    path: '/projects/',
    name: ROUTES.PROJECT_LIST_ROUTE,
    component: ProjectList
  },
  
  // Only Project Members of Private projects can view sessions and playlists
  {
    path: '/project/:projectID/sessions/',
    name: ROUTES.SESSIONS_ROUTE,
    component: Sessions
  },
  {
    path: '/project/:projectID/playlists/',
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
