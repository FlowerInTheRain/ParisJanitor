<template>
  <HeaderView />
  <div id="create-property">
    <h1>Mettre mon logement en location</h1>

    <div v-if="isLoading" class="loading-popup">
      <p>Chargement en cours, veuillez patienter...</p>
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-container">
        <div class="form-left">
          <!-- Colonne gauche -->
          <div class="form-group">
            <label for="propertyName">Nom de la propriété</label>
            <input v-model="property.propertyName" type="text" id="propertyName" required />
          </div>

          <div class="form-group">
            <label for="adress">Adresse</label>
            <input v-model="property.adress" type="text" id="adress" required />
          </div>

          <div class="flex-group">
            <div class="form-group">
              <label for="country">Pays</label>
              <input v-model="property.country" type="text" id="country" required />
            </div>

            <div class="form-group">
              <label for="city">Ville</label>
              <input v-model="property.city" type="text" id="city" required />
            </div>
          </div>

          <div class="flex-group">
            <div class="form-group">
              <label for="numberOfRooms">Nombre de pièces</label>
              <input v-model="property.numberOfRooms" type="number" min="1" id="numberOfRooms" required />
            </div>

            <div class="form-group">
              <label for="size">Taille en m² (min. 5)</label>
              <input v-model="property.size" type="number" step="0.1" id="size" min="5" required />
            </div>
          </div>

          <div class="flex-group">
            <div class="form-group">
              <label for="conciergerieType">Type de conciergerie</label>
              <select v-model="property.conciergerieType" id="conciergerieType" required>
                <option value="GESTION_DE_A_A_Z">Gestion de A à Z</option>
                <option value="YELD_MANAGEMENT">Yeld Management</option>
                <option value="AUTRE">Autre</option>
              </select>
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
          </div>

          <div class="form-group">
            <label for="capacity">Capacité d'accueil</label>
            <input v-model="property.capacity" type="number" id="capacity" required />
          </div>

          <div class="form-group checkbox-group">
            <label for="privacyDeclaration">Déclaration de confidentialité</label>
            <input v-model="property.privacyDeclaration" type="checkbox" id="privacyDeclaration" required />
          </div>
        </div>

        <!-- Colonne droite -->
        <div class="form-right">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="property.description" id="description" required></textarea>
          </div>

          <div class="flex-group">
            <div class="form-group">
              <label for="propertyType">Type de propriété</label>
              <select v-model="property.propertyType" id="propertyType" required>
                <option value="APARTMENT">Appartement</option>
                <option value="HOUSE">Maison</option>
              </select>
            </div>

            <div class="form-group">
              <label for="accommodationType">Type d'hébergement</label>
              <select v-model="property.accommodationType" id="accommodationType" required>
                <option value="COMPLETE">Logement complet</option>
                <option value="ROOM">Chambre</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="pricePerNight">Prix par nuit (€)</label>
            <input v-model="property.pricePerNight" type="number" min="5" step="0.01" id="pricePerNight" required />
          </div>

          <div class="flex-group">
            <div class="form-group">
              <label for="numberOfBathrooms">Nombre de salles de bain</label>
              <input v-model="property.numberOfBathrooms" type="number" min="1" id="numberOfBathrooms" required />
            </div>

            <div class="form-group">
              <label for="numberOfBedrooms">Nombre de chambres</label>
              <input v-model="property.numberOfBedrooms" type="number" min="1" id="numberOfBedrooms" required />
            </div>
          </div>

          <div class="flex-group">
            <div class="form-group checkbox-group">
              <label for="acceptsPets">Accepter les animaux</label>
              <input v-model="property.acceptsPets" type="checkbox" min="0" id="acceptsPets" />
            </div>

            <div class="form-group checkbox-group">
              <label for="acceptsBabies">Accepter les bébés</label>
              <input v-model="property.acceptsBabies" type="checkbox" min="0" id="acceptsBabies" />
            </div>
          </div>

          <div class="form-group">
            <label for="imageUpload">Télécharger des images (PNG, JPEG, JPG) (min. 1)</label>
            <input
                type="file"
                id="imageUpload"
                @change="handleFileUpload"
                accept="image/png, image/jpeg, image/jpg"
                multiple
                required
            />
          </div>
        </div>
      </div>

      <button type="submit" class="submit-button">Créer la propriété</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import HeaderView from "@/views/home/content/HeaderView.vue";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { addProperty } from "@/services/parisjanitor/endpoints/properties";

