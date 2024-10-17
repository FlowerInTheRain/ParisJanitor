<template>
  <div class="navbar">
    <div class="navbar-item">
      <span class="label">Destination</span>
      <input type="text" placeholder="Rechercher une destination" class="input-field">
    </div>
    <div class="separator"></div>

    <div class="navbar-date-item">
      <span class="label">Arrivée</span>
      <input
          type="date"
          v-model="startDate"
          :min="today"
          @change="validateDates"
          placeholder="Quand ?"
          class="input-field"
      />
    </div>
    <div class="separator"></div>

    <div class="navbar-date-item">
      <span class="label">Départ</span>
      <input
          type="date"
          v-model="endDate"
          :min="startDate"
          @change="validateDates"
          placeholder="Quand ?"
          class="input-field"
      />
    </div>
    <div class="separator"></div>

    <div class="navbar-item">
      <span class="label">Voyageurs</span>
      <input type="number" placeholder="Ajouter des voyageurs" class="input-field">
    </div>

    <button class="search-button" @click="searchProperties">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon" alt="Rechercher" />
    </button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { searchPropertiesBetweenDates } from '@/services/parisjanitor/endpoints/properties';

export default {
  name: "NavbarComponent",
  data() {
    return {
      startDate: '',
      endDate: '',
      today: new Date().toISOString().split('T')[0],
      errorMessage: '',
    };
  },
  methods: {
    validateDates() {
      this.errorMessage = '';

      if (this.startDate < this.today) {
        this.errorMessage = "La date d'arrivée ne peut pas être dans le passé.";
      }
      else if (this.endDate <= this.startDate) {
        this.errorMessage = "La date de départ doit être après la date d'arrivée.";
      }
    },

    async searchProperties() {
      if (!this.startDate || !this.endDate) {
        this.errorMessage = "Veuillez sélectionner une date d'arrivée et une date de départ.";
        return;
      }

      this.validateDates();

      if (this.errorMessage) {
        return;
      }

      try {
        const response = await searchPropertiesBetweenDates(this.startDate, this.endDate);
        this.$emit('properties-found', response);
      } catch (error) {
        console.error("Erreur lors de la recherche de propriétés :", error);
        this.errorMessage = "Erreur lors de la récupération des propriétés.";
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px;
  width: 75%;
  background-color: #f2f2f2;
  border-radius: 50px;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-item {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}

.navbar-date-item {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.label {
  font-weight: bold;
  font-size: 12px;
  color: #212121;
  margin-bottom: 5px;
}

.input-field {
  border: none;
  outline: none;
  font-size: 14px;
  color: #757575;
  background-color: transparent;
  padding: 5px;
}

.input-field::placeholder {
  color: #757575;
}

.separator {
  width: 1px;
  height: 30px;
  background-color: #e0e0e0;
  margin-right: 15px;
}

.search-button {
  background-color: #ff5a5f;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  width: 16px;
  height: 16px;
  color: white;
}
</style>
