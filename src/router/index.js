import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Sessions from '../views/Sessions.vue'
import RegionSelection from '../views/RegionSelection.vue'
import UserPlaylist from '../views/UserPlaylist.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/:projectID', name: 'app', component: RegionSelection },
        { path: '/about/', name: 'about', component: About },
        { path: '/login/', name: 'login', component: Login },
        { path: '/project/:projectSlug/sessions/', name: 'Sessions', component: Sessions },
        { path: '/me/playlist/:playlistID', name: 'userPlaylist', component: UserPlaylist }
  ]
})
