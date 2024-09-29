<template>
  <div>
    <HeaderView />

    <div class="container profile" v-if="user">
      <!-- Password Popup -->
      <div v-if="showPasswordPopup" class="password-popup-overlay">
        <div class="password-popup">
          <h3>Entrer votre mot de passe</h3>
          <input type="password" v-model="password" placeholder="Password" />
          <button @click="verifyAndUpdateProfile">Confirm</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>

      <!-- Verification Code Popup -->
      <div v-if="showCodePopup" class="password-popup-overlay">
        <div class="password-popup">
          <h3>Enter the verification code</h3>
          <input type="text" v-model="verificationCode" placeholder="Code" maxlength="7" />
          <button @click="verifyCode">Verify</button>
          <button @click="cancelCodeEntry">Cancel</button>
        </div>
      </div>

      <!-- New Password Popup -->
      <div v-if="showNewPasswordPopup" class="password-popup-overlay">
        <div class="password-popup">
          <h3>Enter new password</h3>
          <input type="password" v-model="newPassword" placeholder="New Password" />
          <input type="password" v-model="confirmPassword" placeholder="Confirm Password" />
          <button @click="saveNewPassword">Save</button>
          <button @click="cancelNewPasswordEntry">Cancel</button>
        </div>
      </div>
    </div>

    <div class="container profile container-update" v-if="user">
      <div class="row">
        <div class="col-md-3">
          <div class="profile-img">
            <img
                :src="user.imageUrl || 'https://via.placeholder.com/150'"
                alt="User Image"
                @click="triggerFileInput"
            />
            <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
            />
          </div>
        </div>
        <div class="col-md-7">
          <div class="profile-head">
            <h5>{{ user.firstName }} {{ user.lastName }}</h5>
            <p class="profile-rating">RANKINGS : <span>{{ user.rank || 'N/A' }}/10</span></p>
          </div>
        </div>
        <div class="col-md-2">
          <button v-if="!isEditing" @click="editProfile" class="profile-edit-btn">Edit Profile</button>
          <button v-if="isEditing" @click="saveProfile" class="profile-save-btn">Save</button>
          <button v-if="isEditing" @click="cancelEdit" class="profile-cancel-btn">Cancel</button>
          <button @click="requestPasswordChange" class="profile-edit-btn">Modifier mon mot de passe</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="profile-work">
            <p>Mes Locations à venir</p>
            <a v-for="location in upcomingLocations" :key="location.id" href="#">{{ location.name }}</a>
            <p>Mes Précédentes Locations</p>
            <a v-for="location in pastLocations" :key="location.id" href="#">{{ location.name }}</a>
          </div>
        </div>
        <div class="col-md-7">
          <div class="tab-content profile-tab" id="myTabContent">
            <div class="row">
              <div class="col-md-6">
                <label>Nom officiel</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.firstName }} {{ user.lastName }}</p>
                <div v-else>
                  <input v-model="editUser.firstName" placeholder="Prénom" class="edit-input" />
                  <input v-model="editUser.lastName" placeholder="Nom" class="edit-input" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Adresse e-mail</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.email }}</p>
                <input v-else v-model="editUser.email" placeholder="Email" class="edit-input" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Numéro de téléphone</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.phoneNumber }}</p>
                <input v-else v-model="editUser.phoneNumber" placeholder="Téléphone" class="edit-input" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Adresse</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.adresse1 }}</p>
                <input v-else v-model="editUser.adresse1" placeholder="Adresse" class="edit-input" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Complément d'adresse</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.adresse2 }}</p>
                <input v-else v-model="editUser.adresse2" placeholder="Complément d'adresse" class="edit-input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import { getMyProfile, updateUserProfile, requestSecurityModification, verifyPasswordCode, updatePassword, verifyPassword } from "@/services/parisjanitor/endpoints/users";

