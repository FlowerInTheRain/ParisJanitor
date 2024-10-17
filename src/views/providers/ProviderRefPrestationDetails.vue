<template>
  <div>
    <div v-if="notificationMessage" :class="['notification', notificationType]">
      {{ notificationMessage }}
    </div>
    <div id="background-homeview">
      <ProvidersHeaderView @showLoginPopup="showLoginPopup"/>
      <div v-if="refPrestationDetails" class="form-container">
        <form @submit.prevent="submitForm" class="">
          Tous les prix sont exprimés en centimes
          <!-- Service Name -->
          <div class="form-group">
            <label for="serviceName">Service proposé :</label>
            <input class="log-input" v-model="form.serviceName" type="text" id="serviceName"/>
          </div>
          <!-- Service Description -->
          <div class="form-group">
            <label for="serviceDescription">Description détaillée :</label>
            <textarea class="log-input" v-model="form.serviceDescription" id="serviceDescription"></textarea>
          </div>
          <!-- Approval Status -->
          <div class="form-group">
            <label for="approvalStatus">Statut :</label>
            <span>{{ form.approvalStatus }}</span>
          </div>


          <!-- Habilitation -->
          <div class="form-group">
            <label for="habilitation">Habilitation nécessaire:</label>
            <input class="log-input" v-model="form.habilitation" type="checkbox" id="habilitation"/>
          </div>

          <!-- Certificate URL -->
          <div v-if="form.certificateUrl !== 'string'" class="form-group">
            <label for="certificateUrl">Fichier d'habilitation:</label>
            <span><a v-bind:href="form.certificateUrl">Télécharger</a></span>
          </div>

          <!-- Habilitation Name -->
          <div class="form-group" v-if="form.habilitation">
            <label for="habilitationName">Nom de l'habilitation:</label>
            <input class="log-input" v-model="form.habilitationName" type="text" id="habilitationName"/>
          </div>

          <!-- Price -->
          <div class="form-group">
            <label for="price">Prix de base :</label>
            <input class="log-input" v-model="form.price" type="number" id="price"/>
          </div>

          <!-- Price Type -->
          <div class="form-group">
            <label for="priceType">Type de prix:</label>
            <select v-model="form.priceType" id="priceType">
              <option value="FIXED">Fixed</option>
              <option value="VARIABLE">Variable</option>
              <option value="DYNAMIC">Variable</option>
            </select>
          </div>

          <!-- Price Increment -->
          <div v-if="form.priceType === 'VARIABLE'" class="form-group">
            <label for="priceIncrement">Prix complémentaire :</label>
            <input class="log-input" v-model="form.priceIncrement" type="number" id="priceIncrement"/>
          </div>

          <!-- Price Increment Unit -->
          <div v-if="form.priceType === 'VARIABLE'" class="form-group">
            <label for="priceIncrementUnit">Unité :</label>
            <input class="log-input" v-model="form.priceIncrementUnit" type="text" id="priceIncrementUnit"
                   v-tooltip="{ content: 'Unités acceptées : km|jour|unité|heure|m²|cm²', placement: 'top' }"/>
          </div>
          <button type="submit" class="log-input">Submit</button>
        </form>
      </div>
      <button @click="openModal">Ajouter / modifier certification</button>
      <div class="popup-overlay" v-if="isModalVisible">
        <div id="login-popup">
          <b-modal id="modal-1" title="BootstrapVue">
            <div class="file-upload-container">
              <h2>Ajouter ou remplacer un certificat</h2>

              <form @submit.prevent="submitFileForm" class="file-upload-form">
                <div class="form-group">
                  <label for="file">Choisissez un fichier (PNG, JPG, JPEG, PDF):</label>
                  <input type="file" id="file" @change="handleFileChange"/>
                  <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
                </div>

                <div class="form-group">
                  <button type="submit" class="submit-button" :disabled="!isValid">Envoyer</button>
                </div>
              </form>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import {findRefPrestationDetails, updateRefPrestationDetails,addOrUpdateCertificateForRefPrestation} from "@/services/parisjanitor/endpoints/users";
