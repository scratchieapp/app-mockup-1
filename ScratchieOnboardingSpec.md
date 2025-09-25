# Scratchie Release 3 - Onboarding Implementation Specification

## Executive Summary
This document outlines the implementation requirements for Scratchie's new user onboarding flow, addressing the critical UX problem where users don't know what to do after downloading the app. The solution implements progressive disclosure, goal-based routing, and mobile-first design patterns.

## Core Requirements

### User Flows
- **Single codebase** serving both managers and workers
- **Goal-based routing** instead of role selection
- **Progressive sector identification** from 31 available sectors
- **Mode switching** capability for dual-role users
- **Mobile-first design** optimised for field conditions

## Technical Implementation

### 1. Entry Point Detection
```
ON app_first_launch:
  IF user_has_existing_account:
    SKIP to main_app with stored preferences
  ELSE:
    SHOW welcome_screen
```

### 2. Welcome Screen (Screen 1)
**Content:**
- App logo and tagline
- Value proposition: "Reward safe work. Get noticed."
- Single CTA button: "Get Started"
- Skip link: "I'll explore on my own" (bottom, de-emphasised)

**Technical Requirements:**
- Animate logo entrance (fade in, 300ms)
- Pre-load next screen assets
- Track: `onboarding_started` event

### 3. Goal Selection Screen (Screen 2)
**Content:**
```
"What would you like to do today?"

□ Run safety rewards and review team work
  (for managers and supervisors)
  
□ Share my safety wins and get recognised
  (for workers and team members)
  
□ Both - I wear multiple hats
  (switches between modes)
```

**Technical Requirements:**
- Large touch targets: 48x48px minimum
- Visual feedback on selection (immediate highlight)
- Store selection in `user_primary_goal`
- Route logic:
  - Option 1 → Manager path
  - Option 2 → Worker path  
  - Option 3 → Worker path (default) with mode switch enabled

**Analytics:**
- Track: `goal_selected: {type: 'manager'|'worker'|'both'}`

### 4. Sector Selection Screen (Screen 3)

#### Phase 1: Broad Categories
**Display 6 primary categories:**
```
const PRIMARY_CATEGORIES = [
  { id: 'construction', label: 'Construction & Infrastructure', icon: '🏗️' },
  { id: 'manufacturing', label: 'Manufacturing & Industrial', icon: '🏭' },
  { id: 'healthcare', label: 'Healthcare & Services', icon: '🏥' },
  { id: 'resources', label: 'Resources & Energy', icon: '⚡' },
  { id: 'transport', label: 'Transportation & Logistics', icon: '🚚' },
  { id: 'other', label: 'Other Industries', icon: '🏢' }
];
```

**Features:**
- Search bar at top: "Search for your industry"
- "Tell me later" link at bottom
- Loading state while fetching sub-categories

#### Phase 2: Specific Sectors
**After primary selection, show relevant sub-sectors:**
```
// Example for Construction & Infrastructure
const CONSTRUCTION_SECTORS = [
  'Commercial Construction',
  'Residential Building',
  'Civil & Infrastructure', 
  'Specialist Trades',
  'Mining & Resources',
  'Demolition'
];
```

**Technical Requirements:**
- Implement search with fuzzy matching
- Cache sector mappings locally
- Allow back navigation to broad categories
- Store: `user_sector` and `user_sector_category`

### 5. Value Delivery Screens

#### 5A. Manager Path
**Screen: Award Game Introduction**
- Show interactive demo of Scratchie award
- Display 2-3 example Convo Cards to review
- CTA: "Set up your first award" or "Review team cards"

**Empty State:**
```
"No Convo Cards to review yet"
"Your team will share their safety wins here"
[Invite Team] button
```

#### 5B. Worker Path  
**Screen: Create First Convo Card**
- Template options:
  - "Report a hazard"
  - "Share great work"
  - "Record toolbox talk"
  - "Custom message"
- Camera/photo upload prominent
- Text input with voice-to-text option

**Success State:**
```
"Great! Your manager will be notified"
"You'll earn points when they review it"
```

### 6. Mode Switching (Dual Users)

**Header Implementation:**
```jsx
<Header>
  <ModeSwitcher>
    <Toggle 
      leftLabel="Worker" 
      rightLabel="Manager"
      current={userMode}
      onChange={switchMode}
    />
  </ModeSwitcher>
</Header>
```

**Requirements:**
- Persist last selected mode
- Visual transition between modes (slide animation)
- Different navigation menus per mode
- Track mode switches: `mode_switched: {from, to}`

## Mobile-First Design Specifications

### Touch Targets
- **Minimum:** 44x44px (11mm)
- **Preferred:** 48x48px for primary actions
- **Spacing:** 8px minimum between targets

