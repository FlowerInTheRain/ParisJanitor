<template>
  <div id="background-homeview">
    <HeaderView @showLoginPopup="showLoginPopup"/>
    <NavContent class="nav-item"/>
    <AnnonceView />
  </div>

  <LoginView v-if="showLogin"
             @close-popup="closeLoginPopup"
             @userCreateAccountEvent="handleUserCreateAccountEvent"
             @userConnectedEvent="handleUserConnectedEvent">
  </LoginView>

  <div v-if="showNotification" class="notification">{{ notificationMessage }}</div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import NavContent from "@/views/home/content/NavContent.vue";
import AnnonceView from "@/views/home/content/AnnonceView.vue"; // Remplace CardView par AnnonceView
import LoginView from "@/views/user/LoginView.vue";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      showLogin: false,
      showNotification: false,
      notificationMessage: ''
    };
  },
  components: {
    HeaderView,
    NavContent,
    AnnonceView, // Importe et utilise AnnonceView
    LoginView,
  },
  computed: mapState(['isAuthenticated']),
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
      this.closeLoginPopup();
      this.notificationMessage = "Vous êtes bien connecté";
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 2500);
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

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #dff0d8;
  color: green;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid green;
  z-index: 10000;
  animation: fadeOut 2.5s forwards;
}

.nav-item {
  margin-top: 5px;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
