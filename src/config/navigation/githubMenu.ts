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
      onClick: () => {
        activeSection.value = ''
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
      active: activeSection.value === '',
    },
    {
      id: 'dashboard',
      label: "kpi's",
      icon: 'bar-chart-3',
      onClick: () => {
        activeSection.value = 'dashboard'
        scrollToSection('dashboard')
      },
      active: activeSection.value === 'dashboard',
    },
    {
      id: 'pullrequests',
      label: 'Pull Requests',
      icon: 'git-pull-request',
      onClick: () => {
        activeSection.value = 'pullrequests'
        scrollToSection('pullrequests')
      },
      active: activeSection.value === 'pullrequests',
    },
    {
      id: 'repos',
      label: 'Repositorios',
      icon: 'book',
      onClick: () => {
        activeSection.value = 'repos'
        scrollToSection('repos')
      },
      active: activeSection.value === 'repos',
    },
  ])
}
