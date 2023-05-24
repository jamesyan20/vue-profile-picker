import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
Vue.use(VueToast,{
	position:'bottom',
});


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
