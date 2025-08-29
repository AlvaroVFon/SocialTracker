import type { RepoTotals } from '@/types/repo'

interface StatCardData extends RepoTotals {
  title: string
  iconName: string
}

export function getGithubDashboardCards(totals: StatCardData | RepoTotals) {
  return [
    {
      title: 'Vistas Totales',
      value: totals.total_views ?? 0,
      color: 'blue',
    },
    {
      title: 'Clones Totales',
      value: `${totals.total_clones ?? 0}`,
      color: 'green',
    },
    {
      title: 'Vistas Únicas',
      value: `${totals.total_unique_views ?? 0}`,
      color: 'purple',
    },
    {
      title: 'Clones Únicos',
      value: `${totals.total_unique_clones ?? 0}`,
      color: 'orange',
    },
  ]
}
