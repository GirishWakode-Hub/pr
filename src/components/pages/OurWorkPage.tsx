import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  Briefcase,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Filter,
  CheckCircle2,
  Building,
  Award
} from 'lucide-react';

export const OurWorkPage: React.FC = () => {
  const { caseStudies = [], navigateTo } = usePR();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');

  const industries = ['ALL', 'Technology', 'Healthcare', 'Finance', 'Consumer', 'Startups', 'Corporate'];

  const safeCaseStudies = caseStudies || [];
  const filteredCases = selectedIndustry === 'ALL'
    ? safeCaseStudies
    : safeCaseStudies.filter((cs) => {
        if (!cs.industry) return false;
        const ind = cs.industry.toLowerCase();
        const sel = selectedIndustry.toLowerCase();
        if (sel === 'healthcare') return ind.includes('health') || ind.includes('bio') || ind.includes('medical');
        if (sel === 'technology') return ind.includes('tech') || ind.includes('quantum') || ind.includes('autonomous') || ind.includes('software');
        if (sel === 'finance') return ind.includes('finance') || ind.includes('wealth') || ind.includes('capital') || ind.includes('fintech');
        if (sel === 'consumer') return ind.includes('consumer') || ind.includes('home') || ind.includes('retail') || ind.includes('design');
        if (sel === 'corporate') return ind.includes('corporate') || ind.includes('aerospace') || ind.includes('industrial');
        if (sel === 'startups') return ind.includes('startup') || ind.includes('series') || ind.includes('venture');
        return ind.includes(sel);
      });

  return (
    <div id="our-work-page" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold tracking-widest text-xs uppercase">
            <span className="w-8 h-[2px] bg-blue-600"></span>
            <span>Case Studies & Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#07132B] leading-tight">
            Transformative PR Campaigns with <br />
            <span className="italic font-serif text-blue-600 font-normal">Measurable Alpha</span>.
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-light">
            Every campaign we engineer is tethered to tangible business outcomes: valuation inflection, institutional trust, customer pipeline, and category authority.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mr-2 flex items-center gap-1.5 font-medium">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Filter Industry:</span>
          </span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                selectedIndustry === ind
                  ? 'bg-[#07132B] text-white shadow-sm font-bold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              onClick={() => navigateTo('case-study', cs.slug || cs.id)}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-sm overflow-hidden cursor-pointer group flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={cs.heroImage}
                    alt={cs.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07132B]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#07132B]/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-widest text-blue-300 border border-blue-800/40">
                    {cs.industry}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{cs.clientName}</span>
                    <span className="text-xs font-bold text-blue-300 bg-[#07132B]/90 px-2 py-0.5 rounded-sm border border-blue-700/40">
                      {cs.headlineMetric}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {cs.title}
                    </h3>
                    <p className="text-slate-600 text-xs mt-2.5 line-clamp-3 leading-relaxed font-light">
                      {cs.summary}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Secured Media Outlets:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tier1Outlets.map((outlet, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium"
                        >
                          {outlet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] uppercase tracking-wider">{cs.serviceType}</span>
                <span className="text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs">
                  <span>Read Dossier</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
