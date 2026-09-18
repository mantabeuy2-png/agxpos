import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Tablet } from 'lucide-react';
import { AgxLogo } from './AgxLogo';

interface NavbarProps {
  onOpenAuth: (tab: 'trial' | 'login') => void;
  onOpenDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Fitur', href: '#fitur' },
    { name: 'Cara Kerja', href: '#cara-kerja' },
    { name: 'Harga', href: '#harga' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white/80 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl"
          aria-label="AgxPOS Beranda"
        >
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <AgxLogo className="w-10 h-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none flex items-center gap-1">
              Agx<span className="text-blue-600">POS</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
              Operasional UMKM
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi Utama">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenDemo && (
            <button
              id="nav-demo-btn"
              type="button"
              onClick={onOpenDemo}
              className="px-3.5 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Tablet className="w-3.5 h-3.5 text-sky-600" />
              <span>Coba Kasir Tablet</span>
            </button>
          )}

          <button
            id="nav-login-btn"
            type="button"
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Masuk
          </button>
          <button
            id="nav-trial-btn"
            type="button"
            onClick={() => onOpenAuth('trial')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span>Coba Gratis 7 Hari</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg"
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {onOpenDemo && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-center gap-1.5"
              >
                <Tablet className="w-4 h-4" />
                <span>Coba Kasir Tablet</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('trial');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
            >
              Coba Gratis 7 Hari
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
