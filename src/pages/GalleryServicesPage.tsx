import React, { useState } from 'react';
import { Eye, Wifi, Wind, UserCheck, Sparkles as HouseIcon, Car, Utensils, Briefcase, Dumbbell, ShieldCheck, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { GALLERY_DATA, FACILITIES_DATA, HOTEL_INFO } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';

interface GalleryServicesPageProps {
  onOpenBooking: () => void;
}

export const GalleryServicesPage: React.FC<GalleryServicesPageProps> = ({ onOpenBooking }) => {
  const { isArabic, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'exterior' | 'rooms' | 'lobby' | 'facilities' | 'dining'>('all');
  const [lightboxImg, setLightboxImg] = useState<{ src: string; titleEn: string; titleAr: string } | null>(null);

  const filterTabs = [
    { id: 'all', labelEn: 'All Photos', labelAr: 'الكل' },
    { id: 'exterior', labelEn: 'Exterior & Sea View', labelAr: 'الواجهة والكورنيش' },
    { id: 'rooms', labelEn: 'Bedrooms & Suites', labelAr: 'الغرف والأجنحة' },
    { id: 'lobby', labelEn: 'Lobby & Reception', labelAr: 'الاستقبال والبهو' },
    { id: 'facilities', labelEn: 'Facilities & Lounge', labelAr: 'المرافق والصالات' },
    { id: 'dining', labelEn: 'Dining & Food', labelAr: 'المطعم والمأكولات' },
  ];

  const filteredGallery = GALLERY_DATA.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-6 h-6 text-orange-500" />;
      case 'Wind': return <Wind className="w-6 h-6 text-orange-500" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-orange-500" />;
      case 'Sparkles': return <HouseIcon className="w-6 h-6 text-orange-500" />;
      case 'Car': return <Car className="w-6 h-6 text-orange-500" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-orange-500" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-orange-500" />;
      case 'Dumbbell': return <Dumbbell className="w-6 h-6 text-orange-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <div className="pt-24 pb-20 bg-stone-950 text-stone-100 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
            {t('Explore Golden Garden', 'معرض فندق غولدن غاردن والخدمات')}
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white">
            {t('Photo Gallery & Hotel Services', 'معرض الصور والخدمات الفندقية')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
            {t(
              'Immerse yourself in the luxury, comfort, and state-of-the-art facilities of Golden Garden Al Corniche Hotel.',
              'استكشف الأجواء الفاخرة والمرافق الحديثة بفندق غولدن غاردن الكورنيش بالدمام.'
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 1: PHOTO GALLERY */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-white">
                {t('Photo Gallery Showcase', 'معرض الصور المميز')}
              </h2>
              <p className="text-xs text-stone-400">
                {t('Click on any image to inspect in full resolution', 'انقر على أي صورة لمعاينتها بحجم كامل')}
              </p>
            </div>

            {/* Gallery Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-stone-950 font-bold shadow'
                      : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
                  }`}
                >
                  {t(tab.labelEn, tab.labelAr)}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImg({ src: item.image, titleEn: item.titleEn, titleAr: item.titleAr })}
                className="group relative h-64 bg-stone-900 rounded-2xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500/50 transition-all shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5">
                    {isArabic ? item.titleAr : item.titleEn}
                  </h4>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-300">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t('View High Res', 'معاينة بدقة عالية')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: HOTEL SERVICES & AMENITIES */}
        <div className="space-y-8 pt-8 border-t border-stone-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
              {t('Dedicated Hospitality', 'خدمات وفنادق متكاملة')}
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-white">
              {t('Premium Services & Amenities', 'الخدمات الفندقية والمزايا المقدمة')}
            </h2>
            <p className="text-xs text-stone-400">
              {t(
                'Our team at Golden Garden is dedicated to providing warm personalized hospitality 24 hours a day.',
                'طاقم العمل بفندق غولدن غاردن يسعى لتقديم أفضل مستويات الخدمة الشخصية والمريحة على مدار الساعة.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES_DATA.map((service) => (
              <div
                key={service.id}
                className="p-6 bg-stone-900 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center border border-orange-500/30">
                  {getServiceIcon(service.iconName)}
                </div>

                <h3 className="font-serif-luxury text-base font-bold text-white">
                  {isArabic ? service.titleAr : service.titleEn}
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed">
                  {isArabic ? service.descriptionAr : service.descriptionEn}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-amber-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('Included for Guests', 'مشمول للنزلاء')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Special Amenities Highlight Box */}
          <div className="p-8 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-amber-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-orange-500">
                {HOTEL_INFO.address}
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {t('Ready to Experience Golden Garden Hospitality?', 'هل أنت جاهز لتجربة ضيافة غولدن غاردن؟')}
              </h3>
              <p className="text-xs text-stone-400">
                {t('Book direct for guaranteed best rate in SAR and flexible check-in assistance.', 'احجز مباشرة للحصول على أفضل سعر بالريال السعودي مع تسليم مرن للغرفة.')}
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shrink-0 shadow-lg"
            >
              {t('Book Your Room Now', 'احجز إقامتك الآن')}
            </button>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full text-center space-y-3">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 text-stone-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImg.src}
              alt="Expanded Lightbox"
              className="w-full max-h-[80vh] object-contain rounded-2xl border border-amber-500/30 shadow-2xl"
            />
            <p className="text-sm font-bold text-amber-400">
              {isArabic ? lightboxImg.titleAr : lightboxImg.titleEn}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
