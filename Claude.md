# Scratchie Onboarding Mockup Project

## Project Overview

This is a Next.js 14 onboarding mockup for the Scratchie app, designed to showcase the user onboarding flow with enhanced features and mobile-first design principles.

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with Scratchie brand colors
- **Components**: shadcn/ui component library
- **Design**: Mobile-first with device frames (iPhone/Android)
- **Location**: `/onboarding` subdirectory

## Key Features Implemented

### Enhanced Welcome Experience
- Welcome screen with compelling stats and value propositions
- Goal-based routing system for different user roles (Manager/Worker/Both)
- Mode switching capability for dual-role users

### Industry Sector Selection
- **32 industry sectors** integrated from CSV data into **14 organized categories**
- Two-level sector selection flow:
  1. Category selection (e.g., "Core Industry", "Healthcare", "Construction")
  2. Specific sector selection within chosen category
- **Search functionality** across all sectors for quick discovery
- Comprehensive sector coverage from manufacturing to professional services

### Role-Specific Guidance
- **Tips screens** tailored for both workers and managers
- **Pro benefits screen** highlighting manager upgrade opportunities
- Context-aware content based on selected user role

### Technical Features
- **State persistence** using localStorage for seamless experience
- **Analytics tracking system** for user behavior insights
- **Debug panel** (accessible via `?debug=true`) for development testing
- **Reset demo button** for easy flow restart during testing

## Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.33 | React framework with App Router |
| TypeScript | 4.5.2 | Type safety (upgraded from 3.x for compatibility) |
| Tailwind CSS | Latest | Styling with Scratchie brand colors |
| shadcn/ui | Latest | Pre-built accessible components |
| Framer Motion | Latest | Smooth animations and transitions |
| LocalStorage | Native | Client-side state persistence |

## ⚠️ Known Issues

### CRITICAL BUG: Blank Screen on Core Industry Selection

**Problem**: When users select the "Core Industry" category, they encounter a blank screen instead of the expected sector list.

**Details**:
- The `SectorSpecificScreen` component fails to render sectors properly
- Console logs show the category is received correctly
- Sectors data appears to be available but not displaying
- **This blocks the primary user flow for industrial users**

**Affected Areas**:
- Core Industry category (confirmed)
- Other categories may have similar rendering issues
- Impacts the main onboarding conversion funnel

**Investigation Needed**:
- Check sector data mapping in `/lib/sectors-data.ts`
- Review `SectorSpecificScreen` component rendering logic
- Verify category filtering and display mechanisms

### Additional Issues
- TypeScript/ESLint warnings during build process (currently ignored)
- Build warnings for unused variables and imports

## File Structure

```
onboarding/
├── components/
│   ├── screens/           # Main onboarding screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── GoalScreen.tsx
│   │   ├── SectorCategoryScreen.tsx
│   │   ├── SectorSpecificScreen.tsx  # ⚠️ Contains critical bug
│   │   ├── TipsScreen.tsx
│   │   └── ProBenefitsScreen.tsx
│   └── ui/               # shadcn/ui components
├── lib/
│   └── sectors-data.ts   # Integrated CSV sector data
├── data/
│   └── scratchie-sectors-csv.csv  # Source CSV data
└── app/
    ├── layout.tsx
    └── page.tsx          # Main onboarding flow
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev                # http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

## Testing Instructions

### Basic Testing
1. Visit `http://localhost:3000`
2. Navigate through the onboarding flow
3. Test different user goals (Manager/Worker/Both)

### Debug Mode Testing
1. Add `?debug=true` to the URL
2. Use the debug panel to monitor state changes
3. Check browser console for analytics events
4. Use "Reset Demo" button to restart flow

### Critical Bug Reproduction
1. Start onboarding flow
2. Select any user goal
3. **Select "Core Industry" category**
4. **Observe blank screen** (this is the critical bug)

## Deployment Notes

### Vercel Deployment
- Project is ready for Vercel deployment
- No special environment variables required
- Build warnings are currently ignored

### Production Considerations
- Fix critical sector selection bug before deployment
- Address TypeScript warnings for cleaner builds
- Consider error boundary implementation for better UX

## Analytics Events Tracked

The application tracks various user interactions:
- Screen transitions
- Goal selections
- Sector category choices
- Sector specific selections
- Tips screen engagement
- Pro upgrade interest

Check browser console during testing to see analytics events being fired.

## Next Steps

### Priority 1 (Critical)
- [ ] **Fix Core Industry blank screen bug**
- [ ] Test all sector categories for similar issues
- [ ] Implement error boundaries for graceful failure

### Priority 2 (Important)
- [ ] Resolve TypeScript/ESLint warnings
- [ ] Add comprehensive error handling
- [ ] Optimize mobile responsiveness

### Priority 3 (Nice to Have)
- [ ] Add loading states for better UX
- [ ] Implement offline support
- [ ] Add more comprehensive analytics

---

*Last Updated: 2025-09-25*
*Status: In Development - Critical Bug Blocking*