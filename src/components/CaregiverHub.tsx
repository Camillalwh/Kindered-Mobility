import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Battery, 
  Radio, 
  User, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  HeartHandshake, 
  Wrench, 
  Activity,
  Plus,
  Send
} from 'lucide-react';
import { TelemetryData, CaregiverAlert } from '../types';

interface CaregiverHubProps {
  telemetry: TelemetryData;
}

export const CaregiverHub: React.FC<CaregiverHubProps> = ({ telemetry }) => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'David Tan (Son)', phone: '+65 9123 4567', role: 'Primary Caregiver', notifyOnSOS: true },
    { id: '2', name: 'Rachel Lim (Daughter-in-law)', phone: '+65 9876 5432', role: 'Secondary Contact', notifyOnSOS: true },
    { id: '3', name: 'Dr. Michael Koh (GP Polyclinic)', phone: '+65 6789 0123', role: 'Physician (CMN Issuer)', notifyOnSOS: false }
  ]);

  const [alerts, setAlerts] = useState<CaregiverAlert[]>([
    {
      id: 'a1',
      timestamp: 'Today, 2:45 PM',
      type: 'speed-warning',
      severity: 'info',
      message: 'LTA 6.0 km/h speed governor maintained along Bedok North footpath.',
      resolved: true,
    },
    {
      id: 'a2',
      timestamp: 'Today, 11:15 AM',
      type: 'geofence-exit',
      severity: 'info',
      message: 'Device safely reached Bedok Mall MRT station faregate.',
      resolved: true,
    },
    {
      id: 'a3',
      timestamp: 'Yesterday, 6:30 PM',
      type: 'battery-low',
      severity: 'info',
      message: 'Original battery plugged into manufacturer approved charger. Full cycle complete.',
      resolved: true,
    }
  ]);

  const [geofenceRadiusKm, setGeofenceRadiusKm] = useState<number>(3.5);
  const [testSmsSent, setTestSmsSent] = useState(false);

  const sendTestSms = () => {
    setTestSmsSent(true);
    setTimeout(() => setTestSmsSent(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Caregiver Hub Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-lg bg-teal-50 text-teal-700">
                <HeartHandshake className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-display text-slate-900">
                Caregiver Telemetry &amp; Remote Guard
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Real-time monitoring link for family members and caregivers. Provides remote battery health telemetry, GPS geofence verification, and instant emergency summon dispatch.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Encrypted Telemetry Sync: Active</span>
            </div>
          </div>
        </div>

        {/* Primary Rider Identity Card */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-slate-400 font-semibold uppercase text-[10px]">Primary Rider</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">Mdm Tan Siew Lan</div>
            <div className="text-slate-500">Age: 74 (Exempted Senior)</div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase text-[10px]">Registered Device</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">Solax Mobie S (4W)</div>
            <div className="text-slate-500">ID: SG-PMA-2026-8842</div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase text-[10px]">Last Heartbeat</div>
            <div className="text-sm font-bold text-emerald-700 mt-0.5">Just now (12s ago)</div>
            <div className="text-slate-500">Signal: 4G LTE-M / GPS</div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase text-[10px]">Emergency Dispatch</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">2 Caregivers Armed</div>
            <button 
              onClick={sendTestSms}
              className="text-teal-700 font-bold hover:underline flex items-center space-x-1 mt-0.5"
            >
              <Send className="w-3 h-3" />
              <span>{testSmsSent ? 'SMS Broadcast Sent!' : 'Send Test Ping'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Map & Geofence Guard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Location Breadcrumb (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 elevation-1 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-teal-700" />
              <span>Live Location &amp; Safe Zone Boundary</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Inside Safe Zone
            </span>
          </div>

          {/* Simulated Map Display */}
          <div className="relative h-64 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 flex flex-col justify-between">
            {/* Ambient Map Grid Graphic */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Top Bar on Map */}
            <div className="relative z-10 flex justify-between items-center bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg text-xs text-white border border-slate-700">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-ping"></span>
                <span className="font-bold">{telemetry.locationName}</span>
              </div>
              <span className="font-mono text-slate-400">1.3241° N, 103.9312° E</span>
            </div>

            {/* Central Radar Pin */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-teal-500/40 bg-teal-500/10 animate-ping absolute"></div>
                <div className="w-10 h-10 rounded-full bg-[#0D9488] border-2 border-white flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="mt-2 text-xs font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                Mdm Tan (Solax Mobie-S) • {telemetry.speed.toFixed(1)} km/h
              </span>
            </div>

            {/* Bottom Map Stats */}
            <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
              <span>Home: Bedok North Ave 3, Blk 218</span>
              <span>Distance to Home: <strong>0.8 km</strong></span>
            </div>
          </div>

          {/* Geofence Configuration */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">HDB Neighborhood Geofence Radius</span>
              <span className="font-mono font-bold text-teal-700">{geofenceRadiusKm.toFixed(1)} km Radius</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.5"
              value={geofenceRadiusKm}
              onChange={(e) => setGeofenceRadiusKm(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
            />
            <p className="text-[11px] text-slate-500">
              An instant automated SMS and push notification will be broadcast to all caregivers if the PMA travels beyond {geofenceRadiusKm} km from residence.
            </p>
          </div>
        </div>

        {/* Right Column: Hardware Health & Caregiver Contacts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hardware Diagnostics Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
            <h3 className="font-display font-bold text-base text-slate-900 mb-3 flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-teal-700" />
              <span>Hardware Telemetry Diagnostics</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-800">Electromagnetic Brake</span>
                </div>
                <span className="font-bold text-slate-900">Passed (120ms lock)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-800">Motor Transaxle Temp</span>
                </div>
                <span className="font-bold text-slate-900">34°C (Optimal)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-800">Battery Cell Degradation</span>
                </div>
                <span className="font-bold text-slate-900">2.1% (142 cycles)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-800">Tire Tread Integrity</span>
                </div>
                <span className="font-bold text-slate-900">Solid Foam (No Punctures)</span>
              </div>
            </div>
          </div>

          {/* Caregiver Contact Roster */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-base text-slate-900 flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Emergency Dispatch Roster</span>
              </h3>
            </div>

            <div className="space-y-2.5">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{contact.name}</div>
                    <div className="text-[11px] text-slate-500">{contact.phone} • {contact.role}</div>
                  </div>
                  {contact.notifyOnSOS && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-300">
                      SOS Active
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Log */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <h3 className="font-display font-bold text-base text-slate-900 mb-3 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-slate-700" />
          <span>Safety Audit &amp; System Event Log</span>
        </h3>

        <div className="space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <div>
                  <div className="text-slate-800 font-medium">{alert.message}</div>
                  <div className="text-[10px] text-slate-400">{alert.timestamp}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Logged
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
