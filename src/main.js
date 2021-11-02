import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify'



new Vue({
  vuetify,
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app')

