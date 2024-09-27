<template>
  <div class="ad-card">
    <div class="ad-favorite" @click="toggleFavorite">
      <img :src="isFavorite ? fullHeartImg : emptyHeartImg" alt="Favorite Icon" />
    </div>
    <div class="ad-image" @mouseover="showArrows = true" @mouseleave="showArrows = false">
      <img :src="ad.imageUrls[currentImageIndex]" alt="Image de la propriété" />
      <div v-if="showArrows" class="arrow left" @click="prevImage">‹</div>
      <div v-if="showArrows" class="arrow right" @click="nextImage">›</div>
    </div>
    <div class="ad-content">
      <h3>{{ ad.title }} • {{ ad.city }}</h3>
      <p>{{ ad.propertyType }} • {{ ad.capacity }} lits</p>
      <p>Hôte : {{ ad.host }}</p>
      <div class="ad-rating">
        <span>⭐ {{ ad.rating }} ({{ ad.reviews }})</span>
      </div>
      <div class="ad-price">
        <p class="old-price" v-if="ad.oldPrice">{{ ad.oldPrice }} €</p>
        <p>{{ ad.pricePerNight }} € par nuit</p>
        <p class="total-price">{{ ad.totalPrice }} € au total</p>
      </div>
    </div>
  </div>
</template>

<script>
import fullHeartImg from '@/assets/home/full-heart.png';
import emptyHeartImg from '@/assets/home/empty-heart.png';
import { addFavoriteProperty, getUserFavorites, removeFavoriteProperty } from "@/services/parisjanitor/endpoints/properties";

export default {
  props: {
    ad: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentImageIndex: 0,
      showArrows: false,
      isFavorite: false,
      fullHeartImg,
      emptyHeartImg,
    };
  },
  async mounted() {
    try {
      const favorites = await getUserFavorites();
      this.isFavorite = favorites.some(fav => fav.propertyId === this.ad.id);
    } catch (error) {
      console.error("Erreur lors du chargement des favoris :", error);
    }
  },
  methods: {
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.ad.imageUrls.length - 1;
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.ad.imageUrls.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    },
    async toggleFavorite() {
      if (this.isFavorite) {
        try {
          await removeFavoriteProperty(this.ad.id);
          console.log("Propriété supprimée des favoris");
          this.isFavorite = false;
        } catch (error) {
          console.error("Erreur lors de la suppression des favoris:", error);
        }
      } else {
        try {
          await addFavoriteProperty(this.ad.id);
          console.log("Propriété ajoutée aux favoris");
          this.isFavorite = true;
        } catch (error) {
          console.error("Erreur lors de l'ajout aux favoris:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.ad-card {
  width: 278px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #ddd;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: #fff;
}

.ad-image {
  position: relative;
  width: 278px;
  height: 250px;
}

.ad-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ad-favorite {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 10;
}

.ad-favorite img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ad-content {
  padding: 15px;
}

.ad-content h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.ad-content p {
  margin: 5px 0;
  color: #555;
}

.ad-rating {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

.ad-price {
  margin-top: 10px;
  font-weight: bold;
}

.ad-price .old-price {
  text-decoration: line-through;
  color: #999;
}

.ad-price .total-price {
  font-size: 12px;
  color: #999;
}
</style>
