'use client'

import { OnboardingFlow } from '@/components/OnboardingFlow'
import { useParams } from 'next/navigation'

export default function OnboardingPage() {
  const params = useParams()
  const step = params?.step?.[0] || 'welcome'

  return <OnboardingFlow initialStep={step as string} />
}