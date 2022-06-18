import "bootstrap/scss/bootstrap.scss"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { createApp,h  } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

window.axios = require('axios');
axios.defaults.baseURL = "https://test-api.storexweb.com/api";

createApp({
    created() {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            const userData = JSON.parse(userInfo);
            this.$store.commit('setUserData', userData)
        }
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) { //|| error.response.status === 403 ??
                    this.$store.dispatch('logout')
                }
                return Promise.reject(error)
            }
        )
    },
    render: () => h(App),
}).use(store).use(router)
    .mount('#app');