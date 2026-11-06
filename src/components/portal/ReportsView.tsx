import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BarChart3,
  Download,
  Users,
  CreditCard,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { students, classes, feeInvoices, showToast } = useSchool();

  // Class wise strength
  const classBreakdown = classes.map((cls) => {
    const count = students.filter((s) => s.classId === cls.id && s.status === 'active').length;
    return {
      name: cls.name,
      count,
      category: cls.category,
    };
  });

  const totalStrength = students.filter((s) => s.status === 'active').length;

  const handleExportCSV = () => {
    const headers = ['Admission No', 'Student Name', 'Class', 'Section', 'Guardian', 'Phone', 'Status'];
    const rows = students.map((s) => [
      s.admissionNo,
      `"${s.firstName} ${s.lastName}"`,
      `"${s.className}"`,
      s.section,
      `"${s.guardianName}"`,
      s.guardianPhone,
      s.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DKPS_Student_Directory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Student directory exported to CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Institutional Reports & Analytics
          </h2>
          <p className="text-xs text-slate-500">
            Enrolment strength distribution, fee collection summaries, and administrative CSV exports.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export Students CSV</span>
        </button>
      </div>

      {/* Class-wise Strength Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-900 text-white font-serif font-bold text-sm flex items-center justify-between">
          <span>Student Enrolment Strength by Grade (Pre-K to Class X)</span>
          <span className="text-xs text-amber-400 font-sans font-normal">Total Strength: {totalStrength}</span>
        </div>

        <table className="w-full text-left text-xs divide-y divide-slate-100">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px]">
            <tr>
              <th className="py-2.5 px-4">Class</th>
              <th className="py-2.5 px-4">Stage</th>
              <th className="py-2.5 px-4 tabular-nums">Sections</th>
              <th className="py-2.5 px-4 tabular-nums text-right">Enrolled Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {classBreakdown.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-slate-900">{row.name}</td>
                <td className="py-2.5 px-4 capitalize text-slate-600">{row.category.replace('_', ' ')}</td>
                <td className="py-2.5 px-4 tabular-nums text-slate-600">A, B</td>
                <td className="py-2.5 px-4 tabular-nums font-mono font-bold text-right text-slate-900">
                  {row.count}
                </td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold border-t-2 border-slate-800">
              <td className="py-3 px-4">TOTAL ENROLMENT</td>
              <td className="py-3 px-4 text-slate-500">—</td>
              <td className="py-3 px-4 text-slate-500">—</td>
              <td className="py-3 px-4 text-right font-mono text-emerald-800 text-sm">
                {totalStrength} Students
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
