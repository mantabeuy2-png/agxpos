import React, { useState, useEffect, useRef } from 'react';
import { X, Store } from 'lucide-react';
import { PlanType, UserSession } from '../types';
import { TrialForm } from './auth/TrialForm';
import { LoginForm } from './auth/LoginForm';
import { SuccessScreen } from './auth/SuccessScreen';

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: 'trial' | 'login';
  initialPlan?: PlanType;
  onClose: () => void;
  onOpenDashboard: (session: UserSession) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialTab = 'trial',
  initialPlan = 'standar',
  onClose,
  onOpenDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'trial' | 'login'>(initialTab);
  const [sessionSuccess, setSessionSuccess] = useState<UserSession | null>(null);
  const [successType, setSuccessType] = useState<'trial' | 'login'>('trial');

  const modalRef = useRef<HTMLDivElement>(null);
  const trialTabRef = useRef<HTMLButtonElement>(null);
  const loginTabRef = useRef<HTMLButtonElement>(null);

  // Sync state with incoming props when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSessionSuccess(null);
      // Focus modal
      setTimeout(() => {
        if (initialTab === 'trial') {
          trialTabRef.current?.focus();
        } else {
          loginTabRef.current?.focus();
        }
      }, 50);
    }
  }, [isOpen, initialTab]);

  // Handle Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Arrow navigation between tabs
  const handleTabKeyDown = (e: React.KeyboardEvent, currentTab: 'trial' | 'login') => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentTab === 'trial') {
        setActiveTab('login');
        loginTabRef.current?.focus();
      } else {
        setActiveTab('trial');
        trialTabRef.current?.focus();
      }
    }
  };

  if (!isOpen) return null;

  const handleTrialSuccess = (session: UserSession) => {
    setSuccessType('trial');
    setSessionSuccess(session);
  };

  const handleLoginSuccess = (session: UserSession) => {
    setSuccessType('login');
    setSessionSuccess(session);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Dark Transparent Overlay with Blur */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[520px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 z-10 my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Brand */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xs">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span
              id="auth-modal-title"
              className="text-xl font-bold tracking-tight text-slate-900 leading-none flex items-center gap-1"
            >
              Agx<span className="text-blue-600">POS</span>
            </span>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">
              Platform Operasional Toko UMKM
            </p>
          </div>
        </div>

        {/* If successfully authenticated, show SuccessScreen */}
        {sessionSuccess ? (
          <SuccessScreen
            type={successType}
            session={sessionSuccess}
            onOpenDashboard={() => {
              onClose();
              onOpenDashboard(sessionSuccess);
            }}
          />
        ) : (
          <div>
            {/* Segmented Tabs */}
            <div
              role="tablist"
              aria-label="Autentikasi Akun"
              className="p-1 rounded-2xl bg-slate-100 grid grid-cols-2 gap-1 mb-6"
            >
              <button
                ref={trialTabRef}
                role="tab"
                id="tab-trial"
                aria-selected={activeTab === 'trial'}
                aria-controls="panel-trial"
                tabIndex={activeTab === 'trial' ? 0 : -1}
                type="button"
                onClick={() => setActiveTab('trial')}
                onKeyDown={(e) => handleTabKeyDown(e, 'trial')}
                className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'trial'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Daftar Trial 7 Hari
              </button>

              <button
                ref={loginTabRef}
                role="tab"
                id="tab-login"
                aria-selected={activeTab === 'login'}
                aria-controls="panel-login"
                tabIndex={activeTab === 'login' ? 0 : -1}
                type="button"
                onClick={() => setActiveTab('login')}
                onKeyDown={(e) => handleTabKeyDown(e, 'login')}
                className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'login'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Masuk Akun
              </button>
            </div>

            {/* Tab Panels */}
            {activeTab === 'trial' ? (
              <div id="panel-trial" role="tabpanel" aria-labelledby="tab-trial">
                <TrialForm
                  initialPlan={initialPlan}
                  onSuccess={handleTrialSuccess}
                />
              </div>
            ) : (
              <div id="panel-login" role="tabpanel" aria-labelledby="tab-login">
                <LoginForm onSuccess={handleLoginSuccess} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
