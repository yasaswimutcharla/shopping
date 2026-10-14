import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, UserCheck, Shield, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    switchUserRole,
    showToast
  } = useShop();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter an email address.', 'warning');
      return;
    }

    if (mode === 'register' && !name) {
      showToast('Please enter your full name.', 'warning');
      return;
    }

    // Simulate login
    showToast(`Signed in as ${mode === 'register' ? name : email.split('@')[0]} (Simulated Demo Account).`, 'success');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-sky-400" />
            <h3 className="font-semibold text-base">
              {mode === 'signin' ? 'Sign In to ShopSphere' : 'Create Demo Account'}
            </h3>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Quick Demo Credentials for Expo */}
          <div className="p-3 mb-5 bg-sky-50 border border-sky-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              1-Click Demo Profiles for Expo Demonstrations:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  switchUserRole('customer');
                  setIsAuthModalOpen(false);
                }}
                className={`py-1.5 px-2 text-xs font-medium rounded-md border text-center transition-colors ${
                  currentUser.role === 'customer' && currentUser.id !== 'usr-guest-01'
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white text-sky-800 border-sky-200 hover:bg-sky-100'
                }`}
              >
                Student Shopper
                <span className="block text-[10px] opacity-80">(Rohan Sharma)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchUserRole('admin');
                  setIsAuthModalOpen(false);
                }}
                className={`py-1.5 px-2 text-xs font-medium rounded-md border text-center transition-colors ${
                  currentUser.role === 'admin'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Store Admin
                <span className="block text-[10px] opacity-80">(Full Control)</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Password (Demo only)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              {mode === 'signin' ? 'Sign In (Simulated)' : 'Register Demo Account'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            {mode === 'signin' ? (
              <p className="text-xs text-slate-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-sky-600 hover:underline font-medium"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-600">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-sky-600 hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
