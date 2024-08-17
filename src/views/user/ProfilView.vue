<template>
  <div>
    <HeaderView />

    <div class="container profile">
      <div class="row">
        <div class="col-md-3">
          <div class="profile-img">
            <img :src="user.imageUrl" alt="User Image"/>
            <div class="file btn btn-lg btn-primary">
              Change Photo
              <input type="file" name="file"/>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="profile-head">
            <h5>{{ user.name }}</h5>
            <h6>{{ user.region }}</h6>
            <p class="proile-rating">RANKINGS : <span>{{ user.rank }}/10</span></p>
          </div>
        </div>
        <div class="col-md-2">
          <button @click="editProfile" class="profile-edit-btn">Edit Profile</button>
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
                <p>{{ user.userId }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Name</label>
              </div>
              <div class="col-md-6">
                <p>{{ user.name }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Email</label>
              </div>
              <div class="col-md-6">
                <p>{{ user.email }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Phone</label>
              </div>
              <div class="col-md-6">
                <p>{{ user.phone }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Région</label>
              </div>
              <div class="col-md-6">
                <p>{{ user.region }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";

export default {
  components: {
    HeaderView
  },
  data() {
    return {
      user: {
        userId: 'Kshiti123',
        name: 'Kshiti Ghelani',
        email: 'kshitighelani@gmail.com',
        phone: '123 456 7890',
        region: 'Ile-de-France',
        imageUrl: 'https://via.placeholder.com/150',
        rank: 8
      },
      upcomingLocations: [
        { id: 1, name: 'Location 1' },
        { id: 2, name: 'Location 2' },
        { id: 3, name: 'Location 3' }
      ],
      pastLocations: [
        { id: 4, name: 'Location 4' },
        { id: 5, name: 'Location 5' },
        { id: 6, name: 'Location 6' }
      ]
    };
  },
  methods: {
    editProfile() {
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 20px auto;
}

.profile {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

.profile-img img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
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

.profile-head .proile-rating {
  font-size: 12px;
  color: #818182;
  margin-top: 5px;
}

.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  width: 100%;
  padding: 8px;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}

.profile-work {
  padding: 14%;
  margin-top: -15%;
}

.profile-work p {
  font-size: 14px;
  color: #818182;
  font-weight: 600;
  margin-top: 10px;
}

.profile-work a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}

.profile-tab label {
  font-weight: 600;
}

.profile-tab p {
  font-weight: 600;
  color: #0062cc;
}
</style>
