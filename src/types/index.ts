/**
 * Types & Domain Interfaces for
 * Smt Drakshayani Kalyanshettar Public School & ERP
 * Managed by J K Education Society (R), Hubli
 */

export type UserRole =
  | 'super_admin'
  | 'school_admin'
  | 'principal'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'accountant'
  | 'website_editor'
  | 'librarian';

export type VerificationStatus = 'needs_confirmation' | 'verified' | 'archived';
export type PublicationStatus = 'draft' | 'in_review' | 'published' | 'archived';

export interface SourceProvenance {
  sourceUrl: string;
  originalPageTitle: string;
  academicYear?: string;
  importedDate: string;
  verificationStatus: VerificationStatus;
  lastReviewedDate?: string;
  reviewer?: string;
  publicationStatus: PublicationStatus;
  notes?: string;
}

export interface SchoolContactSettings {
  primaryPublicEmail: string;
  admissionsEmail: string;
  notificationSenderEmail: string;
  internalEnquiryRecipientEmail: string;
  primaryTelephone: string;
  secondaryTelephone: string;
  emergencyTelephone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  affiliationNumber: string;
  schoolNumber: string;
  board: string;
  workingHoursConfirmed: boolean;
  workingHoursText: string;
  provenance: SourceProvenance;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  assignedClasses?: string[]; // for teachers
  assignedSubjects?: string[];
  linkedStudentIds?: string[]; // for parents
  studentId?: string; // for students
  designation?: string;
}

export interface AcademicYear {
  id: string;
  name: string; // e.g. "2024-2025"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface SchoolClass {
  id: string;
  name: string; // e.g. "Class I", "Class X", "Pre-Primary (Kreedo)"
  category: 'pre_primary' | 'primary' | 'middle' | 'secondary';
  sections: string[]; // ["A", "B"]
  classTeacher?: string;
  academicYear: string;
}

export interface StudentRecord {
  id: string;
  admissionNo: string;
  rollNo?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  classId: string;
  className: string;
  section: string;
  academicYear: string;
  enrolmentDate: string;
  status: 'active' | 'transferred' | 'withdrawn';
  address: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelation: 'Father' | 'Mother' | 'Guardian';
  emergencyContact: string;
  aadhaarConfirmed: boolean;
  previousSchool?: string;
  tcIssued?: boolean;
  tcNumber?: string;
  tcIssueDate?: string;
}

export interface StaffRecord {
  id: string;
  employeeCode: string;
  name: string;
  role: UserRole;
  designation: string; // "TGT Mathematics", "PRT Science", "NTT Kreedo Specialist", etc.
  category: 'NTT' | 'PRT' | 'TGT' | 'PGT' | 'PET' | 'Librarian' | 'Special Educator' | 'Counselor' | 'Administrative';
  qualifications: string;
  teachingSubjects: string[];
  assignedClasses: string[];
  phone: string;
  email: string;
  joiningDate: string;
  provenance: SourceProvenance;
}

export interface TeacherTrainingRecord {
  id: string;
  programmeName: string;
  provider: string; // e.g. "CBSE CoE / DIKSHA / Kreedo Academy"
  topic: string;
  startDate: string;
  endDate: string;
  trainingHours: number;
  participatingTeachers: string[];
  academicYear: string;
  verificationStatus: VerificationStatus;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  classId: string;
  section: string;
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  remarks?: string;
}

export interface TimetableSlot {
  id: string;
  classId: string;
  section: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  periodNumber: number;
  timeRange: string; // e.g. "09:00 AM - 09:45 AM"
  subject: string;
  teacherId: string;
  teacherName: string;
  room: string;
}

export interface HomeworkRecord {
  id: string;
  classId: string;
  className: string;
  section: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  title: string;
  instructions: string;
  assignedDate: string;
  dueDate: string;
  attachmentName?: string;
  submissionsCount?: number;
}

export interface ExamRecord {
  id: string;
  name: string; // "Periodic Test 1", "Half Yearly Exam", "Annual Examination"
  academicYear: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'evaluating' | 'published';
}

export interface MarkEntry {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  classId: string;
  section: string;
  subject: string;
  maxMarks: number;
  marksObtained: number;
  grade: string; // A1, A2, B1, B2, C1, C2, D, E
  remarks?: string;
}

