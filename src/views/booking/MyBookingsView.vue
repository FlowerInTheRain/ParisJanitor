<template>
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

export default {
  name: "MyBookingsView",
  components: {
    LittleCardView,
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
        const response = await axios.get(endpoint);
        return response.data.map(booking => ({
          ...booking,
          property: {
            imageUrls: booking.property.imageUrls,
            location: booking.property.location,
            host: booking.property.host,
            ...booking.property // Assurez-vous que tous les détails nécessaires de la propriété sont inclus
          }
        }));
      } catch (error) {
        console.error(`Erreur lors de la récupération des données de ${endpoint}:`, error);
        return [];
      }
    }
  }
};
</script>

<style scoped>
#my-bookings-view {
  padding: 40px;
  font-family: Arial, sans-serif;
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
