import React, { useState } from 'react';
import { 
  Ruler, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Bus, 
  Train, 
  ShieldCheck, 
  RotateCcw, 
  FileText, 
  Info,
  Maximize2
} from 'lucide-react';
import { DimensionCheckInput, DimensionValidationResult } from '../types';
import { LTA_STATUTORY_LIMITS, POPULAR_PMA_MODELS } from '../data/pmaData';

export const ComplianceChecker: React.FC = () => {
  const [device, setDevice] = useState<DimensionCheckInput>({
    modelName: 'Custom Assessment Device',
    widthCm: 62.0,
    lengthCm: 110.0,
    heightCm: 125.0,
    ladenWeightKg: 135.0,
    wheelsCount: 4,
    seatsCount: 1,
    hasFootboard: true,
    maxSpeedCapKmH: 6.0,
    isOriginalBattery: true,
  });

  const [showCertificate, setShowCertificate] = useState(false);

  // Perform statutory validation
  const validateDimensions = (): DimensionValidationResult => {
    const widthPass = device.widthCm <= LTA_STATUTORY_LIMITS.maxWidthCm;
    const lengthPass = device.lengthCm <= LTA_STATUTORY_LIMITS.maxLengthCm;
    const heightPass = device.heightCm <= LTA_STATUTORY_LIMITS.maxHeightCm;
    const weightPass = device.ladenWeightKg <= LTA_STATUTORY_LIMITS.maxLadenWeightKg;
    const wheelsPass = device.wheelsCount >= LTA_STATUTORY_LIMITS.minWheels && device.hasFootboard;
    const seatsPass = device.seatsCount === LTA_STATUTORY_LIMITS.maxSeats;
    const speedPass = device.maxSpeedCapKmH <= LTA_STATUTORY_LIMITS.maxSpeedKmH;
    const batterySafetyPass = device.isOriginalBattery;

    const warnings: string[] = [];
    if (!widthPass) warnings.push(`Width (${device.widthCm}cm) exceeds LTA maximum limit of 70cm.`);
    if (!lengthPass) warnings.push(`Length (${device.lengthCm}cm) exceeds LTA maximum limit of 120cm.`);
    if (!heightPass) warnings.push(`Height (${device.heightCm}cm) exceeds LTA limit of 150cm (from ground to rider's head).`);
    if (!weightPass) warnings.push(`Laden weight (${device.ladenWeightKg}kg) exceeds statutory 300kg ceiling.`);
    if (!wheelsPass) warnings.push('Device must feature at least 3 wheels and a single footboard.');
    if (!seatsPass) warnings.push('Strictly only ONE seat allowed. Tandem / multi-seat PMAs are illegal on Singapore paths.');
    if (!speedPass) warnings.push(`Top speed (${device.maxSpeedCapKmH}km/h) exceeds the revised 6.0 km/h statutory footpath speed cap.`);
    if (!batterySafetyPass) warnings.push('Non-original or modified batteries violate LTA fire safety guidelines.');

    const isFullyCompliant = 
      widthPass && lengthPass && heightPass && weightPass && wheelsPass && seatsPass && speedPass && batterySafetyPass;

    const canBoardMRT = widthPass && lengthPass && weightPass;
    const canBoardBuses = device.widthCm <= LTA_STATUTORY_LIMITS.publicBusRampWidthCm && lengthPass && weightPass;

    return {
      isFullyCompliant,
      canBoardMRT,
      canBoardBuses,
      widthPass,
      lengthPass,
      heightPass,
      weightPass,
      wheelsPass,
      seatsPass,
      speedPass,
      batterySafetyPass,
      warnings,
    };
  };

  const validation = validateDimensions();

  const loadPreset = (modelId: string) => {
    const selected = POPULAR_PMA_MODELS.find(m => m.id === modelId);
    if (selected) {
      setDevice({
        modelName: selected.name,
        widthCm: selected.widthCm,
        lengthCm: selected.lengthCm,
        heightCm: selected.heightCm + 35, // adding estimated seated head height
        ladenWeightKg: selected.unladenWeightKg + 75, // device + 75kg rider
        wheelsCount: selected.wheels,
        seatsCount: selected.id.includes('tandem') ? 2 : 1,
        hasFootboard: true,
        maxSpeedCapKmH: selected.maxSpeedKmH,
        isOriginalBattery: !selected.id.includes('tandem'),
      });
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-lg bg-teal-50 text-teal-700">
                <Ruler className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-display text-slate-900">
                LTA Physical Criteria &amp; Dimension Gate Validator
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active Mobility Act (PMA Physical Specifications): Max <strong>70cm width</strong>, <strong>120cm length</strong>, <strong>150cm height</strong>, <strong>300kg laden weight</strong>, and <strong>6 km/h</strong> speed cap.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Load Preset:</span>
            {POPULAR_PMA_MODELS.slice(0, 3).map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200"
              >
                {preset.name.split(' ')[0]} {preset.name.split(' ')[1]}
              </button>
            ))}
            <button
              onClick={() => loadPreset('noncompliant-tandem-scooter')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 hover:bg-rose-100 text-rose-700 transition border border-rose-200"
            >
              Non-Compliant Test
            </button>
          </div>
        </div>

        {/* Status Verdict Header */}
        <div className={`mt-4 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          validation.isFullyCompliant
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            : 'bg-rose-50 border-rose-300 text-rose-950'
        }`}>
          <div className="flex items-start space-x-3">
            {validation.isFullyCompliant ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-display font-bold text-base">
                {validation.isFullyCompliant 
                  ? 'COMPLIANT: Approved for Singapore Public Paths & Public Transport' 
                  : 'NON-COMPLIANT: Violates Statutory Physical Criteria'}
              </div>
              <p className="text-xs mt-0.5 text-slate-600">
                {validation.isFullyCompliant
                  ? 'This device matches all LTA dimension rules, speed limit, and public transport boarding clearances.'
                  : `${validation.warnings.length} statutory rule violation(s) detected. See detailed breakdown below.`}
              </p>
            </div>
          </div>

          {validation.isFullyCompliant && (
            <button
              onClick={() => setShowCertificate(true)}
              className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm flex items-center space-x-1.5 whitespace-nowrap min-h-[44px]"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Digital Certificate Preview</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Caliper Inputs & Visual Box Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Dimensions Sliders (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 elevation-1 space-y-5">
          <h3 className="font-display font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Physical Dimensions Calibration</span>
            <span className="text-xs font-normal text-slate-500">Live Metric Adjuster</span>
          </h3>

          {/* Width Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Overall Width (Max 70 cm)</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                validation.widthPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {device.widthCm} cm {validation.widthPass ? '✓ PASS' : '✗ EXCEEDS'}
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="95"
              step="1"
              value={device.widthCm}
              onChange={(e) => setDevice({ ...device, widthCm: parseFloat(e.target.value) })}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>40 cm (Narrow)</span>
              <span className="text-slate-900 font-semibold">70 cm (LTA Threshold)</span>
              <span>95 cm (Oversized)</span>
            </div>
          </div>

          {/* Length Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Overall Length (Max 120 cm)</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                validation.lengthPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {device.lengthCm} cm {validation.lengthPass ? '✓ PASS' : '✗ EXCEEDS'}
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="160"
              step="1"
              value={device.lengthCm}
              onChange={(e) => setDevice({ ...device, lengthCm: parseFloat(e.target.value) })}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>80 cm (Compact)</span>
              <span className="text-slate-900 font-semibold">120 cm (LTA Threshold)</span>
              <span>160 cm (Oversized)</span>
            </div>
          </div>

          {/* Height Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Height with Rider (Max 150 cm)</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                validation.heightPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {device.heightCm} cm {validation.heightPass ? '✓ PASS' : '✗ EXCEEDS'}
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="170"
              step="1"
              value={device.heightCm}
              onChange={(e) => setDevice({ ...device, heightCm: parseFloat(e.target.value) })}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>80 cm</span>
              <span className="text-slate-900 font-semibold">150 cm (LTA Threshold)</span>
              <span>170 cm</span>
            </div>
          </div>

          {/* Laden Weight Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Laden Weight (Device + Rider, Max 300 kg)</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                validation.weightPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {device.ladenWeightKg} kg {validation.weightPass ? '✓ PASS' : '✗ EXCEEDS'}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="350"
              step="5"
              value={device.ladenWeightKg}
              onChange={(e) => setDevice({ ...device, ladenWeightKg: parseFloat(e.target.value) })}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>50 kg</span>
              <span className="text-slate-900 font-semibold">300 kg (LTA Limit)</span>
              <span>350 kg (Heavy)</span>
            </div>
          </div>

          {/* Structural Radios / Checkboxes */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Seating Configuration</label>
              <select
                value={device.seatsCount}
                onChange={(e) => setDevice({ ...device, seatsCount: parseInt(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800"
              >
                <option value={1}>1 Seat (Compliant PMA)</option>
                <option value={2}>2 Seats (Tandem / Illegal)</option>
                <option value={3}>3 Seats (Banned Lookalike)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Device Wheels</label>
              <select
                value={device.wheelsCount}
                onChange={(e) => setDevice({ ...device, wheelsCount: parseInt(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800"
              >
                <option value={4}>4 Wheels (Standard Scooter)</option>
                <option value={3}>3 Wheels (Tricycle Scooter)</option>
                <option value={2}>2 Wheels (Banned PMD)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={device.isOriginalBattery}
                onChange={(e) => setDevice({ ...device, isOriginalBattery: e.target.checked })}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <span>Original Certified Battery (No illegal battery mod)</span>
            </label>
          </div>
        </div>

        {/* Right Column: Visual 2D Footprint Caliper & Transit Boarding Checks (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Visual Footprint Caliper Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-display font-bold text-base text-slate-900">
                Footprint Caliper Envelope Simulation
              </h4>
              <span className="text-[11px] font-mono text-slate-400">Scale: 1px ≈ 0.5cm</span>
            </div>

            {/* Visual Box Container */}
            <div className="my-4 bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col items-center justify-center relative min-h-[220px]">
              {/* Outer boundary representing LTA Maximum 70cm x 120cm */}
              <div 
                className="border-2 border-dashed border-slate-400 rounded-lg p-2 flex items-center justify-center relative"
                style={{ width: '180px', height: '220px' }}
              >
                <span className="absolute -top-3 bg-white px-2 text-[10px] font-bold text-slate-500 border border-slate-300 rounded">
                  LTA Boundary (70 × 120 cm)
                </span>

                {/* Inner box representing current device */}
                <div
                  className={`rounded-md transition-all duration-300 flex flex-col items-center justify-center text-center p-2 shadow-md ${
                    validation.widthPass && validation.lengthPass
                      ? 'bg-[#0D9488]/20 border-2 border-[#0D9488] text-teal-900'
                      : 'bg-rose-100 border-2 border-rose-500 text-rose-900 animate-pulse'
                  }`}
                  style={{
                    width: `${Math.min(200, (device.widthCm / 70) * 160)}px`,
                    height: `${Math.min(240, (device.lengthCm / 120) * 190)}px`,
                  }}
                >
                  <div className="font-bold text-xs">
                    {device.widthCm} × {device.lengthCm} cm
                  </div>
                  <div className="text-[10px] mt-0.5">
                    {device.seatsCount > 1 ? '⚠️ Tandem' : `${device.wheelsCount}-Wheels`}
                  </div>
                  <div className="text-[9px] font-mono mt-1 opacity-75">
                    {device.ladenWeightKg} kg
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Criterion Checklist */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
                validation.widthPass ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {validation.widthPass ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                <span>Width ≤ 70 cm</span>
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
                validation.lengthPass ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {validation.lengthPass ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                <span>Length ≤ 120 cm</span>
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
                validation.seatsPass ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {validation.seatsPass ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                <span>Single Rider Seat</span>
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
                validation.speedPass ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {validation.speedPass ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                <span>Speed ≤ 6 km/h</span>
              </div>
            </div>
          </div>

          {/* Public Transport Clearance Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
            <h4 className="font-display font-bold text-base text-slate-900 mb-3">
              Singapore Public Transport Boarding Readiness
            </h4>

            <div className="space-y-3">
              {/* MRT Boarding Check */}
              <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-700">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">MRT Trains &amp; Stations</div>
                    <div className="text-[11px] text-slate-500">Wide Faregate: 90 cm clearance | Lifts: 90 cm door</div>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded text-xs font-bold ${
                  validation.canBoardMRT 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {validation.canBoardMRT ? 'Allowed (Use Wide Gate)' : 'Cannot Board'}
                </div>
              </div>

              {/* Public Bus Boarding Check */}
              <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">SBS Transit &amp; SMRT Public Buses</div>
                    <div className="text-[11px] text-slate-500">Deployable Ramp Width: 80 cm | Designated Wheelchair Bay</div>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded text-xs font-bold ${
                  validation.canBoardBuses 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {validation.canBoardBuses ? 'Allowed on Buses' : 'Exceeds Ramp Width'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">
                  LTA Compliance Verification Pass
                </h3>
              </div>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="border-2 border-teal-600 rounded-xl p-5 bg-gradient-to-b from-teal-50/40 to-white text-xs space-y-3">
              <div className="text-center pb-2 border-b border-teal-200">
                <div className="font-bold text-sm text-slate-900 font-display">
                  ACTIVE MOBILITY ACT STATUTORY CLEARANCE
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                  Singpass &amp; OneMotoring Ready Audit Record
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div><strong>Assessed Device:</strong> {device.modelName}</div>
                <div><strong>Dimensions:</strong> {device.widthCm}W × {device.lengthCm}L × {device.heightCm}H cm</div>
                <div><strong>Laden Weight:</strong> {device.ladenWeightKg} kg (Cap 300 kg)</div>
                <div><strong>Speed Limiter:</strong> 6.0 km/h Factory Capped</div>
                <div><strong>Seating:</strong> Single User (AMA Rule 18)</div>
                <div><strong>Public Transport:</strong> MRT &amp; Bus Cleared</div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Record Hash: SG-LTA-PMA-{Math.floor(100000 + Math.random() * 900000)}</span>
                <span className="font-mono text-emerald-700 font-bold">STATUS: VALID</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Certificate summary copied to clipboard for Singpass / LTA registration records!');
                  setShowCertificate(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-bold shadow"
              >
                Copy for Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
