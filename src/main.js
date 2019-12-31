import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { ajax } from '@/service/ajax'
import { hostname, API } from '@/service/api'

Vue.config.productionTip = false
Vue.prototype.$request = ajax
Vue.prototype.$hostname = hostname
Vue.prototype.$API = API

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
