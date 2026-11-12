import { PMAModel } from '../types';

export const LTA_STATUTORY_LIMITS = {
  maxSpeedKmH: 6.0, // Reduced from 10km/h in latest regulations
  maxWidthCm: 70.0,
  maxLengthCm: 120.0,
  maxHeightCm: 150.0, // From floor to highest point of PMA or user's head
  maxLadenWeightKg: 300.0, // Including device, user, and luggage
  minWheels: 3,
  maxSeats: 1, // Tandem or multi-seat PMAs are strictly non-compliant
  publicBusRampWidthCm: 80.0,
  mrtWideFaregateWidthCm: 90.0,
  mrtStandardFaregateWidthCm: 60.0,
  mrtLiftClearanceWidthCm: 90.0,
};

export const OFFICIAL_LTA_ASSETS = {
  safeChargingInfographic: 'https://www.lta.gov.sg/content/dam/ltagov/getting_around/active_mobility/rules_public_education/rules_code_of_conduct/image/safe_charging_practices_for_am_devices.jpg',
  fireSafetyTips: 'https://www.lta.gov.sg/content/dam/ltagov/getting_around/active_mobility/rules_public_education/rules_code_of_conduct/image/Fire%20Safety%20Tips%20for%20PMDs%20and%20PABs_2022.jpeg',
  oneMotoringPMAImage: 'https://onemotoring.lta.gov.sg/content/dam/onemotoring/Buying/Images/1AA-Photo.png',
  ltaLogo: 'https://www.lta.gov.sg/content/dam/ltagov/img/general/logo.png',
  govSgLogo: 'https://www.lta.gov.sg/content/dam/ltagov/img/general/logo-sg-gov-2.png',
  amapReportPdf: 'https://file.go.gov.sg/amap-pma.pdf',
  activeMobilityActUrl: 'https://www.lta.gov.sg/content/ltagov/en/getting_around/active_mobility/rules_and_public_education/rules_and_code_of_conduct.html',
  activeMobilityRetailersUrl: 'https://www.lta.gov.sg/content/ltagov/en/industry_innovations/industry_matters/regulations_licensing/active_mobility/active_mobility_rules_for_retailers.html',
};

export const POPULAR_PMA_MODELS: PMAModel[] = [
  {
    id: 'solax-mobie-s',
    name: 'Solax Mobie S Automatic Fold',
    manufacturer: 'Falcon Mobility Singapore',
    type: 'mobility-scooter',
    wheels: 4,
    widthCm: 53.0,
    lengthCm: 98.0,
    heightCm: 88.0,
    unladenWeightKg: 24.5,
    maxLadenWeightKg: 145.0,
    maxSpeedKmH: 6.0,
    batteryType: 'Lithium-ion 24V 10Ah (Original UN38.3 Certified)',
    rangeKm: 18.0,
    isLTAWhitelisted: true,
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-compact airline and MRT approved electric folding mobility scooter with genuine factory 6 km/h speed limiter chip.',
  },
  {
    id: 'mobot-falcon-air',
    name: 'Mobot Falcon 4-Wheel Cruiser',
    manufacturer: 'Mobot Singapore',
    type: 'mobility-scooter',
    wheels: 4,
    widthCm: 62.0,
    lengthCm: 110.0,
    heightCm: 92.0,
    unladenWeightKg: 42.0,
    maxLadenWeightKg: 180.0,
    maxSpeedKmH: 6.0,
    batteryType: 'Lead Acid / Lithium 24V 20Ah Dual Bank',
    rangeKm: 28.0,
    isLTAWhitelisted: true,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    description: 'Designed specifically for HDB estates, park connectors (PCN), and bus boarding. Complies with 70cm width threshold.',
  },
  {
    id: 'pride-gogo-sport',
    name: 'Pride Go-Go Sport 4W',
    manufacturer: 'Pride Mobility',
    type: 'mobility-scooter',
    wheels: 4,
    widthCm: 54.0,
    lengthCm: 109.0,
    heightCm: 89.0,
    unladenWeightKg: 44.0,
    maxLadenWeightKg: 175.0,
    maxSpeedKmH: 6.0,
    batteryType: 'Deep Cycle AGM 18Ah Original',
    rangeKm: 22.0,
    isLTAWhitelisted: true,
    image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=600&q=80',
    description: 'World-renowned modular transport scooter. Features feather-touch disassembly and Singapore compliant delta tiller.',
  },
  {
    id: 'karma-ergo-power',
    name: 'Karma Ergo Lite Power KP-10.3',
    manufacturer: 'Karma Medical',
    type: 'motorised-wheelchair',
    wheels: 4,
    widthCm: 59.0,
    lengthCm: 95.0,
    heightCm: 91.0,
    unladenWeightKg: 19.8,
    maxLadenWeightKg: 135.0,
    maxSpeedKmH: 6.0,
    batteryType: 'Original Lithium Polymer Safe-Cell',
    rangeKm: 16.0,
    isLTAWhitelisted: true,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    description: 'Ergonomic S-curved seating preventing pressure sores for elderly users. Fully certified for all SMRT/SBS public buses.',
  },
  {
    id: 'noncompliant-tandem-scooter',
    name: 'Dual-Seat Heavy Cargo Cruiser (Non-Compliant Example)',
    manufacturer: 'Uncertified Grey Import',
    type: 'mobility-scooter',
    wheels: 3,
    widthCm: 78.0, // Exceeds 70cm!
    lengthCm: 145.0, // Exceeds 120cm!
    heightCm: 110.0,
    unladenWeightKg: 85.0,
    maxLadenWeightKg: 340.0, // Exceeds 300kg!
    maxSpeedKmH: 22.0, // Exceeds 6km/h!
    batteryType: 'Uncertified aftermarket 48V pack',
    rangeKm: 45.0,
    isLTAWhitelisted: false,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
    description: 'Illegal lookalike device. Violates width (>70cm), speed (>6km/h), and tandem 2-seater ban. Strictly prohibited on Singapore paths.',
  }
];

