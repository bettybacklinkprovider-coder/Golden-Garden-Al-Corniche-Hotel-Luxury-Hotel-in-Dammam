import React from 'react';
import { MapPin, Phone, Mail, MessageSquare, Clock, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setActivePage: (page: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenBooking }) => {
  const { isArabic, t } = useLanguage();

  const navLinks = [
    { id: 'home', labelEn: 'Home Landing', labelAr: 'الرئيسية' },
    { id: 'rooms', labelEn: 'Rooms & Suites', labelAr: 'الغرف والأجنحة' },
    { id: 'gallery-services', labelEn: 'Photo Gallery & Facilities', labelAr: 'معرض الصور والخدمات' },
    { id: 'contact-booking', labelEn: 'Contact & Direct Booking', labelAr: 'تواصل معنا والحجز' },
  ];

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t-2 border-orange-600/40 relative overflow-hidden">
      {/* Decorative Orange Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-orange-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-stone-950 font-bold shadow-md">
                <Sparkles className="w-5 h-5 text-stone-950 fill-stone-950" />
              </div>
              <span className="font-serif-luxury text-xl font-bold text-white tracking-wide">
                {isArabic ? HOTEL_INFO.nameAr : HOTEL_INFO.name}
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {t(HOTEL_INFO.taglineEn, HOTEL_INFO.taglineAr)}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 text-xs font-bold text-stone-950 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-md shadow transition-all"
              >
                {t('Book Stay (SAR)', 'احجز الآن (بالريال)')}
              </button>

              <a
                href={`https://wa.me/${HOTEL_INFO.whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-emerald-700/30 text-emerald-400 hover:bg-emerald-700/50 border border-emerald-600/40 transition-colors"
                title="WhatsApp Direct Contact"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-1 border-b border-stone-800">
              {t('Site Navigation', 'التنقل بالموقع')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActivePage(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-300 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-orange-500">›</span>
                    <span>{t(link.labelEn, link.labelAr)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-1 border-b border-stone-800">
              {t('Contact & Location', 'العنوان والتواصل')}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-stone-300 leading-relaxed">
                  {isArabic ? HOTEL_INFO.addressAr : HOTEL_INFO.address}
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="font-mono text-stone-200 hover:text-amber-400 transition-colors dir-ltr"
                >
                  {HOTEL_INFO.phone}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="text-stone-300 hover:text-amber-400 transition-colors"
                >
                  {HOTEL_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Check-in / Policy & Currency */}
          <div>
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 pb-1 border-b border-stone-800">
              {t('Stay Information', 'معلومات الإقامة')}
            </h4>

            <div className="space-y-3 text-xs bg-stone-900/80 p-3.5 rounded-lg border border-stone-800">
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  {t('Check-In:', 'وقت الدخول:')}
                </span>
                <span className="font-semibold text-amber-300">{HOTEL_INFO.checkInTime}</span>
              </div>

              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  {t('Check-Out:', 'وقت المغادرة:')}
                </span>
                <span className="font-semibold text-amber-300">{HOTEL_INFO.checkOutTime}</span>
              </div>

              <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 leading-tight">
                {t(
                  'Rates displayed in Saudi Riyal (SAR). Inclusive of high-speed Wi-Fi & valet parking service.',
                  'الأسعار معلنة بالريال السعودي وتتضمن خدمة الواي فاي والمواقف المظللة.'
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {isArabic ? HOTEL_INFO.nameAr : HOTEL_INFO.name}. {t('All Rights Reserved.', 'جميع الحقوق محفوظة.')}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>3252 Cornish Rd, Dammam 32421</span>
            <span>·</span>
            <span>SAR Currency</span>
            <span>·</span>
            <button
              onClick={() => {
                setActivePage('contact-booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 underline"
            >
              {t('Directions & Booking', 'الموقع والحجز')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
