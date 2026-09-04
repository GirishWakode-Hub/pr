import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  UserRole,
  Client,
  Campaign,
  PressRelease,
  MediaCoverage,
  CaseStudy,
  BlogPost,
  MediaAsset,
  Testimonial,
  PRService,
  Inquiry,
  Consultation
} from '../types';
import {
  INITIAL_USERS,
  PR_SERVICES,
  INITIAL_CLIENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_PRESS_RELEASES,
  INITIAL_MEDIA_COVERAGE,
  INITIAL_CASE_STUDIES,
  INITIAL_BLOG_POSTS,
  INITIAL_MEDIA_ASSETS,
  INITIAL_TESTIMONIALS
} from '../data/mockData';
import { api } from '../lib/api';

export type PageRoute =
  | 'home'
  | 'services'
  | 'work'
  | 'case-study'
  | 'newsroom'
  | 'press-release'
  | 'media-gallery'
  | 'insights'
  | 'blog-post'
  | 'about'
  | 'contact'
  | 'consultation'
  | 'client-portal'
  | 'reports-analytics'
  | 'admin'
  | 'admin-dashboard';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface PRContextType {
  currentUser: User | null;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  setUser: (user: User | null) => void;
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedCaseStudySlug: string | null;
  setSelectedCaseStudySlug: (slug: string | null) => void;
  selectedPressReleaseSlug: string | null;
  setSelectedPressReleaseSlug: (slug: string | null) => void;
  selectedBlogPostSlug: string | null;
  setSelectedBlogPostSlug: (slug: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isConsultationModalOpen: boolean;
  setIsConsultationModalOpen: (open: boolean) => void;
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  clients: Client[];
  campaigns: Campaign[];
  pressReleases: PressRelease[];
  mediaCoverage: MediaCoverage[];
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];
  mediaAssets: MediaAsset[];
  testimonials: Testimonial[];
  services: PRService[];
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  refreshData: () => Promise<void>;
  navigateTo: (page: PageRoute, slug?: string) => void;
  // Admin Auth State
  isAdminAuthenticated: boolean;
  adminToken: string | null;
  adminUser: any | null;
  loginAdmin: (id: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
}

const PRContext = createContext<PRContextType | undefined>(undefined);

export const PRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]); // Default to Elena (Admin)
  const [currentRole, setCurrentRole] = useState<UserRole>('PUBLIC');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedCaseStudySlug, setSelectedCaseStudySlug] = useState<string | null>(null);
  const [selectedPressReleaseSlug, setSelectedPressReleaseSlug] = useState<string | null>(null);
  const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('gsr_admin_token');
  });
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('gsr_admin_token');
  });
  const [adminUser, setAdminUser] = useState<any | null>(() => {
    const cached = localStorage.getItem('gsr_admin_user');
    return cached ? JSON.parse(cached) : null;
  });

  // Verify cached session on mount
  useEffect(() => {
    const token = localStorage.getItem('gsr_admin_token');
    if (token) {
      api
        .adminVerifySession(token)
        .then((res) => {
          if (res.valid) {
            setIsAdminAuthenticated(true);
            setAdminUser(res.user);
          } else {
            setIsAdminAuthenticated(false);
            setAdminToken(null);
            setAdminUser(null);
            localStorage.removeItem('gsr_admin_token');
            localStorage.removeItem('gsr_admin_user');
          }
        })
        .catch(() => {
          // Keep local state if offline fallback
        });
    }
  }, []);

  const loginAdmin = async (id: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await api.adminLogin(id, pass);
      if (res.success && res.token) {
        setIsAdminAuthenticated(true);
        setAdminToken(res.token);
        setAdminUser(res.user);
        setCurrentRole('ADMIN');
        localStorage.setItem('gsr_admin_token', res.token);
        localStorage.setItem('gsr_admin_user', JSON.stringify(res.user));
        showToast('Admin Authentication Successful', `Welcome back, ${res.user.name || 'Executive Admin'}`);
        return { success: true };
      }
      return { success: false, error: 'Authentication failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Invalid Admin ID or Password.' };
    }
  };

  const logoutAdmin = () => {
    api.adminLogout().catch(() => {});
    setIsAdminAuthenticated(false);
    setAdminToken(null);
    setAdminUser(null);
    setCurrentRole('PUBLIC');
    localStorage.removeItem('gsr_admin_token');
    localStorage.removeItem('gsr_admin_user');
    showToast('Admin Logged Out', 'You have been safely signed out of the command center.');
    navigateTo('home');
  };

  // Entity States with resilient instant defaults
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>(INITIAL_PRESS_RELEASES);
  const [mediaCoverage, setMediaCoverage] = useState<MediaCoverage[]>(INITIAL_MEDIA_COVERAGE);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(INITIAL_CASE_STUDIES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(INITIAL_MEDIA_ASSETS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const services = PR_SERVICES;

  const showToast = (
    title: string,
    message?: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshData = async () => {
    try {
      const [
        clientsData,
        campaignsData,
        pressData,
        coverageData,
        casesData,
        postsData,
        assetsData,
        testimonialsData,
      ] = await Promise.all([
        api.getClients(),
        api.getCampaigns(),
        api.getPressReleases(),
        api.getMediaCoverage(),
        api.getCaseStudies(),
        api.getBlogPosts(),
        api.getMediaAssets(),
        api.getTestimonials(),
      ]);

      if (Array.isArray(clientsData)) setClients(clientsData);
      if (Array.isArray(campaignsData)) setCampaigns(campaignsData);
      if (Array.isArray(pressData)) setPressReleases(pressData);
      if (Array.isArray(coverageData)) setMediaCoverage(coverageData);
      if (Array.isArray(casesData)) setCaseStudies(casesData);
      if (Array.isArray(postsData)) setBlogPosts(postsData);
      if (Array.isArray(assetsData)) setMediaAssets(assetsData);
      if (Array.isArray(testimonialsData)) setTestimonials(testimonialsData);
    } catch (err) {
      console.error('Error fetching data in PRContext:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Global Keyboard listener for search modal (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSetRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'ADMIN') {
      setCurrentUser(INITIAL_USERS[0]); // Elena
      showToast('Switched to Admin View', 'Logged in as Elena Rostova (Managing Partner)');
    } else if (role === 'PR_TEAM') {
      setCurrentUser(INITIAL_USERS[1]); // Marcus
      showToast('Switched to PR Team View', 'Logged in as Marcus Vance (Media Relations Director)');
    } else if (role === 'CLIENT') {
      setCurrentUser(INITIAL_USERS[2]); // Dr. Alistair Chen
      showToast('Switched to Client Portal', 'Logged in as Dr. Alistair Chen (Luminary Health)');
    } else {
      setCurrentUser(null);
      showToast('Public Visitor Mode', 'Viewing public agency marketing portal');
    }
  };

  const navigateTo = (page: PageRoute, slug?: string) => {
    if (page === 'case-study' && slug) {
      setSelectedCaseStudySlug(slug);
    } else if (page === 'press-release' && slug) {
      setSelectedPressReleaseSlug(slug);
    } else if (page === 'blog-post' && slug) {
      setSelectedBlogPostSlug(slug);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PRContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole: handleSetRole,
        setUser: setCurrentUser,
        currentPage,
        setCurrentPage,
        selectedCaseStudySlug,
        setSelectedCaseStudySlug,
        selectedPressReleaseSlug,
        setSelectedPressReleaseSlug,
        selectedBlogPostSlug,
        setSelectedBlogPostSlug,
        isSearchOpen,
        setIsSearchOpen,
        isConsultationModalOpen,
        setIsConsultationModalOpen,
        isConciergeOpen,
        setIsConciergeOpen,
        clients,
        campaigns,
        pressReleases,
        mediaCoverage,
        caseStudies,
        blogPosts,
        mediaAssets,
        testimonials,
        services,
        toasts,
        showToast,
        removeToast,
        refreshData,
        navigateTo,
        isAdminAuthenticated,
        adminToken,
        adminUser,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </PRContext.Provider>
  );
};

export const usePR = (): PRContextType => {
  const context = useContext(PRContext);
  if (!context) {
    throw new Error('usePR must be used within a PRProvider');
  }
  return context;
};
