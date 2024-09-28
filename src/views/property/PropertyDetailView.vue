<template>
  <div id="property-detail-view" v-if="property && property.imageUrls && property.imageUrls.length">
    <HeaderView @showLoginPopup="showLoginPopup" />
    <div class="property-details">
      <div class="images-section">
        <img
            :src="property.imageUrls[0]"
            alt="Main Property Image"
            class="main-image"
            @click="goToAllImages"
        />
        <div class="other-images">
          <img
              v-for="(img, index) in property.imageUrls.slice(1, 5)"
              :key="index"
              :src="img"
              alt="Property Image"
              @click="goToAllImages"
          />
        </div>
      </div>
      <div class="property-info">
        <h1>{{ property.title }}</h1>
        <p>{{ property.description }}</p>
        <p>{{ property.capacity }} lits • {{ property.numberOfRooms }} chambres • {{ property.pricePerNight }} €/nuit</p>
        <p>Hôte : {{ property.host }}</p>
      </div>
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
  name: "PropertyDetailView",
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
    goToAllImages() {
      this.$router.push({ name: 'all-images', params: { id: this.$route.params.id } });
    }
  },
};
</script>

<style scoped>
#property-detail-view {
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.property-details {
  width: 80%;
  margin: 0 auto;
}

.images-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.main-image {
  width: 60%;
  height: 480px;
  object-fit: cover;
  border-radius: 10px;
}
.main-image {
  width: 50%;
  height: 480px;
  object-fit: cover;
  border-radius: 10px;
}

.other-images img {
  width: 48%;
  height: 235px;
  margin: 3px;
  object-fit: cover;
  border-radius: 10px;
}

.property-info {
  margin-top: 20px;
  text-align: center;
}
</style>


