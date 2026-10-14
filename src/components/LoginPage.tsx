import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string; avatar: string }) => void;
  onNavigateRegister: () => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateRegister,
  onBackToHome
}) => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(true);
      setTimeout(() => {
        onLoginSuccess({
          name: 'Default User',
          email: email,
          avatar: 'DU'
        });
      }, 800);
    }, 600);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="absolute top-6 left-6">
        <button
          onClick={onBackToHome}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to CraveDrop</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-orange-600/30">
            C
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-black tracking-tight">
          Sign In to CraveDrop
        </h2>
        <p className="mt-2 text-center text-xs text-slate-400">
          Access your gourmet orders, CraveClub membership & 10-minute instant delivery
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className={`py-8 px-6 shadow-2xl rounded-2xl sm:px-10 transition-colors ${
          isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
        }`}>
          {successMsg ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-black">Welcome Back!</h3>
              <p className="text-xs text-slate-400">Redirecting to your gourmet dashboard...</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 text-xs rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-orange-500 transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Password
                  </label>
                  <a href="#" className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="mt-1 relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-10 py-3 text-xs rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-orange-500 transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 cursor-pointer text-slate-400">
                  <input type="checkbox" defaultChecked className="rounded accent-orange-600 w-4 h-4" />
                  <span>Remember me for 30 days</span>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 border border-transparent rounded-xl text-xs font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Don't have a CraveDrop account?{' '}
              <button
                onClick={onNavigateRegister}
                className="font-bold text-orange-500 hover:text-orange-400 underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure 256-bit encrypted authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};
