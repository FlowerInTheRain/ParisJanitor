<template>
  <HeaderView />
  <div id="my-bookings-view">
    <h1>Mes Réservations</h1>

    <div v-if="loading" class="loading">Chargement des réservations...</div>

    <div v-else>
      <h2>Réservations en attente de réponse</h2>
      <div v-if="pendingBookings.length">
        <LittleCardView
            v-for="booking in pendingBookings"
            :key="booking.id"
            :property="booking.property"
            :booking="booking"
        />
      </div>
      <div v-else>Aucune réservation en attente de réponse.</div>

      <h2>Réservations à venir</h2>
      <div v-if="upcomingBookings.length">
        <LittleCardView
            v-for="booking in upcomingBookings"
            :key="booking.id"
            :property="booking.property"
            :booking="booking"
        />
      </div>
      <div v-else>Aucune réservation à venir.</div>

      <h2>Réservations précédentes</h2>
      <div v-if="previousBookings.length">
        <LittleCardView
            v-for="booking in previousBookings"
            :key="booking.id"
            :property="booking.property"
            :booking="booking"
        />
      </div>
      <div v-else>Aucune réservation précédente.</div>

      <h2>Réservations annulées</h2>
      <div v-if="cancelledBookings.length">
        <LittleCardView
            v-for="booking in cancelledBookings"
            :key="booking.id"
            :property="booking.property"
            :booking="booking"
        />
      </div>
      <div v-else>Aucune réservation annulée.</div>
    </div>
  </div>
</template>

<script>
import LittleCardView from "@/views/booking/LittleCardView.vue";
import axios from "@/services/parisjanitor/axios";
import HeaderView from "@/views/home/content/HeaderView.vue";

export default {
  name: "MyBookingsView",
  components: {
    LittleCardView,
    HeaderView
  },
  data() {
    return {
      loading: true,
      pendingBookings: [],
      upcomingBookings: [],
      previousBookings: [],
      cancelledBookings: [],
    };
  },
  async mounted() {
    try {
      this.pendingBookings = await this.fetchBookings("/bookings/pending");
      this.upcomingBookings = await this.fetchBookings("/bookings/reserved");
      this.previousBookings = await this.fetchBookings("/bookings/finished");
      this.cancelledBookings = await this.fetchBookings("/bookings/cancelled-or-refused");
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async fetchBookings(endpoint) {
      try {
        // Obtenir les réservations
        const response = await axios.get(endpoint);
        const bookings = response.data;

        // Pour chaque réservation, obtenir les détails de la propriété
        const bookingsWithProperties = await Promise.all(
            bookings.map(async (booking) => {
              const property = await this.fetchPropertyById(booking.propertyId);
              return { ...booking, property };
            })
        );

        return bookingsWithProperties;
      } catch (error) {
        console.error(`Erreur lors de la récupération des données de ${endpoint}:`, error);
        return [];
      }
    },
    async fetchPropertyById(propertyId) {
      try {
        const response = await axios.get(`/properties/${propertyId}`);
        return response.data;
      } catch (error) {
        console.error(`Erreur lors de la récupération de la propriété ${propertyId}:`, error);
        return null;
      }
    },
  },
};
</script>

<style scoped>
#my-bookings-view {
  font-family: Arial, sans-serif;
  padding: 40px;
}

h1 {
  margin-bottom: 20px;
}

h2 {
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
}

.loading {
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}
</style>
