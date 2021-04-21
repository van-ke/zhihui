import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(iView);
Vue.prototype.$moment = moment
Vue.use(ElementUI);
Vue.prototype.axios = axios
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//     let inLogin = sessionStorage.getItem('token');
//     if (inLogin) {
//         next();
//     } else {
//         if (to.path == '/login') {
//             next();
//         } else {
//             next("/login")
//         }
//     }
// })
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')