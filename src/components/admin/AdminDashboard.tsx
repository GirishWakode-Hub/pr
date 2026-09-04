import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Briefcase,
  FileText,
  Radio,
  Sparkles,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Globe,
  ExternalLink,
  Download,
  RotateCcw,
  Search,
  Filter,
  ArrowRight,
  Eye,
  Building,
  Mail,
  Phone,
  BarChart3,
  Check,
  ChevronRight,
  Activity,
  Layers,
  MessageSquare
} from 'lucide-react';
import { usePR } from '../../context/PRContext';
import { api } from '../../lib/api';
import { AdminLoginPage } from './AdminLoginPage';
import { AIPRAssistant } from './AIPRAssistant';
import { Client, PressRelease, MediaCoverage, Consultation, Inquiry } from '../../types';
import { Logo } from '../common/Logo';

export type AdminTab =
  | 'overview'
  | 'clients'
  | 'consultations'
  | 'press-releases'
  | 'media-coverage'
  | 'ai-generator'
  | 'system-logs';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminAuthenticated,
    adminUser,
    logoutAdmin,
    navigateTo,
    clients,
    campaigns,
    pressReleases,
    mediaCoverage,
    showToast,
    refreshData
  } = usePR();

  // If not authenticated, render the high-security login gate
  if (!isAdminAuthenticated) {
    return <AdminLoginPage />;
  }

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [stats, setStats] = useState<any>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Search & Filter State
  const [clientSearch, setClientSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');
  const [pressSearch, setPressSearch] = useState('');

  // Modals
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddPressOpen, setIsAddPressOpen] = useState(false);
  const [isAddCoverageOpen, setIsAddCoverageOpen] = useState(false);

  // New Client Form
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    industry: 'DeepTech & Artificial Intelligence',
    contactPerson: '',
    email: '',
    phone: '+91 ',
    retainerAmount: '₹6,00,000/mo',
    brandSummary: '',
    dedicatedLead: 'Priya Sengupta (Senior Director)',
  });

  // New Press Release Form
  const [newPress, setNewPress] = useState<Partial<PressRelease>>({
    title: '',
    subtitle: '',
    summary: '',
    content: '',
    category: 'CORPORATE',
    featuredImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
  });

  // New Media Hit Form
  const [newCoverage, setNewCoverage] = useState<Partial<MediaCoverage>>({
    headline: '',
    outletName: 'The Economic Times',
    clientName: clients[0]?.name || 'Niramaya BioDiagnostics',
    reach: '3.4M Impressions',
    publicationTier: 'TIER_1',
    sentiment: 'POSITIVE',
    url: 'https://economictimes.indiatimes.com',
  });

  // Fetch Admin-level telemetry
  const loadAdminData = async () => {
    try {
      const [statsData, inqData, conData, logsData] = await Promise.all([
        api.getStats(),
        api.getInquiries(),
        api.getConsultations(),
        api.getActivityLogs(),
      ]);
      setStats(statsData);
      setInquiries(inqData);
      setConsultations(conData);
      setActivityLogs(logsData);
    } catch (err) {
      console.warn('Could not load some admin telemetry:', err);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Handlers
  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.email) {
      showToast('Validation Error', 'Please specify Client Name and Email.', 'warning');
      return;
    }

    try {
      await api.createClient(newClient);
      await refreshData();
      await loadAdminData();
      setIsAddClientOpen(false);
      setNewClient({
        name: '',
        industry: 'DeepTech & Artificial Intelligence',
        contactPerson: '',
        email: '',
        phone: '+91 ',
        retainerAmount: '₹6,00,000/mo',
        brandSummary: '',
        dedicatedLead: 'Priya Sengupta (Senior Director)',
      });
      showToast('Client Onboarded', `Successfully created retainer account for ${newClient.name}.`);
    } catch (err) {
      showToast('Creation Failed', 'Could not onboard client.', 'error');
    }
  };

  const handleDeleteClient = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to archive client account "${name}"?`)) return;
    try {
      await api.deleteClient(id);
      await refreshData();
      await loadAdminData();
      showToast('Client Archived', `Account for ${name} removed from active roster.`);
    } catch (err) {
      showToast('Action Failed', 'Could not archive client.', 'error');
    }
  };

  const handleCreatePressRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPress.title || !newPress.content) {
      showToast('Validation Error', 'Please provide Headline and Content body.', 'warning');
      return;
    }

    try {
      await api.createPressRelease({
        ...newPress,
        mediaContact: {
          name: 'GSRelation India Media Desk',
          email: 'press@gsrelation.in',
          phone: '+91 11 4988 0100',
        },
      });
      await refreshData();
      await loadAdminData();
      setIsAddPressOpen(false);
      setNewPress({
        title: '',
        subtitle: '',
        summary: '',
        content: '',
        category: 'CORPORATE',
        featuredImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      });
      showToast('Wire Dispatched', 'Press release published to the public newsroom.');
    } catch (err) {
      showToast('Dispatch Error', 'Could not publish release.', 'error');
    }
  };

  const handleDeletePressRelease = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove press release "${title}"?`)) return;
    try {
      await api.deletePressRelease(id);
      await refreshData();
      await loadAdminData();
      showToast('Wire Removed', 'Press release deleted from wire archive.');
    } catch (err) {
      showToast('Delete Failed', 'Could not remove press release.', 'error');
    }
  };

  const handleCreateCoverage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoverage.headline || !newCoverage.outletName) {
      showToast('Validation Error', 'Please provide Headline and Publication name.', 'warning');
      return;
    }

    try {
      await api.createMediaCoverage(newCoverage);
      await refreshData();
      await loadAdminData();
      setIsAddCoverageOpen(false);
      setNewCoverage({
        headline: '',
        outletName: 'The Economic Times',
        clientName: clients[0]?.name || 'Niramaya BioDiagnostics',
        reach: '3.4M Impressions',
        publicationTier: 'TIER_1',
        sentiment: 'POSITIVE',
        url: 'https://economictimes.indiatimes.com',
      });
      showToast('Placement Logged', 'Tier-1 media hit added to agency tracker.');
    } catch (err) {
      showToast('Logging Failed', 'Could not log media placement.', 'error');
    }
  };

  const handleUpdateConsultationStatus = async (id: string, status: string) => {
    try {
      await api.updateConsultationStatus(id, status);
      await loadAdminData();
      showToast('Status Updated', `Consultation booking marked as ${status}.`);
    } catch (err) {
      showToast('Update Failed', 'Could not update status.', 'error');
    }
  };

  const handleConvertConsultationToClient = async (con: Consultation) => {
    try {
      await api.createClient({
        name: con.company,
        contactPerson: con.name,
        email: con.email,
        phone: con.phone,
        industry: 'Strategic Enterprise & Growth',
        retainerAmount: '₹5,50,000/mo',
        brandSummary: con.projectDescription,
        sourceConsultationId: con.id,
      });
      await refreshData();
      await loadAdminData();
      showToast('Converted to Retainer Client', `${con.company} is now an active PR retainer account.`);
      setActiveTab('clients');
    } catch (err) {
      showToast('Conversion Error', 'Could not convert consultation.', 'error');
    }
  };

  const handleResetDatabase = async () => {
    if (!confirm('CAUTION: This will reset all clients, inquiries, and press releases back to factory defaults. Continue?')) return;
    try {
      await api.resetDatabase();
      await refreshData();
      await loadAdminData();
      showToast('Database Reset', 'System state reset to fresh Indian PR dataset.');
    } catch (err) {
      showToast('Reset Failed', 'Could not reset database.', 'error');
    }
  };

  return (
    <div id="admin-command-center" className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      {/* Top Super Admin Navigation Header */}
      <header className="bg-[#050B17] text-white border-b border-blue-900/50 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Logo
                size="sm"
                showTagline={false}
                theme="dark"
              />
              <div className="h-5 w-px bg-white/20 hidden sm:block" />
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-blue-600/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest border border-blue-500/40">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Command Center</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Badge */}
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-left">
                <div className="font-semibold text-white leading-none">Gsrelation.admin</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Super Admin • IST</div>
              </div>
            </div>

            {/* Exit to Public Website */}
            <button
              id="admin-nav-exit-site"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
              title="Return to Public Agency Website"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Public Site</span>
            </button>

            {/* Logout Button */}
            <button
              id="admin-nav-logout-btn"
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:text-rose-200 text-xs font-semibold transition-colors"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-white/5 py-1">
          {[
            { id: 'overview', label: 'Command Overview', icon: Activity },
            { id: 'clients', label: `Clients (${clients.length})`, icon: Building },
            { id: 'consultations', label: `Inbound Leads (${consultations.length + inquiries.length})`, icon: MessageSquare },
            { id: 'press-releases', label: `Press Wire (${pressReleases.length})`, icon: FileText },
            { id: 'media-coverage', label: `Media Placements (${mediaCoverage.length})`, icon: Radio },
            { id: 'ai-generator', label: 'AI PR Studio', icon: Sparkles },
            { id: 'system-logs', label: 'System & Backups', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW & COMMAND DASHBOARD */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top KPIs Banner */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Retainers</div>
                <div className="text-2xl font-light text-slate-900 mt-1">{clients.length}</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-0.5">100% Retained</div>
              </div>

              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Campaigns</div>
                <div className="text-2xl font-light text-blue-600 mt-1">{campaigns.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">In Market</div>
              </div>

              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Published Wires</div>
                <div className="text-2xl font-light text-slate-900 mt-1">{pressReleases.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">PTI / Wire Syndicated</div>
              </div>

              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Media Hits</div>
                <div className="text-2xl font-light text-slate-900 mt-1">{mediaCoverage.length}</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-0.5">96.8% Tier-1 Rate</div>
              </div>

              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Earned Media Yield</div>
                <div className="text-2xl font-light text-slate-900 mt-1">₹48.5 Cr</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-0.5">+28% YoY</div>
              </div>

              <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Inbound Leads</div>
                <div className="text-2xl font-light text-amber-600 mt-1">{consultations.length + inquiries.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Awaiting Action</div>
              </div>
            </div>

            {/* Rapid Action Buttons */}
            <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Executive Rapid Actions</h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">Dispatch wires, onboard clients, or run AI communications synthesis</p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsAddClientOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard New Client</span>
                </button>

                <button
                  onClick={() => setIsAddPressOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Press Wire</span>
                </button>

                <button
                  onClick={() => setIsAddCoverageOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors border border-slate-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Media Placement</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai-generator')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch AI PR Studio</span>
                </button>
              </div>
            </div>

            {/* Two Column Section: Recent Leads + Live Activity Audit */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Pending Inbound Leads & Bookings (7 Cols) */}
              <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                      Recent Inbound Retainer Leads
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>View All ({consultations.length + inquiries.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {consultations.slice(0, 3).map((con) => (
                    <div
                      key={con.id}
                      className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{con.company}</span>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                              con.status === 'CONFIRMED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : con.status === 'CONVERTED'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {con.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {con.name} • {con.service}
                        </p>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">
                          Scheduled: {con.preferredDate} at {con.preferredTime || '11:00 AM IST'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {con.status !== 'CONVERTED' && (
                          <button
                            onClick={() => handleConvertConsultationToClient(con)}
                            className="px-2.5 py-1.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-colors"
                          >
                            Convert to Client
                          </button>
                        )}
                        <button
                          onClick={() => setActiveTab('consultations')}
                          className="px-2.5 py-1.5 rounded-sm bg-white border border-slate-200 text-slate-700 text-[11px] font-medium hover:bg-slate-50"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Live Activity Audit Feed (5 Cols) */}
              <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                      Live Agency Activity Feed
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Realtime Audit</span>
                </div>

                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {activityLogs.length === 0 ? (
                    <div className="text-xs text-slate-400 py-6 text-center">No recent activity logged.</div>
                  ) : (
                    activityLogs.slice(0, 8).map((log) => (
                      <div key={log.id} className="text-xs border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 text-[11px]">{log.action.replace(/_/g, ' ')}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] font-light mt-0.5 leading-relaxed">
                          {log.details || log.action}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">By {log.actor}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: CLIENT ACCOUNTS & RETAINERS */}
        {/* ==================================================== */}
        {activeTab === 'clients' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-light text-slate-900 tracking-tight">Client Portfolio & Retainers</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage active enterprise retainers and communications leads</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    placeholder="Search clients or industry..."
                    className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 w-52"
                  />
                </div>

                <button
                  onClick={() => setIsAddClientOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard Client</span>
                </button>
              </div>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3.5 px-4">Client / Organization</th>
                      <th className="py-3.5 px-4">Industry Vertical</th>
                      <th className="py-3.5 px-4">Retainer Amount</th>
                      <th className="py-3.5 px-4">Dedicated Lead</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {clients
                      .filter(
                        (c) =>
                          c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
                          c.industry.toLowerCase().includes(clientSearch.toLowerCase())
                      )
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-slate-900">
                            <div>{c.name}</div>
                            <div className="text-[11px] text-slate-400 font-light">{c.email}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{c.industry}</td>
                          <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                            {c.retainerAmount || '₹5,00,000/mo'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {c.dedicatedLead || c.assignedDirector || 'Priya Sengupta'}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {c.status || 'ACTIVE'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteClient(c.id, c.name)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-sm transition-colors"
                              title="Archive Client"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: CONSULTATIONS & INBOUND LEADS */}
        {/* ==================================================== */}
        {activeTab === 'consultations' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-light text-slate-900 tracking-tight">
                  Inbound Strategy Consultations & Leads
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review booking requests, manage meeting schedules, and convert prospects to retainer accounts
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Filter inquiries..."
                  className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 w-52"
                />
              </div>
            </div>

            {/* Consultations List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consultations
                .filter(
                  (con) =>
                    con.company.toLowerCase().includes(leadSearch.toLowerCase()) ||
                    con.name.toLowerCase().includes(leadSearch.toLowerCase())
                )
                .map((con) => (
                  <div key={con.id} className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{con.company}</h4>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                              con.status === 'CONFIRMED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : con.status === 'CONVERTED'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {con.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 font-medium">
                          Contact: {con.name} ({con.email}) • {con.phone}
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 font-mono">
                        {con.preferredDate} @ {con.preferredTime || '11:00 AM IST'}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm text-xs text-slate-700 leading-relaxed font-light">
                      <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Service Requested: {con.service}</div>
                      {con.projectDescription || 'No description provided.'}
                    </div>

                    {con.conversationNotes && (
                      <div className="text-[11px] text-slate-500 italic">
                        Director Notes: {con.conversationNotes}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-medium">Change Status:</span>
                        <select
                          value={con.status}
                          onChange={(e) => handleUpdateConsultationStatus(con.id, e.target.value)}
                          className="text-[11px] bg-slate-100 border border-slate-200 rounded-sm px-2 py-1 text-slate-800 focus:outline-none"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CONVERTED">Converted</option>
                        </select>
                      </div>

                      {con.status !== 'CONVERTED' && (
                        <button
                          onClick={() => handleConvertConsultationToClient(con)}
                          className="px-3 py-1.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Convert to Client Retainer</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: PRESS RELEASE WIRE STUDIO */}
        {/* ==================================================== */}
        {activeTab === 'press-releases' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-light text-slate-900 tracking-tight">Press Release Wire Studio</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage PTI, AP, and digital media wire syndication releases</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={pressSearch}
                    onChange={(e) => setPressSearch(e.target.value)}
                    placeholder="Search press wire..."
                    className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-sm text-xs text-slate-800 focus:outline-none focus:border-blue-500 w-52"
                  />
                </div>

                <button
                  onClick={() => setIsAddPressOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish New Wire</span>
                </button>
              </div>
            </div>

            {/* Press Releases Table */}
            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3.5 px-4">Headline / Release Title</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Date Dispatched</th>
                      <th className="py-3.5 px-4">Reads & Views</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pressReleases
                      .filter(
                        (p) =>
                          p.title.toLowerCase().includes(pressSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(pressSearch.toLowerCase())
                      )
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-md">
                            <div>{p.title}</div>
                            <div className="text-[11px] text-slate-400 font-light truncate">{p.summary}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">{p.date}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-900">
                            {p.views?.toLocaleString() || '1,240'} views
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => navigateTo('press-release', p.slug || p.id)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="View on Public Wire"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePressRelease(p.id, p.title)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                                title="Delete Press Release"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: MEDIA PLACEMENT TRACKER */}
        {/* ==================================================== */}
        {activeTab === 'media-coverage' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-light text-slate-900 tracking-tight">National Media Placements</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track tier-1 print, digital, and broadcast editorial hits across Indian business press
                </p>
              </div>

              <button
                onClick={() => setIsAddCoverageOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Media Placement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaCoverage.map((m) => (
                <div key={m.id} className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-slate-900 text-white">
                      {m.outletName || m.publication}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                      {m.publicationTier || 'TIER_1'}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2">
                    {m.headline || m.articleTitle}
                  </h4>

                  <div className="text-[11px] text-slate-500 font-light flex items-center justify-between">
                    <span>Client: <strong className="text-slate-800">{m.clientName}</strong></span>
                    <span className="font-mono">{m.reach || '2.8M Reach'}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={m.url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                    >
                      <span>Read Placement</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: AI PR STRATEGIC GENERATOR */}
        {/* ==================================================== */}
        {activeTab === 'ai-generator' && (
          <div className="animate-in fade-in">
            <AIPRAssistant />
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 7: SYSTEM & DATABASE BACKUPS */}
        {/* ==================================================== */}
        {activeTab === 'system-logs' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Database & System Maintenance</h3>
              <p className="text-xs text-slate-600 font-light max-w-xl">
                Manage backend storage state, export full system JSON backups, or factory reset the dataset to default Indian PR accounts.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="/api/backup/export"
                  download
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-sm bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full JSON Backup</span>
                </a>

                <button
                  onClick={handleResetDatabase}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-sm bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Factory Reset Database</span>
                </button>
              </div>
            </div>

            {/* Full Audit Activity Logs Stream */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Full System Audit Logs ({activityLogs.length})
                </h3>
                <span className="text-xs text-slate-400 font-mono">IST Timestamped</span>
              </div>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-2">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-sm bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{log.action.replace(/_/g, ' ')}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-slate-600 text-[11px] mt-0.5">{log.details}</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {log.actor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================== */}
      {/* MODAL: ONBOARD NEW CLIENT */}
      {/* ========================================== */}
      {isAddClientOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Onboard Retainer Client</h3>
              <button
                onClick={() => setIsAddClientOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="e.g. Kaveri FinTech Solutions"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Industry Vertical</label>
                  <input
                    type="text"
                    value={newClient.industry}
                    onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Monthly Retainer</label>
                  <input
                    type="text"
                    value={newClient.retainerAmount}
                    onChange={(e) => setNewClient({ ...newClient, retainerAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    placeholder="contact@company.in"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Brand & Mission Summary</label>
                <textarea
                  rows={2}
                  value={newClient.brandSummary}
                  onChange={(e) => setNewClient({ ...newClient, brandSummary: e.target.value })}
                  placeholder="Key positioning goals, competitors, and target media..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="px-3.5 py-2 rounded-sm text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Confirm & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: PUBLISH PRESS RELEASE */}
      {/* ========================================== */}
      {isAddPressOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-200 max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Publish National Press Wire</h3>
              <button
                onClick={() => setIsAddPressOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreatePressRelease} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Press Release Headline</label>
                <input
                  type="text"
                  value={newPress.title}
                  onChange={(e) => setNewPress({ ...newPress, title: e.target.value })}
                  placeholder="e.g. BharatQuantum Unveils Cryogenic Quantum Module"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Subheadline / Wire Lede</label>
                <input
                  type="text"
                  value={newPress.subtitle}
                  onChange={(e) => setNewPress({ ...newPress, subtitle: e.target.value })}
                  placeholder="e.g. Commercial pilots commence across major banking partners..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Category</label>
                  <select
                    value={newPress.category}
                    onChange={(e) => setNewPress({ ...newPress, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="TECHNOLOGY">Technology</option>
                    <option value="HEALTHCARE">Healthcare</option>
                    <option value="CORPORATE">Corporate & Finance</option>
                    <option value="AEROSPACE">Aerospace & Defense</option>
                    <option value="AUTOMOTIVE">CleanTech & Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={newPress.featuredImage}
                    onChange={(e) => setNewPress({ ...newPress, featuredImage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Release Body Text (PTI Wire Format)</label>
                <textarea
                  rows={6}
                  value={newPress.content}
                  onChange={(e) => setNewPress({ ...newPress, content: e.target.value, summary: e.target.value.slice(0, 160) })}
                  placeholder="FOR IMMEDIATE RELEASE&#10;&#10;NEW DELHI & MUMBAI — ..."
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-mono resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPressOpen(false)}
                  className="px-3.5 py-2 rounded-sm text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Dispatch to Wire
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: LOG MEDIA PLACEMENT */}
      {/* ========================================== */}
      {isAddCoverageOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Log National Media Placement</h3>
              <button
                onClick={() => setIsAddCoverageOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateCoverage} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Article Headline</label>
                <input
                  type="text"
                  value={newCoverage.headline}
                  onChange={(e) => setNewCoverage({ ...newCoverage, headline: e.target.value })}
                  placeholder="e.g. How Indian DeepTech is Outpacing Global Benchmarks"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Publication Name</label>
                  <input
                    type="text"
                    value={newCoverage.outletName}
                    onChange={(e) => setNewCoverage({ ...newCoverage, outletName: e.target.value })}
                    placeholder="e.g. The Economic Times"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Client Link</label>
                  <select
                    value={newCoverage.clientName}
                    onChange={(e) => setNewCoverage({ ...newCoverage, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Reach / Impressions</label>
                  <input
                    type="text"
                    value={newCoverage.reach}
                    onChange={(e) => setNewCoverage({ ...newCoverage, reach: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Live URL</label>
                  <input
                    type="url"
                    value={newCoverage.url}
                    onChange={(e) => setNewCoverage({ ...newCoverage, url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCoverageOpen(false)}
                  className="px-3.5 py-2 rounded-sm text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Log Placement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
