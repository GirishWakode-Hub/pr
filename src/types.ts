export type UserRole = 'ADMIN' | 'PR_TEAM' | 'CLIENT' | 'PUBLIC';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  clientId?: string;
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  industry: string;
  logoText?: string;
  logo?: string;
  logoUrl?: string;
  status: 'ACTIVE' | 'ONBOARDING' | 'PAUSED' | 'ARCHIVED';
  joinedDate: string;
  activeCampaignsCount: number;
  portalAccess: boolean;
  dedicatedLead?: string;
  assignedDirector?: string;
  retainerAmount?: string;
  brandSummary?: string;
  sourceConsultationId?: string;
  initialMeetingDetails?: string;
  conversationNotes?: string;
}

export type CampaignStatus = 'PLANNING' | 'IN_PROGRESS' | 'MEDIA_OUTREACH' | 'ACTIVE' | 'COMPLETED';

export interface Campaign {
  id: string;
  clientId: string;
  clientName?: string;
  name?: string;
  title?: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  objective: string;
  progress: number; // 0 - 100
  budget?: string;
  targetOutlets?: string[];
  metrics: {
    mentions: number;
    reach: string;
    engagement?: string;
    sentimentPercent?: number; // % positive
    trafficIncrease?: string;
  };
  highlights: string[];
}

export interface PRService {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  description?: string;
  fullDesc?: string;
  iconName: string;
  category: string;
  process?: string[];
  deliverables?: string[];
  benefits?: string[];
  caseCount?: number;
  ctaText?: string;
}

export type PressReleaseStatus = 'PUBLISHED' | 'DRAFT' | 'SCHEDULED';

export interface PressRelease {
  id: string;
  title: string;
  subtitle?: string;
  slug?: string;
  company?: string;
  date?: string;
  dateline?: string;
  author?: string;
  summary?: string;
  category: string;
  image?: string;
  featuredImage?: string;
  content: string;
  boilerplate?: string;
  quotes?: Array<{ quote: string; author: string; role: string }>;
  mediaContact: {
    name: string;
    title?: string;
    email: string;
    phone: string;
  };
  status: PressReleaseStatus;
  tags?: string[];
  views: number;
  downloads?: number;
  clientId?: string;
}

export interface MediaMention {
  id: string;
  brandName: string;
  headline: string;
  publication: string;
  publicationTier?: 'Tier 1' | 'Tier 2' | 'National Business' | 'Tech Wire' | 'Trade Media';
  snippet: string;
  url: string;
  publishedAt: string;
  relativeTime: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'STRATEGIC' | 'SPOTLIGHT';
  reachEstimate?: string;
  searchQueryUsed?: string;
  category?: string;
  author?: string;
  keyTopics?: string[];
  groundingSources?: Array<{
    title: string;
    url: string;
  }>;
}

export type SentimentType = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export interface MediaCoverage {
  id: string;
  publication?: string;
  outletName?: string;
  publicationTier?: string;
  headline?: string;
  articleTitle?: string;
  url: string;
  date: string;
  category: string;
  clientId: string;
  clientName?: string;
  campaignId?: string;
  campaignName?: string;
  reach: string;
  reachNumeric?: number;
  engagement?: string;
  sentiment: SentimentType | string;
  quote?: string;
  snippet?: string;
  imageUrl?: string;
  author?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client?: string;
  clientName?: string;
  industry: string;
  campaignType?: string;
  serviceType?: string;
  heroImage: string;
  summary: string;
  headlineMetric?: string;
  date?: string;
  challenge: string;
  strategy: string;
  execution?: string;
  metrics?: {
    tier1Placements: number;
    estimatedImpressions: string;
    shareOfVoice: string;
    pipelineGenerated: string;
  };
  results?: {
    mentions: number;
    reach: string;
    engagement: string;
    traffic: string;
    tier1Coverage: number;
  };
  testimonial?: {
    quote: string;
    author: string;
    title?: string;
    role?: string;
    company?: string;
  };
  featured: boolean;
  mediaOutlets?: string[];
  tier1Outlets?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  summary?: string;
  content: string;
  category: string;
  author: {
    name: string;
    role?: string;
    title?: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image?: string;
  heroImage?: string;
  featuredImage?: string;
  tags?: string[];
  popular?: boolean;
  views?: number;
}

export type MediaAssetType = 'PHOTOS' | 'VIDEOS' | 'LOGOS' | 'PRESS_KITS' | 'DOCS' | 'B_ROLL';

export interface MediaAsset {
  id: string;
  title: string;
  type: MediaAssetType;
  format: string;
  size?: string;
  fileSize?: string;
  dimensions?: string;
  duration?: string;
  downloadUrl: string;
  previewUrl: string;
  category: string;
  tags: string[];
  description: string;
  dateAdded?: string;
  clientName?: string;
}

export interface Testimonial {
  id: string;
  clientName?: string;
  authorName?: string;
  position?: string;
  authorTitle?: string;
  company: string;
  photo?: string;
  authorAvatar?: string;
  quote: string;
  rating: number;
  metricsSnippet?: string;
  industry: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  serviceRequired: string;
  budgetRange: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED_WON' | 'ARCHIVED';
  createdAt: string;
}

export interface Consultation {
  id: string;
  clientId?: string;
  clientName?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
  projectDescription: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CONVERTED';
  assignedDirector?: string;
  meetingLink?: string;
  meetingType?: 'DISCOVERY' | 'STRATEGY_SESSION' | 'CRISIS_SYNC' | 'QUARTERLY_REVIEW';
  conversationNotes?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientRole: UserRole;
  clientId: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export interface ClientReport {
  id: string;
  clientId: string;
  clientName?: string;
  title: string;
  period: string;
  generatedDate: string;
  keyHighlights?: string[];
  metrics?: {
    totalMentions: number;
    totalReach: string;
    sentimentScore: string;
    topOutlets: string[];
  };
  summary?: string;
  executiveSummary?: string;
  fileSize?: string;
  downloadFilename?: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role?: string;
  position?: string;
  bio: string;
  image?: string;
  photo?: string;
  linkedin?: string;
  specialties?: string[];
  expertise?: string[];
  formerBackground?: string;
}

export type IntelligenceMode = 'gemini_fast' | 'chatgpt_reasoning' | 'journalist_drill';

export interface ConciergeAction {
  label: string;
  actionType: 'NAVIGATE' | 'MODAL' | 'TOOL' | string;
  target: string;
}

export interface ConciergeMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: IntelligenceMode;
  actions?: ConciergeAction[];
  timestamp: string;
  isSpecialized?: boolean;
  scoreCard?: {
    score: number;
    grade: string;
    metrics: Array<{ label: string; value: string }>;
  };
}
