<template>
  <div class="popup-overlay">
    <div id="login-popup">
      <button @click="closePopup" class="close-button"> X </button>
      <h2 class="popup-title">Connexion ou inscription</h2>
      <div class="separator-line"></div>
      <p class="welcome-text">Bienvenue sur Paris Janitor</p>

      <form @submit.prevent="handleSignIn">
        <!-- Affichage conditionnel basé sur le choix de l'utilisateur -->
        <div v-if="useEmail">
          <input class="log-input" type="email" v-model="email" placeholder="Adresse e-mail" required>
        </div>
        <div v-else>
          <div class="country-selector">
            <label for="country">Pays/région</label>
            <select id="country" v-model="country" class="country-dropdown">
              <option value="france">France (+33)</option>
              <option value="usa">USA (+1)</option>
              <!-- Ajoutez d'autres options ici -->
            </select>
          </div>
          <input class="log-input" type="tel" v-model="phone" placeholder="Numéro de téléphone" required>
        </div>
        <p class="info-text" v-if="!useEmail">
          Nous vous appellerons ou vous enverrons un SMS pour confirmer votre numéro.
          Les frais standards d'envoi de messages et d'échange de données s'appliquent.
          <a href="#" class="privacy-policy-link">Politique de confidentialité</a>
        </p>

        <button class="log-button" type="submit">Continuer</button>
      </form>

      <div class="divider">ou</div>

      <button class="social-login-button facebook-button">
        <font-awesome-icon :icon="['fab', 'facebook']" />
        Continuer avec Facebook
      </button>
      <button class="social-login-button google-button">
        <font-awesome-icon :icon="['fab', 'google']" />
        Continuer avec Google
      </button>
      <button class="social-login-button apple-button">
        <font-awesome-icon :icon="['fab', 'apple']" />
        Continuer avec Apple
      </button>
      <button class="social-login-button email-button" @click="useEmail = true">
        <font-awesome-icon :icon="['fas', 'envelope']" />
        Continuer avec une adresse e-mail
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      country: 'france',
      email: '',
      useEmail: false, // Variable pour gérer l'affichage conditionnel
    };
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
    async handleSignIn() {
      // Logique de connexion
    }
  }
};
</script>

<style scoped>
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

.welcome-text {
  font-size: 16px;
  margin-bottom: 15px;
}

.country-selector {
  margin-bottom: 15px;
}

.country-dropdown {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

.divider {
  margin: 20px 0;
  font-size: 14px;
  color: #999;
}

.social-login-button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
}

.social-login-button .fa-icon {
  margin-right: 10px;
}

.facebook-button {
  color: #3b5998;
}

.google-button {
  color: #db4437;
}

.apple-button {
  color: #333;
}

.email-button {
  color: #666;
}
</style>
