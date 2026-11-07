import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const AcademicSetupDesk: React.FC = () => {
  const { classes, contactSettings, navigateToPublicPage } = useSchool();

  const subjectsByLevel = [
    {
      level: 'Pre-Primary (Kreedo Curriculum)',
      classes: 'Nursery, LKG, UKG',
      focus: 'Activity-based, sensorial, literacy, numeracy, and fine motor skills via Kreedo Lab',
      subjects: ['Sensorial & Motor Development', 'Cognitive Skills', 'Language & Phonics', 'Math Readiness', 'Creative Arts & Music'],
    },
    {
      level: 'Primary School (Classes I to V)',
      classes: 'Classes I, II, III, IV, V',
      focus: 'Foundational literacy, numeracy, experiential science, language fluency',
      subjects: ['English Core', 'Mathematics', 'Environmental Studies (EVS)', 'Kannada / Second Language', 'Hindi Basics', 'Art Education', 'Physical Health & Games'],
    },
    {
      level: 'Middle School (Classes VI to VIII)',
      classes: 'Classes VI, VII, VIII',
      focus: 'CBSE NCERT integrated syllabus, analytical science, linguistic mastery',
      subjects: ['English Literature & Language', 'Mathematics (Algebra, Geometry, Arithmetic)', 'Science (Physics, Chemistry, Biology)', 'Social Science (History, Geography, Civics)', 'Kannada', 'Hindi', 'Information Technology', 'Art & Craft'],
    },
    {
      level: 'Secondary School (Classes IX to X)',
      classes: 'Classes IX & X (AISSE Board Examination)',
      focus: 'CBSE Board Examination preparation, skill development, art-integrated projects',
      subjects: ['Language I: English Communicative / Language & Lit (184)', 'Language II: Kannada (015) / Hindi Course B (085)', 'Mathematics Standard / Basic (041 / 241)', 'Science (086)', 'Social Science (087)', 'Information Technology (402)', 'Health & Physical Education (506)'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Academic Structure & Curriculum Setup
          </h2>
          <p className="text-xs text-slate-500">
            CBSE Affiliation No: {contactSettings.affiliationNumber} • School Code: {contactSettings.schoolNumber} • Hubli, Karnataka
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateToPublicPage('academics')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Academics Page →</span>
          </button>
        </div>
      </div>

      {/* 2. Key Academic Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Academic Session</span>
          </div>
          <div className="text-xl font-bold font-serif text-slate-900">2024 – 2025 (Active)</div>
          <p className="text-[11px] text-slate-500">
            Terms: Term 1 (June – Oct) & Term 2 (Nov – March)
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Affiliated Levels</span>
          </div>
          <div className="text-xl font-bold font-serif text-slate-900">Pre-Primary to Class X</div>
          <p className="text-[11px] text-slate-500">
            Strictly confirmed scope (Classes XI–XII not conducted)
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>School Schedule</span>
          </div>
          <div className="text-xl font-bold font-serif text-slate-900">8 Periods / Day</div>
          <p className="text-[11px] text-slate-500">
            45 min periods • 220 official working instructional days
          </p>
        </div>
      </div>

      {/* 3. Class Inventory List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-900 text-white font-serif font-bold text-sm flex items-center justify-between">
          <span>Active Class & Section Configuration</span>
          <span className="text-xs font-sans text-amber-400 font-normal">
            {classes.length} Configured Levels
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Class Level</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Sections</th>
                <th className="py-3 px-4">Class Teacher</th>
                <th className="py-3 px-4">Curriculum Framework</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">{cls.name}</td>
                  <td className="py-3 px-4 capitalize text-slate-600">
                    {cls.category.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                    Section {cls.sections.join(', ')}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {cls.classTeacher || 'Assigned by Principal'}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {cls.category === 'pre_primary' ? 'Kreedo Experiential Early Learning' : 'CBSE / NCERT Standards'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Active</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Subject Streams & Pedagogical Focus */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-serif text-slate-900">
          Curriculum & Prescribed Subject Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectsByLevel.map((lvl, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm font-serif">{lvl.level}</h4>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                  {lvl.classes}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{lvl.focus}</p>

              <div>
                <div className="text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Prescribed Subjects:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {lvl.subjects.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-950 border border-amber-200 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
