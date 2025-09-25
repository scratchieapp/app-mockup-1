# Testing Checklist for Scratchie Onboarding Mockup

## 🎯 Core Functionality Testing

### Navigation & Routing
- [ ] All screens accessible via direct URL
- [ ] Browser back button works correctly
- [ ] Forward navigation follows logical flow
- [ ] URL updates when navigating between screens
- [ ] Deep linking works (e.g., `/onboarding/manager-dashboard`)

### State Management
- [ ] State persists across page refresh
- [ ] LocalStorage saves user selections
- [ ] Session recovery works after browser restart
- [ ] Reset button clears all state completely
- [ ] Mode switching preserves other selections

### User Paths

#### Manager Path
- [ ] Welcome → Goal (Manager) → Sector Category → Specific Sector → Manager Dashboard
- [ ] Manager dashboard shows correct features
- [ ] "Set Up First Award" button responds
- [ ] "Invite Team" button responds
- [ ] Stats display correctly

#### Worker Path
- [ ] Welcome → Goal (Worker) → Sector Category → Specific Sector → Worker Dashboard
- [ ] Worker dashboard shows correct features
- [ ] Card type buttons respond
- [ ] "Take Photo" button responds
- [ ] Points display correctly

#### Dual Mode Path
- [ ] Welcome → Goal (Both) → Sector → Worker Dashboard (default)
- [ ] Mode toggle button appears
- [ ] Can switch between Manager and Worker views
- [ ] Mode switch is tracked in analytics

### Skip Flows
- [ ] "I'll explore on my own" leads to Worker dashboard
- [ ] "Tell me later" skips sector selection
- [ ] Skip actions are tracked in analytics

## 📱 Mobile Experience

### Touch Targets
- [ ] All buttons meet 48x48px minimum size
- [ ] Adequate spacing between interactive elements
- [ ] No accidental taps on adjacent elements
- [ ] Comfortable one-handed operation

### Visual Design
- [ ] Text readable in bright sunlight (high contrast)
- [ ] Minimum 16px font size maintained
- [ ] Colors meet 7:1 contrast ratio
- [ ] Visual feedback on all interactions

### Device Testing
- [ ] iPhone SE (smallest screen)
- [ ] iPhone 14 Pro
- [ ] iPad
- [ ] Android phones
- [ ] Desktop browsers

## 🎨 UI Components

### Buttons
- [ ] Hover states work
- [ ] Active/pressed states visible
- [ ] Disabled states when applicable
- [ ] Brand color variants display correctly

### Cards
- [ ] Shadow effects render properly
- [ ] Content fits within boundaries
- [ ] Responsive to screen size

### Forms
- [ ] Search input functions correctly
- [ ] Keyboard appears on mobile
- [ ] Input focus states visible
- [ ] Placeholder text helpful

### Animations
- [ ] Screen transitions smooth (300ms)
- [ ] No janky animations
- [ ] Reduced motion respects system settings
- [ ] Loading states where needed

## 📊 Analytics & Debug

### Analytics Events
- [ ] `onboarding_started` fires on first load
- [ ] `goal_selected` tracks correct choice
- [ ] `sector_category_selected` records selection
- [ ] `sector_selected` captures final choice
- [ ] `sector_skipped` when skipping
- [ ] `onboarding_completed` with duration
- [ ] `mode_switched` for dual users
- [ ] `screen_view` for each screen

### Debug Panel (`?debug=true`)
- [ ] Opens when URL parameter present
- [ ] Shows current state accurately
- [ ] Analytics events list updates
- [ ] Quick navigation buttons work
- [ ] Close button functions

## 🚀 Performance

### Load Times
- [ ] Initial load <3 seconds on 3G
- [ ] Subsequent navigation instant
- [ ] Images load quickly
- [ ] No layout shifts

### Optimization
- [ ] Bundle size reasonable
- [ ] Code splitting working
- [ ] Images optimized
- [ ] Fonts load efficiently

## 🌐 Browser Compatibility

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Samsung Internet

## ♿ Accessibility

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals
- [ ] Focus indicators visible

### Screen Readers
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] ARIA labels where needed
- [ ] Semantic HTML used

### Visual Accessibility
- [ ] Works without color alone
- [ ] Text scalable to 200%
- [ ] Focus indicators clear
- [ ] Error states announced

## 🐛 Edge Cases

### Error Handling
- [ ] Works offline after initial load
- [ ] Handles localStorage disabled
- [ ] Graceful degradation without JS
- [ ] No console errors in production

### Data Validation
- [ ] Empty sector search handled
- [ ] Special characters in search
- [ ] Rapid clicking doesn't break flow
- [ ] Multiple tab/window behavior

## 🎯 User Testing Scenarios

### Scenario 1: Construction Manager
1. Start fresh (clear cache)
2. Select "Manager" goal
3. Choose "Construction & Infrastructure"
4. Select "Commercial Construction"
5. Verify manager dashboard appears
6. Test "Set Up First Award"

### Scenario 2: Healthcare Worker
1. Start fresh
2. Select "Worker" goal
3. Choose "Healthcare & Services"
4. Select "Hospitals"
5. Verify worker dashboard appears
6. Test creating different card types

### Scenario 3: Dual Role User
1. Start fresh
2. Select "Both" goal
3. Complete sector selection
4. Test switching between modes
5. Verify state persists
6. Refresh and check recovery

### Scenario 4: Impatient User
1. Start fresh
2. Click "I'll explore on my own"
3. Verify goes to worker dashboard
4. Check no sector is set

### Scenario 5: Returning User
1. Complete onboarding
2. Close browser completely
3. Reopen and navigate to site
4. Verify returns to last screen
5. Test reset functionality

## 📝 Test Results Template

```
Date: ___________
Tester: ___________
Device: ___________
Browser: ___________

Issues Found:
1. ___________
2. ___________
3. ___________

Performance Metrics:
- Load time: _____
- Time to complete: _____
- Lighthouse score: _____

Notes:
___________
```

## 🚦 Launch Readiness

### Must Have (P0)
- [ ] All core paths work
- [ ] Mobile experience smooth
- [ ] Analytics tracking functional
- [ ] Reset capability works
- [ ] No console errors

### Should Have (P1)
- [ ] Debug panel functional
- [ ] All animations smooth
- [ ] Offline mode works
- [ ] Accessibility standards met

### Nice to Have (P2)
- [ ] Perfect Lighthouse scores
- [ ] Works on all browsers
- [ ] Advanced analytics
- [ ] A/B test ready

## 📊 Acceptance Criteria

The mockup is ready for stakeholder review when:
1. ✅ All P0 items checked
2. ✅ Tested on 3+ devices
3. ✅ 5 user scenarios pass
4. ✅ Load time <3 seconds
5. ✅ No critical bugs
6. ✅ Analytics working
7. ✅ Documentation complete