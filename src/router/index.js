/*
 * The vuex store the components use, implemented using modules
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import authRoutes from './routes/auth'
import projectRoutes from './routes/project'
import staticRoutes from './routes/static'

const NotFound = () => import('../views/base/NotFound')

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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} · Gabber`
    : `Gabber`
  next()
})
