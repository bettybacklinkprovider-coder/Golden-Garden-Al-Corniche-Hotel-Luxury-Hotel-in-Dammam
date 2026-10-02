import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Layers, Compass } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';

export const InteractiveMap: React.FC = () => {
  const { isArabic, t } = useLanguage();
  const [mapMode, setMapMode] = useState<'standard' | 'satellite'>('standard');

  const gmapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    HOTEL_INFO.address
  )}&t=${mapMode === 'satellite' ? 'k' : 'm'}&z=15&ie=UTF8&iwloc=&output=embed`;

  const directGmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    HOTEL_INFO.address
  )}`;

  const landmarks = [
    { nameEn: 'Dammam Sea Promenade & Park', nameAr: 'منتزه وكورنيش الدمام', distance: '0.4 km' },
    { nameEn: 'Al Shatea Mall & Shopping Center', nameAr: 'الشاطئ مول للتسوق', distance: '1.2 km' },
    { nameEn: 'Dammam Marina & Yacht Club', nameAr: 'مارينا الدمام ونادي اليخوت', distance: '2.8 km' },
    { nameEn: 'King Fahd International Airport (DMM)', nameAr: 'مطار الملك فهد الدولي بالدمام', distance: '32 km' },
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl text-stone-100">
      {/* Map Control Bar */}
      <div className="p-4 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-500" />
          <div>
            <h4 className="font-serif-luxury text-sm font-bold text-amber-400">
              {isArabic ? HOTEL_INFO.nameAr : HOTEL_INFO.name}
            </h4>
            <p className="text-[11px] text-stone-400">
              {isArabic ? HOTEL_INFO.addressAr : HOTEL_INFO.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Map Layer Switcher */}
          <button
            onClick={() => setMapMode(mapMode === 'standard' ? 'satellite' : 'standard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{mapMode === 'standard' ? t('Satellite', 'قمر صناعي') : t('Map View', 'خريطة')}</span>
          </button>

          {/* Direct Google Maps Link */}
          <a
            href={directGmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-stone-950 font-bold text-xs shadow transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{t('Open GPS Directions', 'فتح الاتجاهات')}</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Embedded iFrame Map */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-stone-950">
        <iframe
          title="Golden Garden Al Corniche Hotel Map Location"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={gmapsEmbedUrl}
          className="filter contrast-[1.05] brightness-95"
          loading="lazy"
        />

        {/* Custom Location Overlay Badge */}
        <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md p-3 rounded-xl border border-amber-500/30 max-w-xs shadow-xl hidden sm:block">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
            <Compass className="w-4 h-4 animate-spin-slow text-orange-500" />
            <span>{t('Prime Coastal Location', 'موقع ساحلي مميز')}</span>
          </div>
          <p className="text-[11px] text-stone-300 leading-tight">
            {t(
              'Located directly on Dammam Cornish Rd in Al-Hamra’a district with uninterrupted sea views.',
              'يقع مباشرة على طريق كورنيش الدمام في حي الحمراء الراقي مع إطلالات مباشرة على البحر.'
            )}
          </p>
        </div>
      </div>

      {/* Nearby Landmarks Bar */}
      <div className="p-4 bg-stone-950/90 border-t border-stone-800">
        <p className="text-xs font-semibold uppercase text-amber-400 mb-2">
          {t('Nearby Key Landmarks & Distances', 'أبرز المعالم القريبة والمسافات')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
          {landmarks.map((lm, idx) => (
            <div key={idx} className="p-2 bg-stone-900 rounded-lg border border-stone-800/80 flex justify-between items-center">
              <span className="text-stone-300 truncate pr-2">{t(lm.nameEn, lm.nameAr)}</span>
              <span className="text-amber-400 font-mono font-bold shrink-0">{lm.distance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
