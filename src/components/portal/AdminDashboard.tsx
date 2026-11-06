import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  GraduationCap,
  CreditCard,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  Calendar,
  Building2,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tabKey: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const {
    students,
    staff,
    feeInvoices,
    enquiries,
    applications,
    contactSettings,
    facilities,
    disclosures,
  } = useSchool();

  // Metrics
  const totalStudents = students.filter((s) => s.status === 'active').length;
  const totalTeachers = staff.filter((s) => s.role === 'teacher').length;
  
  const totalInvoiced = feeInvoices.reduce((sum, i) => sum + i.totalAmount - i.concessionAmount, 0);
  const totalCollected = feeInvoices.reduce((sum, i) => sum + i.paidAmount, 0);
  const totalPending = feeInvoices.reduce((sum, i) => sum + i.balanceAmount, 0);

  const pendingEnquiries = enquiries.filter((e) => e.status === 'new').length;
  const pendingApplications = applications.filter((a) => a.status === 'submitted' || a.status === 'under_review').length;

  // Unverified items count
  const unverifiedFacilities = facilities.filter((f) => f.availability === 'Needs School Confirmation').length;
  const unverifiedDisclosures = disclosures.filter((d) => d.provenance.verificationStatus === 'needs_confirmation').length;
  const contactNeedsConfirmation = contactSettings.provenance.verificationStatus === 'needs_confirmation';
  const totalItemsNeedingConfirmation = (contactNeedsConfirmation ? 1 : 0) + unverifiedFacilities + unverifiedDisclosures;

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              School Management System (ERP)
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Executive Administration Dashboard
            </h1>
            <p className="text-xs text-slate-300">
              Smt Drakshayani Kalyanshettar Public School · CBSE Affiliation No: {contactSettings.affiliationNumber} · Hubli
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('admissions')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Review Admissions ({pendingApplications + pendingEnquiries})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Source-Content Verification Alert Banner */}
      {totalItemsNeedingConfirmation > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-amber-900 font-bold text-sm">
                {totalItemsNeedingConfirmation} Imported Items Require School Confirmation
              </strong>
              <p className="text-amber-800">
                To guarantee zero hallucination, imported contact emails, proposed transport/lab items, and draft fee scales are held in "Needs School Confirmation" state until approved by leadership.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('cms')}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-semibold shrink-0 transition-colors shadow-sm"
          >
            Open Verification Register →
          </button>
        </div>
      )}

      {/* 3. Key Operational KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Students</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tabular-nums">
            {totalStudents}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span className="text-emerald-700 font-medium">Pre-K to Class X</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Teaching Faculty</span>
            <GraduationCap className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tabular-nums">
            {totalTeachers}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>Ratio: <strong>1.5 : 1</strong></span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Fee Collection</span>
            <CreditCard className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-800 tabular-nums">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500">
            Dues Pending: ₹{totalPending.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Admissions Pipeline</span>
            <UserCheck className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tabular-nums">
            {applications.length}
          </div>
          <div className="text-[11px] text-slate-500">
            {pendingApplications} Pending Scrutiny
          </div>
        </div>
      </div>

      {/* 4. Quick Action Modules Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-serif text-slate-900">
          Core ERP Modules & Operational Desks
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          {[
            { id: 'students', label: 'Student Directory', sub: 'Profiles, admission records & TC' },
            { id: 'staff', label: 'Faculty & HR', sub: 'Staff directory & CBSE ratios' },
            { id: 'attendance', label: 'Daily Attendance', sub: 'Class register & absence reasons' },
            { id: 'timetable', label: 'Timetable Grid', sub: 'Class and teacher schedules' },
            { id: 'exams', label: 'Exams & Marks', sub: 'CBSE grades & printable report cards' },
            { id: 'fees', label: 'Fee Counter', sub: 'Collect payments & print receipts' },
            { id: 'homework', label: 'Homework Desk', sub: 'Post instructions & assignments' },
            { id: 'notices', label: 'Notices & Circulars', sub: 'Broadcast to parents & staff' },
            { id: 'certificates', label: 'Certificate Desk', sub: 'Issue TC & Study Certificates' },
            { id: 'cms', label: 'Website CMS & Audit', sub: 'Verify imported source records' },
            { id: 'reports', label: 'Reports & Export', sub: 'Strength, collection & CSV dump' },
            { id: 'academic_setup', label: 'Academic Setup', sub: 'Years, classes & subjects' },
          ].map((mod) => (
            <button
              key={mod.id}
              onClick={() => onNavigateTab(mod.id)}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all text-left space-y-1 shadow-sm"
            >
              <div className="font-bold text-slate-900 text-sm">{mod.label}</div>
              <div className="text-slate-500 text-[11px]">{mod.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
