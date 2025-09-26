export interface Sector {
  name: string
  category: string
  description: string
  keyUseCases: string
  employeeModel: string
  tags: string[] // Search tags for better discoverability
  environment: 'field' | 'office' | 'mixed' // Work environment type
}

export const SECTORS_DATA: Sector[] = [
  // Core Industry (Hard hat industries)
  {
    name: "Construction",
    category: "Core Industry",
    description: "Building and infrastructure projects",
    keyUseCases: "Safety compliance; Quality workmanship; Site cleanliness",
    employeeModel: "Vendor-based (subcontractors)",
    tags: ["building", "contractor", "builder", "trades", "site", "scaffold", "concrete", "crane"],
    environment: "field"
  },
  {
    name: "Mining",
    category: "Core Industry",
    description: "Resource extraction and processing",
    keyUseCases: "Equipment safety; Environmental compliance; Hazard reporting",
    employeeModel: "Mixed (employees + contractors)",
    tags: ["quarry", "extraction", "minerals", "resources", "underground", "drill", "excavation"],
    environment: "field"
  },
  {
    name: "Manufacturing",
    category: "Core Industry",
    description: "Production facilities and factories",
    keyUseCases: "Machine safety; Quality control; Process improvement",
    employeeModel: "Employee-based",
    tags: ["factory", "production", "assembly", "industrial", "plant", "warehouse", "facility"],
    environment: "field"
  },
  {
    name: "Oil & Gas",
    category: "Core Industry",
    description: "Energy extraction and refining",
    keyUseCases: "Process safety; Environmental protection; Equipment maintenance",
    employeeModel: "Mixed (employees + contractors)",
    tags: ["petroleum", "refinery", "drilling", "energy", "offshore", "pipeline", "fuel"],
    environment: "field"
  },
  {
    name: "Heavy Industry",
    category: "Core Industry",
    description: "Steel, chemicals, and heavy machinery",
    keyUseCases: "Chemical safety; Equipment operation; Environmental compliance",
    employeeModel: "Employee-based",
    tags: ["steel", "chemical", "machinery", "foundry", "metal", "smelting", "industrial"],
    environment: "field"
  },

  // Hospitality
  {
    name: "Quick Service Restaurants",
    category: "Hospitality",
    description: "Fast food and quick dining establishments",
    keyUseCases: "Food safety; Slip prevention; Burns prevention",
    employeeModel: "Employee-based",
    tags: ["QSR", "fast food", "restaurant", "food service", "kitchen", "dining", "cafe", "takeaway"],
    environment: "field"
  },
  {
    name: "Hotels & Accommodation",
    category: "Hospitality",
    description: "Hotels, motels, and lodging services",
    keyUseCases: "Guest safety; Staff wellbeing; Housekeeping safety",
    employeeModel: "Employee-based",
    tags: ["hotel", "motel", "lodging", "accommodation", "resort", "hospitality", "guest services"],
    environment: "mixed"
  },
  {
    name: "Restaurants & Bars",
    category: "Hospitality",
    description: "Full-service dining and entertainment venues",
    keyUseCases: "Kitchen safety; Customer incidents; Staff training",
    employeeModel: "Employee-based",
    tags: ["dining", "bar", "pub", "restaurant", "bistro", "tavern", "nightclub", "entertainment"],
    environment: "field"
  },
  {
    name: "Catering & Events",
    category: "Hospitality",
    description: "Event services and catering operations",
    keyUseCases: "Food handling; Equipment transport; Venue safety",
    employeeModel: "Mixed (employees + contractors)",
    tags: ["catering", "events", "functions", "banquet", "wedding", "corporate events", "food service"],
    environment: "field"
  },

  // Healthcare
  {
    name: "Hospitals",
    category: "Healthcare",
    description: "Medical centers and hospital facilities",
    keyUseCases: "Patient safety; Infection control; Staff wellbeing",
    employeeModel: "Employee-based",
    tags: ["hospital", "medical center", "emergency", "ward", "clinic", "medical", "health"],
    environment: "mixed"
  },
  {
    name: "Aged Care",
    category: "Healthcare",
    description: "Nursing homes and elderly care facilities",
    keyUseCases: "Resident safety; Manual handling; Medication safety",
    employeeModel: "Employee-based",
    tags: ["nursing home", "elderly care", "senior care", "retirement", "assisted living", "care home"],
    environment: "field"
  },
  {
    name: "Medical Practices",
    category: "Healthcare",
    description: "Clinics and private medical practices",
    keyUseCases: "Patient privacy; Equipment hygiene; Staff safety",
    employeeModel: "Employee-based",
    tags: ["clinic", "doctor", "GP", "medical practice", "surgery", "physician", "practitioner"],
    environment: "office"
  },
  {
    name: "Allied Health",
    category: "Healthcare",
    description: "Physiotherapy, dental, and specialist services",
    keyUseCases: "Patient handling; Equipment safety; Hygiene protocols",
    employeeModel: "Mixed (employees + contractors)",
    tags: ["physio", "physiotherapy", "dental", "dentist", "specialist", "therapy", "rehabilitation"],
    environment: "office"
  },
  {
    name: "Pathology & Diagnostics",
    category: "Healthcare",
    description: "Testing laboratories and diagnostic centers",
    keyUseCases: "Specimen handling; Chemical safety; Equipment maintenance",
    employeeModel: "Employee-based",
    tags: ["lab", "laboratory", "pathology", "testing", "diagnostics", "blood", "radiology", "x-ray"],
    environment: "office"
  },

  // Transportation
  {
    name: "Trucking & Logistics",
    category: "Transportation",
    description: "Freight, delivery, and logistics operations",
    keyUseCases: "Driver safety; Load securing; Route planning",
    employeeModel: "Mixed (employees + owner-operators)",
    tags: ["trucking", "freight", "logistics", "delivery", "transport", "haulage", "shipping", "courier"],
    environment: "field"
  },
  {
    name: "Warehousing",
    category: "Transportation",
    description: "Storage and distribution centers",
    keyUseCases: "Forklift safety; Manual handling; Storage systems",
    employeeModel: "Employee-based",
    tags: ["warehouse", "distribution", "storage", "fulfillment", "logistics", "inventory", "supply chain"],
    environment: "field"
  },
  {
    name: "Public Transport",
    category: "Transportation",
    description: "Bus, train, and public transit services",
    keyUseCases: "Passenger safety; Driver wellbeing; Vehicle maintenance",
    employeeModel: "Employee-based",
    tags: ["bus", "train", "transit", "public transport", "metro", "subway", "tram", "railway"],
    environment: "field"
  },
  {
    name: "Aviation",
    category: "Transportation",
    description: "Airlines and airport operations",
    keyUseCases: "Ground safety; Security compliance; Equipment handling",
    employeeModel: "Employee-based",
    tags: ["aviation", "airline", "airport", "aircraft", "flight", "ground crew", "baggage", "terminal"],
    environment: "field"
  },
  {
    name: "Maritime",
    category: "Transportation",
    description: "Shipping and port operations",
    keyUseCases: "Vessel safety; Cargo handling; Port operations",
    employeeModel: "Mixed (employees + contractors)",
    tags: ["shipping", "port", "maritime", "vessel", "cargo", "dock", "harbor", "marine"],
    environment: "field"
  },

  // Professional Services (Office-based)
  {
    name: "Corporate Offices",
    category: "Professional Services",
    description: "General office and administrative environments",
    keyUseCases: "Ergonomics; Mental wellbeing; Team collaboration",
    employeeModel: "Employee-based",
    tags: ["office", "corporate", "business", "administration", "desk", "white collar", "professional"],
    environment: "office"
  },
  {
    name: "Financial Services",
    category: "Professional Services",
    description: "Banking, insurance, and financial institutions",
    keyUseCases: "Stress management; Security protocols; Ergonomic setup",
    employeeModel: "Employee-based",
    tags: ["banking", "finance", "insurance", "accounting", "investment", "financial", "bank"],
    environment: "office"
  },
  {
    name: "Technology",
    category: "Professional Services",
    description: "IT companies and tech startups",
    keyUseCases: "Workstation setup; Mental health; Team collaboration",
    employeeModel: "Employee-based",
    tags: ["IT", "tech", "software", "technology", "startup", "digital", "computer", "developer"],
    environment: "office"
  },
  {
    name: "Consulting",
    category: "Professional Services",
    description: "Management and professional consulting",
    keyUseCases: "Travel safety; Client site safety; Work-life balance",
    employeeModel: "Employee-based",
    tags: ["consulting", "consultant", "advisory", "management", "strategy", "professional services"],
    environment: "office"
  },
  {
    name: "Legal Services",
    category: "Professional Services",
    description: "Law firms and legal practices",
    keyUseCases: "Workplace stress; Document handling; Client safety",
    employeeModel: "Employee-based",
    tags: ["legal", "law", "lawyer", "attorney", "solicitor", "barrister", "law firm", "legal practice"],
    environment: "office"
  },

  // Infrastructure
  {
    name: "Utilities",
    category: "Infrastructure",
    description: "Power, water, and gas utilities",
    keyUseCases: "Electrical safety; Field work safety; Emergency response",
    employeeModel: "Employee-based",
    tags: ["utilities", "power", "electricity", "water", "gas", "energy", "grid", "supply"],
    environment: "mixed"
  },
  {
    name: "Telecommunications",
    category: "Infrastructure",
    description: "Telecom networks and services",
    keyUseCases: "Tower safety; Cable installation; Equipment handling",
    employeeModel: "Mixed (employees + contractors)",
    tags: ["telecom", "telecommunications", "network", "internet", "mobile", "tower", "cable", "fiber"],
    environment: "mixed"
  },
  {
    name: "Waste Management",
    category: "Infrastructure",
    description: "Waste collection and recycling services",
    keyUseCases: "Vehicle safety; Manual handling; Hazardous materials",
    employeeModel: "Employee-based",
    tags: ["waste", "garbage", "recycling", "rubbish", "sanitation", "disposal", "collection"],
    environment: "field"
  },
  {
    name: "Water Treatment",
    category: "Infrastructure",
    description: "Water and wastewater treatment facilities",
    keyUseCases: "Chemical handling; Confined spaces; Equipment safety",
    employeeModel: "Employee-based",
    tags: ["water treatment", "wastewater", "sewage", "treatment plant", "water quality", "filtration"],
    environment: "field"
  },
  {
    name: "Renewable Energy",
    category: "Infrastructure",
    description: "Solar, wind, and renewable energy operations",
    keyUseCases: "Height safety; Electrical safety; Environmental monitoring",
    employeeModel: "Mixed (employees + contractors)",
    tags: ["solar", "wind", "renewable", "green energy", "sustainable", "wind farm", "solar farm"],
    environment: "field"
  },
  {
    name: "Rail Infrastructure",
    category: "Infrastructure",
    description: "Rail network maintenance and operations",
    keyUseCases: "Track safety; Signal systems; Heavy equipment",
    employeeModel: "Employee-based",
    tags: ["rail", "railway", "track", "train infrastructure", "signal", "railroad", "metro"],
    environment: "field"
  },

  // Additional sectors that fit into existing categories
  {
    name: "Agriculture",
    category: "Core Industry",
    description: "Farming and agricultural operations",
    keyUseCases: "Machinery safety; Chemical handling; Animal safety",
    employeeModel: "Mixed (employees + seasonal workers)",
    tags: ["farming", "agriculture", "farm", "crops", "livestock", "harvest", "agricultural", "rural"],
    environment: "field"
  },
  {
    name: "Retail",
    category: "Hospitality",
    description: "Retail stores and shopping centers",
    keyUseCases: "Manual handling; Customer safety; Stock management",
    employeeModel: "Employee-based",
    tags: ["retail", "shop", "store", "shopping", "sales", "customer service", "mall", "boutique"],
    environment: "mixed"
  }
]

