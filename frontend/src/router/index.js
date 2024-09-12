import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import(/* webpackChunkName: "callback" */ '../views/LoginCallback.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.name === 'home') {
    return next();
  }

  if (to.name === 'callback') {
    return next();
  }

  const token = localStorage.getItem('jwt_token');

  if (!token) {
    return next({ name: 'home' });
  }

  if (token) {
    return next();
  } else {
    return next({ name: 'home' });
  }
});

export default router;