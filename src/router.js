import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import ProfilView from './views/user/ProfilView.vue';
import FavoritesView from "@/views/favorites/FavoritesView";
import PropertyDetailView from "@/views/property/PropertyDetailView";
import AllImagesView from "@/views/property/AlImagesView";
import BookingConfirmationView from "@/views/property/BookingConfirmationView";

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
  },
  {
    path: '/mes-favoris',
    name: 'favorites',
    component: FavoritesView,
    meta: { title: 'Mes Favoris - Paris Janitor' }
  },
  {
    path: '/property/:id',
    name: 'property-detail',
    component: PropertyDetailView,
    meta: { title: 'Détail de la propriété - Paris Janitor' }
  },

  {
    path: '/property/:id/images',
    name: 'all-images',
    component: AllImagesView,
    meta: { title: 'Image - Paris Janitor' }
  },
  {
    path: '/property/:id/booking-confirmation',
    name: 'BookingConfirmation',
    component: BookingConfirmationView,
    props: route => ({ bookingDetails: route.params.bookingDetails }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Paris Janitor';
});

export default router;
