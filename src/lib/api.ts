// Mock API service for TukarHadiah system
// In a real application, these would be actual API calls

export interface User {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
  totalPoints: number;
  redeemedPrizes: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  points: number;
  stock: number;
  image?: string;
  active: boolean;
  category: string;
}

export interface Coupon {
  id: string;
  code: string;
  points: number;
  isUsed: boolean;
  userId?: string;
  usedAt?: string;
  expiresAt: string;
}

export interface RedemptionRequest {
  id: string;
  userId: string;
  userName: string;
  userWhatsapp: string;
  prizeId: string;
  prizeName: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  processedDate?: string;
  notes?: string;
}

export interface CompanyProfile {
  id: string;
  companyName: string;
  logo?: string;
  banner?: string;
  description: string;
  contactInfo: {
    whatsapp: string;
    email: string;
    address: string;
    website?: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    whatsapp: '08123456789',
    email: 'john@example.com',
    totalPoints: 250,
    redeemedPrizes: 2,
    status: 'active',
    createdAt: '2025-01-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    whatsapp: '08234567890',
    email: 'jane@example.com',
    totalPoints: 180,
    redeemedPrizes: 1,
    status: 'active',
    createdAt: '2025-01-02'
  }
];

const mockPrizes: Prize[] = [
  {
    id: '1',
    name: 'Tumbler Premium',
    description: 'Tumbler stainless steel 500ml berkualitas tinggi',
    points: 100,
    stock: 50,
    active: true,
    category: 'Merchandise'
  },
  {
    id: '2',
    name: 'T-Shirt Custom',
    description: 'T-shirt dengan design eksklusif',
    points: 150,
    stock: 30,
    active: true,
    category: 'Apparel'
  },
  {
    id: '3',
    name: 'Voucher Makan',
    description: 'Voucher makan senilai Rp 50.000',
    points: 75,
    stock: 100,
    active: true,
    category: 'Voucher'
  }
];

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'CP1234',
    points: 150,
    isUsed: false,
    expiresAt: '2025-12-31'
  },
  {
    id: '2',
    code: 'CP5678',
    points: 200,
    isUsed: false,
    expiresAt: '2025-12-31'
  },
  {
    id: '3',
    code: 'CP9999',
    points: 300,
    isUsed: false,
    expiresAt: '2025-12-31'
  }
];

const mockRedemptions: RedemptionRequest[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userWhatsapp: '08123456789',
    prizeId: '1',
    prizeName: 'Tumbler Premium',
    points: 100,
    status: 'pending',
    requestDate: '2025-01-15'
  }
];

