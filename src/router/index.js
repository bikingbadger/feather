import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/Login.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/Register.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/weight',
    name: 'weight',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "weight" */ '@/components/Weight.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  { path: '*', redirect: '/home' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  // Check required auth guards
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    next();
  }
});

export default router;
