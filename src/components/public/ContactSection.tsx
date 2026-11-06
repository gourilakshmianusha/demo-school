import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { contactSettings, addAppointment } = useSchool();

  // General contact form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('General Enquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailUpdatesConsent, setEmailUpdatesConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [contactSubmittedRef, setContactSubmittedRef] = useState<string | null>(null);

  // Appointment form
  const [aptName, setAptName] = useState('');
  const [aptPhone, setAptPhone] = useState('');
  const [aptEmail, setAptEmail] = useState('');
  const [aptDept, setAptDept] = useState<'Principal' | 'Admissions Office' | 'Academic Coordinator' | 'Accounts'>('Principal');
  const [aptDate, setAptDate] = useState('');
  const [aptTime, setAptTime] = useState('10:00 AM – 11:00 AM');
  const [aptPurpose, setAptPurpose] = useState('');
  const [aptSubmittedId, setAptSubmittedId] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const ref = `CNT-${Math.floor(10000 + Math.random() * 90000)}`;
    setContactSubmittedRef(ref);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aptName || !aptPhone || !aptDate) return;
    const id = addAppointment({
      requesterName: aptName,
      phone: aptPhone,
      email: aptEmail,
      departmentRequested: aptDept,
      preferredDate: aptDate,
      preferredTimeSlot: aptTime,
      purpose: aptPurpose,
    });
    setAptSubmittedId(id);
    setAptName('');
    setAptPhone('');
    setAptEmail('');
    setAptPurpose('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* 1. Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Campus Location & Communication Desk
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          We welcome parents, alumni, and prospective applicants to reach out to our administration. Visit our Shakti Colony campus or register an enquiry below.
        </p>

        {contactSettings.provenance.verificationStatus === 'needs_confirmation' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Governance Flag:</strong> Contact details imported from the source website (<code className="font-mono">jkeducationsocietydk.com</code>) are categorized by default admin setting. They are marked <em>“Needs school confirmation”</em> until formally ratified.
            </span>
          </div>
        )}
      </div>

      {/* 2. Contact Details & Office Hours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">School Campus</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {contactSettings.addressLine1},<br />
            {contactSettings.addressLine2},<br />
            {contactSettings.city} – {contactSettings.pincode}, {contactSettings.state}, India.
          </p>
          <div className="pt-2 text-[11px] text-slate-400">
            Landmark: Near Adhyapak Nagar
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Telephone Contacts</h3>
          <div className="space-y-1 text-xs text-slate-600">
            <div><strong>Main Office:</strong> {contactSettings.primaryTelephone}</div>
            <div><strong>Admissions:</strong> {contactSettings.secondaryTelephone}</div>
            <div><strong>Emergency Desk:</strong> {contactSettings.emergencyTelephone}</div>
          </div>
          <div className="pt-2 text-[11px] text-slate-400">
            * Needs school confirmation
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Configured Email Addresses</h3>
          <div className="space-y-1 text-xs text-slate-600">
            <div className="truncate"><strong>Public:</strong> {contactSettings.primaryPublicEmail}</div>
            <div className="truncate"><strong>Admissions:</strong> {contactSettings.admissionsEmail}</div>
            <div className="truncate"><strong>Notifications:</strong> {contactSettings.notificationSenderEmail}</div>
          </div>
          <div className="pt-2 text-[11px] text-slate-400">
            Multi-alias system from source portal
          </div>
        </div>
      </div>

      {/* 3. Forms: General Contact & Appointment Request */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: General Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-lg font-serif font-bold text-slate-900">
              General Enquiry Form
            </h2>
            <p className="text-xs text-slate-500">
              Your message will be assigned an internal tracking reference and routed to the corresponding department.
            </p>
          </div>

          {contactSubmittedRef ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Message Dispatched!</h3>
              <p className="text-xs text-slate-600">
                Your enquiry reference is <strong className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{contactSubmittedRef}</strong>. We will get back to you shortly.
              </p>
              <button
                onClick={() => setContactSubmittedRef(null)}
                className="mt-2 text-xs font-semibold text-amber-700 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Kulkarni"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Enquiry Department</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Admissions">Admissions Desk</option>
                    <option value="Academic Support">Academic Coordinator</option>
                    <option value="Fee & Accounts">Fee & Accounts Desk</option>
                    <option value="Transport / Bus">Transport Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of enquiry..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide your specific questions or request..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailUpdatesConsent}
                    onChange={(e) => setEmailUpdatesConsent(e.target.checked)}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>Send me official school updates and circular notifications via email.</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>I acknowledge that submitted information will be processed solely for official communication.</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Appointment Scheduler (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-lg font-serif font-bold text-slate-900">
              Request an In-Person Meeting
            </h2>
            <p className="text-xs text-slate-500">
              Schedule an interaction with the Principal or Academic Coordinator. Note: Submitted preference is subject to office confirmation.
            </p>
          </div>

          {aptSubmittedId ? (
            <div className="text-center py-6 space-y-3 bg-white p-6 rounded-lg border border-slate-200">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900">Appointment Request Lodged</h3>
              <p className="text-xs text-slate-600">
                Our office will review the calendar and confirm the slot via phone/SMS.
              </p>
              <button
                onClick={() => setAptSubmittedId(null)}
                className="mt-2 text-xs font-semibold text-amber-700 underline"
              >
                Schedule another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={aptName}
                  onChange={(e) => setAptName(e.target.value)}
                  placeholder="Parent / Visitor Name"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={aptPhone}
                  onChange={(e) => setAptPhone(e.target.value)}
                  placeholder="For confirmation SMS"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department / Officer</label>
                <select
                  value={aptDept}
                  onChange={(e) => setAptDept(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="Principal">Principal / Leadership</option>
                  <option value="Admissions Office">Admissions Office</option>
                  <option value="Academic Coordinator">Academic Coordinator</option>
                  <option value="Accounts">Accounts / Bursar</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Slot</label>
                  <select
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="10:00 AM – 11:00 AM">10:00 AM – 11:00 AM</option>
                    <option value="11:30 AM – 12:30 PM">11:30 AM – 12:30 PM</option>
                    <option value="02:00 PM – 03:00 PM">02:00 PM – 03:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Purpose of Visit</label>
                <textarea
                  rows={2}
                  required
                  value={aptPurpose}
                  onChange={(e) => setAptPurpose(e.target.value)}
                  placeholder="e.g. Student transfer discussion, Kreedo lab walkthrough..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Appointment</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 4. Interactive Map Simulation */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Hubli Campus Coordinates & Transit Route</span>
          </div>
          <span className="text-slate-400">Shakti Colony, Near Adhyapak Nagar, Hubli – 580032</span>
        </div>

        <div className="h-64 bg-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-slate-900 text-sm">
              Smt Drakshayani Kalyanshettar Public School
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Easily accessible via Hubli-Dharwad bypass road and Adhyapak Nagar main avenue. Ample parent parking and secure school van gates.
            </p>
            <a
              href="https://maps.google.com/?q=Hubli+Karnataka+580032"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors mt-2"
            >
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
