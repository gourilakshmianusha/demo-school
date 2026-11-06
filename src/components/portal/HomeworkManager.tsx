import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { BookOpen, Plus, Calendar, Clock, CheckCircle, FileText, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { HomeworkRecord } from '../../types';

export const HomeworkManager: React.FC = () => {
  const { homework, classes, addHomework, updateHomework, deleteHomework, currentUser } = useSchool();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHomework, setEditingHomework] = useState<HomeworkRecord | null>(null);

  // Filters & search
  const [filterClassId, setFilterClassId] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [classId, setClassId] = useState('cls_8');
  const [subject, setSubject] = useState('Mathematics');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');

  const resetForm = () => {
    setTitle('');
    setInstructions('');
    setDueDate('');
    setClassId('cls_8');
    setSubject('Mathematics');
    setEditingHomework(null);
  };

  const handleOpenEdit = (hw: HomeworkRecord) => {
    setEditingHomework(hw);
    setClassId(hw.classId);
    setSubject(hw.subject);
    setTitle(hw.title);
    setInstructions(hw.instructions);
    setDueDate(hw.dueDate);
  };

  const handleSaveHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !instructions || !dueDate) return;

    const cls = classes.find((c) => c.id === classId);

    if (editingHomework) {
      updateHomework(editingHomework.id, {
        classId,
        className: cls?.name || editingHomework.className,
        subject,
        title,
        instructions,
        dueDate,
      });
      resetForm();
    } else {
      addHomework({
        classId,
        className: cls?.name || 'Class VIII',
        section: 'A',
        subject,
        teacherId: currentUser.id,
        teacherName: currentUser.name,
        title,
        instructions,
        dueDate,
      });
      setShowAddModal(false);
      resetForm();
    }
  };

  const handleDelete = (hw: HomeworkRecord) => {
    if (window.confirm(`Delete homework task "${hw.title}" for ${hw.className}?`)) {
      deleteHomework(hw.id);
    }
  };

  const filteredHomework = homework.filter((hw) => {
    const matchesClass = filterClassId === 'all' || hw.classId === filterClassId;
    const matchesSubject = filterSubject === 'all' || hw.subject === filterSubject;
    const matchesSearch =
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.instructions.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Homework & Learning Assignments Desk
          </h2>
          <p className="text-xs text-slate-500">
            Create, review, edit, and manage homework tasks and NCERT curriculum practice assignments.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Assign New Homework</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-sm text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search assignments by topic or instructions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Class Filter */}
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterClassId}
              onChange={(e) => setFilterClassId(e.target.value)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none"
            >
              <option value="all">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700 font-medium focus:outline-none"
          >
            <option value="all">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Social Science">Social Science</option>
            <option value="Kannada / II Lang">Kannada / II Lang</option>
            <option value="Environmental Studies">Environmental Studies</option>
          </select>
        </div>
      </div>

      {/* Homework Grid */}
      {filteredHomework.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
          No homework assignments found matching the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHomework.map((hw) => (
            <div
              key={hw.id}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    {hw.subject}
                  </span>
                  <span className="text-slate-500 font-medium">Due: <strong>{hw.dueDate}</strong></span>
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">{hw.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{hw.instructions}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{hw.className} – {hw.section}</span>
                  <span className="text-emerald-700 font-semibold">{hw.submissionsCount || 24} Submissions</span>
                </div>

                {/* CRUD Controls: Edit & Delete */}
                <div className="flex items-center justify-end gap-1.5 pt-1">
                  <button
                    onClick={() => handleOpenEdit(hw)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors flex items-center gap-1 text-[11px] font-semibold"
                    title="Edit Homework Task"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(hw)}
                    className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors flex items-center gap-1 text-[11px] font-semibold"
                    title="Delete Homework Task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Homework Modal */}
      {(showAddModal || editingHomework) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <h3 className="text-base font-serif font-bold text-slate-900">
              {editingHomework ? 'Edit Homework Assignment' : 'Assign New Homework Task'}
            </h3>

            <form onSubmit={handleSaveHomework} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Class *</label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Kannada / II Lang">Kannada / II Lang</option>
                    <option value="Environmental Studies">Environmental Studies</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chapter 4 Practice Questions 1-10"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Instructions & Guidance *</label>
                <textarea
                  rows={3}
                  required
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Specific questions, notebook steps, or chart guidelines..."
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Submission Due Date *</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded shadow-sm"
                >
                  {editingHomework ? 'Update Assignment' : 'Publish Homework'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
