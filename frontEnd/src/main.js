import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import Toaster from "@meforma/vue-toaster";

import 'bootstrap/dist/css/bootstrap.min.css'


import './assets/app.css'

import { io } from "socket.io-client"

const app = createApp(App)

const serverBaseUrl = 'http://backend.test'

app.provide('socket', io("http://127.0.0.1:8080"))

app.provide('axios', axios.create({
    baseURL: serverBaseUrl + '/api/',
    headers: {
      'Content-type': 'application/json',
    },
  }))
  app.provide('paymentGateway', axios.create({
    baseURL: 'https://dad-202223-payments-api.vercel.app/api/',
    headers: {
      'Content-type': 'application/json',
    },
  }))
app.provide('serverBaseUrl', serverBaseUrl)  

app.use(Toaster, {
    // Global/Default options
    position: 'top',
    timeout: 3000,
    pauseOnHover: true
})
app.provide('toast', app.config.globalProperties.$toast);

app.use(createPinia())
app.use(router)

app.mount('#app')
