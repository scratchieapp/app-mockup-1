'use client'

import React, { useState } from 'react'
import { Camera, MessageSquare, Trophy, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
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

  const tips = [
    {
      icon: Camera,
      title: "Create Your First Convo Card",
      description: "Share safety wins and hazards with photos",
      steps: [
        "Tap the camera button",
        "Take a photo of good work or a hazard",
        "Add a quick description",
        "Earn points instantly!"
      ],
      color: "bg-scratchie-cash-lighter",
      iconColor: "text-scratchie-cash"
    },
    {
      icon: Trophy,
      title: "Earn Recognition & Rewards",
      description: "Get noticed for your safety efforts",
      steps: [
        "Create Convo Cards regularly",
        "Get recognised by managers",
        "Earn points for each card",
        "Redeem rewards with your points"
      ],
      color: "bg-scratchie-yellow",
      iconColor: "text-yellow-700"
    },
    {
      icon: Star,
      title: "Build Your Safety Score",
      description: "Track your contribution to site safety",
      steps: [
        "Quality beats quantity",
        "Share diverse observations",
        "Help teammates stay safe",
        "Watch your score grow"
      ],
      color: "bg-scratchie-blue",
      iconColor: "text-blue-600"
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
          <Badge variant="cash" className="mb-4">Quick Start Guide</Badge>
          <h1 className="text-2xl font-bold mb-2">Welcome to Scratchie!</h1>
          <p className="text-gray-600">
            {sector ? `Here's how to get started in ${sector}` : "Here's how to get started"}
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
                    <div className="w-6 h-6 bg-scratchie-carrot-lighter rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-scratchie-carrot">{index + 1}</span>
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
                    ? 'w-8 bg-scratchie-carrot'
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
          <Button
            onClick={onContinue}
            variant="cash"
            size="lg"
            className="w-full group"
          >
            Let's Create Your First Card
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-center text-xs text-gray-500 mt-3">
            You'll earn 50 bonus points for your first Convo Card!
          </p>
        </motion.div>
      </div>
    </div>
  )
}