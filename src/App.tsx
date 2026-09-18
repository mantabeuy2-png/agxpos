import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { FeatureGrid } from './components/FeatureGrid';
import { AIAssistantSection } from './components/AIAssistantSection';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorks } from './components/HowItWorks';
import { TargetUsers } from './components/TargetUsers';
import { Pricing } from './components/Pricing';
import { Comparison } from './components/Comparison';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { DashboardPreview } from './components/DashboardPreview';
import { PlanType, UserSession } from './types';
import { authService } from './services/authService';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'trial' | 'login'>('trial');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('standar');
  const [currentSession, setCurrentSession] = useState<UserSession | null>(() => authService.getSession());
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  // Sync with browser URL / URL pathname
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === '/dashboard') {
        const session = authService.getSession();
        if (session) {
          setCurrentSession(session);
          setView('dashboard');
        } else {
          setView('landing');
        }
      } else {
        setView('landing');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleOpenAuth = (tab: 'trial' | 'login', plan: PlanType = 'standar') => {
    setAuthTab(tab);
    setSelectedPlan(plan);
    setIsAuthOpen(true);
  };

  const handleSelectPricingPlan = (plan: PlanType) => {
    handleOpenAuth('trial', plan);
  };

  const handleOpenDashboard = (session: UserSession) => {
    setCurrentSession(session);
    setView('dashboard');
    window.history.pushState({}, '', '/dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setView('landing');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentSession(null);
    setView('landing');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDemo = () => {
    // Scroll down to the interactive tablet hardware frame smoothly
    const tabletElement = document.getElementById('hero-section');
    if (tabletElement) {
      tabletElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (view === 'dashboard' && currentSession) {
    return (
      <DashboardPreview
        session={currentSession}
        onLogout={handleLogout}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Modern Navbar */}
      <Navbar
        onOpenAuth={(tab) => handleOpenAuth(tab, 'standar')}
        onOpenDemo={handleOpenDemo}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive Tablet Kasir Hardware Mockup */}
        <Hero
          onOpenAuth={(tab) => handleOpenAuth(tab, 'standar')}
          onOpenDemo={handleOpenDemo}
        />

        {/* 3 Pillars Section */}
        <Pillars />

        {/* Feature Grid Section (12 Core Features) */}
        <FeatureGrid />

        {/* Highlight Section: Asisten AI (Advisory Data Toko) */}
        <AIAssistantSection />

        {/* Problem Section (Before / After Operasional Toko) */}
        <ProblemSection />

        {/* How It Works (4 Steps Timeline) */}
        <HowItWorks onOpenAuth={(tab) => handleOpenAuth(tab, 'standar')} />

        {/* Target Users Section */}
        <TargetUsers />

        {/* Pricing Section with Duration Discount Calculation */}
        <Pricing onSelectPlan={handleSelectPricingPlan} />

        {/* Package Comparison Table */}
        <Comparison onSelectPlan={handleSelectPricingPlan} />

        {/* FAQ Accordion Section */}
        <FAQ />

        {/* Final CTA Banner */}
        <FinalCTA onOpenAuth={(tab) => handleOpenAuth(tab, 'standar')} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal (Trial & Login) */}
      <AuthModal
        isOpen={isAuthOpen}
        initialTab={authTab}
        initialPlan={selectedPlan}
        onClose={() => setIsAuthOpen(false)}
        onOpenDashboard={handleOpenDashboard}
      />
    </div>
  );
}
