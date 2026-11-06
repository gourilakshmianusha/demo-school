import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Bell,
  MapPin,
  Phone,
  FileCheck,
  Shield,
  Layers,
} from 'lucide-react';

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ setActiveTab }) => {
  const {
    contactSettings,
    facilities,
    notices,
    cbseResults,
    events,
    addEnquiry,
    setIsPortalView,
  } = useSchool();

  // Enquiry quick form state
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [classInterestedIn, setClassInterestedIn] = useState('Class I');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone) return;
    const ref = addEnquiry({
      parentName,
      phone,
      email,
      studentName,
      classInterestedIn,
      academicYear: '2025-2026',
      preferredContactMethod: 'phone',
      message: message || 'General admission enquiry submitted via website home page.',
    });
    setSubmittedRef(ref);
    setParentName('');
    setPhone('');
    setEmail('');
    setStudentName('');
    setMessage('');
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Announcement Ticker Bar */}
      <section className="bg-amber-500 text-slate-950 font-medium text-xs sm:text-sm py-2.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-slate-950 text-amber-400 font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider shrink-0">
              Notice
            </span>
            <div className="truncate text-slate-900 font-semibold">
              Admissions Open for Academic Year 2025–2026 (Pre-Primary Kreedo to Class X) · CBSE Affiliation No: 830277 · Hubli
            </div>
          </div>
          <button
            onClick={() => setActiveTab('admissions')}
            className="hidden sm:inline-flex items-center gap-1 text-slate-950 font-bold hover:underline shrink-0 text-xs"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 2. Hero Section: 2-Column Split Balanced */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 7 Cols */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 tracking-wide flex-wrap">
              <span className="font-serif font-black text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                DKPS HUBLI
              </span>
              <span>CBSE Affiliated · School No. 45206</span>
              <span aria-hidden="true">·</span>
              <span>Hubli, Karnataka</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Empowering Minds Through Experiential Learning & Enduring Values
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Managed by <strong className="text-slate-900 font-semibold">J K Education Society (R)</strong>, <strong className="text-slate-900">DKPS Hubli</strong> (Smt Drakshayani Kalyanshettar Public School) offers structured CBSE education from Pre-Primary to Class X, anchored by the tactile <strong className="text-slate-900">Kreedo Early Childhood Lab</strong> and the lush outdoor <strong className="text-slate-900">Swami Vivekananda Kids Park</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('admissions')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all hover:translate-y-[-1px] flex items-center gap-2"
              >
                <span>Admission Process 2025–26</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => setActiveTab('disclosures')}
                className="px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4 text-slate-600" />
                <span>Mandatory Disclosures</span>
              </button>
            </div>

            {/* Quick trust metrics: Clean unboxed metadata with separators */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>NCERT & NEP 2020 Aligned</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pre-Primary Kreedo 6T Lab</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Class X Board 100% Pass</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Cols Authentic School Campus Photography */}
          <div className="lg:col-span-5 relative flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 flex-1 min-h-[380px]">
              <img
                src="/src/assets/images/school_campus_hero_1793884221999.jpg"
                alt="Smt Drakshayani Kalyanshettar Public School Campus, Hubli"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                  Main Campus · Shakti Colony, Hubli
                </span>
                <p className="text-sm text-slate-200 font-medium">
                  Spacious educational infrastructure with dedicated activity centers, sports ground, and landscaped outdoor parks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Statistical Highlights (With explicit verification note) */}
      <section className="bg-white border-y border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tabular-nums">
                830277
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                CBSE Affiliation
              </div>
              <div className="text-[11px] text-slate-400">Regular provisional status</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tabular-nums">
                100%
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Class X AISSE Pass Result
              </div>
              <div className="text-[11px] text-slate-400">AY 2023–24 (38/38 Candidates)</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tabular-nums">
                Pre-K to X
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Approved Classes
              </div>
              <div className="text-[11px] text-slate-400">Kreedo Early Childhood to Secondary</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tabular-nums">
                150+
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Kreedo Learning Manipulatives
              </div>
              <div className="text-[11px] text-slate-400">Early childhood sensory lab</div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
            <span>Governance Note: All academic parameters verified against CBSE OASIS registry & school management committee disclosures.</span>
          </div>
        </div>
      </section>

      {/* 4. Signature Distinctive Facilities (Kreedo Lab & Swami Vivekananda Park) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
            Distinctive Campus Highlights
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Nurturing Environment for Holistic Child Development
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our campus features dedicated spaces purposefully designed for motor, cognitive, and creative enrichment, backed by verified academic sources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Swami Vivekananda Kids Park */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="h-52 overflow-hidden bg-slate-100 relative">
              <img
                src="/src/assets/images/swami_vivekananda_park_1793884223926.jpg"
                alt="Swami Vivekananda Kids Park"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-amber-400 text-[11px] font-semibold px-2.5 py-1 rounded">
                Outdoor Adventure & Play
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">
                  Swami Vivekananda Kids Park
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Vibrant, landscaped outdoor children’s park equipped with safe multi-play stations, swings, and greenery for early physical agility, social interaction, and motor coordination.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Classes: Nursery to Class IV</span>
                <span className="text-emerald-700 font-medium">● Confirmed Facility</span>
              </div>
            </div>
          </div>

          {/* Card 2: Pre-Primary Kreedo Early Learning Lab */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="h-52 overflow-hidden bg-slate-100 relative">
              <img
                src="/src/assets/images/kreedo_preprimary_lab_1793884223521.jpg"
                alt="Pre-Primary Kreedo Early Learning Lab"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-amber-400 text-[11px] font-semibold px-2.5 py-1 rounded">
                Sensory & Cognitive Lab
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">
                  Pre-Primary Kreedo Lab
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Specialized Montessori-aligned early childhood environment featuring over 150+ wooden manipulatives and activity tables, fostering self-directed discovery and foundational numeracy.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Nursery, LKG, UKG</span>
                <span className="text-emerald-700 font-medium">● Confirmed Facility</span>
              </div>
            </div>
          </div>

          {/* Card 3: Art-Integrated & Science Project Center */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="h-52 overflow-hidden bg-slate-100 relative">
              <img
                src="/src/assets/images/art_science_exhibition_1793884224487.jpg"
                alt="Art-Integrated & Science Project Center"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-amber-400 text-[11px] font-semibold px-2.5 py-1 rounded">
                Experiential Learning
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">
                  Science & Art Innovation Center
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Dedicated exhibition hall for students to showcase working scientific models, sustainable environmental projects, and Karnataka folk art craft as mandated by CBSE NEP 2020 guidelines.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Classes III to X</span>
                <span className="text-emerald-700 font-medium">● Confirmed Facility</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Academic Stages Overview (Strictly Pre-Primary to Class X) */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Academic Stages
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
              Curricular Continuum (Pre-Primary through Class X)
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Structured progressive curriculum adhering strictly to CBSE standards and NCERT frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Stage 1</span>
              <h3 className="text-base font-bold text-slate-900">Pre-Primary (Kreedo)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nursery, LKG, and UKG. Focus on sensory perception, phonetic awareness, social habits, and manipulative-based mathematical concepts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Stage 2</span>
              <h3 className="text-base font-bold text-slate-900">Primary (Classes I–V)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Core linguistic fluency, arithmetic operations, environmental studies, art-integrated activities, and cooperative learning habits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Stage 3</span>
              <h3 className="text-base font-bold text-slate-900">Middle School (VI–VIII)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Subject-specific conceptual rigor in Mathematics, Science (Physics, Chemistry, Biology), Social Sciences, Second Language, and Vocational Skills.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Stage 4</span>
              <h3 className="text-base font-bold text-slate-900">Secondary (Classes IX–X)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous CBSE Board examination preparation, laboratory practicals, internal assessments, and board curriculum mastery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Class X Board Results Snapshot Adjacency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 rounded-2xl text-white p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400">
                <Award className="w-4 h-4" />
                <span>CBSE AISSE Board Examination Snapshot</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Academic Excellence with 100% Pass Record
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our Class X students consistently register top performance in the All India Secondary School Examination (AISSE). In the 2023–24 examination, all 38 registered students appeared and passed with outstanding distinction.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400">Academic Year:</span> <strong>2023–2024</strong>
                </div>
                <div>
                  <span className="text-slate-400">Appeared:</span> <strong>38</strong>
                </div>
                <div>
                  <span className="text-slate-400">Passed:</span> <strong>38 (100%)</strong>
                </div>
                <div>
                  <span className="text-slate-400">Previous Year (2022–23):</span> <strong>32/32 Passed (100%)</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center gap-3">
              <button
                onClick={() => setActiveTab('academics')}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors text-center"
              >
                View Detailed Results & Pedagogy Plan →
              </button>
              <button
                onClick={() => setActiveTab('disclosures')}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-lg transition-colors text-center"
              >
                Download CBSE Appendix IX Disclosure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Latest Notices & Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Notices & Circulars (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-600" />
                <h3 className="font-serif font-bold text-lg text-slate-900">Official Notices & Circulars</h3>
              </div>
              <button
                onClick={() => setActiveTab('news_events')}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                View Archive →
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700 uppercase">{notice.targetAudience}</span>
                    <span aria-hidden="true">·</span>
                    <span>{notice.publishDate}</span>
                    {notice.isHighPriority && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-700 font-bold">Important</span>
                      </>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">{notice.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Upcoming / Recent Events (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <h3 className="font-serif font-bold text-lg text-slate-900">Student Activities & Events</h3>
              </div>
              <button
                onClick={() => setActiveTab('student_life')}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                All Activities →
              </button>
            </div>

            <div className="space-y-3">
              {events.slice(0, 2).map((evt) => (
                <div
                  key={evt.id}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="w-24 h-20 rounded-md overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={evt.coverImage}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[11px] font-medium text-amber-700">
                      {evt.category} · {evt.academicYear}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 truncate">{evt.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Online Admission Enquiry Form on Homepage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100 rounded-2xl p-6 sm:p-10 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Admissions 2025–2026
              </span>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Register Your Admission Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We welcome parent enquiries for Nursery, LKG, UKG (Kreedo) and Classes I through X. Our admissions office will contact you with syllabus details, campus orientation schedules, and fee breakdowns.
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>Admissions Helpline: {contactSettings.primaryTelephone} / {contactSettings.secondaryTelephone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>Campus: Shakti Colony, Near Adhyapak Nagar, Hubli</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              {submittedRef ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Enquiry Received Successfully!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you. Your enquiry reference number is{' '}
                    <strong className="text-slate-900 font-mono text-sm bg-slate-100 px-2 py-0.5 rounded">{submittedRef}</strong>.
                    Our admissions counselor will reach out within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Ramesh Patil"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Contact *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Child's full name"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Class Interested In</label>
                      <select
                        value={classInterestedIn}
                        onChange={(e) => setClassInterestedIn(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      >
                        <option value="Nursery (Kreedo)">Nursery (Kreedo 2.5+ yrs)</option>
                        <option value="LKG (Kreedo)">LKG (Kreedo 3.5+ yrs)</option>
                        <option value="UKG (Kreedo)">UKG (Kreedo 4.5+ yrs)</option>
                        <option value="Class I">Class I</option>
                        <option value="Class II">Class II</option>
                        <option value="Class III">Class III</option>
                        <option value="Class IV">Class IV</option>
                        <option value="Class V">Class V</option>
                        <option value="Class VI">Class VI</option>
                        <option value="Class VII">Class VII</option>
                        <option value="Class VIII">Class VIII</option>
                        <option value="Class IX">Class IX</option>
                        <option value="Class X">Class X</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Questions / Specific Requests</label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any specific query regarding Kreedo transition, syllabus, or school timings..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Academic Year 2025–2026 Admissions
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
