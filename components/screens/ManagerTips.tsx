'use client'

import React, { useState } from 'react'
import { Award, Users, TrendingUp, Zap, ArrowRight, ChevronLeft, ChevronRight, Crown, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'

interface ManagerTipsProps {
  onContinue: () => void
  onGoPro: () => void
  sector?: string
}

export function ManagerTips({ onContinue, onGoPro, sector }: ManagerTipsProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [showProBenefits, setShowProBenefits] = useState(false)

  const tips = [
    {
      icon: Award,
      title: "Give Your First Scratchie Award",
      description: "Instant rewards for safe behaviour",
      steps: [
        "Spot good safety behaviour",
        "Tap 'Give Scratchie' button",
        "Select the worker",
        "Watch them win instantly!"
      ],
      color: "bg-scratchie-carrot-lighter",
      iconColor: "text-scratchie-carrot"
    },
    {
      icon: Users,
      title: "Review Team Convo Cards",
      description: "Stay connected with your team's safety",
      steps: [
        "Check daily for new cards",
        "Acknowledge good observations",
        "Address hazards quickly",
        "Build engagement through feedback"
      ],
      color: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Track Safety Performance",
      description: "Data-driven safety improvements",
      steps: [
        "Monitor participation rates",
        "Identify safety trends",
        "Celebrate team wins",
        "Report to management easily"
      ],
      color: "bg-scratchie-cash-lighter",
      iconColor: "text-scratchie-cash"
    }
  ]

  const proBenefits = [
    { icon: "💰", text: "Unlimited Scratchie awards" },
    { icon: "📊", text: "Advanced analytics dashboard" },
    { icon: "🎯", text: "Custom award categories" },
    { icon: "📱", text: "White-label branding" },
    { icon: "🏆", text: "Leaderboards & competitions" },
    { icon: "📈", text: "ROI & safety metrics" },
    { icon: "🎓", text: "Training modules" },
    { icon: "🤝", text: "Dedicated support" }
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

  if (showProBenefits) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-scratchie-carrot-lighter via-white to-scratchie-cash-lighter">
        {/* Pro Benefits Header */}
        <div className="px-6 pt-12 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-scratchie-carrot to-scratchie-cash rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <Badge variant="carrot" className="mb-4">RECOMMENDED</Badge>
            <h1 className="text-2xl font-bold mb-2">Upgrade to Scratchie Pro</h1>
            <p className="text-gray-600">
              Unlock the full power of safety gamification
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="flex-1 px-6 overflow-y-auto">
          <div className="grid gap-3">
            {proBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{benefit.icon}</div>
                    <p className="text-sm font-medium flex-1">{benefit.text}</p>
                    <Check className="w-5 h-5 text-scratchie-cash" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* ROI Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Card className="p-4 bg-gradient-to-r from-scratchie-carrot to-scratchie-carrot-light text-white border-0">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">5x ROI</p>
                <p className="text-sm opacity-90">Average return on investment</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <div className="px-6 pb-8 pt-6 space-y-3">
          <Button
            onClick={onGoPro}
            size="lg"
            className="w-full bg-gradient-to-r from-scratchie-carrot to-scratchie-cash hover:opacity-90 text-white font-semibold group"
          >
            Start Free Trial
            <Zap className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
          </Button>
          <Button
            onClick={() => setShowProBenefits(false)}
            variant="ghost"
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    )
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
          <Badge variant="outline" className="mb-4">Manager Guide</Badge>
          <h1 className="text-2xl font-bold mb-2">Welcome, Manager!</h1>
          <p className="text-gray-600">
            {sector ? `Let's set up Scratchie for ${sector}` : "Let's get your team engaged"}
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

              <div className="space-y-3">
                {tip.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </motion.div>
                ))}
              </div>
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
                    ? 'w-8 bg-blue-600'
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
      <div className="px-6 pb-8 pt-6 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => setShowProBenefits(true)}
            variant="carrot"
            size="lg"
            className="w-full group"
          >
            <Crown className="w-5 h-5 mr-2" />
            See Pro Benefits
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            onClick={onContinue}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Start with Free Plan
          </Button>

          <p className="text-center text-xs text-gray-500 mt-3">
            Pro includes unlimited awards and advanced features
          </p>
        </motion.div>
      </div>
    </div>
  )
}