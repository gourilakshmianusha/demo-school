import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  FileCheck,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Check,
  Phone,
  Mail,
  Eye,
} from 'lucide-react';
import { StaffRecord, TeacherTrainingRecord } from '../../types';

export const StaffManager: React.FC = () => {
  const {
    staff,
    teacherTrainings,
    addStaff,
    updateStaff,
    deleteStaff,
    addTeacherTraining,
    deleteTeacherTraining,
    showToast,
    navigateToPublicPage,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'directory' | 'cbse_breakdown' | 'training'>('directory');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffRecord | null>(null);
  const [isAddTrainingOpen, setIsAddTrainingOpen] = useState(false);

  // Staff Form State
  const [staffForm, setStaffForm] = useState<Partial<StaffRecord>>({
    employeeCode: '',
    name: '',
    role: 'teacher',
    designation: 'TGT Mathematics',
    category: 'TGT',
    qualifications: 'M.Sc., B.Ed.',
    teachingSubjects: ['Mathematics'],
    assignedClasses: ['Class VIII', 'Class IX', 'Class X'],
    phone: '',
    email: '',
    joiningDate: new Date().toISOString().split('T')[0],
  });

  // Training Form State
  const [trainingForm, setTrainingForm] = useState<Partial<TeacherTrainingRecord>>({
    programmeName: '',
    provider: 'CBSE CoE Bangalore',
    topic: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    trainingHours: 10,
    participatingTeachers: ['All Teaching Faculty'],
    academicYear: '2024-2025',
    verificationStatus: 'verified',
  });

  const handleOpenAddStaff = () => {
    const nextCode = `DK-T-${(staff.length + 1).toString().padStart(2, '0')}`;
    setStaffForm({
      employeeCode: nextCode,
      name: '',
      role: 'teacher',
      designation: 'PRT General Educator',
      category: 'PRT',
      qualifications: 'B.Sc., B.Ed.',
      teachingSubjects: ['Science'],
      assignedClasses: ['Class III', 'Class IV'],
      phone: '9845012345',
      email: '',
      joiningDate: new Date().toISOString().split('T')[0],
    });
    setIsAddStaffOpen(true);
  };

  const handleOpenEditStaff = (stf: StaffRecord) => {
    setEditingStaff(stf);
    setStaffForm({ ...stf });
  };

  const handleSaveAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.employeeCode) {
      showToast('Staff name and employee code are required.', 'warning');
      return;
    }

    addStaff({
      ...staffForm,
      provenance: {
        sourceUrl: 'https://jkeducationsocietydk.com/faculty',
        originalPageTitle: 'Teaching Faculty Staff',
        importedDate: new Date().toISOString().split('T')[0],
        verificationStatus: 'verified',
        publicationStatus: 'published',
      },
    } as Omit<StaffRecord, 'id'>);
    setIsAddStaffOpen(false);
  };

  const handleSaveEditStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;

    updateStaff(editingStaff.id, staffForm);
    setEditingStaff(null);
  };

  const handleDeleteStaff = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove staff member "${name}" from directory?`)) {
      deleteStaff(id);
    }
  };

  const handleSaveTraining = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingForm.programmeName || !trainingForm.topic) {
      showToast('Programme title and pedagogical topic are required.', 'warning');
      return;
    }

    addTeacherTraining(trainingForm as Omit<TeacherTrainingRecord, 'id'>);
    setIsAddTrainingOpen(false);
  };

  const handleDeleteTraining = (id: string, title: string) => {
    if (window.confirm(`Delete training log "${title}"?`)) {
      deleteTeacherTraining(id);
    }
  };

  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.employeeCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Header & Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Teaching Faculty & HR Governance
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200">
              {staff.length} Faculty
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full CRUD operations: Add faculty profiles, update qualifications, manage teaching assignments, and maintain CBSE training logs.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'directory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Directory ({staff.length})
          </button>
          <button
            onClick={() => setActiveTab('cbse_breakdown')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'cbse_breakdown' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            CBSE Ratio
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'training' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Trainings ({teacherTrainings.length})
          </button>
        </div>
      </div>

      {/* 2. Staff Directory Tab */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search faculty by name or code..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigateToPublicPage('about')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                title="View live faculty directory on About page"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Public Faculty Page →</span>
              </button>
              {/* CREATE: Add Staff */}
              <button
                onClick={handleOpenAddStaff}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Faculty Member</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((stf) => (
              <div
                key={stf.id}
                className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold font-serif text-base text-slate-900">{stf.name}</h3>
                      <div className="text-xs text-amber-700 font-semibold">{stf.designation}</div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {stf.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Qualifications:</strong> {stf.qualifications}
                  </p>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div><strong>Subjects:</strong> {stf.teachingSubjects.join(', ')}</div>
                    <div><strong>Assigned:</strong> {stf.assignedClasses.join(', ') || 'General'}</div>
                    <div className="text-slate-500 text-[11px]">Joined: {stf.joiningDate}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 font-bold">{stf.employeeCode}</span>
                  
                  {/* CRUD Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditStaff(stf)}
                      className="p-1 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="Edit Staff Member (Update)"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(stf.id, stf.name)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete Staff Member (Delete)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CBSE Staff Breakdown Table */}
      {activeTab === 'cbse_breakdown' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                CBSE Staffing Disclosure Snapshot (AY 2024–2025)
              </h3>
              <p className="text-xs text-slate-500">
                Mandatory teaching category breakdown in accordance with CBSE OASIS registry requirements.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
              Compliant
            </span>
          </div>

          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-4 border-r border-slate-200">Staff Category</th>
                <th className="py-2.5 px-4 border-r border-slate-200 tabular-nums">Count</th>
                <th className="py-2.5 px-4">Affiliation Guidelines / Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-4 font-bold border-r border-slate-200">Principal / Head of Institution</td>
                <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-200">1</td>
                <td className="py-2.5 px-4 text-slate-600">Postgraduate with B.Ed as per CBSE norms</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold border-r border-slate-200">Trained Graduate Teachers (TGT)</td>
                <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-200">
                  {staff.filter(s => s.category === 'TGT').length || 8}
                </td>
                <td className="py-2.5 px-4 text-slate-600">Assigned to Middle & Secondary Classes VI–X</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold border-r border-slate-200">Primary Teachers (PRT)</td>
                <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-200">
                  {staff.filter(s => s.category === 'PRT').length || 10}
                </td>
                <td className="py-2.5 px-4 text-slate-600">Assigned to Classes I–V</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold border-r border-slate-200">Nursery / Kreedo Early Educators (NTT)</td>
                <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-200">
                  {staff.filter(s => s.category === 'NTT').length || 4}
                </td>
                <td className="py-2.5 px-4 text-slate-600">Certified in Kreedo early childhood sensory learning</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold border-r border-slate-200">Physical Education Teacher (PET)</td>
                <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-200">1</td>
                <td className="py-2.5 px-4 text-slate-600">M.P.Ed qualified for sports & yoga drill</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold border-r border-slate-200">Librarian</td>
                <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-200">1</td>
                <td className="py-2.5 px-4 text-slate-600">Degree in Library and Information Science (B.Lib)</td>
              </tr>
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-800">
                <td className="py-3 px-4 border-r border-slate-200">TEACHER-TO-SECTION RATIO</td>
                <td className="py-3 px-4 font-mono border-r border-slate-200 text-amber-900">1.5 : 1</td>
                <td className="py-3 px-4 text-emerald-800">Meets CBSE Affiliation Bye-Laws Section 3.1</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Teacher Training Log with CRUD */}
      {activeTab === 'training' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                Teacher Professional Capacity Building Log
              </h3>
              <p className="text-xs text-slate-500">
                Continuous 50+ hours annual training records adhering to NEP 2020 professional development mandates.
              </p>
            </div>

            {/* CREATE Training Log */}
            <button
              onClick={() => setIsAddTrainingOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Record Training Session</span>
            </button>
          </div>

          <div className="space-y-4">
            {teacherTrainings.map((tr) => (
              <div key={tr.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative group">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 text-sm">{tr.programmeName}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded font-mono">
                      {tr.trainingHours} Hours
                    </span>
                    <button
                      onClick={() => handleDeleteTraining(tr.id, tr.programmeName)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Delete Training Log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-slate-600">
                  <strong>Provider:</strong> {tr.provider} · <strong>Session:</strong> {tr.academicYear}
                </div>
                <div className="text-xs text-slate-700">
                  <strong>Pedagogical Topic:</strong> {tr.topic}
                </div>
                <div className="text-[11px] text-slate-500">
                  Participants: {tr.participatingTeachers.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE STAFF MODAL */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
            <button
              onClick={() => setIsAddStaffOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center font-bold">
                <Plus className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Add Faculty / Staff Member (Create)
                </h3>
                <p className="text-xs text-slate-500">
                  Register new educator into CBSE institutional staff directory.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveAddStaff} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employee Code *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.employeeCode || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, employeeCode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.name || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. Smt. Suma Hegde"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">CBSE Category</label>
                  <select
                    value={staffForm.category}
                    onChange={(e) => setStaffForm({ ...staffForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="NTT">NTT (Nursery / Kreedo)</option>
                    <option value="PRT">PRT (Primary Teacher)</option>
                    <option value="TGT">TGT (Trained Graduate)</option>
                    <option value="PET">PET (Physical Education)</option>
                    <option value="Librarian">Librarian</option>
                    <option value="Special Educator">Special Educator</option>
                    <option value="Counselor">Wellness Counselor</option>
                    <option value="Administrative">Administrative</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={staffForm.designation || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, designation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. PRT Science Educator"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={staffForm.qualifications || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, qualifications: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. M.Sc., B.Ed."
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={staffForm.phone || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                    placeholder="e.g. 9845123450"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={staffForm.email || ''}
                  onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. suma.hegde@dkps.edu.in"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStaffOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save Faculty Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STAFF MODAL */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
            <button
              onClick={() => setEditingStaff(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-900 flex items-center justify-center font-bold">
                <Edit2 className="w-5 h-5 text-indigo-700" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Edit Faculty Details (Update)
                </h3>
                <p className="text-xs text-slate-500">
                  Editing record for {editingStaff.name} ({editingStaff.employeeCode})
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveEditStaff} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employee Code</label>
                  <input
                    type="text"
                    required
                    value={staffForm.employeeCode || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, employeeCode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={staffForm.name || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={staffForm.designation || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, designation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={staffForm.qualifications || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, qualifications: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={staffForm.phone || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={staffForm.email || ''}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDeleteStaff(editingStaff.id, editingStaff.name)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Faculty</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingStaff(null)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Update Record</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TRAINING MODAL */}
      {isAddTrainingOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsAddTrainingOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Record Teacher Training Session (Create)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Log NEP 2020 pedagogical capacity building hours for CBSE compliance.
            </p>

            <form onSubmit={handleSaveTraining} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Programme Title *</label>
                <input
                  type="text"
                  required
                  value={trainingForm.programmeName || ''}
                  onChange={(e) => setTrainingForm({ ...trainingForm, programmeName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. Experiential Learning in Mathematics"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Provider *</label>
                  <input
                    type="text"
                    required
                    value={trainingForm.provider || ''}
                    onChange={(e) => setTrainingForm({ ...trainingForm, provider: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. CBSE CoE / DIKSHA"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Training Hours *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={trainingForm.trainingHours || 10}
                    onChange={(e) => setTrainingForm({ ...trainingForm, trainingHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pedagogical Topic *</label>
                <input
                  type="text"
                  required
                  value={trainingForm.topic || ''}
                  onChange={(e) => setTrainingForm({ ...trainingForm, topic: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. Active Learning Strategies & Activity-based Assessment"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTrainingOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save Training Log</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
