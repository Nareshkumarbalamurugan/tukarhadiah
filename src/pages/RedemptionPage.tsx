import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Gift, User, Phone, MapPin, Calendar } from "lucide-react";
import { checkCoupon, redeemCoupon } from '@/lib/firestore';
import { CouponCheckResult } from '@/types';
import { useToast } from '@/hooks/use-toast';

const RedemptionPage = () => {
  const { couponCode } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [checkingCoupon, setCheckingCoupon] = useState(true);
  const [couponResult, setCouponResult] = useState<CouponCheckResult | null>(null);
  const [redemptionForm, setRedemptionForm] = useState({
    name: '',
    whatsapp: '',
    address: ''
  });

  // Check if admin is authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }

    if (couponCode) {
      checkCouponValidity();
    }
  }, [couponCode, navigate]);

  const checkCouponValidity = async () => {
    if (!couponCode) return;
    
    setCheckingCoupon(true);
    try {
      const result = await checkCoupon(couponCode);
      setCouponResult(result);
      
      if (result.success && result.coupon) {
        // Pre-fill form if winner info exists
        if (result.coupon.winnerName) {
          setRedemptionForm({
            name: result.coupon.winnerName,
            whatsapp: result.coupon.winnerWhatsApp || '',
            address: result.coupon.winnerAddress || ''
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check coupon validity",
        variant: "destructive"
      });
    } finally {
      setCheckingCoupon(false);
    }
  };

  const handleRedemption = async () => {
    if (!couponResult?.coupon?.id || !redemptionForm.name.trim() || !redemptionForm.whatsapp.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await redeemCoupon(couponResult.coupon.id, {
        name: redemptionForm.name.trim(),
        whatsapp: redemptionForm.whatsapp.trim(),
        address: redemptionForm.address.trim()
      });

      if (result.success) {
        toast({
          title: "Success!",
          description: "Coupon has been successfully redeemed"
        });
        
        // Refresh coupon status
        await checkCouponValidity();
      } else {
        toast({
          title: "Error",
          description: "Failed to redeem coupon",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during redemption",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingCoupon) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking coupon validity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Coupon Redemption</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coupon Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Coupon Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {couponResult ? (
                <>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Coupon Code</Label>
                    <p className="text-lg font-mono font-bold text-gray-900">{couponCode}</p>
                  </div>
                  
                  {couponResult.success && couponResult.coupon ? (
                    <>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Prize</Label>
                        <p className="text-lg font-semibold text-gray-900">{couponResult.coupon.prizeName}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <div className="mt-1">
                          <Badge variant={couponResult.coupon.isRedeemed ? "default" : "secondary"}>
                            {couponResult.coupon.isRedeemed ? "Already Redeemed" : "Available for Redemption"}
                          </Badge>
                        </div>
                      </div>

                      {couponResult.coupon.isRedeemed && (
                        <>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Redeemed Date</Label>
                            <p className="text-gray-900">
                              {couponResult.coupon.redeemedAt 
                                ? new Date(couponResult.coupon.redeemedAt).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                : "Not available"
                              }
                            </p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Winner</Label>
                            <p className="text-gray-900">{couponResult.coupon.winnerName || "Not recorded"}</p>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <Alert variant="destructive">
                      <AlertDescription>
                        {couponResult.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              ) : (
                <Alert>
                  <AlertDescription>
                    No coupon information available
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Redemption Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Winner Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {couponResult?.success && couponResult.coupon && !couponResult.coupon.isRedeemed ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="winnerName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Winner Name *
                    </Label>
                    <Input
                      id="winnerName"
                      value={redemptionForm.name}
                      onChange={(e) => setRedemptionForm({...redemptionForm, name: e.target.value})}
                      placeholder="Enter winner's full name"
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="winnerWhatsapp" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      WhatsApp Number *
                    </Label>
                    <Input
                      id="winnerWhatsapp"
                      value={redemptionForm.whatsapp}
                      onChange={(e) => setRedemptionForm({...redemptionForm, whatsapp: e.target.value})}
                      placeholder="Enter WhatsApp number (e.g., +6281234567890)"
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="winnerAddress" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address (Optional)
                    </Label>
                    <Textarea
                      id="winnerAddress"
                      value={redemptionForm.address}
                      onChange={(e) => setRedemptionForm({...redemptionForm, address: e.target.value})}
                      placeholder="Enter winner's address"
                      disabled={loading}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <Alert>
                    <AlertDescription className="text-sm">
                      <strong>Important:</strong> Please verify the winner's identity before proceeding with redemption. 
                      Make sure the person claiming the prize matches the information provided.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleRedemption}
                    disabled={loading || !redemptionForm.name.trim() || !redemptionForm.whatsapp.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? "Processing..." : "Redeem Coupon"}
                  </Button>
                </div>
              ) : couponResult?.coupon?.isRedeemed ? (
                <div className="space-y-4">
                  <Alert>
                    <Calendar className="w-4 h-4" />
                    <AlertDescription>
                      This coupon has already been redeemed and cannot be processed again.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold text-gray-900">Previous Redemption Details:</h3>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Winner Name</Label>
                      <p className="text-gray-900">{couponResult.coupon.winnerName || "Not recorded"}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">WhatsApp</Label>
                      <p className="text-gray-900">{couponResult.coupon.winnerWhatsApp || "Not recorded"}</p>
                    </div>

                    {couponResult.coupon.winnerAddress && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Address</Label>
                        <p className="text-gray-900">{couponResult.coupon.winnerAddress}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Alert variant="destructive">
                  <AlertDescription>
                    This coupon is not valid for redemption. Please check the coupon code and try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RedemptionPage;



