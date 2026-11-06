import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Award,
  Save,
  CheckCircle,
  Search,
  Printer,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Filter,
} from 'lucide-react';
import { StudentRecord, MarkEntry } from '../../types';
import { ReportCardModal } from './ReportCardModal';

export const ExamsManager: React.FC = () => {
  const { students, marks, classes, recordMark, deleteMark } = useSchool();

  const [selectedClassId, setSelectedClassId] = useState<string>('cls_8');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [maxMarks, setMaxMarks] = useState<number>(40);
  const [activeReportStudent, setActiveReportStudent] = useState<StudentRecord | null>(null);

  // Edit / Add Mark Modal State
  const [editingMark, setEditingMark] = useState<MarkEntry | null>(null);
  const [showAddMarkModal, setShowAddMarkModal] = useState<boolean>(false);
  const [newMarkStudentId, setNewMarkStudentId] = useState<string>('');
  const [newMarkObtained, setNewMarkObtained] = useState<number>(35);
  const [newMarkRemarks, setNewMarkRemarks] = useState<string>('');

  const classStudents = students.filter(
    (s) => s.classId === selectedClassId && s.status === 'active'
  );

  // Local state for batch marks sheet
  const [marksSheet, setMarksSheet] = useState<Record<string, { obtained: number; remarks: string }>>({});

  React.useEffect(() => {
    const map: Record<string, { obtained: number; remarks: string }> = {};
    classStudents.forEach((std) => {
      const existing = marks.find(
        (m) => m.studentId === std.id && m.subject === selectedSubject
      );
      map[std.id] = {
        obtained: existing ? existing.marksObtained : 35,
        remarks: existing?.remarks || '',
      };
    });
    setMarksSheet(map);
  }, [selectedClassId, selectedSubject, marks.length]);

  const calculateGrade = (obtained: number, max: number): string => {
    if (max <= 0) return 'E';
    const pct = (obtained / max) * 100;
    if (pct >= 91) return 'A1';
    if (pct >= 81) return 'A2';
    if (pct >= 71) return 'B1';
    if (pct >= 61) return 'B2';
    if (pct >= 51) return 'C1';
    if (pct >= 41) return 'C2';
    if (pct >= 33) return 'D';
    return 'E';
  };

  const handleSaveBatchMarks = () => {
    classStudents.forEach((std) => {
      const sheet = marksSheet[std.id];
      if (sheet) {
        const grade = calculateGrade(sheet.obtained, maxMarks);
        recordMark({
          examId: 'ex_pt1',
          studentId: std.id,
          studentName: `${std.firstName} ${std.lastName}`,
          classId: selectedClassId,
          section: std.section,
          subject: selectedSubject,
          maxMarks,
          marksObtained: sheet.obtained,
          grade,
          remarks: sheet.remarks,
        });
      }
    });
  };

  const handleOpenAddMark = () => {
    if (classStudents.length > 0) {
      setNewMarkStudentId(classStudents[0].id);
    }
    setNewMarkObtained(35);
    setNewMarkRemarks('');
    setShowAddMarkModal(true);
  };

  const handleSaveIndividualMark = (e: React.FormEvent) => {
    e.preventDefault();
    const std = students.find((s) => s.id === (editingMark ? editingMark.studentId : newMarkStudentId));
    if (!std) return;

    const grade = calculateGrade(newMarkObtained, maxMarks);

    recordMark({
      examId: editingMark ? editingMark.examId : 'ex_pt1',
      studentId: std.id,
      studentName: `${std.firstName} ${std.lastName}`,
      classId: std.classId,
      section: std.section,
      subject: selectedSubject,
      maxMarks,
      marksObtained: newMarkObtained,
      grade,
      remarks: newMarkRemarks,
    });

    setShowAddMarkModal(false);
    setEditingMark(null);
  };

  const handleDeleteMark = (markId: string, studentName: string) => {
    if (window.confirm(`Delete mark record for ${studentName} (${selectedSubject})?`)) {
      deleteMark(markId);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            CBSE Examination & Continuous Assessment Desk
          </h2>
          <p className="text-xs text-slate-500">
            Enter Periodic Test (PT) & Term assessment marks with automated CBSE 8-point grading.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Class */}
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Subject */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Social Science">Social Science</option>
            <option value="Kannada / II Lang">Kannada / II Lang</option>
            <option value="Environmental Studies">Environmental Studies</option>
          </select>

          {/* Max Marks */}
          <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs">
            <span className="text-slate-500 font-semibold">Max:</span>
            <input
              type="number"
              value={maxMarks}
              onChange={(e) => setMaxMarks(Number(e.target.value))}
              className="w-12 text-slate-900 font-bold focus:outline-none"
            />
          </div>

          <button
            onClick={handleSaveBatchMarks}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-amber-400" />
            <span>Save All Marks</span>
          </button>

          <button
            onClick={handleOpenAddMark}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Single Mark</span>
          </button>
        </div>
      </div>

      {/* 2. Assessment Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Adm No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4 tabular-nums">Marks Obtained (/{maxMarks})</th>
                <th className="py-3 px-4">CBSE Grade</th>
                <th className="py-3 px-4">Teacher Remark</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.map((std) => {
                const sheet = marksSheet[std.id] || { obtained: 35, remarks: '' };
                const grade = calculateGrade(sheet.obtained, maxMarks);
                const existingMark = marks.find(
                  (m) => m.studentId === std.id && m.subject === selectedSubject
                );

                return (
                  <tr key={std.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {std.admissionNo}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {std.firstName} {std.lastName}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {selectedSubject}
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="0"
                        max={maxMarks}
                        value={sheet.obtained}
                        onChange={(e) =>
                          setMarksSheet((prev) => ({
                            ...prev,
                            [std.id]: { ...sheet, obtained: Number(e.target.value) },
                          }))
                        }
                        className="w-20 px-2 py-1 text-xs border border-slate-300 rounded font-bold font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
                        {grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={sheet.remarks}
                        onChange={(e) =>
                          setMarksSheet((prev) => ({
                            ...prev,
                            [std.id]: { ...sheet, remarks: e.target.value },
                          }))
                        }
                        placeholder="e.g. Good analytical grasp"
                        className="w-full max-w-xs px-2 py-1 text-xs border border-slate-200 rounded text-slate-700"
                      />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => setActiveReportStudent(std)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                        title="Print CBSE Continuous Evaluation Report Card"
                      >
                        Report Card
                      </button>

                      {existingMark && (
                        <button
                          onClick={() => handleDeleteMark(existingMark.id, `${std.firstName} ${std.lastName}`)}
                          className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors inline-block"
                          title="Delete Recorded Mark Entry"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Individual Mark Modal */}
      {(showAddMarkModal || editingMark) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <h3 className="text-base font-serif font-bold text-slate-900">
              {editingMark ? 'Edit Assessment Mark' : 'Record Student Mark'}
            </h3>

            <form onSubmit={handleSaveIndividualMark} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student *</label>
                {editingMark ? (
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900">
                    {editingMark.studentName}
                  </div>
                ) : (
                  <select
                    value={newMarkStudentId}
                    onChange={(e) => setNewMarkStudentId(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    {classStudents.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.firstName} {s.lastName} ({s.admissionNo})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800">
                  {selectedSubject}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Marks Obtained *</label>
                  <input
                    type="number"
                    min="0"
                    max={maxMarks}
                    required
                    value={newMarkObtained}
                    onChange={(e) => setNewMarkObtained(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Marks</label>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded font-mono font-bold text-slate-700">
                    {maxMarks}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Remarks & Feedback</label>
                <input
                  type="text"
                  value={newMarkRemarks}
                  onChange={(e) => setNewMarkRemarks(e.target.value)}
                  placeholder="e.g. Excellent conceptual clarity"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-950 flex items-center justify-between">
                <span>Calculated CBSE Grade:</span>
                <span className="font-bold font-mono text-sm">
                  {calculateGrade(newMarkObtained, maxMarks)}
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMarkModal(false);
                    setEditingMark(null);
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded shadow-sm"
                >
                  Save Mark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
