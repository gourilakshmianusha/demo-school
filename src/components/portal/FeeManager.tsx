import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  CreditCard,
  Receipt,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Printer,
  DollarSign,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  Check,
} from 'lucide-react';
import { FeeInvoice, FeePayment } from '../../types';
import { FeeReceiptModal } from './FeeReceiptModal';

export const FeeManager: React.FC = () => {
  const {
    feeInvoices,
    feePayments,
    students,
    recordFeePayment,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    deletePayment,
    showToast,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'invoices' | 'payments'>('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);

  // Modals
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<FeeInvoice | null>(null);

  // Payment collection modal state
  const [collectAmount, setCollectAmount] = useState<number>(0);
  const [collectMode, setCollectMode] = useState<'Cash' | 'Cheque' | 'Online/UPI' | 'NEFT/RTGS'>('Online/UPI');
  const [collectRef, setCollectRef] = useState('');

  // Active receipt preview
  const [activeReceiptPayment, setActiveReceiptPayment] = useState<FeePayment | null>(null);

  // Create Invoice Form State
  const [invoiceForm, setInvoiceForm] = useState<{
    studentId: string;
    studentName: string;
    className: string;
    term: 'Term 1' | 'Term 2' | 'Annual';
    academicYear: string;
    dueDate: string;
    totalAmount: number;
    concessionAmount: number;
  }>({
    studentId: students[0]?.id || '',
    studentName: students[0] ? `${students[0].firstName} ${students[0].lastName}` : '',
    className: students[0]?.className || 'Class I',
    term: 'Term 1',
    academicYear: '2024-2025',
    dueDate: '2024-12-15',
    totalAmount: 18000,
    concessionAmount: 0,
  });

  const handleOpenAddInvoice = () => {
    const std = students[0];
    setInvoiceForm({
      studentId: std?.id || '',
      studentName: std ? `${std.firstName} ${std.lastName}` : '',
      className: std?.className || 'Class I',
      term: 'Term 2',
      academicYear: '2024-2025',
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      totalAmount: 18500,
      concessionAmount: 0,
    });
    setIsAddInvoiceOpen(true);
  };

  const handleStudentSelect = (stdId: string) => {
    const s = students.find((std) => std.id === stdId);
    if (s) {
      setInvoiceForm((prev) => ({
        ...prev,
        studentId: s.id,
        studentName: `${s.firstName} ${s.lastName}`,
        className: `${s.className} – ${s.section}`,
      }));
    }
  };

  const handleSaveAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceForm.studentName || invoiceForm.totalAmount <= 0) {
      showToast('Please select a student and enter a valid fee amount.', 'warning');
      return;
    }

    createInvoice({
      studentId: invoiceForm.studentId,
      studentName: invoiceForm.studentName,
      className: invoiceForm.className,
      term: invoiceForm.term,
      academicYear: invoiceForm.academicYear,
      dueDate: invoiceForm.dueDate,
      totalAmount: Number(invoiceForm.totalAmount),
      concessionAmount: Number(invoiceForm.concessionAmount) || 0,
    });

    setIsAddInvoiceOpen(false);
  };

  const handleOpenEdit = (inv: FeeInvoice) => {
    setEditingInvoice(inv);
    setInvoiceForm({
      studentId: inv.studentId,
      studentName: inv.studentName,
      className: inv.className,
      term: inv.term,
      academicYear: inv.academicYear,
      dueDate: inv.dueDate,
      totalAmount: inv.totalAmount,
      concessionAmount: inv.concessionAmount,
    });
  };

  const handleSaveEditInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInvoice) return;

    updateInvoice(editingInvoice.id, {
      totalAmount: Number(invoiceForm.totalAmount),
      concessionAmount: Number(invoiceForm.concessionAmount) || 0,
      dueDate: invoiceForm.dueDate,
      term: invoiceForm.term,
    });
    setEditingInvoice(null);
  };

  const handleDeleteInvoice = (id: string, invoiceNo: string) => {
    if (window.confirm(`Are you sure you want to cancel and delete invoice "${invoiceNo}"?`)) {
      deleteInvoice(id);
    }
  };

  const handleDeletePayment = (id: string, receiptNo: string) => {
    if (window.confirm(`Are you sure you want to reverse payment receipt "${receiptNo}"? Invoice balance will be recalculated.`)) {
      deletePayment(id);
    }
  };

  const handleOpenCollect = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setCollectAmount(inv.balanceAmount);
    setCollectRef('');
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || collectAmount <= 0) return;

    const payment = recordFeePayment(
      selectedInvoice.id,
      collectAmount,
      collectMode,
      collectRef || undefined
    );

    setSelectedInvoice(null);
    setActiveReceiptPayment(payment);
  };

  const filteredInvoices = feeInvoices.filter((i) =>
    i.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = feePayments.filter((p) =>
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Fee Collection Counter & Accounts Desk
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200">
              {feeInvoices.length} Invoices
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full CRUD: Generate tuition fee invoices, collect payments, print official receipts, update fee terms, and reverse entries.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Tab switch */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'invoices' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Invoices ({feeInvoices.length})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'payments' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Receipts ({feePayments.length})
            </button>
          </div>

          {/* CREATE INVOICE */}
          <button
            onClick={handleOpenAddInvoice}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Invoice</span>
          </button>
        </div>
      </div>

      {/* 2. Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search invoice or student name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Invoice No</th>
                    <th className="py-3 px-4">Student Particulars</th>
                    <th className="py-3 px-4">Term</th>
                    <th className="py-3 px-4 text-right tabular-nums">Total (INR)</th>
                    <th className="py-3 px-4 text-right tabular-nums">Paid (INR)</th>
                    <th className="py-3 px-4 text-right tabular-nums">Balance Due</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">CRUD & Collection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        No fee invoices found. Click "Generate Invoice" to create one.
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {inv.invoiceNo}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{inv.studentName}</div>
                          <div className="text-[11px] text-slate-500">Due: {inv.dueDate} · {inv.className}</div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {inv.term}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-900">
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
                                : inv.status === 'partial'
                                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {inv.balanceAmount > 0 ? (
                              <button
                                onClick={() => handleOpenCollect(inv)}
                                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold shadow-sm transition-colors"
                              >
                                Collect Fee
                              </button>
                            ) : (
                              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Paid</span>
                              </span>
                            )}
                            <button
                              onClick={() => handleOpenEdit(inv)}
                              className="p-1 text-slate-600 hover:text-indigo-600 rounded transition-colors"
                              title="Edit Invoice"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteInvoice(inv.id, inv.invoiceNo)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                              title="Cancel / Delete Invoice"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Receipts Tab with Delete/Reversal */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Receipt No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Payment Date</th>
                  <th className="py-3 px-4">Mode & Reference</th>
                  <th className="py-3 px-4 text-right tabular-nums">Amount Received</th>
                  <th className="py-3 px-4 text-right">Receipt & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((pmt) => (
                  <tr key={pmt.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {pmt.receiptNo}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {pmt.studentName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">
                      {pmt.paymentDate}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{pmt.paymentMode}</div>
                      <div className="text-[11px] font-mono text-slate-500">{pmt.referenceNo}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold tabular-nums text-emerald-800">
                      ₹{pmt.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveReceiptPayment(pmt)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded text-[11px] flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5 text-slate-600" />
                          <span>Print Receipt</span>
                        </button>
                        <button
                          onClick={() => handleDeletePayment(pmt.id, pmt.receiptNo)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Reverse / Delete Payment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE INVOICE MODAL */}
      {isAddInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsAddInvoiceOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Generate Fee Invoice (Create)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Issue a new tuition or development fee invoice for an enrolled student.
            </p>

            <form onSubmit={handleSaveAddInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Enrolled Student *</label>
                <select
                  value={invoiceForm.studentId}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.className} – Adm: {s.admissionNo})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fee Term *</label>
                  <select
                    value={invoiceForm.term}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, term: e.target.value as 'Term 1' | 'Term 2' | 'Annual' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Fee Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={invoiceForm.totalAmount}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, totalAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Scholarship / Concession (INR)</label>
                  <input
                    type="number"
                    min={0}
                    value={invoiceForm.concessionAmount}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, concessionAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddInvoiceOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Generate Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT INVOICE MODAL */}
      {editingInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setEditingInvoice(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Edit Fee Invoice (Update)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Updating {editingInvoice.invoiceNo} for {editingInvoice.studentName}
            </p>

            <form onSubmit={handleSaveEditInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Fee Term *</label>
                <select
                  value={invoiceForm.term}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, term: e.target.value as 'Term 1' | 'Term 2' | 'Annual' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Amount (INR)</label>
                  <input
                    type="number"
                    required
                    value={invoiceForm.totalAmount}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, totalAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingInvoice(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Update Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COLLECT FEE PAYMENT MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Record Fee Payment
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Invoice #{selectedInvoice.invoiceNo} · {selectedInvoice.studentName}
            </p>

            <form onSubmit={handleExecutePayment} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-mono">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Already Paid:</span>
                  <span className="font-mono text-emerald-700">₹{selectedInvoice.paidAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1">
                  <span>Remaining Balance:</span>
                  <span className="font-mono">₹{selectedInvoice.balanceAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount to Collect (INR) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={selectedInvoice.balanceAmount}
                  value={collectAmount}
                  onChange={(e) => setCollectAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={collectMode}
                  onChange={(e) => setCollectMode(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Online/UPI">Online / UPI (Google Pay, PhonePe)</option>
                  <option value="Cash">Cash at Counter</option>
                  <option value="Cheque">Bank Cheque</option>
                  <option value="NEFT/RTGS">NEFT / Net Banking</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reference / UTR / Cheque No</label>
                <input
                  type="text"
                  value={collectRef}
                  onChange={(e) => setCollectRef(e.target.value)}
                  placeholder="Optional reference number"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Payment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINT RECEIPT MODAL */}
      {activeReceiptPayment && (
        <FeeReceiptModal
          payment={activeReceiptPayment}
          onClose={() => setActiveReceiptPayment(null)}
        />
      )}
    </div>
  );
};
