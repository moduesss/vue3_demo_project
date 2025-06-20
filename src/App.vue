<template>
  <n-config-provider :theme-overrides="themeOverrides">
  <div id="app">
    <Navbar />
    <router-view />
  </div>
  </n-config-provider>
</template>

<script setup>
import Navbar from './components/navbar.vue';
import {NConfigProvider} from "naive-ui";

const themeOverrides = {
  common: {
    primaryColor: '#e54eff',
    primaryColorHover: '#ff78ff',
    textColorBase: '#e3d1ff',
    bodyColor: '#150022',
    cardColor: '#1e0030',
    borderColor: '#6f00a9',
  },
  Input: {
    color: '#1e0030',
    colorFocus: '#2c0045',
    border: '1px solid #e54eff',
    borderHover: '1px solid #ff78ff',
    borderFocus: '1px solid #ff78ff',
    boxShadowFocus: '0 0 6px 2px #e54eff44',
    textColor: '#e3d1ff',
    placeholderColor: '#b982e3',
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: '#e3d1ff',
        placeholderColor: '#b982e3',
        border: '1px solid #e54eff',
        borderHover: '1px solid #ff78ff',
        borderFocus: '1px solid #ff78ff',
        boxShadowFocus: '0 0 6px 2px #e54eff44',
        color: '#1e0030',
      },
      InternalSelectMenu: {
        color: '#2c0045',
        optionColorPending: '#45006f',
        optionTextColor: '#e3d1ff',
        optionTextColorHover: '#ffffff',
        optionColorHover: '#3d0070',
      }
    }
  }
};

</script>
