<template>
  <div class="admin-home">
    <AdminHeaderView />
    <div class="admin-body">
      <AdminSidebar />
      <div class="content-area">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>This is the back-office for administrators.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeaderView from "@/views/backoffice/home/AdminHeaderView.vue";
import AdminSidebar from "@/views/backoffice/home/AdminSidebar.vue";

export default {
  name: "AdminHomeView",
  components: {
    AdminHeaderView,
    AdminSidebar,
  },
};
</script>

<style scoped>
.admin-home {
  display: flex;
  flex-direction: column;
}

.admin-body {
  display: flex;
}

.content-area {
  flex-grow: 1;
  padding: 50px;
  background-color: #f5f6fa;
  margin-left: 60px;
  transition: margin-left 0.3s ease;
}

.sidebar:hover + .content-area {
  margin-left: 200px;
}

h1 {
  color: #333;
}
</style>