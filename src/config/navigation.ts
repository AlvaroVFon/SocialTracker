export interface NavigationTab {
  name: string
  label: string
  to: string
  iconName?: string
  platform: string
}

export interface Section {
  id: string
  label: string
  icon: string
}

export const navigationTabs: NavigationTab[] = [
  {
    name: 'github',
    label: 'GitHub',
    to: '/github',
    iconName: 'github',
    platform: 'github',
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    to: '/linkedin',
    iconName: 'linkedin',
    platform: 'linkedin',
  },
  {
    name: 'twitter',
    label: 'Twitter',
    to: '/twitter',
    iconName: 'twitter',
    platform: 'twitter',
  },
  {
    name: 'instagram',
    label: 'Instagram',
    to: '/instagram',
    iconName: 'instagram',
    platform: 'instagram',
  },
]

export const sections: Section[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'bar-chart-3' },
  { id: 'analytics', label: 'Analytics', icon: 'trending-up' },
  { id: 'monitoring', label: 'Monitoring', icon: 'monitor' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]
