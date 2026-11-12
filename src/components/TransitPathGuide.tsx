import React, { useState } from 'react';
import { 
  Bus, 
  Train, 
  Footprints, 
  ShieldAlert, 
  CheckCircle2, 
  AlertOctagon, 
  Info, 
  Volume2, 
  ArrowRight,
  Eye,
  PhoneOff,
  Navigation
} from 'lucide-react';
import { PATH_RULES_SINGAPORE } from '../data/pmaData';

export const TransitPathGuide: React.FC = () => {
  const [selectedTransit, setSelectedTransit] = useState<'mrt' | 'bus'>('mrt');

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-lg bg-teal-50 text-teal-700">
                <Navigation className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-display text-slate-900">
                Singapore Public Transit &amp; Path Code of Conduct
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Guidelines established under Singapore&apos;s Active Mobility Act (AMA) and Land Transport Authority for safe, gracious transit across footpaths, PCN cycling tracks, MRT trains, and public buses.
            </p>
          </div>

          {/* Quick Road Ban Highlight */}
          <div className="px-3 py-2 bg-rose-50 border border-rose-300 rounded-xl flex items-center space-x-2.5 text-rose-900">
            <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <div className="text-xs font-bold">
              <span>Roads: Strictly Illegal</span>
              <div className="text-[10px] text-rose-700 font-normal">Use signalized pedestrian crossings only</div>
            </div>
          </div>
        </div>

        {/* 6 Core Rules of the Active Mobility Code of Conduct */}
        <div className="mt-6">
          <h3 className="font-display font-bold text-sm text-slate-900 mb-3">
            LTA Active Mobility Statutory Code of Conduct (Mandatory Rules)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-teal-100 text-teal-800 flex-shrink-0">
                <Footprints className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">1. Pedestrian Right-of-Way</div>
                <p className="text-slate-600 mt-0.5">Always slow down and give way to pedestrians, young children, and the elderly.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-teal-100 text-teal-800 flex-shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">2. Night Illumination</div>
                <p className="text-slate-600 mt-0.5">Switch on your front white light and rear red light when riding between 7:00 PM and 7:00 AM.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-800 flex-shrink-0">
                <PhoneOff className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">3. No Mobile Devices</div>
                <p className="text-slate-600 mt-0.5">Operating mobile phones or texting while steering a moving mobility aid is illegal.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-teal-100 text-teal-800 flex-shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">4. Courteous Warning Bell</div>
                <p className="text-slate-600 mt-0.5">Ring your bell or say &apos;excuse me&apos; well before overtaking to avoid startling others.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-800 flex-shrink-0">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">5. Road Travel Banned</div>
                <p className="text-slate-600 mt-0.5">Never travel on roads alongside cars/buses. Cross only at zebra and traffic light crossings.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-teal-100 text-teal-800 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">6. Single Rider Only</div>
                <p className="text-slate-600 mt-0.5">Carrying pillion passengers or towing secondary trailers is strictly prohibited.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Path Types Rules Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <h3 className="font-display font-bold text-base text-slate-900 mb-4">
          Where PMAs Can &amp; Cannot Be Used in Singapore
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PATH_RULES_SINGAPORE.map((path, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                path.allowed 
                  ? 'border-slate-200 bg-slate-50/60' 
                  : 'border-rose-300 bg-rose-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                  <span>{path.title}</span>
                </h4>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${path.badgeColor}`}>
                  {path.badgeText}
                </span>
              </div>
              <div className="text-xs text-slate-600 mb-2">
                <strong>Speed Rule:</strong> <span className="font-mono font-bold text-slate-800">{path.speedLimit}</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                {path.rules.map((r, rIdx) => (
                  <li key={rIdx}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Public Transport Boarding Protocol (MRT vs Bus) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900">
              Singapore Public Transport Boarding Manual
            </h3>
            <p className="text-xs text-slate-500">
              Step-by-step procedures for taking your PMA onto MRT trains and public buses safely.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedTransit('mrt')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 min-h-[44px] ${
                selectedTransit === 'mrt'
                  ? 'bg-[#0F172A] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Train className="w-4 h-4 text-teal-400" />
              <span>MRT Trains</span>
            </button>

            <button
              onClick={() => setSelectedTransit('bus')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 min-h-[44px] ${
                selectedTransit === 'bus'
                  ? 'bg-[#0F172A] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Bus className="w-4 h-4 text-teal-400" />
              <span>Public Buses</span>
            </button>
          </div>
        </div>

        {/* Selected Content */}
        {selectedTransit === 'mrt' ? (
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-teal-700 uppercase">Step 1</span>
                <h4 className="font-bold text-sm text-slate-900">Station Entry &amp; Lifts</h4>
                <p className="text-xs text-slate-600">
                  All MRT stations feature barrier-free street-to-concourse elevators (min 90cm door clearance). Avoid escalators.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-teal-700 uppercase">Step 2</span>
                <h4 className="font-bold text-sm text-slate-900">Use Wide Faregates (90 cm)</h4>
                <p className="text-xs text-slate-600">
                  Always tap in at the designated wide manual or automated faregate (90cm). Standard faregates (60cm) are too narrow for PMAs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-teal-700 uppercase">Step 3</span>
                <h4 className="font-bold text-sm text-slate-900">Platform &amp; Train Cabin</h4>
                <p className="text-xs text-slate-600">
                  Board at cars designated with the international wheelchair access symbol. Park in the designated wheelchair space and apply your parking brake.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 flex items-center space-x-2">
              <Info className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>
                <strong>Tip:</strong> During peak hours (7:30 AM - 9:00 AM, 6:00 PM - 7:30 PM), SMRT / SBS staff at passenger service counters can provide ramp assistance upon request.
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-teal-700 uppercase">Step 1</span>
                <h4 className="font-bold text-sm text-slate-900">Bus Stop Queuing</h4>
                <p className="text-xs text-slate-600">
                  Wait at the designated wheelchair boarding decal on the bus shelter pavement. Raise your hand clearly to alert the Bus Captain.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-teal-700 uppercase">Step 2</span>
                <h4 className="font-bold text-sm text-slate-900">Ramp Deployment (80 cm)</h4>
                <p className="text-xs text-slate-600">
                  The Bus Captain will kneel the bus suspension and deploy the 80cm-wide rear boarding ramp. Ascend smoothly into the cabin.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-teal-700 uppercase">Step 3</span>
                <h4 className="font-bold text-sm text-slate-900">Secure in Wheelchair Bay</h4>
                <p className="text-xs text-slate-600">
                  Position your PMA with the backrest firmly against the padded cushion facing backwards. Fasten the safety belt and switch off power.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center space-x-2">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Capacity:</strong> Most public buses accommodate up to two wheelchair or PMA users at a time. If the bay is full, please wait for the next service.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
