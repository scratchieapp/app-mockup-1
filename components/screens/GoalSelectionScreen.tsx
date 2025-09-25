'use client'

import React from 'react'
import { ChevronLeft, Award, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { UserGoal } from '@/lib/constants'

interface GoalSelectionScreenProps {
  onBack: () => void
  onSelectGoal: (goal: UserGoal) => void
}

export function GoalSelectionScreen({ onBack, onSelectGoal }: GoalSelectionScreenProps) {
  const goals = [
    {
      id: 'manager' as UserGoal,
      icon: Award,
      title: 'Run safety rewards and review team work',
      subtitle: 'For managers and supervisors',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
      iconBg: 'bg-blue-100',
      iconHoverBg: 'group-hover:bg-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'worker' as UserGoal,
      icon: CheckCircle,
      title: 'Share my safety wins and get recognised',
      subtitle: 'For workers and team members',
      color: 'green',
      bgColor: 'bg-scratchie-cash-lighter',
      borderColor: 'border-scratchie-cash-light',
      hoverBorder: 'hover:border-scratchie-cash',
      iconBg: 'bg-scratchie-cash-light',
      iconHoverBg: 'group-hover:bg-scratchie-cash',
      iconColor: 'text-scratchie-cash'
    },
    {
      id: 'both' as UserGoal,
      icon: Users,
      title: 'Both - I wear multiple hats',
      subtitle: 'Switch between modes anytime',
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-400',
      iconBg: 'bg-purple-100',
      iconHoverBg: 'group-hover:bg-purple-200',
      iconColor: 'text-purple-600'
    }
  ]

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-2">What would you like to do today?</h2>
          <p className="text-gray-600 mb-8">Choose your primary focus. You can always switch later.</p>

          <div className="space-y-4">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => onSelectGoal(goal.id)}
                  className={`w-full p-6 ${goal.bgColor} border-2 ${goal.borderColor} rounded-2xl ${goal.hoverBorder} transition-all text-left group hover:shadow-md`}
                >
                  <div className="flex items-start">
                    <div className={`${goal.iconBg} p-3 rounded-xl ${goal.iconHoverBg} transition-all`}>
                      <goal.icon className={`w-8 h-8 ${goal.iconColor}`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-lg mb-1">{goal.title}</h3>
                      <p className="text-sm text-gray-600">{goal.subtitle}</p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center pb-8">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  )
}