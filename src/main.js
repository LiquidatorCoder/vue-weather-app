import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import VueJsonp from 'vue-jsonp'
import App from './App.vue'
import './registerServiceWorker'

const options = {
  color: '#ffffff',
  failedColor: '#ff1111',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.7s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueJsonp)

Vue.use(VueProgressBar, options)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
