<template>
  <div className="ad-list">
    <CardView v-for="ad in ads" :key="ad.id" :ad="ad" :userId="userId" />
  </div>
</template>

<script>
import CardView from "./CardView.vue";
import {getAllProperty} from "@/services/parisjanitor/endpoints/properties";

export default {
  name: "AnnonceView",
  components: {
    CardView,
  },
  data() {
    return {
      ads: [],
      userId: localStorage.getItem('userId') || null, // Assurez-vous que userId est récupéré
    };
  },
  async mounted() {
    try {
      const response = await getAllProperty();
      console.log("Données de l'API :", response);
      this.ads = response;
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  }
};
</script>

<style scoped>
.ad-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