export default {
  components: {
    HeaderView,
  },
  data() {
    return {
      user: null,
      editUser: {},
      isEditing: false,
      showPasswordPopup: false,
      showCodePopup: false,
      showNewPasswordPopup: false,
      password: '',
      verificationCode: '',
      newPassword: '',
      confirmPassword: '',
      upcomingLocations: [],
      pastLocations: [],
    };
  },
  async created() {
    try {
      this.user = await getMyProfile();
      this.editUser = { ...this.user };
    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  },
  methods: {
    editProfile() {
      this.isEditing = true;
    },
    async saveProfile() {
      this.showPasswordPopup = true;
    },
    async verifyAndUpdateProfile() {
      console.log("Attempting to verify password:", this.password);
      const result = await verifyPassword(this.password);
      console.log("Password verification result:", result);

      if (result) {
        console.log("Password verified, updating profile with data:", this.editUser);
        try {
          const updatedUser = await updateUserProfile(this.editUser);
          console.log("Profile updated successfully:", updatedUser);
          this.user = { ...updatedUser };
          this.isEditing = false;
          this.showPasswordPopup = false;
          alert("Profile updated successfully");
        } catch (updateError) {
          console.error("Failed to update profile:", updateError);
          alert("Failed to update profile: " + updateError.message);
        }
      } else {
        alert("Invalid password");
      }
    },
    async requestPasswordChange() {
      try {
        console.log("Requesting security modification");
        await requestSecurityModification();
        this.showCodePopup = true;
      } catch (error) {
        console.error('Failed to request password change:', error);
        alert('Failed to send verification code.');
      }
    },
    async verifyCode() {
      console.log("Verifying code:", this.verificationCode);
      try {
        await verifyPasswordCode(this.verificationCode);
        this.showCodePopup = false;
        this.showNewPasswordPopup = true;
      } catch (error) {
        console.error('Verification code is invalid:', error);
        alert('Invalid verification code.');
      }
    },
    async saveNewPassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      console.log("Updating password with:", this.newPassword);
      try {
        await updatePassword(this.newPassword);
        alert('Password updated successfully.');
        this.showNewPasswordPopup = false;
      } catch (error) {
        console.error('Failed to update password:', error);
        alert('Failed to update password.');
      }
    },
    cancelEdit() {
      this.editUser = { ...this.user };
      this.isEditing = false;
      this.showPasswordPopup = false;
    },
    cancelCodeEntry() {
      this.showCodePopup = false;
      this.verificationCode = '';
    },
    cancelNewPasswordEntry() {
      this.showNewPasswordPopup = false;
      this.newPassword = '';
      this.confirmPassword = '';
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file);
      }
    }
  },
};
</script>


<style scoped>
.profile-img {
  width: 50%;
  margin: 0 auto;
  position: relative;
}

.profile-img img {
  width: 100%;
  height: auto;
  border-radius: 50%;
  cursor: pointer;
}

.profile-img input[type="file"] {
  display: none;
}
.profile-img{
  position: relative;
  overflow: hidden;
  margin-top: -20px;
  width: 100%;
  border: none;
  border-radius: 0;
  font-size: 14px;
  background: #212529b8;
}

.profile-head h5 {
  color: #333;
}

.profile-head h6 {
  color: #0062cc;
}

.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  width: 100%;
  margin: 3px;
  padding: 5%;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}

.profile-save-btn,
.profile-cancel-btn {
  border: none;
  border-radius: 1.5rem;
  width: 100%;
  padding: 5%;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background-color: #28a745;
}

.profile-cancel-btn {
  background-color: #dc3545;
  margin-top: 10px;
}

.profile-work p {
  font-size: 12px;
  color: #818182;
  font-weight: 600;
  margin-top: 10%;
}

.profile-work a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}

.profile-work ul {
  list-style: none;
}

.edit-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.password-popup-overlay {
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

.password-popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.password-popup input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

.password-popup button {
  padding: 10px 20px;
  margin-right: 10px;
}

.password-popup button:last-child {
  margin-right: 0;
}

.container-update{
  padding-top: 10px;
}
</style>
