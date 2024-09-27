<template>
  <div class="ad-card">
    <!-- Vérifie si l'objet ad est défini -->
    <div class="ad-content" v-if="ad">
      <h3 v-if="ad.description">{{ ad.description }}</h3>
      <p v-if="ad.adress">Adresse : {{ ad.adress }}</p>
      <p v-if="ad.city">Ville : {{ ad.city }}</p>
      <p v-if="ad.propertyType">Type : {{ ad.propertyType }}</p>
      <p v-if="ad.capacity">Capacité : {{ ad.capacity }} personnes</p>
      <p v-if="ad.size">Taille : {{ ad.size }} m²</p>
      <p v-if="ad.pricePerNight > 0">{{ ad.pricePerNight }} € par nuit</p>
      <p v-else>Prix non disponible</p>
    </div>

    <!-- Si l'objet ad n'est pas défini -->
    <div v-else>
      <p>Annonce non disponible ou incomplète</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ad: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("Annonce reçue :", this.ad);
  }
};
</script>

<style scoped>
.ad-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ad-content h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.ad-content p {
  margin: 5px 0;
  font-size: 1rem;
}
</style>
