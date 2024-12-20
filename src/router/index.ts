import { createRouter, createWebHistory } from 'vue-router';

// Import các component
import HomePage from '../views/Homepage.vue';
import AuthorPage from '../views/Author.vue';
import Flights from '../views/Flights.vue';
import Admin from '../views/Admin.vue';
import AdminPlanes from '../views/AdminPlanes.vue';
import FlightStatus from '../views/FlightStatus.vue'
import AdminFlights from '../views/AdminFlights.vue';
import AdminAdvertisement from '../views/AdminAdvertisement.vue';
import Profile from '../views/Profile.vue';
import ProfileFlights from '../views/ProfileFlights.vue';
import ProfileInformation from '../views/ProfileInformation.vue';

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
    children: [
      {
        path: '',
        component: AdminFlights,
      },
      {
        path: 'planes',
        component: AdminPlanes,
      },
      {
        path: 'advertisement',
        component: AdminAdvertisement,
      }
    ],
  },
  {
    path: '/status',
    component: FlightStatus,
  },
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        path: '',
        component: ProfileInformation,
      },
      {
        path: 'myflights',
        component: ProfileFlights,
      },
    ],
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
