import { createRouter, createWebHistory } from 'vue-router';

// Import các component
import Home from '../views/Homepage.vue';
import Author from '../views/Author.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/author',
    component: Author,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Sử dụng chế độ history
  routes,
});

export default router;
