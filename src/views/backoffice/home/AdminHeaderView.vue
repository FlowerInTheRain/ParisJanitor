<template>
  <div class="admin-header">
    <img src="@/assets/home/main-logo.png" alt="Logo" class="logo" />
    <div class="header-title">Paris Janitor</div>
    <!--<div class="header-right">
      <div class="notification-icon"></div>
      <div class="profile-icon"></div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "AdminHeaderView",
};
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 40px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #ff5a5f;
}

.header-right {
  display: flex;
  gap: 20px;
}

.notification-icon,
.profile-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0e0e0;
}
</style>