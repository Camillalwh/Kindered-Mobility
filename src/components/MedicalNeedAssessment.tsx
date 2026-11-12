import React, { useState } from 'react';
import { 
  FileCheck, 
  UserCheck, 
  HelpCircle, 
  CheckCircle2, 
  Calendar, 
  Award, 
  Stethoscope, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TIMELINE_MILESTONES, OFFICIAL_LTA_ASSETS } from '../data/pmaData';

export const MedicalNeedAssessment: React.FC = () => {
  // Assessment Quiz States
  const [age, setAge] = useState<number>(72);
  const [hasGovSubsidy, setHasGovSubsidy] = useState<boolean>(false);
  const [hasADLNeed, setHasADLNeed] = useState<boolean>(false);
  const [hasDoctorCert, setHasDoctorCert] = useState<boolean>(false);

  // Evaluate status
  const isSeniorExempt = age >= 70;
  const isSubsidyExempt = hasGovSubsidy;
  const isADLExempt = hasADLNeed;
  const isDirectlyExempt = isSeniorExempt || isSubsidyExempt || isADLExempt;
  const isQualifiedWithDoctor = hasDoctorCert;

  return (
    <div className="space-y-6 pb-20">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
        <div className="flex items-start space-x-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900">
              Certificate of Medical Need (CMN) &amp; Registration Navigator
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Under LTA&apos;s updated rules, mobility scooters are strictly intended for individuals who are unable to walk or have walking difficulties. To curb able-bodied misuse, riders must hold a verified Certificate of Medical Need (CMN) or qualify under statutory automatic exemptions.
            </p>
          </div>
        </div>

        {/* Timeline Milestones Roadmap */}
        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-4 h-4 text-slate-700" />
            <h3 className="font-display font-bold text-sm text-slate-900">
              Official Singapore Statutory Timeline &amp; Registration Rollout
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIMELINE_MILESTONES.map((milestone, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black font-mono text-teal-700">{milestone.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${milestone.badgeColor}`}>
                      {milestone.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{milestone.title}</h4>
                  <p className="text-xs text-slate-600">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Medical Need Eligibility Evaluator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Questionnaire (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 elevation-1 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-teal-700" />
              <span>Interactive CMN Eligibility Assessment</span>
            </h3>
            <span className="text-xs text-slate-500">Live Statutory Screener</span>
          </div>

          {/* Question 1: Age */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-800">
                1. Rider Age: Do you qualify for automatic senior exemption?
              </label>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                isSeniorExempt ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {age} Years Old {isSeniorExempt && '✓ EXEMPTED'}
              </span>
            </div>
            <input
              type="range"
              min="18"
              max="95"
              step="1"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
            />
            <p className="text-[11px] text-slate-500">
              <strong>Statutory Law:</strong> Seniors aged <strong>70 and above</strong> are automatically exempted from needing a Certificate of Medical Need.
            </p>
          </div>

          {/* Question 2: Government Mobility Subsidy */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  2. Government Assistive Technology / Enabling Fund Beneficiary
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Did you obtain your mobility scooter with subsidies under the <strong>Assistive Technology Fund (ATF)</strong> or <strong>Seniors&apos; Mobility and Enabling Fund (SMF)</strong>?
                </p>
              </div>
              <input
                type="checkbox"
                checked={hasGovSubsidy}
                onChange={(e) => setHasGovSubsidy(e.target.checked)}
                className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 cursor-pointer ml-3 mt-1"
              />
            </div>
          </div>

          {/* Question 3: MOH / MSF ADL Disability Schemes */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  3. MOH / MSF Activities of Daily Living (ADL) Assessment
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Have you been certified under national disability frameworks (e.g., CareShield Life, ElderShield, IDAPE) as requiring assistance with <strong>Mobility</strong> or <strong>Transferring</strong>?
                </p>
              </div>
              <input
                type="checkbox"
                checked={hasADLNeed}
                onChange={(e) => setHasADLNeed(e.target.checked)}
                className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 cursor-pointer ml-3 mt-1"
              />
            </div>
          </div>

          {/* Question 4: Doctor / Occupational Therapist AMS */}
          {!isDirectlyExempt && (
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-teal-950 flex items-center space-x-1.5">
                    <Stethoscope className="w-4 h-4 text-teal-700" />
                    <span>4. Doctor Certification via Assessment for Mobility Scooter (AMS)</span>
                  </div>
                  <p className="text-[11px] text-teal-900 mt-0.5">
                    Do you have a doctor&apos;s or registered occupational therapist&apos;s memo confirming physical walking difficulty or medical frailty?
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={hasDoctorCert}
                  onChange={(e) => setHasDoctorCert(e.target.checked)}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 cursor-pointer ml-3 mt-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Assessment Verdict & Next Steps (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1">
            <h4 className="font-display font-bold text-base text-slate-900 mb-3 flex items-center space-x-2">
              <Award className="w-5 h-5 text-teal-700" />
              <span>Assessment Outcome</span>
            </h4>

            {isDirectlyExempt ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Officially Exempted from Medical Assessment</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Congratulations! Because you {isSeniorExempt ? 'are aged 70 or older' : isSubsidyExempt ? 'hold an ATF/SMF government subsidy' : 'have qualified ADL mobility needs'}, you do NOT need to visit a doctor for an additional Certificate of Medical Need.
                </p>
                <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-200 text-[11px] text-emerald-950">
                  <strong>When registration opens:</strong> Your Singpass profile will automatically recognize your exemption status for scooter registration.
                </div>
              </div>
            ) : isQualifiedWithDoctor ? (
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-300 space-y-3">
                <div className="flex items-center space-x-2 text-teal-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>Qualified with Doctor / Clinic CMN</span>
                </div>
                <p className="text-xs text-teal-800">
                  You possess an accredited Assessment for Mobility Scooter (AMS) certification. Please retain this document or upload it during the upcoming OneMotoring registration portal.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>Medical Certification Required</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Because you are under 70 and not on an automatic disability subsidy scheme, you will require an accredited <strong>Assessment for Mobility Scooter (AMS)</strong> from a registered doctor before riding a mobility scooter on Singapore footpaths.
                </p>
                <div className="space-y-1.5 text-xs text-amber-950 font-medium">
                  <div>1. Visit your polyclinic or GP doctor.</div>
                  <div>2. Request an Assessment for Mobility Scooter (AMS).</div>
                  <div>3. Doctor assesses mobility impairment or gait fatigue.</div>
                </div>
              </div>
            )}

            {/* Official LTA Documents and Guidelines Link */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href={OFFICIAL_LTA_ASSETS.activeMobilityActUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center space-x-2 transition"
              >
                <span>Read Official LTA Rules on Active Mobility</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick FAQ Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 elevation-1 space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900 flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Common CMN Questions</span>
            </h4>
            <div className="text-xs space-y-2 text-slate-600">
              <p>
                <strong>Q: Does this rule apply to manual or motorized wheelchairs?</strong><br/>
                No. Standard manual wheelchairs and conventional motorized wheelchairs with joystick control do not require a CMN. The CMN applies primarily to mobility scooters with handlebar tillers.
              </p>
              <p>
                <strong>Q: Can retailers sell non-registered scooters?</strong><br/>
                No. Starting 1 June 2026, retailers face heavy fines if displaying or selling non-registered or non-whitelisted models.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
