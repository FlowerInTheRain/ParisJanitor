<template>
  <div id="all-images-view" v-if="property && property.imageUrls && property.imageUrls.length">
    <HeaderView @showLoginPopup="showLoginPopup" />
    <div class="back-button-section">
      <button @click="goBackToDetail" class="back-button">Retour</button>
    </div>
    <h1>{{ property.title }} - Toutes les photos</h1>
    <div class="all-images">
      <img v-for="(img, index) in property.imageUrls" :key="index" :src="img" alt="Property Image" />
    </div>
  </div>
  <div v-else>
    <p>Chargement des données...</p>
  </div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import { getPropertyById } from "@/services/parisjanitor/endpoints/properties";

export default {
  name: "AllImagesView",
  components: {
    HeaderView,
  },
  data() {
    return {
      property: null,
    };
  },

  async mounted() {
    const propertyId = this.$route.params.id;
    try {
      const property = await getPropertyById(propertyId);
      this.property = property;
    } catch (error) {
      console.error("Erreur lors de la récupération de la propriété :", error);
    }
  },
  methods: {
    goBackToDetail() {
      this.$router.push({ name: 'property-detail' });
    }
  }
};
</script>

<style scoped>
#all-images-view {
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button-section {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.back-button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.back-button:hover {
  background-color: #e04e50;
}

.all-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.all-images img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
