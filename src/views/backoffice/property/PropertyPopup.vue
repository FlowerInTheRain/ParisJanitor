<template>
  <div class="popup">
    <div class="popup-content">
      <button class="close-button" @click="$emit('close')">X</button>
      <div class="image-carousel">
        <button @click="previousImage" :disabled="currentImageIndex === 0">‹</button>
        <img :src="property.picturesUrl[currentImageIndex] || defaultImage" alt="Property Image" />
        <button @click="nextImage" :disabled="currentImageIndex === property.picturesUrl.length - 1">›</button>
        <div class="image-counter">{{ currentImageIndex + 1 }}/{{ property.picturesUrl.length }}</div>
      </div>
      <div class="property-details">
        <h2>{{ property.propertyName || 'No name' }}</h2>
        <p><strong>Description:</strong> {{ property.description || 'No description available' }}</p>
        <p><strong>Address:</strong> {{ property.adress }}</p>
        <p><strong>Rooms:</strong> {{ property.numberOfRooms }}</p>
        <p><strong>Price per night:</strong> €{{ property.pricePerNight }}</p>
        <!-- Add more details as necessary -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyPopup',
  props: {
    property: Object,
  },
  data() {
    return {
      currentImageIndex: 0,
      defaultImage: 'https://via.placeholder.com/600x400?text=No+Image', // Default image if no images
    };
  },
  methods: {
    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.property.picturesUrl.length - 1) {
        this.currentImageIndex++;
      }
    },
  },
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
</style>
