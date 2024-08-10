<template>
  <div class="header">
    <img src="path-to-your-logo" alt="Paris Janitor" class="logo">
    <nav class="navigation">
      <ul>
        <li><a href="#">Logements</a></li>
        <li><a href="#">Expériences</a></li>
        <li><a href="#">Mettre mon logement sur Paris Janitor</a></li>
      </ul>
    </nav>
    <div class="user-profile">
      <!-- Insérez ici les éléments de profil utilisateur -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
}
.logo {
  height: 40px;
}
.navigation ul {
  list-style: none;
  display: flex;
  gap: 15px;
}
.user-profile {
  /* Styles pour l'avatar de l'utilisateur ou les options de connexion */
}
</style>
