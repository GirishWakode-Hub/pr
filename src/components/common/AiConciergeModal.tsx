import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Compass,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Search,
  Building2,
  Newspaper,
  ShieldCheck,
  TrendingUp,
  FileText,
  Lock,
  Calendar,
  Radio,
  RefreshCw,
  Layers,
  ChevronRight,
  Sliders,
  CheckCircle2,
  CornerDownLeft,
  Flame,
  HelpCircle,
  Maximize2,
  Minimize2,
  Zap,
  Mic2,
  Award,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Wand2
} from 'lucide-react';
import { usePR, PageRoute } from '../../context/PRContext';
import { api } from '../../lib/api';
import { ConciergeMessage, ConciergeAction, IntelligenceMode } from '../../types';
import { AiModLogo } from './AiModLogo';

interface FeatureCard {
  id: string;
  category: string;
  title: string;
  description: string;
  badge?: string;
  route?: PageRoute;
  actionType?: 'NAVIGATE' | 'MODAL' | 'TOOL';
  modalTarget?: 'consultation' | 'search' | 'audit';
  highlights: string[];
}

const PLATFORM_FEATURES: FeatureCard[] = [
  {
    id: 'feat-services',
    category: 'Core Capabilities',
    title: 'PR Services & Strategic Disciplines',
    description: '6 bespoke PR practices including Tier-1 Bureau Relations, Crisis & Litigation PR, Executive Thought Leadership, Financial PR / IPO Communications, Public Policy, and Digital Narrative Engineering.',
    badge: '6 Disciplines',
    route: 'services',
    highlights: ['The Economic Times & Mint bureau desks', '15-min crisis response protocols', 'DRHP & IPO narrative frameworks']
  },
  {
    id: 'feat-work',
    category: 'Client Track Record',
    title: 'Case Studies & Measurable Impact',
    description: 'Comprehensive impact dossiers showcasing how GSRelation positioned India’s top deeptech, spacetech, oncology, and fintech pioneers to secure ₹4,800+ Cr in earned valuation.',
    badge: 'Validated ROI',
    route: 'work',
    highlights: ['BharatQuantum Series B', 'Niramaya AIIMS clinical trials', 'VyomSpace IN-SPACe authorization']
  },
  {
    id: 'feat-radar',
    category: 'Real-Time Intelligence',
    title: 'Live Media Mention Radar (Google Search Grounded)',
    description: 'Real-time media monitoring engine using Google Search grounding to track client brand pickups, editorial mentions, sentiment polarity, and Tier-1 coverage across Indian and global newsrooms.',
    badge: 'Google Search Tool',
    route: 'insights',
    highlights: ['Real-time web search grounding', 'Multi-brand client roster filtering', 'Tier-1 citations & 45s auto-sync']
  },
  {
    id: 'feat-portal',
    category: 'Client Collaboration',
    title: 'Enterprise Client Portal',
    description: 'Confidential workspace for marketing heads and founders to review embargoed press release drafts, track active pitch outreach, configure media alerts, and chat live with their dedicated GSRelation PR Lead.',
    badge: 'Client Only',
    route: 'client-portal',
    highlights: ['Embargo draft review & 1-click approvals', 'Live pitching pipeline tracking', 'Direct account lead chat']
  },
  {
    id: 'feat-admin-studio',
    category: 'Agency Command Center',
    title: 'Admin AI PR Studio & Agency Operations',
    description: 'Full-stack agency management console featuring 5 specialized generative AI engines: Press Release Drafter, Headline Angle Suite, Journalist Pitch Crafter, Social Media Thread Writer, and Crisis Response Holding Statements.',
    badge: 'Admin & AI Studio',
    route: 'admin' as PageRoute,
    highlights: ['5 generative AI PR engines', 'Client CRM & campaign management', 'Audit logs & database reset']
  },
  {
    id: 'feat-newsroom',
    category: 'Media Distribution',
    title: 'Official Newsroom & Media Gallery',
    description: 'Syndicated wire press releases, downloadable electronic press kits (EPKs), high-resolution executive headshots, and media b-roll photography.',
    badge: 'Public & Press',
    route: 'newsroom',
    highlights: ['Official press statements', 'Downloadable brand assets & photography', 'Journalist accreditation desk']
  },
  {
    id: 'feat-reports',
    category: 'Executive Intelligence',
    title: 'Reports & Analytics Dashboard',
    description: 'C-suite intelligence reports detailing Earned Media Value (EMV), Share of Voice (SOV), media tier breakdown, and downloadable quarterly dossiers.',
    badge: 'Data & Metrics',
    route: 'reports-analytics',
    highlights: ['₹4.8K Cr cumulative EMV tracking', 'Sentiment polarity breakdown', 'Exportable PDF dossiers']
  },
  {
    id: 'feat-consultation',
    category: 'Client Onboarding',
    title: 'Confidential PR Audit Booking',
    description: 'Instant scheduling for a 45-minute confidential PR audit with Managing Partners Elena Rostova or Rajiv Menon to review positioning and retainer scopes.',
    badge: 'Instant Booking',
    actionType: 'MODAL',
    modalTarget: 'consultation',
    highlights: ['45-min strategic diagnostic', 'Retainer scoping (₹4.5L - ₹12L/mo)', 'Crisis preparedness assessment']
  },
  {
    id: 'feat-search',
    category: 'Global Navigation',
    title: 'Global Intelligence Search',
    description: 'Full-text indexed search across all clients, press releases, case studies, insights, and media assets with quick shortcut keys (Cmd+K).',
    badge: 'Cmd + K',
    actionType: 'MODAL',
    modalTarget: 'search',
    highlights: ['Instant keyword indexing', 'Direct deep-link jumps', 'Category-filtered results']
  }
];

