import React from 'react';
import { usePR } from '../../context/PRContext';
import {
  ArrowLeft,
  Calendar,
  Building,
  Download,
  Share2,
  Copy,
  Printer,
  Mail,
  Phone,
  FileText,
  Quote,
  CheckCircle2
} from 'lucide-react';

export const PressReleaseDetailPage: React.FC = () => {
  const { selectedPressReleaseSlug, pressReleases = [], navigateTo, showToast } = usePR();

  const safeReleases = pressReleases || [];
  const release = safeReleases.find(
    (p) => p.slug === selectedPressReleaseSlug || p.id === selectedPressReleaseSlug
  ) || safeReleases[0];

  if (!release) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white/50">Press release not found.</p>
          <button
            onClick={() => navigateTo('newsroom')}
            className="px-4 py-2 bg-blue-600 rounded-sm text-xs font-bold uppercase tracking-wider"
          >
            Back to Newsroom
          </button>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Press release URL copied to clipboard.');
    }
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([`${release.title}\n\n${release.content}\n\nMedia Contact:\n${release.mediaContact.name} - ${release.mediaContact.email}`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${release.slug || 'press-release'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Release Downloaded', 'Plain text AP release saved.');
  };

  return (
    <div id="press-release-detail-page" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation & Action Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <button
            onClick={() => navigateTo('newsroom')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Newsroom</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
            <button
              onClick={handleDownloadText}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .TXT</span>
            </button>
          </div>
        </div>

        {/* AP Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-block px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              FOR IMMEDIATE RELEASE
            </span>
            <span className="text-xs text-slate-500 font-mono">{release.date}</span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-light tracking-tight text-[#07132B] leading-tight">
            {release.title}
          </h1>

          {release.subtitle && (
            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              {release.subtitle}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-blue-600 pt-1">
            <span className="font-bold uppercase tracking-wider text-[11px]">{release.dateline}</span>
            <span className="text-slate-300">—</span>
            <span className="text-slate-700 font-medium">{release.company}</span>
          </div>
        </div>

        {/* Featured Image if present */}
        {release.image && (
          <div className="rounded-sm overflow-hidden border border-slate-200 shadow-md">
            <img
              src={release.image}
              alt={release.title}
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Press Release Body Text (Editorial / Newsreader typography) */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 font-serif font-light">
            {release.content.split('\n\n').map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Quotes highlight */}
          {release.quotes && release.quotes.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-4 not-prose">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                Executive Commentary
              </div>
              {release.quotes.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-5 rounded-sm border border-slate-200 space-y-2 border-l-4 border-l-blue-600"
                >
                  <p className="text-xs sm:text-sm italic text-slate-800 leading-relaxed font-serif">
                    "{q.quote}"
                  </p>
                  <div className="text-xs font-semibold text-slate-900">
                    — {q.author},{' '}
                    <span className="text-slate-500 font-light">{(q as any).title || (q as any).role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Boilerplate "About Company" */}
          {release.boilerplate && (
            <div className="pt-6 border-t border-slate-100 space-y-2 not-prose">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-semibold">
                About {release.company}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                {release.boilerplate}
              </p>
            </div>
          )}

          {/* Media Contact Block (Dark Blue Component) */}
          <div className="pt-6 border-t border-slate-100 not-prose bg-[#07132B] text-white p-6 rounded-sm border border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 mb-1">
                Authorized Media Contact
              </div>
              <div className="text-sm font-medium text-white">{release.mediaContact.name}</div>
              <div className="text-xs text-white/70 font-light">{release.mediaContact.title}</div>
            </div>

            <div className="space-y-1 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a
                  href={`mailto:${release.mediaContact.email}`}
                  className="hover:text-blue-300 font-light"
                >
                  {release.mediaContact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono text-white/80">{release.mediaContact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
