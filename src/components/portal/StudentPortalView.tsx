import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Calendar,
  BookOpen,
  Award,
  Bell,
  Clock,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { ReportCardModal } from './ReportCardModal';

export const StudentPortalView: React.FC = () => {
  const { students, marks, homework, timetable, notices } = useSchool();

  // Active student: Rohan Patil (std_001, Class VIII-A)
  const student = students.find((s) => s.id === 'std_001') || students[0];
  const [showReportCard, setShowReportCard] = React.useState(false);

  const studentHomework = homework.filter((h) => h.classId === student?.classId);
  const studentTimetable = timetable.filter((t) => t.classId === student?.classId);
  const studentMarks = marks.filter((m) => m.studentId === student?.id);

  if (!student) return null;

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Student Academic Dashboard
            </span>
            <h1 className="text-2xl font-serif font-bold text-white">
              Hello, {student.firstName} {student.lastName}
            </h1>
            <p className="text-xs text-slate-300">
              Class {student.className} – Section {student.section} · Admission No: {student.admissionNo} · Roll No #{student.rollNo || '14'}
            </p>
          </div>

          <button
            onClick={() => setShowReportCard(true)}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Award className="w-3.5 h-3.5" />
            <span>My CBSE Report Card</span>
          </button>
        </div>
      </div>

      {/* 2. Today's Timetable & Homework Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Today's Timetable (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              Monday Class Schedule ({student.className}–{student.section})
            </h3>
          </div>

          <div className="space-y-2">
            {studentTimetable.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/70 rounded-lg border border-slate-200 text-xs transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-500 w-6">
                    P{slot.periodNumber}
                  </span>
                  <div>
                    <strong className="text-slate-900 text-sm block">{slot.subject}</strong>
                    <span className="text-slate-500 text-[11px]">{slot.teacherName} · {slot.room}</span>
                  </div>
                </div>
                <span className="font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 text-[11px]">
                  {slot.timeRange}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Homework Tasks (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              Pending Homework Tasks
            </h3>
          </div>

          <div className="space-y-3">
            {studentHomework.map((hw) => (
              <div key={hw.id} className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900">{hw.subject}</span>
                  <span className="text-[11px] text-slate-500">Due: <strong>{hw.dueDate}</strong></span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900">{hw.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{hw.instructions}</p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Teacher: {hw.teacherName}</span>
                  <span className="text-[11px] font-semibold text-emerald-700">Ready to Submit</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. My Academic Performance Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-base text-slate-900">
              Periodic Assessment Performance
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Current Standing: Distinction (A1)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {studentMarks.map((m) => (
            <div key={m.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 block truncate">{m.subject}</span>
              <div className="text-lg font-bold font-mono text-slate-900">
                {m.marksObtained} / {m.maxMarks}
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Grade {m.grade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showReportCard && (
        <ReportCardModal
          student={student}
          marks={marks}
          onClose={() => setShowReportCard(false)}
        />
      )}
    </div>
  );
};
