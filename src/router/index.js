import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/Categories.vue'
import Movies from '../views/Movies.vue'

import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, props: true, meta: { auth: true}},
  { path: '/categories', name: 'Categories', component: Categories, meta: { auth: true}},
  { path: '/movies', name: 'Movies', component: Movies, meta: { auth: true}},

  { path: '/login', name: 'Login', component: Login, meta: { auth: false}},
  { path: '/register', name: 'Register', component: Register, meta: { auth: false}}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');
  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/login');
    return
  }
  if ((to.name === 'Login' || to.name === 'Register') && loggedIn){
    next('/');
    return
  }
  next();
});

export default router
