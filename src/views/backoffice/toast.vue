<template>
  <div v-if="visible" :class="['toast', type]" class="toast-container">
    <span>{{ message }}</span>
    <button @click="closeToast">X</button>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: String,
    type: {
      type: String,
      default: 'info'
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    showToast() {
      this.visible = true;
      setTimeout(() => {
        this.closeToast();
      }, this.duration);
    },
    closeToast() {
      this.visible = false;
    }
  },
  mounted() {
    this.showToast();
  }
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
}

.toast.success {
  background-color: #28a745;
}

.toast.error {
  background-color: #dc3545;
}

.toast.info {
  background-color: #17a2b8;
}

.toast.loading {
  background-color: #ffc107;
}

.toast button {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}
</style>
