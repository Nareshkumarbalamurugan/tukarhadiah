// Sample data setup script for TukarHadiah
// This would be used to populate initial data in Firebase

import { 
  addPrize, 
  addCoupons, 
  updateStoreInfo, 
  updatePromoSettings 
} from './lib/firestore';

// Sample prizes
const samplePrizes = [
  {
    name: "Tumbler Premium",
    description: "Tumbler stainless steel 500ml berkualitas tinggi dengan design eksklusif",
    quantity: 50,
    isActive: true
  },
  {
    name: "T-Shirt Custom",
    description: "T-shirt cotton combed 30s dengan sablon berkualitas tinggi",
    quantity: 100,
    isActive: true
  },
  {
    name: "Voucher Makan Rp 50.000",
    description: "Voucher makan di restaurant partner senilai Rp 50.000",
    quantity: 75,
    isActive: true
  },
  {
    name: "Power Bank 10000mAh",
    description: "Power bank fast charging 10000mAh dengan output USB dan Type-C",
    quantity: 30,
    isActive: true
  },
  {
    name: "Bluetooth Speaker",
    description: "Speaker bluetooth portable dengan bass yang jernih",
    quantity: 20,
    isActive: false // Out of stock
  }
];

// Sample store info
const sampleStoreInfo = {
  name: "TukarHadiah Store",
  address: "Jl. Raya No. 123, Jakarta Pusat, DKI Jakarta 10270",
  phone: "+62-21-1234567",
  whatsapp: "+62-81234567890",
  email: "info@tukarhadiah.com"
};

// Sample promo settings
const samplePromoSettings = {
  title: "Grand Opening Promo 2025",
  description: "Dapatkan hadiah menarik dengan berbelanja di TukarHadiah! Periode terbatas hingga akhir tahun.",
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31'),
  isActive: true
};

// Function to setup sample data
export const setupSampleData = async () => {
  try {
    console.log('Setting up sample data...');
    
    // Add sample prizes
    for (const prize of samplePrizes) {
      const result = await addPrize(prize);
      if (result.success) {
        console.log(`Added prize: ${prize.name}`);
      }
    }
    
    // Generate sample coupons for each prize
    const sampleCoupons = [
      {
        couponCode: 'CP001WIN',
        prizeId: 'prize_1',
        prizeName: 'Tumbler Premium',
        isRedeemed: false
      },
      {
        couponCode: 'CP002WIN',
        prizeId: 'prize_2',
        prizeName: 'T-Shirt Custom',
        isRedeemed: false
      },
      {
        couponCode: 'CP003WIN',
        prizeId: 'prize_3',
        prizeName: 'Voucher Makan Rp 50.000',
        isRedeemed: false
      },
      {
        couponCode: 'CP004USED',
        prizeId: 'prize_1',
        prizeName: 'Tumbler Premium',
        isRedeemed: true,
        winnerName: 'John Doe',
        winnerWhatsApp: '+628123456789',
        winnerAddress: 'Jakarta Selatan'
      }
    ];
    
    const couponResult = await addCoupons(sampleCoupons);
    if (couponResult.success) {
      console.log('Added sample coupons');
    }
    
    // Update store info
    const storeResult = await updateStoreInfo(sampleStoreInfo);
    if (storeResult.success) {
      console.log('Updated store information');
    }
    
    // Update promo settings
    const promoResult = await updatePromoSettings(samplePromoSettings);
    if (promoResult.success) {
      console.log('Updated promo settings');
    }
    
    console.log('Sample data setup completed!');
    
    console.log('\n=== DEMO COUPON CODES ===');
    console.log('Valid coupons to test:');
    console.log('- CP001WIN (Tumbler Premium)');
    console.log('- CP002WIN (T-Shirt Custom)');
    console.log('- CP003WIN (Voucher Makan)');
    console.log('- CP004USED (Already redeemed)');
    console.log('\nAdmin login:');
    console.log('- Username: admin');
    console.log('- Password: admin123');
    
  } catch (error) {
    console.error('Error setting up sample data:', error);
  }
};

// Uncomment the line below to run the setup
// setupSampleData();
