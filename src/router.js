import {createRouter, createWebHistory} from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import ProfilView from './views/user/ProfilView.vue';
import FavoritesView from "@/views/favorites/FavoritesView";
import PropertyDetailView from "@/views/property/PropertyDetailView";
import AllImagesView from "@/views/property/AlImagesView";
import BookingConfirmationView from "@/views/property/BookingConfirmationView";
import MyBookingsView from "@/views/booking/MyBookingsView";
import CreatePropertyView from "@/views/property/CreatePropertyView";
import AdminHomeView from "@/views/backoffice/home/AdminHomeView";
import PaymentForm from "@/components/PaymentForm.vue";
import ProvidersHome from "@/views/providers/ProvidersHome.vue";
import ProviderRefPrestationDetails from "@/views/providers/ProviderRefPrestationDetails.vue";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Paris Janitor' }
  },
  {
    path: '/pay',
    name: 'pay',
    component: PaymentForm,
    meta: { title: 'Paris Janitor Payment' }
  },
  {
    path: '/espace-prestataire/home',
    name: 'providers-login',
    component: ProvidersHome,
    meta: { title: 'Paris Janitor Providers login' }
  },
  {
    path: '/espace-prestataire/details-prestation/:refPrestId',
    name: 'refPrestationDetails',
    component: ProviderRefPrestationDetails,
    props: true,
    meta: { title: 'Paris Janitor Providers login' }
    
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
    meta: { title: 'Paris Janitor' }
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
