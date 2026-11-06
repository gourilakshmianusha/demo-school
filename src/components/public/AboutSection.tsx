import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  School,
  ShieldCheck,
  Award,
  Users,
  Compass,
  FileText,
  CheckCircle,
  Building2,
  Clock,
  HeartHandshake,
  Layers,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { contactSettings, staff } = useSchool();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* 1. Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
          Institutional Heritage & Governance
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          About Smt Drakshayani Kalyanshettar Public School
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Founded under the aegis of <strong className="text-slate-900">J K Education Society (R)</strong>, our institution stands as an educational beacon in Hubli, Karnataka, blending rigorous CBSE curriculum with ethical character formation and early childhood sensory pedagogy.
        </p>
      </div>

      {/* 2. School Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
          <Building2 className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold font-serif text-slate-900">Institutional Registry & Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg space-y-1">
            <span className="text-slate-500 font-medium">Official School Name</span>
            <div className="font-bold text-slate-900 text-sm">Smt Drakshayani Kalyanshettar Public School</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg space-y-1">
            <span className="text-slate-500 font-medium">Managing Society</span>
            <div className="font-bold text-slate-900 text-sm">J K Education Society (R), Hubli</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg space-y-1">
            <span className="text-slate-500 font-medium">Affiliation Board & Status</span>
            <div className="font-bold text-slate-900 text-sm">CBSE, New Delhi (Regular Provisional)</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg space-y-1">
            <span className="text-slate-500 font-medium">CBSE Affiliation Number</span>
            <div className="font-bold text-slate-900 font-mono text-sm">{contactSettings.affiliationNumber}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg space-y-1">
            <span className="text-slate-500 font-medium">CBSE School Code</span>
            <div className="font-bold text-slate-900 font-mono text-sm">{contactSettings.schoolNumber}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg space-y-1">
            <span className="text-slate-500 font-medium">Approved Class Range</span>
            <div className="font-bold text-slate-900 text-sm">Pre-Primary (Kreedo) to Class X (Secondary)</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg space-y-1 md:col-span-2">
            <span className="text-slate-500 font-medium">Campus Address</span>
            <div className="font-semibold text-slate-800">
              {contactSettings.addressLine1}, {contactSettings.addressLine2}, {contactSettings.city} – {contactSettings.pincode}, {contactSettings.state}, India.
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg space-y-1">
            <span className="text-slate-500 font-medium">Medium of Instruction</span>
            <div className="font-semibold text-slate-800">English Medium (Co-educational)</div>
          </div>
        </div>
      </div>

      {/* 3. Vision & Mission (Approved source content) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-xl bg-slate-900 text-white space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            <span>Our Vision</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-white">
            Nurturing Lifelong Inquirers and Conscientious Citizens
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To provide an inspiring, child-centric learning ecosystem that empowers every student to realize their fullest intellectual, physical, and ethical potential, cultivating global competence rooted firmly in timeless Indian cultural and constitutional values.
          </p>
        </div>

        <div className="p-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>Our Mission</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-900">
            Experiential Rigor, Safety, and Equal Opportunity
          </h3>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>Implement dynamic NCERT/CBSE curriculum integrated with hands-on early childhood Kreedo methodology.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>Foster scientific temper, ecological stewardship, and artistic expression through art-integrated projects.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>Ensure an inclusive, zero-tolerance environment for bullying, with verified child protection safeguards.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Leadership & Principal's Desk */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
          <HeartHandshake className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold font-serif text-slate-900">From the Principal’s Desk</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-amber-700">
              Education at Smt Drakshayani Kalyanshettar Public School is a transformative journey that transcends mechanical rote learning. In harmony with the National Education Policy (NEP 2020), our pedagogy prioritizes conceptual depth, experiential experiments, and character development.
            </p>
            <p>
              From our vibrant Kreedo Early Childhood Lab where toddlers discover foundational math concepts using tangible wooden manipulatives, to our rigorous secondary classes where students achieve consistent 100% board exam pass rates, our dedicated faculty ensures no child is left behind.
            </p>
            <p>
              We partner actively with parents to cultivate resilient, compassionate, and disciplined young citizens ready to contribute meaningfully to society.
            </p>
            <div className="pt-2 text-xs font-semibold text-slate-900">
              — Office of the Principal & Academic Council
              <div className="text-[11px] text-slate-500 font-normal">Smt Drakshayani Kalyanshettar Public School, Hubli</div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Institutional Governance
            </h4>
            <div className="space-y-2 text-slate-600">
              <div>
                <strong>Management:</strong> J K Education Society (R)
              </div>
              <div>
                <strong>Registered Under:</strong> Karnataka Societies Registration Act
              </div>
              <div>
                <strong>Curriculum:</strong> CBSE (Pre-Primary through Class X)
              </div>
              <div>
                <strong>Teacher-Section Ratio:</strong> 1.5 : 1 (CBSE Compliant)
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-400">
              * Official management committee and statutory minutes maintained in the administrative records.
            </div>
          </div>
        </div>
      </div>

      {/* 5. Statutory Committees & Student Safety */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
            Statutory Compliance & Welfare
          </span>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            School Committees & Student Support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">POCSO & Child Safety</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Internal committee monitoring strict adherence to the Protection of Children from Sexual Offences (POCSO) Act, police verifications, and safe campus protocols.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Anti-Bullying Cell</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proactive vigilance squad ensuring respectful conduct, positive peer behavior, and prompt resolution of student concerns with confidential reporting.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-sm text-slate-900">PTA Coordination Body</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Active Parent-Teacher Association fostering transparent communication on academic calendars, safety assessments, and student progress reviews.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-slate-900">Grievance Redressal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designated administrative forum for parents, students, and staff to register operational or academic suggestions and inquiries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
