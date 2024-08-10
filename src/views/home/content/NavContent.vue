<template>
  <div class="navbar">
    <div class="navbar-item">
      <span class="label">Destination</span>
      <input type="text" placeholder="Rechercher une destination" class="input-field">
    </div>
    <div class="separator"></div>
    <div class="navbar-item">
      <span class="label">Arrivée</span>
      <input type="date" placeholder="Quand ?" class="input-field">
    </div>
    <div class="separator"></div>
    <div class="navbar-item">
      <span class="label">Départ</span>
      <input type="date" placeholder="Quand ?" class="input-field">
    </div>
    <div class="separator"></div>
    <div class="navbar-item">
      <span class="label">Voyageurs</span>
      <input type="number" placeholder="Ajouter des voyageurs" class="input-field">
    </div>
    <button class="search-button">
      <img src="path-to-search-icon" alt="Rechercher" class="search-icon">
    </button>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-item {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}

.label {
  font-weight: bold;
  font-size: 12px;
  color: #212121;
  margin-bottom: 5px;
}

.input-field {
  border: none;
  outline: none;
  font-size: 14px;
  color: #757575;
  background-color: transparent;
  padding: 5px;
}

.input-field::placeholder {
  color: #757575;
}

.separator {
  width: 1px;
  height: 30px;
  background-color: #e0e0e0;
  margin-right: 15px;
}

.search-button {
  background-color: #ff5a5f;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  width: 16px;
  height: 16px;
  color: white;
}
</style>
