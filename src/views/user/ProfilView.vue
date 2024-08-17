<template>
  <div>
    <HeaderView />

    <div class="container profile" v-if="user">
      <div class="row">
        <div class="col-md-3">
          <div class="profile-img">
            <img :src="user.imageUrl || 'https://via.placeholder.com/150'" alt="User Image"/>
            <div class="file btn btn-lg btn-primary">
              Change Photo
              <input type="file" name="file"/>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="profile-head">
            <h5 v-if="!isEditing">{{ user.firstName }} {{ user.lastName }}</h5>
            <input v-if="isEditing" v-model="editUser.firstName" placeholder="Prénom" class="edit-input" />
            <input v-if="isEditing" v-model="editUser.lastName" placeholder="Nom" class="edit-input" />

            <h6 v-if="!isEditing">{{ user.region }}</h6>
            <input v-if="isEditing" v-model="editUser.region" placeholder="Région" class="edit-input" />

            <p class="proile-rating">RANKINGS : <span>{{ user.rank || 'N/A' }}/10</span></p>
          </div>
        </div>
        <div class="col-md-2">
          <button v-if="!isEditing" @click="editProfile" class="profile-edit-btn">Edit Profile</button>
          <button v-if="isEditing" @click="saveProfile" class="profile-save-btn">Save</button>
          <button v-if="isEditing" @click="cancelEdit" class="profile-cancel-btn">Cancel</button>
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
                <label>User Id</label>
              </div>
              <div class="col-md-6">
                <p>{{ user.id }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Name</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.firstName }} {{ user.lastName }}</p>
                <input v-if="isEditing" v-model="editUser.firstName" placeholder="Prénom" class="edit-input" />
                <input v-if="isEditing" v-model="editUser.lastName" placeholder="Nom" class="edit-input" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Email</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.email }}</p>
                <input v-if="isEditing" v-model="editUser.email" placeholder="Email" class="edit-input" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Phone</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.phoneNumber }}</p>
                <input v-if="isEditing" v-model="editUser.phoneNumber" placeholder="Téléphone" class="edit-input" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Région</label>
              </div>
              <div class="col-md-6">
                <p v-if="!isEditing">{{ user.region }}</p>
                <input v-if="isEditing" v-model="editUser.region" placeholder="Région" class="edit-input" />
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
import { getMyProfile, updateUser } from "@/services/parisjanitor/endpoints/users";

export default {
  components: {
    HeaderView,
  },
  data() {
    return {
      user: null,
      editUser: {},
      isEditing: false,
      upcomingLocations: [], // Replace with actual data or fetch dynamically
      pastLocations: [], // Replace with actual data or fetch dynamically
    };
  },
  async created() {
    try {
      const profileData = await getMyProfile();
      this.user = profileData;
      this.editUser = { ...profileData };
    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  },
  methods: {
    editProfile() {
      this.isEditing = true;
    },
    async saveProfile() {
      try {
        await updateUser(this.editUser);
        this.user = { ...this.editUser };
        this.isEditing = false;
        alert("Profile updated successfully");
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile");
      }
    },
    cancelEdit() {
      this.editUser = { ...this.user };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
.profile-img img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}

.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20px;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}

.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
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
</style>
