<template>
  <div id="background-homeview">
    <HeaderView @showLoginPopup="showLoginPopup"/>
    <NavContent class="nav-item"/>
    <CardView />
  </div>

  <LoginView v-if="showLogin"
             @close-popup="closeLoginPopup"
             @userCreateAccountEvent="handleUserCreateAccountEvent"
             @userConnectedEvent="handleUserConnectedEvent"
  ></LoginView>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import NavContent from "@/views/home/content/NavContent.vue";
import CardView from "@/views/home/content/CardView.vue";
import LoginView from "@/views/user/LoginView.vue";

export default {
  data() {
    return {
      showLogin: false,
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  components: {
    HeaderView,
    NavContent,
    CardView,
    LoginView,
  },
  methods: {
    showLoginPopup() {
      this.showLogin = true;
    },
    closeLoginPopup() {
      this.showLogin = false;
    },
    handleUserCreateAccountEvent() {
      alert("Nous avons envoyé un lien de vérification sur votre adresse mail");
    },
    handleUserConnectedEvent() {
      this.showLogin = false;
      this.isAuthenticated = true;
    }
  }
};
</script>

<style scoped>
  #background-homeview {
     display: flex;
     flex-direction: column;
     align-items: center;
  }

  .nav-item{
    margin-top: 5px;
  }
</style>
