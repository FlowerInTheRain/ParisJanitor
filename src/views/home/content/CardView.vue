<template>
  <div class="ad-card">
    <div class="ad-image">
      <!-- Ajoute la condition v-if pour que v-else fonctionne correctement -->
      <img v-if="ad.imageUrls && ad.imageUrls.length" :src="ad.imageUrls[0]" alt="Image de la propriété" />
      <p v-else>Aucune image disponible</p>
    </div>
    <div class="ad-content">
      <h3>{{ ad.description }}</h3>
      <p>Type : {{ ad.propertyType }}</p>
      <p>Capacité : {{ ad.capacity }} personnes</p>
      <p>Taille : {{ ad.size }} m²</p>
      <p v-if="ad.price">{{ ad.price }} € par nuit</p>
      <p v-else>Prix non disponible</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ad: {
      type: Object, // La prop `ad` contient une annonce complète
      required: true, // Assure que `ad` est passé au composant
    },
  },
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

.ad-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
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
