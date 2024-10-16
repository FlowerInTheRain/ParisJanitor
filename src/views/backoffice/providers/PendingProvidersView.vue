<template>
  <div className="pending-providers-view">
    <h1>Prestataires en attente</h1>
    <div className="provider-list">
      <PendingProviderCard
          v-for="provider in pendingProviders"
          :key="provider.id"
          :provider="provider"
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
  async created() {
    try {
      const response = await getPendingProviders;
      this.pendingProviders = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des prestataires en attente", error);
    }
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
