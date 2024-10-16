<template>
  <div class="properties-list">
    <div v-for="property in properties" :key="property.id" class="property-item">
      <PropertyCard :property="property" @open-popup="showPopup" />
    </div>
    <h1>Propriété en attente</h1>
    <PropertyPopup
        v-if="selectedProperty"
        :property="selectedProperty"
        @close="closePopup"
        @updateList="fetchProperties"
    />

  </div>
</template>

<script>
import axios from "axios";
import PropertyCard from './PropertyCard.vue';
import PropertyPopup from './PropertyPopup.vue';

export default {
  name: "PropertyListView",
  components: {
    PropertyCard,
    PropertyPopup,
  },
  data() {
    return {
      properties: [],
      loading: true,
      selectedProperty: null,
    };
  },
  methods: {
    showPopup(property) {
      this.selectedProperty = property;
    },
    closePopup() {
      this.selectedProperty = null;
    },
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:4001/parisjanitor-api/properties/awaited', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.properties = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des propriétés", error);
    } finally {
      this.loading = false;
    }
  },
  async fetchProperties() {
    console.log('Fetching properties...');
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:4001/parisjanitor-api/properties/awaited', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.properties = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des propriétés", error);
    }
  }
};
</script>

<style scoped>
.properties-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  height: 100%;
}

.property-item {
  flex: 1 1 calc(33.33% - 20px);
  box-sizing: border-box;
  margin-bottom: 5px;
  max-width: calc(33.33% - 20px);
}

.property-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  background-color: white;
}

.property-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.property-info {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.property-info h2 {
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.property-info p {
  flex-grow: 1;
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
}

button:hover {
  background-color: #e04e50;
}
</style>
