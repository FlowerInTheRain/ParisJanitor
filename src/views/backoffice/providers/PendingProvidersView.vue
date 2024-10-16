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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
