'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface MobileFrameProps {
  children: React.ReactNode
  className?: string
  deviceType?: 'iphone' | 'android' | 'frameless'
  showStatusBar?: boolean
}

export function MobileFrame({
  children,
  className,
  deviceType = 'iphone',
  showStatusBar = true
}: MobileFrameProps) {
  const renderStatusBar = () => {
    if (!showStatusBar) return null

    return (
      <div className="flex items-center justify-between px-6 py-1 text-xs">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H2v1.5h1.15L3 10.72zm17.95.3c.8 0 1.48-.55 1.69-1.3H24v-1.5h-1.16c-.21-.75-.9-1.3-1.69-1.3-.52 0-.98.24-1.28.6l-2.7-1.56.86-1.49 1.3.75.85-1.48L15.3 8.95l.85-1.48L14.85 6l-.85 1.48-2.05-1.19V4.5h2v-1.5h-4v1.5h2v1.79l-2.05 1.19L9.05 6 7.75 7.48l.85 1.48L3.85 12l.85 1.48 1.3-.75.86 1.49-2.7 1.56c-.3-.36-.76-.6-1.28-.6-.8 0-1.48.55-1.69 1.3H0v1.5h1.16c.21.75.9 1.3 1.69 1.3.52 0 .98-.24 1.28-.6l2.7 1.56-.86 1.49-1.3-.75-.85 1.48 4.86 2.8.85-1.48-1.3-.75.86-1.49L12 19.73v1.77h-2V23h4v-1.5h-2v-1.77l2.05-1.19.85 1.48 1.3.75.85-1.48-4.86-2.8-.85 1.48 1.3.75-.86 1.49-2.7-1.56c.3-.36.76-.6 1.28-.6z"/>
          </svg>
          <svg className="w-4 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2-2v8a2 2 0 002 2h14a2 2 0 002-2V7l2 2V2h-6v4.24L12 3 1 9zm3 3v6h16V9L12 4 4 9z"/>
          </svg>
          <svg className="w-6 h-3" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="7" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="4" y="9" width="14" height="8" fill="currentColor"/>
            <rect x="22" y="10" width="2" height="6" rx="1" fill="currentColor"/>
          </svg>
        </div>
      </div>
    )
  }

  if (deviceType === 'frameless') {
    return (
      <div className={cn(
        "w-full max-w-md mx-auto",
        className
      )}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4",
      className
    )}>
      <div className="w-full max-w-md">
        {deviceType === 'iphone' ? (
          <div className="relative">
            {/* iPhone frame */}
            <div className="bg-black rounded-[3rem] p-3 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

              {/* Screen */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden relative" style={{ minHeight: '812px' }}>
                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 z-20 bg-white text-black">
                  {renderStatusBar()}
                </div>

                {/* Content */}
                <div className="h-full pt-8">
                  {children}
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full" />
          </div>
        ) : (
          <div className="relative">
            {/* Android frame */}
            <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
              {/* Screen */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{ minHeight: '812px' }}>
                {/* Status bar */}
                <div className="bg-white text-black">
                  {renderStatusBar()}
                </div>

                {/* Content */}
                <div className="h-full">
                  {children}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-8">
              <div className="w-6 h-6 rounded-full bg-gray-600" />
              <div className="w-6 h-6 rounded bg-gray-600" />
              <div className="w-6 h-6 bg-gray-600" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}