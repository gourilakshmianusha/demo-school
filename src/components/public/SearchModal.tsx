import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Search, X, ArrowRight, FileText, Calendar, Bell, Building } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { notices, events, facilities, disclosures } = useSchool();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search results
  const matchedNotices = notices.filter(
    (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
  );
  const matchedFacilities = facilities.filter(
    (f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
  );
  const matchedDisclosures = disclosures.filter(
    (d) => d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
  );
  const matchedEvents = events.filter(
    (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
  );

  const totalMatches = matchedNotices.length + matchedFacilities.length + matchedDisclosures.length + matchedEvents.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search school circulars, Kreedo lab, Swami Vivekananda park, disclosures, admissions..."
            className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {q === '' ? (
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Navigation Shortcuts
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => { onNavigate('admissions'); onClose(); }}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 text-left font-medium text-slate-700 hover:text-amber-900"
                >
                  Admissions Process (Pre-K to X)
                </button>
                <button
                  onClick={() => { onNavigate('facilities'); onClose(); }}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 text-left font-medium text-slate-700 hover:text-amber-900"
                >
                  Swami Vivekananda Kids Park
                </button>
                <button
                  onClick={() => { onNavigate('facilities'); onClose(); }}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 text-left font-medium text-slate-700 hover:text-amber-900"
                >
                  Pre-Primary Kreedo Early Learning Lab
                </button>
                <button
                  onClick={() => { onNavigate('disclosures'); onClose(); }}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 text-left font-medium text-slate-700 hover:text-amber-900"
                >
                  CBSE Appendix IX Mandatory Disclosure
                </button>
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
              No matching records found for "{query}". Try searching "Kreedo", "Affiliation", or "Admissions".
            </div>
          ) : (
            <div className="space-y-4">
              {matchedNotices.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Notices & Circulars</span>
                  {matchedNotices.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => { onNavigate('news_events'); onClose(); }}
                      className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer space-y-1"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{n.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {matchedFacilities.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Facilities</span>
                  {matchedFacilities.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => { onNavigate('facilities'); onClose(); }}
                      className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer space-y-1"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{f.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{f.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {matchedDisclosures.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">CBSE Disclosures</span>
                  {matchedDisclosures.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => { onNavigate('disclosures'); onClose(); }}
                      className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer space-y-1"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{d.title}</h4>
                      <p className="text-[11px] text-slate-500">{d.issuingAuthority}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC or click close to exit</span>
          <span>Smt Drakshayani Kalyanshettar Public School</span>
        </div>
      </div>
    </div>
  );
};
