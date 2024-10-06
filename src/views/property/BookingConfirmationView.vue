<template>
  <div id="booking-confirmation-view" v-if="property">
    <div class="back-button-container">
      <button @click="goToPropertyDetail" class="back-button">
        <span class="arrow-icon">&#8249;</span>
      </button>
      <h1>Récapitulatif</h1>
    </div>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <div class="confirmation-details">
      <div class="reservation-info">
        <h2>Votre voyage</h2>
        <div class="travel-details">
          <p><strong>Dates:</strong> <br>
            {{ startDate }} - {{ endDate }}</p>
          <p><strong>Voyageurs:</strong> <br>
            {{ totalGuests }} voyageurs</p>
        </div>

        <h2>Récapitulatif du logement</h2>
        <div class="insurance">
          <p>Ville : {{ property.location }}</p>
          <p v-if="property.propertyType === 'APARTMENT'">Type de propriété : Appartement</p>
          <p v-else-if="property.propertyType === 'HOUSE'">Type de propriété : Maison</p>
          <p v-else>Type de propriété : Non spécifié</p>

          <p v-if="property.accommodationType === 'COMPLET'">Type d'hébergement : Logement entier</p>
          <p v-else-if="property.accommodationType === 'ROOM'">Type d'hébergement : Chambre</p>
          <p v-else>Type d'hébergement : Non spécifié</p>

          <p>Arrivée disponible : {{ contactSlotDescription }}</p>
          <p>Nombre de salles de bain : {{ property.numberOfBathrooms }}</p>
          <p>Nombre de chambres : {{ property.numberOfBedrooms }}</p>
        </div>

      </div>

      <div class="price-details">
        <div class="image-and-info">
          <img :src="property.imageUrls[0]" alt="Property Image" class="property-image">
          <div class="property-info">
            <h3>{{ property.title }}</h3>
            <p class="property-type">{{ accommodationDescription }}</p>
            <p class="rating">
              <span>★ {{ property.rating }} ({{ property.numberOfReviews }} commentaires)</span> • Superhôte
            </p>
          </div>
        </div>
        <div class="price-breakdown">
          <div class="price-item">
            <span>{{ property.pricePerNight }} € x {{ numberOfNights }} nuits</span>
            <span>{{ subtotalPrice }} €</span>
          </div>
          <div class="price-item">
            <span>Frais de service Airbnb</span>
            <span>{{ serviceFee }} €</span>
          </div>
          <div class="total-price">
            <span>Total (EUR)</span>
            <strong>{{ totalPrice }} €</strong>
          </div>
        </div>
        <button @click="confirmBooking" class="reserve-button">Réserver</button>
      </div>

    </div>
  </div>
  <div v-else>
    <p>Chargement des données...</p>
  </div>
</template>

<script>
import { createBooking } from "@/services/parisjanitor/endpoints/bookings";

