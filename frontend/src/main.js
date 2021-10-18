import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './vuex'
import './axios'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas);

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

createApp(App).use(router).use(store).component('fa', FontAwesomeIcon).mount('#app')