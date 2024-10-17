<template>
  <div class="popup">
    <div class="popup-content">
      <button class="close-button" @click="$emit('close')">X</button>
      <div class="image-carousel">
        <button @click="previousImage">‹</button>
        <img :src="property.picturesUrl[currentImageIndex] || defaultImage" alt="Property Image" />
        <button @click="nextImage">›</button>
        <div class="image-counter">{{ currentImageIndex + 1 }}/{{ property.picturesUrl.length }}</div>
      </div>
      <div class="property-details">
        <h2>{{ property.propertyName || 'No name' }}</h2>
        <p><strong>Description :</strong> {{ property.description || 'Pas de description' }}</p>
        <p>{{ property.adress }}, {{ property.city }}, {{ property.departement }}</p>
        <p>
          <span v-if="property.propertyType == 'APARTMENT'"> Appartement </span>
          <span v-else> Maison</span> -
          <span v-if="property.accommodationType == 'ROOM'"> Chambre </span>
          <span v-else> Logement entier</span>
        </p>
        <p><strong>Nombre de pièces :</strong> {{ property.numberOfRooms }}</p>
        <p><strong>Nombre de Chambre :</strong> {{ property.numberOfBedrooms }}</p>
        <p><strong>Nombre de salle de bain :</strong> {{ property.numberOfBathrooms }}</p>
        <p v-if="property.acceptsBabies"> Logement adapté aux bébés </p>
        <p v-else> Logement non adapté aux bébés </p>
        <p v-if="property.acceptsPets"> Le Logement accueil les animaux </p>
        <p v-else> Le Logement n'accueil pas les animaux </p>
        <p><strong>Prix par nuit :</strong> €{{ property.pricePerNight }}</p>
      </div>

      <div class="action-buttons">
        <button class="accept-button" @click="handleValidateProperty">Accepter</button>
        <button class="reject-button" @click="handleRefuseProperty">Refuser</button>
      </div>
    </div>
  </div>
</template>

<script>
import { validateProperty, refuseProperty } from "@/services/parisjanitor/endpoints/properties";

export default {
  name: 'PropertyPopup',
  props: {
    property: Object,
  },
  data() {
    return {
      currentImageIndex: 0,
      defaultImage: 'https://via.placeholder.com/600x400?text=No+Image',
    };
  },
  methods: {
    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.property.picturesUrl.length - 1;
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.property.picturesUrl.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    },
    async handleValidateProperty() {
      try {
        await validateProperty(this.property.id);
        alert('Propriété acceptée');
        this.$emit('close');
        window.location.reload();
      } catch (error) {
        alert('Échec de la validation de la propriété');
      }
    },
    async handleRefuseProperty() {
      try {
        await refuseProperty(this.property.id);
        alert('Propriété refusée');
        this.$emit('close');
        window.location.reload();
      } catch (error) {
        alert('Échec du refus de la propriété');
      }
    }
  }
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  height: 80%;
  overflow-y: auto;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.image-carousel {
  position: relative;
  text-align: center;
}
.image-carousel img {
  max-width: 100%;
  max-height: 400px;
  margin-bottom: 20px;
}
.image-carousel button {
  position: absolute;
  top: 50%;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
}
.image-carousel button:disabled {
  opacity: 0.5;
}
.image-carousel .image-counter {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
.property-details {
  text-align: left;
}
.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.accept-button,
.reject-button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
.accept-button {
  background-color: #4caf50;
  color: white;
}
.reject-button {
  background-color: #f44336;
  color: white;
}
</style>