export default {
  name: "NewProperty",
  components: {
    HeaderView,
    Multiselect,
  },
  data() {
    return {
      property: {
        adress: "",
        propertyName: "",
        description: "",
        numberOfRooms: 1,
        capacity: 1,
        propertyType: "APARTMENT",
        country: "",
        size: 5,
        contactSlots: [],
        privacyDeclaration: false,
        conciergerieType: "GESTION_DE_A_A_Z",
        accommodationType: "COMPLETE",
        pricePerNight: 0,
        city: "",
        numberOfBathrooms: 1,
        numberOfBedrooms: 1,
        acceptsPets: false,
        acceptsBabies: false,
      },
      files: [],
      isLoading: false, // Pour la pop-up de chargement
      availableContactSlots: [
        { name: "Avant 12h", value: "BEFORE_12H" },
        { name: "Entre 12h et 14h", value: "BETWEEN_12H_AND_14H" },
        { name: "Entre 14h et 18h", value: "BETWEEN_14H_AND_18H" },
        { name: "Après 18h", value: "AFTER_18H" },
      ],
    };
  },
  methods: {
    async submitForm() {
      // Validation
      if (this.property.size < 5) {
        alert("La taille doit être d'au moins 5 m².");
        return;
      }
      if (this.property.numberOfRooms < 0 || this.property.capacity < 0 || this.property.pricePerNight < 0) {
        alert("Les valeurs numériques ne peuvent pas être négatives.");
        return;
      }
      if (this.files.length < 1) {
        alert("Vous devez télécharger au moins une image.");
        return;
      }

      try {
        this.isLoading = true; // Activer la pop-up de chargement

        const propertyData = {
          adress: this.property.adress,
          propertyName: this.property.propertyName,
          description: this.property.description,
          numberOfRooms: Number(this.property.numberOfRooms),
          capacity: Number(this.property.capacity),
          propertyType: this.property.propertyType,
          country: this.property.country,
          city: this.property.city,
          size: Number(this.property.size),
          contactSlots: this.property.contactSlots.map(slot => slot.value),
          privacyDeclaration: this.property.privacyDeclaration,
          conciergerieType: this.property.conciergerieType,
          accommodationType: this.property.accommodationType,
          pricePerNight: Number(this.property.pricePerNight),
          numberOfBathrooms: Number(this.property.numberOfBathrooms),
          numberOfBedrooms: Number(this.property.numberOfBedrooms),
          acceptsPets: this.property.acceptsPets,
          acceptsBabies: this.property.acceptsBabies,
          imageUrls: []
        };

        const response = await addProperty(propertyData);
        const propertyId = response ? response.id : null;

        if (!propertyId) {
          throw new Error("L'ID de la propriété n'a pas été retourné par l'API.");
        }

        // Si des fichiers sont sélectionnés, attente de 3 secondes
        if (this.files.length > 0) {
          setTimeout(async () => {
            await this.uploadFiles(propertyId);
            this.isLoading = false; // Désactiver la pop-up après l'envoi
          }, 3000);
        } else {
          this.isLoading = false; // Désactiver la pop-up si pas d'images à envoyer
        }

        alert("Votre logement a été ajouté avec succès !");
        this.$router.push("/");
      } catch (error) {
        console.error("Erreur lors de la création de la propriété :", error.response ? error.response.data : error);
        this.isLoading = false; // Désactiver la pop-up en cas d'erreur
      }
    },

    async uploadFiles(propertyId) {
      const formData = new FormData();
      this.files.forEach(file => {
        formData.append("file", file);
      });

      try {
        const uploadUrl = `http://localhost:4000/parisjanitor-api/files/pictures/property/add/${propertyId}`;
        const uploadResponse = await axios.post(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log("Fichiers téléchargés avec succès :", uploadResponse.data);
      } catch (error) {
        console.error("Erreur lors du téléchargement des fichiers :", error.response ? error.response.data : error);
      }
    },

    handleFileUpload(event) {
      this.files = Array.from(event.target.files);
      console.log("Fichiers sélectionnés :", this.files);
    }
  },
};
</script>

<style scoped>
#create-property {
  padding: 40px;
}

.loading-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 9999;
}

.form-container {
  display: flex;
  justify-content: space-between;
}

.form-left,
.form-right {
  width: 48%;
}

.form-group {
  margin-bottom: 15px;
}

.flex-group {
  display: flex;
  justify-content: space-between;
}

.flex-group .form-group {
  width: 48%;
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

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group label {
  flex: 7;
}

.checkbox-group input {
  flex: 3;
}
</style>
