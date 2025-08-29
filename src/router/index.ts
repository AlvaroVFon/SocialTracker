import { createRouter, createWebHistory } from 'vue-router'
import GithubView from '@/views/GithubView.vue'
import LinkedinView from '@/views/LinkedinView.vue'
import TwitterView from '@/views/TwitterView.vue'
import InstagramView from '@/views/InstagramView.vue'

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
      component: GithubView,
    },
    {
      path: '/repos/:id/stats',
      name: 'RepoStats',
      component: () => import('@/views/RepoStatsView.vue'),
      props: true,
    },
    {
      path: '/github/pr/:prNumber/commits',
      name: 'PrCommits',
      component: () => import('@/views/PrCommitsView.vue'),
      props: true,
    },
    {
      path: '/linkedin',
      name: 'LinkedIn',
      component: LinkedinView,
    },
    {
      path: '/twitter',
      name: 'Twitter',
      component: TwitterView,
    },
    {
      path: '/instagram',
      name: 'Instagram',
      component: InstagramView,
    },
    {
      path: '/demo',
      name: 'Demo',
      component: () => import('@/views/DemoView.vue'),
    },
  ],
})

export default router
