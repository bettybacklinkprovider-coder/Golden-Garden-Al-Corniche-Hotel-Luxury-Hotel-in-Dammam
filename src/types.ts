export type Language = 'en' | 'ar';

export interface Room {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'suite' | 'sea-view' | 'executive' | 'family' | 'standard';
  priceSAR: number;
  capacity: string;
  sizeSqm: number;
  bedTypeEn: string;
  bedTypeAr: string;
  viewEn: string;
  viewAr: string;
  image: string;
  additionalImages?: string[];
  descriptionEn: string;
  descriptionAr: string;
  amenities: string[];
  isFeatured?: boolean;
}

export interface Facility {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'exterior' | 'rooms' | 'lobby' | 'facilities' | 'dining';
  image: string;
}

export interface BookingData {
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  totalSAR: number;
  bookingRef?: string;
}

export interface GuestReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  commentEn: string;
  commentAr: string;
  date: string;
}
