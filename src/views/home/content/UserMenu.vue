<template>
  <div class="user-menu">
    <button @click="toggleMenu" class="menu-button">
      <font-awesome-icon :icon="['fas', 'bars']" class="menu-icon" />
    </button>
    <div v-if="isMenuOpen" class="menu-dropdown">
      <ul>
        <li><a href="#">Messages</a></li>
        <li><a href="#">Voyages</a></li>
        <li><a href="#">Favoris</a></li>
        <li><a href="#">Mettre mon logement sur Paris Janitor</a></li>
        <li><a href="#">Compte</a></li>
        <li><a href="#">Cartes cadeaux</a></li>
        <li><a href="#">Centre d'aide</a></li>
        <li><a href="#">Déconnexion</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
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
  border-radius: 50%;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.menu-icon {
  width: 20px;
  height: 20px;
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