import ProvidersHeaderView from "@/views/providers/ProvidersHeaderView.vue";

export default {
  data() {
    return {
      notificationMessage: null,
      notificationType: null,
      isModalVisible: false,
      selectedFile: null,
      errorMessage: '',
      isValid: false,
      refPrestationDetails: null,
      refPrestId: this.$route.params.refPrestId,
      isAuthenticated: this.$store.state.isAuthenticated,
      providerId: this.$store.state.provider.id,
      form: {
        approvalStatus: '',
        certificateUrl: '',
        habilitation: false,
        habilitationName: '',
        id: null, // This is likely an immutable value, so you may not need an input for it
        price: 0,
        priceIncrement: null,
        priceIncrementUnit: null,
        priceType: 'FIXED',
        priceVariation: null, // not used in form based on data
        refusalReason: null,  // not used in form based on data
        reported: false,
        serviceDescription: 'Un beau bouquet à offrir',
        serviceName: 'Bouquet de roses',
      },
    };
  },
  components: {
    ProvidersHeaderView,
  },
  async mounted() {
    // Access the query parameters
    const res = await findRefPrestationDetails(this.refPrestId);
    this.mapDataToForm(res.data)
    this.refPrestationDetails = res.data
  }, methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
          this.errorMessage = 'Veuillez sélectionner un fichier PNG, JPG, JPEG ou PDF.';
          this.isValid = false;
        } else {
          this.errorMessage = '';
          this.selectedFile = file;
          this.isValid = true;
        }
      }
    },
    async submitFileForm() {
      if (this.isValid && this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        const res = await addOrUpdateCertificateForRefPrestation(this.refPrestId, formData);
        this.form.certificateUrl = res.data;
        // Remplacer par l'URL de votre API d'envoi de fichiers
        this.showNotification("Certificat ajouté / remplacé", "success");
        this.closeModal();
      }
    },
    async submitForm() {
      await
          updateRefPrestationDetails(
              this.form
          );
      // Here, you'd usually send the form data to the backend, e.g., using an API call
    },
    mapDataToForm(backendData) {
      this.form.approvalStatus = backendData.approvalStatus || 'PENDING';
      this.form.certificateUrl = backendData.certificateUrl || '';
      this.form.habilitation = backendData.habilitation || false;
      this.form.habilitationName = backendData.habilitationName || '';
      this.form.id = backendData.id || null;
      this.form.price = backendData.price || null;
      this.form.priceIncrement = backendData.priceIncrement || null;
      this.form.priceIncrementUnit = backendData.priceIncrementUnit || null;
      this.form.priceType = backendData.priceType || 'FIXED';
      this.form.priceVariation = backendData.priceVariation || null;
      this.form.refusalReason = backendData.refusalReason || null;
      this.form.reported = backendData.reported || false;
      this.form.serviceDescription = backendData.serviceDescription || '';
      this.form.serviceName = backendData.serviceName || '';
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },showNotification(message, type) {
      this.notificationMessage = message;
      this.notificationType = type;
      setTimeout(() => {
        this.notificationMessage = null;
        this.notificationType = null;
      }, 2500);
    }
  }
};
</script>

<style>

#background-homeview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh; /* Full-screen height */
}

.log-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.notification {
  position: absolute;
  top: 200px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  z-index: 1000;
}
/* Form styling */
.service-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px; /* Fixed width */
  display: flex;
  flex-direction: column;
  gap: 15px; /* Space between form elements */
}

/* Form group styling */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #007bff;
}


.file-upload-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.error-message {
  color: red;
  font-size: 14px;
}

.submit-button {
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.popup-overlay {
  position: fixed;
  top: 150px;
  left: 0;
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
}

#login-popup {
  background-color: #fff;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  height: 300px;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  z-index: 9999;
  overflow-y: auto;
}
</style>