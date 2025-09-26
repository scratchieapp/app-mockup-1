# Development Brief for Scratchie Onboarding

## Executive Summary

This is a functional wireframe/prototype showing the complete user experience for Scratchie's onboarding flow. It demonstrates user flows and interactions but requires professional UI design before implementation. Built as a web mockup to validate UX before native development.

**Key Achievement**: This mockup successfully validates the complete onboarding user experience, from initial welcome through industry selection to role-specific guidance, providing a solid foundation for native app development.

## What This Mockup Demonstrates

### Complete User Flows
1. **Role Selection Flow**: Manager/Worker/Both with context switching
2. **Role Context Selection**: For dual-role users ("What do you want to do today?")
3. **Industry Selection**: 6 main categories with 33 specific sectors
4. **Enhanced Search**: Tag-based search with synonyms for quick sector discovery
5. **Tailored Guidance**: Role and industry-specific quick-start guides
6. **Environment Awareness**: Office vs field differentiation for ConvoCard examples
7. **Dashboard Landing**: Personalized dashboard based on selections

### Key Features Prototyped
- **Smart Search System**: Enhanced with tags and synonyms for better sector discovery
- **Industry-Specific Content**: Tailored examples and use cases for each industry
- **Environment Differentiation**: Office vs field environments with appropriate ConvoCard examples
- **Role-Based Personalization**: Different tips and onboarding paths for managers vs workers
- **State Persistence**: User selections saved across sessions
- **Analytics Framework**: Comprehensive tracking of user behavior and flow completion

## For the UI Designer

### Current Implementation
- Using basic shadcn/ui components with Scratchie brand integration
- **Scratchie Brand Colors**: Carrot (#FF6B35), Cash (#4CAF50), Yellow (#FFC107)
- Mobile-first design presented in realistic device frames
- Basic animations implemented with Framer Motion
- Clean, functional layout optimized for touch interaction

### What Needs Professional Design

#### 1. Visual Design Enhancement
- **Custom Illustrations**: Create industry-specific graphics for each of the 6 main categories
- **Icon System**: Design cohesive iconography for all 33 industry sectors
- **Brand Integration**: Enhance Scratchie brand presence while maintaining professionalism
- **Visual Hierarchy**: Refine typography, spacing, and information architecture

#### 2. Enhanced User Interface
- **Micro-Interactions**: Polish button states, hover effects, and transitions
- **Loading States**: Design engaging loading animations and progress indicators
- **Empty States**: Create helpful empty state designs with clear next actions
- **Error States**: Design user-friendly error messages and recovery paths

#### 3. Advanced Animations
- **Screen Transitions**: Smooth, contextual transitions between onboarding steps
- **Progress Feedback**: Visual progress indicators showing onboarding completion
- **Success States**: Celebratory animations for completed steps
- **Search Interactions**: Smooth search input and results animations

### Design Considerations for Target Users

#### Construction/Field Workers
- **Large Touch Targets**: Minimum 44px touch targets for users wearing gloves
- **High Contrast**: Enhanced visibility for outdoor/bright light conditions
- **Bold Typography**: Easy to read text at various distances and lighting
- **Simple Navigation**: Intuitive flow with minimal cognitive load

#### Office Workers
- **Professional Aesthetic**: Clean, business-appropriate design language
- **Detailed Information**: More comprehensive tooltips and explanatory content
- **Achievement Focus**: Visual emphasis on recognition and milestone features
- **Desktop Consideration**: While mobile-first, consider tablet/desktop views

#### Dual-Role Users
- **Context Switching**: Clear visual differentiation between manager/worker contexts
- **Mode Indicators**: Subtle but clear indicators of current role context
- **Flexible Interface**: Easy switching between different use case scenarios

## For the App Developer (React Native/Expo)

### Architecture Requirements

#### 1. Technology Stack Conversion
- **Framework Migration**: Convert Next.js components to React Native/Expo
- **Navigation System**: Implement React Navigation for screen management
- **State Management**: Consider Redux Toolkit or Zustand for complex state
- **Storage**: Use AsyncStorage for user preferences and onboarding state
- **Analytics**: Integrate analytics SDK (Mixpanel, Amplitude, or similar)

#### 2. Platform Integration
- **Camera Integration**: Native camera access for ConvoCard creation
- **Push Notifications**: System for recognition notifications and reminders
- **Deep Linking**: Support for direct links to specific onboarding steps
- **Offline Support**: Cache onboarding content for offline completion
- **App Store Optimization**: Proper metadata and screenshots featuring onboarding

### Key Components to Build

#### 1. Onboarding Navigator
```typescript
interface OnboardingNavigator {
  WelcomeScreen: undefined;
  GoalSelectionScreen: undefined;
  RoleContextScreen: { selectedRole: 'both' };
  IndustryCategoryScreen: { userRole: UserRole };
  SectorSelectionScreen: { category: IndustryCategory };
  TipsScreen: { role: UserRole; sector: IndustrySector };
  DashboardScreen: { userProfile: UserProfile };
}
```

#### 2. Industry Selector Component
- **Search Functionality**: Real-time search with tag matching
- **Category Navigation**: Smooth transitions between category and sector views
- **Favorite Sectors**: Allow users to bookmark frequently accessed sectors
- **Recent Selections**: Show previously selected sectors for quick access

#### 3. Role Context Selector
- **Dynamic Content**: Show different content based on current context
- **Quick Switching**: Easy toggle between manager/worker contexts
- **Context Persistence**: Remember user's preferred context
- **Visual Differentiation**: Clear visual cues for current context

#### 4. Tips Carousel System
- **Dynamic Content Loading**: Load tips based on role and industry combination
- **Progress Tracking**: Track which tips users have viewed
- **Favorite Tips**: Allow users to save important tips
- **Sharing Functionality**: Enable sharing of tips with team members

#### 5. Dashboard Components
- **Manager Dashboard**: Focus on team overview, analytics, recognition tools
- **Worker Dashboard**: Emphasize personal achievements, skills, safety
- **Dual-Role Dashboard**: Contextual content based on current role selection

### API Integration Points

#### 1. User Management
```typescript
interface UserProfile {
  id: string;
  role: 'manager' | 'worker' | 'both';
  currentContext?: 'manager' | 'worker';
  industry: IndustrySector;
  onboardingCompleted: boolean;
  preferences: UserPreferences;
}
```

#### 2. Industry Data Management
```typescript
interface IndustrySector {
  id: string;
  name: string;
  category: IndustryCategory;
  searchTags: string[];
  environment: 'office' | 'field' | 'mixed';
  convocardExamples: ConvoCardExample[];
  tips: Tip[];
}
```

#### 3. Analytics Events
```typescript
interface AnalyticsEvent {
  event: string;
  properties: {
    userId: string;
    screen: string;
    role?: UserRole;
    industry?: string;
    timestamp: number;
    sessionId: string;
  };
}
```

## For the Backend Developer

### Data Models Required

#### 1. User Profile Management
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('manager', 'worker', 'both')),
  current_context VARCHAR(20) CHECK (current_context IN ('manager', 'worker')),
  industry_sector_id UUID REFERENCES industry_sectors(id),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Industry Sectors Database
