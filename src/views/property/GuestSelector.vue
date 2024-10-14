<template>
  <div class="guest-selector">
    <div @click="toggleGuestDropdown" class="guest-button">
      {{ totalGuests }} Voyageur(s)
    </div>
    <div v-if="showGuestDropdown" class="guest-dropdown">
      <div class="guest-option">
        <span>Adultes (13 ans et plus)</span>
        <button @click="decreaseGuests('adults')" class="decrement">-</button>
        <span>{{ guests.adults }}</span>
        <button @click="increaseGuests('adults')" class="increment" :disabled="!canAddGuest">+</button>
      </div>
      <div class="guest-option">
        <span>Enfants (2 à 12 ans)</span>
        <button @click="decreaseGuests('children')" class="decrement">-</button>
        <span>{{ guests.children }}</span>
        <button @click="increaseGuests('children')" class="increment" :disabled="!canAddGuest">+</button>
      </div>
      <div class="guest-option" v-if="acceptsBabies">
        <span>Bébés (- de 2 ans)</span>
        <button @click="decreaseGuests('babies')" class="decrement">-</button>
        <span>{{ guests.babies }}</span>
        <button @click="increaseGuests('babies')" class="increment" :disabled="!canAddGuest">+</button>
      </div>
      <div class="guest-option" v-if="acceptsPets">
        <span>Animaux de compagnie</span>
        <button @click="decreaseGuests('pets')" class="decrement">-</button>
        <span>{{ guests.pets }}</span>
        <button @click="increaseGuests('pets')" class="increment">+</button>
      </div>
      <button @click="toggleGuestDropdown" class="close-dropdown">Fermer</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    capacity: {
      type: Number,
      required: true,
    },
    acceptsPets: {
      type: Boolean,
      required: true,
    },
    acceptsBabies: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showGuestDropdown: false,
      guests: {
        adults: 1,
        children: 0,
        babies: 0,
        pets: 0,
      },
    };
  },
  computed: {
    totalGuests() {
      return this.guests.adults + this.guests.children + this.guests.babies;
    },
    canAddGuest() {
      return this.totalGuests < this.capacity;
    }
  },
  methods: {
    toggleGuestDropdown() {
      this.showGuestDropdown = !this.showGuestDropdown;
    },
    increaseGuests(type) {
      if (type === 'pets') {
        this.guests.pets++;
      } else if (this.canAddGuest) {
        this.guests[type]++;
      }
    },
    decreaseGuests(type) {
      if (this.guests[type] > 0) {
        this.guests[type]--;
      }
    },
  }
};
</script>

<style scoped>
.guest-selector {
  position: relative;
  width: 100%;
}

.guest-button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  background-color: #fff;
}

.guest-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  margin-top: 3px;
  z-index: 10;
}

.guest-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 3px;
}

.guest-option span {
  flex: 1;
  margin: 0;
  font-size: 14px;
  text-align: center;
  width: 18px;
}

.guest-option button {
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background-color: #f1f1f1;
  cursor: pointer;
  padding: 0;
}

.guest-option button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.close-dropdown {
  width: 100%;
  padding: 10px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
}

.close-dropdown:hover {
  background-color: #e04e50;
}
</style>
