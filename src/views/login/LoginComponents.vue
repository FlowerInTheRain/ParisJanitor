<template>
  <div class="popup-overlay">
    <div id="login-popup">
      <div class="details-modal-overlay"></div>
      <input type="checkbox" id="chk" aria-hidden="true">
      <button @click="closePopup" class="close-button"> X </button>
      <div class="signup">
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <form @submit.prevent="handleSignUp">
          <label class="signup-label" for="chk" aria-hidden="true">Sign up</label>
          <input class="log-input" type="text" name="pseudo" v-model="pseudo" placeholder="Pseudo" required>
          <input class="log-input" type="email" name="email" v-model="email" placeholder="Email" required>
          <input class="log-input" type="password" name="password" v-model="password" placeholder="Password" required>
          <button class="log-button" type="submit" >Sign up</button>
        </form>
      </div>
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
	import { signUp, signIn } from '@/services/dndgate/endpoints/users';
  import UserCreationRequestDto from "@/dto/request/UserCreationRequestDto";

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
        this.errorMessage = ""
				const userData = new UserCreationRequestDto(
					this.pseudo,
					this.email,
					this.password
        )
				try {
					const response = await signUp(userData);
					if (response && response.id) {
            this.$emit('userCreateAccountEvent')
					} else {
						this.errorMessage = "Le pseudo ou l'email existe déjà.";
					}
				} catch (error) {
					this.errorMessage = "Une erreur s'est produite lors de l'inscription.";
				}
			},
			async handleSignIn() {
        this.errorMessage = ""
				const userData = {
					pseudo: this.pseudo,
					password: this.password
				};
				try {
					const response = await signIn(userData);
					if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', response.id);
            this.$store.dispatch('updateAuthentication', true);
            this.$emit('userConnectedEvent')
					} else {
						this.errorMessage = "Pseudo ou mot de passe incorrect.";
					}
				} catch (error) {
					this.errorMessage = "Une erreur s'est produite lors de la connexion.";
				}
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
		background: linear-gradient(to left top, #c21c17, #b1302c, #974d4b, #866160, #7e6b6b, #757575)
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

	.signup{
		position: relative;
		width:100%;
		height: 100%;
	}
	.signup-label {
		color: #fff;
		font-size: 2.3em;
		justify-content: center;
		display: flex;
		margin: 50px auto; 
		font-weight: bold;
		cursor: pointer;
		transition: .5s ease-in-out;
	}
	.log-input{
		width: 60%;
		height: 20px;
		background: #e0dede;
		justify-content: center;
		display: flex;
		margin: 20px auto;
		padding: 10px;
		border: none;
		outline: none;
		border-radius: 5px;
	}
	.log-label{
		color: #fff;
		font-size: 2.3em;
		justify-content: center;
		display: flex;
		margin: 60px;
		font-weight: bold;
		cursor: pointer;
		transition: .5s ease-in-out;
	}
	.log-button{
		width: 60%;
		height: 40px;
		margin: 10px auto;
		justify-content: center;
		display: block;
		color: #fff;
		background: #573b8a;
		font-size: 1em;
		font-weight: bold;
		margin-top: 20px;
		outline: none;
		border: none;
		border-radius: 5px;
		transition: .2s ease-in;
		cursor: pointer;
	}
	.log-button:hover{
		background: #6d44b8;
	}

	.signup{
		position: relative;
		width:100%;
		height: 100%;
	}
	.login .log-label{
		color: #573b8a;
		transform: scale(.6);
	}
	#chk{
		display: none;
	}
	#chk:checked ~ .login{
		transform: translateY(-500px);
	}
	#chk:checked ~ .login label{
		transform: scale(1);	
	}
	#chk:checked ~ .signup label{
		transform: scale(.6);
	}	

	.login{
		height: 95%;
		background: #eee;
		border-radius: 60% / 10%;
		transform: translateY(-160px);
		transition: .5s ease-in-out;
	}
	.login .log-label{
		color: #573b8a;
		transform: scale(.6);
	}
</style>