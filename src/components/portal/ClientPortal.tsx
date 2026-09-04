import React, { useState, useEffect } from 'react';
import { usePR } from '../../context/PRContext';
import { api } from '../../lib/api';
import { Client, Campaign, MediaCoverage, Message, ClientReport } from '../../types';
import {
  Briefcase,
  TrendingUp,
  Radio,
  FileText,
  Send,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Shield,
  BarChart3,
  Users,
  Eye,
  AlertCircle
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
  Cell
} from 'recharts';

export const ClientPortal: React.FC = () => {
  const { clients = [], campaigns = [], mediaCoverage = [], currentUser, showToast } = usePR();

  // Active client (defaults to Dr. Alistair Chen / Luminary Health)
  const client: Client = (clients || []).find((c) => c.id === 'cli-1') || (clients || [])[0] || {
    id: 'cli-1',
    name: 'Luminary Health',
    contactPerson: 'Dr. Alistair Chen',
    email: 'a.chen@luminaryhealth.com',
    industry: 'Synthetic Biology & Oncology',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2023-11-15',
    status: 'ACTIVE',
    activeCampaignsCount: 2,
    retainerAmount: '$45,000 / mo',
    assignedDirector: 'Marcus Vance',
    portalAccess: true,
  };

  const clientCampaigns = (campaigns || []).filter((c) => c.clientId === client.id);
  const clientCoverage = (mediaCoverage || []).filter((m) => m.clientId === client.id);

  // Messaging State
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [reports, setReports] = useState<ClientReport[]>([]);

  // Tab navigation inside Client Portal
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'coverage' | 'messages' | 'reports'>('overview');

  useEffect(() => {
    const loadData = async () => {
      try {
        const msgs = await api.getMessages(client.id);
        setMessages(msgs);
        const reps = await api.getReports(client.id);
        setReports(reps);
      } catch (err) {
        console.error('Error loading client portal data:', err);
      }
    };
    loadData();
  }, [client.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    setIsSendingMsg(true);
    try {
      const msg: Partial<Message> = {
        senderId: currentUser?.id || 'usr-client-1',
        senderName: currentUser?.name || client.contactPerson,
        senderRole: 'CLIENT',
        recipientRole: 'PR_TEAM',
        clientId: client.id,
        text: newMessageText.trim(),
      };
      const created = await api.sendMessage(msg);
      setMessages((prev) => [...prev, created]);
      setNewMessageText('');
      showToast('Message Dispatched', `Sent to your lead director ${client.assignedDirector}.`);
    } catch (err) {
      showToast('Error', 'Failed to transmit message.', 'error');
    } finally {
      setIsSendingMsg(false);
    }
  };

  // Chart Demo Data
  const coverageGrowthData = [
    { month: 'Apr', mentions: 12, impressions: 3.4 },
    { month: 'May', mentions: 18, impressions: 5.1 },
    { month: 'Jun', mentions: 29, impressions: 8.9 },
    { month: 'Jul', mentions: 42, impressions: 14.5 },
    { month: 'Aug', mentions: 68, impressions: 22.8 },
  ];

  const sentimentData = [
    { name: 'Positive', value: 92, color: '#10b981' },
    { name: 'Neutral', value: 7, color: '#3b82f6' },
    { name: 'Managed', value: 1, color: '#f59e0b' },
  ];

  return (
    <div id="client-portal" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Portal Header (Dark Blue Accent Component) */}
        <div className="bg-[#07132B] text-white border border-blue-900/40 rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-sm bg-slate-900 border border-blue-800/60 overflow-hidden flex items-center justify-center p-1">
              <img
                src={client.logo}
                alt={client.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                  {client.name} Executive PR Portal
                </h1>
                <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-blue-600/30 text-blue-300 border border-blue-400/40">
                  {client.status} ACCOUNT
                </span>
              </div>
              <div className="text-xs text-white/70 mt-1 flex flex-wrap items-center gap-4 font-light">
                <span>Executive Contact: <strong className="text-white font-medium">{client.contactPerson}</strong></span>
                <span>•</span>
                <span>Assigned PR Director: <strong className="text-blue-400 font-medium">{client.assignedDirector}</strong></span>
                <span>•</span>
                <span>Retainer: <strong className="text-white font-medium">{client.retainerAmount}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                showToast('Coverage Dossier Generated', 'Exporting Q3 Media Impact Report (PDF)...');
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Coverage Dossier</span>
            </button>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#07132B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Executive Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
              activeTab === 'campaigns'
                ? 'bg-[#07132B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Active Campaigns ({clientCampaigns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coverage')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
              activeTab === 'coverage'
                ? 'bg-[#07132B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Earned Media Coverage ({clientCoverage.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'bg-[#07132B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>War Room Channel ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
              activeTab === 'reports'
                ? 'bg-[#07132B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Performance Reports</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-1 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total Media Mentions</div>
                <div className="text-3xl font-light text-slate-900 tracking-tight">68</div>
                <div className="text-[11px] text-blue-600 flex items-center gap-1 mt-1 font-light">
                  <TrendingUp className="w-3 h-3" />
                  <span>+62% vs previous quarter</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-1 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Audience Circulation</div>
                <div className="text-3xl font-light text-slate-900 tracking-tight">22.8M</div>
                <div className="text-[11px] text-blue-600 flex items-center gap-1 mt-1 font-light">
                  <span>Verified Readers / Viewers</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-1 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Sentiment Quality Index</div>
                <div className="text-3xl font-light text-blue-600 tracking-tight">98.4%</div>
                <div className="text-[11px] text-slate-500 mt-1 font-light">
                  <span>Positive/High Conviction</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-1 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Next Major Milestone</div>
                <div className="text-base font-medium text-slate-900 truncate">Bloomberg TV Live Spot</div>
                <div className="text-[11px] text-slate-500 mt-1 font-light">
                  <span>Tomorrow at 2:15 PM ET</span>
                </div>
              </div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Coverage Chart */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-sm p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-light text-slate-900 tracking-tight">Media Traction & Reader Circulation</h3>
                    <p className="text-xs text-slate-500 font-light">Verified tier-1 earned coverage cadence over time</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
                    Circulation (M)
                  </span>
                </div>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={coverageGrowthData}>
                      <defs>
                        <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#07132B',
                          borderColor: 'rgba(255,255,255,0.15)',
                          borderRadius: '2px',
                          fontSize: '12px',
                          color: '#fff'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="impressions"
                        stroke="#2563eb"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorReach)"
                        name="Estimated Reach (M)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sentiment Breakdown */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-sm p-6 space-y-4 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-base font-light text-slate-900 tracking-tight">Sentiment Distribution</h3>
                  <p className="text-xs text-slate-500 font-light">Editorial tone across 68 articles</p>
                </div>

                <div className="h-48 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#07132B',
                          borderColor: 'rgba(255,255,255,0.15)',
                          borderRadius: '2px',
                          fontSize: '12px',
                          color: '#fff'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t border-slate-200">
                  <div>
                    <div className="font-bold text-emerald-600">92%</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Positive</div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-600">7%</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Neutral</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-600">1%</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Managed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Earned Media Table */}
            <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-light text-slate-900 tracking-tight">Latest Tier-1 Media Placements</h3>
                <button
                  onClick={() => setActiveTab('coverage')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wider"
                >
                  View All ({clientCoverage.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <th className="pb-3">Media Outlet</th>
                      <th className="pb-3">Headline</th>
                      <th className="pb-3">Placement Date</th>
                      <th className="pb-3">Audience Reach</th>
                      <th className="pb-3">Sentiment</th>
                      <th className="pb-3 text-right">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(clientCoverage || []).slice(0, 4).map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-3.5 font-medium text-slate-900 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span>{c.outletName}</span>
                        </td>
                        <td className="py-3.5 text-slate-700 max-w-xs truncate font-light">{c.articleTitle}</td>
                        <td className="py-3.5 text-slate-500 font-light">{c.date}</td>
                        <td className="py-3.5 text-blue-600 font-medium">{c.reach}</td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                            {c.sentiment}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[11px]"
                          >
                            <span>Read</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Campaigns */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {clientCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-light text-slate-900 tracking-tight">{camp.title}</h2>
                      <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                        {camp.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl font-light">{camp.objective}</p>
                  </div>

                  <div className="text-right text-xs text-slate-500 font-light">
                    <div>Timeline: {camp.startDate} to {camp.endDate}</div>
                    <div className="text-slate-900 font-medium mt-0.5">Budget Allocated: {camp.budget}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 uppercase tracking-wider font-bold text-[10px]">Campaign Execution Progress</span>
                    <span className="text-blue-600 font-bold">{camp.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${camp.progress}%` }}
                    />
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-5 rounded-sm border border-slate-200 space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Campaign Highlights</div>
                    <ul className="space-y-2 text-xs text-slate-700 font-light">
                      {camp.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-sm border border-slate-200 space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Verified Impact Metrics</div>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                      <div>
                        <div className="text-slate-500 font-light">Tier-1 Mentions</div>
                        <div className="text-base font-light text-slate-900">{camp.metrics.mentions}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 font-light">Audience Reach</div>
                        <div className="text-base font-light text-blue-600">{camp.metrics.reach}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 font-light">Pipeline Inbound</div>
                        <div className="text-base font-light text-slate-900">{camp.metrics.trafficIncrease}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 font-light">Sentiment Score</div>
                        <div className="text-base font-light text-blue-600">{camp.metrics.sentimentPercent}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Coverage */}
        {activeTab === 'coverage' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
              <h3 className="text-base font-light text-slate-900 tracking-tight mb-4">Complete Earned Media Ledger</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <th className="pb-3">Outlet</th>
                      <th className="pb-3">Article Title</th>
                      <th className="pb-3">Author / Reporter</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Audience Reach</th>
                      <th className="pb-3">Sentiment</th>
                      <th className="pb-3 text-right">View Article</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {clientCoverage.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-3.5 font-medium text-slate-900">{c.outletName}</td>
                        <td className="py-3.5 text-slate-700 font-light">{c.articleTitle}</td>
                        <td className="py-3.5 text-slate-500 font-light">{c.author}</td>
                        <td className="py-3.5 text-slate-500 font-light">{c.date}</td>
                        <td className="py-3.5 text-blue-600 font-medium">{c.reach}</td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                            {c.sentiment}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-sm inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
                          >
                            <span>Open URL</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Messages / War Room Channel */}
        {activeTab === 'messages' && (
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col h-[550px] animate-in fade-in duration-200 shadow-sm">
            <div className="bg-[#07132B] text-white p-4 border-b border-blue-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">Direct Communications Wire</div>
                  <div className="text-[11px] text-white/70 font-light">Connecting to {client.assignedDirector} (PR Lead)</div>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-blue-300 font-bold">256-bit Encrypted Channel</span>
            </div>

            {/* Message History */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              {messages.map((m) => {
                const isClient = m.senderRole === 'CLIENT';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-2">
                      <span className="font-bold text-slate-700">{m.senderName}</span>
                      <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div
                      className={`max-w-md p-4 rounded-sm text-xs leading-relaxed font-light ${
                        isClient
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Type urgent directive, quote approval, or broadcast briefing query..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-sm px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-light"
              />
              <button
                type="submit"
                disabled={isSendingMsg || !newMessageText.trim()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 5: Reports */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-[10px]">{rep.period}</span>
                    <span>{rep.generatedDate}</span>
                  </div>
                  <h3 className="text-base font-light text-slate-900 tracking-tight">{rep.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">{rep.executiveSummary}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{rep.fileSize} • PDF</span>
                  <button
                    onClick={() => showToast('Report Downloaded', `${rep.title} saved to local device.`)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Dossier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
