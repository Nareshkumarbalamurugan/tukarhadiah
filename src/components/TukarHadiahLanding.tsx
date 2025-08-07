import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Check, AlertCircle, Gift, Trophy, Star, Phone } from 'lucide-react';

interface Prize {
  id: string;
  name: string;
  description: string;
  points: number;
  image?: string;
  available: boolean;
}

interface UserData {
  couponNumber: string;
  fullName: string;
  whatsappNumber: string;
  points?: number;
}

const TukarHadiahLanding = () => {
  const [formData, setFormData] = useState<UserData>({
    couponNumber: '',
    fullName: '',
    whatsappNumber: ''
  });
  const [result, setResult] = useState<'success' | 'failure' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);

  // Sample prizes data
  const prizes: Prize[] = [
    { id: '1', name: 'Tumbler Premium', description: 'Tumbler stainless steel 500ml berkualitas tinggi', points: 100, available: true },
    { id: '2', name: 'T-Shirt Custom', description: 'T-shirt dengan design eksklusif dari TukarHadiah', points: 150, available: true },
    { id: '3', name: 'Voucher Makan', description: 'Voucher makan senilai Rp 50.000 di resto partner', points: 75, available: true },
    { id: '4', name: 'Bluetooth Speaker', description: 'Speaker portable dengan kualitas suara jernih', points: 250, available: false },
    { id: '5', name: 'Power Bank', description: 'Power bank 10000mAh fast charging', points: 200, available: true },
    { id: '6', name: 'Merchandise Set', description: 'Paket lengkap merchandise eksklusif', points: 120, available: true },
  ];

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheck = () => {
    if (!formData.couponNumber.trim() || !formData.fullName.trim() || !formData.whatsappNumber.trim()) {
      return;
    }
    
    // Simulate coupon validation - in real app this would be API call
    const validCoupons = ['CP1234', 'CP5678', 'CP9999'];
    const isValid = validCoupons.includes(formData.couponNumber.trim().toUpperCase());
    
    if (isValid) {
      // Simulate random points between 50-300
      const points = Math.floor(Math.random() * 251) + 50;
      setUserPoints(points);
      setResult('success');
    } else {
      setResult('failure');
    }
    
    setShowResult(true);
  };

  const resetForm = () => {
    setFormData({
      couponNumber: '',
      fullName: '',
      whatsappNumber: ''
    });
    setResult(null);
    setShowResult(false);
    setUserPoints(0);
  };

  const handleRedeemPrize = (prize: Prize) => {
    if (userPoints >= prize.points && prize.available) {
      // In real app, this would make API call to redeem
      alert(`Berhasil menukar ${prize.name}! Poin Anda berkurang ${prize.points}.`);
      setUserPoints(prev => prev - prize.points);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4 pt-6">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <Gift className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">TukarHadiah</h1>
            <p className="text-sm text-muted-foreground">Platform tukar poin dengan hadiah menarik</p>
          </div>
          
          {/* Banner Section */}
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="w-full h-40 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 flex items-center justify-center relative">
                <div className="text-center space-y-2">
                  <Trophy className="w-12 h-12 mx-auto text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Tukar Poin Sekarang!</h2>
                  <p className="text-sm text-muted-foreground">Dapatkan hadiah menarik dengan poin Anda</p>
                </div>
                <div className="absolute top-2 right-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        {!showResult && (
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-lg font-semibold text-foreground">
                  Masukkan Data Anda
                </h2>
                <p className="text-sm text-muted-foreground">
                  Isi form di bawah untuk mengecek poin Anda
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full"
                  />
                  <span className="text-sm text-destructive">*</span>
                </div>
                
                <div>
                  <Input
                    type="text"
                    placeholder="Nomor WhatsApp"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    className="w-full"
                  />
                  <span className="text-sm text-destructive">*</span>
                </div>
                
                <div>
                  <Input
                    type="text"
                    placeholder="Nomor ID Kupon"
                    value={formData.couponNumber}
                    onChange={(e) => handleInputChange('couponNumber', e.target.value)}
                    className="w-full"
                  />
                  <span className="text-sm text-destructive">*</span>
                </div>
              </div>

              <Button 
                onClick={handleCheck}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-all duration-300 shadow-lg"
                disabled={!formData.couponNumber.trim() || !formData.fullName.trim() || !formData.whatsappNumber.trim()}
              >
                CEK POIN SAYA
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Result Section */}
        {showResult && (
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardContent className="p-6 text-center space-y-4">
              {result === 'success' ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-success/10 rounded-full mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Selamat, {formData.fullName}! 🎉
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                      {userPoints} Poin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Kupon Anda valid! Silakan pilih hadiah di bawah ini.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-warning/10 rounded-full mx-auto flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-warning" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Maaf, kupon tidak valid
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Nomor kupon yang Anda masukkan tidak ditemukan dalam sistem kami.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pastikan nomor kupon sudah benar atau hubungi admin.
                    </p>
                  </div>
                </div>
              )}
              
              <Button
                onClick={resetForm}
                variant="outline"
                className="mt-4"
              >
                Cek Kupon Lain
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Prizes Catalog - Only show when user has points */}
        {showResult && result === 'success' && userPoints > 0 && (
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Katalog Hadiah
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pilih hadiah yang ingin Anda tukar
                </p>
              </div>

              <div className="space-y-3">
                {prizes.map((prize) => (
                  <div key={prize.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{prize.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{prize.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={prize.available ? 'default' : 'secondary'}>
                            {prize.points} Poin
                          </Badge>
                          {!prize.available && (
                            <Badge variant="outline">Stok Habis</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      className="w-full"
                      disabled={!prize.available || userPoints < prize.points}
                      onClick={() => handleRedeemPrize(prize)}
                      variant={userPoints >= prize.points && prize.available ? 'default' : 'outline'}
                    >
                      {!prize.available ? 'Stok Habis' : 
                       userPoints < prize.points ? `Perlu ${prize.points - userPoints} poin lagi` : 
                       'Tukar Sekarang'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions Section */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-center">
              Cara Klaim Hadiah 🎁
            </h3>
            
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">Langkah-langkah:</p>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Screenshot halaman konfirmasi penukaran</li>
                  <li>Datang ke outlet TukarHadiah terdekat</li>
                  <li>Tunjukkan kupon fisik asli dan screenshot</li>
                  <li>Verifikasi identitas dengan KTP</li>
                  <li>Hadiah bisa diambil langsung</li>
                  <li>Bersedia didokumentasi oleh tim kami</li>
                </ol>
              </div>
              
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary font-medium">⚠️ Syarat & Ketentuan:</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Berlaku hingga 31 Desember 2025</li>
                  <li>• Satu kupon hanya untuk satu orang</li>
                  <li>• Kupon palsu/duplikat tidak berlaku</li>
                  <li>• Tidak dapat ditukar dengan uang tunai</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="space-y-3 pb-6">
          <Button className="w-full bg-success hover:bg-success/90 text-success-foreground font-semibold py-3 rounded-lg flex items-center gap-2 shadow-lg">
            <MessageCircle className="w-5 h-5" />
            Hubungi Admin WhatsApp
          </Button>
          
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Lihat Lokasi Outlet
          </Button>
          
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 py-2">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              📷
            </div>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              📘
            </div>
            <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              ▶️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TukarHadiahLanding;
