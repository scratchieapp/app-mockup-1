'use client'

import React, { useState } from 'react'
import { ChevronLeft, Search, Building2, Briefcase } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { TOP_CATEGORIES, SECTORS_BY_CATEGORY, SECTORS_DATA } from '@/lib/sectors-data'

interface SectorCategoryScreenProps {
  onBack: () => void
  onSelectCategory: (category: string) => void
  onSkip: () => void
  onSelectSector?: (sector: string) => void // For direct sector selection via search
}

export function SectorCategoryScreen({ onBack, onSelectCategory, onSkip, onSelectSector }: SectorCategoryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllCategories, setShowAllCategories] = useState(false)

  // Search through all sectors
  const searchResults = searchTerm.length > 2
    ? SECTORS_DATA.filter(sector =>
        sector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sector.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sector.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  // Get all categories for "Show All" view
  const allCategories = Object.keys(SECTORS_BY_CATEGORY).map(cat => ({
    id: cat.toLowerCase().replace(/\s+/g, '-'),
    label: cat,
    icon: TOP_CATEGORIES.find(tc => tc.label === cat)?.icon || '🏢',
    sectorCount: SECTORS_BY_CATEGORY[cat].length
  }))

  const displayCategories = showAllCategories ? allCategories : TOP_CATEGORIES

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-2">What industry are you in?</h2>
          <p className="text-gray-600 mb-6">Choose your category or search for your specific sector</p>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search sectors (e.g., construction, mining, retail)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Search results ({searchResults.length})</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {searchResults.map((sector, index) => (
                  <motion.button
                    key={sector.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => onSelectSector?.(sector.name)}
                    className="w-full p-3 bg-gray-50 hover:bg-scratchie-carrot-lighter border border-gray-200 hover:border-scratchie-carrot rounded-lg transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{sector.name}</p>
                        <p className="text-xs text-gray-500">{sector.category}</p>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="border-t mt-4 pt-4" />
            </div>
          )}

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {displayCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onSelectCategory(category.label)}
                className="relative p-5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl hover:border-scratchie-carrot hover:shadow-lg transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{category.label}</p>
                <Badge variant="secondary" className="text-xs">
                  {category.sectorCount} sectors
                </Badge>
              </motion.button>
            ))}
          </div>

          {/* Show All / Show Less Button */}
          {!showAllCategories && allCategories.length > TOP_CATEGORIES.length && (
            <button
              onClick={() => setShowAllCategories(true)}
              className="w-full mb-4 text-scratchie-carrot font-medium text-sm hover:text-scratchie-carrot-light transition-colors flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Show all {allCategories.length} categories
            </button>
          )}

          {showAllCategories && (
            <button
              onClick={() => setShowAllCategories(false)}
              className="w-full mb-4 text-gray-600 font-medium text-sm hover:text-gray-800 transition-colors"
            >
              Show less
            </button>
          )}

          <button
            onClick={onSkip}
            className="w-full text-gray-500 underline text-sm hover:text-gray-700 transition-colors"
          >
            Tell me later
          </button>
        </motion.div>
      </div>

      <div className="flex justify-center pb-8">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  )
}