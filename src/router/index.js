import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Sessions from '../views/Sessions.vue'
import RegionSelection from '../views/RegionSelection.vue'
import UserPlaylist from '../views/UserPlaylist.vue'
import Projects from '../views/Projects.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/about/', name: 'about', component: About },
        { path: '/login/', name: 'login', component: Login },
        { path: '/projects/', name: 'Projects', component: Projects },
        { path: '/project/:projectSlug/edit', name: 'EditProject', component: Projects },
        { path: '/project/:projectSlug/sessions/', name: 'Sessions', component: Sessions },
        { path: '/project/:projectID/playlists/', name: 'ProjectPlaylist', component: RegionSelection },
        { path: '/me/playlist/:playlistID', name: 'userPlaylist', component: UserPlaylist }
  ]
})
