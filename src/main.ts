import Vue from 'vue'
import App from './App.vue'
import { faPen, faEraser, faDownload, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(faPen, faEraser, faDownload, faUndo, faRedo)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
