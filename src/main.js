import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import router from './router';
import naive from 'naive-ui'

createApp(App)
    .use(router)
    .use(naive)
    .mount('#app')

