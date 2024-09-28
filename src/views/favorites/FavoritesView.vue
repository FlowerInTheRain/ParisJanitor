<template>
  <div id="favorites-view">
    <HeaderView @showLoginPopup="showLoginPopup"/>
    <h1>Favoris</h1>
    <div class="favorites-list">
      <CardView v-for="ad in favoriteProperties" :key="ad.id" :ad="ad" />
    </div>
  </div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import CardView from "@/views/home/content/CardView.vue";

import { getUserFavorites, getPropertyById } from "@/services/parisjanitor/endpoints/properties";

export default {
  name: "FavoritesView",
  components: {
    HeaderView,
    CardView,
  },
  data() {
    return {
      favoriteProperties: [],
    };
  },
  async mounted() {
    try {
      const favorites = await getUserFavorites();
      const favoritePropertyRequests = favorites.map((fav) => getPropertyById(fav.propertyId));
      const properties = await Promise.all(favoritePropertyRequests);
      this.favoriteProperties = properties;
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris :", error);
    }
  },
};
</script>

<style scoped>
#favorites-view {
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.favorites-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding-top: 20px;
}
</style>
