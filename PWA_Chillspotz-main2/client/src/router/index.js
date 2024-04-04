import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import Cameraview from '../views/CameraView.vue';
import AddView from '../views/AddView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: AboutView,
    },
    {
      path: '/add',
      name: 'add',
      component: Cameraview,
    },
  ],
});

export default router;
