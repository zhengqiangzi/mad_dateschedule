import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueForm from 'vue-form';

Vue.use(ElementUI);
Vue.use(VueForm);

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
 

