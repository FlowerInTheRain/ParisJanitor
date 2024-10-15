<template>
  <div class="properties-list">
    <div v-for="property in properties" :key="property.id">
      <PropertyCard :property="property" @open-popup="showPopup" />
    </div>
    <PropertyPopup v-if="selectedProperty" :property="selectedProperty" @close="closePopup" />
  </div>
</template>

<script>
import axios from 'axios';
import PropertyCard from './PropertyCard.vue';
import PropertyPopup from './PropertyPopup.vue';

export default {
  name: 'PropertiesList',
  components: { PropertyCard, PropertyPopup },
  data() {
    return {
      properties: [],
      selectedProperty: null,
    };
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await axios.get('http://localhost:4001/parisjanitor-api/properties/awaited');
        this.properties = response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },
    showPopup(property) {
      this.selectedProperty = property;
    },
    closePopup() {
      this.selectedProperty = null;
    },
  },
  mounted() {
    this.fetchProperties();
  },
};
</script>

<style scoped>
.properties-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