// Helper function to get categories with their icons
export const CATEGORY_INFO = [
  {
    id: 'Core Industry',
    label: 'Core Industry',
    icon: '🏗️',
    description: 'Construction, mining, manufacturing & heavy industries'
  },
  {
    id: 'Hospitality',
    label: 'Hospitality',
    icon: '🍔',
    description: 'Restaurants, hotels, retail & service industries'
  },
  {
    id: 'Healthcare',
    label: 'Healthcare',
    icon: '🏥',
    description: 'Hospitals, clinics, aged care & medical services'
  },
  {
    id: 'Transportation',
    label: 'Transportation',
    icon: '🚚',
    description: 'Trucking, logistics, public transport & aviation'
  },
  {
    id: 'Professional Services',
    label: 'Professional Services',
    icon: '💼',
    description: 'Corporate offices, finance, tech & consulting'
  },
  {
    id: 'Infrastructure',
    label: 'Infrastructure',
    icon: '⚡',
    description: 'Utilities, telecommunications & essential services'
  }
]

// Helper function to search sectors by tags
export function searchSectors(searchTerm: string): Sector[] {
  const term = searchTerm.toLowerCase()
  return SECTORS_DATA.filter(sector =>
    sector.name.toLowerCase().includes(term) ||
    sector.description.toLowerCase().includes(term) ||
    sector.tags.some(tag => tag.toLowerCase().includes(term))
  )
}