export interface FeeHead {
  id: string;
  name: string; // "Tuition Fee", "Activity & Kreedo Fee", "Development Fund", "Examination Fee"
  amount: number;
  frequency: 'term' | 'annual' | 'monthly';
  applicableClasses: string[];
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  className: string;
  academicYear: string;
  term: 'Term 1' | 'Term 2' | 'Annual';
  totalAmount: number;
  concessionAmount: number;
  paidAmount: number;
  balanceAmount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'unpaid' | 'overdue';
}

export interface FeePayment {
  id: string;
  receiptNo: string;
  invoiceId: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  paymentMode: 'Cash' | 'Cheque' | 'Online/UPI' | 'NEFT/RTGS';
  referenceNo?: string;
  collectedBy: string;
  provenanceStatus: 'verified' | 'reconciled';
}

export interface NoticeRecord {
  id: string;
  title: string;
  content: string;
  targetAudience: 'all' | 'parents' | 'students' | 'staff';
  targetClass?: string;
  publishDate: string;
  expiryDate?: string;
  isHighPriority?: boolean;
  author: string;
  academicYear: string;
  provenance: SourceProvenance;
}

export interface LeaveRequest {
  id: string;
  applicantType: 'student' | 'staff';
  applicantId: string;
  applicantName: string;
  classOrDesignation: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  reviewedBy?: string;
  reviewRemarks?: string;
}

export interface AdmissionEnquiry {
  id: string;
  refNumber: string;
  parentName: string;
  phone: string;
  email: string;
  studentName: string;
  classInterestedIn: string;
  academicYear: string;
  currentSchool?: string;
  preferredContactMethod: 'phone' | 'email' | 'whatsapp';
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'appointment_booked' | 'converted' | 'closed';
  assignedStaff?: string;
  followUpNotes?: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  studentName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  requestedClass: string;
  academicYear: string;
  address: string;
  previousSchool?: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelation: string;
  emergencyContact: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'under_review' | 'assessment_scheduled' | 'approved' | 'rejected' | 'enrolled';
  documentChecklist: {
    birthCertificate: boolean;
    transferCertificate: boolean;
    marksCard: boolean;
    aadhaarCopy: boolean;
    photosUploaded: boolean;
  };
  reviewNotes?: string;
}

export interface AppointmentRequest {
  id: string;
  requesterName: string;
  phone: string;
  email: string;
  departmentRequested: 'Principal' | 'Admissions Office' | 'Academic Coordinator' | 'Accounts';
  preferredDate: string;
  preferredTimeSlot: string;
  purpose: string;
  status: 'requested' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  submittedAt: string;
  confirmedDate?: string;
  notes?: string;
}

export interface FacilityRecord {
  id: string;
  name: string;
  category: 'Sports & Play' | 'Laboratory' | 'Library' | 'Early Childhood' | 'Campus' | 'Safety';
  description: string;
  image: string;
  relevantClasses: string;
  availability: 'Confirmed Available' | 'Needs School Confirmation';
  countConfirmed?: number;
  provenance: SourceProvenance;
}

export interface DisclosureDocument {
  id: string;
  title: string;
  category: 'General Information' | 'Documents & Information' | 'Result & Academics' | 'Staff & Infrastructure' | 'Appendix IX Mandatory Disclosure';
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  academicYear: string;
  fileFormat: string;
  downloadUrl: string;
  provenance: SourceProvenance;
}

export interface CBSEClassXResultSnapshot {
  academicYear: string;
  class: 'Class X';
  examination: 'CBSE Board Secondary Examination';
  appearedCount: number;
  passedCount: number;
  passPercentage: number;
  supportingReportNote: string;
  provenance: SourceProvenance;
}

export interface PublicEventRecord {
  id: string;
  title: string;
  category: 'Celebration' | 'Exhibition' | 'Sports' | 'Scouts & Guides' | 'Workshop' | 'Art Integrated' | 'Community';
  academicYear: string;
  eventDate: string;
  classGroup: string;
  description: string;
  coverImage: string;
  albumImages?: string[];
  provenance: SourceProvenance;
}
