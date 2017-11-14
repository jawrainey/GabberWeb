import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import RegionSelection from '../views/RegionSelection.vue'
import UserPlaylist from '../views/UserPlaylist.vue'

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/:projectID', name: 'app', component: RegionSelection },
        { path: '/me/playlist/:playlistID', name: 'userPlaylist', component: UserPlaylist }
    ]
});