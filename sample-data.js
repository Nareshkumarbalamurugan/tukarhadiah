// Sample data initialization script
// Run this in the browser console after logging into admin dashboard

// Sample prizes
const samplePrizes = [
  {
    name: "iPhone 15 Pro",
    description: "iPhone 15 Pro 128GB - Warna Random",
    quantity: 5,
    isActive: true
  },
  {
    name: "Samsung Galaxy S24",
    description: "Samsung Galaxy S24 256GB - Warna Random", 
    quantity: 3,
    isActive: true
  },
  {
    name: "Voucher Shopee 500K",
    description: "Voucher belanja Shopee senilai Rp 500.000",
    quantity: 20,
    isActive: true
  },
  {
    name: "AirPods Pro",
    description: "Apple AirPods Pro Generasi 2",
    quantity: 10,
    isActive: true
  },
  {
    name: "Tumbler Premium",
    description: "Tumbler stainless steel 500ml berkualitas tinggi",
    quantity: 50,
    isActive: true
  }
];

// Sample coupons
const sampleCoupons = [
  {
    couponCode: "IPHONE001",
    prizeId: "prize_1",
    prizeName: "iPhone 15 Pro",
    isRedeemed: false
  },
  {
    couponCode: "IPHONE002", 
    prizeId: "prize_1",
    prizeName: "iPhone 15 Pro",
    isRedeemed: true,
    winnerName: "Budi Santoso",
    winnerWhatsApp: "+628123456789",
    winnerAddress: "Jl. Sudirman No. 123, Jakarta",
    redeemedAt: new Date()
  },
  {
    couponCode: "SAMSUNG001",
    prizeId: "prize_2", 
    prizeName: "Samsung Galaxy S24",
    isRedeemed: false
  },
  {
    couponCode: "VOUCHER001",
    prizeId: "prize_3",
    prizeName: "Voucher Shopee 500K", 
    isRedeemed: false
  },
  {
    couponCode: "VOUCHER002",
    prizeId: "prize_3",
    prizeName: "Voucher Shopee 500K",
    isRedeemed: true,
    winnerName: "Siti Aminah",
    winnerWhatsApp: "+628987654321", 
    winnerAddress: "Jl. Gatot Subroto No. 456, Bandung",
    redeemedAt: new Date()
  },
  {
    couponCode: "AIRPODS001",
    prizeId: "prize_4",
    prizeName: "AirPods Pro",
    isRedeemed: false
  },
  {
    couponCode: "TUMBLER001",
    prizeId: "prize_5", 
    prizeName: "Tumbler Premium",
    isRedeemed: false
  },
  {
    couponCode: "TUMBLER002",
    prizeId: "prize_5",
    prizeName: "Tumbler Premium", 
    isRedeemed: false
  }
];

// Store information
const storeInfo = {
  name: "TukarHadiah Store",
  address: "Jl. Merdeka No. 100, Jakarta Pusat 10110",
  phone: "+6221-123-4567",
  whatsapp: "+628123456789",
  email: "info@tukarhadiah.com"
};

// Promo settings
const promoSettings = {
  title: "Promo Tahun Baru 2025",
  description: "Dapatkan kesempatan memenangkan hadiah menarik dengan berbelanja di toko kami",
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31'), 
  isActive: true
};

console.log("Sample data ready to be added to Firebase!");
console.log("Use the admin dashboard to add this data manually.");
console.log("Sample coupon codes to test:");
console.log("- IPHONE001 (available)");
console.log("- IPHONE002 (already redeemed)"); 
console.log("- SAMSUNG001 (available)");
console.log("- VOUCHER001 (available)");
console.log("- AIRPODS001 (available)");
console.log("- TUMBLER001 (available)");