export default {
  name: "BookingConfirmationView",
  computed: {
    property() {
      return {
        id: this.$route.query.propertyId,
        title: this.$route.query.title,
        pricePerNight: parseFloat(this.$route.query.pricePerNight),
        imageUrls: JSON.parse(this.$route.query.imageUrls),
        contactSlots: JSON.parse(this.$route.query.contactSlots),
        accommodationType: this.$route.query.accommodationType,
        propertyType: this.$route.query.propertyType,
        numberOfBathrooms: this.$route.query.numberOfBathrooms,
        numberOfBedrooms: this.$route.query.numberOfBedrooms,
        location: this.$route.query.location
      };
    },
    contactSlotDescription() {
      const contactSlot = this.property.contactSlots;
      if (!contactSlot || contactSlot.length === 0) {
        return 'Aucun créneau disponible';
      }
      const slotMessages = {
        BEFORE_12H: 'avant midi',
        BETWEEN_12H_AND_14H: 'de midi à 14h',
        BETWEEN_14H_AND_18H: 'de 14h à 18h',
        AFTER_18H: 'après 18h'
      };
      const hasAllSlots = ['BEFORE_12H', 'BETWEEN_12H_AND_14H', 'BETWEEN_14H_AND_18H', 'AFTER_18H'].every(slot => contactSlot.includes(slot));
      if (hasAllSlots) {
        return "n'importe quand";
      }
      if (contactSlot.includes('BEFORE_12H') && contactSlot.includes('BETWEEN_12H_AND_14H') && contactSlot.includes('BETWEEN_14H_AND_18H') && !contactSlot.includes('AFTER_18H')) {
        return 'jusqu\'à 18h';
      }

      if (contactSlot.includes('BEFORE_12H') && contactSlot.includes('BETWEEN_12H_AND_14H') && !contactSlot.includes('BETWEEN_14H_AND_18H') && !contactSlot.includes('AFTER_18H')) {
        return 'jusqu\'à 14h';
      }

      if (contactSlot.includes('BETWEEN_12H_AND_14H') && contactSlot.includes('BETWEEN_14H_AND_18H') && contactSlot.includes('AFTER_18H') && !contactSlot.includes('BEFORE_12H')) {
        return 'à partir de 12h';
      }

      if (contactSlot.includes('BETWEEN_14H_AND_18H') && contactSlot.includes('BETWEEN_12H_AND_14H') && !contactSlot.includes('BEFORE_12H') && !contactSlot.includes('AFTER_18H')) {
        return 'de 12h à 18h';
      }

      let descriptions = [];
      contactSlot.forEach(slot => {
        if (slotMessages[slot]) {
          descriptions.push(slotMessages[slot]);
        }
      });

      return descriptions.join(' et ');
    },
    startDate() {
      return this.$route.query.startDate;
    },
    endDate() {
      return this.$route.query.endDate;
    },
    numberOfNights() {
      const checkIn = new Date(this.startDate);
      const checkOut = new Date(this.endDate);
      return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    },
    totalGuests() {
      return (
          parseInt(this.$route.query.numberOfAdults) +
          parseInt(this.$route.query.numberOfChildren) +
          parseInt(this.$route.query.numberOfBabies) +
          parseInt(this.$route.query.numberOfPets)
      );
    },
    subtotalPrice() {
      return this.property ? this.property.pricePerNight * this.numberOfNights : 0;
    },
    serviceFee() {
      return Math.round(this.subtotalPrice * 0.15);
    },
    totalPrice() {
      return this.subtotalPrice + this.serviceFee;
    },
    accommodationDescription() {
      if (this.property.accommodationType === 'COMPLET') {
        return `Logement entier : ${this.property.propertyType === 'APARTMENT' ? 'appartement' : 'maison'}`;
      } else {
        return `Chambre dans un(e) ${this.property.propertyType === 'APARTMENT' ? 'appartement' : 'maison'}`;
      }
    }
  },
  methods: {
    async confirmBooking() {
      const bookingData = {
        propertyId: this.property.id,
        startDate: this.startDate,
        endDate: this.endDate,
        status: "PENDING",
        numberOfAdults: parseInt(this.$route.query.numberOfAdults),
        numberOfChildren: parseInt(this.$route.query.numberOfChildren),
        numberOfBabies: parseInt(this.$route.query.numberOfBabies),
        numberOfPets: parseInt(this.$route.query.numberOfPets),
      };

      try {
        await createBooking(bookingData);
        this.successMessage = "La demande de réservation a été faite. En attente de réponse du propriétaire.";
        setTimeout(() => {
          this.$router.push({ name: 'my-bookings' });
        }, 3000);
      } catch (error) {
        console.error("Erreur lors de la création de la réservation :", error);
        alert("Erreur lors de la création de la réservation. Veuillez réessayer.");
      }
    }
  }

};
</script>

<style scoped>
#booking-confirmation-view {
  width: 80%;
  padding: 40px;
  font-family: Arial, sans-serif;
  margin: 0 auto;
}

.confirmation-details {
  display: flex;
  gap: 40px;
  justify-content: space-between;
  margin-top: 20px;
}

.reservation-info {
  flex: 2;
}

.reservation-info h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}

.insurance,
.payment-options {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.payment-options label {
  font-size: 16px;
  margin-left: 10px;
}

.price-details {
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: left;
  height: auto;
  align-self: flex-start;
}

.image-and-info {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.property-image {
  width: 80px;
  height: auto;
  border-radius: 8px;
}

.property-info {
  flex: none;
}

.price-details h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.property-type {
  color: #757575;
  font-size: 14px;
  margin-bottom: 10px;
}

.rating {
  color: #757575;
  font-size: 14px;
}

.price-breakdown {
  margin-top: 10px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  margin-top: 15px;
}

.total-price {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
}

.reserve-button {
  display: block;
  width: 100%;
  background-color: #ff5a5f;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}

.reserve-button:hover {
  background-color: #e04e50;
}

.back-button-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 24px;
}

.arrow-icon {
  font-weight: bold;
}

</style>
