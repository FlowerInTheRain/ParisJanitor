<template>
  <div class="ad-list">
    <CardView v-for="ad in ads" :key="ad.id" :ad="ad" />
  </div>
</template>

<script>
import CardView from "./CardView.vue";

export default {
  name: "AnnonceView",
  components: {
    CardView,
  },
  data() {
    return {
      ads: [
        { id: 1, title: "Entraînez-vous à l'Institut Xavier", price: 35 },
        // Ajoutez d'autres annonces ici
      ],
    };
  },
};
</script>

<style scoped>
.ad-list {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #ffffff;
}
</style>
