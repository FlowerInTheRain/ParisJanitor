<template>
  <div class="popup-overlay">
    <!-- Afficher la popup VerificationCodeView au-dessus du login-popup si showVerification est true -->
    <VerificationCodeView v-if="showVerification" @close="closeVerification" />

    <div id="login-popup" :class="{ 'popup-blur': showVerification }">
      <button v-if="showSignUp" @click="goBack" class="back-button">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>
      <button v-else-if="showSignIn" @click="goBack" class="back-button">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>

      <h2 class="popup-title">{{ popupTitle }}</h2>
      <button @click="closePopup" class="close-button">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
      <div class="separator-line"></div>

      <form @submit.prevent="handleSignIn">
        <div v-if="!showSignUp && !showVerification">
          <input class="log-input" type="email" v-model="email" placeholder="Adresse e-mail" required>
        </div>

        <div v-if="showSignIn && !showVerification">
          <input class="log-input" type="password" v-model="password" placeholder="Mot de passe" required>
        </div>

        <div v-if="showSignUp && !showVerification">
          <input class="log-input" type="text" v-model="firstName" placeholder="Prénom sur la pièce d'identité" required>
          <input class="log-input" type="text" v-model="lastName" placeholder="Nom sur la pièce d'identité" required>
          <input class="log-input" type="date" v-model="birthDate" placeholder="Date de naissance" required>
          <input class="log-input" type="email" v-model="email" placeholder="E-mail" required>
          <input class="log-input" type="password" v-model="password" placeholder="Mot de passe" required>
        </div>

        <p class="info-text" v-if="!showSignUp && !showVerification">
          Nous vous appellerons ou vous enverrons un SMS pour confirmer votre numéro.
          Les frais standards d'envoi de messages et d'échange de données s'appliquent.
          <a href="#" class="privacy-policy-link">Politique de confidentialité</a>
        </p>

        <button class="log-button" type="submit" v-if="showSignUp && !showVerification">
          Accepter et continuer
        </button>

        <button class="log-button" type="submit" v-else>
          Connecter
        </button>

        <p v-if="!showSignUp && !showVerification" class="forgot-password">Mot de passe oublié ?</p>
      </form>
    </div>
  </div>
</template>

<script>
import { getUserByEmail, signIn, signUp } from "@/services/parisjanitor/endpoints/users";
import UserCreationRequestDto from "@/dto/request/UserCreationRequestDto";
import VerificationCodeView from './VerificationCodeView.vue';

export default {
  components: {
    VerificationCodeView
  },
  data() {
    return {
      email: '',
      showSignUp: false,
      showSignIn: false,
      showVerification: false,
      verificationCode: '',
      popupTitle: 'Connexion ou inscription',
      firstName: '',
      lastName: '',
      birthDate: '',
      password: '',
      phoneNumber: '',
      region: '',
      adresse1: '',
      adresse2: ''
    };
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
    closeVerification() {
      this.showVerification = false;
    },
    goBack() {
      this.popupTitle = 'Connexion ou inscription';
      this.showSignUp = false;
      this.showSignIn = false;
      this.showVerification = false;
    },
    async handleSignIn() {
      if (this.showSignIn) {
        const loginData = {
          email: this.email,
          password: this.password
        };
        try {
          const response = await signIn(loginData);
          console.log("Login Successful:", response);
          this.closePopup();
        } catch (error) {
          console.error("Login Failed:", error);
        }
      } else if (this.showSignUp) {
        const dto = new UserCreationRequestDto(
            this.email,
            this.password,
            this.lastName,
            this.firstName,
            this.birthDate,
            this.phoneNumber,
            this.region,
            this.adresse1,
            this.adresse2
        );

        console.log("Registration Data:", dto);

        try {
          const response = await signUp(dto);
          console.log("Registration Successful:", response);
          this.showVerification = true; // Afficher la pop-up de vérification du code
        } catch (error) {
          console.error("Registration Failed:", error);
        }
      } else {
        try {
          const user = await getUserByEmail(this.email);
          if (user) {
            this.popupTitle = 'Veuillez saisir votre mot de passe';
            this.showSignIn = true;
            this.showSignUp = false;
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.popupTitle = 'Terminer mon inscription';
            this.showSignUp = true;
            this.showSignIn = false;
          } else {
            console.error("Error while checking user:", error);
          }
        }
      }
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
  background-color: rgba(0, 0, 0, 0.5);
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
  overflow-y: auto;
}

#login-popup.popup-blur {
  filter: blur(5px); /* Désactivez temporairement le flou pour tester */
}

.back-button {
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  width: 30px;
  height: 30px;
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
