import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Info,
  Calendar,
  Building,
} from 'lucide-react';

export const DisclosuresSection: React.FC = () => {
  const { disclosures, contactSettings, cbseResults } = useSchool();
  const [activeSection, setActiveSection] = useState<'all' | 'documents' | 'results' | 'staff'>('all');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
            Statutory Public Disclosures
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Mandatory Public Disclosure (Appendix IX)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In compliance with CBSE Circular No. 03/2021 and Affiliation Bye-Laws Appendix IX, all verified statutory documents, infrastructure audits, and academic results are published here for public scrutiny.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Official Appendix IX</span>
          </button>
        </div>
      </div>

      {/* 2. Official Appendix IX Tables Format */}
      <div className="space-y-10">
        {/* PART A: GENERAL INFORMATION */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 text-white px-6 py-3 font-serif font-bold text-sm flex items-center justify-between">
            <span>A: GENERAL INFORMATION</span>
            <span className="text-xs font-sans text-amber-400 font-normal">CBSE Mandatory Disclosure</span>
          </div>
          <table className="w-full text-left text-xs divide-y divide-slate-100">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600 w-1/3">1. Name of the School</td>
                <td className="py-3 px-6 font-bold text-slate-900">Smt Drakshayani Kalyanshettar Public School</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">2. Affiliation No. (If Applicable)</td>
                <td className="py-3 px-6 font-mono text-slate-900 font-bold">{contactSettings.affiliationNumber}</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">3. School Code (If Applicable)</td>
                <td className="py-3 px-6 font-mono text-slate-900 font-bold">{contactSettings.schoolNumber}</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">4. Complete Address with PIN Code</td>
                <td className="py-3 px-6 text-slate-800">
                  {contactSettings.addressLine1}, {contactSettings.addressLine2}, {contactSettings.city} – {contactSettings.pincode}, {contactSettings.state}, India.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">5. School Email ID</td>
                <td className="py-3 px-6 font-mono text-slate-800">{contactSettings.primaryPublicEmail}</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">6. Contact Details (Mobile / Landline)</td>
                <td className="py-3 px-6 font-mono text-slate-800">{contactSettings.primaryTelephone} / {contactSettings.secondaryTelephone}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PART B: DOCUMENTS AND INFORMATION */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 text-white px-6 py-3 font-serif font-bold text-sm flex items-center justify-between">
            <span>B: DOCUMENTS AND INFORMATION</span>
            <span className="text-xs font-sans text-amber-400 font-normal">Statutory Compliance Certificates</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50">
                  <th className="py-3 px-6">Sl No</th>
                  <th className="py-3 px-6">Document Title</th>
                  <th className="py-3 px-6">Issuing Authority</th>
                  <th className="py-3 px-6">Validity / Issue Date</th>
                  <th className="py-3 px-6 text-right no-print">Download Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {disclosures.map((doc, idx) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-6 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      {doc.title}
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">{doc.issuingAuthority}</td>
                    <td className="py-3.5 px-6 text-slate-600">
                      {doc.issueDate} {doc.expiryDate ? `(Valid till ${doc.expiryDate})` : ''}
                    </td>
                    <td className="py-3.5 px-6 text-right no-print">
                      <button
                        onClick={() => alert(`Accessing verified PDF for: ${doc.title}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-[11px] transition-colors"
                      >
                        <Download className="w-3 h-3 text-slate-500" />
                        <span>View PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PART C: RESULT AND ACADEMICS */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 text-white px-6 py-3 font-serif font-bold text-sm flex items-center justify-between">
            <span>C: RESULT AND ACADEMICS</span>
            <span className="text-xs font-sans text-amber-400 font-normal">CBSE Class X AISSE Results</span>
          </div>

          <table className="w-full text-left text-xs divide-y divide-slate-100">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-6">Academic Year</th>
                <th className="py-3 px-6 tabular-nums">Registered Students</th>
                <th className="py-3 px-6 tabular-nums">Passed Students</th>
                <th className="py-3 px-6 tabular-nums font-bold text-amber-800">Pass Percentage</th>
                <th className="py-3 px-6">Official Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cbseResults.map((r, i) => (
                <tr key={i}>
                  <td className="py-3.5 px-6 font-bold text-slate-900">{r.academicYear}</td>
                  <td className="py-3.5 px-6 tabular-nums text-slate-700">{r.appearedCount}</td>
                  <td className="py-3.5 px-6 tabular-nums text-slate-700">{r.passedCount}</td>
                  <td className="py-3.5 px-6 tabular-nums font-bold text-emerald-700">{r.passPercentage}%</td>
                  <td className="py-3.5 px-6 text-slate-500">{r.supportingReportNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PART D: STAFF (TEACHING) DISCLOSURE */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-900 text-white px-6 py-3 font-serif font-bold text-sm flex items-center justify-between">
            <span>D: STAFF (TEACHING) DISCLOSURE</span>
            <span className="text-xs font-sans text-amber-400 font-normal">Affiliation Norms</span>
          </div>

          <table className="w-full text-left text-xs divide-y divide-slate-100">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600 w-1/3">1. Principal</td>
                <td className="py-3 px-6 font-bold text-slate-900">1</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">2. Total No. of Teachers</td>
                <td className="py-3 px-6 font-bold text-slate-900">24 (Verified)</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600 pl-10">◦ PGT</td>
                <td className="py-3 px-6 text-slate-700">0 (Classes XI–XII not conducted)</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600 pl-10">◦ TGT</td>
                <td className="py-3 px-6 text-slate-700">8</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600 pl-10">◦ PRT</td>
                <td className="py-3 px-6 text-slate-700">10</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600 pl-10">◦ NTT (Kreedo Certified)</td>
                <td className="py-3 px-6 text-slate-700">4</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600 pl-10">◦ PET (Physical Education)</td>
                <td className="py-3 px-6 text-slate-700">1</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600 pl-10">◦ Librarian</td>
                <td className="py-3 px-6 text-slate-700">1</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">3. Teachers to Section Ratio</td>
                <td className="py-3 px-6 font-bold text-slate-900">1.5 : 1 (CBSE Compliant)</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">4. Details of Special Educator</td>
                <td className="py-3 px-6 text-slate-800">Appointed as per CBSE inclusive guidelines</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold text-slate-600">5. Details of Counselor and Wellness Teacher</td>
                <td className="py-3 px-6 text-slate-800">Dedicated adolescent counselor on campus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
