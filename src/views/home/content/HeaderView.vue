<template>
  <div class="header">
    <img src="@/assets/home/main-logo.png" alt="Paris Janitor" class="logo">
    <nav class="navigation">
      <ul>
        <li><a href="#">Logements</a></li>
        <li><a href="#">Expériences</a></li>
        <li><a href="#">Mettre mon logement sur Paris Janitor</a></li>
      </ul>
    </nav>
    <div class="user-profile">
      <UserMenu @login="showLoginPopup" />
    </div>
  </div>
</template>

<script>
import UserMenu from "@/views/home/content/UserMenu.vue";

export default {
  name: "HeaderComponent",
  components: {
    UserMenu,
  },
  methods: {
    showLoginPopup() {
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
