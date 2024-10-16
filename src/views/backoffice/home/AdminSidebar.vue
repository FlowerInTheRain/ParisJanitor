<template>
  <div class="sidebar">
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
          <span class="label">{{ item.label }}</span>
        </li>

        <!-- Sous-menus pour Prestataires, seulement affiché si Prestataires est actif -->
        <ul v-if="menuItems.find(item => item.label === 'Prestataires').active" class="submenu">
          <li
              v-for="submenu in submenuItems"
              :key="submenu.label"
              class="menu-item submenu-item"
              @click="setActiveSubmenu(submenu)"
          >
            <font-awesome-icon :icon="submenu.icon" class="icon" />
            <span class="label">{{ submenu.label }}</span>
          </li>
        </ul>
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
      menuItems: [
        { label: "Propriété", icon: ["fas", "building-user"], active: true },
        { label: "Utilisateurs", icon: ["fas", "user"], active: false },
        { label: "Facturations", icon: ["fas", "file-invoice"], active: false },
        {
          label: "Prestataires",
          icon: ["fas", "bell-concierge"],
          active: false,
          hasSubmenu: true,
        },
        { label: "Settings", icon: ["fas", "cog"], active: false },
        { label: "Messages", icon: ["fas", "comments"], active: false },
      ],
      submenuItems: [
        {
          label: "Prestataires en attente",
          icon: ["fas", "clock"],
          active: false,
        },
        {
          label: "Certificats en attente",
          icon: ["fas", "file-certificate"],
          active: false,
        },
      ],
    };
  },
  methods: {
    setActive(item) {
      this.menuItems.forEach((menuItem) => (menuItem.active = false));
      item.active = true;
      this.$emit('menu-selected', item.label);
    },
    setActiveSubmenu(submenu) {
      this.submenuItems.forEach((submenuItem) => (submenuItem.active = false));
      submenu.active = true;
      this.$emit('menu-selected', submenu.label);
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #2e3440;
  color: white;
  width: 200px;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  font-size: 16px;
}

.menu-item:hover {
  background-color: #434c5e;
  border-radius: 10px;
}

.submenu {
  padding-left: 20px;
}

.submenu-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.submenu-item .label {
  font-size: 14px;
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
