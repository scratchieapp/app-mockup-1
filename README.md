# Scratchie Onboarding Mockup

An interactive demonstration of Scratchie's new user onboarding flow, built with Next.js 14, TypeScript, and shadcn/ui components.

## 🎯 Purpose

This mockup addresses the critical UX problem where new users don't know what to do after downloading the Scratchie app. It demonstrates a goal-based onboarding flow that serves both managers and workers across 31 industry sectors.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📱 Features

### Core Functionality
- **Goal-based routing** - Users select their primary role (Manager/Worker/Both)
- **Progressive sector identification** - 6 categories → 31 specific sectors
- **Mode switching** - Dual-role users can switch between Manager and Worker views
- **State persistence** - Progress saved to localStorage
- **Analytics tracking** - Comprehensive event tracking (console-based)
- **Mobile-first design** - Optimized for field conditions

### Interactive Elements
- **Device frames** - iPhone, Android, or frameless views
- **Reset button** - Quickly restart the onboarding flow
- **Debug panel** - Access with `?debug=true` URL parameter
- **Shareable URLs** - Each screen has its own URL for testing
- **Smooth animations** - Framer Motion for polished transitions

## 🎨 Design System

### Brand Colors
- **Carrot Orange**: #F97115 (Primary)
- **Cash Green**: #4DB360 (Secondary)
- **Yellow**: #FDFBA9 (Accent)
- **Blue**: #B6E2FF (Info)

### Components
All UI components are built with shadcn/ui and customized with Scratchie brand colors:
- Buttons with brand variants
- Cards for content sections
- Badges for status indicators
- Progress indicators
- Switch toggles for mode switching
- Input fields with proper touch targets

## 🧪 Testing

### Debug Mode
Add `?debug=true` to any URL to enable the debug panel:
- View current state
- See analytics events
- Quick navigation between screens
- Test different user paths

### Direct Screen Access
```
/onboarding/welcome
/onboarding/goal
/onboarding/sector-category
/onboarding/sector-specific
/onboarding/manager-dashboard
/onboarding/worker-dashboard
```

### URL Parameters
- `?debug=true` - Enable debug panel
- Direct screen navigation for testing specific flows

## 📊 Analytics Events

The following events are tracked (visible in console and debug panel):
- `onboarding_started`
- `goal_selected`
- `sector_category_selected`
- `sector_selected`
- `sector_skipped`
- `onboarding_completed`
- `mode_switched`
- `first_value_action`
- `screen_view`

## 🏗️ Project Structure

```
onboarding/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page (redirects to /onboarding)
│   └── onboarding/        # Onboarding routes
├── components/            # React components
│   ├── OnboardingFlow.tsx # Main orchestrator
│   ├── MobileFrame.tsx    # Device frame wrapper
│   ├── DebugPanel.tsx     # Debug interface
│   ├── screens/           # Individual screen components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities
│   ├── analytics.ts       # Analytics tracking
│   ├── storage.ts         # LocalStorage management
│   ├── constants.ts       # App constants
│   └── utils.ts           # Helper functions
└── public/                # Static assets
    └── *.svg              # Scratchie logos and icons
```

## 🚢 Deployment to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/scratchie-onboarding)

### Manual Deployment

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy with default settings

### Environment Variables
Set these in Vercel dashboard (optional):
- `NEXT_PUBLIC_APP_ENV` - development/staging/production
- `NEXT_PUBLIC_ANALYTICS_ENABLED` - true/false

## 🎯 Success Metrics

Target metrics for the onboarding flow:
- **Completion rate**: >30% (vs 19.2% industry average)
- **Time to completion**: <2 minutes
- **Time to first value action**: <3 minutes
- **Sector selection rate**: >70%

## 🔧 Customization

### Adding New Sectors
Edit `lib/constants.ts`:
```typescript
export const SECTORS_BY_CATEGORY = {
  yourCategory: [
    'New Sector 1',
    'New Sector 2'
  ]
}
```

### Modifying Analytics
Edit `lib/analytics.ts` to add new tracking events or integrate with real analytics services.

### Styling Changes
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component variants: Individual files in `components/ui/`

## 📝 Notes

- Built for mobile-first experience
- Optimized for harsh field conditions (high contrast, large touch targets)
- Works offline after initial load
- Accessible (WCAG 2.1 AA compliant)
- Performance optimized (<3s load on 3G)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This is a demonstration project for Scratchie's onboarding flow.