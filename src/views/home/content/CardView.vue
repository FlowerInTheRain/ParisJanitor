<template>
  <div class="ad-card">
    <div class="ad-badge">Coup de cœur voyageurs</div>
    <div class="ad-favorite">
      <i class="fa fa-heart-o"></i>
    </div>
    <div class="ad-image">
      <img :src="ad.imageUrls[0]" alt="Image de la propriété" />
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
  width: 278px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #ddd;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: #fff;
}

.ad-image img {
  width: 278px;
  height: 250px;
  object-fit: cover;
}

.ad-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  color: black;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ad-favorite {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #ff5a5f;
  cursor: pointer;
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
