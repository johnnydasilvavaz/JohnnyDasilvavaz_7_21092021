import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'
import store from '../vuex'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next()
    return
  }
  next('/social-frontend/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  store.dispatch('LOGOUT');
  next('/social-frontend/login')
}

const routes = [
  {
    path: '/',
    redirect: { name: 'Home'}
  },
  {
    path: '/social-frontend/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/social-frontend/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/social-frontend/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/social-frontend/profile/:id',
    name: 'Profile',
    component: Profile,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/social-frontend/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0,0);
  }
})

export default router