const SUGGESTED_BY_MODE: Record<IntelligenceMode, string[]> = {
  gemini_fast: [
    'What are all the features of this platform?',
    'How does the Live Media Mention Radar work?',
    'How do clients review embargoed releases in the Portal?',
    'What generative engines exist in the Admin AI PR Studio?',
    'Run a 1-click PR Readiness Audit for our startup'
  ],
  chatgpt_reasoning: [
    'Structure a 30-day Tier-1 media campaign for our Series A',
    'Synthesize a crisis containment framework for an executive exit',
    'Evaluate DRHP pre-IPO media blackout and SEBI LODR rules',
    'Develop a 4-pillar narrative wedge against global incumbents'
  ],
  journalist_drill: [
    'Grill me on why our product deserves an ET front-page exclusive',
    'Test my response to questions about our burn rate & unit economics',
    'Interrogate our clinical trial claims like a medical editor',
    'Probe our defense against established Indian conglomerate competitors'
  ]
};

export const AiConciergeModal: React.FC = () => {
  const {
    isConciergeOpen,
    setIsConciergeOpen,
    currentPage,
    navigateTo,
    setIsConsultationModalOpen,
    setIsSearchOpen,
    currentRole,
    currentUser
  } = usePR();

  const [activeTab, setActiveTab] = useState<'chat' | 'features' | 'tools'>('chat');
  const [intelligenceMode, setIntelligenceMode] = useState<IntelligenceMode>('gemini_fast');
  const [featureSearch, setFeatureSearch] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Record<string, 'up' | 'down'>>({});

  // Tool 1: Quick PR Audit State
  const [auditStage, setAuditStage] = useState('Series A / B');
  const [auditDomain, setAuditDomain] = useState('DeepTech / AI');
  const [auditTraction, setAuditTraction] = useState('₹10Cr+ ARR');
  const [auditSpokesperson, setAuditSpokesperson] = useState('Yes, Trained CXO');

  // Tool 2: Pitch Hook Crafter State
  const [pitchCompany, setPitchCompany] = useState('');
  const [pitchAngle, setPitchAngle] = useState('Milestone Capital Infusion');

  const [messages, setMessages] = useState<ConciergeMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      mode: 'gemini_fast',
      content: `Hello! I am your specialized **AI PR Moderator & Strategic Concierge** for GSRelation.

I am uniquely trained on Indian and global communications architecture, with dual intelligence engines:
• ⚡ **Gemini Fast Grounded**: Instant navigation, real-time Google Search grounding, and site feature explanations.
• 🧠 **Strategic Reasoning (ChatGPT / Deep Council)**: Multi-phase narrative architecture, SEBI LODR risk triage, and C-suite war-room advisory.
• 🎙️ **Bureau Chief Drill**: Skeptical, investigative journalist interview simulator to pressure-test your pitches before facing the press.

**Select an intelligence mode from the top bar, click any prompt below, or run an interactive PR diagnostic!**`,
      actions: [
        { label: 'Explore PR Services', actionType: 'NAVIGATE', target: 'services' },
        { label: 'Live Media Radar', actionType: 'NAVIGATE', target: 'insights' },
        { label: 'Run PR Readiness Audit', actionType: 'TOOL', target: 'audit' },
        { label: 'Book 45-Min PR Audit', actionType: 'MODAL', target: 'consultation' }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isConciergeOpen && activeTab === 'chat') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isConciergeOpen, activeTab]);

  // Handle send message
  const handleSendMessage = async (textToSend?: string, overrideMode?: IntelligenceMode) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const modeToUse = overrideMode || intelligenceMode;

    const userMsg: ConciergeMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await api.chatWithConcierge({
        messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
        message: query,
        currentRoute: currentPage,
        mode: modeToUse,
        clientContext: {
          role: currentRole,
          userName: currentUser?.name,
          userEmail: currentUser?.email,
          clientId: currentUser?.clientId
        }
      });

      if (response && response.reply) {
        const assistantMsg: ConciergeMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.reply,
          mode: modeToUse,
          scoreCard: response.scoreCard,
          actions: response.actions || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('Empty response received');
      }
    } catch (err) {
      console.error('Failed to communicate with Concierge:', err);
      const fallbackMsg: ConciergeMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        mode: modeToUse,
        content: `I am actively monitoring your strategic advisory query under **${
          modeToUse === 'chatgpt_reasoning'
            ? 'Deep Strategic Reasoning'
            : modeToUse === 'journalist_drill'
            ? 'Investigative Journalist Simulator'
            : 'Gemini Fast Grounded'
        }** mode. You can explore our **PR Services**, browse **Case Studies**, inspect the **Live Media Mention Radar**, or access the **Client Portal**.`,
        actions: [
          { label: 'Explore PR Services', actionType: 'NAVIGATE', target: 'services' },
          { label: 'Case Studies', actionType: 'NAVIGATE', target: 'work' },
          { label: 'Live Media Radar', actionType: 'NAVIGATE', target: 'insights' },
          { label: 'Run PR Readiness Audit', actionType: 'TOOL', target: 'audit' },
          { label: 'Book Consultation', actionType: 'MODAL', target: 'consultation' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle action pill clicks
  const handleActionClick = (action: ConciergeAction) => {
    if (action.actionType === 'NAVIGATE') {
      navigateTo(action.target as PageRoute);
      setIsConciergeOpen(false);
    } else if (action.actionType === 'MODAL') {
      if (action.target === 'consultation') {
        setIsConsultationModalOpen(true);
      } else if (action.target === 'search') {
        setIsSearchOpen(true);
      }
      setIsConciergeOpen(false);
    } else if (action.actionType === 'TOOL') {
      setActiveTab('tools');
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleRateMessage = (id: string, rating: 'up' | 'down') => {
    setFeedbacks((prev) => ({ ...prev, [id]: rating }));
  };

  const handleRunAuditTool = () => {
    const prompt = `Please run a comprehensive PR Readiness & Tier-1 Media Audit for a company with the following profile:
- Funding Stage: ${auditStage}
- Industry Domain: ${auditDomain}
- Verified Traction: ${auditTraction}
- Executive Spokesperson Readiness: ${auditSpokesperson}

Provide a numerical PR Readiness Score, strategic Tier-1 editorial target list (ET, Mint, BS, Reuters), wire distribution roadmap (PTI/IANS), and regulatory/SEBI compliance check.`;
    setActiveTab('chat');
    handleSendMessage(prompt, 'chatgpt_reasoning');
  };

  const handleRunPitchTool = () => {
    const target = pitchCompany.trim() || 'Our Enterprise Venture';
    const prompt = `Generate a high-converting, 150-word exclusive pitch email to a Senior Bureau Chief at The Economic Times or Mint for "${target}" announcing "${pitchAngle}". Include a compelling hook tied to India's macroeconomic growth, bulleted evidence pegs, and 3 hard-hitting interview angles.`;
    setActiveTab('chat');
    handleSendMessage(prompt, 'gemini_fast');
  };

  const handleFeatureNavigate = (feature: FeatureCard) => {
    if (feature.actionType === 'MODAL') {
      if (feature.modalTarget === 'consultation') {
        setIsConsultationModalOpen(true);
      } else if (feature.modalTarget === 'search') {
        setIsSearchOpen(true);
      }
    } else if (feature.route) {
      navigateTo(feature.route);
    }
    setIsConciergeOpen(false);
  };

  const filteredFeatures = PLATFORM_FEATURES.filter((f) => {
    const q = featureSearch.toLowerCase();
    return (
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.highlights.some((h) => h.toLowerCase().includes(q))
    );
  });

  return (
    <>
      {/* Floating Launcher Button */}
      {!isConciergeOpen && (
        <aside
          id="ai-concierge-launcher"
          aria-label="AI PR Assistant & Guide"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 group"
        >
          <div className="hidden sm:flex flex-col items-end pointer-events-none transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 opacity-90 group-hover:opacity-100">
            <span className="bg-[#07132B] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-700/80 flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Strategic Concierge & Guide
            </span>
          </div>

          <button
            onClick={() => setIsConciergeOpen(true)}
            className="w-14 h-14 bg-gradient-to-tr from-[#07132B] via-blue-950 to-indigo-900 hover:from-blue-900 hover:to-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-blue-400/40 hover:border-blue-300 relative group/btn"
            title="Open AI Strategic Concierge & Diagnostic Lab"
            aria-label="Open AI Strategic Concierge and Platform Feature Guide"
          >
            <AiModLogo size="sm" variant="floating" glow={true} animated={true} />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-[#07132B]"></span>
            </span>
          </button>
        </aside>
      )}

      {/* Main Slide-up / Centered Modal */}
      {isConciergeOpen && (
        <div
          id="ai-concierge-modal-overlay"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsConciergeOpen(false);
          }}
        >
          <div
            id="ai-concierge-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="concierge-heading"
            className={`bg-white w-full ${
              isExpanded
                ? 'sm:max-w-5xl sm:h-[90vh]'
                : 'sm:max-w-3xl sm:h-[760px]'
            } h-[94vh] rounded-t-2xl sm:rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-6 duration-200 transition-all`}
          >
            {/* Top Header */}
            <div className="bg-[#07132B] text-white p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between shrink-0 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-600/20 via-blue-600/10 to-transparent pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                <AiModLogo size="lg" variant="badge" glow={true} animated={true} className="border-blue-400/50 bg-[#07132B]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="concierge-heading" className="text-base sm:text-lg font-light tracking-tight text-white flex items-center gap-1.5">
                      <span>AI PR Strategic Concierge</span>
                      <span className="font-serif italic text-blue-400">& War-Room</span>
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Trained Dual-Core
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-light line-clamp-1">
                    Gemini 2.5 Flash Grounded + ChatGPT-Style Strategic Council & Hardball Journalist Simulator
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:flex p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                  title={isExpanded ? 'Collapse' : 'Expand window'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  id="close-concierge-btn"
                  onClick={() => setIsConciergeOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                  title="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Intelligence Engine Selector Bar */}
            <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0 text-white">
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <span>Intelligence Mode:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIntelligenceMode('gemini_fast')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                    intelligenceMode === 'gemini_fast'
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Fast real-time responses, web navigation, Google Search grounded media monitoring"
                >
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Gemini Grounded</span>
                </button>

                <button
                  onClick={() => setIntelligenceMode('chatgpt_reasoning')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                    intelligenceMode === 'chatgpt_reasoning'
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Deep multi-step reasoning, SEBI LODR risk triage, narrative architecture"
                >
                  <Sparkles className="w-3 h-3 text-indigo-300" />
                  <span>Strategic Council (GPT-4 Style)</span>
                </button>

                <button
                  onClick={() => setIntelligenceMode('journalist_drill')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                    intelligenceMode === 'journalist_drill'
                      ? 'bg-rose-700 text-white shadow-xs font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Test your pitch against a skeptical Economic Times / Mint Bureau Chief"
                >
                  <Mic2 className="w-3 h-3 text-rose-300" />
                  <span>Journalist Drill</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-4 flex items-center justify-between shrink-0 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-3 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === 'chat'
                      ? 'border-blue-600 text-blue-700 bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Strategic Chat</span>
                </button>

                <button
                  onClick={() => setActiveTab('tools')}
                  className={`px-3 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === 'tools'
                      ? 'border-blue-600 text-blue-700 bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>PR Diagnostic Lab</span>
                  <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-700 text-[10px] rounded-full font-bold">
                    Special
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('features')}
                  className={`px-3 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === 'features'
                      ? 'border-blue-600 text-blue-700 bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Platform Guide ({PLATFORM_FEATURES.length})</span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500">
                <span>Current Section:</span>
                <span className="font-mono px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-semibold uppercase text-[10px]">
                  {currentPage}
                </span>
              </div>
            </div>

            {/* Tab 1: Interactive Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="relative shrink-0 mt-1">
                          <AiModLogo size="sm" variant="avatar" />
                          <span
                            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#07132B] ${
                              msg.mode === 'chatgpt_reasoning'
                                ? 'bg-indigo-500'
                                : msg.mode === 'journalist_drill'
                                ? 'bg-rose-500'
                                : 'bg-emerald-400'
                            }`}
                            title={msg.mode || 'AI'}
                          />
                        </div>
                      )}

                      <div
                        className={`max-w-[90%] sm:max-w-[82%] rounded-lg p-4 text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-[#07132B] text-white rounded-br-none shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                        }`}
                      >
                        {/* Mode Badge for Assistant */}
                        {msg.role === 'assistant' && msg.mode && (
                          <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              {msg.mode === 'chatgpt_reasoning' ? (
                                <>
                                  <Sparkles className="w-3 h-3 text-indigo-600" />
                                  <span className="text-indigo-700 font-semibold">Strategic Council (GPT-4 Style)</span>
                                </>
                              ) : msg.mode === 'journalist_drill' ? (
                                <>
                                  <Mic2 className="w-3 h-3 text-rose-600" />
                                  <span className="text-rose-700 font-semibold">Bureau Chief Simulation</span>
                                </>
                              ) : (
                                <>
                                  <Zap className="w-3 h-3 text-amber-600" />
                                  <span className="text-blue-700 font-semibold">Gemini Grounded Intelligence</span>
                                </>
                              )}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleCopyMessage(msg.id, msg.content)}
                                className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                                title="Copy to clipboard"
                              >
                                {copiedMsgId === msg.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => handleRateMessage(msg.id, 'up')}
                                className={`p-1 rounded transition-colors ${
                                  feedbacks[msg.id] === 'up'
                                    ? 'text-emerald-600'
                                    : 'text-slate-400 hover:text-slate-700'
                                }`}
                                title="Helpful"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleRateMessage(msg.id, 'down')}
                                className={`p-1 rounded transition-colors ${
                                  feedbacks[msg.id] === 'down'
                                    ? 'text-rose-600'
                                    : 'text-slate-400 hover:text-slate-700'
                                }`}
                                title="Needs refinement"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Interactive Scorecard Widget if present */}
                        {msg.scoreCard && (
                          <div className="mb-3 p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-700" />
                                <span className="font-bold text-xs uppercase tracking-wider text-blue-900">
                                  PR Readiness Assessment
                                </span>
                              </div>
                              <span className="px-2 py-0.5 bg-blue-600 text-white font-mono text-[11px] font-bold rounded">
                                {msg.scoreCard.score}/100 • {msg.scoreCard.grade}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-blue-200/60">
                              {msg.scoreCard.metrics.map((m, idx) => (
                                <div key={idx} className="bg-white/80 p-1.5 rounded border border-blue-100 text-[11px]">
                                  <span className="text-slate-500 block text-[10px]">{m.label}</span>
                                  <span className="font-semibold text-slate-800">{m.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Text Content */}
                        <div className="whitespace-pre-wrap space-y-2 font-normal">
                          {msg.content.split('\n').map((line, idx) => {
                            if (line.startsWith('### ')) {
                              return (
                                <h4 key={idx} className="font-semibold text-slate-950 text-sm sm:text-base mt-2 mb-1">
                                  {line.replace('### ', '')}
                                </h4>
                              );
                            }
                            if (line.startsWith('• ')) {
                              return (
                                <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
                                  <span className="text-blue-600 font-bold">•</span>
                                  <span>{line.replace('• ', '')}</span>
                                </div>
                              );
                            }
                            return (
                              <p key={idx} className={line.trim() === '' ? 'h-1' : ''}>
                                {line}
                              </p>
                            );
                          })}
                        </div>

                        {/* Interactive Action Buttons */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                            {msg.actions.map((act, aIdx) => (
                              <button
                                key={aIdx}
                                onClick={() => handleActionClick(act)}
                                className={`px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-2xs hover:scale-102 active:scale-98 ${
                                  act.actionType === 'TOOL'
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                                }`}
                              >
                                {act.actionType === 'TOOL' && <Wand2 className="w-3 h-3 text-indigo-200" />}
                                <span>{act.label}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ))}
                          </div>
                        )}

                        <div
                          className={`text-[10px] mt-2 font-mono flex items-center justify-end ${
                            msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>

                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs font-semibold text-xs">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex gap-3 justify-start items-center text-xs text-slate-500">
                      <AiModLogo size="sm" variant="avatar" animated={true} />
                      <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-2 shadow-xs">
                        <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                        <span className="font-medium text-slate-600">
                          {intelligenceMode === 'chatgpt_reasoning'
                            ? 'Synthesizing multi-phase strategic war-room advisory...'
                            : intelligenceMode === 'journalist_drill'
                            ? 'Investigative bureau chief formulating hardball inquiries...'
                            : 'AI Moderator analyzing query & grounding against Indian business press...'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Quick Prompt Chips (Dynamic per Mode) */}
                <div className="px-4 py-2.5 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>Mode Hooks:</span>
                  </span>
                  {SUGGESTED_BY_MODE[intelligenceMode].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      disabled={isLoading}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-full text-[11px] text-slate-700 font-medium whitespace-nowrap transition-colors disabled:opacity-50 shrink-0"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      ref={inputRef}
                      id="ai-concierge-user-input"
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={
                        intelligenceMode === 'journalist_drill'
                          ? 'Pitch your announcement or defense to the Bureau Chief...'
                          : intelligenceMode === 'chatgpt_reasoning'
                          ? 'Ask for deep C-suite PR advisory, crisis mitigation, or narrative design...'
                          : 'Ask about any feature of this website or chat about client PR strategy...'
                      }
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isLoading}
                      className="px-4 py-2.5 bg-[#07132B] hover:bg-blue-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                      aria-label="Send message to AI Moderator"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </form>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
                    <span>
                      Mode: <strong className="text-slate-700">{intelligenceMode.toUpperCase()}</strong> • Powered by Gemini 2.5 Flash & PR Strategic Corpus
                    </span>
                    <button
                      onClick={() =>
                        setMessages([
                          {
                            id: 'reset-1',
                            role: 'assistant',
                            mode: intelligenceMode,
                            content: `Conversation reset. How can I assist your communications mandate today?`,
                            actions: [
                              { label: 'Explore PR Services', actionType: 'NAVIGATE', target: 'services' },
                              { label: 'Live Media Radar', actionType: 'NAVIGATE', target: 'insights' },
                              { label: 'PR Readiness Audit', actionType: 'TOOL', target: 'audit' }
                            ],
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          }
                        ])
                      }
                      className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Clear History
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: PR Diagnostic Lab (Interactive Tools) */}
            {activeTab === 'tools' && (
              <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 bg-slate-50/70 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Wand2 className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-base font-semibold text-slate-900">
                      Interactive PR War-Room Diagnostic Lab
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">
                    Run specialized PR calculators and prompt synthesizers built directly into the concierge.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Tool 1: 1-Click PR Readiness Audit */}
                  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          Interactive Diagnostic
                        </span>
                        <Award className="w-4 h-4 text-slate-400" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          1-Click PR Readiness & Tier-1 Audit
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Calculates your editorial viability for *The Economic Times, Mint, Business Standard*, and PTI national wire.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                            Funding / Venture Stage
                          </label>
                          <select
                            value={auditStage}
                            onChange={(e) => setAuditStage(e.target.value)}
                            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:border-indigo-500 focus:outline-none"
                          >
                            <option value="Seed / Pre-Series A">Seed / Pre-Series A ($1M - $3M)</option>
                            <option value="Series A / B">Series A / B ($5M - $25M)</option>
                            <option value="Growth Stage / Pre-IPO">Growth Stage / Pre-IPO ($50M+)</option>
                            <option value="Bootstrapped / Profitable">Bootstrapped / High ARR</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                            Core Domain
                          </label>
                          <select
                            value={auditDomain}
                            onChange={(e) => setAuditDomain(e.target.value)}
                            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:border-indigo-500 focus:outline-none"
                          >
                            <option value="DeepTech / AI">DeepTech / AI Infrastructure</option>
                            <option value="FinTech / Payments">FinTech & Cross-Border UPI</option>
                            <option value="HealthTech / Oncology">HealthTech & Clinical Diagnostics</option>
                            <option value="SpaceTech / Defense">SpaceTech & Defense Aeronautics</option>
                            <option value="Enterprise SaaS">Enterprise SaaS & B2B</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                            Current Verified Traction
                          </label>
                          <select
                            value={auditTraction}
                            onChange={(e) => setAuditTraction(e.target.value)}
                            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:border-indigo-500 focus:outline-none"
                          >
                            <option value="₹1Cr - ₹5Cr ARR">₹1Cr - ₹5Cr ARR</option>
                            <option value="₹10Cr+ ARR">₹10Cr+ ARR (High Growth)</option>
                            <option value="Pilot Validations / Clinical Proof">Peer-Reviewed / Clinical Proof</option>
                            <option value="Pre-Revenue with Deep IP">Pre-Revenue with Breakthrough Patents</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <button
                        onClick={handleRunAuditTool}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>Run Full PR Readiness Audit</span>
                      </button>
                    </div>
                  </div>

                  {/* Tool 2: Instant Tier-1 Pitch Angle Crafter */}
                  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Pitch Engineering
                        </span>
                        <Send className="w-4 h-4 text-slate-400" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Tier-1 Journalist Pitch Crafter
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Crafts an authentic, 150-word exclusive interview pitch for an Indian national bureau chief.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                            Company or Product Name
                          </label>
                          <input
                            type="text"
                            value={pitchCompany}
                            onChange={(e) => setPitchCompany(e.target.value)}
                            placeholder="e.g. BharatQuantum or Kaveri FinTech"
                            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                            Announcement Angle
                          </label>
                          <select
                            value={pitchAngle}
                            onChange={(e) => setPitchAngle(e.target.value)}
                            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:border-blue-500 focus:outline-none"
                          >
                            <option value="Milestone Capital Infusion">Milestone Series A/B Capital Infusion</option>
                            <option value="Breakthrough Technology Milestone">Breakthrough Technology Milestone</option>
                            <option value="Strategic Government / Cross-Border Partnership">Make in India / Cross-Border Pact</option>
                            <option value="C-Suite Executive Leadership Addition">Tier-1 CXO / Leadership Addition</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <button
                        onClick={handleRunPitchTool}
                        className="w-full py-2 bg-[#07132B] hover:bg-blue-700 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Generate Bureau Pitch Hook</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tool 3: Emergency Crisis Holding Statement */}
                <div className="bg-white border border-rose-200 rounded-lg p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose-600" />
                      <h4 className="text-sm font-bold text-slate-900">
                        15-Minute Crisis Holding Statement Simulator
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-bold rounded border border-rose-200">
                      Rapid Response
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    Need immediate narrative containment for a sensitive leak, regulatory notice, or unexpected issue?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Draft a 15-minute holding statement for a customer data security notice',
                      'Formulate a spokesperson bridge-and-pivot statement for sudden CEO departure',
                      'Develop a SEBI LODR Regulation 30 price-sensitive inquiry response'
                    ].map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => {
                          setActiveTab('chat');
                          handleSendMessage(prompt, 'chatgpt_reasoning');
                        }}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded text-xs font-medium transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Visual Feature Guide Directory */}
            {activeTab === 'features' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
                {/* Search Bar for Features */}
                <div className="p-4 bg-white border-b border-slate-200 shrink-0">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={featureSearch}
                      onChange={(e) => setFeatureSearch(e.target.value)}
                      placeholder="Search features (e.g. Media Radar, Client Portal, AI PR Studio, Services)..."
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                    {featureSearch && (
                      <button
                        onClick={() => setFeatureSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredFeatures.map((feat) => (
                      <div
                        key={feat.id}
                        className="bg-white border border-slate-200 hover:border-blue-400 rounded-lg p-5 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {feat.category}
                            </span>
                            {feat.badge && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200">
                                {feat.badge}
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-semibold text-[#07132B] group-hover:text-blue-600 transition-colors">
                            {feat.title}
                          </h4>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            {feat.description}
                          </p>

                          {/* Highlights */}
                          <div className="space-y-1 pt-1">
                            {feat.highlights.map((h, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Card Action */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => {
                              handleSendMessage(`Tell me in depth about the "${feat.title}" feature.`);
                              setActiveTab('chat');
                            }}
                            className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium"
                          >
                            <HelpCircle className="w-3 h-3" />
                            <span>Ask AI about this</span>
                          </button>

                          <button
                            onClick={() => handleFeatureNavigate(feat)}
                            className="px-3 py-1.5 bg-[#07132B] hover:bg-blue-600 text-white rounded-sm text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                          >
                            <span>Open Feature</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tip */}
                <div className="p-3 bg-white border-t border-slate-200 text-center text-[11px] text-slate-500">
                  Switch to the <strong className="text-blue-600 cursor-pointer" onClick={() => setActiveTab('chat')}>Chat tab</strong> or <strong className="text-indigo-600 cursor-pointer" onClick={() => setActiveTab('tools')}>PR Diagnostic Lab</strong> to ask detailed questions or stress-test pitches.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
