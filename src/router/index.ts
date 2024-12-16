import { createRouter, createWebHistory } from 'vue-router';

// Import các component
import HomePage from '../views/Homepage.vue';
import AuthorPage from '../views/Author.vue';
import Flights from '../views/Flights.vue';
import Admin from '../views/Admin.vue';

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
  },
  {
    path: '/admin',
    component: Admin,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Sử dụng chế độ history
  routes,
  scrollBehavior(to, from, savedPosition) {

    return { top: 0 }

  },
});

export default router;
