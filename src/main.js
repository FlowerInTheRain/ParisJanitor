import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import store from "@/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import process from 'process';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axiosInstance from "@/services/parisjanitor/axios";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faCog, faFileAlt, faBox, faBars, faMagnifyingGlass, faArrowLeft, faXmark, faUser, faBuildingUser, faFileInvoice, faBellConcierge, faComments } from '@fortawesome/free-solid-svg-icons';

import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
library.add(faHouse, faCog, faFileAlt, faBox, faBars, faUserRegular, faUser, faMagnifyingGlass, faArrowLeft, faXmark, faBuildingUser, faFileInvoice, faBellConcierge, faComments);

window.process = process;
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.config.globalProperties.$axios = axiosInstance;
app.mount('#app');
