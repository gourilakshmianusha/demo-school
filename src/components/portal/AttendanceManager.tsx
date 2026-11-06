import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  Users,
  AlertCircle,
} from 'lucide-react';
import { AttendanceRecord } from '../../types';

export const AttendanceManager: React.FC = () => {
  const { classes, students, attendanceRecords, markAttendance, currentUser } = useSchool();

  const [selectedClassId, setSelectedClassId] = useState<string>('cls_8');
  const [selectedSection, setSelectedSection] = useState<string>('A');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Students in selected class
  const classStudents = students.filter(
    (s) => s.classId === selectedClassId && s.status === 'active'
  );

  // Current attendance map: studentId -> status
  const [statusMap, setStatusMap] = useState<Record<string, 'present' | 'absent' | 'late' | 'excused'>>({});
  const [remarksMap, setRemarksMap] = useState<Record<string, string>>({});

  // Initialize status from existing records if available
  React.useEffect(() => {
    const existing = attendanceRecords.filter(
      (a) => a.classId === selectedClassId && a.section === selectedSection && a.date === selectedDate
    );
    const map: Record<string, 'present' | 'absent' | 'late' | 'excused'> = {};
    const rem: Record<string, string> = {};

    classStudents.forEach((s) => {
      const found = existing.find((e) => e.studentId === s.id);
      map[s.id] = found ? found.status : 'present';
      if (found?.remarks) rem[s.id] = found.remarks;
    });

    setStatusMap(map);
    setRemarksMap(rem);
  }, [selectedClassId, selectedSection, selectedDate, attendanceRecords.length]);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setStatusMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    const map: Record<string, 'present' | 'absent' | 'late' | 'excused'> = {};
    classStudents.forEach((s) => {
      map[s.id] = status;
    });
    setStatusMap(map);
  };

  const handleSave = () => {
    const records: Omit<AttendanceRecord, 'id'>[] = classStudents.map((s) => ({
      date: selectedDate,
      classId: selectedClassId,
      section: selectedSection,
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      status: statusMap[s.id] || 'present',
      markedBy: currentUser.name,
      remarks: remarksMap[s.id] || undefined,
    }));

    markAttendance(records);
  };

  // Tallies
  const total = classStudents.length;
  const presentCount = Object.values(statusMap).filter((st) => st === 'present').length;
  const absentCount = Object.values(statusMap).filter((st) => st === 'absent').length;
  const attendanceRate = total > 0 ? ((presentCount / total) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Class Attendance Register
          </h2>
          <p className="text-xs text-slate-500">
            Mark daily scholastic attendance, record late arrivals, and generate automated parent SMS alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Class Select */}
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

          {/* Section Select */}
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
          </input>
        </div>
      </div>

      {/* 2. Quick Action & Summary Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-slate-500">Students: </span>
            <strong className="text-slate-900">{total}</strong>
          </div>
          <div>
            <span className="text-slate-500">Present: </span>
            <strong className="text-emerald-700">{presentCount}</strong>
          </div>
          <div>
            <span className="text-slate-500">Absent: </span>
            <strong className="text-rose-700">{absentCount}</strong>
          </div>
          <div>
            <span className="text-slate-500">Rate: </span>
            <strong className="text-amber-800 font-bold">{attendanceRate}%</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleMarkAll('present')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Save className="w-3.5 h-3.5 text-amber-400" />
            <span>Save Register</span>
          </button>
        </div>
      </div>

      {/* 3. Students Attendance Sheet */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-4">Roll</th>
                <th className="py-2.5 px-4">Adm No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-4">Attendance Status</th>
                <th className="py-2.5 px-4">Reason / Notes (Optional)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No active students enrolled in this class and section.
                  </td>
                </tr>
              ) : (
                classStudents.map((std) => {
                  const currentStatus = statusMap[std.id] || 'present';

                  return (
                    <tr key={std.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {std.rollNo || '14'}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {std.admissionNo}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {std.firstName} {std.lastName}
                      </td>
                      <td className="py-3 px-4">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(std.id, 'present')}
                            className={`px-3 py-1 text-xs font-semibold rounded-l-md border transition-colors ${
                              currentStatus === 'present'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(std.id, 'absent')}
                            className={`px-3 py-1 text-xs font-semibold border-t border-b transition-colors ${
                              currentStatus === 'absent'
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(std.id, 'late')}
                            className={`px-3 py-1 text-xs font-semibold border-t border-b transition-colors ${
                              currentStatus === 'late'
                                ? 'bg-amber-500 text-slate-950 border-amber-500'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            Late
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(std.id, 'excused')}
                            className={`px-3 py-1 text-xs font-semibold rounded-r-md border transition-colors ${
                              currentStatus === 'excused'
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            Leave
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={remarksMap[std.id] || ''}
                          onChange={(e) => setRemarksMap((prev) => ({ ...prev, [std.id]: e.target.value }))}
                          placeholder={currentStatus === 'absent' ? 'Reason for absence...' : 'Optional remark'}
                          className="w-full max-w-xs px-2.5 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
