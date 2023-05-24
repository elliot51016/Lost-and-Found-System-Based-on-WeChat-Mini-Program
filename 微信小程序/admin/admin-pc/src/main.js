import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import dayjs from "dayjs"
Vue.prototype.$dayjs = dayjs;

Vue.config.productionTip = false

//声明默认的url
axios.defaults.baseURL =  "http://localhost:3000";
//挂载到全局vue的原型链上方便使用
Vue.prototype.$http = axios;   
//引入elementui
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
