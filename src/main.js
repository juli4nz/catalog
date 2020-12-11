import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
//import VueGtag from 'vue-gtag';
import FineMq from 'fine-mq'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import Modal from './components/Modal'

Vue.config.productionTip = false
Vue.component('v-select', vSelect)
Vue.component('slick-carousel', VueSlickCarousel)
Vue.component('modal', Modal)

// Google Analytics
/* Vue.use(
   VueGtag,
   {
      config: { id: 'UA-105987352-6' },
   },
   router
); */

// Media Queries
Vue.use(FineMq, {
  aliases: {
    mobile: [0, 680],
    tablet: [681, 1024],
    laptop: [1025, 1249],
    desktop: [1250],
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)'
  }
})

// Video Player
Vue.use(VuePlyr, {
  plyr: {}
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
