<template>
  <div className="ad-list">
    <!-- Utilisation de v-for pour afficher chaque annonce sous forme de carte -->
    <CardView v-for="ad in ads" :key="ad.id" :ad="ad"/>
  </div>
</template>

<script>
import CardView from "./CardView.vue";
import {getAllProperty} from "@/services/parisjanitor/endpoints/properties"; // Importation de la fonction API

export default {
  name: "AnnonceView",
  components: {
    CardView,
  },
  data() {
    return {
      ads: [], // Stocke les annonces récupérées
    };
  },
  async mounted() {
    try {
      const response = await getAllProperty(); // Appelle l'API pour récupérer les annonces
      this.ads = response; // Remplit ads avec les données de l'API
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  },
};
</script>

<style scoped>
.ad-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Affiche les cartes en grille */
  gap: 20px;
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
