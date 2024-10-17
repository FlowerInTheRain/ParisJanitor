<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal">
      <button class="close-button" @click="closeModal">×</button>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close'); // Emit an event to close the modal
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Assure that the modal is above other content */
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* Fixed width for the modal */
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}
</style>