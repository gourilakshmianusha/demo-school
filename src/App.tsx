/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeSection } from './components/public/HomeSection';
import { AboutSection } from './components/public/AboutSection';
import { AcademicsSection } from './components/public/AcademicsSection';
import { AdmissionsSection } from './components/public/AdmissionsSection';
import { StudentLifeSection } from './components/public/StudentLifeSection';
import { FacilitiesSection } from './components/public/FacilitiesSection';
import { NewsEventsSection } from './components/public/NewsEventsSection';
import { GallerySection } from './components/public/GallerySection';
import { DisclosuresSection } from './components/public/DisclosuresSection';
import { ContactSection } from './components/public/ContactSection';
import { SearchModal } from './components/public/SearchModal';
import { PortalLayout } from './components/portal/PortalLayout';
import { LoginPage } from './components/auth/LoginPage';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const MainApp: React.FC = () => {
  const { isPortalView, isLoginPageOpen, toasts, removeToast } = useSchool();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans overflow-x-hidden w-full max-w-full">
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-start gap-2.5 text-xs transition-all ${
              toast.type === 'success'
                ? 'bg-slate-900 text-white border-slate-800'
                : toast.type === 'warning'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            )}
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white shrink-0 ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {isLoginPageOpen ? (
        <LoginPage />
      ) : isPortalView ? (
        <PortalLayout />
      ) : (
        <>
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenSearch={() => setSearchOpen(true)}
          />

          <main className="flex-1">
            {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
            {activeTab === 'about' && <AboutSection />}
            {activeTab === 'academics' && <AcademicsSection />}
            {activeTab === 'admissions' && <AdmissionsSection />}
            {activeTab === 'student_life' && <StudentLifeSection />}
            {activeTab === 'facilities' && <FacilitiesSection />}
            {activeTab === 'news_events' && <NewsEventsSection />}
            {activeTab === 'gallery' && <GallerySection />}
            {activeTab === 'disclosures' && <DisclosuresSection />}
            {activeTab === 'contact' && <ContactSection />}
          </main>

          <Footer setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <MainApp />
    </SchoolProvider>
  );
}
