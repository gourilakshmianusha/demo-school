import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Award,
  CreditCard,
  Bell,
  FileCheck,
  BarChart3,
  Globe,
  ArrowLeft,
  ChevronRight,
  LogOut,
  RefreshCw,
  Menu,
  X,
  ShieldAlert,
  Sparkles,
  Receipt,
  Building2,
  Mail,
  ShieldCheck,
  Layers,
  Printer,
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { AdmissionsManager } from './AdmissionsManager';
import { StudentsManager } from './StudentsManager';
import { StaffManager } from './StaffManager';
import { AttendanceManager } from './AttendanceManager';
import { TimetableManager } from './TimetableManager';
import { HomeworkManager } from './HomeworkManager';
import { ExamsManager } from './ExamsManager';
import { FeeManager } from './FeeManager';
import { NoticeManager } from './NoticeManager';
import { CertificatesManager } from './CertificatesManager';
import { WebsiteCmsManager } from './WebsiteCmsManager';
import { ReportsView } from './ReportsView';
import { AcademicSetupDesk } from './AcademicSetupDesk';
import { ReportCardsDesk } from './ReportCardsDesk';
import { ParentPortalView } from './ParentPortalView';
import { StudentPortalView } from './StudentPortalView';

export const PortalLayout: React.FC = () => {
  const {
    currentUser,
    setIsPortalView,
    openLoginForRole,
    logoutUser,
    resetToDefaultData,
    students,
    staff,
    applications,
    enquiries,
    homework,
    marks,
    notices,
    facilities,
    events,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // If active user is parent or student, automatically route to their personal views
  const isParent = currentUser.role === 'parent';
  const isStudent = currentUser.role === 'student';

  // Live badge calculations
  const pendingAdmissions =
    applications.filter((a) => a.status === 'submitted' || a.status === 'under_review').length +
    enquiries.filter((e) => e.status === 'new').length;
  const activeStudents = students.filter((s) => s.status === 'active').length;
  const facultyCount = staff.length;
  const noticesCount = notices.length;
  const homeworkCount = homework.length;
  const cmsCount = facilities.length + events.length;

  // Rich, categorized navigation groups for full management coverage (18 desks)
  const navCategories = [
    {
      title: 'Core Administration & SIS',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
        { id: 'admissions', label: 'Admissions Pipeline', icon: Users, badge: pendingAdmissions > 0 ? `${pendingAdmissions} New` : undefined, badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
        { id: 'students', label: 'Student Directory & SIS', icon: GraduationCap, badge: `${activeStudents}`, badgeColor: 'bg-slate-100 text-slate-700' },
        { id: 'staff', label: 'Faculty & HR (OASIS 1.5:1)', icon: Award, badge: `${facultyCount}`, badgeColor: 'bg-slate-100 text-slate-700' },
        { id: 'certificates', label: 'Transfer Cert & Records', icon: FileCheck },
      ],
    },
    {
      title: 'Academics & Classroom',
      items: [
        { id: 'attendance', label: 'Class Attendance Register', icon: Calendar },
        { id: 'timetable', label: 'Timetable Grid', icon: Clock },
        { id: 'homework', label: 'Homework Desk', icon: BookOpen, badge: `${homeworkCount}`, badgeColor: 'bg-slate-100 text-slate-700' },
        { id: 'exams', label: 'CBSE Periodic Tests & Marks', icon: Award },
        { id: 'report_cards', label: 'CBSE Report Cards Desk', icon: Printer },
        { id: 'academic_setup', label: 'Class & Curriculum Setup', icon: Layers },
      ],
    },
    {
      title: 'Finance & Bursar Desk',
      items: [
        { id: 'fees', label: 'Fee Counter & Billing', icon: CreditCard, badge: 'INR', badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
        { id: 'dues', label: 'Fee Dues & Concessions', icon: Receipt },
        { id: 'reports', label: 'Financial & Strength Reports', icon: BarChart3 },
      ],
    },
    {
      title: 'Website CMS & Regulatory',
      items: [
        { id: 'notices', label: 'Circulars & Notice Broadcast', icon: Bell, badge: `${noticesCount}`, badgeColor: 'bg-amber-50 text-amber-900 border-amber-200' },
        { id: 'cms_facilities', label: 'Campus Facilities CMS', icon: Building2, badge: `${facilities.length}`, badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
        { id: 'cms_events', label: 'News & Events CMS', icon: Globe, badge: `${events.length}`, badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
        { id: 'contact_mgmt', label: 'School Contact & Routing', icon: Mail },
        { id: 'audit_provenance', label: 'Source Provenance Audit', icon: ShieldCheck },
      ],
    },
  ];

  // Lookup active title for header breadcrumb
  const allItems = navCategories.flatMap((c) => c.items);
  const activeItem = allItems.find((i) => i.id === activeTab);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      {/* Top Banner Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 px-3 sm:px-6 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Branding & Return Button */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsPortalView(false)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-200 transition-colors shrink-0 border border-slate-700 hover:border-slate-600"
              title="Return to Public School Website"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline">Website</span>
            </button>

            {/* School Branding */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-serif font-black text-xs text-amber-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 shrink-0">
                DKPS HUBLI
              </span>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 truncate">
                <span className="font-semibold text-white">Management ERP</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-amber-300 font-medium truncate">{activeItem?.label || 'Dashboard'}</span>
              </div>
            </div>
          </div>

          {/* Right: User indicator & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* User Profile Pill */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-2.5 sm:px-3 py-1 rounded-lg border border-slate-700 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-white block truncate max-w-[100px] sm:max-w-none">{currentUser.name}</span>
                <span className="text-[10px] text-amber-400 block -mt-0.5 capitalize truncate">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Switch Account button */}
            <button
              onClick={() => openLoginForRole()}
              className="hidden sm:inline-flex px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Switch user role or open dedicated login page"
            >
              Switch Role
            </button>

            {/* Reset Database Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset local ERP database to verified seed data?')) {
                  resetToDefaultData();
                }
              }}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60"
              title="Reset data store to verified initial values"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={logoutUser}
              className="px-2.5 sm:px-3 py-1 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-lg transition-colors border border-rose-800/50 flex items-center gap-1 shrink-0"
              title="Sign out of portal"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden xs:inline">Log Out</span>
            </button>

            {/* Mobile Sidebar Toggle Button */}
            {!isParent && !isStudent && (
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden p-1.5 text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700 shrink-0"
                aria-label="Toggle navigation drawer"
              >
                {mobileSidebarOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout - Strict Items-Start Alignment */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        {/* Conditional Sidebar: hidden if Parent or Student persona */}
        {!isParent && !isStudent && (
          <aside
            className={`${
              mobileSidebarOpen ? 'block' : 'hidden'
            } lg:block w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-16 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto pr-0 lg:pr-1 scrollbar-thin`}
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Management Modules</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                  {allItems.length} Desks
                </span>
              </div>

              {/* Categorized Menu Options */}
              {navCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {cat.title}
                  </div>
                  <div className="space-y-0.5">
                    {cat.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all text-left ${
                            isActive
                              ? 'bg-slate-900 text-white font-semibold shadow-sm'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-700'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border text-center shrink-0 ml-1.5 ${
                                isActive
                                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                                  : item.badgeColor || 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quick Persona Info Card at bottom of Sidebar */}
              <div className="pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block font-medium">Logged in persona:</span>
                    <span className="text-xs font-bold text-slate-800 capitalize truncate block">
                      {currentUser.role.replace('_', ' ')}
                    </span>
                  </div>
                  <button
                    onClick={() => openLoginForRole()}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 shrink-0"
                  >
                    Change →
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Dynamic Main Workspace View */}
        <main className="flex-1 min-w-0 w-full">
          {isParent ? (
            <ParentPortalView />
          ) : isStudent ? (
            <StudentPortalView />
          ) : (
            <>
              {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
              {activeTab === 'admissions' && <AdmissionsManager />}
              {activeTab === 'students' && <StudentsManager />}
              {activeTab === 'staff' && <StaffManager />}
              {activeTab === 'attendance' && <AttendanceManager />}
              {activeTab === 'timetable' && <TimetableManager />}
              {activeTab === 'homework' && <HomeworkManager />}
              {activeTab === 'exams' && <ExamsManager />}
              {activeTab === 'report_cards' && <ReportCardsDesk />}
              {activeTab === 'academic_setup' && <AcademicSetupDesk />}
              {activeTab === 'fees' && <FeeManager />}
              {activeTab === 'dues' && <FeeManager />}
              {activeTab === 'reports' && <ReportsView />}
              {activeTab === 'notices' && <NoticeManager />}
              {activeTab === 'cms_facilities' && <WebsiteCmsManager initialTab="facilities_crud" />}
              {activeTab === 'cms_events' && <WebsiteCmsManager initialTab="events_crud" />}
              {activeTab === 'cms' && <WebsiteCmsManager />}
              {activeTab === 'contact_mgmt' && <WebsiteCmsManager initialTab="contact_settings" />}
              {activeTab === 'audit_provenance' && <WebsiteCmsManager initialTab="migration_register" />}
              {activeTab === 'certificates' && <CertificatesManager />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
