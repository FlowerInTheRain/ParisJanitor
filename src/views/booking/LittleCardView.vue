<template>
  <div className="little-card">
    <img :src="imageSource" alt="Property Image" class="property-image"/>
    <div className="property-details">
      <p><strong>Ville:</strong> {{ property.city }}</p>
      <p><strong>Hôte:</strong> {{ property.host }}</p>
      <p><strong>Dates:</strong> {{ formattedDates }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LittleCardView",
  props: {
    property: {
      type: Object,
      required: true,
    },
    booking: {
      type: Object,
      required: true,
    }
  },
  computed: {
    formattedDates() {
      const startDate = new Date(this.booking.startDate).toLocaleDateString();
      const endDate = new Date(this.booking.endDate).toLocaleDateString();
      return `${startDate} - ${endDate}`;
    },
    imageSource() {
      // Affiche la première image de la liste ou un placeholder si aucune image n'est disponible
      if (this.property.imageUrls && this.property.imageUrls.length > 0) {
        return this.property.imageUrls[0]; // Prend la première image
      } else {
        return "https://via.placeholder.com/150"; // Placeholder image si aucune image n'est disponible
      }
    }
  }
};
</script>

<style scoped>
.little-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  width: 30%;
}

.property-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 10px;
  object-fit: cover;
}

.property-details {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.property-details p {
  margin: 0;
  line-height: 1.4;
}
</style>
