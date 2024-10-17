<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <font-awesome-icon :icon="['fas', 'box']" />
    </div>
    <div class="sidebar-menu">
      <ul>
        <li
            v-for="(item, index) in menuItems"
            :key="index"
            :class="{ active: item.active }"
            class="menu-item"
            @click="$emit('menu-selected', item.label)"
        >
        <font-awesome-icon :icon="item.icon" class="icon" />
        <span class="label">{{ item.label }}</span>

        <ul v-if="item.label === 'Prestataires'" class="submenu">
          <li
              v-for="(submenu, subIndex) in item.submenuItems"
              :key="subIndex"
              class="menu-item submenu-item"
              @click.stop="$emit('menu-selected', submenu.label)"
          >
          <font-awesome-icon :icon="submenu.icon" class="icon" />
          <span class="label">{{ submenu.label }}</span>
          </li>
        </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSidebar",
  data() {
    return {
      menuItems: [
        { label: "Propriété", icon: ["fas", "building-user"], active: false },
        { label: "Utilisateurs", icon: ["fas", "user"], active: false },
        { label: "Facturations", icon: ["fas", "file-invoice"], active: false },
        {
          label: "Prestataires",
          icon: ["fas", "bell-concierge"],
          active: false,
          submenuItems: [
            { label: "Prestataires en attente", active: false },
            { label: "Certificats en attente", active: false },
          ],
        },
        { label: "Settings", icon: ["fas", "cog"], active: false },
        { label: "Messages", icon: ["fas", "comments"], active: false },
      ],
    };
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

.submenu {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.submenu-item {
  padding-left: 30px;
  margin-bottom: 5px;
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
