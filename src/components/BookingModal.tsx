import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Mail, CheckCircle2, Award, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';
import { useLanguage } from '../context/LanguageContext';
import { BookingData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoomId?: string;
  onSuccess: (msg: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoomId,
  onSuccess,
}) => {
  const { isArabic, t } = useLanguage();

  // Tomorrow & 3 days from now
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkOutDefault = new Date();
  checkOutDefault.setDate(checkOutDefault.getDate() + 3);

  const formatDateString = (d: Date) => d.toISOString().split('T')[0];

  const [selectedRoomId, setSelectedRoomId] = useState(preSelectedRoomId || ROOMS_DATA[0].id);
  const [checkIn, setCheckIn] = useState(formatDateString(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateString(checkOutDefault));
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+966');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmation, setConfirmation] = useState<BookingData | null>(null);

  useEffect(() => {
    if (preSelectedRoomId) {
      setSelectedRoomId(preSelectedRoomId);
    }
  }, [preSelectedRoomId]);

  if (!isOpen) return null;

  const currentRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(1000 * 60 * 60 * 24, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const totalSAR = nights * currentRoom.priceSAR;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const ref = `GG-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookingResult: BookingData = {
      roomType: isArabic ? currentRoom.nameAr : currentRoom.nameEn,
      checkIn,
      checkOut,
      guests,
      fullName,
      email,
      phone,
      specialRequests,
      totalSAR,
      bookingRef: ref,
    };

    setConfirmation(bookingResult);
    onSuccess(
      isArabic
        ? `تم تأكيد حجزك بنجاح! رقم المرجع: ${ref}`
        : `Booking confirmed successfully! Confirmation Code: ${ref}`
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const resetModal = () => {
    setConfirmation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8 text-stone-100">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-stone-950 font-bold">
              <Sparkles className="w-4 h-4 fill-stone-950" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-amber-400">
                {t('Golden Garden Online Reservation', 'حجز إقامة غولدن غاردن')}
              </h3>
              <p className="text-[11px] text-stone-400">
                {HOTEL_INFO.address} · {HOTEL_INFO.phone}
              </p>
            </div>
          </div>

          <button
            onClick={resetModal}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!confirmation ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Room Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase text-amber-400 mb-2">
                  {t('Select Room / Suite Category', 'اختر نوع الغرفة أو الجناح')}
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none"
                >
                  {ROOMS_DATA.map((room) => (
                    <option key={room.id} value={room.id}>
                      {isArabic ? room.nameAr : room.nameEn} — {room.priceSAR} SAR / {t('night', 'ليلة')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Room Preview Card */}
              <div className="flex items-center gap-4 p-3 bg-stone-950/60 rounded-xl border border-stone-800">
                <img
                  src={currentRoom.image}
                  alt={currentRoom.nameEn}
                  className="w-20 h-16 object-cover rounded-lg shrink-0"
                />
                <div className="text-xs space-y-1 flex-1">
                  <p className="font-semibold text-stone-200">
                    {isArabic ? currentRoom.nameAr : currentRoom.nameEn}
                  </p>
                  <p className="text-stone-400">
                    {isArabic ? currentRoom.bedTypeAr : currentRoom.bedTypeEn} · {currentRoom.sizeSqm} m²
                  </p>
                  <p className="text-amber-400 font-bold">
                    {currentRoom.priceSAR} SAR <span className="text-stone-400 font-normal">/ {t('night', 'ليلة')}</span>
                  </p>
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    {t('Check-In Date', 'تاريخ الوصول')}
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={formatDateString(new Date())}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    {t('Check-Out Date', 'تاريخ المغادرة')}
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    {t('Guests', 'عدد الضيوف')}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value={1}>1 {t('Adult', 'شخص واحد')}</option>
                    <option value={2}>2 {t('Adults', 'شخصان')}</option>
                    <option value={3}>3 {t('Adults', 'ثلاثة أشخاص')}</option>
                    <option value={4}>4 {t('Adults / Family', 'عائلة (أربعة أشخاص)')}</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold uppercase text-stone-400">
                  {t('Guest Personal Details', 'بيانات النزيل الشخصية')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">{t('Full Name', 'الاسم الكامل')}</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. Abdullah Al-Sudairy"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">{t('Phone Number', 'رقم الهاتف')}</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        placeholder="+9665..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none font-mono dir-ltr"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">{t('Email Address', 'البريد الإلكتروني')}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">
                    {t('Special Requests (Optional)', 'طلبات خاصة (اختياري)')}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t('e.g. High floor room, late arrival, extra towels', 'مثال: غرفة في طابق علوي، وصول متأخر')}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex justify-between text-xs text-stone-400">
                  <span>
                    {currentRoom.priceSAR} SAR × {nights} {t('night(s)', 'ليلة/ليال')}
                  </span>
                  <span>{nights * currentRoom.priceSAR} SAR</span>
                </div>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>{t('Taxes & Municipal Service Fee', 'الضرائب والرسوم')}</span>
                  <span className="text-emerald-400">{t('Included', 'مشمولة')}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between items-center">
                  <span className="font-semibold text-stone-200 text-sm">
                    {t('Total Estimated Stay Price:', 'إجمالي المبلغ المتوقع:')}
                  </span>
                  <span className="font-bold text-xl text-amber-400">
                    {totalSAR} SAR
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-300 shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>{t('Confirm Instant Reservation', 'تأكيد الحجز الفوري')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          ) : (
            /* Confirmation Voucher View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {t('Reservation Confirmed', 'تم تأكيد الحجز بنجاح')}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                  {t('Welcome to Golden Garden', 'أهلاً بك في غولدن غاردن')}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {t('A confirmation copy has been generated for your record.', 'تم إنشاء نسخة التأكيد لحفظها لديك.')}
                </p>
              </div>

              {/* Voucher Box */}
              <div className="bg-stone-950 border border-amber-500/40 rounded-xl p-5 text-left text-xs space-y-3 font-mono">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">{t('Reference Code:', 'رمز المرجع:')}</span>
                  <span className="text-amber-400 font-bold text-sm">{confirmation.bookingRef}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-stone-300">
                  <div>
                    <span className="text-stone-500 block text-[10px]">{t('GUEST NAME', 'اسم النزيل')}</span>
                    <span className="font-semibold">{confirmation.fullName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">{t('PHONE', 'الهاتف')}</span>
                    <span>{confirmation.phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">{t('CHECK-IN', 'تاريخ الوصول')}</span>
                    <span>{confirmation.checkIn} ({HOTEL_INFO.checkInTime})</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">{t('CHECK-OUT', 'تاريخ المغادرة')}</span>
                    <span>{confirmation.checkOut} ({HOTEL_INFO.checkOutTime})</span>
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-2 flex justify-between items-center text-stone-200">
                  <span>{t('ROOM TYPE', 'نوع الغرفة')}</span>
                  <span className="font-semibold text-amber-300">{confirmation.roomType}</span>
                </div>

                <div className="border-t border-stone-800 pt-2 flex justify-between items-center text-sm">
                  <span className="text-stone-400">{t('TOTAL PAYABLE (SAR)', 'المبلغ الإجمالي')}</span>
                  <span className="font-bold text-emerald-400">{confirmation.totalSAR} SAR</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 border border-stone-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t('Print Confirmation Voucher', 'طباعة قسيمة التأكيد')}</span>
                </button>

                <button
                  onClick={resetModal}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 text-xs font-bold uppercase"
                >
                  {t('Done / Return', 'إغلاق ومتابعة')}
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
