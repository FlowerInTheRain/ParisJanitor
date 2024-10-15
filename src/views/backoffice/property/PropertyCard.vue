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
      defaultImage: 'https://via.placeholder.com/300x200?text=No+Image',
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
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
}

.property-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.property-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
}

.property-info h2 {
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.property-info p {
  font-size: 14px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
}

button:hover {
  background-color: #e04e50;
}
</style>

