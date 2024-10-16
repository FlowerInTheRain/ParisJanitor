<template>
  <div class="pending-providers-view">
    <h1>Prestataires en attente</h1>
    <div class="provider-list">
      <PendingProviderCard
          v-for="provider in pendingProviders"
          :key="provider.id"
          :provider="provider"
          @provider-updated="fetchPendingProviders"
      />
    </div>
  </div>
</template>

<script>
import { getPendingProviders } from "@/services/parisjanitor/endpoints/providers";
import PendingProviderCard from "@/views/backoffice/providers/PendingProviderCard.vue";

export default {
  name: "PendingProvidersView",
  components: {
    PendingProviderCard,
  },
  data() {
    return {
      pendingProviders: [],
    };
  },
  methods: {
    async fetchPendingProviders() {
      try {
        const response = await getPendingProviders();
        this.pendingProviders = response;
      } catch (error) {
        console.error("Erreur lors de la récupération des prestataires en attente", error);
      }
    }
  },
  async created() {
    this.fetchPendingProviders();
  },
};
</script>

<style scoped>
.pending-providers-view {
  padding: 20px;
}

.provider-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.provider-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
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
</style>
