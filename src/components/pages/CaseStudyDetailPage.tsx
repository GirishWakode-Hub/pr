import React from 'react';
import { usePR } from '../../context/PRContext';
import {
  ArrowLeft,
  Calendar,
  Building,
  TrendingUp,
  Award,
  ExternalLink,
  Quote,
  CheckCircle2,
  Share2,
  Sparkles
} from 'lucide-react';

export const CaseStudyDetailPage: React.FC = () => {
  const { selectedCaseStudySlug, caseStudies = [], navigateTo, showToast } = usePR();

  const safeStudies = caseStudies || [];
  const study = safeStudies.find(
    (c) => c.slug === selectedCaseStudySlug || c.id === selectedCaseStudySlug
  ) || safeStudies[0];

  if (!study) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white/50">Case study not found.</p>
          <button
            onClick={() => navigateTo('work')}
            className="px-4 py-2 bg-blue-600 rounded-sm text-xs font-bold uppercase tracking-wider"
          >
            Back to All Work
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Case study link copied to clipboard.');
    }
  };

  return (
    <div id="case-study-detail-page" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back navigation & Share */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <button
            onClick={() => navigateTo('work')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Case Studies</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Case</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-sm bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
              {study.industry}
            </span>
            <span className="text-slate-500 text-xs flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              <span>{study.clientName}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 text-xs flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{study.date}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#07132B] leading-tight">
            {study.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-light">
            {study.summary}
          </p>
        </div>

        {/* Key Metrics Banner (Dark Blue Accent Component) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#07132B] text-white border border-blue-900/40 rounded-sm p-6 shadow-md">
          {Array.isArray(study.metrics) ? (
            study.metrics.map((m: any, idx: number) => (
              <div key={idx} className="text-center sm:text-left space-y-1 p-2">
                <div className="text-2xl sm:text-3xl font-light text-blue-300">
                  {m.value}
                </div>
                <div className="text-xs font-medium text-white">{m.label}</div>
                <div className="text-[11px] text-white/60 font-light">{m.context}</div>
              </div>
            ))
          ) : study.results ? (
            <>
              <div className="text-center sm:text-left space-y-1 p-2">
                <div className="text-2xl sm:text-3xl font-light text-blue-300">
                  {study.results.reach}
                </div>
                <div className="text-xs font-medium text-white">Audience Reach</div>
                <div className="text-[11px] text-white/60 font-light">Verified syndicated readers</div>
              </div>
              <div className="text-center sm:text-left space-y-1 p-2">
                <div className="text-2xl sm:text-3xl font-light text-blue-300">
                  {study.results.mentions} Placements
                </div>
                <div className="text-xs font-medium text-white">Tier-1 Features</div>
                <div className="text-[11px] text-white/60 font-light">Including Bloomberg & WSJ</div>
              </div>
              <div className="text-center sm:text-left space-y-1 p-2">
                <div className="text-2xl sm:text-3xl font-light text-blue-300">
                  {study.results.traffic}
                </div>
                <div className="text-xs font-medium text-white">Inbound Surge</div>
                <div className="text-[11px] text-white/60 font-light">Commercial conversion alpha</div>
              </div>
            </>
          ) : null}
        </div>

        {/* Hero Image */}
        <div className="rounded-sm overflow-hidden border border-slate-200 shadow-md">
          <img
            src={study.heroImage}
            alt={study.title}
            referrerPolicy="no-referrer"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Deep Dive Content (The Challenge & The Strategy) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* The Strategic Challenge */}
            <section className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                01. The Challenge
              </div>
              <h2 className="text-2xl font-light text-[#07132B]">
                Overcoming Narrative Resistance & <span className="italic font-serif text-blue-600 font-normal">Complexity</span>
              </h2>
              <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-light">
                <p>{study.challenge}</p>
              </div>
            </section>

            {/* The PR Strategy & Execution */}
            <section className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                02. Narrative Architecture & Execution
              </div>
              <h2 className="text-2xl font-light text-[#07132B]">
                How Apex & Vantage Engineered the <span className="italic font-serif text-blue-600 font-normal">Breakthrough</span>
              </h2>
              <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-light">
                <p>{study.strategy}</p>
                {study.execution && <p>{study.execution}</p>}
              </div>
            </section>

            {/* Client Quote */}
            {study.testimonial && (
              <div className="bg-white border border-slate-200 border-l-4 border-l-blue-600 rounded-sm p-6 sm:p-8 space-y-4 shadow-sm">
                <Quote className="w-8 h-8 text-blue-600/30" />
                <p className="text-slate-800 text-sm sm:text-base italic leading-relaxed font-serif">
                  "{study.testimonial.quote}"
                </p>
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    {study.testimonial.author}
                  </div>
                  <div className="text-[11px] text-slate-500 font-light">
                    {study.testimonial.role}, {study.clientName}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Placed Outlets */}
            <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-4 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Tier-1 Earned Coverage
              </div>
              <div className="space-y-2">
                {study.tier1Outlets.map((outlet, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-sm border border-slate-200"
                  >
                    <span className="font-medium text-slate-900">{outlet}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-sm">
                      Featured Lede
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Metadata */}
            <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-3 text-xs shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Campaign Dossier
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-light">Service Line</span>
                <span className="font-medium text-slate-900">{study.serviceType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-light">Target Region</span>
                <span className="font-medium text-slate-900">Global (US, UK, APAC)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-light">Syndication Status</span>
                <span className="text-blue-600 font-bold uppercase tracking-wider text-[10px]">100% Retained Archive</span>
              </div>
            </div>

            {/* Ready to Replicate CTA */}
            <div className="bg-[#07132B] text-white border border-blue-900/40 rounded-sm p-6 space-y-3 text-center shadow-md">
              <div className="text-xs font-semibold text-white">
                Planning an upcoming funding round or category launch?
              </div>
              <p className="text-[11px] text-white/70 font-light">
                Our communications strategists specialize in high-impact narrative launches.
              </p>
              <button
                onClick={() => navigateTo('contact')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Inquire With Press Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
