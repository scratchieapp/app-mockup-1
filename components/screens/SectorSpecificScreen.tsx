'use client'

import React from 'react'
import { ChevronLeft, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Import the sector data directly
import { SECTORS_DATA } from '@/lib/sectors-data'

interface SectorSpecificScreenProps {
  category: string
  onBack: () => void
  onSelectSector: (sector: string) => void
}

export function SectorSpecificScreen({ category, onBack, onSelectSector }: SectorSpecificScreenProps) {
  // Filter sectors by category
  const sectorsInCategory = SECTORS_DATA.filter(sector => {
    return sector.category === category
  })

  // Get icon for this category
  const categoryIcons: Record<string, string> = {
    "Core Industry": "🏗️",
    "Hospitality": "🍔",
    "Healthcare": "🏥",
    "Transportation": "🚚",
    "Professional Services": "💼",
    "Infrastructure": "⚡"
  }

  const categoryIcon = categoryIcons[category] || '🏢'

  if (sectorsInCategory.length === 0) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b flex items-center">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="ml-3 flex items-center gap-2">
            <span className="text-xl">{categoryIcon}</span>
            <span className="text-sm text-gray-600 font-medium">{category}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-gray-500 mb-4">No sectors found for {category}</p>
            <Button onClick={onBack}>Go Back</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b flex items-center">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="ml-3 flex items-center gap-2">
          <span className="text-xl">{categoryIcon}</span>
          <span className="text-sm text-gray-600 font-medium">{category}</span>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-2">Select your specific sector</h2>
          <p className="text-gray-600 mb-6">
            {sectorsInCategory.length} {sectorsInCategory.length === 1 ? 'option' : 'options'} in {category}
          </p>

          <div className="space-y-3">
            {sectorsInCategory.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  onClick={() => onSelectSector(sector.name)}
                  variant="outline"
                  className="w-full justify-start h-auto py-4 px-4 text-left hover:bg-scratchie-carrot-lighter hover:border-scratchie-carrot transition-all group"
                >
                  <div className="w-full">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-base">{sector.name}</span>
                      {sector.employeeModel.includes('Mixed') && (
                        <Badge variant="secondary" className="text-xs">Mixed</Badge>
                      )}
                      {sector.employeeModel.includes('Vendor') && (
                        <Badge variant="carrot-light" className="text-xs">Vendor</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 group-hover:text-gray-700">
                      {sector.description}
                    </p>
                    <div className="flex items-start gap-2">
                      <Info className="w-3 h-3 text-scratchie-carrot mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-500 group-hover:text-gray-600">
                        {sector.keyUseCases}
                      </p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center pb-8">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  )
}