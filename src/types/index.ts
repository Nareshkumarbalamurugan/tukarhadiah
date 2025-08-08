export interface Prize {
  id?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  quantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  id?: string;
  couponCode: string;
  prizeId: string;
  prizeName: string;
  isRedeemed: boolean;
  redeemedAt?: Date;
  winnerName?: string;
  winnerWhatsApp?: string;
  winnerAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromoSettings {
  id?: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  title: string;
  description?: string;
  updatedAt: Date;
}

export interface StoreInfo {
  id?: string;
  name: string;
  address: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  updatedAt: Date;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin' | 'super_admin';
  createdAt: Date;
}

export interface CouponCheckResult {
  success: boolean;
  coupon?: Coupon;
  message: string;
}
