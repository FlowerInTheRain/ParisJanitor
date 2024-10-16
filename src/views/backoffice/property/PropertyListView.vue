<template>
  <div>
    <h1>Propriétés en attente</h1>
    <div class="properties-list">
      <div v-for="property in properties" :key="property.id" class="property-item">
        <PropertyCard :property="property" @open-popup="showPopup" />
      </div>
      <PropertyPopup
          v-if="selectedProperty"
          :property="selectedProperty"
          @close="closePopup"
          @validate="validateProperty"
          @refuse="refuseProperty"
      />
    </div>
  </div>
</template>

<script>
import { getAwaitedProperties, validateProperty, refuseProperty } from "@/services/parisjanitor/endpoints/properties";
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
    async fetchProperties() {
      try {
        this.properties = await getAwaitedProperties();
      } catch (error) {
        console.error("Erreur lors de la récupération des propriétés en attente", error);
      }
    },
    async validateProperty(propertyId) {
      try {
        await validateProperty(propertyId);
        alert('Propriété validée');
        this.fetchProperties();
      } catch (error) {
        alert('Erreur lors de la validation de la propriété');
      }
    },
    async refuseProperty(propertyId) {
      try {
        await refuseProperty(propertyId);
        alert('Propriété refusée');
        this.fetchProperties();
      } catch (error) {
        alert('Erreur lors du refus de la propriété');
      }
    },
  },
  async created() {
    await this.fetchProperties();
  },
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
