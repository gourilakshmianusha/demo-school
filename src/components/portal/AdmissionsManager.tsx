import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  UserCheck,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  FileText,
  Search,
  ArrowRight,
  ShieldAlert,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Check,
  Eye,
} from 'lucide-react';
import { AdmissionApplication, AdmissionEnquiry } from '../../types';

export const AdmissionsManager: React.FC = () => {
  const {
    applications,
    enquiries,
    classes,
    addApplication,
    updateApplication,
    deleteApplication,
    deleteEnquiry,
    updateApplicationStatus,
    convertApplicationToStudent,
    updateEnquiryStatus,
    showToast,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'applications' | 'enquiries'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);

  // CRUD Modals
  const [isAddAppOpen, setIsAddAppOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AdmissionApplication | null>(null);

  // Form State
  const [appForm, setAppForm] = useState<Partial<AdmissionApplication>>({
    studentName: '',
    dateOfBirth: '2019-06-15',
    gender: 'male',
    requestedClass: 'Pre-Primary (Kreedo)',
    academicYear: '2025-2026',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianRelation: 'Father',
    emergencyContact: '',
    address: 'Hubli, Karnataka',
    previousSchool: 'None / Home',
    status: 'submitted',
    documentChecklist: {
      birthCertificate: true,
      transferCertificate: false,
      marksCard: false,
      aadhaarCopy: true,
      photosUploaded: true,
    },
  });

  const handleOpenAdd = () => {
    setAppForm({
      studentName: '',
      dateOfBirth: '2019-06-15',
      gender: 'male',
      requestedClass: 'Pre-Primary (Kreedo)',
      academicYear: '2025-2026',
      guardianName: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianRelation: 'Father',
      emergencyContact: '',
      address: 'Hubli, Karnataka',
      previousSchool: 'None / Home',
      status: 'submitted',
      documentChecklist: {
        birthCertificate: true,
        transferCertificate: false,
        marksCard: false,
        aadhaarCopy: true,
        photosUploaded: true,
      },
    });
    setIsAddAppOpen(true);
  };

  const handleOpenEdit = (app: AdmissionApplication) => {
    setEditingApp(app);
    setAppForm({ ...app });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.studentName || !appForm.guardianPhone) {
      showToast('Student name and parent phone are required.', 'warning');
      return;
    }

    addApplication(appForm as Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'submittedAt' | 'status'>);
    setIsAddAppOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    updateApplication(editingApp.id, appForm);
    setEditingApp(null);
  };

  const handleDeleteApp = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete admission application for "${name}"?`)) {
      deleteApplication(id);
      if (selectedApp?.id === id) setSelectedApp(null);
    }
  };

  const handleDeleteEnq = (id: string, ref: string) => {
    if (window.confirm(`Delete admission enquiry "${ref}"?`)) {
      deleteEnquiry(id);
    }
  };

  const filteredApps = applications.filter((a) =>
    a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.guardianName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEnquiries = enquiries.filter((e) =>
    e.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.refNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Admissions & Application Desk
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200">
              {applications.length} Applications
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full CRUD: Create walk-in applications, edit applicant details, update review status, and convert to permanent enrolled students.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student, parent or ref..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>

          {/* CREATE: Direct Application */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* 2. Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg max-w-md text-xs font-semibold">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'applications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Applications Pipeline ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'enquiries' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Enquiries ({enquiries.length})
        </button>
      </div>

      {/* 3. Applications Table */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Application No</th>
                  <th className="py-3 px-4">Student Particulars</th>
                  <th className="py-3 px-4">Requested Class</th>
                  <th className="py-3 px-4">Parent Contact</th>
                  <th className="py-3 px-4">Documents</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">CRUD & Enrolment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No applications found. Click "New Application" to register one.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {app.applicationNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{app.studentName}</div>
                        <div className="text-[11px] text-slate-500">DOB: {app.dateOfBirth} · {app.gender}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {app.requestedClass}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-800">{app.guardianName} ({app.guardianRelation})</div>
                        <div className="text-[11px] font-mono text-slate-500">{app.guardianPhone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-[11px] text-slate-600 space-x-1">
                          <span>Birth: {app.documentChecklist.birthCertificate ? '✓' : '✗'}</span>
                          <span>·</span>
                          <span>Aadhaar: {app.documentChecklist.aadhaarCopy ? '✓' : '✗'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="capitalize font-semibold text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* READ */}
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                            title="View Full Application (Read)"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* UPDATE */}
                          <button
                            onClick={() => handleOpenEdit(app)}
                            className="p-1 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                            title="Edit Application (Update)"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDeleteApp(app.id, app.studentName)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Delete Application (Delete)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          {/* 1-Click Enrolment */}
                          {app.status !== 'enrolled' ? (
                            <button
                              onClick={() => convertApplicationToStudent(app.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded text-[11px] shadow-sm transition-colors"
                              title="Admit student and generate official Admission Number"
                            >
                              Admit Student
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-0.5">
                              <CheckCircle className="w-3 h-3" />
                              <span>Enrolled</span>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Enquiries Table with Delete */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Parent Details</th>
                  <th className="py-3 px-4">Student & Class</th>
                  <th className="py-3 px-4">Message / Query</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {enq.refNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{enq.parentName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{enq.phone} · {enq.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{enq.studentName || 'Not specified'}</div>
                      <div className="text-[11px] text-amber-800 font-semibold">{enq.classInterestedIn}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="text-slate-600 line-clamp-2 text-[11px] leading-tight">
                        {enq.message}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-semibold text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {enq.status === 'new' && (
                          <button
                            onClick={() => updateEnquiryStatus(enq.id, 'contacted', 'Contacted parent via telephone; shared school details.')}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded text-[11px]"
                          >
                            Mark Contacted
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteEnq(enq.id, enq.refNumber)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE MODAL: New Admission Application */}
      {isAddAppOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
            <button
              onClick={() => setIsAddAppOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Record Direct Admission Application (Create)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter walk-in applicant details to enter into the admission screening pipeline.
            </p>

            <form onSubmit={handleSaveAdd} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={appForm.studentName || ''}
                    onChange={(e) => setAppForm({ ...appForm, studentName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. Kavya Shettar"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Requested Class</label>
                  <select
                    value={appForm.requestedClass}
                    onChange={(e) => setAppForm({ ...appForm, requestedClass: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Pre-Primary (Kreedo)">Pre-Primary (Kreedo Lab)</option>
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={appForm.dateOfBirth}
                    onChange={(e) => setAppForm({ ...appForm, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={appForm.gender}
                    onChange={(e) => setAppForm({ ...appForm, gender: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={appForm.guardianName || ''}
                    onChange={(e) => setAppForm({ ...appForm, guardianName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. Mallikarjun Shettar"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Phone *</label>
                  <input
                    type="tel"
                    required
                    value={appForm.guardianPhone || ''}
                    onChange={(e) => setAppForm({ ...appForm, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                    placeholder="e.g. 9986141769"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={appForm.address || ''}
                  onChange={(e) => setAppForm({ ...appForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Shakti Colony, Hubli"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddAppOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL: Update Existing Application */}
      {editingApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
            <button
              onClick={() => setEditingApp(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Edit Application Particulars (Update)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Editing application {editingApp.applicationNumber} ({editingApp.studentName})
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={appForm.studentName || ''}
                    onChange={(e) => setAppForm({ ...appForm, studentName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Requested Class</label>
                  <select
                    value={appForm.requestedClass}
                    onChange={(e) => setAppForm({ ...appForm, requestedClass: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Pre-Primary (Kreedo)">Pre-Primary (Kreedo Lab)</option>
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Name</label>
                  <input
                    type="text"
                    value={appForm.guardianName || ''}
                    onChange={(e) => setAppForm({ ...appForm, guardianName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Phone</label>
                  <input
                    type="tel"
                    value={appForm.guardianPhone || ''}
                    onChange={(e) => setAppForm({ ...appForm, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pipeline Status</label>
                <select
                  value={appForm.status}
                  onChange={(e) => setAppForm({ ...appForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold"
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="assessment_scheduled">Assessment Scheduled</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="enrolled">Enrolled</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reviewer Remarks</label>
                <input
                  type="text"
                  value={appForm.reviewNotes || ''}
                  onChange={(e) => setAppForm({ ...appForm, reviewNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. Interaction completed satisfactorily."
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDeleteApp(editingApp.id, editingApp.studentName)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Application</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingApp(null)}
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

      {/* READ: Application View Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 pb-3">
              <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                {selectedApp.applicationNumber}
              </span>
              <h3 className="font-serif font-bold text-xl text-slate-900 mt-2">
                {selectedApp.studentName}
              </h3>
              <div className="text-xs text-slate-500">
                Applied for {selectedApp.requestedClass} · Session {selectedApp.academicYear}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
              <div><strong>DOB:</strong> {selectedApp.dateOfBirth}</div>
              <div><strong>Gender:</strong> <span className="capitalize">{selectedApp.gender}</span></div>
              <div><strong>Guardian:</strong> {selectedApp.guardianName} ({selectedApp.guardianRelation})</div>
              <div><strong>Phone:</strong> <span className="font-mono">{selectedApp.guardianPhone}</span></div>
              <div><strong>Previous School:</strong> {selectedApp.previousSchool || 'None'}</div>
              <div><strong>Status:</strong> <span className="capitalize font-semibold text-amber-800">{selectedApp.status.replace('_', ' ')}</span></div>
              <div className="col-span-2"><strong>Address:</strong> {selectedApp.address}</div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  const a = selectedApp;
                  setSelectedApp(null);
                  handleOpenEdit(a);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Particulars</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
