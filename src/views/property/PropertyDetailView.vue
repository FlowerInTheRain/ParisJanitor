<template>
  <div id="property-detail-view" v-if="property && property.imageUrls && property.imageUrls.length">
    <HeaderView @showLoginPopup="showLoginPopup" />
    <div class="property-details">
      <div class="images-section">
        <img
            :src="property.imageUrls[0]"
            alt="Main Property Image"
            class="main-image"
            @click="goToAllImages"
        />
        <div class="other-images">
          <img
              v-for="(img, index) in property.imageUrls.slice(1, 5)"
              :key="index"
              :src="img"
              alt="Property Image"
              @click="goToAllImages"
          />
        </div>
      </div>

      <div class="info-reservation-container">
        <div class="property-info">
          <h1>{{ property.title }}</h1>
          <p class="property-details-info">
            {{ property.capacity }} voyageurs • {{ property.numberOfRooms }} chambres • {{ property.numberOfBedrooms }} lits • {{ property.numberOfBathrooms }} salles de bain
          </p>
          <div class="property-description">
            <h3>Informations sur l'hébergement</h3>
            <p>{{ property.description }}</p>
          </div>
          <div class="host-info">
            <img :src="property.hostImageUrl" alt="Host Image" class="host-image" />
            <div>
              <p>Hôte : {{ property.host }}</p>
              <p>Superhôte - Hôte depuis {{ hostYears }}</p>
            </div>
          </div>
        </div>

        <div class="reservation-section">
          <div class="price-per-night">
            <span>{{ property.pricePerNight }} €</span> par nuit
          </div>
          <div class="booking-form">
            <div class="date-selector">
              <input type="date" v-model="checkInDate" :min="today" placeholder="Arrivée" />
              <input type="date" v-model="checkOutDate" :min="checkInDate ? checkInDate : today" placeholder="Départ" />
            </div>
            <div class="guest-selector">
              <guest-selector :capacity="property.capacity" @updateGuests="updateGuests" />
            </div>
            <button class="reserve-button">Réserver</button>
          </div>

          <div class="price-breakdown">
            <p>{{ property.pricePerNight }} € x {{ numberOfNights }} nuits: <strong>{{ subtotalPrice }} €</strong></p>
            <p>Frais de ménage: <strong>{{ cleaningFee }} €</strong></p>
            <p>Frais de service: <strong>217 €</strong></p>
            <p>Total: <strong>{{ totalPrice }} €</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Chargement des données...</p>
  </div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import GuestSelector from "@/views/property/GuestSelector.vue";
import { getPropertyById } from "@/services/parisjanitor/endpoints/properties";

export default {
  name: "PropertyDetailView",
  components: {
    HeaderView,
    GuestSelector,
  },
  data() {
    return {
      property: null,
      checkInDate: null,
      checkOutDate: null,
      selectedGuests: 1,
    };
  },
  computed: {
    today() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    numberOfNights() {
      if (this.checkInDate && this.checkOutDate) {
        const checkIn = new Date(this.checkInDate);
        const checkOut = new Date(this.checkOutDate);
        const timeDifference = checkOut - checkIn;
        return timeDifference > 0 ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) : 1;
      }
      return 1;
    },
    subtotalPrice() {
      return this.property ? this.property.pricePerNight * this.numberOfNights : 0;
    },
    cleaningFee() {
      return this.property ? Math.round(this.property.pricePerNight * 0.15) : 0;
    },
    totalPrice() {
      return this.subtotalPrice + this.cleaningFee + 217;
    },
    hostYears() {
      // Assuming you have a field "hostSince" in the property object
      if (this.property && this.property.hostSince) {
        return new Date().getFullYear() - new Date(this.property.hostSince).getFullYear();
      }
      return 'plusieurs années';
    },
  },
  async mounted() {
    const propertyId = this.$route.params.id;
    try {
      const property = await getPropertyById(propertyId);
      this.property = property;
    } catch (error) {
      console.error("Erreur lors de la récupération de la propriété :", error);
    }
  },
  methods: {
    goToAllImages() {
      this.$router.push({ name: 'all-images', params: { id: this.$route.params.id } });
    },
    updateGuests(totalGuests) {
      this.selectedGuests = totalGuests;
    }
  },
};
</script>

<style scoped>
#property-detail-view {
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.property-details {
  width: 80%;
  margin: 0 auto;
}

.images-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.main-image {
  width: 50%;
  height: 480px;
  object-fit: cover;
  border-radius: 10px;
}

.other-images img {
  width: 48%;
  height: 235px;
  margin: 3px;
  object-fit: cover;
  border-radius: 10px;
}

.info-reservation-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
}

.property-info {
  flex: 2;
  text-align: left;
}

.property-details-info {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.property-description {
  margin-bottom: 20px;
}

.host-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.host-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.reservation-section {
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
}

.price-per-night {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.date-selector input {
  width: 48%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.guest-selector {
  margin-bottom: 10px;
}

.reserve-button {
  background-color: #ff5a5f;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
}

.reserve-button:hover {
  background-color: #e04e50;
}

.price-breakdown {
  margin-top: 20px;
  font-size: 14px;
  color: #777;
}

.price-breakdown p {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
</style>
