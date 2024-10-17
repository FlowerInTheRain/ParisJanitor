<template>
  <div class="ad-card" @click="goToDetailPage">
    <div class="ad-favorite" @click.stop="toggleFavorite">
      <img :src="isFavorite ? fullHeartImg : emptyHeartImg" alt="Favorite Icon" />
    </div>
    <div class="ad-image" @mouseover="showArrows = true" @mouseleave="showArrows = false">
      <img :src="imageSource" alt="Image de la propriété" />
      <div v-if="showArrows" class="arrow left" @click.stop="prevImage">‹</div>
      <div v-if="showArrows" class="arrow right" @click.stop="nextImage">›</div>
    </div>
    <div class="ad-content">
      <h3 v-if="ad.propertyType === 'APARTMENT'">Appartement • {{ ad.city }} <span class="ad-rating">⭐ {{ ad.rating }} ({{ ad.reviews }})</span></h3>
      <h3 v-else>Maison • {{ ad.city }} <span class="ad-rating">⭐ {{ ad.rating }} ({{ ad.reviews }})</span></h3>
      <p v-if="ad.accommodationType === 'COMPLETE'"> Logement complet • {{ ad.capacity }} lits</p>
      <p v-else>Chambre • {{ ad.capacity }} lits</p>
      <p>Hôte : {{ ad.host }}</p>
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
  computed: {
    imageSource() {
      if (this.ad.imageUrls && this.ad.imageUrls.length > 0) {
        return this.ad.imageUrls[this.currentImageIndex];
      } else {
        return "https://via.placeholder.com/250";
      }
    },
  },
  methods: {
    goToDetailPage() {
      this.$router.push({ name: 'property-detail', params: { id: this.ad.id } });
    },
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
          this.isFavorite = false;
        } catch (error) {
          console.error("Erreur lors de la suppression des favoris:", error);
        }
      } else {
        try {
          await addFavoriteProperty(this.ad.id);
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
  width: 250px;
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
  width: 250px;
  height: 250px;
  overflow: hidden;
}

.ad-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  height: 40px;
  color: white;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}

.arrow:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.ad-favorite {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
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
  font-size: 0.8rem;
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
  font-size: 10px;
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