export const TIMELINE_MILESTONES = [
  {
    date: '1 June 2026',
    title: 'Retailer Point-of-Sale Mandatory Registration',
    desc: 'Retailers can only sell LTA-whitelisted mobility scooter models. Every new unit sold must be registered at point of sale.',
    status: 'Upcoming Enforcement',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    date: 'Mid-2027',
    title: 'Existing User Registration Portal Opens',
    desc: 'Existing PMA owners can submit registration and verified Certificate of Medical Need (CMN) via OneMotoring Singpass portal.',
    status: 'Transition Period',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
  },
  {
    date: '1 January 2029',
    title: 'Full Mandatory Registration & Enforcement',
    desc: 'All mobility scooters used on public footpaths must display valid LTA registration mark. Non-compliant devices subject to confiscation & fines.',
    status: 'Statutory Law',
    badgeColor: 'bg-slate-900 text-white border-slate-700'
  }
];

export const PATH_RULES_SINGAPORE = [
  {
    type: 'footpath' as const,
    title: 'Public Footpaths',
    allowed: true,
    speedLimit: '6 km/h',
    badgeText: 'Allowed (Max 6 km/h)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    rules: [
      'Strict 6 km/h speed cap (reduced from 10 km/h).',
      'Always yield right-of-way to pedestrians.',
      'Maintain at least 1-metre passing clearance.',
      'Sound gentle alert bell well in advance.'
    ],
    icon: 'Footprints'
  },
  {
    type: 'shared-path' as const,
    title: 'Shared Paths & Cycling Paths (PCN)',
    allowed: true,
    speedLimit: '6 km/h',
    badgeText: 'Allowed (Max 6 km/h)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    rules: [
      'PMA users are restricted to 6 km/h even if cyclists ride up to 25 km/h.',
      'Keep left on Park Connector Networks (PCN).',
      'Turn on front white light and rear red reflector/light after 7:00 PM.'
    ],
    icon: 'Bike'
  },
  {
    type: 'pedestrian-only' as const,
    title: 'Pedestrian-Only Paths & Covered Walkways',
    allowed: true,
    speedLimit: 'Creep Speed (< 3 km/h)',
    badgeText: 'Caution: Walking Pace Only',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    rules: [
      'PMA users with mobility challenges are NOT required to dismount, unlike cyclists/PMD riders.',
      'However, you must operate strictly at walking pace (< 3 km/h).',
      'Exercise utmost patience in crowded market and school zones.'
    ],
    icon: 'Users'
  },
  {
    type: 'road' as const,
    title: 'Public Roads & Expressways',
    allowed: false,
    speedLimit: 'STRICTLY PROHIBITED',
    badgeText: 'Illegal / Strictly Banned',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    rules: [
      'PMAs are NEVER allowed on roads under the Active Mobility Act.',
      'Cross roads only at designated signalized pedestrian crossings or zebra crossings.',
      'Stop and look left and right before traversing crossing.'
    ],
    icon: 'ShieldAlert'
  },
  {
    type: 'mrt-bus' as const,
    title: 'Public Transport (MRT & Public Buses)',
    allowed: true,
    speedLimit: 'Station/Cabin Speed (< 4 km/h)',
    badgeText: 'Accessible Boarding Allowed',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    rules: [
      'Device must not exceed 70cm width and 120cm length.',
      'Total laden weight (device + rider) must not exceed 300kg.',
      'At MRT: Use wide faregates (90cm) and passenger service elevators.',
      'On Buses: Wait at front door or signal Captain to deploy the wheelchair ramp (80cm width).'
    ],
    icon: 'Bus'
  }
];
