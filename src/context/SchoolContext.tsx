import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  SchoolContactSettings,
  AcademicYear,
  SchoolClass,
  StudentRecord,
  StaffRecord,
  TeacherTrainingRecord,
  AttendanceRecord,
  TimetableSlot,
  HomeworkRecord,
  MarkEntry,
  FeeInvoice,
  FeePayment,
  NoticeRecord,
  LeaveRequest,
  AdmissionEnquiry,
  AdmissionApplication,
  AppointmentRequest,
  FacilityRecord,
  DisclosureDocument,
  CBSEClassXResultSnapshot,
  PublicEventRecord,
  VerificationStatus,
} from '../types';
import {
  initialContactSettings,
  initialAcademicYears,
  initialClasses,
  initialStudents,
  initialStaff,
  initialTeacherTrainings,
  initialFacilities,
  initialDisclosures,
  initialCBSEClassXResults,
  initialEvents,
  initialNotices,
  initialFeeInvoices,
  initialFeePayments,
  initialMarks,
  initialHomework,
  initialTimetable,
  initialEnquiries,
  initialApplications,
  initialAppointments,
  demoProfiles,
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface SchoolContextType {
  // Auth & Roles
  currentUser: UserProfile;
  currentRoleKey: string;
  setCurrentRole: (roleKey: string) => void;
  isAuthenticated: boolean;
  isLoginPageOpen: boolean;
  setIsLoginPageOpen: (val: boolean) => void;
  targetLoginRole: string;
  setTargetLoginRole: (roleKey: string) => void;
  openLoginForRole: (roleKey?: string) => void;
  openSuperAdminLogin: () => void;
  closeLoginPage: () => void;
  loginUser: (roleKey: string, credentials?: { username: string; password?: string }) => boolean;
  logoutUser: () => void;
  isPortalView: boolean;
  setIsPortalView: (val: boolean) => void;
  activeChildId: string;
  setActiveChildId: (id: string) => void;

  // Localization & Preferences
  language: 'en' | 'kn' | 'hi';
  setLanguage: (lang: 'en' | 'kn' | 'hi') => void;

  // Data Collections
  contactSettings: SchoolContactSettings;
  updateContactSettings: (settings: Partial<SchoolContactSettings>) => void;
  academicYears: AcademicYear[];
  currentAcademicYear: string;
  setCurrentAcademicYear: (year: string) => void;
  classes: SchoolClass[];
  students: StudentRecord[];
  staff: StaffRecord[];
  teacherTrainings: TeacherTrainingRecord[];
  facilities: FacilityRecord[];
  disclosures: DisclosureDocument[];
  cbseResults: CBSEClassXResultSnapshot[];
  events: PublicEventRecord[];
  notices: NoticeRecord[];
  feeInvoices: FeeInvoice[];
  feePayments: FeePayment[];
  marks: MarkEntry[];
  homework: HomeworkRecord[];
  timetable: TimetableSlot[];
  enquiries: AdmissionEnquiry[];
  applications: AdmissionApplication[];
  appointments: AppointmentRequest[];
  leaveRequests: LeaveRequest[];
  attendanceRecords: AttendanceRecord[];

  // Mutators & Workflows
  addEnquiry: (data: Omit<AdmissionEnquiry, 'id' | 'refNumber' | 'submittedAt' | 'status'>) => string;
  updateEnquiryStatus: (id: string, status: AdmissionEnquiry['status'], followUpNotes?: string) => void;
  addApplication: (data: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'submittedAt' | 'status'>) => string;
  updateApplicationStatus: (id: string, status: AdmissionApplication['status'], reviewNotes?: string) => void;
  convertApplicationToStudent: (appId: string) => void;
  addAppointment: (data: Omit<AppointmentRequest, 'id' | 'submittedAt' | 'status'>) => string;
  updateAppointmentStatus: (id: string, status: AppointmentRequest['status'], confirmedDate?: string) => void;
  
  // Fees
  recordFeePayment: (invoiceId: string, amount: number, mode: 'Cash' | 'Cheque' | 'Online/UPI' | 'NEFT/RTGS', refNo?: string) => FeePayment;
  createInvoice: (invoice: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'balanceAmount' | 'paidAmount' | 'status'>) => void;
  
  // Attendance
  markAttendance: (records: Omit<AttendanceRecord, 'id'>[]) => void;
  
  // Marks & Homework
  recordMark: (mark: Omit<MarkEntry, 'id'>) => void;
  addHomework: (hw: Omit<HomeworkRecord, 'id' | 'assignedDate' | 'submissionsCount'>) => void;
  
  // Notices & Leaves
  addNotice: (notice: Omit<NoticeRecord, 'id' | 'publishDate'>) => void;
  applyLeave: (leave: Omit<LeaveRequest, 'id' | 'appliedDate' | 'status'>) => void;
  updateLeaveStatus: (id: string, status: 'approved' | 'rejected', remarks?: string) => void;
  
  // Content & Verification
  updateItemVerification: (entityType: 'contact' | 'facility' | 'disclosure' | 'notice' | 'staff' | 'event', id: string, status: VerificationStatus, reviewerNotes?: string) => void;
  updateFacility: (facility: FacilityRecord) => void;
  addFacility: (facility: Omit<FacilityRecord, 'id'>) => void;
  deleteFacility: (id: string) => void;

  // Students CRUD
  addStudent: (data: Omit<StudentRecord, 'id'>) => void;
  updateStudent: (id: string, data: Partial<StudentRecord>) => void;
  deleteStudent: (id: string) => void;

  // Staff CRUD
  addStaff: (data: Omit<StaffRecord, 'id'>) => void;
  updateStaff: (id: string, data: Partial<StaffRecord>) => void;
  deleteStaff: (id: string) => void;
  addTeacherTraining: (training: Omit<TeacherTrainingRecord, 'id'>) => void;
  deleteTeacherTraining: (id: string) => void;

  // Admissions CRUD
  updateApplication: (id: string, data: Partial<AdmissionApplication>) => void;
  deleteApplication: (id: string) => void;
  deleteEnquiry: (id: string) => void;

  // Fees CRUD
  updateInvoice: (id: string, data: Partial<FeeInvoice>) => void;
  deleteInvoice: (id: string) => void;
  deletePayment: (id: string) => void;

  // Timetable CRUD
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  updateTimetableSlot: (id: string, data: Partial<TimetableSlot>) => void;
  deleteTimetableSlot: (id: string) => void;

  // Homework CRUD
  updateHomework: (id: string, data: Partial<HomeworkRecord>) => void;
  deleteHomework: (id: string) => void;

  // Marks CRUD
  deleteMark: (id: string) => void;

  // Notices CRUD
  updateNotice: (id: string, data: Partial<NoticeRecord>) => void;
  deleteNotice: (id: string) => void;

  // Events & News CRUD
  addEvent: (event: Omit<PublicEventRecord, 'id'>) => void;
  updateEvent: (id: string, data: Partial<PublicEventRecord>) => void;
  deleteEvent: (id: string) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Reset
  resetToDefaultData: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user / role & authentication
  const [currentRoleKey, setCurrentRoleKey] = useState<string>(() => {
    return localStorage.getItem('dkps_active_role') || 'super_admin';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('dkps_auth') === 'true';
  });
  const [isLoginPageOpen, setIsLoginPageOpen] = useState<boolean>(false);
  const [targetLoginRole, setTargetLoginRole] = useState<string>('parent');
  const [isPortalView, setIsPortalView] = useState<boolean>(false);
  const [activeChildId, setActiveChildId] = useState<string>('std_001');
  const [language, setLanguage] = useState<'en' | 'kn' | 'hi'>('en');
  const [currentAcademicYear, setCurrentAcademicYear] = useState<string>('2024-2025');

  // Persistence helpers
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(`dkps_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const [contactSettings, setContactSettings] = useState<SchoolContactSettings>(() =>
    loadStored('contact', initialContactSettings)
  );
  const [academicYears] = useState<AcademicYear[]>(initialAcademicYears);
  const [classes] = useState<SchoolClass[]>(initialClasses);
  const [students, setStudents] = useState<StudentRecord[]>(() =>
    loadStored('students', initialStudents)
  );
  const [staff, setStaff] = useState<StaffRecord[]>(() =>
    loadStored('staff', initialStaff)
  );
  const [teacherTrainings, setTeacherTrainings] = useState<TeacherTrainingRecord[]>(() =>
    loadStored('trainings', initialTeacherTrainings)
  );
  const [facilities, setFacilities] = useState<FacilityRecord[]>(() =>
    loadStored('facilities', initialFacilities)
  );
  const [disclosures, setDisclosures] = useState<DisclosureDocument[]>(() =>
    loadStored('disclosures', initialDisclosures)
  );
  const [cbseResults, setCbseResults] = useState<CBSEClassXResultSnapshot[]>(() =>
    loadStored('cbse_results', initialCBSEClassXResults)
  );
  const [events, setEvents] = useState<PublicEventRecord[]>(() =>
    loadStored('events', initialEvents)
  );
  const [notices, setNotices] = useState<NoticeRecord[]>(() =>
    loadStored('notices', initialNotices)
  );
  const [feeInvoices, setFeeInvoices] = useState<FeeInvoice[]>(() =>
    loadStored('invoices', initialFeeInvoices)
  );
  const [feePayments, setFeePayments] = useState<FeePayment[]>(() =>
    loadStored('payments', initialFeePayments)
  );
  const [marks, setMarks] = useState<MarkEntry[]>(() =>
    loadStored('marks', initialMarks)
  );
  const [homework, setHomework] = useState<HomeworkRecord[]>(() =>
    loadStored('homework', initialHomework)
  );
  const [timetable, setTimetable] = useState<TimetableSlot[]>(() =>
    loadStored('timetable', initialTimetable)
  );
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>(() =>
    loadStored('enquiries', initialEnquiries)
  );
  const [applications, setApplications] = useState<AdmissionApplication[]>(() =>
    loadStored('applications', initialApplications)
  );
  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() =>
    loadStored('appointments', initialAppointments)
  );
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() =>
    loadStored('leave', [
      {
        id: 'lv_001',
        applicantType: 'student',
        applicantId: 'std_001',
        applicantName: 'Rohan Patil (Class VIII-A)',
        classOrDesignation: 'Class VIII-A',
        startDate: '2024-11-28',
        endDate: '2024-11-29',
        reason: 'Family religious function at hometown',
        status: 'approved',
        appliedDate: '2024-11-20',
        reviewedBy: 'Smt. Anitha Joshi',
        reviewRemarks: 'Granted. Please ensure homework completion.',
      },
    ])
  );
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() =>
    loadStored('attendance', [
      { id: 'att_01', date: '2024-11-22', classId: 'cls_8', section: 'A', studentId: 'std_001', studentName: 'Rohan Patil', status: 'present', markedBy: 'Smt. Anitha Joshi' },
      { id: 'att_02', date: '2024-11-22', classId: 'cls_3', section: 'B', studentId: 'std_002', studentName: 'Sneha Patil', status: 'present', markedBy: 'Smt. Rekha Shettar' },
      { id: 'att_03', date: '2024-11-22', classId: 'cls_10', section: 'A', studentId: 'std_003', studentName: 'Ananya Kulkarni', status: 'present', markedBy: 'Shri Basavaraj Hiremath' },
      { id: 'att_04', date: '2024-11-22', classId: 'cls_ukg', section: 'A', studentId: 'std_004', studentName: 'Varun Deshpande', status: 'present', markedBy: 'Smt. Rekha Shettar' },
    ])
  );

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dkps_contact', JSON.stringify(contactSettings));
      localStorage.setItem('dkps_students', JSON.stringify(students));
      localStorage.setItem('dkps_staff', JSON.stringify(staff));
      localStorage.setItem('dkps_trainings', JSON.stringify(teacherTrainings));
      localStorage.setItem('dkps_facilities', JSON.stringify(facilities));
      localStorage.setItem('dkps_disclosures', JSON.stringify(disclosures));
      localStorage.setItem('dkps_cbse_results', JSON.stringify(cbseResults));
      localStorage.setItem('dkps_events', JSON.stringify(events));
      localStorage.setItem('dkps_notices', JSON.stringify(notices));
      localStorage.setItem('dkps_invoices', JSON.stringify(feeInvoices));
      localStorage.setItem('dkps_payments', JSON.stringify(feePayments));
      localStorage.setItem('dkps_marks', JSON.stringify(marks));
      localStorage.setItem('dkps_homework', JSON.stringify(homework));
      localStorage.setItem('dkps_timetable', JSON.stringify(timetable));
      localStorage.setItem('dkps_enquiries', JSON.stringify(enquiries));
      localStorage.setItem('dkps_applications', JSON.stringify(applications));
      localStorage.setItem('dkps_appointments', JSON.stringify(appointments));
      localStorage.setItem('dkps_leave', JSON.stringify(leaveRequests));
      localStorage.setItem('dkps_attendance', JSON.stringify(attendanceRecords));
    } catch (e) {
      console.warn('Storage sync issue:', e);
    }
  }, [
    contactSettings,
    students,
    staff,
    teacherTrainings,
    facilities,
    disclosures,
    cbseResults,
    events,
    notices,
    feeInvoices,
    feePayments,
    marks,
    homework,
    timetable,
    enquiries,
    applications,
    appointments,
    leaveRequests,
    attendanceRecords,
  ]);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentUser = demoProfiles[currentRoleKey] || demoProfiles.super_admin;

  const setCurrentRole = (roleKey: string) => {
    if (demoProfiles[roleKey]) {
      setCurrentRoleKey(roleKey);
      localStorage.setItem('dkps_active_role', roleKey);
    }
  };

  const openLoginForRole = (roleKey: string = 'parent') => {
    setTargetLoginRole(roleKey);
    setIsLoginPageOpen(true);
    setIsPortalView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSuperAdminLogin = () => {
    setTargetLoginRole('super_admin');
    setIsLoginPageOpen(true);
    setIsPortalView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeLoginPage = () => {
    setIsLoginPageOpen(false);
  };

  const loginUser = (roleKey: string, credentials?: { username: string; password?: string }) => {
    if (demoProfiles[roleKey]) {
      setCurrentRoleKey(roleKey);
      setIsAuthenticated(true);
      setIsLoginPageOpen(false);
      setIsPortalView(true);
      localStorage.setItem('dkps_auth', 'true');
      localStorage.setItem('dkps_active_role', roleKey);
      showToast(`Welcome back, ${demoProfiles[roleKey].name}! Signed in as ${demoProfiles[roleKey].designation}.`, 'success');
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setIsPortalView(false);
    setIsLoginPageOpen(false);
    localStorage.removeItem('dkps_auth');
    showToast('You have been securely signed out of the school portal.', 'info');
  };

  const updateContactSettings = (newSettings: Partial<SchoolContactSettings>) => {
    setContactSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('School contact & governance configuration updated successfully.');
  };

  const addEnquiry = (data: Omit<AdmissionEnquiry, 'id' | 'refNumber' | 'submittedAt' | 'status'>) => {
    const count = enquiries.length + 101;
    const refNumber = `ENQ/2024/${count.toString().padStart(3, '0')}`;
    const newEnq: AdmissionEnquiry = {
      ...data,
      id: `enq_${Date.now()}`,
      refNumber,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new',
    };
    setEnquiries((prev) => [newEnq, ...prev]);
    showToast(`Admission enquiry registered! Reference No: ${refNumber}`);
    return refNumber;
  };

  const updateEnquiryStatus = (id: string, status: AdmissionEnquiry['status'], followUpNotes?: string) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status,
              followUpNotes: followUpNotes ?? e.followUpNotes,
              assignedStaff: currentUser.name,
            }
          : e
      )
    );
    showToast('Enquiry follow-up updated.');
  };

  const addApplication = (data: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'submittedAt' | 'status'>) => {
    const count = applications.length + 15;
    const applicationNumber = `APP/2025-26/${count.toString().padStart(4, '0')}`;
    const newApp: AdmissionApplication = {
      ...data,
      id: `app_${Date.now()}`,
      applicationNumber,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'submitted',
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application successfully submitted! Application Number: ${applicationNumber}`);
    return applicationNumber;
  };

  const updateApplicationStatus = (id: string, status: AdmissionApplication['status'], reviewNotes?: string) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              reviewNotes: reviewNotes ?? a.reviewNotes,
            }
          : a
      )
    );
    showToast(`Application status updated to ${status.replace('_', ' ')}.`);
  };

  const convertApplicationToStudent = (appId: string) => {
    const app = applications.find((a) => a.id === appId);
    if (!app) return;

    // Check duplicate admission
    const existing = students.find((s) => s.firstName.toLowerCase() === app.studentName.split(' ')[0].toLowerCase() && s.guardianPhone === app.guardianPhone);
    if (existing) {
      showToast('A student with this name and parent phone is already enrolled!', 'warning');
      return;
    }

    const admNo = `DKPS/2025/${(students.length + 1).toString().padStart(4, '0')}`;
    const newStudent: StudentRecord = {
      id: `std_${Date.now()}`,
      admissionNo: admNo,
      rollNo: (students.length + 1).toString(),
      firstName: app.studentName.split(' ')[0] || app.studentName,
      lastName: app.studentName.split(' ').slice(1).join(' ') || '',
      dateOfBirth: app.dateOfBirth,
      gender: app.gender,
      classId: 'cls_1',
      className: app.requestedClass,
      section: 'A',
      academicYear: '2025-2026',
      enrolmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      address: app.address,
      guardianName: app.guardianName,
      guardianPhone: app.guardianPhone,
      guardianEmail: app.guardianEmail,
      guardianRelation: app.guardianRelation as any,
      emergencyContact: app.emergencyContact,
      aadhaarConfirmed: app.documentChecklist.aadhaarCopy,
      previousSchool: app.previousSchool,
    };

    setStudents((prev) => [...prev, newStudent]);
    updateApplicationStatus(appId, 'enrolled', `Enrolled as ${newStudent.firstName} ${newStudent.lastName} with Admission No: ${admNo}`);
    showToast(`Student admitted! Permanent Admission No: ${admNo}`);
  };

  const addAppointment = (data: Omit<AppointmentRequest, 'id' | 'submittedAt' | 'status'>) => {
    const id = `apt_${Date.now()}`;
    const newApt: AppointmentRequest = {
      ...data,
      id,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'requested',
    };
    setAppointments((prev) => [newApt, ...prev]);
    showToast('Appointment request received! School administration will confirm timing via SMS/Email.');
    return id;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentRequest['status'], confirmedDate?: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              confirmedDate: confirmedDate ?? a.confirmedDate,
            }
          : a
      )
    );
    showToast('Appointment updated.');
  };

  const recordFeePayment = (
    invoiceId: string,
    amount: number,
    mode: 'Cash' | 'Cheque' | 'Online/UPI' | 'NEFT/RTGS',
    refNo?: string
  ) => {
    const invoice = feeInvoices.find((i) => i.id === invoiceId);
    const receiptNo = `REC-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: FeePayment = {
      id: `pay_${Date.now()}`,
      receiptNo,
      invoiceId,
      studentId: invoice?.studentId || 'unknown',
      studentName: invoice?.studentName || 'Student',
      amount,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMode: mode,
      referenceNo: refNo || (mode === 'Online/UPI' ? `UPI/${Date.now().toString().slice(-8)}` : `CHQ/${Date.now().toString().slice(-6)}`),
      collectedBy: currentUser.name,
      provenanceStatus: 'verified',
    };

    setFeePayments((prev) => [newPayment, ...prev]);

    if (invoice) {
      const newPaid = invoice.paidAmount + amount;
      const newBalance = Math.max(0, invoice.totalAmount - invoice.concessionAmount - newPaid);
      const newStatus = newBalance === 0 ? 'paid' : newPaid > 0 ? 'partial' : 'unpaid';

      setFeeInvoices((prev) =>
        prev.map((i) =>
          i.id === invoiceId
            ? {
                ...i,
                paidAmount: newPaid,
                balanceAmount: newBalance,
                status: newStatus,
              }
            : i
        )
      );
    }

    showToast(`Payment of ₹${amount.toLocaleString('en-IN')} recorded. Receipt: ${receiptNo}`);
    return newPayment;
  };

  const createInvoice = (data: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'balanceAmount' | 'paidAmount' | 'status'>) => {
    const invoiceNo = `INV/${data.academicYear}/${Math.floor(100 + Math.random() * 900)}-${data.term.replace(' ', '')}`;
    const balanceAmount = Math.max(0, data.totalAmount - (data.concessionAmount || 0));
    const newInvoice: FeeInvoice = {
      ...data,
      id: `inv_${Date.now()}`,
      invoiceNo,
      paidAmount: 0,
      balanceAmount,
      status: 'unpaid',
    };
    setFeeInvoices((prev) => [newInvoice, ...prev]);
    showToast(`Invoice ${invoiceNo} generated for ${data.studentName}.`);
  };

  const markAttendance = (records: Omit<AttendanceRecord, 'id'>[]) => {
    const stamped = records.map((r) => ({
      ...r,
      id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    }));
    // Overwrite existing marks for same student and date
    setAttendanceRecords((prev) => {
      const dates = new Set(stamped.map((s) => `${s.studentId}_${s.date}`));
      const filtered = prev.filter((p) => !dates.has(`${p.studentId}_${p.date}`));
      return [...filtered, ...stamped];
    });
    showToast(`Attendance marked for ${records.length} students on ${records[0]?.date || 'today'}.`);
  };

  const recordMark = (mark: Omit<MarkEntry, 'id'>) => {
    setMarks((prev) => {
      const existingIdx = prev.findIndex(
        (m) => m.examId === mark.examId && m.studentId === mark.studentId && m.subject === mark.subject
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = { ...copy[existingIdx], ...mark };
        return copy;
      }
      return [...prev, { ...mark, id: `mk_${Date.now()}` }];
    });
    showToast(`Marks updated for ${mark.studentName} (${mark.subject}).`);
  };

  const addHomework = (hw: Omit<HomeworkRecord, 'id' | 'assignedDate' | 'submissionsCount'>) => {
    const newHw: HomeworkRecord = {
      ...hw,
      id: `hw_${Date.now()}`,
      assignedDate: new Date().toISOString().split('T')[0],
      submissionsCount: 0,
    };
    setHomework((prev) => [newHw, ...prev]);
    showToast(`Homework assignment "${hw.title}" assigned to ${hw.className}.`);
  };

  const addNotice = (notice: Omit<NoticeRecord, 'id' | 'publishDate'>) => {
    const newNotice: NoticeRecord = {
      ...notice,
      id: `not_${Date.now()}`,
      publishDate: new Date().toISOString().split('T')[0],
    };
    setNotices((prev) => [newNotice, ...prev]);
    showToast(`Notice "${notice.title}" broadcasted to ${notice.targetAudience}.`);
  };

  const applyLeave = (leave: Omit<LeaveRequest, 'id' | 'appliedDate' | 'status'>) => {
    const newLeave: LeaveRequest = {
      ...leave,
      id: `lv_${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
    showToast('Leave application submitted for administrative review.');
  };

  const updateLeaveStatus = (id: string, status: 'approved' | 'rejected', remarks?: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status,
              reviewRemarks: remarks ?? l.reviewRemarks,
              reviewedBy: currentUser.name,
            }
          : l
      )
    );
    showToast(`Leave application marked as ${status}.`);
  };

  const updateItemVerification = (
    entityType: 'contact' | 'facility' | 'disclosure' | 'notice' | 'staff' | 'event',
    id: string,
    status: VerificationStatus,
    reviewerNotes?: string
  ) => {
    const today = new Date().toISOString().split('T')[0];

    if (entityType === 'contact') {
      setContactSettings((prev) => ({
        ...prev,
        workingHoursConfirmed: status === 'verified',
        provenance: {
          ...prev.provenance,
          verificationStatus: status,
          lastReviewedDate: today,
          reviewer: currentUser.name,
          notes: reviewerNotes ?? prev.provenance.notes,
        },
      }));
    } else if (entityType === 'facility') {
      setFacilities((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                availability: status === 'verified' ? 'Confirmed Available' : 'Needs School Confirmation',
                provenance: {
                  ...f.provenance,
                  verificationStatus: status,
                  lastReviewedDate: today,
                  reviewer: currentUser.name,
                  notes: reviewerNotes ?? f.provenance.notes,
                },
              }
            : f
        )
      );
    } else if (entityType === 'disclosure') {
      setDisclosures((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                provenance: {
                  ...d.provenance,
                  verificationStatus: status,
                  lastReviewedDate: today,
                  reviewer: currentUser.name,
                  notes: reviewerNotes ?? d.provenance.notes,
                },
              }
            : d
        )
      );
    } else if (entityType === 'staff') {
      setStaff((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                provenance: {
                  ...s.provenance,
                  verificationStatus: status,
                  lastReviewedDate: today,
                  reviewer: currentUser.name,
                },
              }
            : s
        )
      );
    }

    showToast(`Item verification updated to "${status.replace('_', ' ')}".`, 'info');
  };

  const updateFacility = (facility: FacilityRecord) => {
    setFacilities((prev) => prev.map((f) => (f.id === facility.id ? facility : f)));
    showToast(`Facility "${facility.name}" updated.`);
  };

  const addFacility = (fac: Omit<FacilityRecord, 'id'>) => {
    const newFac: FacilityRecord = {
      ...fac,
      id: `fac_${Date.now()}`,
    };
    setFacilities((prev) => [...prev, newFac]);
    showToast(`New facility record "${fac.name}" created.`);
  };

  const deleteFacility = (id: string) => {
    setFacilities((prev) => prev.filter((f) => f.id !== id));
    showToast('Facility record removed.', 'info');
  };

  // Students CRUD
  const addStudent = (data: Omit<StudentRecord, 'id'>) => {
    const newStudent: StudentRecord = {
      ...data,
      id: `std_${Date.now()}`,
    };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student record for ${newStudent.firstName} ${newStudent.lastName} created (Adm: ${newStudent.admissionNo}).`, 'success');
  };

  const updateStudent = (id: string, data: Partial<StudentRecord>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
    showToast('Student profile details updated successfully.', 'success');
  };

  const deleteStudent = (id: string) => {
    const target = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(`Student record for ${target ? target.firstName + ' ' + target.lastName : 'student'} deleted.`, 'info');
  };

  // Staff CRUD
  const addStaff = (data: Omit<StaffRecord, 'id'>) => {
    const newStaff: StaffRecord = {
      ...data,
      id: `stf_${Date.now()}`,
    };
    setStaff((prev) => [newStaff, ...prev]);
    showToast(`Staff member ${newStaff.name} added (Emp Code: ${newStaff.employeeCode}).`, 'success');
  };

  const updateStaff = (id: string, data: Partial<StaffRecord>) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
    showToast('Staff profile updated successfully.', 'success');
  };

  const deleteStaff = (id: string) => {
    const target = staff.find((s) => s.id === id);
    setStaff((prev) => prev.filter((s) => s.id !== id));
    showToast(`Staff record for ${target ? target.name : 'staff member'} deleted.`, 'info');
  };

  const addTeacherTraining = (training: Omit<TeacherTrainingRecord, 'id'>) => {
    const newTraining: TeacherTrainingRecord = {
      ...training,
      id: `tr_${Date.now()}`,
    };
    setTeacherTrainings((prev) => [newTraining, ...prev]);
    showToast(`Teacher training log "${training.topic}" registered.`, 'success');
  };

  const deleteTeacherTraining = (id: string) => {
    setTeacherTrainings((prev) => prev.filter((t) => t.id !== id));
    showToast('Teacher training record removed.', 'info');
  };

  // Admissions CRUD
  const updateApplication = (id: string, data: Partial<AdmissionApplication>) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...data } : a))
    );
    showToast('Admission application details updated.', 'success');
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    showToast('Admission application removed.', 'info');
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    showToast('Admission enquiry deleted.', 'info');
  };

  // Fees CRUD
  const updateInvoice = (id: string, data: Partial<FeeInvoice>) => {
    setFeeInvoices((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const updated = { ...i, ...data };
        const newBalance = Math.max(0, updated.totalAmount - (updated.concessionAmount || 0) - updated.paidAmount);
        const newStatus = newBalance === 0 ? 'paid' : updated.paidAmount > 0 ? 'partial' : 'unpaid';
        return { ...updated, balanceAmount: newBalance, status: newStatus as any };
      })
    );
    showToast('Invoice updated successfully.', 'success');
  };

  const deleteInvoice = (id: string) => {
    setFeeInvoices((prev) => prev.filter((i) => i.id !== id));
    showToast('Fee invoice cancelled/deleted.', 'info');
  };

  const deletePayment = (id: string) => {
    const payment = feePayments.find((p) => p.id === id);
    if (payment) {
      setFeeInvoices((prev) =>
        prev.map((i) => {
          if (i.id !== payment.invoiceId) return i;
          const newPaid = Math.max(0, i.paidAmount - payment.amount);
          const newBalance = Math.max(0, i.totalAmount - (i.concessionAmount || 0) - newPaid);
          const newStatus = newBalance === 0 ? 'paid' : newPaid > 0 ? 'partial' : 'unpaid';
          return { ...i, paidAmount: newPaid, balanceAmount: newBalance, status: newStatus as any };
        })
      );
    }
    setFeePayments((prev) => prev.filter((p) => p.id !== id));
    showToast(`Payment receipt ${payment?.receiptNo || id} reversed/deleted.`, 'info');
  };

  // Timetable CRUD
  const addTimetableSlot = (slot: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = {
      ...slot,
      id: `tt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    setTimetable((prev) => [...prev, newSlot]);
    showToast(`Timetable slot added: ${slot.dayOfWeek} Period ${slot.periodNumber} (${slot.subject}).`, 'success');
  };

  const updateTimetableSlot = (id: string, data: Partial<TimetableSlot>) => {
    setTimetable((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
    showToast('Timetable slot updated.', 'success');
  };

  const deleteTimetableSlot = (id: string) => {
    setTimetable((prev) => prev.filter((t) => t.id !== id));
    showToast('Timetable slot removed.', 'info');
  };

  // Homework CRUD
  const updateHomework = (id: string, data: Partial<HomeworkRecord>) => {
    setHomework((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...data } : h))
    );
    showToast('Homework assignment updated.', 'success');
  };

  const deleteHomework = (id: string) => {
    setHomework((prev) => prev.filter((h) => h.id !== id));
    showToast('Homework assignment deleted.', 'info');
  };

  // Marks CRUD
  const deleteMark = (id: string) => {
    setMarks((prev) => prev.filter((m) => m.id !== id));
    showToast('Exam mark record removed.', 'info');
  };

  // Notices CRUD
  const updateNotice = (id: string, data: Partial<NoticeRecord>) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...data } : n))
    );
    showToast('Notice updated successfully.', 'success');
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    showToast('Circular notice deleted.', 'info');
  };

  // Events & News CRUD
  const addEvent = (event: Omit<PublicEventRecord, 'id'>) => {
    const newEvent: PublicEventRecord = {
      ...event,
      id: `evt_${Date.now()}`,
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Public event "${event.title}" published.`, 'success');
  };

  const updateEvent = (id: string, data: Partial<PublicEventRecord>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...data } : e))
    );
    showToast('Event details updated.', 'success');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event removed.', 'info');
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setContactSettings(initialContactSettings);
    setStudents(initialStudents);
    setStaff(initialStaff);
    setTeacherTrainings(initialTeacherTrainings);
    setFacilities(initialFacilities);
    setDisclosures(initialDisclosures);
    setCbseResults(initialCBSEClassXResults);
    setEvents(initialEvents);
    setNotices(initialNotices);
    setFeeInvoices(initialFeeInvoices);
    setFeePayments(initialFeePayments);
    setMarks(initialMarks);
    setHomework(initialHomework);
    setTimetable(initialTimetable);
    setEnquiries(initialEnquiries);
    setApplications(initialApplications);
    setAppointments(initialAppointments);
    showToast('Database reset to verified initial state.', 'info');
  };

  return (
    <SchoolContext.Provider
      value={{
        currentUser,
        currentRoleKey,
        setCurrentRole,
        isAuthenticated,
        isLoginPageOpen,
        setIsLoginPageOpen,
        targetLoginRole,
        setTargetLoginRole,
        openLoginForRole,
        openSuperAdminLogin,
        closeLoginPage,
        loginUser,
        logoutUser,
        isPortalView,
        setIsPortalView,
        activeChildId,
        setActiveChildId,
        language,
        setLanguage,
        contactSettings,
        updateContactSettings,
        academicYears,
        currentAcademicYear,
        setCurrentAcademicYear,
        classes,
        students,
        staff,
        teacherTrainings,
        facilities,
        disclosures,
        cbseResults,
        events,
        notices,
        feeInvoices,
        feePayments,
        marks,
        homework,
        timetable,
        enquiries,
        applications,
        appointments,
        leaveRequests,
        attendanceRecords,
        addEnquiry,
        updateEnquiryStatus,
        addApplication,
        updateApplicationStatus,
        convertApplicationToStudent,
        addAppointment,
        updateAppointmentStatus,
        recordFeePayment,
        createInvoice,
        markAttendance,
        recordMark,
        addHomework,
        addNotice,
        applyLeave,
        updateLeaveStatus,
        updateItemVerification,
        updateFacility,
        addFacility,
        deleteFacility,
        addStudent,
        updateStudent,
        deleteStudent,
        addStaff,
        updateStaff,
        deleteStaff,
        addTeacherTraining,
        deleteTeacherTraining,
        updateApplication,
        deleteApplication,
        deleteEnquiry,
        updateInvoice,
        deleteInvoice,
        deletePayment,
        addTimetableSlot,
        updateTimetableSlot,
        deleteTimetableSlot,
        updateHomework,
        deleteHomework,
        deleteMark,
        updateNotice,
        deleteNotice,
        addEvent,
        updateEvent,
        deleteEvent,
        toasts,
        showToast,
        removeToast,
        resetToDefaultData,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) throw new Error('useSchool must be used within a SchoolProvider');
  return context;
};
