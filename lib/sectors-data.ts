export interface Sector {
  name: string
  category: string
  description: string
  keyUseCases: string
  employeeModel: string
}

// Parse CSV data into structured format
export const SECTORS_DATA: Sector[] = [
  { name: "Construction", category: "Core Industry", description: "Building and infrastructure projects", keyUseCases: "Safety compliance; Quality workmanship; Site cleanliness", employeeModel: "Vendor-based (subcontractors)" },
  { name: "Manufacturing", category: "Core Industry", description: "Industrial production and processing", keyUseCases: "Quality control; Safety procedures; Production efficiency", employeeModel: "Employee-based" },
  { name: "Retail", category: "Core Industry", description: "All types of retail operations", keyUseCases: "Customer service; Sales performance; Stock management", employeeModel: "Employee-based" },
  { name: "Transport & Logistics", category: "Core Industry", description: "Shipping trucking warehousing distribution", keyUseCases: "Safe driving; On-time delivery; Vehicle care", employeeModel: "Mixed (employees & contractors)" },
  { name: "Hospitality", category: "Core Industry", description: "Hotels restaurants food service tourism", keyUseCases: "Guest satisfaction; Cleanliness; Service quality", employeeModel: "Employee-based" },
  { name: "Facilities Management", category: "Core Industry", description: "Property management and building maintenance", keyUseCases: "Service quality; Safety compliance; Client satisfaction", employeeModel: "Vendor-based (contractors)" },
  { name: "Mining", category: "Core Industry", description: "Extraction processing and resources", keyUseCases: "Safety procedures; Equipment care; Productivity", employeeModel: "Mixed (employees & contractors)" },
  { name: "Healthcare & Pharmaceuticals", category: "Core Industry", description: "Hospitals clinics pharmaceutical manufacturing", keyUseCases: "Hand hygiene; Patient care; Compliance", employeeModel: "Employee-based" },
  { name: "Quick Service Restaurants (QSR)", category: "Food Service", description: "Fast food and quick service dining", keyUseCases: "Customer service; Food safety; Speed of service", employeeModel: "Employee-based" },
  { name: "Food Safety & Processing", category: "Food Service", description: "Food production and processing facilities", keyUseCases: "Quality standards; Safety compliance; Hygiene", employeeModel: "Employee-based" },
  { name: "Agriculture & Farming", category: "Primary Industry", description: "Crop production livestock farm operations", keyUseCases: "Safety practices; Equipment care; Animal welfare", employeeModel: "Mixed (employees & contractors)" },
  { name: "Energy Sector", category: "Infrastructure", description: "Oil & Gas Renewable Energy Nuclear Power", keyUseCases: "Safety compliance; Environmental standards; Operational excellence", employeeModel: "Mixed (employees & contractors)" },
  { name: "Utilities", category: "Infrastructure", description: "Water electricity gas distribution", keyUseCases: "Safety procedures; Service reliability; Emergency response", employeeModel: "Employee-based" },
  { name: "Automotive", category: "Manufacturing & Service", description: "Vehicle manufacturing dealerships service centers", keyUseCases: "Quality work; Customer service; Safety compliance", employeeModel: "Mixed (employees & service contractors)" },
  { name: "Aviation", category: "Transportation", description: "Airlines airports aircraft maintenance", keyUseCases: "Safety compliance; On-time performance; Customer service", employeeModel: "Mixed (employees & contractors)" },
  { name: "Marine & Maritime", category: "Transportation", description: "Shipping ports offshore operations", keyUseCases: "Safety at sea; Environmental compliance; Operational efficiency", employeeModel: "Mixed (employees & contractors)" },
  { name: "Warehousing", category: "Logistics", description: "Storage and distribution centers", keyUseCases: "Safety compliance; Accuracy; Productivity", employeeModel: "Employee-based" },
  { name: "Education", category: "Public Service", description: "Schools universities educational institutions", keyUseCases: "Student safety; Service quality; Compliance", employeeModel: "Employee-based" },
  { name: "Government & Public Sector", category: "Public Service", description: "Municipal state federal agencies", keyUseCases: "Service delivery; Compliance; Efficiency", employeeModel: "Employee-based" },
  { name: "Emergency Services", category: "Public Service", description: "Fire police ambulance emergency response", keyUseCases: "Response times; Safety procedures; Team performance", employeeModel: "Employee-based" },
  { name: "Retirement & Aged Care", category: "Healthcare", description: "Senior living facilities and care homes", keyUseCases: "Care quality; Staff engagement; Compliance", employeeModel: "Employee-based" },
  { name: "Property Management & Real Estate", category: "Service Industry", description: "Commercial and residential property management", keyUseCases: "Tenant satisfaction; Maintenance quality; Safety", employeeModel: "Vendor-based (contractors)" },
  { name: "Events & Entertainment", category: "Service Industry", description: "Sports venues entertainment facilities", keyUseCases: "Customer experience; Safety; Operational efficiency", employeeModel: "Mixed (employees & contractors)" },
  { name: "Sport", category: "Service Industry", description: "Professional sports organizations stadiums", keyUseCases: "Performance; Safety; Fan experience", employeeModel: "Employee-based" },
  { name: "Finance & Banking", category: "Professional Services", description: "Financial institutions and banks", keyUseCases: "Customer service; Compliance; Accuracy", employeeModel: "Employee-based" },
  { name: "Software & Technology", category: "Professional Services", description: "Tech companies and software development", keyUseCases: "Project delivery; Innovation; Quality", employeeModel: "Employee-based" },
  { name: "Telecommunications", category: "Professional Services", description: "Telecom infrastructure and service providers", keyUseCases: "Service quality; Safety; Customer satisfaction", employeeModel: "Mixed (employees & contractors)" },
  { name: "Non-profits", category: "Other", description: "Charitable organizations and NGOs", keyUseCases: "Volunteer engagement; Service delivery; Compliance", employeeModel: "Mixed (employees & volunteers)" },
  { name: "Chemicals", category: "Industrial", description: "Chemical production and processing", keyUseCases: "Safety compliance; Quality control; Environmental standards", employeeModel: "Employee-based" },
  { name: "Travel", category: "Service Industry", description: "Travel agencies and tourism operators", keyUseCases: "Customer service; Safety; Experience quality", employeeModel: "Employee-based" },
  { name: "Electric Vehicle Charging", category: "Emerging Sector", description: "EV infrastructure and charging networks", keyUseCases: "Installation quality; Maintenance; Customer service", employeeModel: "Vendor-based (contractors)" }
]

