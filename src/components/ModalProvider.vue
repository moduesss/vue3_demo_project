<template>
  <slot />

  <div v-if="modalVisible" class="modal-overlay">
    <div class="modal-box">
      <p class="modal-message">{{ message }}</p>

      <div class="modal-actions">
        <button class="delete-btn" @click="confirm">Удалить</button>
        <button class="cancel-btn" @click="cancel">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const modalVisible = ref(false);
const message = ref('');
const modalTitle = 'Подтверждение';

let resolveFn = null;

function openModal(text = 'Вы уверены?') {
  message.value = text;
  modalVisible.value = true;
  return new Promise((resolve) => {
    resolveFn = resolve;
  });
}

function confirm() {
  modalVisible.value = false;
  resolveFn(true);
}

function cancel() {
  modalVisible.value = false;
  resolveFn(false);
}

provide('openModal', openModal);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* полупрозрачный фон */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-box {
  background: #39004d;
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  box-shadow: 0 0 15px rgb(255, 255, 255);
  text-align: center;
}

.modal-message {
  font-size: 18px;
  margin-bottom: 20px;
  color: #ffffff;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
}

.delete-btn {
  background-color: #e3342f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.cancel-btn {
  background-color: #d3d3d3;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
</style>
