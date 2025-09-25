import { OnboardingState } from './constants'

const STORAGE_KEY = 'scratchie_onboarding'
const SESSION_KEY = 'scratchie_onboarding_session'

export class Storage {
  static saveState(state: Partial<OnboardingState>) {
    if (typeof window === 'undefined') return

    try {
      const existing = this.getState()
      const updated = { ...existing, ...state }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save onboarding state:', error)
    }
  }

  static getState(): Partial<OnboardingState> | null {
    if (typeof window === 'undefined') return null

    try {
      // Try session storage first (for current session)
      const sessionData = sessionStorage.getItem(SESSION_KEY)
      if (sessionData) {
        return JSON.parse(sessionData)
      }

      // Fall back to local storage (for returning users)
      const localData = localStorage.getItem(STORAGE_KEY)
      if (localData) {
        return JSON.parse(localData)
      }
    } catch (error) {
      console.error('Failed to load onboarding state:', error)
    }

    return null
  }

  static clearState() {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(SESSION_KEY)
    } catch (error) {
      console.error('Failed to clear onboarding state:', error)
    }
  }

  static hasCompletedOnboarding(): boolean {
    const state = this.getState()
    return !!state?.completedAt
  }

  static getLastScreen(): string | null {
    const state = this.getState()
    return state?.currentScreen || null
  }

  static saveUserPreferences(preferences: {
    goal?: string
    sector?: string
    category?: string
    mode?: string
  }) {
    if (typeof window === 'undefined') return

    try {
      const key = 'scratchie_user_preferences'
      const existing = localStorage.getItem(key)
      const current = existing ? JSON.parse(existing) : {}
      const updated = { ...current, ...preferences, updatedAt: Date.now() }
      localStorage.setItem(key, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save user preferences:', error)
    }
  }

  static getUserPreferences() {
    if (typeof window === 'undefined') return null

    try {
      const key = 'scratchie_user_preferences'
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to load user preferences:', error)
      return null
    }
  }
}