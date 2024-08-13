<template>
  <div class="popup-overlay">
    <div id="login-popup">
      <button @click="closePopup" class="close-button"> X </button>
      <h2 class="popup-title">{{ popupTitle }}</h2>
      <div class="separator-line"></div>

      <form @submit.prevent="handleSignIn">
        <div v-if="!showSignUp">
          <input class="log-input" type="email" v-model="email" placeholder="Adresse e-mail" required>
        </div>

        <div v-if="showSignUp">
          <!-- Champs d'inscription -->
          <input class="log-input" type="text" v-model="firstName" placeholder="Prénom sur la pièce d'identité" required>
          <input class="log-input" type="text" v-model="lastName" placeholder="Nom sur la pièce d'identité" required>
          <input class="log-input" type="date" v-model="birthDate" placeholder="Date de naissance" required>
          <input class="log-input" type="email" v-model="email" placeholder="E-mail" required>
          <input class="log-input" type="password" v-model="password" placeholder="Mot de passe" required>
        </div>

        <p class="info-text" v-if="!showSignUp">
          Nous vous appellerons ou vous enverrons un SMS pour confirmer votre numéro.
          Les frais standards d'envoi de messages et d'échange de données s'appliquent.
          <a href="#" class="privacy-policy-link">Politique de confidentialité</a>
        </p>

        <button class="log-button" type="submit">
          {{ showSignUp ? 'Accepter et continuer' : 'Continuer' }}
        </button>

        <p v-if="!showSignUp" class="forgot-password">Mot de passe oublié ?</p>
      </form>
    </div>
  </div>
</template>

<script>
import { getUserByEmail } from "@/services/parisjanitor/endpoints/users";

export default {
  data() {
    return {
      email: '',
      showSignUp: false,
      popupTitle: 'Connexion ou inscription',
      firstName: '',
      lastName: '',
      birthDate: '',
      password: ''
    };
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
    async handleSignIn() {
      try {
        const user = await getUserByEmail(this.email);
        if (user) {
          this.popupTitle = 'Connexion';
          this.showSignUp = false;
        }
      } catch (error) {
        this.popupTitle = 'Terminer mon inscription';
        this.showSignUp = true;
      }
    }
  }
};
</script>

<style scoped>
/* Votre CSS existant */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Griser le fond */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
}

#login-popup {
  background-color: #fff;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  height: 70%;
  max-height: 70%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  z-index: 9999;
  overflow-y: auto; /* Rendre la pop-up scrollable */
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}

.popup-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.separator-line {
  height: 1px;
  background-color: #ddd;
  margin: 10px 0 20px 0;
}

.log-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.info-text {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

.privacy-policy-link {
  color: #007BFF;
  text-decoration: none;
}

.privacy-policy-link:hover {
  text-decoration: underline;
}

.log-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(90deg, #ff5a5f, #fc636b);
  color: white;
  font-weight: bold;
  margin-bottom: 15px;
  cursor: pointer;
}

.forgot-password {
  font-size: 14px;
  color: #007BFF;
  cursor: pointer;
  text-align: left;
}

.forgot-password:hover {
  text-decoration: underline;
}
</style>
