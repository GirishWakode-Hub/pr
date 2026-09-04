import React, { useState, useRef } from 'react';
import { usePR } from '../../context/PRContext';
import { LEADERSHIP_TEAM, FOUNDER_PROFILE } from '../../data/mockData';
import { Logo } from '../common/Logo';
import {
  Award,
  Globe,
  Shield,
  CheckCircle2,
  Users,
  Building,
  ArrowRight,
  Sparkles,
  Quote,
  Target,
  Compass,
  TrendingUp,
  Linkedin,
  Camera,
  Upload,
  X,
  Check,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setIsConsultationModalOpen, showToast } = usePR();
  const [founderPhoto, setFounderPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gsrelation_founder_photo') || FOUNDER_PROFILE.photo;
    }
    return FOUNDER_PROFILE.photo;
  });
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string>(founderPhoto);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const directFileInputRef = useRef<HTMLInputElement | null>(null);

  const curatedExecutiveOptions = [
    {
      label: 'Mr. Girish Wakode — Executive Suit & Collar (Official)',
      url: '/girish-wakode.jpg',
    },
    {
      label: 'Mr. Girish Wakode — Smart-Casual Signature Look',
      url: '/girish-wakode-casual.jpg',
    },
  ];

  const uploadToServer = async (base64OrUrl: string) => {
    setIsUploading(true);
    try {
      const res = await fetch('/api/upload-founder-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64OrUrl }),
      });
      const data = await res.json();
      if (data.success) {
        const freshUrl = data.url || `/girish-wakode.jpg?v=${Date.now()}`;
        setFounderPhoto(freshUrl);
        setPreviewPhoto(freshUrl);
        if (typeof window !== 'undefined') {
          localStorage.setItem('gsrelation_founder_photo', freshUrl);
        }
        showToast('Photo Updated & Saved Permanently', 'Your headshot is now live across the website and saved to the server.', 'success');
      } else {
        showToast('Photo Updated', 'Saved locally to your browser session.', 'info');
      }
    } catch {
      showToast('Photo Updated', 'Applied to your browser view.', 'info');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDirectFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const base64 = reader.result;
          setFounderPhoto(base64);
          setPreviewPhoto(base64);
          if (typeof window !== 'undefined') {
            localStorage.setItem('gsrelation_founder_photo', base64);
          }
          uploadToServer(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = (newUrl: string) => {
    setFounderPhoto(newUrl);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gsrelation_founder_photo', newUrl);
    }
    if (newUrl.startsWith('data:image')) {
      uploadToServer(newUrl);
    } else {
      showToast('Photo Applied', 'Founder portrait set successfully.', 'success');
    }
    setIsPhotoModalOpen(false);
  };

  const handleResetDefault = () => {
    setFounderPhoto(FOUNDER_PROFILE.photo);
    setPreviewPhoto(FOUNDER_PROFILE.photo);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gsrelation_founder_photo');
    }
    showToast('Reset to Default', 'Founder portrait reset to default image.', 'info');
    setIsPhotoModalOpen(false);
  };

  return (
    <div id="about-page" className="min-h-screen bg-[#F8FAF7] text-[#111827] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-6">
          <Logo size="lg" theme="light" />
          <div className="flex items-center gap-2 text-[#2E7D68] font-semibold tracking-wider text-xs uppercase">
            <span className="w-8 h-[2px] bg-[#2E7D68]"></span>
            <span>Agency Heritage & Leadership</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-[#111827] font-serif leading-tight">
            We Treat PR as Strategic Leverage, <br />
            <span className="italic font-serif text-[#2E7D68]">Not Volume Marketing</span>.
          </h1>
          <p className="text-[#6B7280] text-lg leading-relaxed font-normal">
            Headquartered in New Delhi with key bureaus in Mumbai, Bengaluru, and Hyderabad, GSRelation is a modern public relations and strategic communications company built on the conviction that every individual, organisation, and brand has a story worth shaping and a reputation worth building.
          </p>
        </div>

        {/* Founder & Director Spotlight — Mr. Girish Wakode */}
        <section id="founder-spotlight" className="bg-white border border-[#D4D7CC] rounded-lg overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Founder Portrait & Identity Card */}
            <div className="lg:col-span-5 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between space-y-6 text-white border-b lg:border-b-0 lg:border-r border-[#1F2937]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E7D68] text-white text-[11px] font-semibold tracking-wider uppercase shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Owner & CEO</span>
                  </div>

                  {/* Photo Customizer */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewPhoto(founderPhoto);
                      setCustomUrl('');
                      setIsPhotoModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-md bg-[#1F2937] hover:bg-[#2E7D68] text-white/90 hover:text-white border border-white/10 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Change or upload headshot"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">Change Photo</span>
                  </button>
                </div>

                {/* Completely unobstructed, high-resolution portrait in proper size */}
                <div className="relative w-full max-w-xs sm:max-w-sm mx-auto aspect-[3/4] rounded-lg overflow-hidden border-2 border-[#2E7D68]/40 shadow-2xl bg-[#0B0F19]">
                  <img
                    src={founderPhoto}
                    alt={FOUNDER_PROFILE.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-lg pointer-events-none" />
                </div>

                {/* 1-Click Direct Photo Upload */}
                <div className="pt-2">
                  <input
                    type="file"
                    ref={directFileInputRef}
                    onChange={handleDirectFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => directFileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-[#2E7D68] hover:bg-[#256654] text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Saving Photo...' : 'Upload Your Photo (1-Click)'}</span>
                  </button>
                  <p className="text-[10px] text-center text-[#D4D7CC]/70 pt-1">
                    Select any photo from your phone or PC to update immediately
                  </p>
                </div>
              </div>

              {/* Founder Credentials neatly below portrait */}
              <div className="space-y-2 pt-3 border-t border-white/10 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">{FOUNDER_PROFILE.name}</h2>
                <div className="text-xs uppercase tracking-widest text-[#2E7D68] font-semibold">
                  {FOUNDER_PROFILE.position}
                </div>
                <div className="text-xs text-[#D4D7CC] font-light leading-relaxed">
                  Head of Strategic Communications & Brand Reputation Architecture
                </div>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                  <a
                    href={FOUNDER_PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4D7CC] hover:text-[#2E7D68] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#2E7D68]" />
                    <span>Executive Profile</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Comprehensive Biography & Philosophy */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-[#2E7D68] text-xs font-semibold uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Founder's Vision & Conviction</span>
                </div>

                {/* Key Philosophy Quote */}
                <div className="bg-[#F8FAF7] border-l-4 border-[#2E7D68] p-5 rounded-r-md">
                  <div className="flex items-start gap-3">
                    <Quote className="w-6 h-6 text-[#2E7D68] shrink-0 mt-0.5" />
                    <p className="text-base sm:text-lg font-serif italic text-[#111827] leading-relaxed">
                      "{FOUNDER_PROFILE.philosophy}"
                    </p>
                  </div>
                  <div className="mt-2 text-right text-xs font-semibold text-[#2E7D68] uppercase tracking-wider">
                    — Mr. Girish Wakode, Founder & Director
                  </div>
                </div>

                {/* Full Biography */}
                <div className="space-y-3.5 text-sm text-[#4B5563] leading-relaxed font-normal">
                  <p>
                    <strong className="text-[#111827] font-semibold">{FOUNDER_PROFILE.name}</strong> is a communications strategist and the Founder & Director of <strong className="text-[#111827] font-semibold">GSRelation</strong>, a modern public relations and strategic communications company built on the belief that every individual, organisation, and brand has a story worth shaping and a reputation worth building.
                  </p>
                  <p>
                    With a strong understanding of communication, branding, media, and public perception, Girish brings together strategic thinking, creativity, relationship building, and a forward-looking approach to create communication that goes beyond visibility—it creates influence.
                  </p>
                  <p>
                    His work spans strategic public relations, media engagement, brand positioning, reputation management, content strategy, public image development, and communication campaigns, with a constant focus on clarity, credibility, and meaningful impact. As the driving force behind GSRelation, he combines entrepreneurial vision with a deep understanding of how people, brands, and audiences connect in a rapidly evolving digital world.
                  </p>
                  <p>
                    Through GSRelation, Girish is committed to creating intelligent, distinctive, and result-oriented communication strategies that help clients not only be seen, but genuinely remembered.
                  </p>
                </div>

                {/* Areas of Practice & Mastery */}
                <div className="pt-4 border-t border-[#D4D7CC]/60 space-y-2.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#111827]">
                    Key Practice Areas & Strategic Focus:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FOUNDER_PROFILE.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#F8FAF7] border border-[#D4D7CC] text-[11px] font-medium text-[#111827]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Founder CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="px-6 py-2.5 bg-[#2E7D68] hover:bg-[#246453] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
                >
                  <span>Consult with Executive Office</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-[#6B7280]">
                  Confidential advisory directly reviewed by Mr. Girish Wakode
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Agency Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#D4D7CC] rounded-md p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-md bg-[#D4D7CC]/30 text-[#2E7D68] flex items-center justify-center border border-[#D4D7CC]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif text-[#111827]">
              Uncompromising Editorial Respect
            </h3>
            <p className="text-[#6B7280] text-xs leading-relaxed font-normal">
              We never blast mass press releases. Every pitch, embargo, and interview we propose to The Economic Times, Mint, or CNBC-TV18 is backed by factual rigor and verified industry proof.
            </p>
          </div>

          <div className="bg-white border border-[#D4D7CC] rounded-md p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-md bg-[#D4D7CC]/30 text-[#2E7D68] flex items-center justify-center border border-[#D4D7CC]">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif text-[#111827]">
              Pan-India National Bureau Reach
            </h3>
            <p className="text-[#6B7280] text-xs leading-relaxed font-normal">
              With integrated bureaus across New Delhi (Connaught Place), Mumbai (One BKC), Bengaluru (Indiranagar), and Hyderabad (HITEC City), our communications engine operates seamlessly across regional and national news cycles.
            </p>
          </div>

          <div className="bg-white border border-[#D4D7CC] rounded-md p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-md bg-[#D4D7CC]/30 text-[#2E7D68] flex items-center justify-center border border-[#D4D7CC]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif text-[#111827]">
              Beyond Visibility — Lasting Influence
            </h3>
            <p className="text-[#6B7280] text-xs leading-relaxed font-normal">
              We benchmark success through tier-1 page-one features, broadcast soundbites, executive reputation clarity, and enterprise trust that builds long-term organizational equity.
            </p>
          </div>
        </div>

        {/* Leadership Team Showcase */}
        <div className="space-y-10">
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E7D68]">
              Executive Counsel
            </div>
            <h2 className="text-3xl font-serif text-[#111827]">
              Senior Partners & <span className="italic font-serif text-[#2E7D68]">Practice Directors</span>
            </h2>
            <p className="text-[#6B7280] text-sm max-w-2xl font-normal">
              Directed by Founder Mr. Girish Wakode, every client engagement at GSRelation is executed by senior partners with extensive national journalism, public affairs, and capital markets experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_TEAM.filter(m => m.id !== 'ldr-founder').map((member) => (
              <div
                key={member.id}
                className="bg-white border border-[#D4D7CC] rounded-md overflow-hidden group flex flex-col justify-between hover:border-[#2E7D68] transition-all shadow-2xs hover:shadow-xs"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-[#F8FAF7]">
                    <img
                      src={member.photo || member.image}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-base font-serif text-white">{member.name}</div>
                      <div className="text-[11px] text-[#2E7D68] font-semibold uppercase tracking-wider line-clamp-1">{member.position || member.role}</div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
                      {member.bio}
                    </p>

                    <div className="pt-3 border-t border-[#D4D7CC]/50 text-[11px] text-[#6B7280] font-normal space-y-1">
                      <div>
                        <strong className="text-[#111827] font-medium uppercase tracking-wider text-[10px]">Expertise:</strong> {(member.expertise || member.specialties || []).join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* National Bureaus (Charcoal & Sage Component) */}
        <div className="bg-[#111827] text-white border border-[#1F2937] rounded-lg p-8 sm:p-12 space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E7D68]">
              National Footprint
            </div>
            <h3 className="text-3xl font-serif text-white">
              Strategic Bureaus <span className="italic font-serif text-[#2E7D68]">Across India</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="bg-[#1A2333] p-6 rounded-md border border-[#1F2937] space-y-2">
              <div className="text-base font-medium text-white">New Delhi (HQ)</div>
              <div className="text-xs text-[#D4D7CC] font-normal">Barakhamba Road, Connaught Place</div>
              <div className="text-xs font-mono text-[#2E7D68]">+91 11 4988 0100</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 pt-3 border-t border-white/10 font-medium">
                National Policy & Executive Office
              </div>
            </div>

            <div className="bg-[#1A2333] p-6 rounded-md border border-[#1F2937] space-y-2">
              <div className="text-base font-medium text-white">Mumbai</div>
              <div className="text-xs text-[#D4D7CC] font-normal">One BKC, Bandra Kurla Complex</div>
              <div className="text-xs font-mono text-[#2E7D68]">+91 22 6155 0811</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 pt-3 border-t border-white/10 font-medium">
                Financial PR & Capital Markets Desk
              </div>
            </div>

            <div className="bg-[#1A2333] p-6 rounded-md border border-[#1F2937] space-y-2">
              <div className="text-base font-medium text-white">Bengaluru</div>
              <div className="text-xs text-[#D4D7CC] font-normal">100 Feet Road, Indiranagar</div>
              <div className="text-xs font-mono text-[#2E7D68]">+91 80 4122 0900</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 pt-3 border-t border-white/10 font-medium">
                DeepTech, AI & Startup Launch Hub
              </div>
            </div>

            <div className="bg-[#1A2333] p-6 rounded-md border border-[#1F2937] space-y-2">
              <div className="text-base font-medium text-white">Hyderabad</div>
              <div className="text-xs text-[#D4D7CC] font-normal">Knowledge City, HITEC City</div>
              <div className="text-xs font-mono text-[#2E7D68]">+91 40 6823 4400</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 pt-3 border-t border-white/10 font-medium">
                Pharma, Biotech & Aerospace Corridor
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Executive Portrait Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-lg border border-[#D4D7CC] max-w-lg w-full p-6 space-y-6 shadow-2xl relative text-[#111827]">
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2E7D68] uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>Executive Portrait Settings</span>
              </div>
              <h3 className="text-xl font-serif text-[#111827]">Update Founder & CEO Headshot</h3>
              <p className="text-xs text-gray-500 font-normal">
                Select a high-resolution executive portrait or upload Mr. Girish Wakode's official headshot photo.
              </p>
            </div>

            {/* Current Preview */}
            <div className="flex items-center gap-4 p-4 bg-[#F8FAF7] rounded-lg border border-[#D4D7CC]/60">
              <div className="w-20 h-24 rounded-md overflow-hidden bg-[#111827] shrink-0 border border-[#D4D7CC] shadow-inner relative">
                <img
                  src={previewPhoto}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="text-xs space-y-1">
                <div className="font-medium text-gray-900">Current Portrait Preview</div>
                <div className="text-gray-500 text-[11px]">Displays across the Founder Spotlight, Executive Desk, and Quote sections.</div>
              </div>
            </div>

            {/* Curated Executive Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Curated Executive Styles
              </label>
              <div className="grid grid-cols-1 gap-2">
                {curatedExecutiveOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPreviewPhoto(opt.url)}
                    className={`flex items-center justify-between p-2.5 text-xs rounded-md border text-left transition-all ${
                      previewPhoto === opt.url
                        ? 'border-[#2E7D68] bg-[#2E7D68]/5 text-[#111827] font-medium ring-1 ring-[#2E7D68]'
                        : 'border-[#D4D7CC] hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={opt.url}
                        alt={opt.label}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <span>{opt.label}</span>
                    </div>
                    {previewPhoto === opt.url && <Check className="w-4 h-4 text-[#2E7D68]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL or Direct Upload */}
            <div className="space-y-3 pt-2 border-t border-[#D4D7CC]/60">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Option A: Enter Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/portrait.jpg"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      if (e.target.value) setPreviewPhoto(e.target.value);
                    }}
                    className="flex-1 px-3 py-2 text-xs border border-[#D4D7CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2E7D68]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customUrl.trim()) setPreviewPhoto(customUrl.trim());
                    }}
                    className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Option B: Upload Photo from Device
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border border-dashed border-[#2E7D68]/60 hover:border-[#2E7D68] bg-[#2E7D68]/5 hover:bg-[#2E7D68]/10 text-xs text-[#2E7D68] font-medium rounded-md transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Image File (JPG, PNG, WebP)</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D4D7CC]/60">
              <button
                type="button"
                onClick={handleResetDefault}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSavePhoto(previewPhoto)}
                  className="px-5 py-2 text-xs bg-[#2E7D68] hover:bg-[#266856] text-white font-medium rounded-md shadow-xs transition-colors"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

