import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  BarChart3,
  TrendingUp,
  Globe2,
  Download,
  Share2,
  Calendar,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  Eye,
  Radio,
  Sparkles,
  PieChart as PieIcon,
  Layers,
  Award,
  ChevronRight,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const ReportsAnalyticsPage: React.FC = () => {
  const {
    clients = [],
    campaigns = [],
    mediaCoverage = [],
    navigateTo,
    setIsConsultationModalOpen,
    showToast
  } = usePR();

  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL'>('ALL');
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>('ALL');

  // Syndication & Media Value Trend Data
  const performanceTrendData = [
    { month: 'Oct', emv: 420000, reach: 18.5, placements: 24, tier1: 8 },
    { month: 'Nov', emv: 680000, reach: 29.2, placements: 38, tier1: 14 },
    { month: 'Dec', emv: 910000, reach: 41.0, placements: 52, tier1: 21 },
    { month: 'Jan', emv: 1250000, reach: 56.4, placements: 64, tier1: 27 },
    { month: 'Feb', emv: 1580000, reach: 72.8, placements: 81, tier1: 35 },
    { month: 'Mar', emv: 2100000, reach: 98.4, placements: 104, tier1: 46 },
  ];

  // Sentiment Distribution
  const sentimentDistribution = [
    { name: 'Positive / Visionary', value: 74, color: '#2563eb' },
    { name: 'Neutral / Informational', value: 22, color: '#64748b' },
    { name: 'Adverse / Challenging', value: 4, color: '#e11d48' },
  ];

  // Outlet Tier Breakdown
  const outletTierData = [
    { tier: 'Tier 1 Global (FT, WSJ, Bloomberg, Reuters)', count: 48, emv: '$1,420,000' },
    { tier: 'Tech & Trade Authority (TechCrunch, Wired, Verge)', count: 36, emv: '$680,000' },
    { tier: 'Broadcast & Keynotes (CNBC, Bloomberg TV, BBC)', count: 18, emv: '$940,000' },
    { tier: 'Syndicated Wire & Industry Portals', count: 112, emv: '$310,000' },
  ];

  // Regional Syndication Breakdown
  const regionalData = [
    { region: 'North America (NYC / SF)', percentage: '46%', volume: '142 Placements' },
    { region: 'United Kingdom & EMEA (London / Zurich)', percentage: '32%', volume: '98 Placements' },
    { region: 'Asia-Pacific (Singapore / Tokyo)', percentage: '22%', volume: '68 Placements' },
  ];

  const handleExportAudit = (format: 'PDF' | 'CSV') => {
    showToast(
      `Executive PR Report Exported (${format})`,
      `The Q1 2025 Global Media & Sentiment Audit has been compiled and downloaded.`,
      'success'
    );
  };

  return (
    <div id="reports-analytics-page" className="space-y-16 pb-24">
      {/* Page Header Marquee */}
      <section className="relative bg-[#07132B] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-blue-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">
                <BarChart3 className="w-4 h-4" />
                <span>Media Intelligence & Analytics</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                Reports & <span className="font-serif italic text-blue-400">Media Analytics</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                Rigorous measurement of earned media value (EMV), narrative penetration, sentiment attribution, and global tier-one press distribution across New York, London, and Singapore.
              </p>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => handleExportAudit('PDF')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors border border-white/15 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Executive PDF</span>
              </button>

              <button
                onClick={() => handleExportAudit('CSV')}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm shadow-blue-900/40"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export Dataset (.CSV)</span>
              </button>
            </div>
          </div>

          {/* Key Executive Macro Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">
            <div className="p-5 rounded-sm bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                Total Earned Media Value (EMV)
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                $6,940,000
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+38.4% vs Previous Cycle</span>
              </div>
            </div>

            <div className="p-5 rounded-sm bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                Total Audience Reach
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                316.3M
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Global Syndication Reach</span>
              </div>
            </div>

            <div className="p-5 rounded-sm bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                Tier-1 Editorial Features
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                102 Placements
              </div>
              <div className="flex items-center gap-1 text-[11px] text-blue-400 mt-2 font-medium">
                <Award className="w-3.5 h-3.5" />
                <span>WSJ, FT, Bloomberg & CNBC</span>
              </div>
            </div>

            <div className="p-5 rounded-sm bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                Positive Narrative Index
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                96.2%
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>High-Fidelity Message Resonance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Analytics Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Filter & Period Selector Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-sm bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Filter By Timeframe:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-sm">
              {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuarter(q)}
                  className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                    selectedQuarter === q
                      ? 'bg-[#07132B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {q === 'ALL' ? 'Trailing 6 Months' : `2025 ${q}`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Client Mandate:</span>
            <select
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-sm p-1.5 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Active Retainer Accounts</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.industry})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Chart Grid: Velocity & Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Earned Media Value & Growth Curve */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-serif font-semibold text-slate-900">
                  Earned Media Value ($) & Audience Velocity
                </h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Monthly compounding narrative reach and estimated advertising equivalent equivalence.
                </p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-blue-50 text-blue-700 border border-blue-200">
                Audited Metric
              </span>
            </div>

            <div className="h-[320px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrendData}>
                  <defs>
                    <linearGradient id="emvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#07132B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontSize: '12px',
                    }}
                    formatter={(val: number) => [`$${val.toLocaleString()}`, 'Earned Media Value']}
                  />
                  <Area
                    type="monotone"
                    dataKey="emv"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#emvGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Peak Month EMV</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">$2,100,000</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Placements</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">363 Articles</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Average Placement EMV</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">$19,118 / feature</div>
              </div>
            </div>
          </div>

          {/* Right: Sentiment & Message Resonance */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-serif font-semibold text-slate-900">
                Sentiment Attribution
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                AI NLP classification across 450+ global publications.
              </p>
            </div>

            <div className="h-[220px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentDistribution}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sentimentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#07132B',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontSize: '12px',
                    }}
                    formatter={(val: number) => [`${val}%`, 'Coverage Volume']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-serif font-bold text-slate-900">74%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Positive</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              {sentimentDistribution.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-slate-700 font-medium">{s.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outlet Tiers & Regional Distribution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Outlet Tier Breakdown Table */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-serif font-semibold text-slate-900">
                  Media Placement Breakdown by Tier
                </h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Editorial weight and estimated value by publication classification.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Outlet Classification</th>
                    <th className="pb-3 text-center">Volume</th>
                    <th className="pb-3 text-right">Generated EMV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {outletTierData.map((tier, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 font-medium text-slate-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span>{tier.tier}</span>
                      </td>
                      <td className="py-3.5 text-center font-bold text-slate-800">{tier.count}</td>
                      <td className="py-3.5 text-right font-serif font-bold text-blue-700">{tier.emv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional Bureau Syndication */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-slate-900">
                    Geographic Syndication
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    Distribution across GSRelation's primary bureau networks.
                  </p>
                </div>
                <Globe2 className="w-5 h-5 text-blue-600" />
              </div>

              <div className="space-y-4 pt-4">
                {regionalData.map((reg) => (
                  <div key={reg.region} className="p-3.5 rounded-sm bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-1">
                      <span>{reg.region}</span>
                      <span className="text-blue-600 font-bold">{reg.percentage}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#07132B] h-full rounded-full"
                        style={{ width: reg.percentage }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1.5 font-light">
                      {reg.volume} syndicated across local & trade press
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Consultation Callout */}
            <div className="p-4 rounded-sm bg-slate-100 border border-slate-200 mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Require bespoke reporting?</span>
                <p className="text-[11px] text-slate-500">Our analysts build tailored media attribution decks for Board presentations.</p>
              </div>
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="px-3.5 py-2 bg-[#07132B] hover:bg-slate-800 text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
