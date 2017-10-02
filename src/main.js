import Vue from 'vue'
import App from './App.vue'

export const EventBus = new Vue();

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});