import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  Building,
  ArrowRight,
  ChevronRight,
  Radio,
  Share2,
  Mail,
  Phone
} from 'lucide-react';

export const NewsroomPage: React.FC = () => {
  const { pressReleases = [], navigateTo, showToast } = usePR();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'Clinical & Research',
    'Funding & Capital',
    'Commercial Aviation & Space',
    'Autonomous Robotics',
    'Enterprise AI',
    'Clean Technology'
  ];

  const filteredReleases = (pressReleases || []).filter((pr) => {
    const matchesSearch =
      (pr.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pr.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pr.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || (pr.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleDownloadKit = () => {
    showToast('Media Kit Downloaded', 'The Apex & Vantage Q3 Media Kit ZIP has commenced download.');
  };

  return (
    <div id="newsroom-page" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Press Desk Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-slate-200">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold tracking-widest text-xs uppercase">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Official Press & Wire Hub</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#07132B] leading-tight">
              Newsroom & <br />
              <span className="italic font-serif text-blue-600 font-normal">Verified Wire Releases</span>
            </h1>
            <p className="text-slate-600 text-base leading-relaxed font-light">
              Official press announcements, embargoed disclosures, executive appointments, and verifiable media advisories distributed by Apex & Vantage PR.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#07132B] text-white border border-blue-900/40 rounded-sm p-6 space-y-3 shadow-md">
            <div className="text-[10px] uppercase tracking-[0.2em] text-blue-300 font-bold">
              Media Desk & Press Inquiries
            </div>
            <div className="text-xs text-white/70 font-light leading-relaxed">
              Accredited journalists may request embargoed assets, executive interview slots, and high-res broadcast b-roll.
            </div>
            <div className="pt-2 space-y-2 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href="mailto:press@apexvantagepr.com" className="hover:text-blue-300 transition-colors">
                  press@apexvantagepr.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white/80">+1 (212) 555-0100 (24/7 Desk)</span>
              </div>
            </div>
            <button
              onClick={handleDownloadKit}
              className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download Master Media Kit (.ZIP)</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search wire releases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-sm pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#07132B] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Releases List */}
        <div className="space-y-3">
          {filteredReleases.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-sm border border-slate-200 text-slate-400 text-sm shadow-sm">
              No press releases matched your query. Try adjusting your search term.
            </div>
          ) : (
            filteredReleases.map((pr) => (
              <div
                key={pr.id}
                onClick={() => navigateTo('press-release', pr.slug || pr.id)}
                className="bg-white border border-slate-200 hover:border-blue-500 rounded-sm p-6 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm hover:shadow-md"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="text-blue-600 font-bold uppercase tracking-wider">{pr.company}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400">{pr.date}</span>
                    <span className="text-slate-300">•</span>
                    <span className="px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-200 text-slate-600 text-[10px] uppercase tracking-wider font-medium">
                      {pr.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {pr.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                    {pr.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
                    <span>Read Release</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
