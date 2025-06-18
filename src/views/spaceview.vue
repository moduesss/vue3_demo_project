<template>

  <div class="space-container">
    <h2 class="gradient-title">NASA • Картинка дня</h2>

    <button @click="fetchData">Загрузить картинку дня</button>

    <div v-if="error" class="error">Ошибка: {{ error }}</div>
    <div v-else-if="loading">Загрузка...</div>

    <div v-if="apodData">
      <img :src="apodData.url" alt="NASA Picture" class="nasa-img" />
      <h3>{{ apodData.title }}</h3>
      <p>{{ apodData.date }}</p>
      <p>{{ apodData.explanation }}</p>
    </div>
  </div>

</template>

<script setup>

import {ref} from 'vue';

const apodData = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    if (!res.ok) throw new Error('Ошибка загрузки данных');
    apodData.value = await res.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

.space-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  font-family: montserrat, monospace;
  color: white;
  background: rgba(32, 0, 64, 0.7);
  text-align: center;
  border-radius: 10px;
}
.nasa-img {
  max-width: 100%;
  margin-top: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 20px #00ffff;
}
.gradient-title {
  background: linear-gradient(90deg, #a066ff, #00ffff, #a066ff);
  background-size: 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: flow 5s infinite linear;
}
@keyframes flow {
  0% { background-position: 0 }
  100% { background-position: 300% }
}
button {
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  background: #39004d;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background: #a066ff;
}
.error {
  color: red;
}

</style>