### Field Conditions Optimisation
- **Contrast ratio:** 7:1 minimum
- **Font sizes:** 16px minimum body text
- **Dark mode:** Auto-detect and manual toggle
- **Offline capability:** Cache onboarding flow
- **One-handed reach:** Primary actions in bottom 40% of screen

### Performance Requirements
- **Screen load time:** <500ms
- **Interaction feedback:** <100ms
- **Total onboarding time:** <2 minutes
- **Offline functionality:** Core features available

## Data Storage

### Local Storage
```javascript
{
  onboarding_completed: boolean,
  user_goal: 'manager' | 'worker' | 'both',
  user_sector: string,
  user_mode: 'manager' | 'worker',
  onboarding_step: number,
  skip_count: number
}
```

### Backend Sync
```javascript
POST /api/user/onboarding
{
  user_id: string,
  goal: string,
  sector: string,
  initial_mode: string,
  completed_at: timestamp,
  device_info: object
}
```

## Analytics Events

### Required Tracking
1. `onboarding_started`
2. `goal_selected: {type}`
3. `sector_category_selected: {category}`
4. `sector_selected: {sector}`
5. `sector_skipped`
6. `onboarding_completed: {duration, path}`
7. `onboarding_abandoned: {step, duration}`
8. `mode_switched: {from, to}`
9. `first_value_action: {type, time_to_action}`

### Success Metrics
- **Completion rate:** Target >30% (vs 19.2% industry average)
- **Time to completion:** Target <2 minutes
- **Time to first value action:** Target <3 minutes
- **Sector selection rate:** Target >70%
- **Mode switch usage:** Track for dual users

## Progressive Feature Disclosure

### Initial Features (Day 1)
**Manager:**
- Award game setup
- Review Convo Cards
- Basic team view

**Worker:**
- Create Convo Card
- View points balance
- See recent recognitions

### Unlocked Features (Based on Usage)
**After 3 cards reviewed (Manager):**
- Team analytics
- Award customisation
- Bulk actions

**After 5 cards created (Worker):**
- Advanced templates
- Team leaderboard
- Achievement badges

## Error Handling

### Network Issues
- Cache onboarding state locally
- Allow offline progression
- Sync when connection restored
- Show clear offline indicator

### Selection Errors
- Validate all inputs client-side
- Provide clear error messages
- Allow easy correction
- Never lose user progress

## A/B Testing Considerations

### Test Variants
1. **Goal question wording:** "What would you like to do?" vs "What's your main focus?"
2. **Sector selection:** Progressive vs flat list vs search-first
3. **Skip options:** Visibility and wording
4. **Mode switching:** Toggle vs dropdown vs separate button

### Measurement
- Track variant assignment
- Compare completion rates
- Monitor time-to-value
- Assess long-term retention

## Implementation Timeline

### Phase 1 (Week 1-2)
- Welcome and goal selection screens
- Basic routing logic
- Analytics foundation

### Phase 2 (Week 3-4)
- Sector selection with search
- Progressive narrowing
- Skip functionality

### Phase 3 (Week 5-6)
- Manager/worker specific screens
- Mode switching
- Polish and animations

### Phase 4 (Week 7-8)
- Testing and refinement
- A/B test setup
- Performance optimisation

## Accessibility Requirements

- **WCAG 2.1 AA compliance**
- **Screen reader support**
- **Voice control compatibility**
- **Colour blind safe palettes**
- **Text scaling support (up to 200%)**
- **Reduced motion options**

## Platform-Specific Considerations

### iOS
- Respect Safe Areas
- Support Dynamic Type
- Implement haptic feedback
- Handle Face ID interruptions

### Android
- Support back button navigation
- Handle diverse screen sizes
- Implement Material Design patterns
- Support gesture navigation

## Support & Fallback

### Help Options
- Contextual help icons on each screen
- "Contact Support" always accessible
- FAQ link in settings
- Video tutorials (optional)

### Fallback Flows
- If sector selection fails → Default to "General"
- If goal unclear → Show both interfaces
- If onboarding abandoned → Gentle re-engagement
- If network issues → Offline mode with sync

## Quality Assurance Checklist

- [ ] All touch targets meet size requirements
- [ ] Onboarding completable in <2 minutes
- [ ] Works offline after initial load
- [ ] Mode switching preserves context
- [ ] Analytics firing correctly
- [ ] Accessibility standards met
- [ ] Performance targets achieved
- [ ] Error states handled gracefully
- [ ] Cross-platform consistency
- [ ] Help options accessible

## Post-Launch Monitoring

### Week 1
- Monitor completion rates hourly
- Track drop-off points
- Gather initial feedback
- Fix critical issues

### Week 2-4
- Analyse behaviour patterns
- Refine sector categorisation
- Optimise slow screens
- Begin A/B tests

### Month 2+
- Implement learnings
- Add progressive features
- Expand sector coverage
- Iterate based on data