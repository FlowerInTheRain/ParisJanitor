<template>
  <div id="background-homeview">
    <HeaderView @showLoginPopup="showLoginPopup"/>
  </div>

  <Login v-if="showLogin"
             @close-popup="closeLoginPopup"
             @userCreateAccountEvent="handleUserCreateAccountEvent"
             @userConnectedEvent="handleUserConnectedEvent">
  </Login>

  <div v-if="showNotification" class="notification">{{ notificationMessage }}</div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import { mapState } from 'vuex';
import Login from "@/views/providers/LoginProviders.vue";
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
    Login,
  },
  computed: mapState(['isAuthenticated']),
  methods: {
    showLoginPopup() {
      this.showLogin = true;
    },
    closeLoginPopup() {
      this.showLogin = false;
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
