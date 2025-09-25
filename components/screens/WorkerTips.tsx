'use client'

import React, { useState } from 'react'
import { Camera, MessageSquare, Trophy, Star, ArrowRight, ChevronLeft, ChevronRight, Shield, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'

interface WorkerTipsProps {
  onContinue: () => void
  sector?: string
}

export function WorkerTips({ onContinue, sector }: WorkerTipsProps) {
  const [currentTip, setCurrentTip] = useState(0)

  // Industry-specific examples
  const getSectorExample = () => {
    const examples: Record<string, { good: string, hazard: string, points: string }> = {
      'Construction': {
        good: 'proper scaffold setup',
        hazard: 'missing edge protection',
        points: '500 points for fall hazards'
      },
      'Mining': {
        good: 'correct isolation procedures',
        hazard: 'damaged equipment',
        points: '750 points for equipment issues'
      },
      'Healthcare': {
        good: 'PPE compliance',
        hazard: 'blocked emergency exit',
        points: '400 points for safety observations'
      },
      'Manufacturing': {
        good: 'proper lockout/tagout',
        hazard: 'oil spill on floor',
        points: '500 points for hazard reports'
      },
      'Retail': {
        good: 'safe ladder use',
        hazard: 'wet floor without sign',
        points: '300 points per card'
      },
      'Quick Service Restaurants': {
        good: 'proper lifting technique',
        hazard: 'blocked fire exit',
        points: '250 points per observation'
      },
      'Transport': {
        good: 'vehicle inspection completed',
        hazard: 'unsecured load',
        points: '600 points for vehicle safety'
      },
      'Agriculture': {
        good: 'chemical storage compliance',
        hazard: 'damaged safety guard',
        points: '500 points for farm safety'
      }
    }
    return examples[sector || ''] || {
      good: 'safe work practices',
      hazard: 'potential hazards',
      points: '500 points per card'
    }
  }

  const sectorExamples = getSectorExample()

  const tips = [
    {
      icon: Camera,
      title: "Create Your First ConvoCard",
      description: `Share what you see in ${sector || 'your workplace'}`,
      steps: [
        "Open the Scratchie app",
        "Tap the camera button (big orange circle)",
        `Take a photo of ${sectorExamples.good} or ${sectorExamples.hazard}`,
        "Choose: 'Good Work' or 'Hazard Alert'",
        "Add a quick description (voice or text)",
        "Hit 'Share' - instant points!"
      ],
      proTip: `First card bonus: 1000 points! Regular cards earn ${sectorExamples.points}`,
      color: "bg-scratchie-cash-lighter",
      iconColor: "text-scratchie-cash",
      reward: "🎯 50 bonus points on first card!"
    },
    {
      icon: Shield,
      title: "What Makes a Great ConvoCard",
      description: "Quality beats quantity - every time",
      steps: [
        "Clear photo showing the issue/good work",
        "Brief but specific description",
        "Location details (where exactly?)",
        "Suggest a fix for hazards",
        "Tag relevant team members",
        "Follow up if action needed"
      ],
      proTip: "Great ConvoCards get manager recognition + bonus Scratchies!",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      examples: {
        good: [
          `"${sectorExamples.good} - Team followed all procedures"`,
          `"Fixed ${sectorExamples.hazard} before shift start"`
        ],
        bad: [
          '"Unsafe" (too vague)',
          '"Same as yesterday" (no context)'
        ]
      }
    },
    {
      icon: TrendingUp,
      title: "Build Your Safety Score",
      description: "Turn observations into rewards",
      steps: [
        "Create 3 ConvoCards per week minimum",
        "Mix positive observations and hazards",
        "Check your dashboard for points balance",
        "Redeem points in the rewards store",
        "Compete in team challenges",
        "Earn manager recognition"
      ],
      proTip: `Top performers in ${sector || 'your sector'} average 12 ConvoCards/month and earn $50+ in rewards!`,
      color: "bg-scratchie-yellow",
      iconColor: "text-yellow-700",
      rewards: [
        "Gift cards",
        "Charity donations",
        "Extra break time",
        "Premium parking",
        "Team lunch vouchers"
      ]
    }
  ]

  const nextTip = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1)
    }
  }

  const prevTip = () => {
    if (currentTip > 0) {
      setCurrentTip(currentTip - 1)
    }
  }

  const tip = tips[currentTip]

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="cash" className="mb-4">Worker Quick Start</Badge>
          <h1 className="text-2xl font-bold mb-2">Master ConvoCards!</h1>
          <p className="text-gray-600">
            {sector ? `Safety communication for ${sector}` : "Share safety, earn rewards"}
          </p>
        </motion.div>
      </div>

      {/* Tip Carousel */}
      <div className="flex-1 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 shadow-lg border-0">
              <div className={`w-16 h-16 ${tip.color} rounded-2xl flex items-center justify-center mb-4`}>
                <tip.icon className={`w-8 h-8 ${tip.iconColor}`} />
              </div>

              <h2 className="text-xl font-bold mb-2">{tip.title}</h2>
              <p className="text-gray-600 mb-6">{tip.description}</p>

              <div className="space-y-3 mb-6">
                {tip.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-scratchie-cash-lighter rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-scratchie-cash">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </motion.div>
                ))}
              </div>

              {/* Special content based on tip */}
              {tip.examples && (
                <div className="mb-6 space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs font-semibold text-green-800 mb-2">✅ GOOD EXAMPLES:</p>
                    {tip.examples.good.map((example, i) => (
                      <p key={i} className="text-xs text-green-700">{example}</p>
                    ))}
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-xs font-semibold text-red-800 mb-2">❌ AVOID:</p>
                    {tip.examples.bad.map((example, i) => (
                      <p key={i} className="text-xs text-red-700">{example}</p>
                    ))}
                  </div>
                </div>
              )}

              {tip.rewards && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-700 mb-2">REWARDS YOU CAN EARN:</p>
                  <div className="flex flex-wrap gap-2">
                    {tip.rewards.map((reward, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {reward}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Pro Tip Box */}
              <div className="p-3 bg-scratchie-yellow rounded-lg">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-700 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-yellow-900 mb-1">PRO TIP</p>
                    <p className="text-xs text-yellow-800">{tip.proTip}</p>
                  </div>
                </div>
              </div>

              {tip.reward && (
                <div className="mt-4 p-3 bg-gradient-to-r from-scratchie-cash-lighter to-scratchie-cash-light rounded-lg">
                  <p className="text-sm font-semibold text-scratchie-cash text-center">
                    {tip.reward}
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevTip}
            disabled={currentTip === 0}
            className={`p-2 rounded-lg ${
              currentTip === 0
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentTip
                    ? 'w-8 bg-scratchie-cash'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTip}
            disabled={currentTip === tips.length - 1}
            className={`p-2 rounded-lg ${
              currentTip === tips.length - 1
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 pb-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {currentTip === tips.length - 1 ? (
            <Button
              onClick={onContinue}
              variant="cash"
              size="lg"
              className="w-full group"
            >
              Create My First ConvoCard
              <Camera className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
          ) : (
            <Button
              onClick={nextTip}
              variant="cash"
              size="lg"
              className="w-full group"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}

          <p className="text-center text-xs text-gray-500 mt-3">
            {currentTip === 0
              ? "You'll earn 1000 bonus points for your first ConvoCard!"
              : currentTip === tips.length - 1
              ? "Takes less than 30 seconds to create a ConvoCard"
              : `Tip ${currentTip + 1} of ${tips.length}`
            }
          </p>
        </motion.div>
      </div>
    </div>
  )
}