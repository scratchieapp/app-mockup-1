'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Trophy, Users, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onGetStarted: () => void
  onSkip: () => void
}

export function WelcomeScreen({ onGetStarted, onSkip }: WelcomeScreenProps) {
  const features = [
    {
      icon: Shield,
      text: "Reward safe behaviour instantly"
    },
    {
      icon: Trophy,
      text: "Get recognised for great work"
    },
    {
      icon: Users,
      text: "Build a positive safety culture"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-gradient-to-br from-scratchie-carrot via-scratchie-carrot to-scratchie-carrot-light"
    >
      {/* Hero Section */}
      <div className="flex-1 flex flex-col px-6 pt-16 pb-8">
        {/* Logo and Branding */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Image
              src="/square-transparent-carrot.svg"
              alt="Scratchie Logo"
              width={56}
              height={56}
            />
          </div>
          <Image
            src="/scratchie-logo-white.svg"
            alt="Scratchie"
            width={160}
            height={25}
            className="mx-auto mb-3"
          />
          <p className="text-white/90 text-lg font-medium">
            Safety that rewards
          </p>
        </motion.div>

        {/* Value Props */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1 flex flex-col justify-center space-y-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-medium flex-1">{feature.text}</p>
              <Sparkles className="w-4 h-4 text-white/60" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-2xl font-bold text-white">100K+</p>
            <p className="text-xs text-white/80">Workers</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-xs text-white/80">Companies</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-2xl font-bold text-white">$2M+</p>
            <p className="text-xs text-white/80">Rewards</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="space-y-3"
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="w-full bg-white text-scratchie-carrot hover:bg-gray-100 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group h-14"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <button
            onClick={onSkip}
            className="w-full text-white/70 text-sm py-2 hover:text-white transition-colors"
          >
            I'll explore on my own
          </button>
        </motion.div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center pb-6">
        <div className="flex gap-2">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0 }}
            className="w-2.5 h-2.5 bg-white rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
            className="w-2.5 h-2.5 bg-white/40 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
            className="w-2.5 h-2.5 bg-white/40 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
            className="w-2.5 h-2.5 bg-white/40 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}