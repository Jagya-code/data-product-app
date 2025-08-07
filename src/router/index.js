// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import TableView from '@/views/TableView.vue'
import ERView from '@/views/ERView.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/tables', component: TableView },
  { path: '/diagram', component: ERView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
