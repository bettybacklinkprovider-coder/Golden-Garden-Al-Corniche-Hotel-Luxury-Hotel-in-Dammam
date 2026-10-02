import React, { useState } from 'react';
import { Calendar, Phone, MapPin, Sparkles, Wifi, Wind, UserCheck, Sparkles as HouseIcon, Car, Utensils, ArrowRight, Star, ChevronRight, Eye, ShieldCheck, CheckCircle, MessageSquare } from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA, FACILITIES_DATA, GALLERY_DATA, REVIEWS_DATA } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';
import { InteractiveMap } from '../components/InteractiveMap';

interface HomePageProps {
  setActivePage: (page: string) => void;
  onOpenBooking: (roomId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage, onOpenBooking }) => {
  const { isArabic, t } = useLanguage();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // Featured rooms (3)
  const featuredRooms = ROOMS_DATA.slice(0, 3);

  // Facility icons lookup
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-6 h-6 text-orange-500" />;
      case 'Wind': return <Wind className="w-6 h-6 text-orange-500" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-orange-500" />;
      case 'Sparkles': return <HouseIcon className="w-6 h-6 text-orange-500" />;
      case 'Car': return <Car className="w-6 h-6 text-orange-500" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-orange-500" />;
      default: return <Sparkles className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-0 text-stone-900">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-stone-950">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={GALLERY_DATA[0].image}
            alt="Golden Garden Al Corniche Hotel Exterior"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          {/* Luxury Overlay Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
          <div className="absolute inset-0 bg-orange-950/20 mix-blend-overlay" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 my-auto pt-12 pb-16">
          
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/40 backdrop-blur-md shadow-lg">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-amber-300 tracking-wide">
              {HOTEL_INFO.ratingScore} · {t('Luxury Coastal Stay', 'إقامة ساحلية فاخرة')}
            </span>
          </div>

          {/* Hotel Name Prominently Displayed */}
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight drop-shadow-md">
            {isArabic ? HOTEL_INFO.nameAr : HOTEL_INFO.name}
          </h1>

          {/* Welcoming Tagline */}
          <p className="text-base sm:text-xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
            {t(HOTEL_INFO.taglineEn, HOTEL_INFO.taglineAr)}
          </p>

          {/* Address Pill */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-400 font-medium">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
            <span>{isArabic ? HOTEL_INFO.addressAr : HOTEL_INFO.address}</span>
          </div>

          {/* Action CTAs: Book Now & Contact Us */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-300 shadow-xl shadow-orange-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Book Now (SAR Best Rate)', 'احجز الآن (أفضل سعر بالريال)')}</span>
            </button>

            <button
              onClick={() => {
                setActivePage('contact-booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-white bg-stone-900/80 hover:bg-stone-800 border border-amber-500/40 backdrop-blur-md shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>{t('Contact Us', 'تواصل معنا')}</span>
            </button>
          </div>

          {/* Quick Availability Bar */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="glass-panel-dark p-4 sm:p-5 rounded-2xl border border-amber-500/30 text-left shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 uppercase mb-1">
                    {t('Check-In', 'تاريخ الوصول')}
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 uppercase mb-1">
                    {t('Check-Out', 'تاريخ المغادرة')}
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 uppercase mb-1">
                    {t('Guests', 'النزلاء')}
                  </label>
                  <select className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500">
                    <option>2 {t('Adults', 'شخصان')}</option>
                    <option>1 {t('Adult', 'شخص واحد')}</option>
                    <option>4 {t('Family', 'عائلة (4)')}</option>
                  </select>
                </div>

                <button
                  onClick={() => onOpenBooking()}
                  className="w-full py-2.5 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow"
                >
                  {t('Check Availability', 'التحقق من التوفر')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: ABOUT THE HOTEL */}
      <section className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Image Stack */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
                <img
                  src={GALLERY_DATA[1].image}
                  alt="Golden Garden Grand Reception & Lobby"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-2 sm:right-6 bg-stone-950/95 border border-amber-500/40 backdrop-blur-md p-5 rounded-2xl shadow-2xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500 border border-orange-500/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-serif-luxury text-2xl font-bold text-amber-400">100%</span>
                    <span className="text-xs text-stone-300 font-medium">
                      {t('Warm Arabian Hospitality', 'ضيافة عربية أصيلة ومعتمدة')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  {t('About Golden Garden Al Corniche', 'نبذة عن فندق غولدن غاردن الكورنيش')}
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
                  {t(
                    'Where Timeless Coastal Luxury Meets Genuine Comfort',
                    'حيث تلتقي الفخامة الساحلية بالراحة الحقيقية والأصالة'
                  )}
                </h2>
              </div>

              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                {t(
                  'Strategically located at 3252 Cornish Rd in Dammam’s vibrant Al-Hamra’a district, Golden Garden Al Corniche Hotel provides an oasis of tranquility for business travelers, families, and leisure guests. Designed with warm orange tones, plush furnishings, and contemporary amenities, our hotel delivers an exceptional stay along the Arabian Gulf shoreline.',
                  'بموقعه الاستراتيجي على طريق الكورنيش بحي الحمراء في الدمام، يوفر فندق غولدن غاردن الكورنيش واحة من الهدوء والراحة لرجال الأعمال والعائلات. صمم الفندق بلمسات أنيقة من اللون البرتقالي والذهبي، وأثاث فاخر، ومرافق حديثة تضمن لك تجربة إقامة استثنائية.'
                )}
              </p>

              {/* Highlight Badges */}
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold">
                <div className="p-3 bg-stone-950/70 rounded-xl border border-stone-800 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-stone-200">{t('Prime Corniche Location', 'موقع الكورنيش المميز')}</span>
                </div>

                <div className="p-3 bg-stone-950/70 rounded-xl border border-stone-800 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-stone-200">{t('24/7 Dedicated Concierge', 'خدمة استقبال 24/7')}</span>
                </div>

                <div className="p-3 bg-stone-950/70 rounded-xl border border-stone-800 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-stone-200">{t('Complimentary Valet Parking', 'مواقف سيارات وفاليه مجاني')}</span>
                </div>

                <div className="p-3 bg-stone-950/70 rounded-xl border border-stone-800 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="text-stone-200">{t('Ultra High-Speed Wi-Fi', 'إنترنت سريع مجاني')}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActivePage('rooms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-orange-600/20"
                >
                  <span>{t('Explore Accommodations', 'استكشف الغرف والأجنحة')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: ROOMS & ACCOMMODATION */}
      <section className="py-20 bg-stone-950 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                {t('Luxury Accommodations', 'الإقامة والأجنحة')}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white mt-1">
                {t('Featured Rooms & Coastal Suites', 'أرقى الغرف والأجنحة الفاخرة')}
              </h2>
            </div>

            <button
              onClick={() => {
                setActivePage('rooms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm"
            >
              <span>{t('View All Rooms', 'عرض جميع الغرف')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="group bg-stone-900 rounded-2xl border border-stone-800 hover:border-amber-500/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Image Slot */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.nameEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-400 border border-amber-500/30">
                      {room.priceSAR} SAR / {t('night', 'ليلة')}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {isArabic ? room.nameAr : room.nameEn}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {isArabic ? room.descriptionAr : room.descriptionEn}
                    </p>

                    {/* Features Badges */}
                    <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-stone-300">
                      <span className="px-2.5 py-1 rounded-md bg-stone-950 border border-stone-800">
                        {isArabic ? room.bedTypeAr : room.bedTypeEn}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-stone-950 border border-stone-800">
                        {room.sizeSqm} m²
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActivePage('rooms');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold text-center transition-colors"
                  >
                    {t('View Details', 'عرض التفاصيل')}
                  </button>

                  <button
                    onClick={() => onOpenBooking(room.id)}
                    className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 font-bold text-xs text-center transition-all shadow-md shadow-orange-600/20"
                  >
                    {t('Book Now', 'احجز الآن')}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: HOTEL FACILITIES & SERVICES */}
      <section className="py-20 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              {t('World-Class Amenities', 'المرافق والخدمات')}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
              {t('Hotel Facilities Designed for Ultimate Comfort', 'مرافق وخدمات فندقية متكاملة')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {t(
                'Everything you need for a relaxing, seamless stay along the Dammam Corniche.',
                'كل ما تحتاجه لإقامة هادئة ومريحة ومجهزة بالكامل على كورنيش الدمام.'
              )}
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES_DATA.map((fac) => (
              <div
                key={fac.id}
                className="p-6 bg-stone-950/80 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-600/15 flex items-center justify-center border border-orange-500/25">
                  {getFacilityIcon(fac.iconName)}
                </div>

                <h3 className="font-serif-luxury text-base font-bold text-white">
                  {isArabic ? fac.titleAr : fac.titleEn}
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed">
                  {isArabic ? fac.descriptionAr : fac.descriptionEn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: PHOTO GALLERY PREVIEW */}
      <section className="py-20 bg-stone-950 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                {t('Visual Experience', 'المعرض المصور')}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white mt-1">
                {t('Photo Gallery of Golden Garden', 'معرض صور الفندق والأجواء')}
              </h2>
            </div>

            <button
              onClick={() => {
                setActivePage('gallery-services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm"
            >
              <span>{t('View Full Gallery & Services', 'عرض كامل المعرض والخدمات')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Masonry/Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_DATA.slice(0, 4).map((imgItem) => (
              <div
                key={imgItem.id}
                onClick={() => setSelectedGalleryImg(imgItem.image)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-stone-800"
              >
                <img
                  src={imgItem.image}
                  alt={imgItem.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase text-amber-400">
                    {imgItem.category}
                  </span>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {isArabic ? imgItem.titleAr : imgItem.titleEn}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-300">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t('Click to Expand', 'انقر للتكبير')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: LOCATION & CONTACT SECTION */}
      <section className="py-20 bg-stone-900 text-stone-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              {t('Convenient Location', 'الموقع والتواصل')}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
              {t('Visit Us on Dammam Corniche', 'موقعنا المباشر على كورنيش الدمام')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              3252 Cornish Rd, 7459, Al-Hamra'a, Dammam 32421, Saudi Arabia
            </p>
          </div>

          {/* Interactive Map Component */}
          <InteractiveMap />

          {/* Direct Phone & WhatsApp Bar */}
          <div className="p-8 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-amber-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {t('Need Instant Booking Assistance?', 'هل تحتاج لمساعدة فورية للحجز؟')}
              </h3>
              <p className="text-xs text-stone-400">
                {t('Our desk reception is available 24 hours a day at +966544674763', 'طاقم الاستقبال متاح على مدار الساعة عبر الهاتف والواتساب')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="px-6 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="dir-ltr font-mono">{HOTEL_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${HOTEL_INFO.whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedGalleryImg && (
        <div
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedGalleryImg}
              alt="Gallery Lightbox"
              className="w-full max-h-[85vh] object-contain rounded-2xl border border-amber-500/30 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
