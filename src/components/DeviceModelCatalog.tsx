import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Ruler, 
  Battery, 
  Search, 
  Filter, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { POPULAR_PMA_MODELS, LTA_STATUTORY_LIMITS } from '../data/pmaData';
import { PMAModel } from '../types';

interface DeviceModelCatalogProps {
  onSelectForCompliance: (model: PMAModel) => void;
}

export const DeviceModelCatalog: React.FC<DeviceModelCatalogProps> = ({ onSelectForCompliance }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredModels = POPULAR_PMA_MODELS.filter((model) => {
    const matchesFilter = filterType === 'all' || model.type === filterType;
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-lg bg-teal-50 text-teal-700">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-display text-slate-900">
                Singapore Retailer Whitelist &amp; Model Registry
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              From 1 June 2026, retailers in Singapore can only sell LTA-whitelisted mobility scooter models. Compare verified physical dimensions, factory 6 km/h speed limits, and battery certifications.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search model or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Filter Category:</span>
          {[
            { id: 'all', label: 'All Devices' },
            { id: 'mobility-scooter', label: 'Mobility Scooters' },
            { id: 'motorised-wheelchair', label: 'Motorised Wheelchairs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition min-h-[40px] border ${
                filterType === tab.id
                  ? 'bg-[#0F172A] text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => {
          const isOverWidth = model.widthCm > LTA_STATUTORY_LIMITS.maxWidthCm;
          const isOverLength = model.lengthCm > LTA_STATUTORY_LIMITS.maxLengthCm;
          const isOverSpeed = model.maxSpeedKmH > LTA_STATUTORY_LIMITS.maxSpeedKmH;

          return (
            <div
              key={model.id}
              className={`bg-white rounded-2xl border overflow-hidden elevation-1 flex flex-col justify-between transition-all hover:shadow-lg ${
                model.isLTAWhitelisted ? 'border-slate-200' : 'border-rose-300 ring-2 ring-rose-200'
              }`}
            >
              <div>
                {/* Photo & Compliance Header */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    {model.isLTAWhitelisted ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-md flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>LTA Whitelisted</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600 text-white shadow-md flex items-center space-x-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Illegal / Banned</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono text-white">
                    {model.wheels}-Wheeler
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {model.manufacturer}
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 mt-0.5 mb-2">
                    {model.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    {model.description}
                  </p>

                  {/* Dimension Badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className={`p-2 rounded-lg border ${
                      isOverWidth ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <div className="text-[10px] text-slate-400 font-semibold">Width (Max 70cm)</div>
                      <div className="font-bold font-mono">{model.widthCm} cm {isOverWidth && '✗ EXCEEDS'}</div>
                    </div>

                    <div className={`p-2 rounded-lg border ${
                      isOverLength ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <div className="text-[10px] text-slate-400 font-semibold">Length (Max 120cm)</div>
                      <div className="font-bold font-mono">{model.lengthCm} cm {isOverLength && '✗ EXCEEDS'}</div>
                    </div>

                    <div className={`p-2 rounded-lg border ${
                      isOverSpeed ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <div className="text-[10px] text-slate-400 font-semibold">Speed Cap</div>
                      <div className="font-bold font-mono">{model.maxSpeedKmH} km/h</div>
                    </div>

                    <div className="p-2 rounded-lg border bg-slate-50 border-slate-200 text-slate-700">
                      <div className="text-[10px] text-slate-400 font-semibold">Weight Unladen</div>
                      <div className="font-bold font-mono">{model.unladenWeightKg} kg</div>
                    </div>
                  </div>

                  {/* Battery Spec */}
                  <div className="text-[11px] text-slate-600 bg-teal-50/50 p-2 rounded-lg border border-teal-100 flex items-center space-x-1.5">
                    <Battery className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span className="truncate">{model.batteryType}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => onSelectForCompliance(model)}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 transition min-h-[44px]"
                >
                  <Ruler className="w-3.5 h-3.5 text-teal-400" />
                  <span>Test in Dimension Caliper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
