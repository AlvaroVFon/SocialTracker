/**
 * Datos mock para las estadísticas de las plataformas
 */
export interface MockStats {
  followers: string
  followersGrowth: string
  engagement: string
  posts: string
}

/**
 * Actividad mock para la sección de monitoring
 */
export interface MockActivity {
  user: string
  content: string
  type: string
  time: string
  sentiment: 'positive' | 'neutral' | 'negative'
}

/**
 * Estadísticas mock por defecto
 */
export const mockStats: MockStats = {
  followers: '12.5K',
  followersGrowth: '8.2',
  engagement: '4.7',
  posts: '23'
}

/**
 * Actividad reciente mock
 */
export const mockRecentActivity: MockActivity[] = [
  {
    user: '@developer_pro',
    content: 'Excelente proyecto! ⭐',
    type: 'Star',
    time: 'Hace 2h',
    sentiment: 'positive'
  },
  {
    user: '@tech_reviewer',
    content: 'Podrían mejorar la documentación',
    type: 'Issue',
    time: 'Hace 4h',
    sentiment: 'neutral'
  },
  {
    user: '@code_master',
    content: 'Increíble trabajo en el último commit!',
    type: 'Comment',
    time: 'Hace 6h',
    sentiment: 'positive'
  }
]
