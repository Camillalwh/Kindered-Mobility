import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  ExternalLink, 
  ZoomIn, 
  ShieldCheck, 
  BatteryCharging, 
  Flame, 
  FileText, 
  AlertTriangle,
  Download
} from 'lucide-react';
import { OFFICIAL_LTA_ASSETS } from '../data/pmaData';

export const InfographicsLibrary: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  const officialPosters = [
    {
      id: 'safe-charging',
      title: 'Safe Charging Practices for Motorised AM Devices',
      subtitle: 'Official LTA Guidelines on Battery Safety',
      url: OFFICIAL_LTA_ASSETS.safeChargingInfographic,
      category: 'Battery & Fire Safety',
      desc: 'Mandatory guidelines for charging motorised wheelchairs, mobility scooters, and PMDs safely to avoid thermal runaway and residential fires.',
      keyTakeaways: [
        'Use only the original battery and charger supplied by the manufacturer.',
        'Do NOT charge your PMA near exit pathways or staircase landings.',
        'Avoid overnight unattended charging on flammable surfaces.',
        'Check wires and charging port regularly for burn marks or unusual heat.'
      ]
    },
    {
      id: 'fire-safety',
      title: 'Fire Safety Tips for Motorised Devices & PMAs',
      subtitle: 'SCDF & LTA Joint Fire Prevention Standard',
      url: OFFICIAL_LTA_ASSETS.fireSafetyTips,
      category: 'Fire Prevention',
      desc: 'Critical precautions recommended by the Singapore Civil Defence Force (SCDF) and LTA regarding lithium battery handling and prompt fire response.',
      keyTakeaways: [
        'Never tamper with or modify electrical wiring or battery cells.',
        'Do not expose PMA batteries to direct rain or water submersion.',
        'If battery emits sweet pungent odor, bulging, or smoke, evacuate immediately and call 995.',
        'Store devices in well-ventilated, dry indoor spaces.'
      ]
    },
    {
      id: 'onemotoring-pma',
      title: 'OneMotoring PMA Dimension & Device Classification Chart',
      subtitle: 'Physical Criteria (70cm x 120cm x 150cm)',
      url: OFFICIAL_LTA_ASSETS.oneMotoringPMAImage,
      category: 'Statutory Dimensions',
      desc: 'Clear visual illustration detailing legal mobility scooter dimensions, wheel count, and difference between compliant PMAs vs illegal PMD lookalikes.',
      keyTakeaways: [
        'Maximum width 70 cm; maximum length 120 cm.',
        'Maximum laden weight 300 kg (including rider and personal effects).',
        'Single seat only — dual seats or benches are classified as illegal PMDs.',
        'Maximum device speed limit: 6.0 km/h on public footpaths.'
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-lg bg-teal-50 text-teal-700">
                <ImageIcon className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-display text-slate-900">
                Official LTA Infographics &amp; Public Education Library
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              Hotlinked official informational graphics directly from the Land Transport Authority (LTA) and OneMotoring portals. Tap any poster to expand, zoom, and inspect statutory guidelines.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={OFFICIAL_LTA_ASSETS.activeMobilityActUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5 transition min-h-[44px]"
            >
              <span>Visit LTA Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
            </a>
          </div>
        </div>

        {/* Official SCDF & LTA Battery Safety Highlight */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-amber-950 flex items-start space-x-3 text-xs">
          <Flame className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong>LTA Statutory Warning on Uncertified Batteries:</strong>
            <p className="text-amber-900">
              Owners of motorised devices must refrain from using non-original or modified batteries, which pose severe fire risks. Under the Active Mobility Act, modifying devices to exceed 6 km/h or tampering with batteries is subject to strict criminal penalties.
            </p>
          </div>
        </div>
      </div>

      {/* Infographics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {officialPosters.map((poster) => (
          <div 
            key={poster.id} 
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden elevation-1 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              {/* Category Pill */}
              <div className="p-4 pb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {poster.category}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">LTA / SCDF Approved</span>
              </div>

              {/* Image Preview with Zoom Overlay */}
              <div 
                className="relative bg-slate-100 aspect-[4/3] overflow-hidden group cursor-pointer border-y border-slate-100"
                onClick={() => setSelectedImage({ url: poster.url, title: poster.title, desc: poster.desc })}
              >
                <img
                  src={poster.url}
                  alt={poster.title}
                  className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // In case user is offline or government firewall blocks hotlink:
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      const fallback = target.parentElement.querySelector('.fallback-badge');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />

                {/* Fallback Display if hotlink network fails */}
                <div className="fallback-badge hidden absolute inset-0 bg-slate-900 text-white p-6 flex-col items-center justify-center text-center">
                  <ShieldCheck className="w-10 h-10 text-teal-400 mb-2" />
                  <div className="font-bold text-sm">{poster.title}</div>
                  <div className="text-xs text-slate-400 mt-1">Official LTA Asset Hotlink</div>
                  <span className="mt-3 px-3 py-1 rounded bg-teal-600 text-xs font-semibold">Tap to view source</span>
                </div>

                {/* Hover Zoom Prompt */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 text-white">
                  <ZoomIn className="w-6 h-6 text-teal-300" />
                  <span className="font-bold text-xs">Click to Expand &amp; Inspect</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5">
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                  {poster.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  {poster.desc}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                    Statutory Highlights:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {poster.keyTakeaways.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedImage({ url: poster.url, title: poster.title, desc: poster.desc })}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Full View</span>
              </button>

              <a
                href={poster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
              >
                <span>Direct Hotlink</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Official PDF Downloads Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <h3 className="font-display font-bold text-base text-slate-900 mb-3 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-teal-700" />
          <span>Singapore Government Reports &amp; Whitepapers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                Active Mobility Advisory Panel (AMAP) Recommendation Report
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Official statutory recommendations on PMAs, Certificate of Medical Need, 6 km/h speed limit, and retailer whitelisting.
              </p>
              <div className="text-[10px] text-teal-700 font-mono mt-2">Source: file.go.gov.sg/amap-pma.pdf</div>
            </div>
            <a
              href={OFFICIAL_LTA_ASSETS.amapReportPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 p-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1 flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                LTA Active Mobility Rules for Retailers &amp; Whitelisting
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Point-of-sale registration guidelines for distributors, suppliers, and mobility scooter retailers in Singapore.
              </p>
              <div className="text-[10px] text-teal-700 font-mono mt-2">Source: lta.gov.sg/retailers</div>
            </div>
            <a
              href={OFFICIAL_LTA_ASSETS.activeMobilityRetailersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 p-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1 flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open</span>
            </a>
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div>
                <h3 className="font-bold font-display text-base text-white">{selectedImage.title}</h3>
                <p className="text-xs text-slate-300">{selectedImage.desc}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-slate-100 flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow"
              />
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex justify-end space-x-2">
              <a
                href={selectedImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-bold flex items-center space-x-1.5"
              >
                <span>Open Full Resolution Hotlink</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
