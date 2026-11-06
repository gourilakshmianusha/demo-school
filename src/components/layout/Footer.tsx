import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { School, MapPin, Phone, Mail, ShieldCheck, FileText, ExternalLink, AlertTriangle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { contactSettings, setIsPortalView, openLoginForRole, openSuperAdminLogin } = useSchool();

  const handleLink = (tab: string) => {
    setActiveTab(tab);
    setIsPortalView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex flex-col items-center justify-center font-bold shrink-0">
                <span className="font-serif font-black text-xs tracking-wider text-amber-400 leading-none">DKPS</span>
                <span className="text-[7.5px] font-sans text-slate-300 font-semibold tracking-tighter uppercase mt-0.5">HUBLI</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-serif font-bold text-base leading-snug">DKPS Hubli</span>
                  <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.2 rounded font-mono">
                    830277
                  </span>
                </div>
                <h3 className="text-xs text-slate-300 font-medium leading-snug">
                  Smt Drakshayani Kalyanshettar Public School
                </h3>
                <p className="text-[11px] text-amber-400/90 font-medium">J K Education Society (R), Hubli</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Co-educational CBSE English medium institution providing holistic experiential learning, early childhood Kreedo development, and strong moral discipline from Pre-Primary to Class X.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-300">CBSE Affiliation No:</strong> {contactSettings.affiliationNumber}</div>
              <div><strong className="text-slate-300">School Code:</strong> {contactSettings.schoolNumber}</div>
              <div><strong className="text-slate-300">Curriculum:</strong> {contactSettings.board}</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-4 text-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('about')} className="hover:text-amber-300 transition-colors">
                  About School & Society
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('academics')} className="hover:text-amber-300 transition-colors">
                  Academics & Pedagogy Plan
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('admissions')} className="hover:text-amber-300 transition-colors">
                  Admissions (Pre-Primary to X)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('facilities')} className="hover:text-amber-300 transition-colors">
                  Swami Vivekananda Kids Park
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('facilities')} className="hover:text-amber-300 transition-colors">
                  Pre-Primary Kreedo Lab
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('news_events')} className="hover:text-amber-300 transition-colors">
                  Academic Year Archives
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('disclosures')} className="hover:text-amber-300 transition-colors">
                  Mandatory Public Disclosures (Appendix IX)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Campus */}
          <div className="space-y-3">
            <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-4 text-amber-400">
              Campus Location
            </h4>
            
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {contactSettings.addressLine1}, {contactSettings.addressLine2}, {contactSettings.city} – {contactSettings.pincode}, {contactSettings.state}, India.
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{contactSettings.primaryTelephone} / {contactSettings.secondaryTelephone}</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{contactSettings.primaryPublicEmail}</span>
            </div>

            <div className="pt-2 text-xs border-t border-slate-900">
              <span className="text-slate-500 font-medium">Visiting Hours:</span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                {contactSettings.workingHoursText}
              </p>
            </div>
          </div>

          {/* Col 4: Statutory Notice & Provenance */}
          <div className="space-y-3">
            <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-4 text-amber-400">
              Governance & Provenance
            </h4>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Reference Migration Audit</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Structured from source records at <span className="text-slate-300 font-mono">jkeducationsocietydk.com</span>.
              </p>
              <div className="pt-2 flex flex-col gap-1.5">
                <button
                  onClick={() => openLoginForRole('parent')}
                  className="w-full text-center text-xs text-amber-400 hover:text-amber-300 font-medium py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  School Community Portals →
                </button>
                <button
                  onClick={openSuperAdminLogin}
                  className="w-full text-center text-xs text-red-300 hover:text-white font-medium py-1 rounded bg-red-950/80 hover:bg-red-900 border border-red-800/60 transition-colors"
                >
                  Super Admin Root Console →
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500">
              CBSE Affiliation Status: Regular Provisional (Classes I to X).
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Smt Drakshayani Kalyanshettar Public School. All rights reserved.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => handleLink('disclosures')} className="hover:text-slate-400">
              Mandatory Disclosure
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleLink('about')} className="hover:text-slate-400">
              Committees & POCSO
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleLink('contact')} className="hover:text-slate-400">
              Admissions Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
