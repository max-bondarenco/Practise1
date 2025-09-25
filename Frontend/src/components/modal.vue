<template>
  <div class="modal-overlay" @click.self="props.onClose()">
    <div class="modal">
      <slot />
      <div class="modal-actions">
        <button v-show="canProceed" @click="props.onProceed">Proceed</button>
        <button @click="props.onClose">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['file', 'canProceed', 'onProceed', 'onClose']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.modal-actions button:first-child {
  background-color: #1abc9c;
  color: #fff;
}

.modal-actions button:first-child:hover {
  background-color: #16a085;
}

.modal-actions button:last-child {
  background-color: #ccc;
}

.modal-actions button:last-child:hover {
  background-color: #aaa;
}
</style>