```sql
CREATE TABLE industry_categories (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  display_order INTEGER,
  description TEXT
);

CREATE TABLE industry_sectors (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id UUID REFERENCES industry_categories(id),
  search_tags TEXT[], -- PostgreSQL array for search terms
  environment VARCHAR(20) CHECK (environment IN ('office', 'field', 'mixed')),
  active BOOLEAN DEFAULT TRUE,
  display_order INTEGER
);

CREATE TABLE sector_search_synonyms (
  id UUID PRIMARY KEY,
  sector_id UUID REFERENCES industry_sectors(id),
  synonym VARCHAR(100) NOT NULL,
  weight INTEGER DEFAULT 1 -- For search ranking
);
```

#### 3. Analytics and Tracking
```sql
CREATE TABLE onboarding_analytics (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  event_name VARCHAR(100) NOT NULL,
  event_properties JSONB,
  screen_name VARCHAR(100),
  session_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE onboarding_funnel (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  step_name VARCHAR(100) NOT NULL,
  step_order INTEGER,
  completed_at TIMESTAMP DEFAULT NOW(),
  time_spent_seconds INTEGER
);
```

### API Endpoints Required

#### 1. Onboarding Flow Management
```typescript
// Start onboarding session
POST /api/onboarding/start
{
  userId: string;
  deviceInfo: DeviceInfo;
}

// Save user role selection
PUT /api/onboarding/role
{
  userId: string;
  role: 'manager' | 'worker' | 'both';
  context?: 'manager' | 'worker';
}

// Save industry sector selection
PUT /api/onboarding/sector
{
  userId: string;
  sectorId: string;
  searchTerm?: string; // Track how they found it
}

// Complete onboarding
POST /api/onboarding/complete
{
  userId: string;
  completedSteps: string[];
  totalTimeSpent: number;
}
```

#### 2. Industry Data API
```typescript
// Get all industry categories
GET /api/industries/categories

// Get sectors by category
GET /api/industries/sectors?category={categoryId}

// Search sectors with enhanced matching
GET /api/industries/search?q={searchTerm}&limit={limit}
{
  query: string;
  results: SectorSearchResult[];
  searchTime: number;
}
```

