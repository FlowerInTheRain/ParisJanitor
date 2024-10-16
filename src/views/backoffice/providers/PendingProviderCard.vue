<template>
  <div class="provider-card">
    <h3>{{ provider.fullName }}</h3>
    <p><strong>Ville :</strong> {{ provider.city }}</p>
    <p><strong>Email :</strong> {{ provider.email }}</p>
    <p><strong>Téléphone :</strong> {{ provider.phoneNumber }}</p>
    <p><strong>Activité :</strong> {{ provider.activity }}</p>
    <p><strong>Date d'inscription :</strong> {{ formatDate(provider.joinDate) }}</p>

    <div class="action-buttons">
      <button @click="acceptProvider" class="accept-btn">Accepter</button>
      <button @click="refuseProvider" class="refuse-btn">Refuser</button>
    </div>
  </div>
</template>

<script>
import { approveProvider, refuseProvider } from "@/services/parisjanitor/endpoints/providers";

export default {
  name: "PendingProviderCard",
  props: {
    provider: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    async acceptProvider() {
      try {
        await approveProvider(this.provider.id);
        this.$emit("provider-updated");
      } catch (error) {
        console.error("Erreur lors de l'approbation du prestataire :", error);
      }
    },
    async refuseProvider() {
      try {
        await refuseProvider(this.provider.id);
        this.$emit("provider-updated");
      } catch (error) {
        console.error("Erreur lors du refus du prestataire :", error);
      }
    }
  }
};
</script>

<style scoped>
.provider-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.provider-card h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.provider-card p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.accept-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.refuse-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.accept-btn:hover {
  background-color: #45a049;
}

.refuse-btn:hover {
  background-color: #e53935;
}
</style>
