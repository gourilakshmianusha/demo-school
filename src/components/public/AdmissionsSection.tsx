import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  FileCheck,
  CheckCircle,
  HelpCircle,
  Search,
  ArrowRight,
  Upload,
  Calendar,
  AlertCircle,
  FileText,
  Clock,
  ShieldAlert,
} from 'lucide-react';

export const AdmissionsSection: React.FC = () => {
  const { addApplication, applications, addEnquiry } = useSchool();

  // Mode: Overview / Apply / Status / Enquiry
  const [activeTab, setActiveTab] = useState<'process' | 'apply' | 'status' | 'enquiry' | 'faq'>('process');

  // Application form fields
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [requestedClass, setRequestedClass] = useState('Class I');
  const [address, setAddress] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianRelation, setGuardianRelation] = useState('Father');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [birthCert, setBirthCert] = useState(true);
  const [aadhaarCopy, setAadhaarCopy] = useState(true);
  const [tcCopy, setTcCopy] = useState(false);
  const [marksCard, setMarksCard] = useState(false);

  const [submittedAppNum, setSubmittedAppNum] = useState<string | null>(null);

  // Status check field
  const [lookupAppNumber, setLookupAppNumber] = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupSearched, setLookupSearched] = useState(false);

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !guardianPhone || !dob) return;

    const appNum = addApplication({
      studentName,
      dateOfBirth: dob,
      gender,
      requestedClass,
      academicYear: '2025-2026',
      address,
      previousSchool,
      guardianName,
      guardianPhone,
      guardianEmail,
      guardianRelation,
      emergencyContact: emergencyContact || guardianPhone,
      documentChecklist: {
        birthCertificate: birthCert,
        aadhaarCopy,
        transferCertificate: tcCopy,
        marksCard,
        photosUploaded: true,
      },
      reviewNotes: 'Online application registered. Awaiting initial scrutiny.',
    });

    setSubmittedAppNum(appNum);
    // Clear form
    setStudentName('');
    setDob('');
    setAddress('');
    setPreviousSchool('');
    setGuardianName('');
    setGuardianPhone('');
    setGuardianEmail('');
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupSearched(true);
    const found = applications.find(
      (a) => a.applicationNumber.trim().toUpperCase() === lookupAppNumber.trim().toUpperCase()
    );
    setLookupResult(found || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* 1. Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          Admissions Portal (2025–2026)
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Admissions & Enrolment Guidelines
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Welcome to the admissions portal of Smt Drakshayani Kalyanshettar Public School. We invite applications for Nursery, LKG, UKG (Kreedo Curriculum) and Classes I to X.
        </p>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Transparency Notice:</strong> Online application & status tracking features represent modern system workflows designed to enhance convenience; offline applications remain fully accessible at the school admissions counter.
          </span>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-lg max-w-xl">
        <button
          onClick={() => setActiveTab('process')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'process' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Process & Eligibility
        </button>
        <button
          onClick={() => setActiveTab('apply')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'apply' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Online Application
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'status' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Check Application Status
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'faq' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Admission FAQs
        </button>
      </div>

      {/* Tab 1: Process & Eligibility */}
      {activeTab === 'process' && (
        <div className="space-y-12">
          {/* Step flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-700 font-mono">STEP 01</span>
              <h3 className="text-sm font-bold text-slate-900">Enquiry & Campus Visit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit an online enquiry or visit the admissions office to inspect the Kreedo Lab and Swami Vivekananda Kids Park.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-700 font-mono">STEP 02</span>
              <h3 className="text-sm font-bold text-slate-900">Application & Documents</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete the admission form with Birth Certificate, previous school marks card (if applicable), and child's photographs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-700 font-mono">STEP 03</span>
              <h3 className="text-sm font-bold text-slate-900">Interaction & Assessment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Informal sensory readiness observation for Kreedo toddlers, or foundational literacy/numeracy check for Classes I–X.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-700 font-mono">STEP 04</span>
              <h3 className="text-sm font-bold text-slate-900">Offer & Enrolment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upon offer confirmation, pay term fees and receive your permanent student admission number and portal credentials.
              </p>
            </div>
          </div>

          {/* Age Criteria Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-serif font-bold text-slate-900">
              Age Criteria & Class Eligibility (As of June 1, 2025)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-4">Class</th>
                    <th className="py-2.5 px-4">Minimum Age Requirement</th>
                    <th className="py-2.5 px-4">Curriculum Framework</th>
                    <th className="py-2.5 px-4">Key Learning Milestones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Nursery (Kreedo)</td>
                    <td className="py-3 px-4 text-slate-600">2 Years 6 Months +</td>
                    <td className="py-3 px-4 text-slate-600">Kreedo Early Childhood 6T</td>
                    <td className="py-3 px-4 text-slate-500">Sensory exploration, motor agility, toilet autonomy</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">LKG (Kreedo)</td>
                    <td className="py-3 px-4 text-slate-600">3 Years 6 Months +</td>
                    <td className="py-3 px-4 text-slate-600">Kreedo Early Childhood 6T</td>
                    <td className="py-3 px-4 text-slate-500">Phonics, letter tracing, 3D geometric shapes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">UKG (Kreedo)</td>
                    <td className="py-3 px-4 text-slate-600">4 Years 6 Months +</td>
                    <td className="py-3 px-4 text-slate-600">Kreedo Early Childhood 6T</td>
                    <td className="py-3 px-4 text-slate-500">Three-letter blending, basic arithmetic addition</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Class I</td>
                    <td className="py-3 px-4 text-slate-600">6 Years (as per NEP 2020)</td>
                    <td className="py-3 px-4 text-slate-600">NCERT / CBSE</td>
                    <td className="py-3 px-4 text-slate-500">Sentence reading, mathematical operations, EVS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Classes II to X</td>
                    <td className="py-3 px-4 text-slate-600">Progressive age alignment</td>
                    <td className="py-3 px-4 text-slate-600">NCERT / CBSE</td>
                    <td className="py-3 px-4 text-slate-500">Valid Transfer Certificate & previous grade report card</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Mandatory Documents for Enrolment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-700">
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Original Birth Certificate (for verification) + 2 photocopies</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Original Transfer Certificate (TC) counter-signed (Class II upwards)</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Previous academic report card / marksheet</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Aadhaar card copy of student & parents</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>4 recent passport size photographs of the child</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Caste/Category certificate (if applicable)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Online Application Form */}
      {activeTab === 'apply' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          {submittedAppNum ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Application Successfully Submitted!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Your application has been received by the admissions office. Please note your official application number below for tracking and communication.
              </p>
              <div className="py-2">
                <span className="font-mono text-lg font-bold text-amber-900 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
                  {submittedAppNum}
                </span>
              </div>
              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setLookupAppNumber(submittedAppNum);
                    setActiveTab('status');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Track Application Status
                </button>
                <button
                  onClick={() => setSubmittedAppNum(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  New Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">Student Particulars</h3>
                <p className="text-xs text-slate-500">Provide accurate details as recorded on the birth certificate.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="First Name, Middle Name, Surname"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Applying For Class *</label>
                  <select
                    value={requestedClass}
                    onChange={(e) => setRequestedClass(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Nursery (Kreedo)">Nursery (Kreedo)</option>
                    <option value="LKG (Kreedo)">LKG (Kreedo)</option>
                    <option value="UKG (Kreedo)">UKG (Kreedo)</option>
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Previous School (if any)</label>
                  <input
                    type="text"
                    value={previousSchool}
                    onChange={(e) => setPreviousSchool(e.target.value)}
                    placeholder="Name of previous school"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Flat number, Street, Locality in Hubli/Dharwad"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="border-b border-slate-200 pb-3 pt-2">
                <h3 className="text-base font-bold text-slate-900">Guardian Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Full Name *</label>
                  <input
                    type="text"
                    required
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="e.g. Sudhir Joshi"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship *</label>
                  <select
                    value={guardianRelation}
                    onChange={(e) => setGuardianRelation(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Contact *</label>
                  <input
                    type="tel"
                    required
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="Primary 10-digit number"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                    placeholder="For official circulars & invoices"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Alternate Contact</label>
                  <input
                    type="tel"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="Alternate phone number"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Documents Checklist Simulation */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-700">Available Document Check:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={birthCert}
                      onChange={(e) => setBirthCert(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Birth Certificate Copy Available</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aadhaarCopy}
                      onChange={(e) => setAadhaarCopy(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Aadhaar Card Copy Available</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tcCopy}
                      onChange={(e) => setTcCopy(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Transfer Certificate (TC) Available</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marksCard}
                      onChange={(e) => setMarksCard(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Previous Marksheet / Progress Report Available</span>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-600">
                <strong>Parent Declaration:</strong> I hereby declare that the particulars furnished above are true to the best of my knowledge and belief. I agree to abide by the rules and discipline of Smt Drakshayani Kalyanshettar Public School.
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
                >
                  Submit Official Application
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab 3: Check Application Status */}
      {activeTab === 'status' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-serif font-bold text-slate-900">
              Track Real-Time Application Status
            </h3>
            <p className="text-xs text-slate-500">
              Enter the application number received during online submission (e.g., <code className="text-slate-800 font-mono">APP/2025-26/0014</code>).
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="text"
              required
              value={lookupAppNumber}
              onChange={(e) => setLookupAppNumber(e.target.value)}
              placeholder="e.g. APP/2025-26/0014"
              className="flex-1 px-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Lookup</span>
            </button>
          </form>

          {lookupSearched && (
            <div className="pt-4 border-t border-slate-100">
              {lookupResult ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-700">
                      {lookupResult.applicationNumber}
                    </span>
                    <span className="text-xs font-bold capitalize px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      {lookupResult.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div><strong>Student:</strong> {lookupResult.studentName}</div>
                    <div><strong>Requested Class:</strong> {lookupResult.requestedClass}</div>
                    <div><strong>Parent:</strong> {lookupResult.guardianName}</div>
                    <div><strong>Submitted:</strong> {lookupResult.submittedAt}</div>
                  </div>

                  <div className="p-2.5 bg-white rounded border border-slate-200 text-xs text-slate-700">
                    <strong>Admission Office Remark:</strong>{' '}
                    <span>{lookupResult.reviewNotes || 'Under administrative verification.'}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-500 space-y-1">
                  <p className="font-semibold text-slate-700">No application found matching "{lookupAppNumber}".</p>
                  <p>Please double-check the application code format or contact the admissions counter directly.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: FAQs */}
      {activeTab === 'faq' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-serif font-bold text-slate-900">
            Frequently Asked Admission Questions
          </h3>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-slate-50 rounded-lg space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">What is the Kreedo early childhood program in pre-primary?</h4>
              <p>
                Our pre-primary (Nursery, LKG, UKG) uses the accredited Kreedo 6T experiential methodology with 150+ manipulative materials. It bridges cognitive discovery with tangible toys before moving into standard CBSE pen-paper work.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Does the school offer admission for Class XI or XII?</h4>
              <p>
                No. In accordance with current CBSE affiliation regular approvals, the school caters from Pre-Primary through Class X (Secondary). Higher secondary streams (XI-XII) are not conducted.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Are hostel or residential boarding accommodations provided?</h4>
              <p>
                No. Smt Drakshayani Kalyanshettar Public School is strictly a day school.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">How are fee payments scheduled?</h4>
              <p>
                Fees are payable in two equal term instalments or an annual payment. Fee concessions are reviewed strictly on merit-cum-means by the J K Education Society board.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
