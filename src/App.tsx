import React from 'react';
import { PRProvider, usePR } from './context/PRContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { ConsultationModal } from './components/common/ConsultationModal';
import { AiConciergeModal } from './components/common/AiConciergeModal';
import { ToastContainer } from './components/common/Toast';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { OurWorkPage } from './components/pages/OurWorkPage';
import { CaseStudyDetailPage } from './components/pages/CaseStudyDetailPage';
import { NewsroomPage } from './components/pages/NewsroomPage';
import { PressReleaseDetailPage } from './components/pages/PressReleaseDetailPage';
import { MediaGalleryPage } from './components/pages/MediaGalleryPage';
import { InsightsPage } from './components/pages/InsightsPage';
import { BlogPostDetailPage } from './components/pages/BlogPostDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { ReportsAnalyticsPage } from './components/pages/ReportsAnalyticsPage';
import { ClientPortal } from './components/portal/ClientPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentPage } = usePR();

  // If viewing dedicated Admin section, render full standalone Admin suite
  if (currentPage === 'admin' || currentPage === 'admin-dashboard') {
    return (
      <div id="gsrelation-admin-app" className="min-h-screen bg-[#050B17] font-sans antialiased text-slate-100">
        <AdminDashboard />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div id="apex-vantage-app" className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between">
        <div>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'work' && <OurWorkPage />}
          {currentPage === 'case-study' && <CaseStudyDetailPage />}
          {currentPage === 'newsroom' && <NewsroomPage />}
          {currentPage === 'press-release' && <PressReleaseDetailPage />}
          {currentPage === 'media-gallery' && <MediaGalleryPage />}
          {currentPage === 'insights' && <InsightsPage />}
          {currentPage === 'blog-post' && <BlogPostDetailPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'reports-analytics' && <ReportsAnalyticsPage />}
          {currentPage === 'client-portal' && <ClientPortal />}
        </div>

        <Footer />
      </main>

      <GlobalSearchModal />
      <ConsultationModal />
      <AiConciergeModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary>
      <PRProvider>
        <MainLayout />
      </PRProvider>
    </ErrorBoundary>
  );
}

export default App;
