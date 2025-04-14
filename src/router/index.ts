import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TokensView from '@/views/TokensView.vue'
import SlotMachineView from '@/views/SlotMachineView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/tokens', component: TokensView },
  { path: '/slot-machine', component: SlotMachineView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;