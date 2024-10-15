<template>
  <div class="sidebar" @mouseover="hoverSidebar" @mouseleave="unhoverSidebar">
    <div class="sidebar-logo">
      <font-awesome-icon :icon="['fas', 'box']" />
    </div>
    <div class="sidebar-menu">
      <ul>
        <li
            class="menu-item"
            v-for="item in menuItems"
            :key="item.label"
            :class="{ active: item.active }"
            @click="setActive(item)"
        >
          <font-awesome-icon :icon="item.icon" class="icon" />
          <span v-if="hover" class="label">{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <div class="sidebar-footer">
      <li class="menu-item">
        <font-awesome-icon :icon="['fas', 'user']" class="icon" />
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSidebar",
  data() {
    return {
      hover: false,
      menuItems: [
        { label: "Propriété", icon: ["fas", "building-user"], active: true },
        { label: "Utilisateurs", icon: ["fas", "user"], active: false },
        { label: "Facturations", icon: ["fas", "file-invoice"], active: false },
        { label: "Services", icon: ["fas", "bell-concierge"], active: false },
        { label: "Settings", icon: ["fas", "cog"], active: false },
        { label: "Messages", icon: ["fas", "comments"], active: false },
      ],
    };
  },
  methods: {
    hoverSidebar() {
      this.hover = true;
    },
    unhoverSidebar() {
      this.hover = false;
    },
    setActive(item) {
      this.menuItems.forEach((menuItem) => (menuItem.active = false));
      item.active = true;
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #2e3440;
  color: white;
  width: 100px;
  height: 100vh;
  position: fixed;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar:hover {
  width: 200px;
}

.sidebar-logo {
  height: 60px;
  background-color: #3b4252;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-menu {
  padding-top: 20px;
  flex-grow: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  color: white;
  cursor: pointer;
}

.menu-item.active {
  background-color: #434c5e;
  border-radius: 10px;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.label {
  display: none;
  font-size: 16px;
}

.sidebar:hover .label {
  display: inline;
}

.menu-item:hover {
  background-color: #434c5e;
  border-radius: 10px;
}

.sidebar-footer {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.sidebar-footer .menu-item {
  width: 100%;
  justify-content: center;
}
</style>
