'use client'

import React, { useState, useMemo } from 'react'
import { ChevronLeft, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORY_INFO, searchSectors } from '@/lib/sectors-data'

interface SectorCategoryScreenProps {
  onBack: () => void
  onSelectCategory: (category: string) => void
  onSkip: () => void
  onSelectSector: (sector: string) => void
}

export function SectorCategoryScreen({
  onBack,
  onSelectCategory,
  onSkip,
  onSelectSector
}: SectorCategoryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []
    return searchSectors(searchTerm)
  }, [searchTerm])

  const handleSearchSelect = (sectorName: string) => {
    onSelectSector(sectorName)
  }

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
          <h2 className="text-2xl font-bold mb-2">What industry are you in?</h2>
          <p className="text-gray-600 mb-6">
            Select your industry to get tailored safety content
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for your sector (e.g., construction, trucking, QSR)"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowSearch(true)
              }}
              onFocus={() => setShowSearch(true)}
              className="pl-10 pr-4 h-12"
            />
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {showSearch && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <p className="text-sm text-gray-500 mb-3">
                  Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {searchResults.map((sector) => (
                    <Button
                      key={sector.name}
                      onClick={() => handleSearchSelect(sector.name)}
                      variant="outline"
                      className="w-full justify-start h-auto py-3 px-4 text-left hover:bg-scratchie-carrot-lighter hover:border-scratchie-carrot"
                    >
                      <div>
                        <div className="font-medium">{sector.name}</div>
                        <div className="text-xs text-gray-500">{sector.category} • {sector.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Grid */}
          {(!showSearch || searchResults.length === 0) && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {CATEGORY_INFO.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button
                      onClick={() => onSelectCategory(category.id)}
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center justify-center gap-2 hover:bg-scratchie-carrot-lighter hover:border-scratchie-carrot transition-all group"
                    >
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <span className="font-medium text-xs text-center">{category.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Category Descriptions */}
              <div className="space-y-2 mb-6">
                <p className="text-xs font-semibold text-gray-700 mb-2">Quick Guide:</p>
                {CATEGORY_INFO.map((category) => (
                  <div key={category.id} className="flex items-start gap-2">
                    <span className="text-sm">{category.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">{category.label}:</span> {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popular Sectors */}
              <div className="pt-4 border-t">
                <p className="text-xs font-semibold text-gray-700 mb-3">Popular Sectors:</p>
                <div className="flex flex-wrap gap-2">
                  {['Construction', 'Quick Service Restaurants', 'Trucking & Logistics', 'Healthcare', 'Corporate Offices'].map((sector) => (
                    <Badge
                      key={sector}
                      variant="secondary"
                      className="cursor-pointer hover:bg-scratchie-carrot-lighter"
                      onClick={() => setSearchTerm(sector)}
                    >
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Skip Option */}
      <div className="px-6 pb-6">
        <button
          onClick={onSkip}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
        >
          Skip for now
        </button>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center pb-8">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  )
}