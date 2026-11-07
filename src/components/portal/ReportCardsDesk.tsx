import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Award,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  User,
  GraduationCap,
} from 'lucide-react';
import { StudentRecord } from '../../types';
import { ReportCardModal } from './ReportCardModal';

export const ReportCardsDesk: React.FC = () => {
  const { students, marks, classes } = useSchool();
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReportStudent, setActiveReportStudent] = useState<StudentRecord | null>(null);

  const filteredStudents = students.filter((s) => {
    if (selectedClassId !== 'all' && s.classId !== selectedClassId) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = `${s.firstName} ${s.lastName}`.toLowerCase();
      const adm = s.admissionNo.toLowerCase();
      return name.includes(q) || adm.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            CBSE Continuous Evaluation & Report Cards Desk
          </h2>
          <p className="text-xs text-slate-500">
            Generate and print verified CBSE Term 1 / Term 2 report cards with grading, attendance, and teacher remarks.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Classes (Pre-K to Class X)</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or Adm No..."
              className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-48"
            />
          </div>
        </div>
      </div>

      {/* 2. Student Report Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((std) => {
          const studentMarks = marks.filter((m) => m.studentId === std.id);
          const hasMarks = studentMarks.length > 0;
          const avgScore = hasMarks
            ? Math.round(
                studentMarks.reduce((sum, m) => sum + (m.marksObtained / m.maxMarks) * 100, 0) /
                  studentMarks.length
              )
            : null;

          return (
            <div
              key={std.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Adm No: {std.admissionNo}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm font-serif pt-1">
                      {std.firstName} {std.lastName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {std.className} • Section {std.section}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                    {std.firstName[0]}
                    {std.lastName[0]}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Subjects Evaluated:</span>
                    <span className="font-bold font-mono text-slate-900">
                      {studentMarks.length} / 5
                    </span>
                  </div>
                  {avgScore !== null && (
                    <div className="flex justify-between text-slate-600">
                      <span>Average Performance:</span>
                      <span className="font-bold font-mono text-emerald-700">{avgScore}%</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Guardian:</span>
                    <span className="text-slate-700 truncate max-w-[120px]">
                      {std.guardianName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {hasMarks ? 'Marks recorded' : 'Pending marks entry'}
                </span>
                <button
                  onClick={() => setActiveReportStudent(std)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Report Card</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Card Modal */}
      {activeReportStudent && (
        <ReportCardModal
          student={activeReportStudent}
          marks={marks}
          onClose={() => setActiveReportStudent(null)}
        />
      )}
    </div>
  );
};
