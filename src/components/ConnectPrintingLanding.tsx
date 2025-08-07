import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Check, AlertCircle } from 'lucide-react';

const ConnectPrintingLanding = () => {
  const [formData, setFormData] = useState({
    couponNumber: '',
    fullName: '',
    whatsappNumber: ''
  });
  const [result, setResult] = useState<'success' | 'failure' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheck = () => {
    if (!formData.couponNumber.trim()) {
      return;
    }
    
    // Check if coupon number matches winning code
    const isWinner = formData.couponNumber.trim().toUpperCase() === 'CP1234';
    setResult(isWinner ? 'success' : 'failure');
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
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          {/* Logo Placeholder */}
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center border-2 border-dashed border-primary/30">
            <span className="text-primary font-bold text-sm">Logo</span>
          </div>
          
          {/* Banner Section */}
          <Card>
            <CardContent className="p-6">
              <div className="w-full h-32 bg-primary/5 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20">
                <span className="text-primary font-medium">Banner</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-center text-foreground">
              Tulis Nomor kuponmu disini *
            </h2>
            
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full bg-input border-input-border"
                />
                <span className="text-sm text-destructive">*</span>
              </div>
              
              <div>
                <Input
                  type="text"
                  placeholder="Nomor Whatsapp"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                  className="w-full bg-input border-input-border"
                />
                <span className="text-sm text-destructive">*</span>
              </div>
              
              <div>
                <Input
                  type="text"
                  placeholder="Nomor ID kupon"
                  value={formData.couponNumber}
                  onChange={(e) => handleInputChange('couponNumber', e.target.value)}
                  className="w-full bg-input border-input-border"
                />
                <span className="text-sm text-destructive">*</span>
              </div>
            </div>

            <Button 
              onClick={handleCheck}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 rounded-lg transition-colors"
              disabled={!formData.couponNumber.trim()}
            >
              CEK
            </Button>
          </CardContent>
        </Card>

        {/* Result Section */}
        {showResult && (
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              {result === 'success' ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-success/10 rounded-full mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      Nomor ID yg terinput
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Yeyy...! Selamat ya kamu dapat hadiah dari
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ConnectPrinting, segera tukarkan :)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-warning/10 rounded-full mx-auto flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-warning" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      Nomor ID yg tidak terinput
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Hmm.. maaf yaa...
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nomor ID Anda belum beruntung
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      tapi mimin doakan, semoga
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rejekimu lancar ya..
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

        {/* Banner Image Section - Only show on success */}
        {showResult && result === 'success' && (
          <Card>
            <CardContent className="p-4">
              <div className="w-full h-40 bg-primary/5 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20">
                <span className="text-primary font-medium">Banner</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions Section */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-center">
              Cara Klaim Hadiahmu*
            </h3>
            
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Screenshot layar ini</li>
              <li>Datang ke outlet Connect Printing</li>
              <li>Tunjukkan Kupon fisik asli</li>
              <li>Hadiah bisa diambil langsung</li>
              <li>Bersedia di dokumentasi oleh CS Connect Printing</li>
              <li>Batas waktu klaim mulai 25 Agustus 25' - 7 September 25' 09.00 - 16.30</li>
              <li>Kupon palsu/duplikat tidak berlaku</li>
              <li>1 orang 1 hadiah</li>
            </ol>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="space-y-3">
          <Button className="w-full bg-success hover:bg-success/90 text-success-foreground font-semibold py-3 rounded-lg flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Hubungi Admin
          </Button>
          
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 py-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-muted-foreground rounded-sm" />
            </div>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-muted-foreground rounded-sm" />
            </div>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-muted-foreground rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPrintingLanding;