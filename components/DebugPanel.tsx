'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { OnboardingState } from '@/lib/constants'
import { AnalyticsEvent } from '@/lib/analytics'

interface DebugPanelProps {
  state: OnboardingState
  analytics: AnalyticsEvent[]
  onClose: () => void
}

export function DebugPanel({ state, analytics, onClose }: DebugPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Debug Panel</CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-6">
            {/* Current State */}
            <div>
              <h3 className="font-semibold mb-3">Current State</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Screen:</span>
                  <Badge variant="carrot">{state.currentScreen}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Goal:</span>
                  <span className="font-medium">{state.userGoal || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode:</span>
                  <Badge variant="cash">{state.userMode}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{state.selectedCategory || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sector:</span>
                  <span className="font-medium">{state.selectedSector || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Duration:</span>
                  <span className="font-medium">
                    {Math.round((Date.now() - state.startedAt) / 1000)}s
                  </span>
                </div>
              </div>
            </div>

            {/* Analytics Events */}
            <div>
              <h3 className="font-semibold mb-3">Analytics Events ({analytics.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {analytics.map((event, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg text-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">{event.event}</span>
                        {event.data && (
                          <div className="text-xs text-gray-600 mt-1">
                            {JSON.stringify(event.data)}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h3 className="font-semibold mb-3">Quick Navigation</h3>
              <div className="flex flex-wrap gap-2">
                {['welcome', 'goal', 'sector-category', 'sector-specific', 'manager-dashboard', 'worker-dashboard'].map(screen => (
                  <Button
                    key={screen}
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/onboarding/${screen}?debug=true`}
                  >
                    {screen}
                  </Button>
                ))}
              </div>
            </div>

            {/* URL Parameters */}
            <div>
              <h3 className="font-semibold mb-3">Test URLs</h3>
              <div className="space-y-1 text-xs font-mono">
                <div className="p-2 bg-gray-100 rounded">/onboarding?debug=true</div>
                <div className="p-2 bg-gray-100 rounded">/onboarding/manager-dashboard?debug=true</div>
                <div className="p-2 bg-gray-100 rounded">/onboarding/worker-dashboard?debug=true</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}