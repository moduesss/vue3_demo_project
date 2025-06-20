import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import router from './router';
import store from './store';
import naive from 'naive-ui'

const app = createApp(App);
app.use(router).use(naive).use(store);

store.dispatch('loadTasks').then(() => {
    app.mount('#app');
});
