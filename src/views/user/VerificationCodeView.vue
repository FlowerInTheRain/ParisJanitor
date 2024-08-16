<template>
  <div class="overlay">
    <div class="modal">
      <h2>Test Modal</h2>
      <p>Ceci est un test de contenu pour la modal.</p>
    </div>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.modal {
  background-color: #fff;
  border-radius: 8px;
  width: 400px;
  min-height: 200px;
  padding: 20px;
  z-index: 99999;
}
</style>
