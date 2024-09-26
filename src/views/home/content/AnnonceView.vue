<template>
  <div className="ad-list">
    <CardView v-for="ad in ads" :key="ad.id" :ad="ad"/>
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
    };
  },
  async mounted() {
    try {
      const response = await getAllProperty();
      this.ads = response;
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  },
};
</script>

<style scoped>
.ad-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
