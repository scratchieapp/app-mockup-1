export interface AnalyticsEvent {
  event: string
  data?: Record<string, any>
  timestamp: number
  screen?: string
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private enabled: boolean = true
  private debug: boolean = typeof window !== 'undefined' &&
    (window.location.search.includes('debug=true') ||
     process.env.NEXT_PUBLIC_APP_ENV === 'development')

  track(event: string, data?: Record<string, any>, screen?: string) {
    if (!this.enabled) return

    const analyticsEvent: AnalyticsEvent = {
      event,
      data,
      timestamp: Date.now(),
      screen
    }

    this.events.push(analyticsEvent)

    if (this.debug) {
      console.log('📊 Analytics Event:', {
        event: analyticsEvent.event,
        data: analyticsEvent.data,
        screen: analyticsEvent.screen,
        timestamp: new Date(analyticsEvent.timestamp).toISOString()
      })
    }

    // In production, this would send to your analytics service
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
      // Send to analytics service
      this.sendToService(analyticsEvent)
    }
  }

  private sendToService(event: AnalyticsEvent) {
    // Placeholder for sending to real analytics service
    // e.g., Google Analytics, Mixpanel, Segment, etc.
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  clearEvents() {
    this.events = []
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  isDebugMode(): boolean {
    return this.debug
  }

  // Convenience methods for common events
  trackOnboardingStarted() {
    this.track('onboarding_started')
  }

  trackGoalSelected(type: 'manager' | 'worker' | 'both') {
    this.track('goal_selected', { type })
  }

  trackSectorCategorySelected(category: string) {
    this.track('sector_category_selected', { category })
  }

  trackSectorSelected(sector: string) {
    this.track('sector_selected', { sector })
  }

  trackSectorSkipped() {
    this.track('sector_skipped')
  }

  trackOnboardingCompleted(duration: number, path: string) {
    this.track('onboarding_completed', { duration, path })
  }

  trackOnboardingAbandoned(step: string, duration: number) {
    this.track('onboarding_abandoned', { step, duration })
  }

  trackModeSwitch(from: 'manager' | 'worker', to: 'manager' | 'worker') {
    this.track('mode_switched', { from, to })
  }

  trackFirstValueAction(type: string, timeToAction: number) {
    this.track('first_value_action', { type, time_to_action: timeToAction })
  }

  trackScreenView(screen: string) {
    this.track('screen_view', { screen }, screen)
  }
}

export const analytics = new Analytics()