import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import ProfilView from './views/user/ProfilView.vue';
import FavoritesView from "@/views/favorites/FavoritesView";
import PropertyDetailView from "@/views/property/PropertyDetailView";
import AllImagesView from "@/views/property/AlImagesView";
import BookingConfirmationView from "@/views/property/BookingConfirmationView";
import MyBookingsView from "@/views/booking/MyBookingsView";
import CreatePropertyView from "@/views/property/CreatePropertyView";
import AdminHomeView from "@/views/backoffice/home/AdminHomeView";

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
  {
    path: '/mes-reservations',
    name: 'my-bookings',
    component: MyBookingsView,
    meta: { title: 'Mes Réservations - Paris Janitor' }
  },
  {
    path: '/creer-propriete',
    name: 'create-property',
    component: CreatePropertyView,
    meta: { title: 'Créer une propriété' }
  },
  {
    path: '/admin',
    name: 'Adminhome',
    component: AdminHomeView,
    meta: { title: 'Admin - Paris Janitor', requiresAuth: true, adminOnly: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware pour vérifier les accès aux routes protégées
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/');
    } else if (to.matched.some(record => record.meta.adminOnly) && userRole !== 'ADMIN') {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Paris Janitor';
});

export default router;
