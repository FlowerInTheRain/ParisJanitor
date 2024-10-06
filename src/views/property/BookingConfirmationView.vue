<template>
  <div id="booking-confirmation-view" v-if="property">
    <h1>Récapitulatif</h1>

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

        <h2>Choisissez comment vous souhaitez payer</h2>
        <div class="payment-options">
          <div>
            <input type="radio" id="pay-now" name="payment" value="pay-now" checked>
            <label for="pay-now">Payer {{ totalPrice }} € maintenant</label>
          </div>
          <div>
            <input type="radio" id="pay-later" name="payment" value="pay-later">
            <label for="pay-later">Payer une partie maintenant et l'autre plus tard</label>
          </div>
        </div>
      </div>

      <div class="price-details">
        <img :src="property.imageUrls[0]" alt="Property Image" class="property-image">
        <h3>{{ property.title }}</h3>
        <p>{{ property.pricePerNight }} € x {{ numberOfNights }} nuits</p>
        <p>Frais de service: {{ serviceFee }} €</p>
        <p><strong>Total: {{ totalPrice }} €</strong></p>
        <button @click="confirmBooking">Réserver</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Chargement des données...</p>
  </div>
</template>

<script>
import { createBooking } from "@/services/parisjanitor/endpoints/bookings"; // Importez la fonction createBooking

export default {
  name: "BookingConfirmationView",
  computed: {
    property() {
      return {
        id: this.$route.query.propertyId,
        title: this.$route.query.title,
        pricePerNight: parseFloat(this.$route.query.pricePerNight),
        imageUrls: JSON.parse(this.$route.query.imageUrls),
        contactSlots: JSON.parse(this.$route.query.contactSlots), // Assuming it's passed as JSON string
        accommodationType: this.$route.query.accommodationType,
        propertyType: this.$route.query.propertyType,
        numberOfBathrooms: this.$route.query.numberOfBathrooms,
        numberOfBedrooms: this.$route.query.numberOfBedrooms,
        location: this.$route.query.location // Assuming location is passed as a query parameter
      };
    },
    contactSlotDescription() {
      const contactSlot = this.property.contactSlots;
      if (!contactSlot || contactSlot.length === 0) {
        return 'Aucun créneau disponible';
      }

      // Mapper les choix possibles à des messages
      const slotMessages = {
        BEFORE_12H: 'avant midi',
        BETWEEN_12H_AND_14H: 'de midi à 14h',
        BETWEEN_14H_AND_18H: 'de 14h à 18h',
        AFTER_18H: 'après 18h'
      };

      // Vérifier le nombre et les combinaisons de slots
      const hasAllSlots = ['BEFORE_12H', 'BETWEEN_12H_AND_14H', 'BETWEEN_14H_AND_18H', 'AFTER_18H'].every(slot => contactSlot.includes(slot));
      if (hasAllSlots) {
        return "n'importe quand";
      }

      // Identifier les combinaisons spécifiques
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

      // Pour les cas de combinaisons non contiguës
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
    totalPrice() {
      return parseFloat(this.$route.query.totalPrice);
    },
    serviceFee() {
      return Math.round(this.totalPrice * 0.15);
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
        console.log("Réservation confirmée avec succès !");
        this.$router.push({ name: 'home', query: { success: true } });
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
  padding: 40px;
  font-family: Arial, sans-serif;
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
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

.property-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
}

.price-details h3 {
  margin-bottom: 10px;
}

.price-details p {
  margin: 5px 0;
}

.price-details strong {
  font-size: 18px;
  color: #333;
}
</style>
