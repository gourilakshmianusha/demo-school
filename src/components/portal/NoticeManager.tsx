import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Bell, Plus, Calendar, Tag, ShieldCheck, Megaphone, Edit2, Trash2, Search, Filter, Eye } from 'lucide-react';
import { NoticeRecord } from '../../types';

export const NoticeManager: React.FC = () => {
  const { notices, addNotice, updateNotice, deleteNotice, currentUser, navigateToPublicPage } = useSchool();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeRecord | null>(null);

  // Filters & search
  const [selectedAudience, setSelectedAudience] = useState<'all' | 'parents' | 'students' | 'staff' | 'filter_all'>('filter_all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState<'all' | 'parents' | 'students' | 'staff'>('all');
  const [isPriority, setIsPriority] = useState(false);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTargetAudience('all');
    setIsPriority(false);
    setEditingNotice(null);
  };

  const handleOpenEdit = (n: NoticeRecord) => {
    setEditingNotice(n);
    setTitle(n.title);
    setContent(n.content);
    setTargetAudience(n.targetAudience);
    setIsPriority(!!n.isHighPriority);
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editingNotice) {
      updateNotice(editingNotice.id, {
        title,
        content,
        targetAudience,
        isHighPriority: isPriority,
      });
      resetForm();
    } else {
      addNotice({
        title,
        content,
        targetAudience,
        isHighPriority: isPriority,
        author: currentUser.name,
        academicYear: '2024-2025',
        provenance: {
          sourceUrl: 'https://jkeducationsocietydk.com/notices',
          originalPageTitle: 'Portal Published Notice',
          importedDate: new Date().toISOString().split('T')[0],
          verificationStatus: 'verified',
          reviewer: currentUser.name,
          publicationStatus: 'published',
        },
      });
      setShowAddModal(false);
      resetForm();
    }
  };

  const handleDelete = (n: NoticeRecord) => {
    if (window.confirm(`Delete notice "${n.title}"?`)) {
      deleteNotice(n.id);
    }
  };

  const filteredNotices = notices.filter((n) => {
    const matchesAudience = selectedAudience === 'filter_all' || n.targetAudience === selectedAudience;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAudience && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Circulars & Notice Broadcast Console
          </h2>
          <p className="text-xs text-slate-500">
            Publish official announcements targeted to parents, students, or faculty, with real-time audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigateToPublicPage('news_events')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="View public circulars on News & Events page"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Public Notices Page →</span>
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Broadcast New Notice</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-sm text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search circulars by headline, author, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700 font-medium focus:outline-none"
          >
            <option value="filter_all">All Audiences</option>
            <option value="all">Public / School-wide</option>
            <option value="parents">Parents Only</option>
            <option value="students">Students Only</option>
            <option value="staff">Staff Only</option>
          </select>
        </div>
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
          No circulars found matching the filter criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold uppercase text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 text-[11px]">
                    Target: {n.targetAudience}
                  </span>
                  <span className="text-slate-500 text-[11px]">Published: {n.publishDate}</span>
                  {n.isHighPriority && (
                    <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">
                      High Priority
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 font-mono">By: {n.author}</span>
                  
                  {/* CRUD Actions: Edit & Delete */}
                  <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                    <button
                      onClick={() => handleOpenEdit(n)}
                      className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                      title="Edit Notice"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(n)}
                      className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="font-bold font-serif text-base text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{n.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {(showAddModal || editingNotice) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <h3 className="text-base font-serif font-bold text-slate-900">
              {editingNotice ? 'Edit Circular Notice' : 'Draft Official Circular'}
            </h3>

            <form onSubmit={handleSaveNotice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Audience *</label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                >
                  <option value="all">All School Community (Public & Parents)</option>
                  <option value="parents">Parents / Guardians Only</option>
                  <option value="students">Students Only</option>
                  <option value="staff">Teaching & Non-Teaching Staff Only</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Periodic Assessment 2 Timetable Released"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Circular Body *</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Detailed text for parents/students..."
                  className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPriority}
                  onChange={(e) => setIsPriority(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="font-semibold text-slate-800">Flag as High Priority Announcement</span>
              </label>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
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
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleSaveNotice(e);
                      navigateToPublicPage('news_events');
                    }}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded transition-colors"
                  >
                    Broadcast & View Live →
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded shadow-sm"
                  >
                    {editingNotice ? 'Update Notice' : 'Broadcast Notice'}
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
