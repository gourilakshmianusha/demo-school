import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Building,
  Info,
} from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const { facilities } = useSchool();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* 1. Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          Campus Infrastructure & Resources
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          School Facilities & Learning Environments
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Our Hubli campus is thoughtfully partitioned into age-appropriate developmental zones. In strict adherence to institutional transparency, each infrastructure item is displayed with its current school verification status.
        </p>

        <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Info className="w-4 h-4 text-amber-600" />
            <span>Infrastructure Transparency Policy</span>
          </div>
          <p className="leading-relaxed">
            Facilities marked <strong className="text-emerald-700">Confirmed Available</strong> have been verified against school site documentation. Items marked <strong className="text-amber-800">Needs School Confirmation</strong> represent proposed or pending fleet/lab audits and are not advertised as active entitlements until validated by school administration. Note: The Pre-Primary Kreedo Lab is a sensory/Montessori early learning room and is not confused with an ICT/computer lab.
          </p>
        </div>
      </div>

      {/* 2. Facility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((fac) => {
          const isConfirmed = fac.availability === 'Confirmed Available';

          return (
            <div
              key={fac.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-52 overflow-hidden bg-slate-100 relative">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  {fac.category}
                </div>

                <div className="absolute bottom-3 right-3">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded shadow-sm ${
                      isConfirmed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-slate-950 font-semibold'
                    }`}
                  >
                    {isConfirmed ? '✓ Confirmed' : '⚠ Needs Confirmation'}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold font-serif text-slate-900">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Applicable:</span>
                    <strong className="text-slate-700">{fac.relevantClasses}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Source: {fac.provenance.originalPageTitle}</span>
                    <span className="capitalize">{fac.provenance.verificationStatus.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
