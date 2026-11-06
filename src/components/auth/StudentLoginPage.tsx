import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Calendar,
  Award,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const StudentLoginPage: React.FC = () => {
  const {
    loginUser,
    closeLoginPage,
    openLoginForRole,
    openSuperAdminLogin,
  } = useSchool();

  const [admissionNo, setAdmissionNo] = useState('DKPS/2019/0084');
  const [password, setPassword] = useState('student@rohan14');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAutofill = () => {
    setAdmissionNo('DKPS/2019/0084');
    setPassword('student@rohan14');
    setErrorMessage(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionNo || !password) {
      setErrorMessage('Please enter your School Admission Number and passcode.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const success = loginUser('student', { username: admissionNo, password });
      if (!success) {
        setErrorMessage('Invalid student credentials. Please verify your Admission No (e.g. DKPS/2019/0084).');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900 text-emerald-300 flex flex-col items-center justify-center font-bold">
              <span className="font-serif font-black text-xs leading-none">DKPS</span>
              <span className="text-[7px] font-sans tracking-tight text-emerald-200">HUBLI</span>
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-slate-900">DKPS Hubli</div>
              <div className="text-[11px] text-slate-500">Student Learning & Homework Portal</div>
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
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Academic Zone</span>
              </div>

              <h2 className="text-2xl font-serif font-bold leading-tight mb-3">
                Your Homework, Timetable & CBSE Exam Scores
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Log in using your official school admission number to check daily classroom assignments, weekly timetable schedules, and upcoming board examinations.
              </p>

              {/* Student Profile Preview */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 mb-6">
                <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-2">
                  Sample Student Profile:
                </div>
                <div className="text-xs space-y-1.5">
                  <div className="font-bold text-white text-sm">Rohan Patil</div>
                  <div className="text-slate-300">Class VIII, Section A • Roll No: 14</div>
                  <div className="text-slate-400 font-mono text-[11px]">Admission No: DKPS/2019/0084</div>
                </div>
              </div>

              {/* Student Features */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>View daily subject homework & submission deadlines</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive weekly timetable & room numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CBSE 8-Point grading marksheet & teacher remarks</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] text-slate-400 mt-6">
              Forgot your Admission Number? Check your School ID card or ask your Class Teacher.
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-slate-900">
                    Student Portal Login
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your official school admission number and personal passcode
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutofill}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Autofill Student Demo</span>
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
                    Official Admission Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={admissionNo}
                      onChange={(e) => setAdmissionNo(e.target.value)}
                      required
                      placeholder="e.g. DKPS/2019/0084"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white font-mono"
                    />
                    <GraduationCap className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Demo Admission ID: <span className="font-mono text-emerald-700 font-semibold">DKPS/2019/0084</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Student Passcode / PIN *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter student passcode"
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
                    Demo Passcode: <span className="font-mono text-emerald-700 font-semibold">student@rohan14</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Opening Student Portal...</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-4 h-4" />
                      <span>Log In to Student Portal</span>
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
