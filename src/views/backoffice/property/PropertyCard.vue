<template>
  <div class="property-card">
    <img :src="property.picturesUrl[0] || defaultImage" alt="Property image" class="property-image" />
    <div class="property-info">
      <h2>{{ property.propertyName || 'Unknown' }}</h2>
      <p>{{ property.description || 'No description available' }}</p>
      <button @click="openPopup">Read all about it</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyCard',
  props: {
    property: Object,
  },
  data() {
    return {
      defaultImage: 'https://via.placeholder.com/300x200?text=No+Image', // Default image if no images found
    };
  },
  methods: {
    openPopup() {
      this.$emit('open-popup', this.property);
    },
  },
};
</script>

<style scoped>
.property-card {
  display: flex;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
}
.property-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.property-info {
  display: flex;
  flex-direction: column;
}
button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #e04e50;
}
</style>
