import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    history: false,
    hashbang: true,
    routes: [{
        path: '/',
        redirect: '/login',
    },  {
        path: '/login',
        component: resolve => require(['../components/index/login.vue'], resolve)
    }, ]
})
