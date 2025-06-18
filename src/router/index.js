import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/mainpage.vue';
import StatsPage from '../views/statspage.vue';
import SpaceView from "../views/spaceview.vue";

const routes = [
    { path: '/', component: MainPage },
    { path: '/stats', component: StatsPage },
    { path: '/space', component: SpaceView },

];

export default createRouter({
    history: createWebHistory(),
    routes,
});
