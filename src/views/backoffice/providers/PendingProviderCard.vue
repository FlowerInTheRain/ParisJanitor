<template>
  <div class="provider-card">
    <h3>{{ provider.fullName }}</h3>
    <p><strong>Ville :</strong> {{ provider.city }}</p>
    <p><strong>Email :</strong> {{ provider.email }}</p>
    <p><strong>Téléphone :</strong> {{ provider.phoneNumber }}</p>
    <p><strong>Activité :</strong> {{ provider.activity }}</p>
    <p><strong>Date d'inscription :</strong> {{ formatDate(provider.joinDate) }}</p>
  </div>
</template>

<script>
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
</style>
