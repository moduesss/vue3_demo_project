<template>

  <n-config-provider :theme-overrides="themeOverrides">
    <ModalProvider>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
    </ModalProvider>
  </n-config-provider>
</template>

<script setup>
import ModalProvider from './components/ModalProvider.vue';
import Navbar from './components/navbar.vue';
import { NConfigProvider } from "naive-ui";
import { themeOverrides } from "./assets/theme.js"



</script>
