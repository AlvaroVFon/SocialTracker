import { computed, type Ref } from 'vue'

export interface GithubMenuItem {
  id: string
  label: string
  icon: string
  href?: string
  active?: boolean
  onClick?: () => void
}

export function useGithubMenu(activeSection: Ref<string>) {
  function scrollToSection(sectionId: string) {
    setTimeout(() => {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }

  return computed<GithubMenuItem[]>(() => [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      onClick: () => { activeSection.value = ''; window.scrollTo({ top: 0, behavior: 'smooth' }) },
      active: activeSection.value === '',
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'bar-chart-3',
      onClick: () => { activeSection.value = 'dashboard'; scrollToSection('dashboard') },
      active: activeSection.value === 'dashboard',
    },
    {
      id: 'repos',
      label: 'Repositorios',
      icon: 'book',
      onClick: () => { activeSection.value = 'repos'; scrollToSection('repos') },
      active: activeSection.value === 'repos',
    },
    {
      id: 'commits',
      label: 'Commits',
      icon: 'git-commit',
      onClick: () => { activeSection.value = 'commits'; scrollToSection('commits') },
      active: activeSection.value === 'commits',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'bar-chart-2',
      onClick: () => { activeSection.value = 'analytics'; scrollToSection('analytics') },
      active: activeSection.value === 'analytics',
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: 'activity',
      onClick: () => { activeSection.value = 'monitoring'; scrollToSection('monitoring') },
      active: activeSection.value === 'monitoring',
    },
    {
      id: 'settings',
      label: 'Ajustes',
      icon: 'settings',
      onClick: () => { activeSection.value = 'settings'; scrollToSection('settings') },
      active: activeSection.value === 'settings',
    },
  ])
}
