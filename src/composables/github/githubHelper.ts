import type { RepoMetrics } from '@/types/repo'

export function getViewsData(metrics: RepoMetrics[] | null) {
  if (!metrics) return []
  return metrics
    .filter((m) => m.type === 'view')
    .map((m) => ({ date: m.timestamp, views: m.count, uniques: m.uniques }))
}

export function getClonesData(metrics: RepoMetrics[] | null) {
  if (!metrics) return []
  return metrics
    .filter((m) => m.type === 'clone')
    .map((m) => ({ date: m.timestamp, clones: m.count, uniques: m.uniques }))
}
