import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import process from 'process';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
);

window.process = process;

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.mount('#app')
