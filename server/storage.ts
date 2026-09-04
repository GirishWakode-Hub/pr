import fs from 'fs';
import path from 'path';
import {
  INITIAL_CLIENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_PRESS_RELEASES,
  INITIAL_MEDIA_COVERAGE,
  INITIAL_CASE_STUDIES,
  INITIAL_BLOG_POSTS,
  INITIAL_TESTIMONIALS,
  INITIAL_MEDIA_ASSETS,
  INITIAL_CLIENT_REPORTS,
  INITIAL_USERS,
  LEADERSHIP_TEAM,
  PR_SERVICES,
} from '../src/data/mockData';
import {
  Client,
  Campaign,
  PressRelease,
  MediaCoverage,
  CaseStudy,
  BlogPost,
  Testimonial,
  MediaAsset,
  ClientReport,
  Inquiry,
  Consultation,
  Message,
  User,
} from '../src/types';

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  category: 'PRESS_RELEASE' | 'CAMPAIGN' | 'CLIENT' | 'INQUIRY' | 'CONSULTATION' | 'SYSTEM';
  details?: string;
}

export interface DatabaseSchema {
  clients: Client[];
  campaigns: Campaign[];
  pressReleases: PressRelease[];
  mediaCoverage: MediaCoverage[];
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  mediaAssets: MediaAsset[];
  reports: ClientReport[];
  users: User[];
  inquiries: Inquiry[];
  consultations: Consultation[];
  messages: Message[];
  activityLogs: ActivityLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    fullName: 'Aarav Singhal',
    company: 'Aether DeepBio India',
    email: 'asinghal@aetherdeepbio.in',
    phone: '+91 98110 45210',
    serviceRequired: 'Media Relations & Tier-1 National Placement',
    budgetRange: '₹5,00,000 - ₹10,00,000/mo',
    message:
      'We are closing a ₹250 Cr Series B in AI precision diagnostics and need a lead exclusive feature in The Economic Times, Mint, and CNBC-TV18.',
    status: 'NEW',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'inq-2',
    fullName: 'Sunita Chawla',
    company: 'Vayu Orbital & Aerospace',
    email: 'schawla@vayuorbital.in',
    phone: '+91 80 4912 3400',
    serviceRequired: 'Product Launch & Tech Unveilings',
    budgetRange: '₹10,00,000+/mo',
    message:
      'Planning live demonstration of our low-Earth-orbit telecom satellite constellation during Bengaluru Tech Summit.',
    status: 'QUALIFIED',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'con-1',
    name: 'Rohan Mehra',
    company: 'Kavach Quantum Security',
    email: 'rohan.mehra@kavachquantum.io',
    phone: '+91 98200 78199',
    preferredDate: '2024-09-15',
    preferredTime: '11:00 AM IST',
    service: 'Corporate Reputation & Executive Authority',
    projectDescription:
      'Establishing CEO thought leadership ahead of ₹180 Cr Series B round and TiEcon keynote.',
    status: 'CONFIRMED',
    assignedDirector: 'Rajesh Malhotra',
    meetingType: 'STRATEGY_SESSION',
    meetingLink: 'https://meet.google.com/gsr-kavach-sec',
    conversationNotes: 'Initial discovery conversation on positioning Kavach as India’s premier post-quantum encryption protocol. Target publications: The Economic Times, Mint, and TechCircle.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'con-2',
    name: 'Sunita Chawla',
    company: 'Vayu Orbital & Aerospace',
    email: 'schawla@vayuorbital.in',
    phone: '+91 80 4912 3400',
    preferredDate: '2024-09-18',
    preferredTime: '03:30 PM IST',
    service: 'Product Launch & Tech Unveilings',
    projectDescription:
      'Planning live demonstration of our low-Earth-orbit telecom satellite constellation during Bengaluru Tech Summit.',
    status: 'PENDING',
    assignedDirector: 'Priya Sengupta',
    meetingType: 'DISCOVERY',
    meetingLink: 'https://meet.google.com/gsr-vayu-launch',
    conversationNotes: 'Inbound booking from website consultation form. Client requested focus on ISRO / IN-SPACe regulatory synergy and private space tier-1 coverage.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'con-cli-1',
    clientId: 'cli-1',
    clientName: 'Niramaya BioDiagnostics',
    name: 'Dr. Alok Verma',
    company: 'Niramaya AI Therapeutics Ltd.',
    email: 'averma@niramayabiotech.in',
    phone: '+91 98110 33400',
    preferredDate: '2024-09-10',
    preferredTime: '02:00 PM IST',
    service: 'Media Relations & Tier-1 National Placement',
    projectDescription:
      'Bi-weekly strategic alignment on AIIMS clinical trial placement and CNBC-TV18 live executive interview.',
    status: 'CONFIRMED',
    assignedDirector: 'Priya Sengupta',
    meetingType: 'STRATEGY_SESSION',
    meetingLink: 'https://meet.google.com/niramaya-pr-sync',
    conversationNotes: 'Confirmed CNBC-TV18 Young Turks segment talking points and approved PTI wire distribution timing.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'con-cli-2',
    clientId: 'cli-2',
    clientName: 'BharatQuantum Dynamics',
    name: 'Vikram Singhania',
    company: 'BharatQuantum Systems Pvt. Ltd.',
    email: 'media@bharatquantum.in',
    phone: '+91 98450 11290',
    preferredDate: '2024-09-14',
    preferredTime: '04:00 PM IST',
    service: 'Crisis Communications & Reputation Armor',
    projectDescription:
      'Quarterly executive reputation review and upcoming MeitY quantum mission round-table preparation.',
    status: 'CONFIRMED',
    assignedDirector: 'Rajesh Malhotra',
    meetingType: 'QUARTERLY_REVIEW',
    meetingLink: 'https://meet.google.com/bharat-quantum-pr',
    conversationNotes: 'Reviewed Q3 earned media yield (₹8.2 Cr EMV) and set media training schedule for CTO.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    senderId: 'usr-team-1',
    senderName: 'Priya Sengupta',
    senderRole: 'PR_TEAM',
    recipientRole: 'CLIENT',
    clientId: 'cli-1',
    text: 'Namaste Dr. Verma. The Economic Times lead feature just went live on page 1 of the Tech section and the digital homepage. Traffic is surging.',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    isRead: true,
  },
  {
    id: 'msg-2',
    senderId: 'usr-client-1',
    senderName: 'Dr. Alok Verma',
    senderRole: 'CLIENT',
    recipientRole: 'PR_TEAM',
    clientId: 'cli-1',
    text: 'Phenomenal work Priya. We already received inbound partnership inquiries from Apollo Hospitals and AIIMS leadership.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: true,
  },
  {
    id: 'msg-3',
    senderId: 'usr-team-1',
    senderName: 'Priya Sengupta',
    senderRole: 'PR_TEAM',
    recipientRole: 'CLIENT',
    clientId: 'cli-1',
    text: 'Superb. We are prepping your talking points for the CNBC-TV18 Young Turks live broadcast spot tomorrow at 2:15 PM IST.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    isRead: false,
  },
];

