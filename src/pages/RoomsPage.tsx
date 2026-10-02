import React, { useState } from 'react';
import { Calendar, CheckCircle2, SlidersHorizontal, ArrowUpDown, Sparkles, X, Info } from 'lucide-react';
import { ROOMS_DATA } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';
import { Room } from '../types';

interface RoomsPageProps {
  onOpenBooking: (roomId?: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenBooking }) => {
  const { isArabic, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [detailRoomModal, setDetailRoomModal] = useState<Room | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Categories', labelAr: 'جميع الغرف والأجنحة' },
    { id: 'suite', labelEn: 'Suites', labelAr: 'الأجنحة الفاخرة' },
    { id: 'sea-view', labelEn: 'Sea View', labelAr: 'إطلالة على البحر' },
    { id: 'executive', labelEn: 'Executive', labelAr: 'التنفيذية' },
    { id: 'family', labelEn: 'Family', labelAr: 'العائلية' },
  ];

  // Filter & Sort
  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (selectedCategory === 'all') return true;
    return room.category === selectedCategory;
  }).sort((a, b) => {
    if (sortOrder === 'asc') return a.priceSAR - b.priceSAR;
    return b.priceSAR - a.priceSAR;
  });

  return (
    <div className="pt-24 pb-20 bg-stone-950 text-stone-100 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800 py-12 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
            {t('Golden Garden Accommodations', 'فندق غولدن غاردن - الإقامة')}
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white">
            {t('Rooms & Luxury Suites', 'الغرف والأجنحة الفاخرة')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
            {t(
              'Designed with warm orange accents, premium linens, and coastal views along the Arabian Gulf.',
              'غرف وأجنحة فاخرة بألوان برتقالية وذهبية دافئة، وإطلالات ساحرة على الخليج العربي بالدمام.'
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Filters & Sorting Bar */}
        <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-950 text-stone-300 hover:text-white border border-stone-800'
                }`}
              >
                {t(cat.labelEn, cat.labelAr)}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-stone-400">
            <SlidersHorizontal className="w-4 h-4 text-orange-500" />
            <span>{t('Sort by Price:', 'ترتيب حسب السعر:')}</span>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-amber-400 font-bold hover:border-amber-500 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>
                {sortOrder === 'asc'
                  ? t('Low to High', 'من الأقل إلى الأعلى')
                  : t('High to Low', 'من الأعلى إلى الأقل')}
              </span>
            </button>
          </div>

        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group bg-stone-900 rounded-2xl border border-stone-800 hover:border-amber-500/40 overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Room Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30">
                    {room.priceSAR} SAR <span className="text-stone-400 text-[10px] font-normal">/ {t('night', 'ليلة')}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] text-stone-200">
                    {room.sizeSqm} m² · {room.capacity}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {isArabic ? room.nameAr : room.nameEn}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                    {isArabic ? room.descriptionAr : room.descriptionEn}
                  </p>

                  <div className="pt-2 border-t border-stone-800/80 space-y-1.5">
                    <p className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
                      {t('Key Amenities:', 'أبرز المزايا:')}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-300">
                      {room.amenities.slice(0, 4).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setDetailRoomModal(room)}
                  className="flex-1 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('View Amenities', 'التفاصيل')}</span>
                </button>

                <button
                  onClick={() => onOpenBooking(room.id)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-lg shadow-orange-600/25"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('Book Now', 'احجز الآن')}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Room Detail Modal */}
      {detailRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-stone-100 p-6 space-y-5 my-8">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  {detailRoomModal.sizeSqm} m² · {detailRoomModal.capacity}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  {isArabic ? detailRoomModal.nameAr : detailRoomModal.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setDetailRoomModal(null)}
                className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={detailRoomModal.image}
              alt={detailRoomModal.nameEn}
              className="w-full h-64 object-cover rounded-xl border border-stone-800"
            />

            <p className="text-xs text-stone-300 leading-relaxed">
              {isArabic ? detailRoomModal.descriptionAr : detailRoomModal.descriptionEn}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase">
                {t('Full Amenities & Inclusions', 'جميع الخدمات والمميزات')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                {detailRoomModal.amenities.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-stone-950 rounded-lg border border-stone-800">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-stone-400 uppercase block">{t('RATE PER NIGHT', 'السعر لليلة')}</span>
                <span className="font-serif-luxury text-2xl font-bold text-amber-400">
                  {detailRoomModal.priceSAR} SAR
                </span>
              </div>

              <button
                onClick={() => {
                  const id = detailRoomModal.id;
                  setDetailRoomModal(null);
                  onOpenBooking(id);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
              >
                {t('Book This Suite', 'حجز هذا الجناح')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
