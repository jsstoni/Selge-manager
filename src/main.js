import { createApp } from 'vue'
import { Toaster, createToaster } from '@meforma/vue-toaster'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Global } from './Global'
import Loader from './Loader'
import Helper from './Helper'

axios.defaults.baseURL = Global.url
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.interceptors.response.use(config => {
  Loader.stop()
  return config
}, error => createToaster().error(error))

axios.interceptors.request.use((config) => {
  if(!store.getters.isAuthenticated) {
    return config;
  }
  config.headers.Authorization = store.getters.userToken;
  return config;
});

createApp({
  extends: App,
}).use(store).use(router).use(Toaster).use(Loader).use(Helper).mount('#app')
