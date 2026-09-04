import React, { useState, useEffect } from 'react';
import { usePR } from '../../context/PRContext';
import {
  Search,
  X,
  FileText,
  Briefcase,
  BookOpen,
  Radio,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    pressReleases,
    caseStudies,
    blogPosts,
    mediaCoverage,
    services,
    navigateTo,
  } = usePR();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchedPR = (pressReleases || [])
    .filter(
      (p) =>
        (p.title || '').toLowerCase().includes(cleanQuery) ||
        (p.company || '').toLowerCase().includes(cleanQuery) ||
        (p.category || '').toLowerCase().includes(cleanQuery)
    )
    .slice(0, 4);

  const matchedCases = (caseStudies || [])
    .filter(
      (c) =>
        (c.title || '').toLowerCase().includes(cleanQuery) ||
        (c.clientName || '').toLowerCase().includes(cleanQuery) ||
        (c.industry || '').toLowerCase().includes(cleanQuery)
    )
    .slice(0, 3);

  const matchedBlogs = (blogPosts || [])
    .filter(
      (b) =>
        (b.title || '').toLowerCase().includes(cleanQuery) ||
        (b.category || '').toLowerCase().includes(cleanQuery) ||
        (b.summary || '').toLowerCase().includes(cleanQuery)
    )
    .slice(0, 3);

  const matchedCoverage = (mediaCoverage || [])
    .filter(
      (m) =>
        (m.articleTitle || '').toLowerCase().includes(cleanQuery) ||
        (m.outletName || '').toLowerCase().includes(cleanQuery) ||
        (m.clientName || '').toLowerCase().includes(cleanQuery)
    )
    .slice(0, 3);

  const hasResults =
    matchedPR.length > 0 ||
    matchedCases.length > 0 ||
    matchedBlogs.length > 0 ||
    matchedCoverage.length > 0;

  const handleSelect = (action: () => void) => {
    action();
    setIsSearchOpen(false);
  };

  return (
    <div
      id="global-search-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-[max(1.5rem,calc(env(safe-area-inset-top)+1rem))] px-3 sm:px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        id="global-search-modal-box"
        className="bg-white border border-slate-200 rounded-sm shadow-2xl max-w-2xl w-full max-h-[calc(100dvh-4rem)] flex flex-col overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar (Dark Blue Header) */}
        <div className="flex items-center px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-blue-900/40 gap-2.5 sm:gap-3 bg-[#07132B] shrink-0">
          <Search className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search press releases, clients, media hits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-white/50 text-sm focus:outline-none font-light"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 hover:bg-white/10 rounded-sm text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded-sm text-white/80 font-mono min-h-[32px] flex items-center justify-center"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-5 sm:space-y-6 flex-1">
          {!query ? (
            <div className="text-center py-8 text-slate-500 text-sm space-y-3 font-light">
              <div className="flex justify-center gap-2">
                <span className="px-2.5 py-1 rounded-sm bg-slate-100 border border-slate-200 text-slate-700 text-xs">
                  Quantum
                </span>
                <span className="px-2.5 py-1 rounded-sm bg-slate-100 border border-slate-200 text-slate-700 text-xs">
                  FDA Approval
                </span>
                <span className="px-2.5 py-1 rounded-sm bg-slate-100 border border-slate-200 text-slate-700 text-xs">
                  Crisis Playbook
                </span>
                <span className="px-2.5 py-1 rounded-sm bg-slate-100 border border-slate-200 text-slate-700 text-xs">
                  Bloomberg
                </span>
              </div>
              <p>Type keywords to search across the entire agency newsroom and archive.</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-10 text-slate-500 text-sm font-light">
              No results found for "{query}". Try searching for client names, news topics, or media outlets.
            </div>
          ) : (
            <>
              {/* Press Releases Section */}
              {matchedPR.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Press Releases ({matchedPR.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedPR.map((pr) => (
                      <button
                        key={pr.id}
                        onClick={() =>
                          handleSelect(() => navigateTo('press-release', pr.slug || pr.id))
                        }
                        className="w-full text-left p-3 rounded-sm bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 transition-colors group flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-medium text-slate-900 group-hover:text-blue-600">
                            {pr.title}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="text-blue-600 font-medium">{pr.company}</span>
                            <span>•</span>
                            <span>{pr.date}</span>
                            <span>•</span>
                            <span>{pr.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies Section */}
              {matchedCases.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>Case Studies ({matchedCases.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCases.map((cs) => (
                      <button
                        key={cs.id}
                        onClick={() =>
                          handleSelect(() => navigateTo('case-study', cs.slug || cs.id))
                        }
                        className="w-full text-left p-3 rounded-sm bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 transition-colors group flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-medium text-slate-900 group-hover:text-blue-600">
                            {cs.title}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="text-blue-600 font-medium">{cs.clientName}</span>
                            <span>•</span>
                            <span>{cs.industry}</span>
                            <span>•</span>
                            <span>{cs.headlineMetric}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Insights & Blog */}
              {matchedBlogs.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>PR Insights & Analysis ({matchedBlogs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedBlogs.map((bp) => (
                      <button
                        key={bp.id}
                        onClick={() =>
                          handleSelect(() => navigateTo('blog-post', bp.slug || bp.id))
                        }
                        className="w-full text-left p-3 rounded-sm bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 transition-colors group flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-medium text-slate-900 group-hover:text-blue-600">
                            {bp.title}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>By {bp.author.name}</span>
                            <span>•</span>
                            <span>{bp.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Media Coverage */}
              {matchedCoverage.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    <span>Earned Media Coverage ({matchedCoverage.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCoverage.map((mc) => (
                      <a
                        key={mc.id}
                        href={mc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full text-left p-3 rounded-sm bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 transition-colors group flex items-center justify-between block"
                      >
                        <div>
                          <div className="text-xs font-medium text-slate-900 group-hover:text-blue-600">
                            {mc.articleTitle}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="text-blue-600 font-medium">{mc.outletName}</span>
                            <span>•</span>
                            <span>{mc.clientName}</span>
                            <span>•</span>
                            <span>{mc.date}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-light">
          <div>Press releases, case studies, blogs, and media hits</div>
          <div className="font-mono text-blue-600 font-medium">Apex Search Engine v2.4</div>
        </div>
      </div>
    </div>
  );
};
