import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  Award,
  CreditCard,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Printer,
  Plus,
} from 'lucide-react';
import { ReportCardModal } from './ReportCardModal';
import { FeeReceiptModal } from './FeeReceiptModal';
import { FeePayment } from '../../types';

export const ParentPortalView: React.FC = () => {
  const {
    students,
    feeInvoices,
    homework,
    marks,
    applyLeave,
    recordFeePayment,
    currentUser,
  } = useSchool();

  // Linked children: Rohan Patil (std_001) & Sneha Patil (std_002)
  const linkedChildren = students.filter(
    (s) => currentUser.linkedStudentIds?.includes(s.id) || s.guardianName.includes('Savitri')
  );

  const [activeChildId, setActiveChildId] = useState<string>(
    linkedChildren[0]?.id || 'std_001'
  );

  const activeChild = students.find((s) => s.id === activeChildId) || linkedChildren[0];

  // Modals
  const [showReportCard, setShowReportCard] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);

  // Pay fee modal
  const [payingInvoice, setPayingInvoice] = useState<any>(null);
  const [payMode, setPayMode] = useState<'Online/UPI' | 'Card'>('Online/UPI');

  // Leave form
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  // Child specific invoices
  const childInvoices = feeInvoices.filter((i) => i.studentId === activeChild?.id);
  const childHomework = homework.filter((h) => h.classId === activeChild?.classId);

  const handlePayFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingInvoice) return;

    const payment = recordFeePayment(
      payingInvoice.id,
      payingInvoice.balanceAmount,
      'Online/UPI',
      `UPI/PAY-${Date.now().toString().slice(-6)}`
    );

    setPayingInvoice(null);
    setActiveReceipt(payment);
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStart || !leaveEnd || !leaveReason) return;
    applyLeave({
      applicantType: 'student',
      applicantId: activeChild?.id || 'std_001',
      applicantName: `${activeChild?.firstName} ${activeChild?.lastName} (${activeChild?.className})`,
      classOrDesignation: `${activeChild?.className}-${activeChild?.section}`,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason,
    });
    setLeaveStart('');
    setLeaveEnd('');
    setLeaveReason('');
  };

  if (!activeChild) {
    return <div className="p-8 text-center text-xs text-slate-500">No linked student records found.</div>;
  }

  return (
    <div className="space-y-8">
      {/* 1. Header with Child Switcher */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Parent & Guardian Portal
            </span>
            <h1 className="text-2xl font-serif font-bold text-white">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-xs text-slate-300">
              Access fee statements, download CBSE report cards, and track academic assignments for your children.
            </p>
          </div>

          {/* Child Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-800 rounded-xl border border-slate-700">
            {linkedChildren.map((child) => (
              <button
                key={child.id}
                onClick={() => setActiveChildId(child.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeChild.id === child.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{child.firstName}</span>
                <span className="text-[11px] opacity-80">({child.className})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Active Child KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Student</span>
          <div className="font-bold font-serif text-slate-900 text-base">
            {activeChild.firstName} {activeChild.lastName}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">Adm: {activeChild.admissionNo}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Class & Section</span>
          <div className="font-bold text-slate-900 text-base">
            {activeChild.className} – {activeChild.section}
          </div>
          <div className="text-[11px] text-slate-500">Roll Number: #{activeChild.rollNo || '14'}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Attendance Rate</span>
          <div className="font-bold text-emerald-700 text-base tabular-nums">
            96.4%
          </div>
          <div className="text-[11px] text-emerald-800">Regular attendance</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">CBSE Report Card</span>
          <button
            onClick={() => setShowReportCard(true)}
            className="w-full mt-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>View & Print</span>
          </button>
        </div>
      </div>

      {/* 3. Fee Statements & Online Pay Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              Fee Invoices for {activeChild.firstName}
            </h3>
          </div>
          <span className="text-xs text-slate-500">Secure Online Fee Gateway</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-4">Invoice No</th>
                <th className="py-2.5 px-4">Term</th>
                <th className="py-2.5 px-4 text-right tabular-nums">Total Payable</th>
                <th className="py-2.5 px-4 text-right tabular-nums">Amount Paid</th>
                <th className="py-2.5 px-4 text-right tabular-nums">Outstanding Due</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Online Pay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {childInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{inv.invoiceNo}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{inv.term}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    ₹{(inv.totalAmount - inv.concessionAmount).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-emerald-800 font-semibold">
                    ₹{inv.paidAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                    ₹{inv.balanceAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`capitalize text-[11px] font-semibold px-2 py-0.5 rounded ${
                        inv.status === 'paid'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {inv.balanceAmount > 0 ? (
                      <button
                        onClick={() => setPayingInvoice(inv)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs shadow-sm transition-colors"
                      >
                        Pay ₹{inv.balanceAmount.toLocaleString('en-IN')}
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-semibold text-xs flex items-center justify-end gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Paid</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Homework & Leave Application Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Homework (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              Active Homework & Assignments ({childHomework.length})
            </h3>
          </div>

          <div className="space-y-3">
            {childHomework.map((hw) => (
              <div key={hw.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{hw.subject}</span>
                  <span className="text-[11px] text-slate-500">Due: <strong>{hw.dueDate}</strong></span>
                </div>
                <h4 className="text-xs font-semibold text-amber-900">{hw.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{hw.instructions}</p>
                <div className="text-[11px] text-slate-400 pt-1">Assigned by: {hw.teacherName}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Apply Student Leave (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <Calendar className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              Apply for Student Leave
            </h3>
          </div>

          <form onSubmit={handleLeaveSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">From Date *</label>
                <input
                  type="date"
                  required
                  value={leaveStart}
                  onChange={(e) => setLeaveStart(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">To Date *</label>
                <input
                  type="date"
                  required
                  value={leaveEnd}
                  onChange={(e) => setLeaveEnd(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Reason for Leave *</label>
              <textarea
                rows={3}
                required
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                placeholder="e.g. Medical illness or family function..."
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded transition-colors"
            >
              Submit Leave Application
            </button>
          </form>
        </div>
      </div>

      {/* Online Pay Modal Simulation */}
      {payingInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[11px] uppercase tracking-wider text-amber-700 font-bold">
                Online Fee Payment Gateway
              </span>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Fee Settlement for {activeChild.firstName}
              </h3>
              <p className="text-xs text-slate-500">
                Invoice #{payingInvoice.invoiceNo} · Term: {payingInvoice.term}
              </p>
            </div>

            <form onSubmit={handlePayFee} className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg text-center space-y-1">
                <span className="text-xs text-slate-500">Payable Amount</span>
                <div className="text-2xl font-bold font-mono text-emerald-800">
                  ₹{payingInvoice.balanceAmount.toLocaleString('en-IN')}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPayMode('Online/UPI')}
                    className={`py-2 px-3 border rounded-lg font-semibold ${
                      payMode === 'Online/UPI' ? 'border-amber-600 bg-amber-50 text-amber-900' : 'border-slate-200'
                    }`}
                  >
                    UPI (GPay / PhonePe)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayMode('Card')}
                    className={`py-2 px-3 border rounded-lg font-semibold ${
                      payMode === 'Card' ? 'border-amber-600 bg-amber-50 text-amber-900' : 'border-slate-200'
                    }`}
                  >
                    Debit / Credit Card
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPayingInvoice(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  Pay ₹{payingInvoice.balanceAmount.toLocaleString('en-IN')} & Get Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Card Modal */}
      {showReportCard && (
        <ReportCardModal
          student={activeChild}
          marks={marks}
          onClose={() => setShowReportCard(false)}
        />
      )}

      {/* Fee Receipt Modal */}
      {activeReceipt && (
        <FeeReceiptModal
          payment={activeReceipt}
          onClose={() => setActiveReceipt(null)}
        />
      )}
    </div>
  );
};
