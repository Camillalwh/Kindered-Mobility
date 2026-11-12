import React, { useState } from 'react';
import { 
  AlertOctagon, 
  PhoneCall, 
  MapPin, 
  Check, 
  X, 
  ShieldAlert, 
  Radio, 
  HelpCircle,
  BellRing
} from 'lucide-react';
import { TelemetryData } from '../types';

interface EmergencySummonBarProps {
  telemetry: TelemetryData;
}

export const EmergencySummonBar: React.FC<EmergencySummonBarProps> = ({ telemetry }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [dispatched, setDispatched] = useState(false);

  const startSummonSequence = () => {
    setModalOpen(true);
    setCountdown(3);
    setDispatched(false);

    // Audio alarm tone
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(440, ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Ignore
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setDispatched(true);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSummon = () => {
    setModalOpen(false);
    setCountdown(null);
    setDispatched(false);
  };

  return (
    <>
      {/* Sticky Fixed Bottom Summon Bar per Kinetic Dignity spec */}
      <aside 
        aria-label="Emergency Caregiver Summon Bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A] border-t-2 border-slate-700 shadow-2xl px-4 py-2.5 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Status info */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0">
              <Radio className="w-5 h-5 text-rose-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold font-display text-white tracking-wide">
                  Caregiver Link &amp; Roadside Assist
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                  GPS Guard: Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                Press to broadcast coordinates to David Tan (+65 9123 4567) &amp; Rachel Lim
              </p>
            </div>
          </div>

          {/* High-Contrast Tactile Actuation Button */}
          <button
            onClick={startSummonSequence}
            className="min-h-[48px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-rose-900/40 border border-rose-400/50 flex items-center space-x-2 transition-all active:scale-95"
          >
            <AlertOctagon className="w-4 h-4 text-white animate-bounce" />
            <span>Emergency SOS</span>
          </button>
        </div>
      </aside>

      {/* Emergency Summon Trigger Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border-2 border-rose-500 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-300 mx-auto flex items-center justify-center">
              <ShieldAlert className="w-9 h-9 text-rose-600 animate-pulse" />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                {dispatched ? 'Emergency Dispatch Broadcasted!' : 'Emergency Summon Sequence'}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {dispatched
                  ? 'Your exact GPS location and battery telemetry have been sent to your registered family caregivers via SMS.'
                  : `Transmitting alert to registered family caregivers in ${countdown} seconds...`}
              </p>
            </div>

            {/* GPS Telemetry Box */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Location:</span>
                <span className="font-bold text-slate-900">{telemetry.locationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Coordinates:</span>
                <span className="text-teal-700 font-bold">1.3241° N, 103.9312° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">PMA Battery:</span>
                <span className="text-slate-900 font-bold">{telemetry.batteryPercentage}% ({telemetry.estimatedRangeKm.toFixed(1)} km)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Current Speed:</span>
                <span className="text-slate-900 font-bold">{telemetry.speed.toFixed(1)} km/h</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {dispatched ? (
                <>
                  <a
                    href="tel:995"
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Singapore Ambulance / SCDF (995)</span>
                  </a>
                  <button
                    onClick={cancelSummon}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Close &amp; Mark Safe
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={cancelSummon}
                    className="flex-1 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition"
                  >
                    Cancel ({countdown}s)
                  </button>
                  <button
                    onClick={() => {
                      setCountdown(null);
                      setDispatched(true);
                    }}
                    className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
                  >
                    Transmit Immediately
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
