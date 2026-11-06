import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  CreditCard,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Receipt,
  FileSpreadsheet,
  AlertCircle,
  IndianRupee,
} from 'lucide-react';

export const AccountantLoginPage: React.FC = () => {
  const {
    loginUser,
    closeLoginPage,
    openLoginForRole,
    openSuperAdminLogin,
    contactSettings,
  } = useSchool();

  const [accountId, setAccountId] = useState('accounts@dkps.edu.in');
  const [password, setPassword] = useState('bursar@dkps2024');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAutofill = () => {
    setAccountId('accounts@dkps.edu.in');
    setPassword('bursar@dkps2024');
    setErrorMessage(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId || !password) {
      setErrorMessage('Please enter the Finance Officer ID and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const success = loginUser('accountant', { username: accountId, password });
      if (!success) {
        setErrorMessage('Invalid finance credentials. Access denied.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-900 text-teal-300 flex flex-col items-center justify-center font-bold">
              <span className="font-serif font-black text-xs leading-none">DKPS</span>
              <span className="text-[7px] font-sans tracking-tight text-teal-200">HUBLI</span>
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-slate-900">DKPS Hubli</div>
              <div className="text-[11px] text-slate-500">Bursary & Accounts Department</div>
            </div>
          </div>

          <button
            onClick={closeLoginPage}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to School Website</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Hero Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold mb-4">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Bursary & Fee Desk</span>
              </div>

              <h2 className="text-2xl font-serif font-bold leading-tight mb-3">
                Tuition Ledger, Fee Collection & Official Printable Receipts
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Official cashier counter for tuition fee collections, instalment tracking, online UPI/Cheque reconciliation, and generating official DKPS Hubli receipts.
              </p>

              {/* Bursar Persona Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 mb-6">
                <div className="text-[11px] font-semibold text-teal-300 uppercase tracking-wider mb-2">
                  Finance Officer Account:
                </div>
                <div className="text-xs space-y-1.5">
                  <div className="font-bold text-white text-sm">Shri Ramesh B. (Bursar)</div>
                  <div className="text-slate-300">B.Com, ICWA (Inter) • Accounts In-charge</div>
                  <div className="text-slate-400 font-mono text-[11px]">Desk ID: DK-ACC-01</div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tuition fee invoice generation for Pre-Primary to Class X</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-mode collection (Cash, UPI, Cheque, NEFT/RTGS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official printable receipt with unique serial numbers</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] text-slate-400 mt-6">
              Official Currency: <span className="text-teal-300 font-semibold">INR (₹)</span> • All transactions audited
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-slate-900">
                    Accounts & Bursar Login
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter the authorized finance department credentials
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutofill}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>Autofill Bursar Demo</span>
                </button>
              </div>

              {errorMessage && (
                <div className="p-3.5 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="flex-1">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Finance Officer ID / Email *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                      required
                      placeholder="accounts@dkps.edu.in or DK-ACC-01"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Demo Account: <span className="font-mono text-teal-800 font-semibold">accounts@dkps.edu.in</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Accounts Desk Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter finance password"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white font-mono"
                    />
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Demo Password: <span className="font-mono text-teal-800 font-semibold">bursar@dkps2024</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-teal-800 hover:bg-teal-900 text-white transition-all shadow-md shadow-teal-800/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating Financial Desk...</span>
                    </>
                  ) : (
                    <>
                      <Receipt className="w-4 h-4" />
                      <span>Open Fee Collection Desk</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Links to Other Dedicated Login Pages */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="text-xs text-slate-500 mb-2 font-medium">
                Switch to another dedicated login page:
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => openLoginForRole('parent')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Parent Login →
                </button>
                <button
                  onClick={() => openLoginForRole('student')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Student Login →
                </button>
                <button
                  onClick={() => openLoginForRole('teacher')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Teacher Login →
                </button>
                <button
                  onClick={() => openLoginForRole('principal')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Principal Desk →
                </button>
                <button
                  onClick={openSuperAdminLogin}
                  className="px-2.5 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 font-semibold border border-red-200"
                >
                  Super Admin Console →
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
