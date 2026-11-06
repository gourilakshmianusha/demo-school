import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  FileText,
  CreditCard,
  Calendar,
  AlertCircle,
  GraduationCap,
  Shield,
} from 'lucide-react';

export const ParentLoginPage: React.FC = () => {
  const {
    loginUser,
    closeLoginPage,
    openLoginForRole,
    openSuperAdminLogin,
    contactSettings,
  } = useSchool();

  const [mobileOrEmail, setMobileOrEmail] = useState('9845123450');
  const [password, setPassword] = useState('parent@dkps2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAutofill = () => {
    setMobileOrEmail('9845123450');
    setPassword('parent@dkps2024');
    setErrorMessage(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileOrEmail || !password) {
      setErrorMessage('Please enter your registered mobile number and password/PIN.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const success = loginUser('parent', { username: mobileOrEmail, password });
      if (!success) {
        setErrorMessage('Invalid parent credentials. Please check your registered mobile or PIN.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex flex-col items-center justify-center font-bold">
              <span className="font-serif font-black text-xs leading-none">DKPS</span>
              <span className="text-[7px] font-sans tracking-tight text-slate-300">HUBLI</span>
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-slate-900">DKPS Hubli</div>
              <div className="text-[11px] text-slate-500">Parent & Guardian Community Portal</div>
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

      {/* Main Content Area */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Hero Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>Parent & Guardian Desk</span>
              </div>

              <h2 className="text-2xl font-serif font-bold leading-tight mb-3">
                Stay Connected with Your Child’s School Journey
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Access verified academic records, CBSE progress reports, daily attendance alerts, and direct online fee payments for your enrolled wards at DKPS Hubli.
              </p>

              {/* Linked Wards Demo Badge */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 mb-6">
                <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-2">
                  Sample Linked Wards (Savitri Patil Account):
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                    <span className="font-medium text-white">Rohan Patil</span>
                    <span className="text-[11px] text-slate-300">Class VIII-A (Adm: DKPS/2019/0084)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">Sneha Patil</span>
                    <span className="text-[11px] text-slate-300">Class III-B (Adm: DKPS/2021/0142)</span>
                  </div>
                </div>
              </div>

              {/* Scope Checklist */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Download Term 1 & Term 2 CBSE Report Cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant receipt generation on fee payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Submit online leave applications to class teacher</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] text-slate-400 mt-6">
              Need assistance? Call Admissions Desk: <span className="text-amber-300 font-mono">{contactSettings.primaryTelephone}</span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-slate-900">
                    Parent Portal Login
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your registered 10-digit mobile number or parent email address
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutofill}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Autofill Demo Parent</span>
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
                    Registered Mobile Number or Email *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={mobileOrEmail}
                      onChange={(e) => setMobileOrEmail(e.target.value)}
                      required
                      placeholder="e.g. 9845123450"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Demo Registered Phone: <span className="font-mono text-indigo-600 font-semibold">9845123450</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Parent Passcode or Confidential PIN *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter parent password"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
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
                    Demo Passcode: <span className="font-mono text-indigo-600 font-semibold">parent@dkps2024</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Remember this device</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAutofill}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Forgot passcode?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-indigo-700 hover:bg-indigo-800 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Parent Portal Access...</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4" />
                      <span>Log In to Parent Portal</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Links to Other Dedicated Login Pages */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="text-xs text-slate-500 mb-2 font-medium">
                Looking for another school login page?
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
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
                  onClick={() => openLoginForRole('accountant')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Accounts Desk →
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
