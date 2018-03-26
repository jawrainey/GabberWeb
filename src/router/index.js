/*
 * The vuex store the components use, implemented using modules
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '../views/base/NotFound'

import authRoutes from './routes/auth'
import projectRoutes from './routes/project'
import staticRoutes from './routes/static'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    ...staticRoutes,
    ...authRoutes,
    ...projectRoutes,
    { path: '*', component: NotFound }
  ]
})
