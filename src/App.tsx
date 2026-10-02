import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { GalleryServicesPage } from './pages/GalleryServicesPage';
import { ContactBookingPage } from './pages/ContactBookingPage';
import { BookingModal } from './components/BookingModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [preSelectedRoomId, setPreSelectedRoomId] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleOpenBooking = (roomId?: string) => {
    setPreSelectedRoomId(roomId);
    setIsBookingModalOpen(true);
  };

  const showSuccessToast = (message: string) => {
    setToast({
      id: Date.now().toString(),
      type: 'success',
      message,
    });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans-body selection:bg-orange-500 selection:text-stone-950">
        
        {/* Navigation Header */}
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Page Routing */}
        <main className="flex-1">
          {activePage === 'home' && (
            <HomePage
              setActivePage={setActivePage}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {activePage === 'rooms' && (
            <RoomsPage onOpenBooking={handleOpenBooking} />
          )}

          {activePage === 'gallery-services' && (
            <GalleryServicesPage onOpenBooking={() => handleOpenBooking()} />
          )}

          {activePage === 'contact-booking' && (
            <ContactBookingPage
              onOpenBooking={() => handleOpenBooking()}
              onSuccessToast={showSuccessToast}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          setActivePage={setActivePage}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Global Reservation Engine Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          preSelectedRoomId={preSelectedRoomId}
          onSuccess={showSuccessToast}
        />

        {/* Global Toast Notification */}
        <Toast toast={toast} onClose={() => setToast(null)} />

      </div>
    </LanguageProvider>
  );
}
