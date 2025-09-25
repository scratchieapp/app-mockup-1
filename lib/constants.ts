export const PRIMARY_CATEGORIES = [
  { id: 'construction', label: 'Construction & Infrastructure', icon: '🏗️' },
  { id: 'manufacturing', label: 'Manufacturing & Industrial', icon: '🏭' },
  { id: 'healthcare', label: 'Healthcare & Services', icon: '🏥' },
  { id: 'resources', label: 'Resources & Energy', icon: '⚡' },
  { id: 'transport', label: 'Transportation & Logistics', icon: '🚚' },
  { id: 'other', label: 'Other Industries', icon: '🏢' }
] as const

export const SECTORS_BY_CATEGORY = {
  construction: [
    'Commercial Construction',
    'Residential Building',
    'Civil & Infrastructure',
    'Specialist Trades',
    'Mining Construction',
    'Demolition'
  ],
  manufacturing: [
    'Food & Beverage',
    'Automotive',
    'Electronics',
    'Pharmaceuticals',
    'Textiles',
    'Chemicals'
  ],
  healthcare: [
    'Hospitals',
    'Aged Care',
    'Medical Practices',
    'Dental Services',
    'Allied Health',
    'Pathology'
  ],
  resources: [
    'Mining',
    'Oil & Gas',
    'Renewable Energy',
    'Utilities',
    'Waste Management',
    'Water Treatment'
  ],
  transport: [
    'Road Transport',
    'Rail',
    'Aviation',
    'Maritime',
    'Warehousing',
    'Courier Services'
  ],
  other: [
    'Quick Service Restaurants',
    'Retail',
    'Agriculture',
    'Education',
    'Government',
    'Professional Services'
  ]
} as const

export type UserGoal = 'manager' | 'worker' | 'both'
export type UserMode = 'manager' | 'worker'
export type CategoryId = keyof typeof SECTORS_BY_CATEGORY
export type Screen = 'welcome' | 'goal' | 'role-context' | 'sector-category' | 'sector-specific' | 'worker-tips' | 'manager-tips' | 'manager-dashboard' | 'worker-dashboard'

export interface OnboardingState {
  currentScreen: Screen
  userGoal: UserGoal | null
  selectedCategory: CategoryId | null
  selectedSector: string | null
  userMode: UserMode
  searchTerm: string
  completedAt?: number
  startedAt: number
  analytics: any[]
}