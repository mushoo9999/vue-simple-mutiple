import Vue from 'vue'
import App from './index.vue'
import iView from 'iview'
import router from '../../router/index1.js'
import VueResource from 'vue-resource'
Vue.use(iView);
Vue.config.productionTip = false;
let abc = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