const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    action: 'PRESS_RELEASE_PUBLISHED',
    actor: 'Priya Sengupta (Senior Director)',
    category: 'PRESS_RELEASE',
    details: 'Dispatched national PTI wire for BharatQuantum Dynamics commercial cryogenic release.',
  },
  {
    id: 'act-2',
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
    action: 'CLIENT_ONBOARDED',
    actor: 'Rajesh Malhotra (Managing Partner)',
    category: 'CLIENT',
    details: 'Initiated retainer onboarding for Kaveri FinTech Solutions (₹5.5L/mo).',
  },
  {
    id: 'act-3',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    action: 'INQUIRY_RECEIVED',
    actor: 'System Gateway',
    category: 'INQUIRY',
    details: 'New inbound retainer inquiry from Aether DeepBio India.',
  },
];

class PersistentStorage {
  private data: DatabaseSchema;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.data = this.loadInitial();
  }

  private loadInitial(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        // Ensure all keys exist
        return {
          clients: parsed.clients || [...INITIAL_CLIENTS],
          campaigns: parsed.campaigns || [...INITIAL_CAMPAIGNS],
          pressReleases: parsed.pressReleases || [...INITIAL_PRESS_RELEASES],
          mediaCoverage: parsed.mediaCoverage || [...INITIAL_MEDIA_COVERAGE],
          caseStudies: parsed.caseStudies || [...INITIAL_CASE_STUDIES],
          blogPosts: parsed.blogPosts || [...INITIAL_BLOG_POSTS],
          testimonials: parsed.testimonials || [...INITIAL_TESTIMONIALS],
          mediaAssets: parsed.mediaAssets || [...INITIAL_MEDIA_ASSETS],
          reports: parsed.reports || [...INITIAL_CLIENT_REPORTS],
          users: parsed.users || [...INITIAL_USERS],
          inquiries: parsed.inquiries || [...INITIAL_INQUIRIES],
          consultations: parsed.consultations || [...INITIAL_CONSULTATIONS],
          messages: parsed.messages || [...INITIAL_MESSAGES],
          activityLogs: parsed.activityLogs || [...INITIAL_ACTIVITY_LOGS],
        };
      }
    } catch (err) {
      console.error('[Backend Storage] Failed to read db.json, initializing from defaults:', err);
    }

    const defaultData: DatabaseSchema = {
      clients: [...INITIAL_CLIENTS],
      campaigns: [...INITIAL_CAMPAIGNS],
      pressReleases: [...INITIAL_PRESS_RELEASES],
      mediaCoverage: [...INITIAL_MEDIA_COVERAGE],
      caseStudies: [...INITIAL_CASE_STUDIES],
      blogPosts: [...INITIAL_BLOG_POSTS],
      testimonials: [...INITIAL_TESTIMONIALS],
      mediaAssets: [...INITIAL_MEDIA_ASSETS],
      reports: [...INITIAL_CLIENT_REPORTS],
      users: [...INITIAL_USERS],
      inquiries: [...INITIAL_INQUIRIES],
      consultations: [...INITIAL_CONSULTATIONS],
      messages: [...INITIAL_MESSAGES],
      activityLogs: [...INITIAL_ACTIVITY_LOGS],
    };

    this.persistImmediately(defaultData);
    return defaultData;
  }

  private persistImmediately(dataToSave: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tmpFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(dataToSave, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err) {
      console.error('[Backend Storage] Persistence error:', err);
    }
  }

  public save() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.persistImmediately(this.data);
      this.saveTimeout = null;
    }, 150);
  }

  public get<K extends keyof DatabaseSchema>(key: K): DatabaseSchema[K] {
    return this.data[key];
  }

  public set<K extends keyof DatabaseSchema>(key: K, value: DatabaseSchema[K]) {
    this.data[key] = value;
    this.save();
  }

  public logActivity(
    action: string,
    actor: string,
    category: ActivityLog['category'],
    details?: string
  ) {
    const log: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      action,
      actor,
      category,
      details,
    };
    this.data.activityLogs.unshift(log);
    if (this.data.activityLogs.length > 100) {
      this.data.activityLogs = this.data.activityLogs.slice(0, 100);
    }
    this.save();
    return log;
  }

  public getRawData(): DatabaseSchema {
    return this.data;
  }

  public resetToDefaults(): DatabaseSchema {
    this.data = {
      clients: [...INITIAL_CLIENTS],
      campaigns: [...INITIAL_CAMPAIGNS],
      pressReleases: [...INITIAL_PRESS_RELEASES],
      mediaCoverage: [...INITIAL_MEDIA_COVERAGE],
      caseStudies: [...INITIAL_CASE_STUDIES],
      blogPosts: [...INITIAL_BLOG_POSTS],
      testimonials: [...INITIAL_TESTIMONIALS],
      mediaAssets: [...INITIAL_MEDIA_ASSETS],
      reports: [...INITIAL_CLIENT_REPORTS],
      users: [...INITIAL_USERS],
      inquiries: [...INITIAL_INQUIRIES],
      consultations: [...INITIAL_CONSULTATIONS],
      messages: [...INITIAL_MESSAGES],
      activityLogs: [...INITIAL_ACTIVITY_LOGS],
    };
    this.persistImmediately(this.data);
    return this.data;
  }
}

export const storage = new PersistentStorage();
