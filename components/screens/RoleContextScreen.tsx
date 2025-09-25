'use client'

import React from 'react'
import { ChevronLeft, Users, ClipboardCheck, HardHat, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface RoleContextScreenProps {
  onBack: () => void
  onSelectContext: (context: 'manager' | 'worker') => void
}

export function RoleContextScreen({ onBack, onSelectContext }: RoleContextScreenProps) {
  const contexts = [
    {
      id: 'manager' as const,
      icon: ClipboardCheck,
      title: 'Review My Team\'s Work',
      description: 'Check safety observations and reward good behavior',
      tasks: [
        'Review ConvoCards from your team',
        'Give Scratchie awards',
        'Track safety performance',
        'Build team engagement'
      ],
      color: 'bg-scratchie-carrot-lighter',
      iconColor: 'text-scratchie-carrot',
      borderColor: 'hover:border-scratchie-carrot'
    },
    {
      id: 'worker' as const,
      icon: HardHat,
      title: 'Share Something',
      description: 'Document safety wins or hazards with your manager',
      tasks: [
        'Create ConvoCards with photos',
        'Report safety observations',
        'Earn recognition points',
        'Help keep the site safe'
      ],
      color: 'bg-scratchie-cash-lighter',
      iconColor: 'text-scratchie-cash',
      borderColor: 'hover:border-scratchie-cash'
    }
  ]

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Badge variant="outline" className="mb-4">Multiple Roles</Badge>
          <h2 className="text-2xl font-bold mb-2">What would you like to do today?</h2>
          <p className="text-gray-600 mb-8">
            We see you wear multiple hats. Choose what you want to focus on right now.
          </p>

          <div className="space-y-4">
            {contexts.map((context, index) => (
              <motion.div
                key={context.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => onSelectContext(context.id)}
                  variant="outline"
                  className={`w-full h-auto p-6 text-left transition-all group ${context.borderColor}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${context.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <context.icon className={`w-7 h-7 ${context.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{context.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{context.description}</p>

                      <div className="space-y-1.5">
                        {context.tasks.map((task, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            <span className="text-xs text-gray-500">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-scratchie-carrot mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Tip: You can switch modes anytime</p>
                <p className="text-xs text-gray-600">
                  After onboarding, you can easily toggle between manager and worker views from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center pb-8">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  )
}