import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Calendar,
  Bell,
  Filter,
  ArrowRight,
  ExternalLink,
  Tag,
  Clock,
  X,
} from 'lucide-react';
import { NoticeRecord, PublicEventRecord } from '../../types';

export const NewsEventsSection: React.FC = () => {
  const { notices, events, academicYears } = useSchool();

  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');
  const [activeModalItem, setActiveModalItem] = useState<NoticeRecord | PublicEventRecord | null>(null);

  const filteredNotices = notices.filter(
    (n) => selectedYear === 'all' || n.academicYear === selectedYear
  );

  const filteredEvents = events.filter(
    (e) => selectedYear === 'all' || e.academicYear === selectedYear
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* 1. Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          School Happenings & Circulars
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          News, Events & Academic Year Archive
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Stay informed about official circulars, assessment dates, student celebrations, and community initiatives organised by academic session.
        </p>
      </div>

      {/* 2. Filter & Sub-Nav Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'notices' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Notices & Circulars ({filteredNotices.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'events' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Events & Activities ({filteredEvents.length})
          </button>
        </div>

        {/* Academic Year Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Session Archive:</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Academic Years</option>
            {academicYears.map((ay) => (
              <option key={ay.id} value={ay.name}>
                {ay.name} {ay.isCurrent ? '(Current)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Notices Tab */}
      {activeTab === 'notices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="uppercase text-amber-700 font-bold">{n.targetAudience}</span>
                  <span aria-hidden="true">·</span>
                  <span>{n.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{n.academicYear}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {n.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {n.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">By: {n.author}</span>
                <button
                  onClick={() => setActiveModalItem(n)}
                  className="text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors"
                >
                  Read Full Notice →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Events Tab */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden bg-slate-100">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{evt.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{evt.academicYear}</span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-slate-900 leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Date: {evt.eventDate}</span>
                  <button
                    onClick={() => setActiveModalItem(evt)}
                    className="text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {'coverImage' in activeModalItem && (
              <div className="h-48 w-full rounded-lg overflow-hidden bg-slate-100 mb-2">
                <img
                  src={activeModalItem.coverImage}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {'category' in activeModalItem ? activeModalItem.category : `Target: ${activeModalItem.targetAudience}`} · {activeModalItem.academicYear}
              </span>
              <h3 className="text-lg font-bold font-serif text-slate-900">
                {activeModalItem.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {'content' in activeModalItem ? activeModalItem.content : activeModalItem.description}
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Verified School Publication</span>
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