// Get unique categories and map to icons
export const UNIQUE_CATEGORIES = Array.from(new Set(SECTORS_DATA.map(s => s.category))).sort()

export const CATEGORY_ICONS: Record<string, string> = {
  "Core Industry": "🏗️",
  "Food Service": "🍔",
  "Primary Industry": "🌾",
  "Infrastructure": "⚡",
  "Manufacturing & Service": "🚗",
  "Transportation": "✈️",
  "Logistics": "📦",
  "Public Service": "🏛️",
  "Healthcare": "🏥",
  "Service Industry": "🎭",
  "Professional Services": "💼",
  "Industrial": "⚗️",
  "Emerging Sector": "🔋",
  "Other": "🏢"
}

// Group sectors by category
export const SECTORS_BY_CATEGORY = UNIQUE_CATEGORIES.reduce((acc, category) => {
  acc[category] = SECTORS_DATA
    .filter(s => s.category === category)
    .map(s => s.name)
  return acc
}, {} as Record<string, string[]>)

// Get the top 6 categories for initial display
export const TOP_CATEGORIES = [
  "Core Industry",
  "Service Industry",
  "Healthcare",
  "Infrastructure",
  "Transportation",
  "Professional Services"
].map(cat => ({
  id: cat.toLowerCase().replace(/\s+/g, '-'),
  label: cat,
  icon: CATEGORY_ICONS[cat] || "🏢",
  sectorCount: SECTORS_BY_CATEGORY[cat]?.length || 0
}))