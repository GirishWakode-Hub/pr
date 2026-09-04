import React, { useState, useEffect, useCallback } from 'react';
import { usePR, PageRoute } from '../../context/PRContext';
import { Logo } from './Logo';
import { AiModLogo } from './AiModLogo';
import {
  Search,
  Menu,
  X,
  ArrowRight,
  Briefcase,
  BarChart2,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Bot
} from 'lucide-react';

interface NavItem {
  label: string;
  route: PageRoute;
  description?: string;
}

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    setIsSearchOpen,
    setIsConsultationModalOpen,
    setIsConciergeOpen,
    setCurrentRole,
  } = usePR();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection for sticky header height & background transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & Escape key listener for the full-screen menu overlay
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    },
    [isMobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isMobileMenuOpen]);

  // Primary horizontal desktop navigation matching image preview: About, Services, Insights, Newsroom, Contact
  const primaryDesktopNav: NavItem[] = [
    { label: 'About', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Insights', route: 'insights' },
    { label: 'Newsroom', route: 'newsroom' },
    { label: 'Contact', route: 'contact' },
  ];

  // Full-screen overlay structured navigation
  const fullOverlayNav: NavItem[] = [
    { label: 'Home', route: 'home', description: 'Overview & editorial marquee' },
    { label: 'About', route: 'about', description: 'Leadership, methodology & pedigree' },
    { label: 'Services', route: 'services', description: 'Strategic PR & reputation advisory' },
    { label: 'Our Work', route: 'work', description: 'Selected mandates & impact dossiers' },
    { label: 'Insights', route: 'insights', description: 'Strategic communications intelligence' },
    { label: 'Newsroom', route: 'newsroom', description: 'Syndicated releases & announcements' },
    { label: 'Media Gallery', route: 'media-gallery', description: 'Brand assets, press kits & photography' },
    { label: 'Contact', route: 'contact', description: 'Global desk & inquiry channels' },
  ];

  const handleNavClick = (route: PageRoute) => {
    navigateTo(route);
    setIsMobileMenuOpen(false);
  };

  const handleStartConversation = () => {
    setIsConsultationModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-out pt-[env(safe-area-inset-top)] ${
          isScrolled
            ? 'bg-[#111827]/95 backdrop-blur-md border-b border-[#1F2937] py-2.5 sm:py-3 shadow-md shadow-[#0B0F19]/50'
            : 'bg-[#111827] border-b border-[#1F2937]/70 py-3.5 sm:py-4.5 shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: GS • Relation Logo */}
          <button
            id="header-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827] rounded-sm group transition-opacity hover:opacity-95 py-1"
            aria-label="GS • Relation Home"
          >
            <Logo
              size="md"
              showTagline={false}
              theme="dark"
            />
          </button>

          {/* Center: Desktop Horizontal Navigation */}
          <nav
            id="desktop-primary-nav"
            className="hidden lg:flex items-center gap-7 xl:gap-9 text-xs xl:text-sm font-medium tracking-wide"
            aria-label="Primary Navigation"
          >
            {primaryDesktopNav.map((link) => {
              const isActive = currentPage === link.route;
              return (
                <button
                  key={link.route}
                  id={`desktop-nav-${link.route}`}
                  onClick={() => handleNavClick(link.route)}
                  className={`relative py-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2E7D68] rounded-sm group ${
                    isActive
                      ? 'text-[#2E7D68] font-semibold'
                      : 'text-slate-300 hover:text-[#2E7D68]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Active / hover underline indicator matching image */}
                  {isActive ? (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2E7D68] rounded-full"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#2E7D68] rounded-full transition-all duration-200 group-hover:w-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Minimal Search, AI Moderator & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI PR Moderator Trigger */}
            <button
              id="header-ai-concierge-trigger"
              onClick={() => setIsConciergeOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 min-h-[40px] sm:min-h-[42px] rounded-md text-[#D4D7CC] hover:text-white bg-[#1F2937]/70 hover:bg-[#1F2937] border border-[#2E7D68]/30 hover:border-[#2E7D68]/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D68] text-xs font-semibold shadow-xs group"
              title="Open AI PR Moderator & Web Feature Guide"
              aria-label="AI PR Moderator"
            >
              <AiModLogo size="xs" animated={true} />
              <span className="hidden md:inline font-medium tracking-wide">AI Mod</span>
            </button>

            {/* Minimal Search Trigger */}
            <button
              id="header-search-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[42px] sm:min-h-[42px] rounded-md text-slate-300 hover:text-white bg-[#1F2937]/70 hover:bg-[#1F2937] border border-white/10 hover:border-[#2E7D68]/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D68] active:bg-[#1F2937]"
              title="Search GS • Relation intelligence, releases, and archives (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-slate-300" />
            </button>

            {/* Desktop Primary CTA: "Let's Talk →" in Sage Green */}
            <button
              id="header-cta-start-conversation"
              onClick={handleStartConversation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#2E7D68] hover:bg-[#246453] text-white font-medium text-xs sm:text-sm tracking-normal transition-all duration-200 shadow-sm shadow-[#2E7D68]/30 group active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Hamburger Button (Mobile / Tablet / Full Menu Explorer) */}
            <button
              id="header-hamburger-trigger"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex lg:hidden items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[42px] sm:min-h-[42px] rounded-md text-slate-300 hover:text-white bg-[#1F2937]/70 hover:bg-[#1F2937] border border-white/10 hover:border-[#2E7D68]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D68] active:bg-[#1F2937]"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="fullscreen-navigation-overlay"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          id="fullscreen-navigation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-[#111827]/98 backdrop-blur-2xl text-white overflow-y-auto flex flex-col justify-between animate-in fade-in duration-200 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        >
          {/* Overlay Top Bar */}
          <div className="border-b border-[#1F2937] bg-[#111827]/95 sticky top-0 z-10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
              <div onClick={() => handleNavClick('home')} className="cursor-pointer">
                <Logo
                  size="md"
                  showTagline={false}
                  theme="dark"
                />
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  id="overlay-search-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-md bg-[#1F2937] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors active:bg-[#374151]"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 text-[#2E7D68]" />
                  <span className="hidden sm:inline">Search (⌘K)</span>
                </button>

                <button
                  id="close-navigation-overlay-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-md text-slate-400 hover:text-white bg-[#1F2937] hover:bg-[#374151] border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D68]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Overlay Main Content Body */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Primary Public Navigation */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#2E7D68] pb-2 border-b border-[#1F2937]">
                  <span className="w-1.5 h-1.5 bg-[#2E7D68] rounded-full" />
                  <span>Navigation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {fullOverlayNav.map((link) => {
                    const isActive = currentPage === link.route;
                    return (
                      <button
                        key={link.route}
                        id={`overlay-nav-${link.route}`}
                        onClick={() => handleNavClick(link.route)}
                        className={`text-left p-3.5 rounded-md transition-all duration-200 group flex flex-col justify-center ${
                          isActive
                            ? 'bg-[#1F2937] border-l-2 border-[#2E7D68] pl-4'
                            : 'hover:bg-[#1F2937]/60 border-l-2 border-transparent hover:border-[#2E7D68]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-base sm:text-lg font-serif tracking-tight transition-colors ${
                              isActive
                                ? 'text-[#2E7D68] font-semibold'
                                : 'text-slate-200 group-hover:text-white'
                            }`}
                          >
                            {link.label}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#2E7D68]" />
                        </div>
                        {link.description && (
                          <span className="text-[11px] font-normal text-[#6B7280] group-hover:text-slate-300 mt-0.5 line-clamp-1">
                            {link.description}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Middle Column: Portals & Intelligence */}
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-6">
                  {/* Client & AI PR Tools */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B7280] pb-2 border-b border-[#1F2937]">
                      <Briefcase className="w-3 h-3 text-[#2E7D68]" />
                      <span>Portals & Intelligence</span>
                    </div>

                    <button
                      id="overlay-nav-ai-concierge"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsConciergeOpen(true);
                      }}
                      className="w-full text-left p-3.5 rounded-md bg-[#1F2937]/70 hover:bg-[#1F2937] border border-[#2E7D68]/30 hover:border-[#2E7D68]/60 transition-all duration-200 group"
                    >
                      <div className="text-xs font-semibold text-[#D4D7CC] group-hover:text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AiModLogo size="xs" animated={true} />
                          <span>AI PR Moderator & Guide</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity text-[#2E7D68]" />
                      </div>
                      <p className="text-[11px] text-[#6B7280] mt-1 font-light">
                        Dual Gemini + ChatGPT trained concierge for guidance & strategy
                      </p>
                    </button>

                    <button
                      id="overlay-nav-client-portal"
                      onClick={() => {
                        setCurrentRole('CLIENT');
                        handleNavClick('client-portal');
                      }}
                      className="w-full text-left p-3.5 rounded-md bg-[#1F2937]/50 hover:bg-[#1F2937] border border-white/10 hover:border-[#2E7D68]/40 transition-all duration-200 group"
                    >
                      <div className="text-xs font-semibold text-white group-hover:text-[#2E7D68] flex items-center justify-between">
                        <span>Client Campaign Portal</span>
                        <ArrowRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-[#6B7280] mt-1 font-light">
                        Live deliverables, media wire monitoring & coverage reports
                      </p>
                    </button>

                    <button
                      id="overlay-nav-reports-analytics"
                      onClick={() => {
                        handleNavClick('reports-analytics');
                      }}
                      className="w-full text-left p-3.5 rounded-md bg-[#1F2937]/50 hover:bg-[#1F2937] border border-white/10 hover:border-[#2E7D68]/40 transition-all duration-200 group"
                    >
                      <div className="text-xs font-semibold text-white group-hover:text-[#2E7D68] flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <BarChart2 className="w-3.5 h-3.5 text-[#2E7D68]" />
                          <span>Reports & Analytics</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-[#6B7280] mt-1 font-light">
                        Earned media value, sentiment analysis & reach metrics
                      </p>
                    </button>

                    <button
                      id="overlay-nav-admin-portal"
                      onClick={() => {
                        handleNavClick('admin');
                      }}
                      className="w-full text-left p-3.5 rounded-md bg-[#1F2937]/50 hover:bg-[#1F2937] border border-white/10 hover:border-[#2E7D68]/40 transition-all duration-200 group"
                    >
                      <div className="text-xs font-semibold text-[#D4D7CC] group-hover:text-white flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D68]" />
                          <span>Admin Control Center</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-[#6B7280] mt-1 font-light">
                        Executive suite with ID & Password authentication
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Featured Story Card (Large Screens) */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-between p-6 rounded-md bg-[#1F2937] border border-[#2E7D68]/30 relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E7D68]">
                    <BookOpen className="w-3 h-3" />
                    <span>Featured Insight</span>
                  </div>

                  <blockquote className="text-lg font-serif italic text-white/90 leading-snug">
                    "How strategic storytelling changes brand perception."
                  </blockquote>

                  <p className="text-xs text-[#D4D7CC]/80 font-light leading-relaxed">
                    Analyzing how category leaders shift from reaction to narrative architecture in complex global markets.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <button
                    id="overlay-read-featured-story-btn"
                    onClick={() => {
                      navigateTo('blog-post', 'anatomy-tier-1-tech-embargo');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-[#2E7D68] hover:text-[#3D9981] flex items-center gap-1.5 group"
                  >
                    <span>Read the story</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Bottom Bar: Primary CTA */}
          <div className="border-t border-[#1F2937] bg-[#111827]/95 py-5 sm:py-6 px-4 sm:px-6 lg:px-8 pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Primary Overlay CTA */}
              <button
                id="overlay-cta-start-conversation"
                onClick={handleStartConversation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-[#2E7D68] hover:bg-[#246453] text-white font-medium text-xs sm:text-sm tracking-normal transition-all duration-200 shadow-sm shadow-[#2E7D68]/30 group active:scale-[0.98]"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Global City Desks */}
              <div className="text-xs font-medium text-[#6B7280] tracking-[0.2em] uppercase text-center sm:text-right">
                <span>New Delhi</span>
                <span className="mx-2 text-slate-600">·</span>
                <span>Mumbai</span>
                <span className="mx-2 text-slate-600">·</span>
                <span>Bengaluru</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
