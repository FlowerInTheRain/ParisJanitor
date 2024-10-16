<template>
  <div class="admin-user-view">
    <h1>Gestion des utilisateurs</h1>

    <input
        v-model="searchQuery"
        @input="fetchUsers"
        type="text"
        placeholder="Rechercher un utilisateur"
        class="search-bar"
    />

    <table class="user-table" v-if="users.length > 0">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
        <th>Téléphone</th>
        <th>Rôle</th>
        <th>Utilisateur</th>
        <th>Admin</th>
        <th>Statut</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="user in users"
          :key="user.id"
      >
        <td>{{ user.lastName }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phoneNumber || 'Non renseigné' }}</td>
        <td>{{ user.role }}</td>
        <td><input type="checkbox" :checked="user.role === 'USER'" disabled /></td>
        <td><input type="checkbox" :checked="user.role === 'ADMIN'" disabled /></td>
        <!-- Ajout de classes conditionnelles pour le statut -->
        <td :class="user.statut === 'ACTIVE' ? 'status-active' : 'status-inactive'">
          <em>{{ user.statut || 'Non renseigné' }}</em>
        </td>
      </tr>
      </tbody>
    </table>

    <p v-if="users.length === 0 && searchQuery !== ''">Aucun utilisateur trouvé.</p>
  </div>
</template>

<script>
import { getAllUser, searchUsers } from '@/services/parisjanitor/endpoints/users';

export default {
  name: 'AdminUserView',
  data() {
    return {
      users: [],
      searchQuery: '',
    };
  },
  methods: {
    async fetchUsers() {
      try {
        if (this.searchQuery === '') {
          const response = await getAllUser();
          console.log("response");
          console.log(response);
          this.users = response;
        } else {
          const response = await searchUsers(this.searchQuery);
          this.users = response;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        this.users = [];
      }
    },
  },
  async mounted() {
    await this.fetchUsers();
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
