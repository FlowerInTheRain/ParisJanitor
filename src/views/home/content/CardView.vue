<template>
  <div class="ad-card" v-if="ad">
    <div class="ad-image">
      <!-- Insérez l'image ici -->
    </div>
    <div class="ad-content">
      <h3 v-if="ad.title">{{ ad.title }}</h3>
      <p v-if="ad.price">{{ ad.price }} € par voyageur</p>
      <p v-else>Prix non disponible</p>
    </div>
  </div>
  <div v-else>
    <p>Annonce non disponible</p>
  </div>
</template>

<script>
export default {
  name: "CardView",
  props: {
    ad: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.ad-card {
  border: 2px solid #f1f1f1;
  padding: 10px;
  border-radius: 8px;
  max-width: 300px;
  text-align: center;
}
.ad-image {
  background-color: #ddd;
  height: 150px;
  margin-bottom: 10px;
}
</style>
