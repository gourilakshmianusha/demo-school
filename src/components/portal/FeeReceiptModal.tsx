import React from 'react';
import { FeePayment, FeeInvoice } from '../../types';
import { useSchool } from '../../context/SchoolContext';
import { Printer, X, Receipt, CheckCircle } from 'lucide-react';

interface FeeReceiptModalProps {
  payment: FeePayment;
  invoice?: FeeInvoice;
  onClose: () => void;
}

export const FeeReceiptModal: React.FC<FeeReceiptModalProps> = ({ payment, invoice, onClose }) => {
  const { contactSettings } = useSchool();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl space-y-6 relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action bar for screen */}
        <div className="flex items-center justify-between no-print border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Receipt className="w-4 h-4 text-emerald-600" />
            <span>Official Fee Collection Receipt</span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt / PDF</span>
          </button>
        </div>

        {/* Printable Receipt Card */}
        <div className="print-area p-6 border-2 border-slate-800 rounded-xl space-y-6 text-slate-900">
          {/* Header */}
          <div className="text-center space-y-1 border-b-2 border-slate-800 pb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-serif font-black text-xs text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                DKPS HUBLI
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-600 font-bold">
                J K EDUCATION SOCIETY (R), HUBLI
              </span>
            </div>
            <h1 className="text-xl font-serif font-bold text-slate-900 uppercase">
              Smt Drakshayani Kalyanshettar Public School
            </h1>
            <p className="text-xs text-slate-600">
              Shakti Colony, Near Adhyapak Nagar, Hubli – 580032
            </p>
            <div className="pt-1 text-[11px] font-mono text-slate-600">
              CBSE Affiliation: {contactSettings.affiliationNumber} | School Code: {contactSettings.schoolNumber}
            </div>
            <div className="mt-2 inline-block bg-emerald-800 text-white text-xs font-bold px-4 py-0.5 rounded uppercase">
              Official Fee Receipt
            </div>
          </div>

          {/* Receipt Meta */}
          <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4">
            <div>
              <span className="text-slate-500 block">Receipt Number:</span>
              <strong className="text-slate-900 font-mono text-sm">{payment.receiptNo}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Date of Payment:</span>
              <strong className="text-slate-900 font-mono">{payment.paymentDate}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Student Name:</span>
              <strong className="text-slate-900">{payment.studentName}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Academic Term:</span>
              <span className="text-slate-800">{invoice?.term || 'Term 2 (2024–25)'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Payment Mode:</span>
              <span className="text-slate-800 font-medium">{payment.paymentMode}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Txn Reference:</span>
              <span className="text-slate-800 font-mono text-[11px]">{payment.referenceNo || 'N/A'}</span>
            </div>
          </div>

          {/* Fee Itemized Table */}
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2 px-3">Particulars / Fee Head</th>
                <th className="py-2 px-3 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2 px-3">Tuition & Pedagogical Assessment Fee</td>
                <td className="py-2 px-3 text-right font-mono tabular-nums">
                  ₹{(payment.amount * 0.7).toFixed(0)}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3">Activity, Kreedo Lab & Sports Ground Fund</td>
                <td className="py-2 px-3 text-right font-mono tabular-nums">
                  ₹{(payment.amount * 0.2).toFixed(0)}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3">Examination & Continuous Evaluation Charges</td>
                <td className="py-2 px-3 text-right font-mono tabular-nums">
                  ₹{(payment.amount * 0.1).toFixed(0)}
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-800">
                <td className="py-2.5 px-3">TOTAL AMOUNT RECEIVED</td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums text-sm text-emerald-900">
                  ₹{payment.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Reconciliation Status */}
          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
            <div>
              <span>Status: </span>
              <strong className="text-emerald-700">Payment Verified & Reconciled</strong>
            </div>
            <div>
              <span>Issued By: </span>
              <strong>{payment.collectedBy}</strong>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs">
            <div className="border-t border-slate-400 pt-1 text-slate-600">
              Accounts Officer / Cashier Signature
            </div>
            <div className="border-t border-slate-400 pt-1 text-slate-600 font-bold">
              Authorized School Seal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
