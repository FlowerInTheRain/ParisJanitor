<template>
  <div class="admin-user-view">
    <h1>Gestion des utilisateurs</h1>

    <!-- Barre de recherche -->
    <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un utilisateur"
        class="search-bar"
    />

    <!-- Tableau des utilisateurs -->
    <table class="user-table">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
        <th>Téléphone</th>
        <th>Rôle</th>
        <th>Utilisateur</th>
        <th>Admin</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="user in filteredUsers"
          :key="user.id"
      >
        <td>{{ user.lastName }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phoneNumber || 'Non renseigné' }}</td>
        <td>{{ user.role }}</td>
        <td><input type="checkbox" :checked="user.role === 'USER'" disabled /></td>
        <td><input type="checkbox" :checked="user.role === 'ADMIN'" disabled /></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllUser } from '@/services/parisjanitor/endpoints/users'; // Assurez-vous que le chemin est correct

export default {
  name: 'AdminUserView',
  data() {
    return {
      users: [],
      searchQuery: '', // Requête de recherche
    };
  },
  computed: {
    filteredUsers() {
      // Filtrer les utilisateurs selon la barre de recherche
      return this.users.filter(user =>
          user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  async created() {
    try {
      this.users = await getAllUser(); // Récupération des utilisateurs
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  },
};
</script>

<style scoped>
.admin-user-view {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #f4f4f4;
}

.user-table tr:hover {
  background-color: #f1f1f1;
}
</style>
