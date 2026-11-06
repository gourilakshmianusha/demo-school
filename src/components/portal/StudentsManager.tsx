import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  Search,
  Filter,
  FileText,
  Award,
  Phone,
  MapPin,
  CheckCircle,
  FileCheck,
  UserMinus,
  X,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Save,
  Check,
} from 'lucide-react';
import { StudentRecord } from '../../types';
import { ReportCardModal } from './ReportCardModal';

export const StudentsManager: React.FC = () => {
  const { students, marks, classes, addStudent, updateStudent, deleteStudent, showToast } = useSchool();
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeReportStudent, setActiveReportStudent] = useState<StudentRecord | null>(null);
  const [viewProfileStudent, setViewProfileStudent] = useState<StudentRecord | null>(null);

  // CRUD Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<StudentRecord>>({
    admissionNo: '',
    rollNo: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '2012-05-15',
    gender: 'male',
    bloodGroup: 'B+',
    classId: 'cls_1',
    className: 'Class I',
    section: 'A',
    academicYear: '2024-2025',
    enrolmentDate: new Date().toISOString().split('T')[0],
    status: 'active',
    address: 'Hubli, Karnataka',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianRelation: 'Father',
    emergencyContact: '',
    aadhaarConfirmed: true,
  });

  const handleOpenAdd = () => {
    const nextAdm = `DKPS/2024/${(students.length + 101).toString().padStart(4, '0')}`;
    setFormData({
      admissionNo: nextAdm,
      rollNo: (students.length + 1).toString(),
      firstName: '',
      lastName: '',
      dateOfBirth: '2012-05-15',
      gender: 'male',
      bloodGroup: 'B+',
      classId: classes[0]?.id || 'cls_1',
      className: classes[0]?.name || 'Class I',
      section: 'A',
      academicYear: '2024-2025',
      enrolmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      address: 'Hubli, Karnataka',
      guardianName: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianRelation: 'Father',
      emergencyContact: '',
      aadhaarConfirmed: true,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student: StudentRecord) => {
    setEditingStudent(student);
    setFormData({ ...student });
  };

  const handleClassChange = (classId: string) => {
    const selected = classes.find((c) => c.id === classId);
    setFormData((prev) => ({
      ...prev,
      classId,
      className: selected?.name || 'Class I',
    }));
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.admissionNo || !formData.guardianPhone) {
      showToast('Please fill in student name, admission number, and guardian phone.', 'warning');
      return;
    }

    addStudent(formData as Omit<StudentRecord, 'id'>);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    updateStudent(editingStudent.id, formData);
    setEditingStudent(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete student record for "${name}"?`)) {
      deleteStudent(id);
      if (viewProfileStudent?.id === id) setViewProfileStudent(null);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesClass = selectedClass === 'all' || s.classId === selectedClass;
    const matchesSearch =
      s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Student Directory & Enrolment Management
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200">
              {students.length} Enrolled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full CRUD operations: Register new students, update academic profiles, manage sections, and generate CBSE progress reports.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Classes ({students.length})</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student or Adm No..."
              className="pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>

          {/* CREATE: Add Student Button */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* 2. Students Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Adm No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class & Sec</th>
                <th className="py-3 px-4">Parent / Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">CRUD Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No students found matching your search.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {std.admissionNo}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">
                        {std.firstName} {std.lastName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        DOB: {std.dateOfBirth} · Roll #{std.rollNo || 'N/A'} · {std.gender}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {std.className} – {std.section}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800">{std.guardianName} ({std.guardianRelation})</div>
                      <div className="text-[11px] font-mono text-slate-500">{std.guardianPhone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${
                          std.status === 'active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {std.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* READ: Profile */}
                        <button
                          onClick={() => setViewProfileStudent(std)}
                          className="px-2 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                          title="View Full Profile (Read)"
                        >
                          Profile
                        </button>
                        {/* READ: Report Card */}
                        <button
                          onClick={() => setActiveReportStudent(std)}
                          className="px-2 py-1 text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1 shadow-sm"
                          title="View CBSE Progress Report"
                        >
                          <Award className="w-3 h-3 text-amber-400" />
                          <span className="hidden sm:inline">Report</span>
                        </button>
                        {/* UPDATE: Edit */}
                        <button
                          onClick={() => handleOpenEdit(std)}
                          className="p-1 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="Edit Student (Update)"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {/* DELETE: Delete */}
                        <button
                          onClick={() => handleDelete(std.id, `${std.firstName} ${std.lastName}`)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete Student Record (Delete)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL: Add New Student */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
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
                  Register New Student (Create Record)
                </h3>
                <p className="text-xs text-slate-500">
                  Enter student admission particulars, guardian contacts, and class placement.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Admission No *</label>
                  <input
                    type="text"
                    required
                    value={formData.admissionNo || ''}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. Ramesh"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. Patil"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class *</label>
                  <select
                    value={formData.classId}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Section *</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Roll No</label>
                  <input
                    type="text"
                    value={formData.rollNo || ''}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. 15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={formData.bloodGroup || 'B+'}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="transferred">Transferred</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h4 className="font-semibold text-slate-800 mb-2">Guardian Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.guardianName || ''}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      placeholder="e.g. Savitri Patil"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Guardian Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.guardianPhone || ''}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                      placeholder="e.g. 9845123450"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Relation</label>
                    <select
                      value={formData.guardianRelation}
                      onChange={(e) => setFormData({ ...formData, guardianRelation: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Shakti Colony, Hubli"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save Student Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE MODAL: Edit Existing Student */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
            <button
              onClick={() => setEditingStudent(null)}
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
                  Edit Student Profile (Update Record)
                </h3>
                <p className="text-xs text-slate-500">
                  Editing record for {editingStudent.firstName} {editingStudent.lastName} ({editingStudent.admissionNo})
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Admission No</label>
                  <input
                    type="text"
                    required
                    value={formData.admissionNo || ''}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class *</label>
                  <select
                    value={formData.classId}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Roll No</label>
                  <input
                    type="text"
                    value={formData.rollNo || ''}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold"
                  >
                    <option value="active">Active</option>
                    <option value="transferred">Transferred</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Name</label>
                  <input
                    type="text"
                    value={formData.guardianName || ''}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Phone</label>
                  <input
                    type="tel"
                    value={formData.guardianPhone || ''}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Email</label>
                  <input
                    type="email"
                    value={formData.guardianEmail || ''}
                    onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDelete(editingStudent.id, `${editingStudent.firstName} ${editingStudent.lastName}`)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Student</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingStudent(null)}
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

      {/* READ: Student Profile Modal */}
      {viewProfileStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setViewProfileStudent(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-lg font-serif">
                {viewProfileStudent.firstName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-lg text-slate-900 truncate">
                  {viewProfileStudent.firstName} {viewProfileStudent.lastName}
                </h3>
                <div className="text-xs text-slate-500 font-mono">
                  Adm: {viewProfileStudent.admissionNo} · Roll: #{viewProfileStudent.rollNo || '14'}
                </div>
              </div>
              <button
                onClick={() => {
                  const s = viewProfileStudent;
                  setViewProfileStudent(null);
                  handleOpenEdit(s);
                }}
                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
              <div><strong>Class:</strong> {viewProfileStudent.className} – {viewProfileStudent.section}</div>
              <div><strong>Academic Year:</strong> {viewProfileStudent.academicYear}</div>
              <div><strong>Date of Birth:</strong> {viewProfileStudent.dateOfBirth}</div>
              <div><strong>Gender:</strong> <span className="capitalize">{viewProfileStudent.gender}</span></div>
              <div><strong>Blood Group:</strong> {viewProfileStudent.bloodGroup || 'B+'}</div>
              <div><strong>Status:</strong> <span className="capitalize font-semibold text-emerald-700">{viewProfileStudent.status}</span></div>
              <div><strong>Parent / Guardian:</strong> {viewProfileStudent.guardianName}</div>
              <div><strong>Relation:</strong> {viewProfileStudent.guardianRelation}</div>
              <div><strong>Parent Phone:</strong> <span className="font-mono">{viewProfileStudent.guardianPhone}</span></div>
              <div><strong>Emergency Phone:</strong> <span className="font-mono">{viewProfileStudent.emergencyContact || '0836-2958579'}</span></div>
              <div className="col-span-2"><strong>Address:</strong> {viewProfileStudent.address}</div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-semibold">✓ Aadhaar & CBSE Records Verified</span>
              <button
                onClick={() => {
                  const s = viewProfileStudent;
                  setViewProfileStudent(null);
                  setActiveReportStudent(s);
                }}
                className="px-3 py-1.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 flex items-center gap-1 shadow-sm"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>View CBSE Report Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Card Modal */}
      {activeReportStudent && (
        <ReportCardModal
          student={activeReportStudent}
          marks={marks}
          onClose={() => setActiveReportStudent(null)}
        />
      )}
    </div>
  );
};
