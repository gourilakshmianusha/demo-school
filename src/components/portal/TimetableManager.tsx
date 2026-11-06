import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Clock,
  Calendar,
  Users,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Check,
} from 'lucide-react';
import { TimetableSlot } from '../../types';

export const TimetableManager: React.FC = () => {
  const {
    timetable,
    classes,
    staff,
    addTimetableSlot,
    updateTimetableSlot,
    deleteTimetableSlot,
    showToast,
  } = useSchool();

  const [selectedClassId, setSelectedClassId] = useState<string>('cls_8');
  const [selectedDay, setSelectedDay] = useState<TimetableSlot['dayOfWeek']>('Monday');

  // Modals
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);

  // Form
  const [slotForm, setSlotForm] = useState<Partial<TimetableSlot>>({
    classId: selectedClassId,
    section: 'A',
    dayOfWeek: selectedDay,
    periodNumber: 1,
    timeRange: '09:00 AM – 09:45 AM',
    subject: 'Mathematics',
    teacherId: staff[0]?.id || 'stf_001',
    teacherName: staff[0]?.name || 'Smt. Anitha Joshi',
    room: 'Room 204',
  });

  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  const periods = [
    { num: 1, time: '09:00 AM – 09:45 AM' },
    { num: 2, time: '09:45 AM – 10:30 AM' },
    { num: 3, time: '10:45 AM – 11:30 AM' },
    { num: 4, time: '11:30 AM – 12:15 PM' },
    { num: 5, time: '01:00 PM – 01:45 PM' },
    { num: 6, time: '01:45 PM – 02:30 PM' },
    { num: 7, time: '02:30 PM – 03:15 PM' },
  ];

  const days: TimetableSlot['dayOfWeek'][] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const handleOpenAdd = (periodNum?: number) => {
    const pTime = periods.find((p) => p.num === (periodNum || 1))?.time || '09:00 AM – 09:45 AM';
    setSlotForm({
      classId: selectedClassId,
      section: 'A',
      dayOfWeek: selectedDay,
      periodNumber: periodNum || 1,
      timeRange: pTime,
      subject: 'Mathematics',
      teacherId: staff[0]?.id || 'stf_001',
      teacherName: staff[0]?.name || 'Smt. Anitha Joshi',
      room: 'Room 204',
    });
    setIsAddSlotOpen(true);
  };

  const handleOpenEdit = (slot: TimetableSlot) => {
    setEditingSlot(slot);
    setSlotForm({ ...slot });
  };

  const handleTeacherSelect = (teacherId: string) => {
    const t = staff.find((s) => s.id === teacherId);
    setSlotForm((prev) => ({
      ...prev,
      teacherId,
      teacherName: t ? t.name : '',
    }));
  };

  const handlePeriodChange = (pNum: number) => {
    const time = periods.find((p) => p.num === pNum)?.time || '09:00 AM – 09:45 AM';
    setSlotForm((prev) => ({
      ...prev,
      periodNumber: pNum,
      timeRange: time,
    }));
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotForm.subject || !slotForm.teacherName) {
      showToast('Please enter subject and assign a faculty member.', 'warning');
      return;
    }

    addTimetableSlot(slotForm as Omit<TimetableSlot, 'id'>);
    setIsAddSlotOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;

    updateTimetableSlot(editingSlot.id, slotForm);
    setEditingSlot(null);
  };

  const handleDelete = (id: string, label: string) => {
    if (window.confirm(`Delete timetable slot "${label}"?`)) {
      deleteTimetableSlot(id);
    }
  };

  const classDaySlots = timetable.filter(
    (t) => t.classId === selectedClassId && (!t.dayOfWeek || t.dayOfWeek === selectedDay)
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Timetable & Period Schedules
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200">
              {timetable.length} Active Slots
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full CRUD: Create period schedules, assign teaching faculty, update room allocations, and adjust daily bell times.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Class:</span>
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
          </div>

          {/* CREATE BUTTON */}
          <button
            onClick={() => handleOpenAdd()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Schedule Slot</span>
          </button>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
              selectedDay === day
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-900 text-white font-serif font-bold text-sm flex items-center justify-between">
          <span>{selectedClass.name} – {selectedDay} Schedule</span>
          <span className="text-xs text-amber-400 font-sans font-normal">Active Session 2024–25</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4 border-r border-slate-200 w-24">Period</th>
                <th className="py-3 px-4 border-r border-slate-200 w-36">Time Slot</th>
                <th className="py-3 px-4">Subject & Faculty Assignment</th>
                <th className="py-3 px-4">Classroom</th>
                <th className="py-3 px-4 text-right">CRUD Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {periods.map((p) => {
                const slot = classDaySlots.find((s) => s.periodNumber === p.num);
                return (
                  <tr key={p.num} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 border-r border-slate-200">
                      Period {p.num}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 border-r border-slate-200">
                      {p.time}
                    </td>
                    <td className="py-3 px-4">
                      {slot ? (
                        <div>
                          <strong className="text-slate-900 text-sm block">{slot.subject}</strong>
                          <span className="text-slate-500 text-[11px]">{slot.teacherName}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenAdd(p.num)}
                          className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Assign Period {p.num}</span>
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {slot?.room || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {slot ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(slot)}
                            className="p-1 text-slate-600 hover:text-indigo-600 rounded transition-colors"
                            title="Edit Timetable Slot"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(slot.id, `${slot.subject} (Period ${slot.periodNumber})`)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                            title="Delete Slot"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      {isAddSlotOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsAddSlotOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Add Timetable Period Slot (Create)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Schedule subject and faculty for {selectedClass.name} on {selectedDay}.
            </p>

            <form onSubmit={handleSaveAdd} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Day of Week</label>
                  <select
                    value={slotForm.dayOfWeek}
                    onChange={(e) => setSlotForm({ ...slotForm, dayOfWeek: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Period Number</label>
                  <select
                    value={slotForm.periodNumber}
                    onChange={(e) => handlePeriodChange(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  >
                    {periods.map((p) => (
                      <option key={p.num} value={p.num}>
                        Period {p.num} ({p.time})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={slotForm.subject || ''}
                  onChange={(e) => setSlotForm({ ...slotForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. Science / Mathematics / English"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Faculty Member *</label>
                <select
                  value={slotForm.teacherId}
                  onChange={(e) => handleTeacherSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {staff.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Room / Lab</label>
                <input
                  type="text"
                  value={slotForm.room || ''}
                  onChange={(e) => setSlotForm({ ...slotForm, room: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. Room 204 or Kreedo Lab"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSlotOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save Slot</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setEditingSlot(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Edit Timetable Slot (Update)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Period {editingSlot.periodNumber} ({editingSlot.dayOfWeek})
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={slotForm.subject || ''}
                  onChange={(e) => setSlotForm({ ...slotForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty Member</label>
                <select
                  value={slotForm.teacherId}
                  onChange={(e) => handleTeacherSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {staff.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Classroom / Hall</label>
                <input
                  type="text"
                  value={slotForm.room || ''}
                  onChange={(e) => setSlotForm({ ...slotForm, room: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDelete(editingSlot.id, `${editingSlot.subject}`)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Slot</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSlot(null)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Update Slot</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
