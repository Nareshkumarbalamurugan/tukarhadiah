import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle, Check, AlertCircle, Gift, Trophy, Star, Phone, MapPin, ExternalLink } from 'lucide-react';
import { checkCoupon } from '@/lib/firestore';
import { CouponCheckResult } from '@/types';
import { useToast } from '@/hooks/use-toast';

const TukarHadiahLanding = () => {
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CouponCheckResult | null>(null);
  const { toast } = useToast();

  const handleCheckCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const checkResult = await checkCoupon(couponCode.trim().toUpperCase());
      setResult(checkResult);
      
      if (checkResult.success) {
        toast({
          title: "🎉 Congratulations!",
          description: checkResult.message,
        });
      } else {
        toast({
          title: "Sorry",
          description: checkResult.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheckCoupon();
    }
  };

  const resetForm = () => {
    setCouponCode("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4 pt-6">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <Gift className="w-12 h-12 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">TukarHadiah</h1>
            <p className="text-sm text-gray-600">Masukkan kode kupon untuk cek hadiah Anda!</p>
          </div>
          
          {/* Banner Section */}
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="w-full h-40 bg-gradient-to-r from-orange-100 via-red-100 to-orange-100 flex items-center justify-center relative">
                <div className="text-center space-y-2">
                  <Trophy className="w-12 h-12 mx-auto text-orange-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Cek Kupon Sekarang!</h2>
                  <p className="text-sm text-gray-600">Masukkan kode kupon untuk melihat hadiah</p>
                </div>
                <div className="absolute top-2 right-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coupon Check Section */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
          <CardContent className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                <Gift className="h-5 w-5" />
                Cek Kupon Hadiah
              </h2>
              <p className="text-sm text-gray-600">
                Masukkan kode kupon Anda di bawah ini
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Masukkan kode kupon..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className="text-lg py-3 border-2 border-orange-300 focus:border-orange-500"
                  disabled={loading}
                />
                <Button 
                  onClick={handleCheckCoupon}
                  disabled={loading || !couponCode.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6"
                >
                  {loading ? "Checking..." : "Cek"}
                </Button>
              </div>

              {result && (
                <Alert className={result.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
                  <div className="flex items-center gap-2">
                    {result.success ? (
                      <Trophy className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <AlertDescription className={`text-base font-medium ${result.success ? "text-green-800" : "text-red-800"}`}>
                      {result.message}
                    </AlertDescription>
                  </div>
                  {result.success && result.coupon && (
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <h3 className="font-bold text-lg text-green-800 mb-2">Detail Hadiah:</h3>
                      <div className="space-y-2">
                        <p><span className="font-semibold">Kode Kupon:</span> {result.coupon.couponCode}</p>
                        <p><span className="font-semibold">Hadiah:</span> {result.coupon.prizeName}</p>
                        <Badge className="bg-green-500 text-white">Selamat! Anda Menang!</Badge>
                      </div>
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800">
                          <strong>Petunjuk:</strong> Silakan kunjungi toko kami untuk mengambil hadiah dengan membawa kode kupon ini.
                        </p>
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    size="sm"
                    className="mt-4"
                  >
                    Cek Kupon Lain
                  </Button>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Sections */}
        <div className="grid grid-cols-1 gap-4">
          {/* Store Location */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Lokasi Toko</h3>
                  <p className="text-sm text-gray-600">Kunjungi toko kami untuk mengambil hadiah</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product Catalog */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Katalog Produk</h3>
                  <p className="text-sm text-gray-600">Lihat semua produk dan hadiah tersedia</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Kontak Kami</h3>
                  <p className="text-sm text-gray-600">Hubungi kami untuk informasi lebih lanjut</p>
                </div>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions Section */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 text-center">
              Cara Menggunakan 🎁
            </h3>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold text-orange-600">1</span>
                </div>
                <h4 className="font-semibold text-sm">Masukkan Kode</h4>
                <p className="text-xs text-gray-600">Ketik kode kupon yang Anda dapatkan</p>
              </div>
              <div className="space-y-2">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold text-orange-600">2</span>
                </div>
                <h4 className="font-semibold text-sm">Cek Hadiah</h4>
                <p className="text-xs text-gray-600">Klik tombol "Cek" untuk melihat hadiah</p>
              </div>
              <div className="space-y-2">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                  <span className="text-lg font-bold text-orange-600">3</span>
                </div>
                <h4 className="font-semibold text-sm">Ambil Hadiah</h4>
                <p className="text-xs text-gray-600">Kunjungi toko untuk mengambil hadiah Anda</p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-800 font-medium">⚠️ Syarat & Ketentuan:</p>
              <ul className="text-xs text-orange-700 mt-2 space-y-1">
                <li>• Berlaku hingga 31 Desember 2025</li>
                <li>• Satu kupon hanya untuk satu orang</li>
                <li>• Kupon palsu/duplikat tidak berlaku</li>
                <li>• Tidak dapat ditukar dengan uang tunai</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="space-y-3 pb-20">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center gap-2 shadow-lg">
            <MessageCircle className="w-5 h-5" />
            Hubungi Admin WhatsApp
          </Button>
          
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Lihat Lokasi Outlet
          </Button>
          
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 py-4">
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

      {/* Fixed Bottom Emblem - Always Visible */}
      <div className="fixed bottom-6 right-6 z-50 animate-pulse">
        <div className="relative group">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-ping opacity-30"></div>
          
          {/* Main emblem */}
          <div className="relative bg-white rounded-full p-4 shadow-2xl border-3 border-gradient-to-br from-orange-300 to-red-400 hover:shadow-3xl transition-all duration-300 hover:scale-110">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <Gift className="h-8 w-8 text-white drop-shadow-lg" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                TukarHadiah
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TukarHadiahLanding;
