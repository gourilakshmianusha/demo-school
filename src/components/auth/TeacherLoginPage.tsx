import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BookOpen,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileCheck2,
  Users2,
} from 'lucide-react';

export const TeacherLoginPage: React.FC = () => {
  const {
    loginUser,
    closeLoginPage,
    openLoginForRole,
    openSuperAdminLogin,
    contactSettings,
  } = useSchool();

  const [emailOrEmpId, setEmailOrEmpId] = useState('anitha.joshi@dkps.edu.in');
  const [password, setPassword] = useState('teacher@math2024');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAutofill = () => {
    setEmailOrEmpId('anitha.joshi@dkps.edu.in');
    setPassword('teacher@math2024');
    setErrorMessage(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrEmpId || !password) {
      setErrorMessage('Please enter your employee code/email and faculty password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const success = loginUser('teacher', { username: emailOrEmpId, password });
      if (!success) {
        setErrorMessage('Invalid teacher credentials. Please check your institutional email.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-900 text-sky-300 flex flex-col items-center justify-center font-bold">
              <span className="font-serif font-black text-xs leading-none">DKPS</span>
              <span className="text-[7px] font-sans tracking-tight text-sky-200">HUBLI</span>
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-slate-900">DKPS Hubli</div>
              <div className="text-[11px] text-slate-500">Teaching Faculty & Instructional Desk</div>
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
          <div className="lg:col-span-5 bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Faculty Academic Workspace</span>
              </div>

              <h2 className="text-2xl font-serif font-bold leading-tight mb-3">
                Classroom Attendance, Homework & CBSE Assessment Entry
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Instructional console for teachers to record daily class attendance, assign homework, upload periodic test marks, and track student progress.
              </p>

              {/* Teacher Persona Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 mb-6">
                <div className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider mb-2">
                  Sample Faculty Account:
                </div>
                <div className="text-xs space-y-1.5">
                  <div className="font-bold text-white text-sm">Smt. Anitha Joshi</div>
                  <div className="text-slate-300">TGT Mathematics • Class VIII-A Incharge</div>
                  <div className="text-slate-400 font-mono text-[11px]">Emp ID: DK-T-01</div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mark period-by-period class attendance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Enter Periodic Test 1, Half-Yearly & Final marks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Create class homework assignments with attachments</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] text-slate-400 mt-6">
              Teacher training & CBSE NISHTHA compliance log updated for 2024–2025.
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-slate-900">
                    Faculty Portal Login
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your school email or employee ID to open your classroom desk
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutofill}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Autofill Teacher Demo</span>
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
                    Faculty Email or Employee ID *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={emailOrEmpId}
                      onChange={(e) => setEmailOrEmpId(e.target.value)}
                      required
                      placeholder="e.g. anitha.joshi@dkps.edu.in or DK-T-01"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                    />
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Demo Email: <span className="font-mono text-sky-700 font-semibold">anitha.joshi@dkps.edu.in</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Faculty Account Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter faculty password"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white font-mono"
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
                    Demo Password: <span className="font-mono text-sky-700 font-semibold">teacher@math2024</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-sky-700 hover:bg-sky-800 text-white transition-all shadow-md shadow-sky-700/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating Faculty Account...</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      <span>Log In to Teacher Portal</span>
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
