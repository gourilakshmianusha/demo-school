import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BookOpen,
  Calendar,
  Award,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  Sparkles,
  Layers,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const AcademicsSection: React.FC = () => {
  const { cbseResults, teacherTrainings } = useSchool();
  const [activeStage, setActiveStage] = useState<'all' | 'pre_primary' | 'primary' | 'middle' | 'secondary'>('all');

  const stages = [
    {
      id: 'pre_primary',
      title: 'Pre-Primary (Kreedo Early Learning)',
      classes: 'Nursery, LKG, UKG',
      age: '2.5 to 5.5 Years',
      tag: 'Foundational Stage',
      description: 'Structured sensory discovery utilizing over 150+ wooden manipulatives and activity tables. Integrates Montessori principles, gross & fine motor agility at Swami Vivekananda Park, and foundational phonetics.',
      subjects: ['Sensory Exploration', 'Foundational Literacy & Phonics', 'Numeracy & Shapes', 'Storytelling & Music', 'Outdoor Motor Play'],
    },
    {
      id: 'primary',
      title: 'Primary School (Classes I to V)',
      classes: 'Classes I, II, III, IV, V',
      age: '6 to 10 Years',
      tag: 'Preparatory Stage',
      description: 'Activity-based NCERT curriculum focusing on reading fluency, arithmetic comprehension, environmental observation, and creative art-integrated projects.',
      subjects: ['English', 'Mathematics', 'Environmental Studies (EVS)', 'Kannada (II Lang)', 'Hindi (III Lang)', 'Art & Craft', 'Physical Education'],
    },
    {
      id: 'middle',
      title: 'Middle School (Classes VI to VIII)',
      classes: 'Classes VI, VII, VIII',
      age: '11 to 13 Years',
      tag: 'Middle Stage',
      description: 'Transition into experiential subject disciplines with laboratory demonstrations, mathematical problem solving, social science mapping, and introductory vocational skills.',
      subjects: ['English Core', 'Mathematics', 'Integrated Science (Physics, Chemistry, Biology)', 'Social Science (History, Civics, Geography)', 'Kannada / Hindi', 'Computer Literacy', 'Yoga & Sports'],
    },
    {
      id: 'secondary',
      title: 'Secondary School (Classes IX & X)',
      classes: 'Classes IX & X',
      age: '14 to 15 Years',
      tag: 'Secondary Stage',
      description: 'Rigorous CBSE Board preparation adhering strictly to NCERT syllabus, practical lab evaluations, periodic assessments, and board examination test strategies.',
      subjects: ['English Language & Literature', 'Mathematics (Standard / Basic)', 'Science (Theory & Practicals)', 'Social Science', 'Kannada Course / Hindi Course', 'CBSE Vocational Skill Subject'],
    },
  ];

  const filteredStages = activeStage === 'all' ? stages : stages.filter((s) => s.id === activeStage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* 1. Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          CBSE Curriculum & Pedagogy
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Academic Overview & Curricular Framework
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From early childhood sensory discovery in our dedicated Kreedo lab to rigorous Class X CBSE board preparation, our curriculum emphasizes conceptual mastery, critical inquiry, and ethical citizenship.
        </p>
      </div>

      {/* 2. Interactive Filter Bar: Segmented controls (interactive button styling) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-lg max-w-2xl">
        <button
          onClick={() => setActiveStage('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeStage === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Stages
        </button>
        <button
          onClick={() => setActiveStage('pre_primary')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeStage === 'pre_primary' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pre-Primary (Kreedo)
        </button>
        <button
          onClick={() => setActiveStage('primary')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeStage === 'primary' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Primary (I–V)
        </button>
        <button
          onClick={() => setActiveStage('middle')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeStage === 'middle' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Middle (VI–VIII)
        </button>
        <button
          onClick={() => setActiveStage('secondary')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeStage === 'secondary' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Secondary (IX–X)
        </button>
      </div>

      {/* 3. Stage Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStages.map((stage) => (
          <div
            key={stage.id}
            className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {stage.tag}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Age: {stage.age}
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-slate-900">
              {stage.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {stage.description}
            </p>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Key Subjects & Competencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stage.subjects.map((sub, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-0.5"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Assessment Pattern & CBSE Grading Scale */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
          <Calendar className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold font-serif text-slate-900">
            Assessment Pattern & CBSE Continuous Evaluation
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-bold text-slate-900 text-sm">Periodic Tests (PT-1 & PT-2)</h4>
            <p>
              Administered once per term to evaluate chapter-wise understanding, numerical problem-solving, and vocabulary. Includes short pen-paper tests along with classroom engagement rubrics.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-bold text-slate-900 text-sm">Internal Assessment (20 Marks)</h4>
            <p>
              Comprises subject enrichment activities, laboratory practicals, notebook maintenance, portfolio presentations, and speaking & listening skills (ASL) as prescribed by CBSE.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-bold text-slate-900 text-sm">Term-End Examinations (80 Marks)</h4>
            <p>
              Summative evaluations covering the full prescribed syllabus, adhering strictly to CBSE board question pattern, marking schemes, and standard 8-point grading (A1, A2, B1, B2, C1, C2, D, E).
            </p>
          </div>
        </div>
      </div>

      {/* 5. Class X Board Results Register */}
      <div className="bg-slate-900 text-white rounded-xl p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-widest">
              CBSE All India Secondary School Examination (AISSE)
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-1">
              Class X Board Performance Register
            </h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded">
            Approved Annual Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Academic Year</th>
                <th className="py-3 px-4">Examination</th>
                <th className="py-3 px-4 tabular-nums">Registered</th>
                <th className="py-3 px-4 tabular-nums">Appeared</th>
                <th className="py-3 px-4 tabular-nums">Passed</th>
                <th className="py-3 px-4 tabular-nums font-bold text-amber-400">Pass Percentage</th>
                <th className="py-3 px-4">Verification Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {cbseResults.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-white">{r.academicYear}</td>
                  <td className="py-3.5 px-4 text-slate-300">{r.examination}</td>
                  <td className="py-3.5 px-4 tabular-nums text-slate-300">{r.appearedCount}</td>
                  <td className="py-3.5 px-4 tabular-nums text-slate-300">{r.appearedCount}</td>
                  <td className="py-3.5 px-4 tabular-nums text-slate-300">{r.passedCount}</td>
                  <td className="py-3.5 px-4 tabular-nums font-bold text-amber-400">{r.passPercentage}%</td>
                  <td className="py-3.5 px-4 text-slate-400">{r.supportingReportNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Prescribed Books Declaration & Pedagogy Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wide">
            <FileCheck className="w-4 h-4" />
            <span>Prescribed Books Declaration (Rule 2.4.7)</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Strict NCERT Curriculum Compliance
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The school strictly follows NCERT / CBSE prescribed textbooks. In accordance with CBSE Affiliation Bye-Laws Rule 2.4.7, no student is compelled to purchase unauthorized private publisher bundles. The complete booklist declaration is accessible under Mandatory Disclosures.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wide">
            <GraduationCap className="w-4 h-4" />
            <span>Faculty Capacity Building</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Mandatory Continuous Professional Development
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our teaching staff completes over 50 hours of annual training through CBSE Centres of Excellence (CoE), DIKSHA online modules, and specialized Kreedo early childhood workshops covering NEP 2020 pedagogy and experiential methodologies.
          </p>
        </div>
      </div>
    </div>
  );
};
