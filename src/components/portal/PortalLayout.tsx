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
  FileText,
  FileCheck,
  BarChart3,
  Globe,
  Settings,
  ArrowLeft,
  UserCheck,
  ShieldAlert,
  School,
  ChevronRight,
  LogOut,
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
import { ParentPortalView } from './ParentPortalView';
import { StudentPortalView } from './StudentPortalView';

export const PortalLayout: React.FC = () => {
  const {
    currentUser,
    setCurrentRole,
    setIsPortalView,
    openLoginForRole,
    logoutUser,
    resetToDefaultData,
  } = useSchool();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // If active user is parent or student, automatically route to their personal views
  const isParent = currentUser.role === 'parent';
  const isStudent = currentUser.role === 'student';

  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'school_admin', 'principal'] },
    { id: 'admissions', label: 'Admissions Pipeline', icon: Users, roles: ['super_admin', 'school_admin', 'principal'] },
    { id: 'students', label: 'Student Directory', icon: GraduationCap, roles: ['super_admin', 'school_admin', 'principal', 'teacher'] },
    { id: 'staff', label: 'Faculty & HR', icon: Award, roles: ['super_admin', 'school_admin', 'principal'] },
    { id: 'attendance', label: 'Class Attendance', icon: Calendar, roles: ['super_admin', 'school_admin', 'principal', 'teacher'] },
    { id: 'timetable', label: 'Timetable Grid', icon: Clock, roles: ['super_admin', 'school_admin', 'principal', 'teacher'] },
    { id: 'homework', label: 'Homework Desk', icon: BookOpen, roles: ['super_admin', 'school_admin', 'principal', 'teacher'] },
    { id: 'exams', label: 'Exams & Marks', icon: Award, roles: ['super_admin', 'school_admin', 'principal', 'teacher'] },
    { id: 'fees', label: 'Fee Collection', icon: CreditCard, roles: ['super_admin', 'school_admin', 'principal', 'accountant'] },
    { id: 'notices', label: 'Notices & Circulars', icon: Bell, roles: ['super_admin', 'school_admin', 'principal', 'website_editor', 'teacher'] },
    { id: 'certificates', label: 'Certificates & TC', icon: FileCheck, roles: ['super_admin', 'school_admin', 'principal'] },
    { id: 'cms', label: 'Website CMS & Audit', icon: Globe, roles: ['super_admin', 'school_admin', 'website_editor'] },
    { id: 'reports', label: 'Reports & Export', icon: BarChart3, roles: ['super_admin', 'school_admin', 'principal', 'accountant'] },
  ];

  const allowedNavItems = navItems.filter(
    (item) => item.roles.includes(currentUser.role) || currentUser.role === 'super_admin'
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      {/* Top Banner Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPortalView(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Back to Public Website</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="font-serif font-black text-xs text-amber-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">DKPS HUBLI</span>
              <span className="font-serif font-semibold text-white">DKPS Hubli ERP</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 hidden lg:inline">Smt Drakshayani Kalyanshettar Public School</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active User Indicator */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="font-bold text-white">{currentUser.name}</span>
                <span className="text-[11px] text-amber-400 block -mt-0.5 capitalize">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Switch Account button */}
            <button
              onClick={() => openLoginForRole()}
              className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Open Role Login Pages"
            >
              Switch Account
            </button>

            {/* Logout Button */}
            <button
              onClick={logoutUser}
              className="px-3 py-1 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-lg transition-colors border border-rose-800/50 flex items-center gap-1"
              title="Sign out of portal"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>

            {/* Reset Database Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset local ERP database to verified seed data?')) {
                  resetToDefaultData();
                }
              }}
              className="hidden md:inline-flex px-2 py-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
              title="Reset data store"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col md:flex-row gap-6">
        {/* Conditional Sidebar: hidden if Parent or Student persona */}
        {!isParent && !isStudent && (
          <aside className="w-full md:w-64 shrink-0 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Management Modules
              </div>
              {allowedNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                      isActive
                        ? 'bg-slate-900 text-white font-semibold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Dynamic Main Workspace View */}
        <main className="flex-1 min-w-0">
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
              {activeTab === 'fees' && <FeeManager />}
              {activeTab === 'notices' && <NoticeManager />}
              {activeTab === 'certificates' && <CertificatesManager />}
              {activeTab === 'cms' && <WebsiteCmsManager />}
              {activeTab === 'reports' && <ReportsView />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
