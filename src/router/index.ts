import { createRouter, createWebHistory } from 'vue-router';

// Import các component
import HomePage from '../views/Homepage.vue';
import AuthorPage from '../views/Author.vue';
import Flights from '../views/Flights.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/author',
    component: AuthorPage,
  },
  {
    path: '/flights',
    component: Flights,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Sử dụng chế độ history
  routes,
});

export default router;
