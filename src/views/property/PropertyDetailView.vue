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

      <div v-if="successMessage" class="success-message">
        <p>{{ successMessage }}</p>
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
            <button
                class="availability-button"
                :disabled="!isAvailable"
                @click="makeReservation"
            >
              {{ isAvailable ? 'Réserver' : 'Vérifier la disponibilité' }}
            </button>
          </div>

          <div class="price-breakdown" v-if="checkInDate && checkOutDate">
            <p>{{ property.pricePerNight }} € x {{ numberOfNights }} nuits: <strong>{{ subtotalPrice }} €</strong></p>
            <p>Frais de ménage: <strong>{{ cleaningFee }} €</strong></p>
            <p>Frais de service: <strong>217 €</strong></p>
            <p>Total: <strong>{{ totalPrice }} €</strong></p>
          </div>

          <div class="availability-message" v-if="availabilityMessage">
            <p>{{ availabilityMessage }}</p>
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
import { checkAvailability, hasBooking } from "@/services/parisjanitor/endpoints/bookings";

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
      availabilityMessage: "",
      isAvailable: false,
      successMessage: "",
      guests: {
        adults: 1,
        children: 0,
        babies: 0,
        pets: 0,
      },
    };
  },
  computed: {
    today() {
      const today = new Date();
      return today.toISOString().split("T")[0];
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
      if (this.property && this.property.hostSince) {
        return new Date().getFullYear() - new Date(this.property.hostSince).getFullYear();
      }
      return 'plusieurs années';
    },
  },
  watch: {
    checkInDate: 'verifyAvailability',
    checkOutDate: 'verifyAvailability'
  },
  async mounted() {
    const propertyId = this.$route.params.id;
    try {
      const property = await getPropertyById(propertyId);
      this.property = property;

      if (this.$route.query.success) {
        this.successMessage = "La demande de réservation a été effectuée.";
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la propriété :", error);
    }
  },
  methods: {
    goToAllImages() {
      this.$router.push({ name: 'all-images', params: { id: this.$route.params.id } });
    },
    updateGuests(updatedGuests) {
      this.guests = updatedGuests;
    },
    async verifyAvailability() {
      if (this.checkInDate && this.checkOutDate) {
        const formattedCheckInDate = this.formatDate(this.checkInDate);
        const formattedCheckOutDate = this.formatDate(this.checkOutDate);
        const propertyId = this.property.id;

        try {
          const isAvailable = await checkAvailability(propertyId, formattedCheckInDate, formattedCheckOutDate);
          console.log("Résultat de la disponibilité :", isAvailable);

          if (isAvailable) {
            this.isAvailable = true;
          } else {
            this.isAvailable = false;
            this.availabilityMessage = "Le logement n'est pas disponible pour les dates sélectionnées.";
          }
        } catch (error) {
          this.isAvailable = false;
          this.availabilityMessage = "Erreur lors de la vérification de la disponibilité.";
        }
      } else {
        this.isAvailable = false;
        this.availabilityMessage = "";
      }
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async makeReservation() {
      if (!this.isAvailable) {
        alert("Le logement n'est pas disponible pour les dates sélectionnées.");
        return;
      }

      const formattedCheckInDate = this.formatDate(this.checkInDate);
      const formattedCheckOutDate = this.formatDate(this.checkOutDate);

      try {
        const hasExistingBooking = await hasBooking(formattedCheckInDate, formattedCheckOutDate);
        if (hasExistingBooking) {
          alert("Vous avez déjà une réservation de prévue entre les dates sélectionnées. Veuillez modifier les dates, ou annuler d'abord la réservation déjà faite.");
          return;
        }

        this.$router.push({
          name: 'BookingConfirmation',
          query: {
            propertyId: this.property.id,
            title: this.property.title,
            pricePerNight: this.property.pricePerNight,
            imageUrls: JSON.stringify(this.property.imageUrls),
            startDate: formattedCheckInDate,
            endDate: formattedCheckOutDate,
            numberOfAdults: this.guests.adults,
            numberOfChildren: this.guests.children,
            numberOfBabies: this.guests.babies,
            numberOfPets: this.guests.pets,
            totalPrice: this.totalPrice,
            propertyType: this.property.propertyType,
            accommodationType: this.property.accommodationType,
            contactSlots: JSON.stringify(this.property.contactSlots),
            numberOfBathrooms: this.property.numberOfBathrooms,
            numberOfBedrooms: this.property.numberOfBedrooms
          }
        });
      } catch (error) {
        console.error("Erreur lors de la vérification des réservations existantes :", error);
        alert("Erreur lors de la vérification des réservations existantes. Veuillez réessayer.");
      }
    }
  }
};
</script>

<style scoped>

.availability-button {
  background-color: #ccc;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: not-allowed;
  font-size: 16px;
  text-align: center;
}

.availability-button:enabled {
  background-color: #ff5a5f;
  cursor: pointer;
}

.availability-button:enabled:hover {
  background-color: #e04e50;
}

.availability-message {
  margin-top: 20px;
  font-size: 14px;
  color: #ff5a5f;
}

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

.availability-button {
background-color: #ccc;
color: white;
padding: 15px;
border: none;
border-radius: 8px;
cursor: not-allowed;
font-size: 16px;
text-align: center;
}

.availability-button:enabled {
background-color: #ff5a5f;
cursor: pointer;
}

.availability-button:enabled:hover {
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

.success-message {
  margin: 20px 0;
  padding: 10px;
  background-color: #dff0d8;
  color: #3c763d;
  border-radius: 5px;
  text-align: center;
}

</style>