#### 3. Analytics Tracking
```typescript
// Track analytics events
POST /api/analytics/events
{
  events: AnalyticsEvent[];
}

// Get onboarding funnel data (internal)
GET /api/analytics/funnel?startDate={date}&endDate={date}
```

### Business Logic Implementation

#### 1. Role-Based Content Delivery
- **Manager Content**: Focus on team management, analytics, recognition workflows
- **Worker Content**: Emphasize personal achievement, skill development, safety
- **Context Switching**: Seamless switching between manager/worker content for dual-role users

#### 2. Industry-Specific Customization
- **ConvoCard Templates**: Pre-built templates specific to each industry sector
- **Safety vs Achievement Focus**: Field industries emphasize safety, office industries emphasize achievement
- **Compliance Features**: Industry-specific compliance tracking and reporting

#### 3. Search Algorithm
- **Primary Matching**: Exact sector name matches
- **Tag Matching**: Search against predefined tags for each sector
- **Synonym Matching**: Fuzzy matching against common industry terms
- **Weighted Results**: Popular sectors ranked higher in search results

#### 4. Onboarding Completion Logic
- **Progressive Completion**: Track completion of each onboarding step
- **Skip Detection**: Identify users who skip vs complete each step
- **Time-to-Value Tracking**: Measure time from signup to first ConvoCard creation
- **Abandonment Detection**: Identify and trigger re-engagement for incomplete onboarding

## Testing Requirements

### User Acceptance Testing Criteria

#### 1. Core User Journeys
- **Construction Worker**: Can complete onboarding in under 2 minutes with work gloves
- **Office Manager**: Sees relevant achievement-focused content and management tools
- **Dual-Role User**: Can easily understand and switch between contexts
- **Search Efficiency**: Users find their specific sector within 3 search attempts
- **Content Relevance**: Tips and examples are appropriate for selected industry

#### 2. Performance Requirements
- **Loading Speed**: Each screen loads in under 2 seconds on 3G connection
- **Offline Capability**: Onboarding works without internet after initial data load
- **Battery Impact**: Onboarding flow uses less than 5% battery on average device
- **Memory Usage**: App remains responsive with minimal memory footprint

### Device and Platform Testing

#### 1. Mobile Device Coverage
- **iOS**: iPhone 12 mini through iPhone 15 Pro Max
- **Android**: Samsung Galaxy A series, Google Pixel, OnePlus devices
- **Screen Sizes**: 4.7" through 6.9" screen support
- **Operating Systems**: iOS 14+ and Android 8.0+ support

#### 2. Accessibility Testing
- **VoiceOver/TalkBack**: Full screen reader compatibility
- **Large Text**: Support for system font size preferences
- **High Contrast**: Proper contrast ratios for visual accessibility
- **Motor Accessibility**: Large touch targets and alternative interaction methods

#### 3. Network Conditions
- **3G Performance**: Acceptable performance on slow connections
- **Offline Mode**: Graceful degradation when offline
- **Poor Connection**: Proper error handling and retry mechanisms

## Implementation Priority and Phases

### Phase 1: MVP Onboarding (4-6 weeks)
**Goal**: Core onboarding flow that gets users to their first ConvoCard

#### Must-Have Features
1. **Basic Onboarding Flow**: Welcome → Role → Industry → Tips → Complete
2. **Role Selection**: Manager, Worker, Both options
3. **Industry Categories**: All 6 categories with sector selection
4. **Basic Search**: Simple text search across sectors
5. **Tips Display**: Role and industry-appropriate tips
6. **Onboarding Completion**: Save user preferences and mark complete

#### Success Metrics
- Onboarding completion rate > 75%
- Time to complete < 3 minutes
- User proceeds to create first ConvoCard within 24 hours > 50%

### Phase 2: Enhanced Experience (2-4 weeks)
**Goal**: Polish the experience and add advanced features

#### Enhanced Features
1. **Role Context Selection**: Full dual-role user support
2. **Enhanced Search**: Tags, synonyms, and weighted results
3. **Advanced Analytics**: Detailed funnel tracking and user behavior
4. **Animation Polish**: Smooth transitions and micro-interactions
5. **Error Handling**: Comprehensive error states and recovery

#### Success Metrics
- Onboarding completion rate > 85%
- User selects specific sector (vs skipping) > 75%
- Search success rate > 90%
- User satisfaction score > 4.0/5.0

### Phase 3: Optimization and Scale (2-3 weeks)
**Goal**: Prepare for large-scale rollout and ongoing optimization

