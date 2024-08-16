<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>Confirmez le compte</h2>
        <button @click="closeModal" class="close-button">X</button>
      </div>
      <div class="modal-body">
        <p class="verification-title">Saisissez votre code de vérification</p>
        <p class="verification-description">
          Saisissez le code envoyé par e-mail à azrr@tre.fr.
        </p>
        <div class="code-inputs">
          <input v-for="n in 6" :key="n" maxlength="1" class="code-input" />
        </div>
        <p class="resend">Vous n'avez pas reçu d'e-mail ? <a href="#">Réessayer</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');  // Emet l'événement pour fermer la pop-up
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: yellow;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  z-index: 10001;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.verification-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.verification-description {
  margin-bottom: 20px;
}

.code-inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.code-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.resend {
  text-align: center;
}

.resend a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
