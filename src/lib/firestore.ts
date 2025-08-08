import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Prize, Coupon, PromoSettings, StoreInfo, CouponCheckResult } from '@/types';

// Prize Management
export const addPrize = async (prize: Omit<Prize, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'prizes'), {
      ...prize,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding prize:', error);
    return { success: false, error };
  }
};

export const getPrizes = async () => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'prizes'), orderBy('createdAt', 'desc')));
    const prizes: Prize[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      prizes.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Prize);
    });
    return { success: true, data: prizes };
  } catch (error) {
    console.error('Error getting prizes:', error);
    return { success: false, error };
  }
};

export const updatePrize = async (id: string, updates: Partial<Prize>) => {
  try {
    await updateDoc(doc(db, 'prizes', id), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating prize:', error);
    return { success: false, error };
  }
};

export const deletePrize = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'prizes', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting prize:', error);
    return { success: false, error };
  }
};

// Coupon Management
export const addCoupons = async (coupons: Omit<Coupon, 'id' | 'createdAt' | 'updatedAt'>[]) => {
  try {
    const batch = coupons.map(coupon => 
      addDoc(collection(db, 'coupons'), {
        ...coupon,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    );
    await Promise.all(batch);
    return { success: true };
  } catch (error) {
    console.error('Error adding coupons:', error);
    return { success: false, error };
  }
};

export const checkCoupon = async (couponCode: string): Promise<CouponCheckResult> => {
  try {
    const q = query(collection(db, 'coupons'), where('couponCode', '==', couponCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return {
        success: false,
        message: 'Sorry, this coupon code was not found. Please check the code and try again.'
      };
    }

    const couponDoc = querySnapshot.docs[0];
    const couponData = couponDoc.data() as Coupon;
    const coupon = {
      id: couponDoc.id,
      ...couponData,
      createdAt: couponData.createdAt instanceof Timestamp ? couponData.createdAt.toDate() : new Date(),
      updatedAt: couponData.updatedAt instanceof Timestamp ? couponData.updatedAt.toDate() : new Date(),
      redeemedAt: couponData.redeemedAt instanceof Timestamp ? couponData.redeemedAt.toDate() : undefined,
    };

    if (coupon.isRedeemed) {
      return {
        success: false,
        coupon,
        message: 'This coupon has already been redeemed.'
      };
    }

    return {
      success: true,
      coupon,
      message: `Congratulations! You won: ${coupon.prizeName}`
    };
  } catch (error) {
    console.error('Error checking coupon:', error);
    return {
      success: false,
      message: 'An error occurred while checking your coupon. Please try again.'
    };
  }
};

export const redeemCoupon = async (couponId: string, winnerInfo: { name: string; whatsapp: string; address?: string }) => {
  try {
    await updateDoc(doc(db, 'coupons', couponId), {
      isRedeemed: true,
      redeemedAt: serverTimestamp(),
      winnerName: winnerInfo.name,
      winnerWhatsApp: winnerInfo.whatsapp,
      winnerAddress: winnerInfo.address || '',
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error redeeming coupon:', error);
    return { success: false, error };
  }
};

export const getCoupons = async () => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'coupons'), orderBy('createdAt', 'desc')));
    const coupons: Coupon[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      coupons.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        redeemedAt: data.redeemedAt?.toDate() || undefined,
      } as Coupon);
    });
    return { success: true, data: coupons };
  } catch (error) {
    console.error('Error getting coupons:', error);
    return { success: false, error };
  }
};

export const getWinners = async () => {
  try {
    const q = query(collection(db, 'coupons'), where('isRedeemed', '==', true), orderBy('redeemedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const winners: Coupon[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      winners.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        redeemedAt: data.redeemedAt?.toDate() || undefined,
      } as Coupon);
    });
    return { success: true, data: winners };
  } catch (error) {
    console.error('Error getting winners:', error);
    return { success: false, error };
  }
};

// Promo Settings
export const getPromoSettings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'promoSettings'));
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        success: true,
        data: {
          id: doc.id,
          ...data,
          startDate: data.startDate?.toDate() || new Date(),
          endDate: data.endDate?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as PromoSettings
      };
    }
    return { success: false, message: 'No promo settings found' };
  } catch (error) {
    console.error('Error getting promo settings:', error);
    return { success: false, error };
  }
};

export const updatePromoSettings = async (settings: Omit<PromoSettings, 'id' | 'updatedAt'>) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'promoSettings'));
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await updateDoc(doc(db, 'promoSettings', docId), {
        ...settings,
        updatedAt: serverTimestamp()
      });
    } else {
      await addDoc(collection(db, 'promoSettings'), {
        ...settings,
        updatedAt: serverTimestamp()
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating promo settings:', error);
    return { success: false, error };
  }
};

// Store Info
export const getStoreInfo = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'storeInfo'));
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        success: true,
        data: {
          id: doc.id,
          ...data,
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as StoreInfo
      };
    }
    return { success: false, message: 'No store info found' };
  } catch (error) {
    console.error('Error getting store info:', error);
    return { success: false, error };
  }
};

export const updateStoreInfo = async (storeInfo: Omit<StoreInfo, 'id' | 'updatedAt'>) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'storeInfo'));
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await updateDoc(doc(db, 'storeInfo', docId), {
        ...storeInfo,
        updatedAt: serverTimestamp()
      });
    } else {
      await addDoc(collection(db, 'storeInfo'), {
        ...storeInfo,
        updatedAt: serverTimestamp()
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating store info:', error);
    return { success: false, error };
  }
};