#### Advanced Features
1. **Personalized Content**: AI-driven content recommendations
2. **A/B Testing Framework**: Test different onboarding variations
3. **Multi-language Support**: Support for primary international markets
4. **Advanced Analytics**: Predictive modeling for user success
5. **Integration Points**: Deep integration with main app features

#### Success Metrics
- Onboarding completion rate > 90%
- First ConvoCard creation within 24 hours > 70%
- User retention after 30 days > 80%
- Support ticket volume < 1% of onboarding users

## Success Metrics and KPIs

### Primary Success Metrics
1. **Onboarding Completion Rate**: Target > 85%
2. **Time to First Value**: First ConvoCard created within 24 hours > 70%
3. **User Satisfaction**: Post-onboarding survey score > 4.2/5.0
4. **Sector Selection Rate**: Users select specific sector vs skip > 75%
5. **Search Success Rate**: Users find their sector via search > 90%

### Secondary Metrics
1. **Time to Complete**: Average onboarding completion time < 3 minutes
2. **Drop-off Points**: Identify and minimize high-abandonment screens
3. **Support Volume**: Onboarding-related support tickets < 2% of users
4. **User Activation**: Users who complete core actions within first week
5. **Retention Impact**: 30-day retention rate for users who complete onboarding

### Analytics Dashboard Requirements
- **Real-time Onboarding Funnel**: Live view of user progression
- **Industry Distribution**: Popular sectors and categories
- **Role Distribution**: Manager vs Worker vs Both selection rates
- **Search Analytics**: Most searched terms and success rates
- **Device and Platform**: Performance across different devices
- **Geographic Insights**: Regional onboarding patterns

## Technical Architecture Notes

### State Management Strategy
```typescript
interface OnboardingState {
  currentStep: OnboardingStep;
  userRole: UserRole | null;
  currentContext: UserContext | null;
  selectedIndustry: IndustrySector | null;
  completedSteps: OnboardingStep[];
  analytics: AnalyticsEvent[];
  preferences: UserPreferences;
}
```

### Error Handling Strategy
- **Network Errors**: Graceful offline mode with cached data
- **Validation Errors**: Clear, actionable error messages
- **System Errors**: Error boundaries with recovery options
- **Analytics Errors**: Silent failure with local queuing
- **State Corruption**: Reset mechanism with user consent

### Performance Considerations
- **Code Splitting**: Load screens on-demand to reduce initial bundle size
- **Image Optimization**: Lazy loading and proper image compression
- **Memory Management**: Proper cleanup of event listeners and timers
- **Battery Optimization**: Minimize background processing during onboarding
- **Caching Strategy**: Intelligent caching of industry data and assets

## Repository and Development Resources

### Current Mockup Resources
- **Repository**: Available at current working directory
- **Local Development**: `npm install && npm run dev`
- **Live Preview**: http://localhost:3000
- **Debug Mode**: Add `?debug=true` for development tools
- **Component Library**: Built on shadcn/ui for consistent design system

### Handoff Assets
- **Design System**: Scratchie brand colors and component patterns established
- **User Flows**: Complete flow documentation in Claude.md
- **Analytics Events**: Predefined event tracking schema
- **Error States**: Basic error handling patterns implemented
- **State Management**: localStorage patterns ready for native storage migration

### Development Environment Setup
1. **Clone Repository**: Set up development environment
2. **Install Dependencies**: Ensure all required packages are available
3. **Environment Variables**: Configure development and production environments
4. **Testing Setup**: Implement testing framework for components and flows
5. **Analytics Integration**: Connect analytics SDK for event tracking

## Final Implementation Notes

### Remember: This is a UX Prototype
This mockup successfully validates the complete user experience flow, but the final native app should:

1. **Maintain the User Flow**: The interaction patterns and user journey are validated and should be preserved
2. **Elevate the Visual Design**: Professional UI design is needed while maintaining the established UX patterns
3. **Optimize for Performance**: Native implementation should be faster and more responsive
4. **Add Production Features**: Error handling, offline support, and scalability features
5. **Integrate Analytics**: Comprehensive tracking for ongoing optimization

### Key Success Factors
- **User-Centric Design**: Every decision should prioritize the user experience validated in this mockup
- **Industry Expertise**: Content and examples must remain relevant and valuable for each industry
- **Technical Excellence**: Native implementation should exceed web performance expectations
- **Scalable Architecture**: Build for growth while maintaining simplicity in user experience
- **Continuous Improvement**: Establish framework for ongoing optimization based on user data

The mockup provides a solid foundation for native app development. Focus on maintaining the validated user experience while implementing professional design and robust technical architecture.