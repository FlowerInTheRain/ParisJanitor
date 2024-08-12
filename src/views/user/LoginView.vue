<template>
  <div class="popup-overlay">
    <div id="login-popup">
      <div class="details-modal-overlay"></div>
      <input type="checkbox" id="chk" aria-hidden="true">
      <button @click="closePopup" class="close-button"> X </button>
      <div class="login">
        <form @submit.prevent="handleSignIn">
          <label class="log-label" for="chk" aria-hidden="true">Login</label>
          <input class="log-input" type="text" name="pseudo" v-model="pseudo" placeholder="Pseudo" required>
          <input class="log-input" type="password" name="password" v-model="password" placeholder="Password" required>
          <button  class="log-button" type="submit" >Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

	export default {
		data() {
			return {
				pseudo: '',
				email: '',
				password: '',
				errorMessage: '',
			};
		},
		methods: {
			closePopup() {
				this.$emit('close-popup');
			},
			async handleSignUp() {

			},
			async handleSignIn() {
			}
		}
	};
</script>


<style scoped>
	#login-popup {
		position: fixed;
		top: 50%;
		width: 350px;
		height: 500px;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
		background-color: #fff;
		padding: 20px;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}

	.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #000000;
    font-size: 18px;
    font-weight: bold;
  }
</style>