<template>
  <div class="pending-certificates-view">
    <h1>Certificats en attente</h1>
    <div class="certificates-list">
      <div
          v-for="certificate in certificates"
          :key="certificate.referencedPrestationId"
          class="certificate-card"
      >
        <div class="certificate-info">
          <h3>{{ certificate.serviceName }}</h3>
          <a
              :href="certificate.certificateUrl"
              class="download-icon"
              download
          >
            <font-awesome-icon :icon="['fas', 'download']" />
          </a>
        </div>
        <div class="certificate-actions">
          <button @click="acceptCertificate(certificate.referencedPrestationId)" class="accept-button">
            Accepter
          </button>
          <button @click="refuseCertificate(certificate.referencedPrestationId)" class="refuse-button">
            Refuser
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPendingCertificates, approveCertificate, refuseCertificate } from "@/services/parisjanitor/endpoints/providers";

export default {
  name: "PendingCertificatesView",
  data() {
    return {
      certificates: [],
    };
  },
  async created() {
    try {
      const response = await getPendingCertificates();
      this.certificates = response;
    } catch (error) {
      console.error("Erreur lors de la récupération des certificats en attente", error);
    }
  },
  methods: {
    async acceptCertificate(id) {
      try {
        await approveCertificate(id);
        alert("Certificat accepté avec succès !");
        // Rafraîchir la liste après l'action
        this.certificates = await getPendingCertificates();
      } catch (error) {
        console.error("Erreur lors de l'acceptation du certificat :", error);
        alert("Erreur lors de l'acceptation du certificat.");
      }
    },
    async refuseCertificate(id) {
      try {
        await refuseCertificate(id);
        alert("Certificat refusé avec succès !");
        this.certificates = await getPendingCertificates();
      } catch (error) {
        console.error("Erreur lors du refus du certificat :", error);
        alert("Erreur lors du refus du certificat.");
      }
    },
  },
};
</script>

<style scoped>
.pending-certificates-view {
  padding: 20px;
}

.certificates-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.certificate-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  width: 200px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.certificate-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.certificate-info h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
  flex: 1;
}

.certificate-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.download-icon {
  font-size: 18px;
  color: #007bff;
  cursor: pointer;
}

.accept-button,
.refuse-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}

.refuse-button {
  background-color: #dc3545;
}

.accept-button:hover,
.refuse-button:hover,
.download-icon:hover {
  opacity: 0.9;
}
</style>
