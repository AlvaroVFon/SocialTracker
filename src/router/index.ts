import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import MonitoringView from '@/views/MonitoringView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/github',
    },
    {
      path: '/github',
      name: 'GitHub',
      component: DashboardView,
    },
    {
      path: '/linkedin',
      name: 'LinkedIn',
      component: AnalyticsView,
    },
    {
      path: '/twitter',
      name: 'Twitter',
      component: MonitoringView,
    },
    {
      path: '/instagram',
      name: 'Instagram',
      component: SettingsView,
    },
  ],
})

export default router
