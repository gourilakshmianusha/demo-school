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
  Plus,
  Trash2,
  Edit2,
  Eye,
} from 'lucide-react';
import { VerificationStatus } from '../../types';

interface WebsiteCmsManagerProps {
  initialTab?: 'contact_settings' | 'facilities_crud' | 'events_crud' | 'migration_register';
}

export const WebsiteCmsManager: React.FC<WebsiteCmsManagerProps> = ({ initialTab = 'contact_settings' }) => {
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
    navigateToPublicPage,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'contact_settings' | 'facilities_crud' | 'events_crud' | 'migration_register'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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

            <div className="pt-4 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigateToPublicPage('contact')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Preview public contact page"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Public Contact Page →</span>
              </button>
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

      {/* Facilities CRUD Tab */}
      {activeTab === 'facilities_crud' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                School Facilities & Learning Infrastructure Management
              </h3>
              <p className="text-xs text-slate-500">
                Add, update, or remove campus facilities. Changes immediately update the public Facilities page.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigateToPublicPage('facilities')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="View live public facilities page"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Public Facilities Page →</span>
              </button>
              <button
                onClick={() => {
                  setFacilityName('');
                  setFacilityDescription('');
                  setFacilityCategory('Sports & Play');
                  setFacilityClasses('Pre-Primary to Class X');
                  setFacilityAvailability('Confirmed Available');
                  setEditingFacility(null);
                  setShowAddFacilityModal(true);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add New Facility</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac) => {
              const isConfirmed = fac.availability === 'Confirmed Available';
              return (
                <div
                  key={fac.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 bg-slate-100 relative overflow-hidden">
                      <img
                        src={fac.image}
                        alt={fac.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {fac.category}
                      </span>
                      <span
                        className={`absolute bottom-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                          isConfirmed ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-slate-950'
                        }`}
                      >
                        {isConfirmed ? '✓ Confirmed' : '⚠ Needs Confirmation'}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm font-serif">{fac.name}</h4>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {fac.description}
                      </p>
                      <div className="text-[11px] text-slate-500 pt-1">
                        <strong>Target:</strong> {fac.relevantClasses}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigateToPublicPage('facilities')}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Live</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          handleOpenEditFacility(fac);
                          setShowAddFacilityModal(true);
                        }}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors text-xs font-semibold flex items-center gap-1"
                        title="Edit Facility"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete facility "${fac.name}"? This will immediately remove it from the public website.`)) {
                            deleteFacility(fac.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors text-xs font-semibold flex items-center gap-1"
                        title="Delete Facility"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add / Edit Facility Modal */}
          {showAddFacilityModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
                <h3 className="text-base font-serif font-bold text-slate-900">
                  {editingFacility ? 'Edit Facility Details' : 'Add New Campus Facility'}
                </h3>

                <form onSubmit={handleSaveFacility} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Facility Name *</label>
                    <input
                      type="text"
                      required
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      placeholder="e.g. Science Discovery Lab"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                      <select
                        value={facilityCategory}
                        onChange={(e) => setFacilityCategory(e.target.value as any)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                      >
                        <option value="Sports & Play">Sports & Play</option>
                        <option value="Laboratory">Laboratory</option>
                        <option value="Library">Library</option>
                        <option value="Early Childhood">Early Childhood</option>
                        <option value="Campus">Campus</option>
                        <option value="Safety">Safety</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Verification *</label>
                      <select
                        value={facilityAvailability}
                        onChange={(e) => setFacilityAvailability(e.target.value as any)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                      >
                        <option value="Confirmed Available">Confirmed Available</option>
                        <option value="Needs School Confirmation">Needs School Confirmation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Classes *</label>
                    <input
                      type="text"
                      required
                      value={facilityClasses}
                      onChange={(e) => setFacilityClasses(e.target.value)}
                      placeholder="e.g. Classes I to X or Pre-Primary Kreedo"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Facility Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={facilityDescription}
                      onChange={(e) => setFacilityDescription(e.target.value)}
                      placeholder="Describe the facility equipment, pedagogical features, or safety standards..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddFacilityModal(false);
                        setEditingFacility(null);
                      }}
                      className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                    >
                      Cancel
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          handleSaveFacility(e);
                          navigateToPublicPage('facilities');
                        }}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded transition-colors"
                      >
                        Save & View Live →
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded shadow-sm"
                      >
                        {editingFacility ? 'Update Facility' : 'Save Facility'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Events & News CRUD Tab */}
      {activeTab === 'events_crud' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Public Events, Celebrations & News Management
              </h3>
              <p className="text-xs text-slate-500">
                Create, edit, or delete events. All entries synchronize dynamically to the public News & Events page.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigateToPublicPage('news_events')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="View live public news & events page"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Public Events Page →</span>
              </button>
              <button
                onClick={() => {
                  setEventTitle('');
                  setEventDate(new Date().toISOString().split('T')[0]);
                  setEventCategory('Celebration');
                  setEventClassGroup('Classes I to X');
                  setEventDescription('');
                  setEditingEvent(null);
                  setShowAddEventModal(true);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Create Public Event</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {ev.category}
                    </span>
                    <span className="text-slate-500 font-mono font-medium">{ev.eventDate}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base leading-snug">{ev.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{ev.description}</p>
                  <div className="text-[11px] text-slate-500 font-medium">Target: {ev.classGroup}</div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => navigateToPublicPage('news_events')}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Live</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        handleOpenEditEvent(ev);
                        setShowAddEventModal(true);
                      }}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors text-xs font-semibold flex items-center gap-1"
                      title="Edit Event"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete event "${ev.title}"? This will immediately remove it from public view.`)) {
                          deleteEvent(ev.id);
                        }
                      }}
                      className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors text-xs font-semibold flex items-center gap-1"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit Event Modal */}
          {showAddEventModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
                <h3 className="text-base font-serif font-bold text-slate-900">
                  {editingEvent ? 'Edit Public Event' : 'Create Public Event & News Item'}
                </h3>

                <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="e.g. Annual Sports Meet 2025"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                      <select
                        value={eventCategory}
                        onChange={(e) => setEventCategory(e.target.value as any)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                      >
                        <option value="Celebration">Celebration</option>
                        <option value="Exhibition">Exhibition</option>
                        <option value="Sports">Sports</option>
                        <option value="Scouts & Guides">Scouts & Guides</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Art Integrated">Art Integrated</option>
                        <option value="Community">Community</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Event Date *</label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Class Group *</label>
                    <input
                      type="text"
                      required
                      value={eventClassGroup}
                      onChange={(e) => setEventClassGroup(e.target.value)}
                      placeholder="e.g. Classes VI to X or All School"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Event Description & Report *</label>
                    <textarea
                      rows={3}
                      required
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Write event overview, achievements, participating students..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddEventModal(false);
                        setEditingEvent(null);
                      }}
                      className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                    >
                      Cancel
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          handleSaveEvent(e);
                          navigateToPublicPage('news_events');
                        }}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded transition-colors"
                      >
                        Publish & View Live →
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded shadow-sm"
                      >
                        {editingEvent ? 'Update Event' : 'Publish Event'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
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
