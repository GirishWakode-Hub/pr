import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  TrendingUp,
  Shield,
  Award,
  Zap,
  Globe,
  Radio,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calculator,
  HelpCircle
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, setIsConsultationModalOpen } = usePR();

  // PR Readiness Interactive Tool State
  const [assessment, setAssessment] = useState({
    newsMagnitude: 'high', // 'low' | 'med' | 'high'
    spokespersonReadiness: 'trained', // 'untrained' | 'some' | 'trained'
    proprietaryData: 'yes', // 'no' | 'partial' | 'yes'
    leadTime: 'optimal', // 'rush' | 'moderate' | 'optimal'
  });

  const calculateReadinessScore = () => {
    let score = 50;
    if (assessment.newsMagnitude === 'high') score += 20;
    else if (assessment.newsMagnitude === 'med') score += 10;

    if (assessment.spokespersonReadiness === 'trained') score += 15;
    else if (assessment.spokespersonReadiness === 'some') score += 5;

    if (assessment.proprietaryData === 'yes') score += 10;
    else if (assessment.proprietaryData === 'partial') score += 5;

    if (assessment.leadTime === 'optimal') score += 5;

    return Math.min(score, 100);
  };

  const readinessScore = calculateReadinessScore();

  return (
    <div id="services-page" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold tracking-widest text-xs uppercase">
            <span className="w-8 h-[2px] bg-blue-600"></span>
            <span>Practice Disciplines</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#07132B] leading-tight">
            Strategic PR Services Tailored for <br />
            <span className="italic font-serif text-blue-600 font-normal">Market Dominance</span>.
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-light">
            We don’t blast indiscriminate press wires. We construct bespoke, high-conviction narrative architectures that earn the respect of the world's most discerning journalists and investors.
          </p>
        </div>

        {/* Detailed Service Grid */}
        <div className="space-y-8">
          {services.map((svc, index) => (
            <div
              key={svc.id}
              id={`service-card-${svc.id}`}
              className="bg-white border border-slate-200 rounded-sm p-8 lg:p-10 transition-all hover:border-blue-500 space-y-8 shadow-sm hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-[#07132B] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
                      0{index + 1}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                        {svc.category || 'Strategic Practice'}
                      </span>
                      <h2 className="text-2xl font-medium text-slate-900">
                        {svc.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    {svc.description || svc.shortDesc}
                  </p>
                  {svc.fullDesc && (
                    <p className="text-slate-500 text-xs leading-relaxed font-light">
                      {svc.fullDesc}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setIsConsultationModalOpen(true)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-sm"
                    >
                      <span>{svc.ctaText || `Request Briefing for ${svc.title}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Deliverables */}
                  <div className="bg-slate-50 rounded-sm p-5 border border-slate-200 space-y-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Key Deliverables</span>
                    </div>
                    <div className="space-y-2">
                      {(svc.deliverables || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Benefits */}
                  <div className="bg-slate-50 rounded-sm p-5 border border-slate-200 space-y-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Strategic Benefits</span>
                    </div>
                    <div className="space-y-2">
                      {(svc.benefits || []).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Step Process Timeline */}
              {svc.process && svc.process.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-3 font-bold">
                    Execution Process & Governance
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {svc.process.map((step, stepIdx) => (
                      <div
                        key={stepIdx}
                        className="bg-slate-50 border border-slate-200 rounded-sm p-3 space-y-1 relative"
                      >
                        <span className="text-[10px] text-blue-600 font-mono font-semibold">
                          Step 0{stepIdx + 1}
                        </span>
                        <p className="text-xs text-slate-700 font-light leading-snug">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* PR Readiness Assessment Interactive Widget (Dark Blue Component) */}
        <div className="bg-[#07132B] text-white border border-blue-900/40 rounded-sm p-8 sm:p-10 space-y-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-blue-600/30 text-blue-300 flex items-center justify-center border border-blue-500/40">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">
                Interactive PR Story Readiness Assessment
              </h3>
              <p className="text-xs text-white/60 font-light">
                Evaluate the tier-1 news viability of your upcoming corporate announcement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-semibold text-white/90 mb-2">
                1. News Magnitude / Scope
              </label>
              <select
                value={assessment.newsMagnitude}
                onChange={(e) =>
                  setAssessment({ ...assessment, newsMagnitude: e.target.value })
                }
                className="w-full bg-[#0A1A38] border border-blue-800/60 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
              >
                <option value="high">Major $20M+ Funding / Breakthrough Tech</option>
                <option value="med">Product Feature / Strategic Partnership</option>
                <option value="low">Incremental Update / Minor Hire</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/90 mb-2">
                2. Executive Media Readiness
              </label>
              <select
                value={assessment.spokespersonReadiness}
                onChange={(e) =>
                  setAssessment({ ...assessment, spokespersonReadiness: e.target.value })
                }
                className="w-full bg-[#0A1A38] border border-blue-800/60 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
              >
                <option value="trained">Broadcast-Trained & Available for Live TV</option>
                <option value="some">Experienced in Print / Podcast Interviews</option>
                <option value="untrained">First Time Facing Tier-1 Press</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/90 mb-2">
                3. Proprietary Data & Case Proof
              </label>
              <select
                value={assessment.proprietaryData}
                onChange={(e) =>
                  setAssessment({ ...assessment, proprietaryData: e.target.value })
                }
                className="w-full bg-[#0A1A38] border border-blue-800/60 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
              >
                <option value="yes">Hard Metrics, Peer Data & Customer References</option>
                <option value="partial">Internal Telemetry (Anonymized)</option>
                <option value="no">Qualitative Vision Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/90 mb-2">
                4. Launch Lead Time
              </label>
              <select
                value={assessment.leadTime}
                onChange={(e) =>
                  setAssessment({ ...assessment, leadTime: e.target.value })
                }
                className="w-full bg-[#0A1A38] border border-blue-800/60 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
              >
                <option value="optimal">3-4 Weeks Embargo Window (Optimal)</option>
                <option value="moderate">1-2 Weeks (Moderate Pitch Cycle)</option>
                <option value="rush">&lt; 48 Hours (Breaking Rush)</option>
              </select>
            </div>
          </div>

          <div className="bg-[#0A1A38] border border-blue-800/60 p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                Tier-1 Media Viability Score
              </div>
              <div className="text-2xl sm:text-3xl font-light text-white">
                {readinessScore} / 100 —{' '}
                <span className={readinessScore >= 80 ? 'text-blue-300 italic font-serif' : 'text-amber-400 italic font-serif'}>
                  {readinessScore >= 80 ? 'Prime Tier-1 Candidate' : 'Requires Narrative Calibration'}
                </span>
              </div>
              <p className="text-xs text-white/70 max-w-xl font-light">
                {readinessScore >= 80
                  ? 'Your announcement has strong institutional weight. An exclusive embargo strategy across WSJ, Bloomberg, or TechCrunch will yield maximum impact.'
                  : 'We recommend bundling with proprietary benchmark data or an executive thought leadership byline before public wire distribution.'}
              </p>
            </div>

            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-widest shadow-md whitespace-nowrap transition-colors"
            >
              Discuss Score With Partners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
