<template>
  <div class="admin-home">
    <AdminHeaderView />
    <div class="admin-body">
      <AdminSidebar @menu-selected="handleMenuSelected" />
      <div class="content-area">
        <PropertyListView v-if="activeMenu === 'Propriété'" />
        <PendingProvidersView v-if="activeMenu === 'Prestataires en attente'" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeaderView from "@/views/backoffice/home/AdminHeaderView.vue";
import AdminSidebar from "@/views/backoffice/home/AdminSidebar.vue";
import PropertyListView from "@/views/backoffice/property/PropertyListView.vue";
import PendingProvidersView from "@/views/backoffice/providers/PendingProvidersView.vue";

export default {
  name: "AdminHomeView",
  components: {
    AdminHeaderView,
    AdminSidebar,
    PropertyListView,
    PendingProvidersView,
  },
  data() {
    return {
      activeMenu: "Propriété",
    };
  },
  methods: {
    handleMenuSelected(menu) {
      this.activeMenu = menu;
    },
  },
};
</script>

<style scoped>
.admin-home {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.admin-body {
  display: flex;
  height: 100%;
}

.content-area {
  flex-grow: 1;
  padding: 50px;
  background-color: #f5f6fa;
  margin-left: 60px;
  transition: margin-left 0.3s ease;
  height: 100%;
}

.sidebar:hover + .content-area {
  margin-left: 200px;
}

h1 {
  color: #333;
}
</style>