const mockCompanyProfile: CompanyProfile = {
  id: '1',
  companyName: 'TukarHadiah Co.',
  description: 'Platform tukar hadiah terpercaya dengan berbagai hadiah menarik',
  contactInfo: {
    whatsapp: '08123456789',
    email: 'admin@tukarhadiah.com',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat, 10220'
  },
  socialMedia: {
    facebook: 'https://facebook.com/tukarhadiah',
    instagram: 'https://instagram.com/tukarhadiah',
    youtube: 'https://youtube.com/tukarhadiah'
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export class TukarHadiahAPI {
  // Authentication
  static async login(username: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
    await delay(1000);
    
    if (username === 'admin' && password === 'admin123') {
      return {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
    
    return {
      success: false,
      message: 'Username atau password salah'
    };
  }

  // Coupon validation
  static async validateCoupon(code: string): Promise<{ valid: boolean; points?: number; message?: string }> {
    await delay(1500);
    
    const coupon = mockCoupons.find(c => c.code.toLowerCase() === code.toLowerCase());
    
    if (!coupon) {
      return {
        valid: false,
        message: 'Kupon tidak ditemukan'
      };
    }
    
    if (coupon.isUsed) {
      return {
        valid: false,
        message: 'Kupon sudah digunakan'
      };
    }
    
    if (new Date() > new Date(coupon.expiresAt)) {
      return {
        valid: false,
        message: 'Kupon sudah expired'
      };
    }
    
    return {
      valid: true,
      points: coupon.points
    };
  }

  // User management
  static async createUser(userData: Partial<User>): Promise<User> {
    await delay(800);
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: userData.name || '',
      whatsapp: userData.whatsapp || '',
      email: userData.email,
      totalPoints: userData.totalPoints || 0,
      redeemedPrizes: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    mockUsers.push(newUser);
    return newUser;
  }

  static async getUsers(): Promise<User[]> {
    await delay(500);
    return [...mockUsers];
  }

  static async updateUserPoints(userId: string, points: number): Promise<User | null> {
    await delay(300);
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;
    
    mockUsers[userIndex].totalPoints += points;
    return mockUsers[userIndex];
  }

  // Prize management
  static async getPrizes(): Promise<Prize[]> {
    await delay(500);
    return [...mockPrizes];
  }

  static async createPrize(prizeData: Omit<Prize, 'id'>): Promise<Prize> {
    await delay(800);
    
    const newPrize: Prize = {
      id: String(mockPrizes.length + 1),
      ...prizeData
    };
    
    mockPrizes.push(newPrize);
    return newPrize;
  }

  static async updatePrize(id: string, prizeData: Partial<Prize>): Promise<Prize | null> {
    await delay(600);
    
    const prizeIndex = mockPrizes.findIndex(p => p.id === id);
    if (prizeIndex === -1) return null;
    
    mockPrizes[prizeIndex] = { ...mockPrizes[prizeIndex], ...prizeData };
    return mockPrizes[prizeIndex];
  }

  static async deletePrize(id: string): Promise<boolean> {
    await delay(400);
    
    const prizeIndex = mockPrizes.findIndex(p => p.id === id);
    if (prizeIndex === -1) return false;
    
    mockPrizes.splice(prizeIndex, 1);
    return true;
  }

  // Redemption management
  static async createRedemption(redemptionData: Omit<RedemptionRequest, 'id' | 'requestDate' | 'status'>): Promise<RedemptionRequest> {
    await delay(1000);
    
    const newRedemption: RedemptionRequest = {
      id: String(mockRedemptions.length + 1),
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      ...redemptionData
    };
    
    mockRedemptions.push(newRedemption);
    return newRedemption;
  }

  static async getRedemptions(): Promise<RedemptionRequest[]> {
    await delay(500);
    return [...mockRedemptions];
  }

  static async updateRedemptionStatus(
    id: string, 
    status: 'approved' | 'rejected', 
    notes?: string
  ): Promise<RedemptionRequest | null> {
    await delay(600);
    
    const redemptionIndex = mockRedemptions.findIndex(r => r.id === id);
    if (redemptionIndex === -1) return null;
    
    mockRedemptions[redemptionIndex].status = status;
    mockRedemptions[redemptionIndex].processedDate = new Date().toISOString().split('T')[0];
    if (notes) mockRedemptions[redemptionIndex].notes = notes;
    
    return mockRedemptions[redemptionIndex];
  }

  // Company profile
  static async getCompanyProfile(): Promise<CompanyProfile> {
    await delay(300);
    return { ...mockCompanyProfile };
  }

  static async updateCompanyProfile(profileData: Partial<CompanyProfile>): Promise<CompanyProfile> {
    await delay(800);
    
    Object.assign(mockCompanyProfile, profileData);
    return { ...mockCompanyProfile };
  }

  // Statistics
  static async getStatistics(): Promise<{
    totalUsers: number;
    totalPrizes: number;
    totalRedemptions: number;
    pendingRedemptions: number;
    totalPointsDistributed: number;
  }> {
    await delay(400);
    
    return {
      totalUsers: mockUsers.length,
      totalPrizes: mockPrizes.length,
      totalRedemptions: mockRedemptions.length,
      pendingRedemptions: mockRedemptions.filter(r => r.status === 'pending').length,
      totalPointsDistributed: mockUsers.reduce((sum, user) => sum + user.totalPoints, 0)
    };
  }
}
