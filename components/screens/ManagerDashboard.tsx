'use client'

import React from 'react'
import { Menu, Award, Users, ToggleLeft, ToggleRight, Plus, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { motion } from 'framer-motion'

interface ManagerDashboardProps {
  sector: string | null
  canToggle: boolean
  onToggleMode: () => void
  onSetupAward: () => void
  onInviteTeam: () => void
}

export function ManagerDashboard({
  sector,
  canToggle,
  onToggleMode,
  onSetupAward,
  onInviteTeam
}: ManagerDashboardProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <Menu className="w-6 h-6" />
          {canToggle && (
            <button
              onClick={onToggleMode}
              className="flex items-center bg-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-800 transition-colors"
            >
              <span className="text-xs mr-2 font-medium">Manager Mode</span>
              <ToggleRight className="w-5 h-5" />
            </button>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-1">Welcome, Manager!</h1>
          <p className="opacity-90">{sector || 'Your Industry'}</p>
        </motion.div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Scratchie Awards Game</CardTitle>
                <Award className="w-6 h-6 text-scratchie-yellow" />
              </div>
              <CardDescription>Run instant rewards for safe behaviour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active Awards</span>
                  <Badge variant="cash">0 Active</Badge>
                </div>
                <Button
                  onClick={onSetupAward}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Set Up First Award
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Convo Cards to Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-3 font-medium">No cards to review yet</p>
                <p className="text-sm text-gray-400 mb-4">Your team will share their safety wins here</p>
                <Button
                  onClick={onInviteTeam}
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Invite Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-scratchie-cash-lighter rounded-lg">
                  <p className="text-2xl font-bold text-scratchie-cash">0</p>
                  <p className="text-xs text-gray-600">Team Members</p>
                </div>
                <div className="text-center p-4 bg-scratchie-carrot-lighter rounded-lg">
                  <p className="text-2xl font-bold text-scratchie-carrot">0</p>
                  <p className="text-xs text-gray-600">Cards Reviewed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}