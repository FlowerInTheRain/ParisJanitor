<template>
  <div class="user-menu">
    <button @click="toggleMenu" class="menu-button">
      <font-awesome-icon :icon="['fas', 'bars']" class="menu-icon" />
      <font-awesome-icon :icon="['far', 'user']" class="user-icon" />
    </button>
    <div v-if="isMenuOpen" class="menu-dropdown">
      <ul v-if="isAuthenticated">
        <li><a href="#">Messages</a></li>
        <li><router-link to="/mes-reservations">Voyages</router-link></li>
        <li><router-link to="/mes-favoris">Favoris</router-link></li>
        <li><a href="#">Mettre mon logement en location</a></li>
        <li><router-link to="/mon-compte">Mon compte</router-link></li>
        <li><a href="#">Centre d'aide</a></li>
        <li><a @click="handleLogout">Déconnexion</a></li>
      </ul>
      <ul v-else>
        <li><a @click="handleLogin">Connexion</a></li>
        <li><a @click="handleLogin">Inscription</a></li>
        <li><a href="#">Mettre mon logement en location</a></li>
        <li><a href="#">Centre d'aide</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(['isAuthenticated'])
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleLogout() {
      this.$store.dispatch('logout');
      this.$emit('logout');
    },
    handleLogin() {
      this.$emit('login');
    }
  }
};
</script>

<style scoped>
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 30%;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 10px;
}

.menu-icon, .user-icon {
  font-size: 20px;
  color: #333;
  padding: 5px;
}

.menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  margin-top: 10px;
  z-index: 1000;
}

.menu-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 10px 0;
}

.menu-dropdown ul li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.menu-dropdown ul li:last-child {
  border-bottom: none;
}

.menu-dropdown ul li a {
  text-decoration: none;
  color: #333;
  display: block;
  font-weight: 500;
}

.menu-dropdown ul li a:hover {
  background-color: #f7f7f7;
}
</style>
