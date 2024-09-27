<template>
  <div class="info-modal">
    <h2>Détails de l'annonce</h2>
    <p>Description : {{ ad.description }}</p>
    <p>Type : {{ ad.propertyType }}</p>
    <p>Capacité : {{ ad.capacity }} personnes</p>
    <p>Taille : {{ ad.size }} m²</p>
    <button @click="$emit('close')">Fermer</button>
  </div>
</template>

<script>
export default {
  props: {
    ad: Object,
    visible: Boolean,
  },
};
</script>

<style scoped>
.info-modal {
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>
