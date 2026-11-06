import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  School,
  LogIn,
  Search,
  Globe,
  Phone,
  Mail,
  UserCheck,
  Menu,
  X,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ShieldAlert,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const {
    currentUser,
    setCurrentRole,
    openLoginForRole,
    openSuperAdminLogin,
    isPortalView,
    setIsPortalView,
    contactSettings,
    language,
    setLanguage,
  } = useSchool();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'student_life', label: 'Student Life' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'news_events', label: 'News & Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'disclosures', label: 'Disclosures' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsPortalView(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full max-w-full overflow-hidden">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-3 sm:px-6 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Affiliation & School Info */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs min-w-0">
            <span className="font-semibold text-amber-400 whitespace-nowrap">
              <span className="hidden sm:inline">CBSE Affiliation No: </span>
              <span className="sm:hidden">CBSE: </span>
              {contactSettings.affiliationNumber}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 whitespace-nowrap">
              <span className="hidden sm:inline">School No: </span>
              <span className="sm:hidden">Code: </span>
              {contactSettings.schoolNumber}
            </span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-slate-400 truncate">J K Education Society (R), Hubli</span>
          </div>

          {/* Right: Actions & Role switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Phone (desktop only) */}
            <a
              href={`tel:${contactSettings.primaryTelephone}`}
              className="hidden md:flex items-center gap-1 hover:text-white transition-colors text-[11px]"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{contactSettings.primaryTelephone}</span>
            </a>

            {/* Language Selector */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-800 rounded px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs">
              <Globe className="w-3 h-3 text-slate-400 hidden sm:inline" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1 rounded ${language === 'en' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
                title="English"
              >
                EN
              </button>
              <span className="text-slate-600">/</span>
              <button
                onClick={() => setLanguage('kn')}
                className={`px-1 rounded ${language === 'kn' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
                title="Kannada"
              >
                ಕನ್ನಡ
              </button>
              <span className="text-slate-600">/</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1 rounded ${language === 'hi' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
                title="Hindi"
              >
                हिन्दी
              </button>
            </div>

            {/* Persona Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded px-2 py-0.5 hover:bg-amber-500/30 transition-colors text-[10px] sm:text-xs"
                title="Select role-specific login portal"
              >
                <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="capitalize font-medium truncate max-w-[80px] sm:max-w-none">
                  {currentUser.role.replace('_', ' ')}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-72 sm:w-80 bg-white text-slate-900 border border-slate-200 rounded-xl shadow-2xl py-2 z-50 text-left">
                  <div className="px-3.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Dedicated Portal Logins:</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold">
                      Separate Login Pages
                    </span>
                  </div>

                  <div className="py-1">
                    {[
                      { key: 'parent', label: 'Parent & Guardian Portal', sub: 'Mobile / OTP • Linked ward progress' },
                      { key: 'student', label: 'Student Learning Portal', sub: 'Admission No • Timetable & homework' },
                      { key: 'teacher', label: 'Teacher & Faculty Portal', sub: 'Emp ID • Attendance & marks desk' },
                      { key: 'principal', label: 'Principal & Leadership Desk', sub: 'Leadership Key • TC & admissions' },
                      { key: 'accountant', label: 'Accounts & Bursar Desk', sub: 'Bursar ID • Fee ledger & receipts' },
                      { key: 'website_editor', label: 'Website Editor & CMS', sub: 'Media Email • Public announcements' },
                    ].map((role) => (
                      <button
                        key={role.key}
                        onClick={() => {
                          openLoginForRole(role.key);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0 ${
                          currentUser.role === role.key ? 'bg-amber-50 font-semibold text-amber-950' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-900">{role.label}</span>
                          <span className="text-[10px] text-indigo-600 font-semibold">Login Page →</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">{role.sub}</div>
                      </button>
                    ))}
                  </div>

                  {/* Dedicated Super Admin Standalone Action */}
                  <div className="pt-2 mt-1 border-t border-slate-100 px-2 pb-1">
                    <div className="text-[10px] font-bold text-red-700 uppercase tracking-wider px-2 py-0.5">
                      Root Security Access
                    </div>
                    <button
                      onClick={() => {
                        openSuperAdminLogin();
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-red-950 text-white hover:bg-red-900 transition-colors border border-red-800 flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-xs text-red-200 group-hover:text-white">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                          <span>Super Admin Root Console</span>
                        </div>
                        <div className="text-[10px] text-red-300/80 font-normal mt-0.5">
                          Master key • 2FA token • Unrestricted system audit
                        </div>
                      </div>
                      <span className="text-[10px] bg-red-800 text-amber-300 px-2 py-0.5 rounded font-mono font-bold shrink-0">
                        OPEN →
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar: Zone 1 (Brand/Logo), Zone 2 (Nav), Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 h-16 sm:h-20 w-full">
          {/* Zone 1: Brand Wordmark with Shortcut Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left min-w-0 max-w-[calc(100%-80px)] md:max-w-none group focus:outline-none"
          >
            {/* Shortcut Logo Badge */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-900 text-amber-400 flex flex-col items-center justify-center shadow-sm border border-slate-800 group-hover:scale-105 transition-transform shrink-0">
              <span className="font-serif font-black text-xs sm:text-xs tracking-wider text-amber-400 leading-none">DKPS</span>
              <span className="text-[7px] sm:text-[8px] font-sans text-slate-300 font-bold tracking-tight uppercase mt-0.5">HUBLI</span>
            </div>
            
            {/* Shortcut Brand Name Text */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-slate-900 font-serif leading-tight whitespace-nowrap">
                  DKPS Hubli
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 text-[9px] sm:text-[10px] font-semibold border border-amber-200 shrink-0">
                  CBSE 830277
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-medium leading-tight truncate">
                Smt Drakshayani Kalyanshettar Public School
              </div>
              <div className="hidden sm:block text-[10px] text-slate-400 font-medium tracking-wide truncate">
                Managed by J K Education Society (R), Hubli
              </div>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-700">
            {navLinks.slice(0, 6).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 ${
                  activeTab === link.id && !isPortalView
                    ? 'text-slate-900 font-semibold border-b-2 border-amber-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Dropdown for Remaining Links */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-slate-600 hover:text-slate-900 py-1 font-medium whitespace-nowrap">
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-2">
                {navLinks.slice(6).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Zone 3: Primary Action & Quick Search */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search website (Ctrl + K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {isPortalView ? (
              <button
                onClick={() => setIsPortalView(false)}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Exit Portal
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => openLoginForRole('parent')}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
                  title="Open School Community Portal Logins"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>Portal Logins</span>
                </button>
                <button
                  onClick={openSuperAdminLogin}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-300 bg-slate-950 hover:bg-red-950/80 border border-red-900/50 hover:border-red-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  title="Open Dedicated Super Admin Security Console"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  <span>Super Admin</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu: Strictly full width and responsive */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 w-full shadow-lg">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Menu Navigation
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === link.id && !isPortalView
                    ? 'bg-amber-100 text-amber-950 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                if (isPortalView) {
                  setIsPortalView(false);
                } else {
                  openLoginForRole('parent');
                }
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>{isPortalView ? 'Return to Public Website' : 'Community Portal Logins'}</span>
            </button>

            {!isPortalView && (
              <button
                onClick={() => {
                  openSuperAdminLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-red-200 bg-red-950 border border-red-800 rounded-lg shadow-sm"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Super Admin Root Security Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
