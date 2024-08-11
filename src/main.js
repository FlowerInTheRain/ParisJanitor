import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import store from "@/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import process from 'process';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

library.add(faBars, faUser);

window.process = process;

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount('#app');
