import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Save,
  Globe,
  Mail,
  Phone,
  Building,
} from 'lucide-react';
import { VerificationStatus } from '../../types';

export const WebsiteCmsManager: React.FC = () => {
  const {
    contactSettings,
    updateContactSettings,
    facilities,
    disclosures,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    addFacility,
    updateFacility,
    deleteFacility,
    updateItemVerification,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'contact_settings' | 'facilities_crud' | 'events_crud' | 'migration_register'>('contact_settings');

  // Contact settings state
  const [primaryEmail, setPrimaryEmail] = useState(contactSettings.primaryPublicEmail);
  const [admissionsEmail, setAdmissionsEmail] = useState(contactSettings.admissionsEmail);
  const [notifEmail, setNotifEmail] = useState(contactSettings.notificationSenderEmail);
  const [internalEmail, setInternalEmail] = useState(contactSettings.internalEnquiryRecipientEmail);
  const [primaryPhone, setPrimaryPhone] = useState(contactSettings.primaryTelephone);
  const [secondaryPhone, setSecondaryPhone] = useState(contactSettings.secondaryTelephone);
  const [emergencyPhone, setEmergencyPhone] = useState(contactSettings.emergencyTelephone);
  const [workingHoursText, setWorkingHoursText] = useState(contactSettings.workingHoursText);
  const [contactStatus, setContactStatus] = useState<VerificationStatus>(
    contactSettings.provenance.verificationStatus
  );

  // Facility CRUD State
  const [showAddFacilityModal, setShowAddFacilityModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState<any>(null);
  const [facilityName, setFacilityName] = useState('');
  const [facilityCategory, setFacilityCategory] = useState<any>('Sports & Play');
  const [facilityDescription, setFacilityDescription] = useState('');
  const [facilityClasses, setFacilityClasses] = useState('Pre-Primary to Class X');
  const [facilityAvailability, setFacilityAvailability] = useState<'Confirmed Available' | 'Needs School Confirmation'>('Confirmed Available');

  // Event CRUD State
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<any>('Celebration');
  const [eventDate, setEventDate] = useState('');
  const [eventClassGroup, setEventClassGroup] = useState('Classes I to X');
  const [eventDescription, setEventDescription] = useState('');

  const handleOpenEditFacility = (f: any) => {
    setEditingFacility(f);
    setFacilityName(f.name);
    setFacilityCategory(f.category);
    setFacilityDescription(f.description);
    setFacilityClasses(f.relevantClasses);
    setFacilityAvailability(f.availability);
  };

  const handleSaveFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityName) return;

    if (editingFacility) {
      updateFacility({
        ...editingFacility,
        name: facilityName,
        category: facilityCategory,
        description: facilityDescription,
        relevantClasses: facilityClasses,
        availability: facilityAvailability,
      });
      setEditingFacility(null);
    } else {
      addFacility({
        name: facilityName,
        category: facilityCategory,
        description: facilityDescription,
        relevantClasses: facilityClasses,
        availability: facilityAvailability,
        image: '/src/assets/images/school_campus_hero_1793884221999.jpg',
        provenance: {
          sourceUrl: 'https://jkeducationsocietydk.com/facilities',
          originalPageTitle: 'Campus Facilities Ledger',
          importedDate: new Date().toISOString().split('T')[0],
          verificationStatus: facilityAvailability === 'Confirmed Available' ? 'verified' : 'needs_confirmation',
          publicationStatus: 'published',
        },
      });
      setShowAddFacilityModal(false);
    }

    setFacilityName('');
    setFacilityDescription('');
  };

  const handleOpenEditEvent = (ev: any) => {
    setEditingEvent(ev);
    setEventTitle(ev.title);
    setEventCategory(ev.category);
    setEventDate(ev.eventDate);
    setEventClassGroup(ev.classGroup);
    setEventDescription(ev.description);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;

    if (editingEvent) {
      updateEvent(editingEvent.id, {
        title: eventTitle,
        category: eventCategory,
        eventDate: eventDate,
        classGroup: eventClassGroup,
        description: eventDescription,
      });
      setEditingEvent(null);
    } else {
      addEvent({
        title: eventTitle,
        category: eventCategory,
        academicYear: '2024-2025',
        eventDate: eventDate,
        classGroup: eventClassGroup,
        description: eventDescription,
        coverImage: '/src/assets/images/school_campus_hero_1793884221999.jpg',
        provenance: {
          sourceUrl: 'https://jkeducationsocietydk.com/events',
          originalPageTitle: 'School Events Archive',
          importedDate: new Date().toISOString().split('T')[0],
          verificationStatus: 'verified',
          publicationStatus: 'published',
        },
      });
      setShowAddEventModal(false);
    }

    setEventTitle('');
    setEventDate('');
    setEventDescription('');
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactSettings({
      primaryPublicEmail: primaryEmail,
      admissionsEmail: admissionsEmail,
      notificationSenderEmail: notifEmail,
      internalEnquiryRecipientEmail: internalEmail,
      primaryTelephone: primaryPhone,
      secondaryTelephone: secondaryPhone,
      emergencyTelephone: emergencyPhone,
      workingHoursText: workingHoursText,
      workingHoursConfirmed: contactStatus === 'verified',
      provenance: {
        ...contactSettings.provenance,
        verificationStatus: contactStatus,
        lastReviewedDate: new Date().toISOString().split('T')[0],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Website Content & Source Verification Register
          </h2>
          <p className="text-xs text-slate-500">
            Configure public emails/telephones and review imported records from <code className="font-mono text-slate-700">jkeducationsocietydk.com</code>.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold flex-wrap">
          <button
            onClick={() => setActiveTab('contact_settings')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'contact_settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contact & Routing
          </button>
          <button
            onClick={() => setActiveTab('facilities_crud')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'facilities_crud' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Facilities Management
          </button>
          <button
            onClick={() => setActiveTab('events_crud')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'events_crud' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Events & News
          </button>
          <button
            onClick={() => setActiveTab('migration_register')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'migration_register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Source Provenance
          </button>
        </div>
      </div>

      {/* 2. Contact & Routing Settings Tab */}
      {activeTab === 'contact_settings' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Institutional Email & Telephone Allocation
            </h3>
            <p className="text-xs text-slate-500">
              The existing school website featured 3 distinct email addresses. Administer their designated functional assignments below.
            </p>
          </div>

          <form onSubmit={handleSaveContact} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1. Primary Public Website Email *
                </label>
                <input
                  type="email"
                  required
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[11px] text-slate-500">Displayed in footer and contact page.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2. Admissions Desk Email *
                </label>
                <input
                  type="email"
                  required
                  value={admissionsEmail}
                  onChange={(e) => setAdmissionsEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[11px] text-slate-500">Receives online admission enquiry alerts.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  3. Outbound Notification Sender Email *
                </label>
                <input
                  type="email"
                  required
                  value={notifEmail}
                  onChange={(e) => setNotifEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[11px] text-slate-500">From header on circular notifications.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  4. Internal Enquiry Recipient Email *
                </label>
                <input
                  type="email"
                  required
                  value={internalEmail}
                  onChange={(e) => setInternalEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[11px] text-slate-500">Destination for principal appointment requests.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Telephone *
                </label>
                <input
                  type="text"
                  required
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secondary Telephone
                </label>
                <input
                  type="text"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emergency Desk Telephone
                </label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Office & Visiting Hours Text
                </label>
                <input
                  type="text"
                  value={workingHoursText}
                  onChange={(e) => setWorkingHoursText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verification Status *
                </label>
                <select
                  value={contactStatus}
                  onChange={(e) => setContactStatus(e.target.value as VerificationStatus)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="needs_confirmation">Needs School Confirmation</option>
                  <option value="verified">Verified & Approved</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>Save Contact Configuration</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Source Migration Register Tab */}
      {activeTab === 'migration_register' && (
        <div className="space-y-6">
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-slate-900">Provenance & Source Traceability Register</div>
            <p>
              Every content item imported from the reference portal (<span className="font-mono">https://jkeducationsocietydk.com/</span>) retains its origin metadata, page title, and reviewer audit stamp. Use this ledger to review and approve live records.
            </p>
          </div>

          {/* Contact Record */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">School Contacts & Email Aliases</h4>
                <div className="text-xs text-slate-500 font-mono">Source: {contactSettings.provenance.sourceUrl}</div>
              </div>
              <button
                onClick={() =>
                  updateItemVerification(
                    'contact',
                    'contact',
                    contactSettings.provenance.verificationStatus === 'verified' ? 'needs_confirmation' : 'verified'
                  )
                }
                className={`px-3 py-1 text-xs font-semibold rounded ${
                  contactSettings.provenance.verificationStatus === 'verified'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {contactSettings.provenance.verificationStatus === 'verified' ? '✓ Verified' : '⚠ Click to Verify'}
              </button>
            </div>
            <p className="text-xs text-slate-600">{contactSettings.provenance.notes}</p>
          </div>

          {/* Facilities Provenance */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-900 text-white font-serif font-bold text-sm">
              Facilities Migration Ledger
            </div>
            <table className="w-full text-left text-xs divide-y divide-slate-100">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Facility Name</th>
                  <th className="py-2.5 px-4">Source Page Title</th>
                  <th className="py-2.5 px-4">Verification Audit</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {facilities.map((fac) => (
                  <tr key={fac.id}>
                    <td className="py-3 px-4 font-bold text-slate-900">{fac.name}</td>
                    <td className="py-3 px-4 text-slate-600">{fac.provenance.originalPageTitle}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          fac.availability === 'Confirmed Available'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-amber-50 text-amber-900'
                        }`}
                      >
                        {fac.availability}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() =>
                          updateItemVerification(
                            'facility',
                            fac.id,
                            fac.provenance.verificationStatus === 'verified' ? 'needs_confirmation' : 'verified'
                          )
                        }
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
