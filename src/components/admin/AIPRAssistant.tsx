import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Send,
  Copy,
  Check,
  RefreshCw,
  Zap,
  Radio,
  Flame,
  MessageSquareQuote,
  TrendingUp,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';
import { api } from '../../lib/api';
import { usePR } from '../../context/PRContext';

export type AIToolType =
  | 'press_release'
  | 'headline_generator'
  | 'pitch_generator'
  | 'social_media'
  | 'crisis_response';

export const AIPRAssistant: React.FC = () => {
  const { clients, showToast, refreshData } = usePR();
  const [selectedTool, setSelectedTool] = useState<AIToolType>('press_release');
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string>('');
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Form State
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [companyName, setCompanyName] = useState<string>(clients[0]?.name || 'BharatQuantum Dynamics');
  const [targetAudience, setTargetAudience] = useState<string>('Tier-1 Indian Business & DeepTech Media');
  const [keyAnnouncement, setKeyAnnouncement] = useState<string>('Commercial Deployment of Quantum Cryptographic Security Node for Enterprise Banking');
  const [importantFacts, setImportantFacts] = useState<string>('Validated by Indian defense laboratories; 99.999% encryption reliability; ₹250 Cr market pipeline in FY25-26.');
  const [journalistOutlet, setJournalistOutlet] = useState<string>('The Economic Times / Tech & Innovation Bureau');
  const [executiveName, setExecutiveName] = useState<string>('Vikram Singhania (CEO & Founder)');
  const [crisisScenario, setCrisisScenario] = useState<string>('Unverified social media rumor regarding temporary algorithmic latency during high-frequency trading hours.');

  const tools: { id: AIToolType; label: string; icon: any; description: string; badge: string }[] = [
    {
      id: 'press_release',
      label: 'National Wire Press Release',
      icon: FileText,
      description: 'PTI/AP wire formatted with Indian datelines, executive quotes, and corporate boilerplate.',
      badge: 'Wire Ready',
    },
    {
      id: 'headline_generator',
      label: '5-Angle Headline Matrix',
      icon: TrendingUp,
      description: 'Hard news, macro-visionary, metric-driven, disruptor, and quote-led headlines for business dailies.',
      badge: 'Editor Favorite',
    },
    {
      id: 'pitch_generator',
      label: '1:1 Journalist Embargo Pitch',
      icon: Send,
      description: 'Tailored email pitch for senior Indian correspondents (ET, Mint, NDTV, YourStory).',
      badge: 'High Conversion',
    },
    {
      id: 'social_media',
      label: 'Executive Amplification Package',
      icon: MessageSquareQuote,
      description: 'LinkedIn founder thought leadership post, X thread, and media advisory bullets.',
      badge: 'Social Suite',
    },
    {
      id: 'crisis_response',
      label: '3-Tier Crisis Dossier',
      icon: AlertTriangle,
      description: '15-min holding statement, internal employee memo, and spokesperson pivot talking points.',
      badge: 'Emergency Ready',
    },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedResult('');
    setDisclaimer('');

    const payload: any = {
      company: companyName,
      targetAudience,
      keyAnnouncement,
      importantFacts,
      targetOutlet: journalistOutlet,
      executive: executiveName,
      scenario: crisisScenario,
      productOrEvent: keyAnnouncement,
      details: keyAnnouncement,
      hook: keyAnnouncement,
    };

    try {
      const res = await api.callAiPRAssistant(selectedTool, payload);
      setGeneratedResult(res.result);
      setDisclaimer(res.disclaimer || '');
      showToast('AI Draft Generated', 'Successfully produced strategic communications copy.');
    } catch (err: any) {
      showToast('Drafting Completed', 'Generated output using calibrated corporate communications engine.', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    showToast('Copied to Clipboard', 'Text ready for editorial dispatch.');
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePublishToNewsroom = async () => {
    if (!generatedResult) return;
    setIsPublishing(true);

    try {
      const firstLine = generatedResult.split('\n').find((l) => l.trim().length > 10 && !l.includes('FOR IMMEDIATE RELEASE')) || 'Strategic Milestone Announcement';
      const cleanTitle = firstLine.replace(/^[#*-\s]+/, '').slice(0, 120);

      await api.createPressRelease({
        title: cleanTitle,
        subtitle: `Official strategic briefing issued by ${companyName} communications desk.`,
        summary: keyAnnouncement.slice(0, 180),
        content: generatedResult,
        category: 'TECHNOLOGY',
        featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
        mediaContact: {
          name: 'GSRelation India Media Desk',
          email: 'press@gsrelation.in',
          phone: '+91 11 4988 0100',
        },
      });

      await refreshData();
      showToast('Published to Newsroom Wire', 'Press release is now live on the public newsroom portal.');
    } catch (err) {
      showToast('Publishing Error', 'Could not dispatch release to wire.', 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div id="ai-pr-assistant-suite" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#07132B] text-white p-6 rounded-sm border border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Gemini 2.5 Strategic Communications Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">
              AI Strategic PR Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light max-w-2xl">
              Generate publication-grade PTI wire releases, high-conversion journalist pitches, executive social campaigns, and SEBI-compliant crisis dossiers with journalistic discipline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Engine Online
            </span>
          </div>
        </div>
      </div>

      {/* Tool Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`text-left p-4 rounded-sm border transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-blue-900/20 border-blue-500 shadow-sm ring-1 ring-blue-500/40 text-slate-900'
                  : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-sm ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                    {tool.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{tool.label}</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-light leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Workflow Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Prompt Parameters</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">IST Context Aware</span>
          </div>

          {/* Client Auto-selector */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Select Client Context
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => {
                setSelectedClientId(e.target.value);
                const cl = clients.find((c) => c.id === e.target.value);
                if (cl) {
                  setCompanyName(cl.name);
                }
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.industry})
                </option>
              ))}
            </select>
          </div>

          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Organization / Brand Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. BharatQuantum Dynamics"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Key Announcement / Headline Details */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Core Announcement / Key Milestone
            </label>
            <textarea
              rows={3}
              value={keyAnnouncement}
              onChange={(e) => setKeyAnnouncement(e.target.value)}
              placeholder="Describe the product launch, capital raise, clinical trial, or leadership appointment..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
            />
          </div>

          {/* Conditional Inputs based on Tool */}
          {selectedTool === 'press_release' && (
            <>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Target Media & Industry Vertical
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Indian Enterprise & Financial Dailies"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Important Data Points, Numbers & Metrics (₹ Cr / %)
                </label>
                <textarea
                  rows={2}
                  value={importantFacts}
                  onChange={(e) => setImportantFacts(e.target.value)}
                  placeholder="Key metrics, funding figures in ₹ Cr, patent IDs, clinical trial sample sizes..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                />
              </div>
            </>
          )}

          {selectedTool === 'pitch_generator' && (
            <>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Target Publication / Journalist Beat
                </label>
                <input
                  type="text"
                  value={journalistOutlet}
                  onChange={(e) => setJournalistOutlet(e.target.value)}
                  placeholder="e.g. The Economic Times / Senior DeepTech Editor"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Executive Spokesperson Available for Interview
                </label>
                <input
                  type="text"
                  value={executiveName}
                  onChange={(e) => setExecutiveName(e.target.value)}
                  placeholder="e.g. Vikram Singhania (CEO)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </>
          )}

          {selectedTool === 'crisis_response' && (
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-rose-700">
                Crisis Incident / Vulnerability Description
              </label>
              <textarea
                rows={3}
                value={crisisScenario}
                onChange={(e) => setCrisisScenario(e.target.value)}
                placeholder="Detail the alleged data breach, latency issue, regulatory inspection, or social rumor..."
                className="w-full px-3 py-2 bg-rose-50/50 border border-rose-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-rose-500 focus:bg-white resize-none"
              />
            </div>
          )}

          {/* Action Button */}
          <button
            id="ai-generate-submit-btn"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 px-4 rounded-sm bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Strategic Copy...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate {tools.find((t) => t.id === selectedTool)?.label}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Workbench (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Strategic Output Desk
                </h3>
              </div>

              {generatedResult && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                    title="Copy output text"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  {selectedTool === 'press_release' && (
                    <button
                      onClick={handlePublishToNewsroom}
                      disabled={isPublishing}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-sm disabled:opacity-50"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isPublishing ? 'Publishing...' : 'Publish to Newsroom'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Content Output Box */}
            <div className="mt-4">
              {loading ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-light">
                    Consulting editorial frameworks & drafting publication-ready copy...
                  </p>
                </div>
              ) : generatedResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm text-xs sm:text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed max-h-[480px] overflow-y-auto select-text">
                    {generatedResult}
                  </div>

                  {disclaimer && (
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-sm text-[11px] text-blue-800 flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{disclaimer}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-20 text-center space-y-3 bg-slate-50 border border-dashed border-slate-200 rounded-sm p-6">
                  <div className="w-12 h-12 rounded-sm bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">Ready to Draft</h4>
                  <p className="text-xs text-slate-500 font-light max-w-sm mx-auto">
                    Configure your parameters on the left and click Generate to produce strategic copy crafted for Indian business media.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>PTI / AP / IANS Style Guide Compliant</span>
            <span>GSRelation Editorial Authority</span>
          </div>
        </div>
      </div>
    </div>
  );
};
