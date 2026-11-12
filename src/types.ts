export type TabType = 
  | 'cockpit' 
  | 'compliance' 
  | 'medical-cmn' 
  | 'transit-rules' 
  | 'infographics' 
  | 'caregiver'
  | 'catalog';

export type PathType = 'footpath' | 'cycling-path' | 'shared-path' | 'pedestrian-only' | 'road' | 'mrt-bus';

export type DriveMode = 'eco' | 'standard' | 'transit-stow';

export interface TelemetryData {
  speed: number; // km/h
  maxSpeedLimit: number; // 6 km/h for public paths
  isOverSpeed: boolean;
  batteryPercentage: number;
  estimatedRangeKm: number;
  batteryVoltage: number;
  batteryTempC: number;
  motorWatts: number;
  currentAmps: number;
  totalOdometerKm: number;
  todayDistanceKm: number;
  lightsFront: boolean;
  lightsRear: boolean;
  emergencyBrakeEngaged: boolean;
  currentPath: PathType;
  driveMode: DriveMode;
  locationName: string;
  lat: number;
  lng: number;
}

export interface DimensionCheckInput {
  modelName: string;
  widthCm: number;      // max 70 cm
  lengthCm: number;     // max 120 cm
  heightCm: number;     // max 150 cm (including seated user)
  ladenWeightKg: number;// max 300 kg (device + user)
  wheelsCount: number;  // >= 3
  seatsCount: number;   // strictly 1
  hasFootboard: boolean;// required
  maxSpeedCapKmH: number; // must be <= 6 km/h
  isOriginalBattery: boolean;
}

export interface DimensionValidationResult {
  isFullyCompliant: boolean;
  canBoardMRT: boolean;
  canBoardBuses: boolean;
  widthPass: boolean;
  lengthPass: boolean;
  heightPass: boolean;
  weightPass: boolean;
  wheelsPass: boolean;
  seatsPass: boolean;
  speedPass: boolean;
  batterySafetyPass: boolean;
  warnings: string[];
}

export interface PMAModel {
  id: string;
  name: string;
  manufacturer: string;
  type: 'mobility-scooter' | 'motorised-wheelchair' | 'manual-wheelchair';
  wheels: number;
  widthCm: number;
  lengthCm: number;
  heightCm: number;
  unladenWeightKg: number;
  maxLadenWeightKg: number;
  maxSpeedKmH: number;
  batteryType: string;
  rangeKm: number;
  isLTAWhitelisted: boolean;
  image: string;
  description: string;
}

export interface CaregiverAlert {
  id: string;
  timestamp: string;
  type: 'emergency-sos' | 'battery-low' | 'speed-warning' | 'geofence-exit' | 'fall-detected';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  resolved: boolean;
}
