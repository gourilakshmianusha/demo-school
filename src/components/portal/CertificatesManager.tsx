import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { FileText, Printer, CheckCircle, Award } from 'lucide-react';
import { StudentRecord } from '../../types';

export const CertificatesManager: React.FC = () => {
  const { students, contactSettings } = useSchool();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std_001');
  const [certType, setCertType] = useState<'tc' | 'study' | 'bonafide'>('study');

  const student = students.find((s) => s.id === selectedStudentId) || students[0];

  const handlePrint = () => {
    window.print();
  };

  if (!student) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Official Certificates Desk
          </h2>
          <p className="text-xs text-slate-500">
            Generate and issue Transfer Certificates (TC), Study Certificates, and Bonafide letters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Certificate Type */}
          <select
            value={certType}
            onChange={(e) => setCertType(e.target.value as any)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="study">Study Certificate</option>
            <option value="bonafide">Bonafide Certificate</option>
            <option value="tc">Transfer Certificate (TC)</option>
          </select>

          {/* Student Selector */}
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName} ({s.className})
              </option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>

      {/* Certificate Preview Card with School Letterhead */}
      <div className="bg-white rounded-xl border-2 border-slate-800 p-8 sm:p-12 space-y-8 max-w-3xl mx-auto shadow-sm text-slate-900">
        {/* Header */}
        <div className="text-center space-y-1 border-b-2 border-slate-800 pb-6">
          <div className="text-xs uppercase tracking-widest text-slate-600 font-bold">
            J K EDUCATION SOCIETY (R), HUBLI
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 uppercase">
            Smt Drakshayani Kalyanshettar Public School
          </h1>
          <p className="text-xs text-slate-600">
            Shakti Colony, Near Adhyapak Nagar, Hubli – 580032, Karnataka
          </p>
          <div className="pt-1 text-[11px] font-mono text-slate-600">
            CBSE Affiliation No: {contactSettings.affiliationNumber} | School Code: {contactSettings.schoolNumber}
          </div>
          <div className="mt-3 inline-block bg-slate-900 text-white text-xs font-bold px-6 py-1 rounded uppercase tracking-wider">
            {certType === 'tc'
              ? 'TRANSFER CERTIFICATE (TC)'
              : certType === 'bonafide'
              ? 'BONAFIDE CERTIFICATE'
              : 'STUDY CERTIFICATE'}
          </div>
        </div>

        {/* Certificate Reference */}
        <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
          <span>Ref No: DKPS/CERT/2024/{Math.floor(100 + Math.random() * 900)}</span>
          <span>Date: {new Date().toISOString().split('T')[0]}</span>
        </div>

        {/* Body Text */}
        <div className="text-sm sm:text-base leading-loose text-slate-800 space-y-4">
          <p className="text-justify">
            This is to certify that Master/Kumari{' '}
            <strong className="text-slate-950 font-bold text-base underline underline-offset-4">
              {student.firstName} {student.lastName}
            </strong>
            , son/daughter of{' '}
            <strong className="text-slate-950">{student.guardianName}</strong>, is a bonafide student of this institution studying in{' '}
            <strong className="text-slate-950">{student.className} – Section {student.section}</strong>{' '}
            for the academic year{' '}
            <strong className="text-slate-950">{student.academicYear}</strong>.
          </p>

          <p className="text-justify">
            His/Her permanent Admission Number as per the General Admission Register is{' '}
            <strong className="font-mono text-slate-950">{student.admissionNo}</strong>, and date of birth recorded is{' '}
            <strong className="font-mono text-slate-950">{student.dateOfBirth}</strong>.
          </p>

          <p className="text-justify">
            During his/her tenure at this school, his/her character and conduct have been found to be{' '}
            <strong className="text-slate-950">GOOD</strong>.
          </p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-12 text-center text-xs">
          <div className="border-t border-slate-400 pt-1 text-slate-600">
            Office Superintendent / Registrar
          </div>
          <div className="border-t border-slate-400 pt-1 text-slate-900 font-bold">
            Principal Signature & Seal
          </div>
        </div>
      </div>
    </div>
  );
};
