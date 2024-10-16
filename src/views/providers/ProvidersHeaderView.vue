<template>
  <div class="header">
    <router-link to="/" class="logo-link">
      <img src="@/assets/home/main-logo.png" alt="Paris Janitor" class="logo">
    </router-link>
    <nav class="navigation">
      <ul>
        <li><a href="#">Mon catalogue</a></li>
        <li><a href="#">Prestations</a></li>
        <li><router-link to="/">Espace Locataires</router-link></li>

      </ul>
    </nav>
    <div class="user-profile">
      <ProvidersMenu @login="emitShowLoginPopup" />
    </div>
  </div>
</template>

<script>
import ProvidersMenu from "@/views/providers/ProvidersMenu.vue";
export default {
  name: "HeaderComponent",
  components: {
    ProvidersMenu,
  },
  methods: {
    emitShowLoginPopup() {
      this.$emit('showLoginPopup');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  background-color: #f8f9fa;
  width: 100%;
  padding-top: 20px;
}

.logo {
  height: 40px;
  margin-left: 10px;
}

.navigation ul {
  list-style: none;
  display: flex;
  gap: 15px;
}

.navigation ul li a {
  text-decoration: none;
  color: #000;
  font-weight: 500;
}

.navigation ul li a:hover {
  color: #ff5a5f;
}

.user-profile {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
