import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Compass,
  Sparkles,
  Trophy,
  Palette,
  Flag,
  BookOpen,
  Heart,
  Users,
  Calendar,
} from 'lucide-react';

export const StudentLifeSection: React.FC = () => {
  const { events } = useSchool();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'Exhibition', label: 'Art & Science Expos' },
    { id: 'Celebration', label: 'Cultural & National' },
    { id: 'Sports', label: 'Sports & Yoga' },
    { id: 'Scouts & Guides', label: 'Scouts & Guides' },
  ];

  const filteredEvents = activeCategory === 'all' ? events : events.filter((e) => e.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* 1. Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          Holistic Student Development
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Student Life & Co-Scholastic Learning
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          At Smt Drakshayani Kalyanshettar Public School, co-scholastic engagement is woven seamlessly into our daily routine. From outdoor motor agility in Swami Vivekananda Kids Park to regional folk art projects, students discover character and camaraderie.
        </p>
      </div>

      {/* 2. Distinctive Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <Palette className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900">Art-Integrated Learning</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Integrating visual and performing arts into Science, Mathematics, and Languages, sparking imaginative synthesis as encouraged by NEP 2020.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <Trophy className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900">Sports & Yoga Discipline</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Daily physical education, traditional yogic asanas, athletic track events, and team tournaments fostering stamina and sportsmanship.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <Flag className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900">Bharat Scouts & Guides</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Active scout troops and guide companies building civic responsibility, community first-aid, discipline, and camping skills.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900">Reading Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Structured library reading periods, book review circles, and multilingual storytelling in Kannada, English, and Hindi.
          </p>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-slate-200">
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Activity Showcase & Annual Highlights
          </h2>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeCategory === cat.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-amber-400 text-[11px] font-semibold px-2.5 py-1 rounded">
                  {evt.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{evt.academicYear}</span>
                    <span aria-hidden="true">·</span>
                    <span>{evt.classGroup}</span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-slate-900 leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Date: {evt.eventDate}</span>
                  <span className="text-emerald-700 font-medium">Verified Record</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
