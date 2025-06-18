<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">Главная</router-link>
    <router-link to="/stats" class="nav-link">Статистика</router-link>
    <router-link to="/space" class="nav-link">Space</router-link>
  </nav>
</template>

<script setup></script>

<style scoped>

.navbar {
  margin-top: 10px;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(to right, #1e1b2e, #3b0764);
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  border-radius: 12px;
  margin-bottom: 1rem;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

</style>
