import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Globe,
  AlertCircle,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { usePR } from '../../context/PRContext';
import { Logo } from '../common/Logo';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigateTo } = usePR();
  const [adminId, setAdminId] = useState('Gsrelation.admin');
  const [password, setPassword] = useState('Gsr@9421');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!adminId.trim() || !password.trim()) {
      setErrorMessage('Please enter both Admin ID and Password.');
      return;
    }

    setLoading(true);
    const result = await loginAdmin(adminId.trim(), password.trim());
    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Invalid Admin ID or Password. Please verify your credentials.');
    }
  };

  const handleAutoFill = () => {
    setAdminId('Gsrelation.admin');
    setPassword('Gsr@9421');
    setErrorMessage('');
  };

  return (
    <div
      id="admin-login-page"
      className="min-h-screen bg-[#050B17] text-white flex flex-col justify-between relative overflow-hidden pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] px-4 sm:px-6"
    >
      {/* Background Architectural Geometry */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between py-2">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center text-left focus:outline-none rounded-sm transition-opacity hover:opacity-90"
        >
          <Logo
            size="md"
            showTagline={true}
            taglineText="Command Center & Executive Control"
            taglineClassName="hidden sm:block text-slate-400"
            theme="dark"
          />
        </button>

        <button
          id="admin-login-exit-to-site"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all min-h-[40px] active:scale-95"
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>Exit to Public Website</span>
        </button>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-[#07132B]/90 backdrop-blur-xl border border-blue-900/50 rounded-sm shadow-2xl overflow-hidden">
          {/* Card Accent Top Banner */}
          <div className="bg-gradient-to-r from-blue-950 via-[#0C1E42] to-blue-950 p-6 border-b border-blue-900/50 text-center relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-blue-600/20 border border-blue-500/40 text-blue-400 mb-3 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300 bg-blue-900/50 px-2.5 py-1 rounded-sm border border-blue-500/30 mb-2">
              Confidential Super Admin Portal
            </div>
            <h1 className="text-xl sm:text-2xl font-light text-white tracking-tight">
              Agency Command Center
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-light">
              Restricted management gateway for authorized executive directors
            </p>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {errorMessage && (
              <div
                id="admin-login-error"
                className="p-3.5 rounded-sm bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Authentication Failed</div>
                  <div className="text-[11px] text-rose-300/90 mt-0.5">{errorMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Admin ID Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-id-input"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-300"
                >
                  Authorized Admin ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-id-input"
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="Gsrelation.admin"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-blue-900/60 rounded-sm text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="admin-password-input"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-300"
                  >
                    Security Key / Password
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">256-bit Encrypted</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-blue-900/60 rounded-sm text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="admin-login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-sm bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Executive Clearance...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Command Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Autofill Banner */}
            <div className="p-3.5 rounded-sm bg-blue-950/40 border border-blue-800/40 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-white">Default Credentials</div>
                  <div className="text-[10px] font-mono text-slate-400">
                    ID: <span className="text-blue-300">Gsrelation.admin</span> | Pass: <span className="text-blue-300">Gsr@9421</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[10px] uppercase tracking-wider font-bold text-blue-400 hover:text-blue-300 bg-blue-900/40 hover:bg-blue-900/80 px-2.5 py-1.5 rounded-sm border border-blue-600/40 transition-colors shrink-0"
              >
                Auto-fill
              </button>
            </div>
          </div>

          {/* Security Footer */}
          <div className="bg-[#050B17] px-6 py-3.5 border-t border-blue-900/40 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 1.3 / Express Auth</span>
            </span>
            <span>GSRelation India v2.4</span>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full text-center py-2 text-xs text-slate-500 font-light">
        © {new Date().getFullYear()} GSRelation Strategic Communications India Pvt. Ltd. Confidential Administrative Access.
      </footer>
    </div>
  );
};
