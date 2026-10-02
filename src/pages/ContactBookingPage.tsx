import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, Calendar, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';
import { InteractiveMap } from '../components/InteractiveMap';

interface ContactBookingPageProps {
  onOpenBooking: () => void;
  onSuccessToast: (msg: string) => void;
}

export const ContactBookingPage: React.FC<ContactBookingPageProps> = ({
  onOpenBooking,
  onSuccessToast,
}) => {
  const { isArabic, t } = useLanguage();

  // Contact Form State
  const [activeTab, setActiveTab] = useState<'contact' | 'inquiry'>('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+966');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    onSuccessToast(
      isArabic
        ? 'تم استلام رسالتك بنجاح! سيتواصل معك فريق الاستقبال قريباً.'
        : 'Message received successfully! Our front desk team will get back to you shortly.'
    );
  };

  return (
    <div className="pt-24 pb-20 bg-stone-950 text-stone-100 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
            {t('Reach Out to Us', 'تواصل مع فندق غولدن غاردن')}
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white">
            {t('Contact & Direct Booking', 'التواصل والحجز المباشر')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
            {t(
              'We are delighted to assist you with room reservations, venue inquiries, or direct directions.',
              'يسعدنا مساعدتك في حجز الغرف، أو تقديم أي معلومات وإرشادات للوصول للفندق.'
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Address */}
          <div className="p-6 bg-stone-900 rounded-2xl border border-stone-800 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center border border-orange-500/30">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              {t('Hotel Address', 'عنوان الفندق')}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isArabic ? HOTEL_INFO.addressAr : HOTEL_INFO.address}
            </p>
            <span className="text-[11px] text-amber-400 font-semibold block pt-1">
              {t('Dammam Corniche · Al-Hamra’a District', 'كورنيش الدمام · حي الحمراء')}
            </span>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="p-6 bg-stone-900 rounded-2xl border border-stone-800 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center border border-orange-500/30">
              <Phone className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              {t('Phone & WhatsApp', 'الهاتف والواتساب')}
            </h3>
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="block font-mono text-base text-amber-400 font-bold hover:underline dir-ltr text-left"
            >
              {HOTEL_INFO.phone}
            </a>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs font-semibold text-stone-200 hover:text-white"
              >
                {t('Click to Call', 'اتصال هاتفي')}
              </a>
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-700/30 text-emerald-400 border border-emerald-600/40 text-xs font-semibold hover:bg-emerald-700/50"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Card 3: Timings & Check-In */}
          <div className="p-6 bg-stone-900 rounded-2xl border border-stone-800 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center border border-orange-500/30">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              {t('Check-In & Reception Hours', 'ساعات الدخول والاستقبال')}
            </h3>
            <div className="text-xs text-stone-300 space-y-1">
              <p>
                <span className="text-stone-400">{t('Check-In Time:', 'وقت الدخول:')}</span>{' '}
                <strong className="text-amber-400">{HOTEL_INFO.checkInTime}</strong>
              </p>
              <p>
                <span className="text-stone-400">{t('Check-Out Time:', 'وقت المغادرة:')}</span>{' '}
                <strong className="text-amber-400">{HOTEL_INFO.checkOutTime}</strong>
              </p>
              <p className="text-[11px] text-stone-400 pt-1">
                {t('24/7 Front desk assistance guaranteed', 'خدمة المساعدة في الاستقبال متاحة 24/7')}
              </p>
            </div>
          </div>

        </div>

        {/* Form & Reservation Engine Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Interactive Contact / Inquiry Form */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Form Mode Selector */}
            <div className="flex border-b border-stone-800 pb-3 gap-4">
              <button
                onClick={() => setActiveTab('contact')}
                className={`text-sm font-bold pb-1 transition-colors ${
                  activeTab === 'contact'
                    ? 'text-amber-400 border-b-2 border-orange-500'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {t('Send Contact Message', 'إرسال رسالة تواصل')}
              </button>

              <button
                onClick={() => setActiveTab('inquiry')}
                className={`text-sm font-bold pb-1 transition-colors ${
                  activeTab === 'inquiry'
                    ? 'text-amber-400 border-b-2 border-orange-500'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {t('Quick Booking Request', 'طلب حجز سريع')}
              </button>
            </div>

            {activeTab === 'contact' ? (
              !submitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {t('Full Name', 'الاسم الكامل')} *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sultan Al-Mansoor"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {t('Phone Number', 'رقم الهاتف')}
                      </label>
                      <input
                        type="tel"
                        placeholder="+9665..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:border-amber-500 focus:outline-none font-mono dir-ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {t('Email Address', 'البريد الإلكتروني')} *
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {t('Subject / Topic', 'الموضوع')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('General Inquiry / Feedback', 'استفسار عام / ملاحظة')}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {t('Message Content', 'محتوى الرسالة')} *
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t('How can Golden Garden front desk assist you today?', 'كيف يمكن لفريق الاستقبال مساعدتك اليوم؟')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-300 shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('Submit Contact Inquiry', 'إرسال الرسالة')}</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-serif-luxury text-xl font-bold text-white">
                    {t('Message Sent Successfully!', 'تم إرسال رسالتك بنجاح!')}
                  </h4>
                  <p className="text-xs text-stone-300">
                    {t('Thank you for contacting Golden Garden Al Corniche Hotel. We will respond promptly.', 'شُكراً لتواصلك مع فندق غولدن غاردن الكورنيش. سنقوم بالرد عليك في أقرب وقت.')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 rounded-lg"
                  >
                    {t('Send Another Message', 'إرسال رسالة أخرى')}
                  </button>
                </div>
              )
            ) : (
              /* Quick Inquiry Launcher */
              <div className="space-y-4 text-center py-4">
                <p className="text-xs text-stone-300 leading-relaxed">
                  {t(
                    'Use our online reservation tool to view instant room rates in Saudi Riyal (SAR) and generate an immediate confirmation voucher.',
                    'استخدم محرك الحجز المباشر لاستعراض الأسعار الفورية بالريال السعودي وإنشاء قسيمة التأكيد الفورية.'
                  )}
                </p>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-300 shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('Open Full Reservation Modal', 'فتح نافذة الحجز الكاملة')}</span>
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Hotel Info & WhatsApp Box */}
          <div className="space-y-6">
            <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  {isArabic ? HOTEL_INFO.nameAr : HOTEL_INFO.name}
                </h3>
              </div>

              <div className="space-y-2 text-xs text-stone-300">
                <p>
                  <strong>{t('Address:', 'العنوان:')}</strong> {isArabic ? HOTEL_INFO.addressAr : HOTEL_INFO.address}
                </p>
                <p>
                  <strong>{t('Telephone:', 'الهاتف:')}</strong>{' '}
                  <a href={`tel:${HOTEL_INFO.phone}`} className="dir-ltr text-amber-400 hover:underline">
                    {HOTEL_INFO.phone}
                  </a>
                </p>
                <p>
                  <strong>{t('Email:', 'البريد:')}</strong> {HOTEL_INFO.email}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800 flex flex-wrap gap-3">
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-stone-950 font-bold text-xs flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('Call Desk Now', 'اتصال فوراً')}</span>
                </a>

                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t('WhatsApp Chat', 'محادثة الواتساب')}</span>
                </a>
              </div>
            </div>

            {/* Google Map Section */}
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-white mb-3">
                {t('Location Map', 'خريطة الموقع')}
              </h3>
              <InteractiveMap />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
