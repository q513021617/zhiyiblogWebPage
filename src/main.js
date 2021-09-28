import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'
import Mui from 'vue-awesome-mui';
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false
Vue.use(Mui);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



Vue.config.productionTip = false

new Vue({
  router,
  store,

  BootstrapVue,
  IconsPlugin,
  render: h => h(App)
}).$mount('#app')
