<template>
  <div id="background-homeview">
    <div id="body-content">
    </div>

    <LoginComponents v-if="showLogin"
                     @close-popup="closeLoginPopup"
                     @userCreateAccountEvent="handleUserCreateAccountEvent"
                     @userConnectedEvent="handleUserConnectedEvent"
    ></LoginComponents>
  </div>
</template>

<script>
  import LoginComponents from "@/views/login/LoginComponents";

  export default {
    data() {
      return {
        selectedOption: 'Paris Janitor',
        showLogin: false,
        isAuthenticated: !!localStorage.getItem('token'),
      };
    },
    components: {
      LoginComponents,
      },
    methods: {
      showLoginPopup() {
        this.showLogin = true;
      },
      closeLoginPopup() {
        this.showLogin = false;
      },
      handleLogin() {
        this.showLogin = true;
      },
      handleLogout() {
        this.showLogin = false; 
      },
      handleUserConnectedEvent() {
        this.showLogin = false;
      },
      handleUserCreateAccountEvent() {
        alert("Nous avons envoyer lien de vérification sur votre adresse mail")
      }
    },
    created() {
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  };
</script>



<style scoped>

  #background-homeview {
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  #background-homeview::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6); 
  }

</style>