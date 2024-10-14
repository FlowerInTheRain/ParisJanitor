<template>
  <HeaderView />
  <div id="create-property">
    <h1>Mettre mon logement en location</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="adress">Adresse</label>
        <input v-model="property.adress" type="text" id="adress" required />
      </div>

      <div class="form-group">
        <label for="propertyName">Nom de la propriété</label>
        <input v-model="property.propertyName" type="text" id="propertyName" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="property.description" id="description" required></textarea>
      </div>

      <div class="form-group">
        <label for="numberOfRooms">Nombre de pièces</label>
        <input v-model="property.numberOfRooms" type="number" id="numberOfRooms" required />
      </div>

      <div class="form-group">
        <label for="capacity">Capacité d'accueil</label>
        <input v-model="property.capacity" type="number" id="capacity" required />
      </div>

      <div class="form-group">
        <label for="propertyType">Type de propriété</label>
        <select v-model="property.propertyType" id="propertyType" required>
          <option value="APARTMENT">Appartement</option>
          <option value="HOUSE">Maison</option>
        </select>
      </div>

      <div class="form-group">
        <label for="country">Pays</label>
        <input v-model="property.country" type="text" id="country" required />
      </div>

      <div class="form-group">
        <label for="size">Taille en m²</label>
        <input v-model="property.size" type="number" step="0.1" id="size" required />
      </div>

      <div class="form-group">
        <label for="contactSlots">Créneaux de contact</label>
        <multiselect
            v-model="property.contactSlots"
            :options="availableContactSlots"
            :multiple="true"
            placeholder="Sélectionnez les créneaux de contact"
            label="name"
            track-by="value"
        ></multiselect>
      </div>

      <div class="form-group">
        <label for="privacyDeclaration">Déclaration de confidentialité</label>
        <input v-model="property.privacyDeclaration" type="checkbox" id="privacyDeclaration" required />
      </div>

      <div class="form-group">
        <label for="conciergerieType">Type de conciergerie</label>
        <select v-model="property.conciergerieType" id="conciergerieType" required>
          <option value="GESTION_DE_A_A_Z">Gestion de A à Z</option>
          <option value="YELD_MANAGEMENT">Yeld Management</option>
          <option value="AUTRE">Autre</option>
        </select>
      </div>

      <div class="form-group">
        <label for="accommodationType">Type d'hébergement</label>
        <select v-model="property.accommodationType" id="accommodationType" required>
          <option value="COMPLETE">Logement complet</option>
          <option value="ROOM">Chambre</option>
        </select>
      </div>

      <div class="form-group">
        <label for="pricePerNight">Prix par nuit (€)</label>
        <input v-model="property.pricePerNight" type="number" step="0.01" id="pricePerNight" required />
      </div>

      <div class="form-group">
        <label for="city">Ville</label>
        <input v-model="property.city" type="text" id="city" required />
      </div>

      <div class="form-group">
        <label for="numberOfBathrooms">Nombre de salles de bain</label>
        <input v-model="property.numberOfBathrooms" type="number" id="numberOfBathrooms" required />
      </div>

      <div class="form-group">
        <label for="numberOfBedrooms">Nombre de chambres</label>
        <input v-model="property.numberOfBedrooms" type="number" id="numberOfBedrooms" required />
      </div>

      <div class="form-group">
        <label for="acceptsPets">Accepter les animaux</label>
        <input v-model="property.acceptsPets" type="checkbox" id="acceptsPets" />
      </div>

      <div class="form-group">
        <label for="acceptsBabies">Accepter les bébés</label>
        <input v-model="property.acceptsBabies" type="checkbox" id="acceptsBabies" />
      </div>

      <button type="submit" class="submit-button">Créer la propriété</button>
    </form>
  </div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import Multiselect from 'vue-multiselect';

export default {
  name :"NewProperty",
  components: {
    HeaderView,
    Multiselect
  },
  data() {
    return {
      property: {
        adress: '',
        propertyName: '',
        description: '',
        numberOfRooms: 1,
        capacity: 1,
        propertyType: 'APARTMENT',
        country: '',
        size: 0,
        contactSlots: [],
        privacyDeclaration: false,
        conciergerieType: 'GESTION_DE_A_A_Z',
        accommodationType: 'COMPLETE',
        pricePerNight: 0,
        city: '',
        numberOfBathrooms: 1,
        numberOfBedrooms: 1,
        acceptsPets: false,
        acceptsBabies: false,
      },
      availableContactSlots: [
        { name: 'Avant 12h', value: 'BEFORE_12H' },
        { name: 'Entre 12h et 14h', value: 'BETWEEN_12H_AND_14H' },
        { name: 'Entre 14h et 18h', value: 'BETWEEN_14H_AND_18H' },
        { name: 'Après 18h', value: 'AFTER_18H' },
      ]
    };
  },
  methods: {
    submitForm() {
      console.log("Propriété créée:", this.property);
      console.log("Propriété créée avec les créneaux de contact:", this.property.contactSlots);
      alert('Votre logement a été ajouté avec succès !');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
#create-property {
  padding: 40px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #ff5a5f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #e04e50;
}
</style>
