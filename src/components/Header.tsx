import React, { useState } from 'react';
import { 
  Gauge, 
  Ruler, 
  FileCheck, 
  Bus, 
  Image as ImageIcon, 
  ShieldCheck, 
  Radio, 
  Bell, 
  Sparkles,
  Search
} from 'lucide-react';
import { TabType, TelemetryData } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  telemetry: TelemetryData;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange, telemetry }) => {
  const [bellActive, setBellActive] = useState(false);

  // Synthesize crisp dual-tone bicycle/mobility chime via Web Audio API
  const ringCourtesyBell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      playTone(2093, 0, 0.35); // C7
      playTone(2637, 0.12, 0.45); // E7
      
      setBellActive(true);
      setTimeout(() => setBellActive(false), 800);
    } catch {
      // AudioContext fallback
      setBellActive(true);
      setTimeout(() => setBellActive(false), 500);
    }
  };

  const navItems = [
    { id: 'cockpit' as TabType, label: 'Cockpit & Telemetry', icon: Gauge, badge: 'Live 6 km/h' },
    { id: 'compliance' as TabType, label: 'LTA Dimension Checker', icon: Ruler, badge: '70×120cm' },
    { id: 'medical-cmn' as TabType, label: 'Medical Need (CMN)', icon: FileCheck, badge: 'Age 70+' },
    { id: 'transit-rules' as TabType, label: 'MRT, Bus & Path Rules', icon: Bus, badge: 'Conduct' },
    { id: 'infographics' as TabType, label: 'Official LTA Posters', icon: ImageIcon, badge: 'Hotlinked' },
    { id: 'caregiver' as TabType, label: 'Caregiver Telemetry', icon: ShieldCheck, badge: 'Connected' },
    { id: 'catalog' as TabType, label: 'Approved Models', icon: Search, badge: 'Whitelist' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] text-white border-b border-slate-800 shadow-lg">
      {/* Top Banner: Singapore Statutory Active Mobility Compliance */}
      <div className="bg-[#131B2E] border-b border-slate-800 px-4 py-2 text-xs font-medium text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#0D9488]/20 text-[#14B8A6] border border-[#0D9488]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse mr-1.5"></span>
              Singapore LTA Active Mobility Act Compliant
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">
              Statutory Speed Cap: <strong className="text-white">6 km/h</strong> on public footpaths
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>CAN-Bus Connected: <strong>Solax Mobie-S</strong></span>
            </div>
            <div className="hidden md:flex items-center space-x-1.5 text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <span className="text-[#14B8A6] font-bold">{telemetry.batteryPercentage}%</span>
              <span>({telemetry.estimatedRangeKm.toFixed(1)} km)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#0F172A] border border-teal-400/40 flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-teal-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold font-display tracking-tight text-white">
                Kinetic Dignity
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                PMA-OS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              High-Precision Personal Mobility &amp; LTA Compliance
            </p>
          </div>
        </div>

        {/* Action Chime & Quick Stat */}
        <div className="flex items-center space-x-2">
          {/* Tactile Courtesy Bell */}
          <button
            onClick={ringCourtesyBell}
            aria-label="Sound pedestrian alert bell"
            title="Sound Courtesy Bell (LTA Best Practice when passing pedestrians)"
            className={`min-h-[48px] px-3.5 rounded-lg border font-medium text-xs flex items-center space-x-2 transition-all duration-200 active:scale-95 ${
              bellActive 
                ? 'bg-[#0D9488] text-white border-teal-300 ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-900' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
            }`}
          >
            <Bell className={`w-4 h-4 ${bellActive ? 'animate-bounce text-amber-300' : 'text-teal-400'}`} />
            <span className="font-semibold hidden sm:inline">Courtesy Bell</span>
            {bellActive && <span className="text-[10px] text-teal-200 font-bold">Ding!</span>}
          </button>

          {/* Speed Limit Display Badge */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-right">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Speed Cap</div>
              <div className="text-base font-extrabold text-teal-400 leading-none">
                {telemetry.speed.toFixed(1)} <span className="text-[10px] text-slate-400 font-normal">/ 6.0 km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Scrollable on mobile) */}
      <div className="bg-[#0b1120] border-t border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 overflow-x-auto py-1.5 no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 min-h-[44px] ${
                  isActive
                    ? 'bg-[#0D9488] text-white shadow-sm ring-1 ring-teal-400/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-black/20 text-teal-100' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
