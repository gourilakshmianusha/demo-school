import React from 'react';
import { StudentRecord, MarkEntry } from '../../types';
import { useSchool } from '../../context/SchoolContext';
import { Printer, X, Award, CheckCircle } from 'lucide-react';

interface ReportCardModalProps {
  student: StudentRecord;
  marks: MarkEntry[];
  onClose: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({ student, marks, onClose }) => {
  const { contactSettings } = useSchool();

  const handlePrint = () => {
    window.print();
  };

  const studentMarks = marks.filter((m) => m.studentId === student.id);
  const totalMax = studentMarks.reduce((sum, m) => sum + m.maxMarks, 0);
  const totalObtained = studentMarks.reduce((sum, m) => sum + m.marksObtained, 0);
  const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : '0';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl space-y-6 relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action bar for screen */}
        <div className="flex items-center justify-between no-print border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Official CBSE Student Assessment Record</span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report Card / Save as PDF</span>
          </button>
        </div>

        {/* Printable Card Area */}
        <div className="print-area p-4 border-2 border-slate-800 rounded-xl space-y-6 text-slate-900">
          {/* School Letterhead Header */}
          <div className="text-center space-y-1 border-b-2 border-slate-800 pb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-serif font-black text-xs text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                DKPS HUBLI
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-600 font-bold">
                J K EDUCATION SOCIETY (R), HUBLI
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 uppercase tracking-tight">
              Smt Drakshayani Kalyanshettar Public School
            </h1>
            <p className="text-xs text-slate-600">
              Shakti Colony, Near Adhyapak Nagar, Hubli – 580032, Karnataka
            </p>
            <div className="pt-1 flex items-center justify-center gap-4 text-xs font-semibold font-mono text-slate-700">
              <span>CBSE Affiliation No: {contactSettings.affiliationNumber}</span>
              <span>·</span>
              <span>School Code: {contactSettings.schoolNumber}</span>
            </div>
            <div className="mt-2 inline-block bg-slate-900 text-white text-xs font-bold px-4 py-1 rounded uppercase tracking-wider">
              CONTINUOUS & COMPREHENSIVE PROGRESS REPORT (AY 2024–2025)
            </div>
          </div>

          {/* Student Profile Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-slate-300 pb-4">
            <div>
              <span className="text-slate-500 block">Student Name:</span>
              <strong className="text-slate-900">{student.firstName} {student.lastName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Admission Number:</span>
              <strong className="text-slate-900 font-mono">{student.admissionNo}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Class & Section:</span>
              <strong className="text-slate-900">{student.className} – {student.section}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Roll Number:</span>
              <strong className="text-slate-900 font-mono">{student.rollNo || '14'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Date of Birth:</span>
              <span className="text-slate-800">{student.dateOfBirth}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Mother/Guardian:</span>
              <span className="text-slate-800">{student.guardianName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Attendance:</span>
              <span className="text-slate-800 font-semibold">96.4%</span>
            </div>
            <div>
              <span className="text-slate-500 block">Assessment:</span>
              <span className="text-slate-800">Periodic Assessment 1</span>
            </div>
          </div>

          {/* Marks & Scholastic Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-300">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-300">Subject</th>
                  <th className="py-2.5 px-3 text-center border-r border-slate-300 tabular-nums">Max Marks</th>
                  <th className="py-2.5 px-3 text-center border-r border-slate-300 tabular-nums">Marks Obtained</th>
                  <th className="py-2.5 px-3 text-center border-r border-slate-300">CBSE Grade</th>
                  <th className="py-2.5 px-3">Teacher Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {studentMarks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-500">
                      No evaluation marks uploaded for this student yet.
                    </td>
                  </tr>
                ) : (
                  studentMarks.map((m) => (
                    <tr key={m.id}>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 border-r border-slate-300">
                        {m.subject}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-300 tabular-nums">
                        {m.maxMarks}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-900 border-r border-slate-300 tabular-nums">
                        {m.marksObtained}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-900 border-r border-slate-300">
                        {m.grade}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {m.remarks || 'Satisfactory progress'}
                      </td>
                    </tr>
                  ))
                )}
                {studentMarks.length > 0 && (
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-800">
                    <td className="py-2.5 px-3 border-r border-slate-300">GRAND TOTAL</td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-300 tabular-nums">{totalMax}</td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-300 tabular-nums text-slate-900">{totalObtained}</td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-300 font-bold text-amber-900">
                      {percentage}%
                    </td>
                    <td className="py-2.5 px-3 text-emerald-800 text-[11px]">
                      Result: PASSED WITH DISTINCTION (A1)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* CBSE Grading Scale Legend */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-800">CBSE 8-Point Grading Scale:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>A1:</strong> 91–100%</span>
              <span><strong>A2:</strong> 81–90%</span>
              <span><strong>B1:</strong> 71–80%</span>
              <span><strong>B2:</strong> 61–70%</span>
              <span><strong>C1:</strong> 51–60%</span>
              <span><strong>C2:</strong> 41–50%</span>
              <span><strong>D:</strong> 33–40%</span>
              <span><strong>E:</strong> Essential Repeat</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-8 pt-8 text-center text-xs">
            <div className="border-t border-slate-400 pt-1">
              Class Teacher Signature
            </div>
            <div className="border-t border-slate-400 pt-1">
              Parent / Guardian Signature
            </div>
            <div className="border-t border-slate-400 pt-1 font-bold">
              Principal Signature & Seal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
