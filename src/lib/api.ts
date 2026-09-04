import {
  Client,
  Campaign,
  PressRelease,
  MediaCoverage,
  CaseStudy,
  BlogPost,
  MediaAsset,
  Testimonial,
  Inquiry,
  Consultation,
  Message,
  ClientReport,
  MediaMention,
  ConciergeAction
} from '../types';
import {
  INITIAL_CLIENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_PRESS_RELEASES,
  INITIAL_MEDIA_COVERAGE,
  INITIAL_CASE_STUDIES,
  INITIAL_BLOG_POSTS,
  INITIAL_TESTIMONIALS,
  INITIAL_MEDIA_ASSETS,
  INITIAL_CLIENT_REPORTS
} from '../data/mockData';

async function fetchJSON<T>(url: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`API call failed for ${url}, using local state:`, err);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}

export const api = {
  // Clients
  getClients: () => fetchJSON<Client[]>('/api/clients', undefined, INITIAL_CLIENTS),
  createClient: (client: Partial<Client>) =>
    fetchJSON<Client>('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    }),
  updateClient: (id: string, client: Partial<Client>) =>
    fetchJSON<Client>(`/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    }),
  deleteClient: (id: string) =>
    fetchJSON<Client>(`/api/clients/${id}`, { method: 'DELETE' }),

  // Campaigns
  getCampaigns: (clientId?: string) =>
    fetchJSON<Campaign[]>(
      clientId ? `/api/campaigns?clientId=${clientId}` : '/api/campaigns',
      undefined,
      clientId ? INITIAL_CAMPAIGNS.filter((c) => c.clientId === clientId) : INITIAL_CAMPAIGNS
    ),
  createCampaign: (campaign: Partial<Campaign>) =>
    fetchJSON<Campaign>('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaign),
    }),
  updateCampaign: (id: string, campaign: Partial<Campaign>) =>
    fetchJSON<Campaign>(`/api/campaigns/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaign),
    }),
  deleteCampaign: (id: string) =>
    fetchJSON<Campaign>(`/api/campaigns/${id}`, { method: 'DELETE' }),

  // Press Releases
  getPressReleases: () =>
    fetchJSON<PressRelease[]>('/api/press-releases', undefined, INITIAL_PRESS_RELEASES),
  getPressReleaseBySlug: (slug: string) =>
    fetchJSON<PressRelease>(
      `/api/press-releases/${slug}`,
      undefined,
      INITIAL_PRESS_RELEASES.find((p) => p.slug === slug || p.id === slug)
    ),
  createPressRelease: (pr: Partial<PressRelease>) =>
    fetchJSON<PressRelease>('/api/press-releases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pr),
    }),
  updatePressRelease: (id: string, pr: Partial<PressRelease>) =>
    fetchJSON<PressRelease>(`/api/press-releases/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pr),
    }),
  deletePressRelease: (id: string) =>
    fetchJSON<PressRelease>(`/api/press-releases/${id}`, { method: 'DELETE' }),

  // Media Coverage
  getMediaCoverage: (clientId?: string) =>
    fetchJSON<MediaCoverage[]>(
      clientId ? `/api/media-coverage?clientId=${clientId}` : '/api/media-coverage',
      undefined,
      clientId ? INITIAL_MEDIA_COVERAGE.filter((m) => m.clientId === clientId) : INITIAL_MEDIA_COVERAGE
    ),
  createMediaCoverage: (coverage: Partial<MediaCoverage>) =>
    fetchJSON<MediaCoverage>('/api/media-coverage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coverage),
    }),
  deleteMediaCoverage: (id: string) =>
    fetchJSON<MediaCoverage>(`/api/media-coverage/${id}`, { method: 'DELETE' }),

  // Case Studies
  getCaseStudies: () =>
    fetchJSON<CaseStudy[]>('/api/case-studies', undefined, INITIAL_CASE_STUDIES),

  // Blog Posts
  getBlogPosts: () =>
    fetchJSON<BlogPost[]>('/api/blog-posts', undefined, INITIAL_BLOG_POSTS),
  createBlogPost: (post: Partial<BlogPost>) =>
    fetchJSON<BlogPost>('/api/blog-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    }),
  deleteBlogPost: (id: string) =>
    fetchJSON<BlogPost>(`/api/blog-posts/${id}`, { method: 'DELETE' }),

  // Media Assets
  getMediaAssets: () =>
    fetchJSON<MediaAsset[]>('/api/media-assets', undefined, INITIAL_MEDIA_ASSETS),
  createMediaAsset: (asset: Partial<MediaAsset>) =>
    fetchJSON<MediaAsset>('/api/media-assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(asset),
    }),

  // Testimonials
  getTestimonials: () =>
    fetchJSON<Testimonial[]>('/api/testimonials', undefined, INITIAL_TESTIMONIALS),

  // Inquiries
  getInquiries: () => fetchJSON<Inquiry[]>('/api/inquiries', undefined, []),
  sendInquiry: (inquiry: Partial<Inquiry>) =>
    fetchJSON<{ success: boolean; inquiry: Inquiry }>('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    }),
  updateInquiryStatus: (id: string, status: string) =>
    fetchJSON<Inquiry>(`/api/inquiries/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }),

  // Consultations & Booked Conversations
  getConsultations: (clientId?: string) =>
    fetchJSON<Consultation[]>(
      clientId ? `/api/consultations?clientId=${clientId}` : '/api/consultations',
      undefined,
      []
    ),
  bookConsultation: (consultation: Partial<Consultation>) =>
    fetchJSON<{ success: boolean; consultation: Consultation }>('/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(consultation),
    }),
  updateConsultation: (id: string, data: Partial<Consultation>) =>
    fetchJSON<Consultation>(`/api/consultations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  updateConsultationStatus: (id: string, status: string, conversationNotes?: string) =>
    fetchJSON<Consultation>(`/api/consultations/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, conversationNotes }),
    }),
  deleteConsultation: (id: string) =>
    fetchJSON<Consultation>(`/api/consultations/${id}`, { method: 'DELETE' }),

  // Messages
  getMessages: (clientId?: string) =>
    fetchJSON<Message[]>(
      clientId ? `/api/messages?clientId=${clientId}` : '/api/messages',
      undefined,
      []
    ),
  sendMessage: (msg: Partial<Message>) =>
    fetchJSON<Message>('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    }),

  // Reports
  getReports: (clientId?: string) =>
    fetchJSON<ClientReport[]>(
      clientId ? `/api/reports?clientId=${clientId}` : '/api/reports',
      undefined,
      INITIAL_CLIENT_REPORTS
    ),

  // AI PR Assistant
  callAiPRAssistant: (toolType: string, payload: any) =>
    fetchJSON<{ result: string; isFallback: boolean; disclaimer: string; error?: string }>(
      '/api/ai/pr-assistant',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolType, payload }),
      }
    ),

  // Analytics & Stats
  getStats: () =>
    fetchJSON<any>('/api/stats', undefined, {
      activeClients: 4,
      totalClients: 4,
      activeCampaigns: 5,
      totalPressReleases: 6,
      totalMediaCoverage: 6,
      totalPressViews: 38400,
      totalPressDownloads: 1420,
      pendingConsultations: 1,
      newInquiries: 2,
      estimatedEarnedMediaValue: '₹48.5 Cr',
      tier1PlacementRate: '96.8%',
      nationalReachEstimate: '420M+',
    }),

  getSystemInfo: () =>
    fetchJSON<any>('/api/system/info', undefined, {
      name: 'GSRelation Strategic Communications Engine',
      version: '2.4.0-enterprise',
    }),

  // Search
  search: (query: string) =>
    fetchJSON<{
      pressReleases: PressRelease[];
      clients: Client[];
      coverage: MediaCoverage[];
      caseStudies: CaseStudy[];
      blogPosts: BlogPost[];
    }>(`/api/search?q=${encodeURIComponent(query)}`, undefined, {
      pressReleases: [],
      clients: [],
      coverage: [],
      caseStudies: [],
      blogPosts: [],
    }),

  // View / Download trackers
  viewPressRelease: (id: string) =>
    fetchJSON<{ success: boolean; views: number }>(`/api/press-releases/${id}/view`, {
      method: 'POST',
    }),
  downloadPressRelease: (id: string) =>
    fetchJSON<{ success: boolean; downloads: number }>(`/api/press-releases/${id}/download`, {
      method: 'POST',
    }),

  // Admin Authentication
  adminLogin: (id: string, password: string) =>
    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate');
      }
      return data as { success: boolean; token: string; user: any };
    }),

  adminVerifySession: (token: string) =>
    fetch('/api/admin/verify-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      if (!res.ok) throw new Error('Session invalid');
      return (await res.json()) as { valid: boolean; user: any };
    }),

  adminLogout: () =>
    fetch('/api/admin/logout', {
      method: 'POST',
    }).then((res) => res.json()),

  // Activity Logs
  getActivityLogs: () =>
    fetchJSON<any[]>('/api/activity-logs', undefined, []),

  // Media Mentions Tracking (Google Search Grounded)
  getMediaMentions: (brand?: string) =>
    fetchJSON<{
      mentions: MediaMention[];
      groundingQueries?: string[];
      groundingSources?: Array<{ title: string; url: string }>;
      isLiveGrounded?: boolean;
      timestamp?: string;
    }>(brand ? `/api/media-mentions?brand=${encodeURIComponent(brand)}` : '/api/media-mentions'),

  trackMediaMentions: (payload: { brandName?: string; industry?: string; query?: string }) =>
    fetchJSON<{
      mentions: MediaMention[];
      groundingQueries?: string[];
      groundingSources?: Array<{ title: string; url: string }>;
      isLiveGrounded?: boolean;
      timestamp?: string;
      brandSearched?: string;
      status?: string;
    }>('/api/media-mentions/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  // Database Backup / Reset
  resetDatabase: () =>
    fetchJSON<{ success: boolean; message: string }>('/api/backup/reset', {
      method: 'POST',
    }),

  // AI Moderator & Client Concierge
  chatWithConcierge: (payload: {
    messages: Array<{ role: string; content: string }>;
    message?: string;
    currentRoute?: string;
    clientContext?: any;
    mode?: 'gemini_fast' | 'chatgpt_reasoning' | 'journalist_drill';
  }) =>
    fetchJSON<{
      reply: string;
      actions?: ConciergeAction[];
      isFallback?: boolean;
      mode?: string;
      scoreCard?: {
        score: number;
        grade: string;
        metrics: Array<{ label: string; value: string }>;
      };
      timestamp?: string;
    }>('/api/ai/concierge-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
};

