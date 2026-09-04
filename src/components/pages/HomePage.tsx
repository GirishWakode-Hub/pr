import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import { FOUNDER_PROFILE } from '../../data/mockData';
import {
  ArrowRight,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Globe,
  Radio,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  Quote,
  Camera
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigateTo,
    caseStudies = [],
    pressReleases = [],
    mediaCoverage = [],
    services = [],
    testimonials = [],
    blogPosts = [],
    setIsConsultationModalOpen,
  } = usePR();

  const featuredCases = (caseStudies || []).slice(0, 3);
  const latestReleases = (pressReleases || []).slice(0, 4);
  const featuredInsights = (blogPosts || []).slice(0, 3);

  return (
    <div id="home-page-container" className="min-h-screen bg-[#F8FAF7] text-[#111827] selection:bg-[#2E7D68] selection:text-white font-sans">
      {/* 1. Hero Section - Signature Charcoal & Sage Editorial Layout matching image preview */}
      <section id="hero-section" className="border-b border-[#D4D7CC] bg-[#F8FAF7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Hero Left: Headline, Subtitle, & Primary CTAs */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#D4D7CC] bg-[#F8FAF7]">
            {/* Subtle Eyebrow */}
            <div className="mb-5 flex items-center gap-2 text-[#2E7D68] font-semibold tracking-wider text-xs uppercase">
              <span className="w-6 h-[2px] bg-[#2E7D68] inline-block"></span>
              <span>Strategic Communications & PR</span>
            </div>

            {/* Display Headline in DM Serif Display */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-normal leading-[1.12] mb-6 tracking-tight text-[#111827] font-serif">
              Transforming brands through strategic PR
            </h1>

            {/* Subtitle in Plus Jakarta Sans */}
            <p className="text-base sm:text-lg text-[#6B7280] max-w-lg mb-8 leading-relaxed font-normal">
              Elevate your narrative with data-driven PR strategies designed for high-growth enterprises and market leaders.
            </p>

            {/* High-Contrast Action Buttons matching image preview */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                id="hero-get-in-touch-btn"
                onClick={() => setIsConsultationModalOpen(true)}
                className="bg-[#2E7D68] hover:bg-[#246453] text-white px-7 py-3.5 rounded-md font-medium text-sm tracking-normal transition-all duration-200 shadow-sm shadow-[#2E7D68]/30 flex items-center gap-2 group active:scale-[0.98]"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                id="hero-our-services-btn"
                onClick={() => navigateTo('services')}
                className="bg-transparent border border-[#6B7280]/40 hover:border-[#111827] text-[#111827] px-6 py-3.5 rounded-md font-medium text-sm tracking-normal hover:bg-[#D4D7CC]/30 transition-colors"
              >
                Our Services
              </button>
            </div>

            {/* Trusted Industry Leaders Ticker */}
            <div className="mt-12 pt-6 border-t border-[#D4D7CC]/60">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6B7280] mb-4 font-semibold">
                Trusted by category-defining pioneers
              </p>
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-[#6B7280] opacity-85 hover:opacity-100 transition-opacity">
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase text-[#111827]">SAVANT</span>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase text-[#111827]">ALTUS</span>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase text-[#111827]">NEXUS</span>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase text-[#111827]">ORBITAL</span>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase text-[#111827]">KINETIX</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Charcoal Container with PR Intelligence & 4-Cell Stats Card */}
          <div className="lg:col-span-5 flex flex-col bg-[#111827] text-white justify-between">
            {/* PR Insights Column */}
            <div className="p-6 sm:p-8 lg:p-10 border-b border-[#1F2937]">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E7D68]">Executive Desk</span>
                  <h2 className="text-2xl font-serif text-white mt-1">Strategic Insights</h2>
                </div>
                <button
                  onClick={() => navigateTo('insights')}
                  className="text-xs font-semibold tracking-wider uppercase text-[#2E7D68] hover:text-[#3D9981] transition-colors"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-5">
                {featuredInsights.length > 0 ? (
                  featuredInsights.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => navigateTo('insights')}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-[#6B7280] mb-1">
                        <span className="text-[#2E7D68] font-medium">{item.category}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-sm font-medium leading-snug text-white/90 group-hover:text-[#2E7D68] transition-colors">
                        {item.title}
                      </h3>
                    </article>
                  ))
                ) : (
                  <>
                    <article onClick={() => navigateTo('insights')} className="group cursor-pointer">
                      <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-[#6B7280] mb-1">
                        <span className="text-[#2E7D68] font-medium">Tech & Innovation</span>
                        <span>•</span>
                        <span>May 12, 2026</span>
                      </div>
                      <h3 className="text-sm font-medium leading-snug group-hover:text-[#2E7D68] transition-colors">
                        The evolution of media outreach in the age of generative AI
                      </h3>
                    </article>
                  </>
                )}
              </div>
            </div>

            {/* 4-Cell Stats Grid matching Image Metrics */}
            <div className="p-6 sm:p-8 grid grid-cols-2 gap-3 bg-[#111827]">
              <div className="bg-[#1F2937] p-4 sm:p-5 rounded-md border border-[#2E7D68]/20 flex flex-col justify-between">
                <span className="text-2xl sm:text-3xl font-serif text-[#2E7D68]">500+</span>
                <span className="text-[11px] uppercase tracking-wider text-[#D4D7CC]/80 leading-tight mt-1 font-medium">
                  Media Placements
                </span>
              </div>
              <div className="bg-[#1F2937] p-4 sm:p-5 rounded-md border border-[#2E7D68]/20 flex flex-col justify-between">
                <span className="text-2xl sm:text-3xl font-serif text-[#2E7D68]">12M+</span>
                <span className="text-[11px] uppercase tracking-wider text-[#D4D7CC]/80 leading-tight mt-1 font-medium">
                  Audience Reach
                </span>
              </div>
              <div className="bg-[#1F2937] p-4 sm:p-5 rounded-md border border-[#2E7D68]/20 flex flex-col justify-between">
                <span className="text-2xl sm:text-3xl font-serif text-[#2E7D68]">98%</span>
                <span className="text-[11px] uppercase tracking-wider text-[#D4D7CC]/80 leading-tight mt-1 font-medium">
                  Retention Rate
                </span>
              </div>
              <div className="bg-[#1F2937] p-4 sm:p-5 rounded-md border border-[#2E7D68]/20 flex flex-col justify-between">
                <span className="text-2xl sm:text-3xl font-serif text-[#2E7D68]">150+</span>
                <span className="text-[11px] uppercase tracking-wider text-[#D4D7CC]/80 leading-tight mt-1 font-medium">
                  Global Campaigns
                </span>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div
              onClick={() => setIsConsultationModalOpen(true)}
              className="p-4 sm:p-5 bg-[#2E7D68] hover:bg-[#246453] flex items-center justify-between cursor-pointer group transition-colors"
            >
              <span className="font-medium text-xs text-white">
                Request an Executive Agency Briefing Dossier
              </span>
              <span className="transform group-hover:translate-x-1.5 transition-transform text-white font-bold">
                →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Media Outlets Credibility Ticker */}
      <section id="media-ticker" className="py-10 border-b border-[#D4D7CC] bg-[#F8FAF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-[10px] uppercase tracking-[0.2em] text-[#6B7280] mb-6 font-semibold">
            Direct Editorial Relationships & Tier-1 Wire Syndication
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-[#111827] opacity-80 hover:opacity-100 transition-all duration-300">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-tight">
              THE WALL STREET JOURNAL.
            </span>
            <span className="font-sans font-bold text-lg sm:text-xl tracking-tighter">
              Bloomberg
            </span>
            <span className="font-serif italic font-bold text-lg sm:text-xl">
              FINANCIAL TIMES
            </span>
            <span className="font-sans font-extrabold text-lg sm:text-xl tracking-tight">
              TechCrunch
            </span>
            <span className="font-serif font-bold text-lg sm:text-xl">
              Forbes
            </span>
            <span className="font-mono font-bold text-base sm:text-lg">
              WIRED
            </span>
            <span className="font-sans font-bold text-base sm:text-lg">
              CNBC
            </span>
          </div>
        </div>
      </section>

      {/* 3. Core PR Capabilities (Services) */}
      <section id="capabilities-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#D4D7CC]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-[#2E7D68] font-semibold tracking-wider text-xs uppercase">
              <span className="w-6 h-[2px] bg-[#2E7D68]"></span>
              <span>Full-Spectrum Practice Areas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111827] font-serif">
              Engineered for High-Stakes Public Impact.
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed font-normal">
              We deploy disciplined narrative construction, investigative media pitching, and data-backed communications to protect and elevate enterprise reputation.
            </p>
          </div>
          <button
            onClick={() => navigateTo('services')}
            className="text-xs font-semibold tracking-wider uppercase text-[#2E7D68] hover:text-[#246453] flex items-center gap-2 transition-colors self-start md:self-auto bg-[#D4D7CC]/30 hover:bg-[#D4D7CC]/50 px-4 py-2.5 rounded-md border border-[#D4D7CC]"
          >
            <span>View All Practices</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white border border-[#D4D7CC] hover:border-[#2E7D68] rounded-md p-7 transition-all duration-200 group flex flex-col justify-between shadow-2xs hover:shadow-xs"
            >
              <div>
                <div className="w-10 h-10 rounded-md bg-[#F8FAF7] border border-[#D4D7CC] flex items-center justify-center text-[#2E7D68] mb-5 group-hover:bg-[#2E7D68] group-hover:text-white transition-all">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-normal text-[#111827] group-hover:text-[#2E7D68] transition-colors mb-2.5">
                  {svc.title}
                </h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-6 font-normal">
                  {svc.description}
                </p>

                <div className="space-y-2 border-t border-[#D4D7CC]/50 pt-4">
                  <div className="text-[10px] uppercase tracking-wider text-[#6B7280] font-semibold mb-2">
                    Key Deliverables:
                  </div>
                  {(svc.deliverables || []).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#111827]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D68] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#D4D7CC]/50 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium">
                  {svc.caseCount} Case Studies
                </span>
                <button
                  onClick={() => navigateTo('services')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#2E7D68] group-hover:text-[#111827] flex items-center gap-1 transition-colors"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Case Studies */}
      <section id="case-studies-section" className="py-16 md:py-24 bg-[#D4D7CC]/20 border-b border-[#D4D7CC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-[#2E7D68] font-semibold tracking-wider text-xs uppercase">
                <span className="w-6 h-[2px] bg-[#2E7D68]"></span>
                <span>Proven Editorial Record</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#111827] font-serif">
                Stories of Outsized Impact.
              </h2>
              <p className="text-[#6B7280] text-sm font-normal">
                High-stakes campaigns executed for category leaders in synthetic biology, quantum computing, aerospace, and institutional finance.
              </p>
            </div>

            <button
              onClick={() => navigateTo('work')}
              className="text-xs font-semibold tracking-wider uppercase text-[#2E7D68] hover:text-[#246453] flex items-center gap-2 transition-colors self-start md:self-auto bg-white px-4 py-2 rounded-md border border-[#D4D7CC] shadow-2xs"
            >
              <span>See Full Portfolio</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCases.map((cs) => (
              <div
                key={cs.id}
                onClick={() => navigateTo('case-study', cs.slug || cs.id)}
                className="bg-white border border-[#D4D7CC] rounded-md overflow-hidden hover:border-[#2E7D68] transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-2xs hover:shadow-xs"
              >
                <div className="relative h-48 overflow-hidden bg-[#111827]">
                  <img
                    src={cs.heroImage}
                    alt={cs.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#111827]/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-wider text-[#D4D7CC] border border-[#1F2937]">
                    {cs.industry}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{cs.clientName}</span>
                    <span className="text-xs font-medium text-[#D4D7CC] bg-[#1F2937]/90 px-2 py-0.5 rounded-sm border border-[#2E7D68]/40">
                      {cs.headlineMetric}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-serif font-normal text-[#111827] group-hover:text-[#2E7D68] transition-colors leading-snug">
                      {cs.title}
                    </h3>
                    <p className="text-[#6B7280] text-xs mt-2 line-clamp-2 leading-relaxed font-normal">
                      {cs.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D4D7CC]/50 flex items-center justify-between text-xs">
                    <div className="flex gap-1.5">
                      {(cs.tier1Outlets || []).slice(0, 2).map((outlet, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-sm bg-[#F8FAF7] text-[10px] text-[#111827] border border-[#D4D7CC]"
                        >
                          {outlet}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#2E7D68] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs uppercase tracking-wider">
                      <span>Read Case</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Live Newsroom Wire Feed */}
      <section id="newsroom-wire-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#D4D7CC]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#2E7D68] font-semibold tracking-wider text-xs uppercase">
              <Radio className="w-3.5 h-3.5 text-[#2E7D68] animate-pulse" />
              <span>Agency Wire & Press Desk</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#111827] font-serif">
              Official Press Releases & Announcements
            </h2>
          </div>
          <button
            onClick={() => navigateTo('newsroom')}
            className="text-xs font-semibold tracking-wider uppercase text-[#2E7D68] hover:text-[#246453] flex items-center gap-2 transition-colors self-start md:self-auto bg-[#D4D7CC]/30 px-4 py-2 rounded-md border border-[#D4D7CC]"
          >
            <span>Visit Full Newsroom</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestReleases.map((pr) => (
            <div
              key={pr.id}
              onClick={() => navigateTo('press-release', pr.slug || pr.id)}
              className="bg-white border border-[#D4D7CC] hover:border-[#2E7D68] p-6 rounded-md cursor-pointer transition-all shadow-2xs hover:shadow-xs group"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#6B7280] mb-2">
                <span className="text-[#2E7D68] font-semibold">{pr.company}</span>
                <span>{pr.date}</span>
              </div>
              <h3 className="text-base font-serif font-normal text-[#111827] group-hover:text-[#2E7D68] transition-colors leading-snug mb-2">
                {pr.title}
              </h3>
              <p className="text-[#6B7280] text-xs line-clamp-2 leading-relaxed font-normal">
                {pr.summary}
              </p>
              <div className="mt-4 pt-3 border-t border-[#D4D7CC]/50 flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-sm bg-[#F8FAF7] text-[#111827] text-[10px] uppercase tracking-wider border border-[#D4D7CC]">
                  {pr.category}
                </span>
                <span className="text-[#6B7280] group-hover:text-[#2E7D68] flex items-center gap-1 font-medium">
                  <span>View Wire Release</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#2E7D68]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder's Vision Statement — Mr. Girish Wakode */}
      <section id="founder-quote-section" className="py-16 bg-[#111827] text-white border-y border-[#1F2937] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A2333] border border-[#2E7D68]/40 rounded-lg p-8 sm:p-10 relative shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative shrink-0 group">
                <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-xl overflow-hidden border-2 border-[#2E7D68] shadow-lg bg-[#0B0F19] relative">
                  <img
                    src={typeof window !== 'undefined' ? (localStorage.getItem('gsrelation_founder_photo') || FOUNDER_PROFILE.photo) : FOUNDER_PROFILE.photo}
                    alt="Mr. Girish Wakode"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    onClick={() => navigateTo('about')}
                    title="Change or upload founder photo"
                    className="absolute inset-0 bg-[#111827]/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[11px] font-medium gap-1 cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-[#2E7D68]" />
                    <span>Change Photo</span>
                  </button>
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#2E7D68] text-white text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap shadow-md">
                  Owner & CEO
                </div>
              </div>

              <div className="space-y-3.5 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 text-[#2E7D68] text-xs font-semibold tracking-widest uppercase">
                  <span>Founder's Philosophy</span>
                </div>
                <blockquote className="text-lg sm:text-xl font-serif italic text-white leading-relaxed">
                  "The right story, told with purpose and precision, can shape perception, build trust, and create lasting influence."
                </blockquote>
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-serif text-white font-medium">Mr. Girish Wakode</div>
                    <div className="text-xs text-[#D4D7CC]">
                      Founder & Director — GSRelation | Communications Strategist
                    </div>
                  </div>
                  <button
                    onClick={() => navigateTo('about')}
                    className="text-xs text-[#2E7D68] hover:text-[#52a890] flex items-center gap-1 font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Read Agency Vision</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials & Client Endorsements */}
      <section id="testimonials-section" className="py-16 md:py-24 bg-white border-b border-[#D4D7CC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="flex items-center justify-center gap-2 text-[#2E7D68] font-semibold tracking-wider text-xs uppercase">
              <span className="w-6 h-[2px] bg-[#2E7D68]"></span>
              <span>Client Endorsements</span>
              <span className="w-6 h-[2px] bg-[#2E7D68]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#111827] font-serif">
              Trusted by Pioneers at the Frontier of Commerce.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-[#F8FAF7] border border-[#D4D7CC] rounded-md p-7 relative flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#2E7D68]/30 mb-3" />
                  <p className="text-[#111827] text-sm leading-relaxed italic mb-6 font-serif">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#D4D7CC]/60">
                  <img
                    src={t.authorAvatar}
                    alt={t.authorName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#D4D7CC]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#111827]">{t.authorName}</div>
                    <div className="text-[11px] text-[#6B7280]">
                      {t.authorTitle}, <span className="text-[#2E7D68] font-medium">{t.clientName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom Strategic Advisory CTA (Charcoal & Sage Component) */}
      <section id="cta-banner-section" className="py-20 relative overflow-hidden bg-[#111827] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-md bg-[#1F2937] border border-[#2E7D68]/40 flex items-center justify-center text-[#2E7D68] mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight font-serif">
            Ready to Take Command of Your <br />
            <span className="italic text-[#2E7D68]">Industry Narrative</span>?
          </h2>
          <p className="text-[#D4D7CC]/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            Schedule a confidential briefing with our senior partners in New Delhi, Mumbai, or Bengaluru. We assess positioning, media readiness, and competitive narrative architecture.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#2E7D68] hover:bg-[#246453] text-white font-medium text-sm tracking-normal shadow-sm shadow-[#2E7D68]/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#1F2937] hover:bg-[#374151] text-white border border-white/10 font-medium text-sm tracking-normal transition-all"
            >
              <span>Contact Press Desk</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
