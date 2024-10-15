import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import store from "@/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import process from 'process';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faHouse, faDashboard, faSearch, faCog, faMessage, faFileAlt, faBox, faBars, faMagnifyingGlass, faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

library.add(faHouse, faDashboard, faSearch, faCog, faMessage, faFileAlt, faBox, faBars, faUser, faMagnifyingGlass, faArrowLeft, faXmark);

window.process = process;

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount('#app');
