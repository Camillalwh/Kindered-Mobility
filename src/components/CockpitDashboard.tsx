import React, { useState } from 'react';
import { 
  Gauge, 
  BatteryCharging, 
  Lightbulb, 
  ShieldAlert, 
  Compass, 
  Navigation, 
  Zap, 
  AlertTriangle,
  Flame,
  CheckCircle2,
  Sliders,
  Footprints,
  Bike,
  Bus,
  RotateCcw
} from 'lucide-react';
import { TelemetryData, DriveMode, PathType } from '../types';
import { LTA_STATUTORY_LIMITS } from '../data/pmaData';

interface CockpitProps {
  telemetry: TelemetryData;
  setTelemetry: React.Dispatch<React.SetStateAction<TelemetryData>>;
  onOpenCompliance: () => void;
  onOpenInfographics: () => void;
}

export const CockpitDashboard: React.FC<CockpitProps> = ({
  telemetry,
  setTelemetry,
  onOpenCompliance,
  onOpenInfographics
}) => {
  const [governorAlert, setGovernorAlert] = useState<string | null>(null);

  const handleSpeedChange = (newSpeed: number) => {
    // If user tries to push beyond 6.0 km/h, trigger the LTA governor intervention!
    if (newSpeed > LTA_STATUTORY_LIMITS.maxSpeedKmH) {
      setGovernorAlert('LTA Active Mobility Act Speed Governor Intervened: Capped strictly at 6.0 km/h on public footpaths.');
      setTelemetry(prev => ({
        ...prev,
        speed: 6.0,
        isOverSpeed: true,
        motorWatts: 140,
      }));
    } else {
      if (governorAlert) setGovernorAlert(null);
      setTelemetry(prev => ({
        ...prev,
        speed: Number(newSpeed.toFixed(1)),
        isOverSpeed: false,
        motorWatts: Math.round(newSpeed * 28 + (newSpeed > 0 ? 30 : 0)),
        currentAmps: Number((newSpeed * 1.1 + 0.5).toFixed(1)),
      }));
    }
  };

  const setDriveMode = (mode: DriveMode) => {
    let speedCap = 6.0;
    if (mode === 'eco') speedCap = 4.0;
    if (mode === 'transit-stow') speedCap = 0.0;

    setTelemetry(prev => ({
      ...prev,
      driveMode: mode,
      speed: Math.min(prev.speed, speedCap),
    }));
  };

  const setPathType = (path: PathType) => {
    setTelemetry(prev => ({
      ...prev,
      currentPath: path,
    }));
  };

  const toggleLights = (light: 'front' | 'rear') => {
    setTelemetry(prev => ({
      ...prev,
      [light === 'front' ? 'lightsFront' : 'lightsRear']: !prev[light === 'front' ? 'lightsFront' : 'lightsRear'],
    }));
  };

  // Segmented battery calculations (10 segments)
  const totalSegments = 10;
  const activeSegments = Math.round((telemetry.batteryPercentage / 100) * totalSegments);

  const isRoad = telemetry.currentPath === 'road';

  return (
    <div className="space-y-6 pb-20">
      {/* Critical Road Warning if user selected road */}
      {isRoad && (
        <div className="bg-rose-50 border-2 border-rose-500 rounded-xl p-4 flex items-start space-x-3 text-rose-900 elevation-2 animate-pulse">
          <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold font-display text-base text-rose-900">
              CRITICAL: PMAs Are Strictly Prohibited on Public Roads!
            </h4>
            <p className="text-xs text-rose-800 mt-1">
              Under Singapore&apos;s Active Mobility Act (AMA), personal mobility aids and mobility scooters cannot be ridden on roads or expressways at any time. Fines up to $2,000 or imprisonment may apply. Please return to footpaths or shared paths immediately.
            </p>
          </div>
        </div>
      )}

      {/* Speed Governor Intervention Banner */}
      {governorAlert && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center justify-between gap-3 text-amber-900 elevation-1">
          <div className="flex items-center space-x-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span className="text-xs font-semibold">{governorAlert}</span>
          </div>
          <button 
            onClick={() => setGovernorAlert(null)}
            className="text-xs font-bold text-amber-800 underline hover:text-amber-950"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* Primary Hardware Cockpit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Speedometer & Telemetry Governor (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 elevation-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-slate-900 rounded-lg text-white">
                  <Gauge className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Velocity Telemetry &amp; Speed Governor
                  </h3>
                  <p className="text-xs text-slate-500">
                    Singapore Statutory Footpath Limit: <strong className="text-slate-800">6.0 km/h</strong>
                  </p>
                </div>
              </div>

              {/* Status pill */}
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>Governor Armed</span>
              </div>
            </div>

            {/* Main Speed Display Gauge */}
            <div className="my-8 text-center relative">
              <div className="inline-block relative">
                {/* Dial background ring */}
                <div className="relative w-56 h-56 mx-auto rounded-full border-8 border-slate-100 flex items-center justify-center shadow-inner">
                  {/* Progress arc overlay */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="628"
                      strokeDashoffset={628 - (628 * (telemetry.speed / 6.0))}
                      className="text-[#0D9488] transition-all duration-300"
                    />
                  </svg>

                  <div className="flex flex-col items-center z-10">
                    <span className="text-5xl font-black font-display tracking-tight text-slate-900">
                      {telemetry.speed.toFixed(1)}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                      km / h
                    </span>
                    <span className="mt-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Legal Cap: 6.0 km/h
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-3 max-w-sm mx-auto">
                LTA reduced the device speed limit from 10 km/h to 6 km/h to match standard brisk walking pace for pedestrian safety.
              </p>
            </div>

            {/* Interactive Throttle Simulator */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center space-x-1">
                  <Sliders className="w-3.5 h-3.5 text-teal-600" />
                  <span>Interactive Throttle Lever</span>
                </span>
                <span className="font-mono text-teal-700 font-bold">{telemetry.speed.toFixed(1)} km/h</span>
              </div>

              <input
                type="range"
                min="0"
                max="8.0"
                step="0.1"
                value={telemetry.speed}
                onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
              />

              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>0 km/h (Halt)</span>
                <span className="text-teal-700 font-bold">4.0 km/h (Eco)</span>
                <span className="text-slate-900 font-bold underline">6.0 km/h (Legal Cap)</span>
                <span className="text-rose-500 font-bold">8.0 km/h (Governor Intercept)</span>
              </div>
            </div>
          </div>

          {/* Drive Modes Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Drive Profile Selector
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setDriveMode('eco')}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all min-h-[48px] border text-center ${
                  telemetry.driveMode === 'eco'
                    ? 'bg-[#0D9488] text-white border-teal-600 shadow-md ring-2 ring-teal-400/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>Eco Walking</div>
                <div className={`text-[10px] font-normal ${telemetry.driveMode === 'eco' ? 'text-teal-100' : 'text-slate-400'}`}>
                  Max 4.0 km/h
                </div>
              </button>

              <button
                onClick={() => setDriveMode('standard')}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all min-h-[48px] border text-center ${
                  telemetry.driveMode === 'standard'
                    ? 'bg-[#0F172A] text-white border-slate-800 shadow-md ring-2 ring-slate-400/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>Standard Urban</div>
                <div className={`text-[10px] font-normal ${telemetry.driveMode === 'standard' ? 'text-slate-300' : 'text-slate-400'}`}>
                  Max 6.0 km/h
                </div>
              </button>

              <button
                onClick={() => setDriveMode('transit-stow')}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all min-h-[48px] border text-center ${
                  telemetry.driveMode === 'transit-stow'
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>MRT / Stow</div>
                <div className={`text-[10px] font-normal ${telemetry.driveMode === 'transit-stow' ? 'text-amber-100' : 'text-slate-400'}`}>
                  Motor Disengaged
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Battery Segmented Gauge & Path State (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Specialized Segmented Battery & Range Gauge per spec */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-teal-50 rounded-lg text-teal-700">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Energy &amp; Range Telemetry
                  </h3>
                  <p className="text-xs text-slate-500">Lithium-ion UN38.3 SafePack</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Cell Health: 98%
              </span>
            </div>

            {/* High-visibility numerical readout */}
            <div className="my-5 flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-extrabold font-display text-slate-900">
                  {telemetry.estimatedRangeKm.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-slate-500 ml-1.5">KM REMAINING</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-teal-700">{telemetry.batteryPercentage}%</span>
                <div className="text-[11px] text-slate-400">{telemetry.batteryVoltage.toFixed(1)}V Nominal</div>
              </div>
            </div>

            {/* Specialized 10-Segment Bar Gauge */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Charge Level</span>
                <span>{activeSegments} / 10 Segments</span>
              </div>
              <div className="grid grid-cols-10 gap-1.5 h-6">
                {Array.from({ length: totalSegments }).map((_, index) => {
                  const isFilled = index < activeSegments;
                  const isLow = index < 2;
                  return (
                    <div
                      key={index}
                      className={`rounded-sm transition-all duration-300 ${
                        isFilled
                          ? isLow && activeSegments <= 2
                            ? 'bg-rose-500 shadow-sm'
                            : 'bg-[#0D9488] shadow-sm'
                          : 'bg-slate-100 border border-slate-200'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Real-time Electrical Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Power</div>
                <div className="text-xs font-bold text-slate-800">{telemetry.motorWatts} W</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Current</div>
                <div className="text-xs font-bold text-slate-800">{telemetry.currentAmps} A</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Temp</div>
                <div className="text-xs font-bold text-slate-800 flex items-center justify-center space-x-1">
                  <span>{telemetry.batteryTempC}°C</span>
                  <Flame className="w-3 h-3 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* LTA Safe Charging Note */}
            <div className="mt-4 p-3 bg-teal-50/60 rounded-xl border border-teal-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0" />
                <span className="text-slate-700 font-medium">Original Manufacturer Battery Certified</span>
              </div>
              <button 
                onClick={onOpenInfographics}
                className="text-teal-700 font-bold hover:underline"
              >
                Safety Tips
              </button>
            </div>
          </div>

          {/* Current Path & Lights Control */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
            <h4 className="font-display font-bold text-base text-slate-900 mb-3">
              Environment &amp; Hardware Controls
            </h4>

            {/* Statutory Lights Controls */}
            <div className="space-y-2 mb-4">
              <div className="text-xs font-semibold text-slate-600 flex items-center justify-between">
                <span>Statutory Night Illumination</span>
                <span className="text-[10px] text-slate-400">Mandatory 7PM - 7AM</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleLights('front')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-bold flex items-center justify-center space-x-2 transition-all min-h-[48px] ${
                    telemetry.lightsFront
                      ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Lightbulb className={`w-4 h-4 ${telemetry.lightsFront ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
                  <span>Front White Light {telemetry.lightsFront ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => toggleLights('rear')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-bold flex items-center justify-center space-x-2 transition-all min-h-[48px] ${
                    telemetry.lightsRear
                      ? 'bg-rose-100 border-rose-300 text-rose-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Lightbulb className={`w-4 h-4 ${telemetry.lightsRear ? 'text-rose-600 fill-rose-500' : 'text-slate-400'}`} />
                  <span>Rear Red Light {telemetry.lightsRear ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Path Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Active Path Type (Tap to simulate location context)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPathType('footpath')}
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center space-x-2 text-left min-h-[48px] ${
                    telemetry.currentPath === 'footpath'
                      ? 'bg-slate-900 text-white border-slate-900 shadow'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Footprints className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <div>
                    <div>Footpath</div>
                    <div className="text-[10px] text-slate-400 font-normal">Cap 6 km/h</div>
                  </div>
                </button>

                <button
                  onClick={() => setPathType('shared-path')}
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center space-x-2 text-left min-h-[48px] ${
                    telemetry.currentPath === 'shared-path'
                      ? 'bg-slate-900 text-white border-slate-900 shadow'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bike className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <div>
                    <div>Shared Path (PCN)</div>
                    <div className="text-[10px] text-slate-400 font-normal">Cap 6 km/h for PMA</div>
                  </div>
                </button>

                <button
                  onClick={() => setPathType('mrt-bus')}
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center space-x-2 text-left min-h-[48px] ${
                    telemetry.currentPath === 'mrt-bus'
                      ? 'bg-slate-900 text-white border-slate-900 shadow'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bus className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <div>
                    <div>MRT / Bus Bay</div>
                    <div className="text-[10px] text-slate-400 font-normal">Transit clearance</div>
                  </div>
                </button>

                <button
                  onClick={() => setPathType('road')}
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center space-x-2 text-left min-h-[48px] ${
                    telemetry.currentPath === 'road'
                      ? 'bg-rose-700 text-white border-rose-800 shadow'
                      : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <div>
                    <div>Public Road</div>
                    <div className="text-[10px] font-bold text-rose-300">BANNED by LTA</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Log & Quick Verification Action Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 elevation-1 flex items-center space-x-4">
          <div className="p-3 bg-slate-100 rounded-xl text-slate-800">
            <Navigation className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Today&apos;s Urban Transit</div>
            <div className="text-xl font-bold font-display text-slate-900">{telemetry.todayDistanceKm.toFixed(2)} km</div>
            <div className="text-[11px] text-slate-400">Total Odometer: {telemetry.totalOdometerKm.toFixed(1)} km</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 elevation-1 flex items-center space-x-4">
          <div className="p-3 bg-teal-50 rounded-xl text-teal-700">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Active Geolocation</div>
            <div className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
              {telemetry.locationName}
            </div>
            <div className="text-[11px] text-teal-700 font-mono">1.3521° N, 103.8198° E</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0F172A] to-[#131B2E] p-5 rounded-xl text-white elevation-1 flex items-center justify-between">
          <div>
            <div className="text-xs text-teal-400 font-bold uppercase tracking-wider">Statutory Check</div>
            <div className="text-sm font-bold mt-0.5">Is My Mobility Scooter Legal?</div>
            <p className="text-[11px] text-slate-300">Test 70cm width, 120cm length &amp; single seat</p>
          </div>
          <button
            onClick={onOpenCompliance}
            className="px-4 py-2.5 rounded-lg bg-[#0D9488] hover:bg-teal-600 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap min-h-[44px]"
          >
            Verify Device
          </button>
        </div>
      </div>
    </div>
  );
};
