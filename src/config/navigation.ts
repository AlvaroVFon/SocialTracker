export interface NavigationTab {
  name: string
  label: string
  to: string
  iconName?: string
  platform: string
  brandColor: string
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
    brandColor: '#24292e'
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    to: '/linkedin',
    iconName: 'linkedin',
    platform: 'linkedin',
    brandColor: '#0A66C2'
  },
  {
    name: 'twitter',
    label: 'Twitter',
    to: '/twitter',
    iconName: 'twitter',
    platform: 'twitter',
    brandColor: '#1DA1F2'
  },
  {
    name: 'instagram',
    label: 'Instagram',
    to: '/instagram',
    iconName: 'instagram',
    platform: 'instagram',
    brandColor: '#E4405F'
  }
]

export const sections: Section[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'bar-chart-3' },
  { id: 'analytics', label: 'Analytics', icon: 'trending-up' },
  { id: 'monitoring', label: 'Monitoring', icon: 'monitor' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]
