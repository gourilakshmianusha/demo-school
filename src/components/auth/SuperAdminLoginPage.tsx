import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  KeyRound,
  Eye,
  EyeOff,
  Server,
  Terminal,
  Activity,
  ArrowLeft,
  Users,
  CheckCircle2,
  Sparkles,
  School,
  Database,
  FileCheck,
} from 'lucide-react';

export const SuperAdminLoginPage: React.FC = () => {
  const {
    loginUser,
    closeLoginPage,
    openLoginForRole,
    contactSettings,
  } = useSchool();

  const [adminId, setAdminId] = useState('admin@dkps.edu.in');
  const [securityPasscode, setSecurityPasscode] = useState('admin@jkesociety2024');
  const [authPin, setAuthPin] = useState('849201');
  const [showPasscode, setShowPasscode] = useState(false);
  const [sessionEnv, setSessionEnv] = useState<'production' | 'audit'>('production');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAutofill = () => {
    setAdminId('admin@dkps.edu.in');
    setSecurityPasscode('admin@jkesociety2024');
    setAuthPin('849201');
    setErrorMessage(null);
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId || !securityPasscode || !authPin) {
      setErrorMessage('All master credentials including the 6-digit security token are required.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const success = loginUser('super_admin', { username: adminId, password: securityPasscode });
      if (!success) {
        setErrorMessage('Super Admin authentication failed. Invalid master key or expired 2FA token.');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Security Banner */}
      <div className="bg-red-950/80 border-b border-red-800/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-red-200">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span className="font-semibold tracking-wider uppercase text-[11px] text-red-300">
              J K Education Society (R) • Master Governance & Root Console
            </span>
            <span className="hidden md:inline text-red-400/60">|</span>
            <span className="hidden md:inline text-red-300/80">Restricted Administration Gateway</span>
          </div>
          <button
            onClick={closeLoginPage}
            className="flex items-center gap-1.5 text-xs text-red-300 hover:text-white transition-colors bg-red-900/40 hover:bg-red-900/80 px-2.5 py-1 rounded border border-red-700/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to School Website</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 sm:py-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Institutional Credential & System Health */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              {/* Shortcut Name & Logo Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex flex-col items-center justify-center font-bold shadow-lg shadow-amber-500/10 shrink-0">
                  <span className="font-serif font-black text-sm tracking-wider leading-none">DKPS</span>
                  <span className="text-[9px] font-sans font-black tracking-tight uppercase mt-0.5">HUBLI</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-lg text-white">DKPS Hubli</span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-semibold">
                      ROOT LEVEL
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium leading-snug">
                    Smt Drakshayani Kalyanshettar Public School
                  </div>
                  <div className="text-[11px] text-amber-400/90 font-medium">
                    Managed by J K Education Society (R)
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">CBSE Affiliation:</span>
                  <span className="font-mono font-bold text-amber-400">{contactSettings.affiliationNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">School Code:</span>
                  <span className="font-mono font-bold text-slate-200">{contactSettings.schoolNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Target Classes:</span>
                  <span className="font-medium text-slate-200">Pre-Primary to Class X</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Audit Provenance:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Source URLs Tracked
                  </span>
                </div>
              </div>

              {/* Master Clearance Scope */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Unrestricted System Governance:</span>
                </div>
                <ul className="text-xs space-y-2 text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">›</span>
                    <span>Direct control across 12 ERP management modules (Admissions, Students, Staff, Attendance, Exams, Fees, TC).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">›</span>
                    <span>Website content publication approval & source verification audit trail.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">›</span>
                    <span>CBSE Appendix IX Mandatory Disclosure synchronization.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">›</span>
                    <span>Institutional contact routing & fee structure configuration.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Diagnostic Badges */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px]">Database Integrity</div>
                  <div className="font-semibold text-slate-200">Encrypted / Active</div>
                </div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px]">Session Clearance</div>
                  <div className="font-semibold text-slate-200">Super Admin (L1)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Security Authentication Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-2">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Dedicated Super Admin Portal</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    Master Administrator Login
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Authenticate to exercise full administrative, financial, and academic oversight.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutofill}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition-colors flex items-center gap-1.5 shrink-0"
                  title="Autofill verified master credentials"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autofill Master Demo</span>
                </button>
              </div>

              {errorMessage && (
                <div className="p-3.5 mb-6 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="flex-1">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleAuthenticate} className="space-y-5">
                {/* Master Admin Username */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Chief Administrator ID or Institutional Email *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      required
                      placeholder="admin@dkps.edu.in"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                    <div className="absolute right-3.5 top-3.5 text-slate-500 text-xs font-mono">
                      ROOT
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Default Master ID: <code className="text-amber-300">admin@dkps.edu.in</code>
                  </div>
                </div>

                {/* Master Security Key */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Master Security Passphrase *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasscode ? 'text' : 'password'}
                      value={securityPasscode}
                      onChange={(e) => setSecurityPasscode(e.target.value)}
                      required
                      placeholder="Enter master root password"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                      tabIndex={-1}
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Default Passphrase: <code className="text-amber-300">admin@jkesociety2024</code>
                  </div>
                </div>

                {/* 2FA Token & Environment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                      <span>2FA Security Token *</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">SYNCHRONIZED</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        value={authPin}
                        onChange={(e) => setAuthPin(e.target.value)}
                        required
                        placeholder="849201"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-center tracking-widest text-amber-400 focus:outline-none focus:border-amber-500"
                      />
                      <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Session Clearance Target
                    </label>
                    <select
                      value={sessionEnv}
                      onChange={(e) => setSessionEnv(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="production">Full Production ERP (Read/Write)</option>
                      <option value="audit">Statutory Audit Mode (CBSE Inspection)</option>
                    </select>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating Master Console...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authenticate Master Super Admin Console</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom Navigation for other roles */}
            <div className="mt-8 pt-6 border-t border-slate-800 text-center space-y-3">
              <div className="text-xs text-slate-400">
                Need to access other school community portals?
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                {[
                  { key: 'parent', label: 'Parent Portal' },
                  { key: 'student', label: 'Student Portal' },
                  { key: 'teacher', label: 'Teacher Portal' },
                  { key: 'principal', label: 'Principal Desk' },
                  { key: 'accountant', label: 'Accounts Desk' },
                  { key: 'website_editor', label: 'Website CMS' },
                ].map((role) => (
                  <button
                    key={role.key}
                    onClick={() => openLoginForRole(role.key)}
                    className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    {role.label} →
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={closeLoginPage}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to DKPS Hubli Public Website</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Security Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-3 text-center text-[11px] text-slate-400">
        DKPS Hubli • Smt Drakshayani Kalyanshettar Public School, Hubli • Managed by J K Education Society (R) • CBSE Affiliation No: 830277
      </footer>
    </div>
  );
};
