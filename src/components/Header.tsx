import React, { useState, useEffect } from 'react';
import { Phone, Globe, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, onOpenBooking }) => {
  const { isArabic, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'rooms', labelEn: 'Rooms', labelAr: 'الغرف والأجنحة' },
    { id: 'gallery-services', labelEn: 'Gallery & Services', labelAr: 'المعرض والخدمات' },
    { id: 'contact-booking', labelEn: 'Contact & Booking', labelAr: 'تواصل وحجز' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-900/95 backdrop-blur-md shadow-xl border-b border-amber-500/20 py-3 text-white'
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/60 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex flex-col text-left focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-orange-600/30">
                <Sparkles className="w-4 h-4 text-stone-950 fill-stone-950" />
              </div>
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {isArabic ? HOTEL_INFO.nameAr : HOTEL_INFO.name}
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-amber-400/90 uppercase font-medium mt-0.5 pl-10 hidden sm:inline-block">
              {t('Al Corniche · Dammam', 'الكورنيش · الدمام')}
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-sm font-medium tracking-wide transition-colors py-1 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {t(item.labelEn, item.labelAr)}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Language, Call, Book Now) */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-800/80 border border-stone-700/60 text-stone-200 hover:text-amber-400 hover:border-amber-500/50 transition-all"
              title={t('Switch Language', 'تغيير اللغة')}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{isArabic ? 'English' : 'العربية'}</span>
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg text-amber-300 hover:text-amber-200 hover:bg-stone-800/50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span className="dir-ltr font-mono">{HOTEL_INFO.phone}</span>
            </a>

            {/* Primary CTA: Book Now */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-300 rounded-lg shadow-lg shadow-orange-600/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('Book Now', 'احجز الآن')}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-xs font-semibold rounded bg-stone-800 text-amber-400 border border-stone-700"
            >
              {isArabic ? 'EN' : 'عربي'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-amber-400 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-stone-900/98 border-b border-amber-500/30 px-4 pt-4 pb-6 space-y-4 shadow-2xl">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  activePage === item.id
                    ? 'bg-orange-500/20 text-amber-400 font-bold border-l-4 border-orange-500'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                {t(item.labelEn, item.labelAr)}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-3">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-stone-800 text-amber-300 font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>{HOTEL_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 font-bold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Book Now (Best Rate)', 'احجز الآن (أفضل سعر)')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
