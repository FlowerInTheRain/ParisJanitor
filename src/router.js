import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import ProfilView from './views/user/ProfilView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Paris Janitor' }
  },
  {
    path: '/mon-compte',
    name: 'profil',
    component: ProfilView,
    meta: { title: 'Mon Compte - Paris Janitor' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Paris Janitor';
});

export default router;
