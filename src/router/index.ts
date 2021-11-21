import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../screens/Home.vue'
import About from '../screens/About.vue'
import Records from '../screens/Records.vue'
import Game from '../screens/Game.vue'
import GameOptions from '../screens/GameOptions.vue'
import GamePost from '../screens/GamePost.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/records',
    name: 'Records',
    component: Records
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/game-options',
    name: 'GameOptions',
    component: GameOptions
  },
  {
    path: '/game-post',
    name: 'GamePost',
    component: GamePost
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
