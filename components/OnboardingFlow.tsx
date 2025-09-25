'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { MobileFrame } from './MobileFrame'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { GoalSelectionScreen } from './screens/GoalSelectionScreen'
import { SectorCategoryScreen } from './screens/SectorCategoryScreen'
import { SectorSpecificScreen } from './screens/SectorSpecificScreen'
import { WorkerTips } from './screens/WorkerTips'
import { ManagerTips } from './screens/ManagerTips'
import { ManagerDashboard } from './screens/ManagerDashboard'
import { WorkerDashboard } from './screens/WorkerDashboard'
import { DebugPanel } from './DebugPanel'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import {
  Screen,
  UserGoal,
  UserMode,
} from '@/lib/constants'
import { analytics } from '@/lib/analytics'
import { Storage } from '@/lib/storage'

interface OnboardingFlowProps {
  initialStep?: string
}

export function OnboardingFlow({ initialStep }: OnboardingFlowProps) {
  const router = useRouter()
  const [state, setState] = useState<any>({
    currentScreen: (initialStep as Screen) || 'welcome',
    userGoal: null,
    selectedCategory: null,
    selectedSector: null,
    userMode: 'worker',
    searchTerm: '',
    startedAt: Date.now(),
    analytics: []
  })

  const [showDebug, setShowDebug] = useState(false)
  const [deviceType, setDeviceType] = useState<'iphone' | 'android' | 'frameless'>('iphone')

  // Load saved state on mount
  useEffect(() => {
    const savedState = Storage.getState()
    if (savedState && savedState.currentScreen) {
      setState((prev: any) => ({ ...prev, ...savedState }))
    }

    // Check for debug mode
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('debug') === 'true') {
      setShowDebug(true)
    }

    // Track onboarding started
    if (!savedState) {
      analytics.trackOnboardingStarted()
    }
  }, [])

  // Update URL when screen changes
  useEffect(() => {
    router.push(`/onboarding/${state.currentScreen}`, { scroll: false })
    analytics.trackScreenView(state.currentScreen)
  }, [state.currentScreen, router])

  // Save state changes separately to avoid conflicts
  useEffect(() => {
    // Only save if we have meaningful state data
    if (state.currentScreen !== 'welcome' || state.userGoal || state.selectedCategory || state.selectedSector) {
      Storage.saveState(state)
    }
  }, [state])

  const updateScreen = (screen: Screen) => {
    setState((prev: any) => ({ ...prev, currentScreen: screen }))
  }

  const handleGoalSelect = (goal: UserGoal) => {
    analytics.trackGoalSelected(goal)
    setState((prev: any) => ({
      ...prev,
      userGoal: goal,
      userMode: goal === 'both' ? 'worker' : goal,
      currentScreen: 'sector-category'
    }))
    Storage.saveUserPreferences({ goal })
  }

  const handleCategorySelect = (category: string) => {
    analytics.trackSectorCategorySelected(category)
    setState((prev: any) => ({
      ...prev,
      selectedCategory: category,
      currentScreen: 'sector-specific'
    }))
    Storage.saveUserPreferences({ category })
  }

  const handleSectorSelect = (sector: string) => {
    analytics.trackSectorSelected(sector)
    // Navigate to tips screens before dashboard
    const nextScreen = state.userMode === 'manager' ? 'manager-tips' : 'worker-tips'
    setState((prev: any) => ({
      ...prev,
      selectedSector: sector,
      currentScreen: nextScreen,
    }))
    Storage.saveUserPreferences({ sector })
  }

  const handleDirectSectorSelect = (sector: string) => {
    // Direct selection from search
    analytics.trackSectorSelected(sector)
    const nextScreen = state.userMode === 'manager' ? 'manager-tips' : 'worker-tips'
    setState((prev: any) => ({
      ...prev,
      selectedSector: sector,
      selectedCategory: null, // Skip category since they searched
      currentScreen: nextScreen,
    }))
    Storage.saveUserPreferences({ sector })
  }

  const handleSkipSector = () => {
    analytics.trackSectorSkipped()
    const nextScreen = state.userMode === 'manager' ? 'manager-tips' : 'worker-tips'
    setState((prev: any) => ({
      ...prev,
      currentScreen: nextScreen
    }))
  }

  const toggleMode = () => {
    const newMode: UserMode = state.userMode === 'worker' ? 'manager' : 'worker'
    analytics.trackModeSwitch(state.userMode, newMode)
    setState((prev: any) => ({
      ...prev,
      userMode: newMode,
      currentScreen: newMode === 'manager' ? 'manager-dashboard' : 'worker-dashboard'
    }))
    Storage.saveUserPreferences({ mode: newMode })
  }

  const handleBack = () => {
    const backMap: Record<Screen, Screen> = {
      'welcome': 'welcome',
      'goal': 'welcome',
      'sector-category': 'goal',
      'sector-specific': 'sector-category',
      'worker-tips': 'sector-specific',
      'manager-tips': 'sector-specific',
      'manager-dashboard': 'manager-tips',
      'worker-dashboard': 'worker-tips'
    }
    updateScreen(backMap[state.currentScreen])
  }

  const handleTipsContinue = () => {
    const dashboard = state.userMode === 'manager' ? 'manager-dashboard' : 'worker-dashboard'
    setState((prev: any) => ({
      ...prev,
      currentScreen: dashboard,
      completedAt: Date.now()
    }))

    // Track completion
    const duration = Date.now() - state.startedAt
    analytics.trackOnboardingCompleted(duration, `${state.userGoal}-${state.selectedSector || 'no-sector'}`)
  }

  const handleGoPro = () => {
    analytics.track('pro_upgrade_clicked', { screen: 'manager-tips' })
    console.log('Opening Pro upgrade flow...')
    // In real app, this would navigate to payment/upgrade screen
  }

  const resetOnboarding = () => {
    Storage.clearState()
    analytics.clearEvents()
    setState({
      currentScreen: 'welcome',
      userGoal: null,
      selectedCategory: null,
      selectedSector: null,
      userMode: 'worker',
      searchTerm: '',
      startedAt: Date.now(),
      analytics: []
    })
    analytics.trackOnboardingStarted()
  }

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onGetStarted={() => updateScreen('goal')}
            onSkip={() => {
              analytics.trackSectorSkipped()
              updateScreen('worker-tips')
            }}
          />
        )

      case 'goal':
        return (
          <GoalSelectionScreen
            onBack={handleBack}
            onSelectGoal={handleGoalSelect}
          />
        )

      case 'sector-category':
        return (
          <SectorCategoryScreen
            onBack={handleBack}
            onSelectCategory={handleCategorySelect}
            onSkip={handleSkipSector}
            onSelectSector={handleDirectSectorSelect}
          />
        )

      case 'sector-specific':

        // If we don't have a category but we're on this screen, try to get it from preferences
        let category = state.selectedCategory
        if (!category) {
          const preferences = Storage.getUserPreferences()
          category = preferences?.category
          if (category) {
            // Update state to include the recovered category
            setState((prev: any) => ({ ...prev, selectedCategory: category }))
          }
        }

        return category ? (
          <SectorSpecificScreen
            category={category}
            onBack={handleBack}
            onSelectSector={handleSectorSelect}
          />
        ) : (
          <div className="p-8 text-center">
            <p>No category selected</p>
            <p>State: {JSON.stringify(state)}</p>
            <Button onClick={handleBack} className="mt-4">Go Back</Button>
          </div>
        )

      case 'worker-tips':
        return (
          <WorkerTips
            onContinue={handleTipsContinue}
            sector={state.selectedSector}
          />
        )

      case 'manager-tips':
        return (
          <ManagerTips
            onContinue={handleTipsContinue}
            onGoPro={handleGoPro}
            sector={state.selectedSector}
          />
        )

      case 'manager-dashboard':
        return (
          <ManagerDashboard
            sector={state.selectedSector}
            canToggle={state.userGoal === 'both'}
            onToggleMode={toggleMode}
            onSetupAward={() => {
              analytics.trackFirstValueAction('setup_award', Date.now() - state.startedAt)
              console.log('Setting up award...')
            }}
            onInviteTeam={() => {
              analytics.trackFirstValueAction('invite_team', Date.now() - state.startedAt)
              console.log('Inviting team...')
            }}
          />
        )

      case 'worker-dashboard':
        return (
          <WorkerDashboard
            sector={state.selectedSector}
            canToggle={state.userGoal === 'both'}
            onToggleMode={toggleMode}
            onCreateCard={(type) => {
              analytics.trackFirstValueAction(`create_card_${type}`, Date.now() - state.startedAt)
              console.log(`Creating ${type} card...`)
            }}
            onTakePhoto={() => {
              analytics.trackFirstValueAction('take_photo', Date.now() - state.startedAt)
              console.log('Taking photo...')
            }}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <MobileFrame deviceType={deviceType} showStatusBar={true}>
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentScreen}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </MobileFrame>

      {/* Reset Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={resetOnboarding}
          variant="outline"
          size="sm"
          className="shadow-lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Demo
        </Button>
      </div>

      {/* Device Type Selector */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={() => setDeviceType('iphone')}
          variant={deviceType === 'iphone' ? 'default' : 'outline'}
          size="sm"
        >
          iPhone
        </Button>
        <Button
          onClick={() => setDeviceType('android')}
          variant={deviceType === 'android' ? 'default' : 'outline'}
          size="sm"
        >
          Android
        </Button>
        <Button
          onClick={() => setDeviceType('frameless')}
          variant={deviceType === 'frameless' ? 'default' : 'outline'}
          size="sm"
        >
          No Frame
        </Button>
      </div>

      {/* Debug Panel */}
      {showDebug && (
        <DebugPanel
          state={state}
          analytics={analytics.getEvents()}
          onClose={() => setShowDebug(false)}
        />
      )}
    </>
  )
}