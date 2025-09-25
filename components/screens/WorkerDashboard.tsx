'use client'

import React from 'react'
import { Menu, Camera, ToggleLeft, ToggleRight, Trophy, AlertTriangle, Sparkles, FileText, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface WorkerDashboardProps {
  sector: string | null
  canToggle: boolean
  onToggleMode: () => void
  onCreateCard: (type: string) => void
  onTakePhoto: () => void
}

export function WorkerDashboard({
  sector,
  canToggle,
  onToggleMode,
  onCreateCard,
  onTakePhoto
}: WorkerDashboardProps) {
  const cardTypes = [
    { id: 'hazard', icon: '⚠️', label: 'Report Hazard', color: 'bg-scratchie-carrot-lighter border-scratchie-carrot-light' },
    { id: 'great-work', icon: '✨', label: 'Great Work', color: 'bg-scratchie-cash-lighter border-scratchie-cash-light' },
    { id: 'toolbox', icon: '📝', label: 'Toolbox Talk', color: 'bg-blue-50 border-blue-200' },
    { id: 'custom', icon: '💬', label: 'Custom', color: 'bg-purple-50 border-purple-200' }
  ]

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-scratchie-cash text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <Menu className="w-6 h-6" />
          {canToggle && (
            <button
              onClick={onToggleMode}
              className="flex items-center bg-green-700 px-3 py-1.5 rounded-full hover:bg-green-800 transition-colors"
            >
              <span className="text-xs mr-2 font-medium">Worker Mode</span>
              <ToggleLeft className="w-5 h-5" />
            </button>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-1">G'day!</h1>
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
              <CardTitle className="text-lg">Create a Convo Card</CardTitle>
              <CardDescription>Share your safety win or report a hazard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {cardTypes.map((type, index) => (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => onCreateCard(type.id)}
                    className={`p-4 ${type.color} border rounded-xl hover:shadow-sm transition-all hover:scale-105`}
                  >
                    <span className="text-2xl mb-2 block">{type.icon}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </motion.button>
                ))}
              </div>

              <Button
                onClick={onTakePhoto}
                variant="cash"
                className="w-full"
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo & Create Card
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Your Points</h3>
                <span className="text-2xl font-bold text-scratchie-cash">0</span>
              </div>
              <p className="text-sm text-gray-500">Create cards to earn points!</p>
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Level</span>
                  <Badge variant="cash-light">Rookie</Badge>
                </div>
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
              <CardTitle className="text-lg flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-scratchie-yellow" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm">Start creating cards to unlock achievements!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}