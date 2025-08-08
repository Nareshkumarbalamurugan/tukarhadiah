import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LogOut, 
  Settings, 
  Gift, 
  Users, 
  Trophy, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  Check,
  X,
  MapPin,
  Calendar,
  Package,
  Upload,
  User,
  Phone,
  Search
} from 'lucide-react';
import { 
  getPrizes, 
  addPrize, 
  updatePrize, 
  deletePrize,
  getCoupons,
  getWinners,
  addCoupons,
  getStoreInfo,
  updateStoreInfo,
  getPromoSettings,
  updatePromoSettings,
  redeemCoupon
} from '@/lib/firestore';
import { Prize, Coupon, StoreInfo, PromoSettings } from '@/types';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Auth check
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // State management
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [winners, setWinners] = useState<Coupon[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    updatedAt: new Date()
  });
  const [promoSettings, setPromoSettings] = useState<PromoSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [showPrizeDialog, setShowPrizeDialog] = useState(false);
  const [showCouponDialog, setShowCouponDialog] = useState(false);
  const [showStoreDialog, setShowStoreDialog] = useState(false);
  const [showPromoDialog, setShowPromoDialog] = useState(false);
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
  const [editingPrize, setEditingPrize] = useState<Prize | null>(null);

  // Form states
  const [prizeForm, setPrizeForm] = useState({
    name: '',
    description: '',
    quantity: 1,
    isActive: true
  });

  const [couponForm, setCouponForm] = useState({
    prizeName: '',
    quantity: 1,
    prefix: 'CP'
  });

  const [storeForm, setStoreForm] = useState({
    name: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: ''
  });

  const [promoForm, setPromoForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: true
  });

  // Manual redemption form
  const [redemptionForm, setRedemptionForm] = useState({
    couponCode: '',
    winnerName: '',
    winnerWhatsApp: '',
    winnerAddress: ''
  });

  // Search states
  const [searchTerm, setSearchTerm] = useState('');

  // Load data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prizesRes, couponsRes, winnersRes, storeRes, promoRes] = await Promise.all([
        getPrizes(),
        getCoupons(),
        getWinners(),
        getStoreInfo(),
        getPromoSettings()
      ]);

      if (prizesRes.success) setPrizes(prizesRes.data || []);
      if (couponsRes.success) setCoupons(couponsRes.data || []);
      if (winnersRes.success) setWinners(winnersRes.data || []);
      if (storeRes.success && storeRes.data) {
        setStoreInfo(storeRes.data);
        setStoreForm({
          name: storeRes.data.name || '',
          address: storeRes.data.address || '',
          phone: storeRes.data.phone || '',
          whatsapp: storeRes.data.whatsapp || '',
          email: storeRes.data.email || ''
        });
      }
      if (promoRes.success && promoRes.data) {
        setPromoSettings(promoRes.data);
        setPromoForm({
          title: promoRes.data.title || '',
          description: promoRes.data.description || '',
          startDate: promoRes.data.startDate ? promoRes.data.startDate.toISOString().split('T')[0] : '',
          endDate: promoRes.data.endDate ? promoRes.data.endDate.toISOString().split('T')[0] : '',
          isActive: promoRes.data.isActive || false
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Prize management functions
  const handleAddPrize = async () => {
    if (!prizeForm.name.trim()) {
      toast({
        title: "Error",
        description: "Prize name is required",
        variant: "destructive"
      });
      return;
    }

    const result = await addPrize({
      name: prizeForm.name,
      description: prizeForm.description,
      quantity: prizeForm.quantity,
      isActive: prizeForm.isActive
    });

    if (result.success) {
      toast({
        title: "Success",
        description: "Prize added successfully"
      });
      loadAllData();
      setShowPrizeDialog(false);
      setPrizeForm({ name: '', description: '', quantity: 1, isActive: true });
    } else {
      toast({
        title: "Error",
        description: "Failed to add prize",
        variant: "destructive"
      });
    }
  };

  const handleEditPrize = (prize: Prize) => {
    setEditingPrize(prize);
    setPrizeForm({
      name: prize.name,
      description: prize.description || '',
      quantity: prize.quantity,
      isActive: prize.isActive
    });
    setShowPrizeDialog(true);
  };

  const handleUpdatePrize = async () => {
    if (!editingPrize) return;

    const result = await updatePrize(editingPrize.id!, {
      name: prizeForm.name,
      description: prizeForm.description,
      quantity: prizeForm.quantity,
      isActive: prizeForm.isActive
    });

    if (result.success) {
      toast({
        title: "Success",
        description: "Prize updated successfully"
      });
      loadAllData();
      setShowPrizeDialog(false);
      setEditingPrize(null);
      setPrizeForm({ name: '', description: '', quantity: 1, isActive: true });
    } else {
      toast({
        title: "Error",
        description: "Failed to update prize",
        variant: "destructive"
      });
    }
  };

  const handleDeletePrize = async (prizeId: string) => {
    if (!confirm('Are you sure you want to delete this prize?')) return;

    const result = await deletePrize(prizeId);
    if (result.success) {
      toast({
        title: "Success",
        description: "Prize deleted successfully"
      });
      loadAllData();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete prize",
        variant: "destructive"
      });
    }
  };

  // Coupon management
  const handleAddCoupons = async () => {
    if (!couponForm.prizeName.trim()) {
      toast({
        title: "Error",
        description: "Prize name is required",
        variant: "destructive"
      });
      return;
    }

    const newCoupons = Array.from({ length: couponForm.quantity }, (_, i) => ({
      couponCode: `${couponForm.prefix}${Date.now()}${String(i + 1).padStart(3, '0')}`,
      prizeId: `prize_${Date.now()}`,
      prizeName: couponForm.prizeName,
      isRedeemed: false
    }));

    const result = await addCoupons(newCoupons);
    if (result.success) {
      toast({
        title: "Success",
        description: `${couponForm.quantity} coupons generated successfully`
      });
      loadAllData();
      setShowCouponDialog(false);
      setCouponForm({ prizeName: '', quantity: 1, prefix: 'CP' });
    } else {
      toast({
        title: "Error",
        description: "Failed to generate coupons",
        variant: "destructive"
      });
    }
  };

  // Store info management
  const handleUpdateStore = async () => {
    const result = await updateStoreInfo(storeForm);
    if (result.success) {
      toast({
        title: "Success",
        description: "Store information updated successfully"
      });
      loadAllData();
      setShowStoreDialog(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to update store information",
        variant: "destructive"
      });
    }
  };

  // Manual redemption
  const handleManualRedemption = async () => {
    if (!redemptionForm.couponCode.trim() || !redemptionForm.winnerName.trim() || !redemptionForm.winnerWhatsApp.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Find the coupon first
    const coupon = coupons.find(c => c.couponCode.toUpperCase() === redemptionForm.couponCode.toUpperCase());
    if (!coupon) {
      toast({
        title: "Error",
        description: "Coupon not found",
        variant: "destructive"
      });
      return;
    }

    if (coupon.isRedeemed) {
      toast({
        title: "Error",
        description: "This coupon has already been redeemed",
        variant: "destructive"
      });
      return;
    }

    const result = await redeemCoupon(coupon.id!, {
      name: redemptionForm.winnerName,
      whatsapp: redemptionForm.winnerWhatsApp,
      address: redemptionForm.winnerAddress
    });

    if (result.success) {
      toast({
        title: "Success",
        description: "Coupon redeemed successfully"
      });
      loadAllData();
      setShowRedemptionDialog(false);
      setRedemptionForm({ couponCode: '', winnerName: '', winnerWhatsApp: '', winnerAddress: '' });
    } else {
      toast({
        title: "Error",
        description: "Failed to redeem coupon",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Filter functions
  const filteredCoupons = coupons.filter(coupon => 
    coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.prizeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWinners = winners.filter(winner => 
    winner.winnerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    winner.couponCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-sm text-gray-600">Kelola sistem tukar hadiah</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Hadiah</p>
                  <p className="text-2xl font-bold text-gray-900">{prizes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Kupon</p>
                  <p className="text-2xl font-bold text-gray-900">{coupons.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pemenang</p>
                  <p className="text-2xl font-bold text-gray-900">{winners.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ditukar</p>
                  <p className="text-2xl font-bold text-gray-900">{coupons.filter(c => c.isRedeemed).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs - Matching Client's Mockup */}
        <Tabs defaultValue="profil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profil">Profil</TabsTrigger>
            <TabsTrigger value="hadiah">Hadiah</TabsTrigger>
            <TabsTrigger value="pengguna">ID Pemenang</TabsTrigger>
            <TabsTrigger value="penukaran">Penukaran</TabsTrigger>
          </TabsList>

          {/* Profil Tab - Matching Image 4 */}
          <TabsContent value="profil">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    ⚙️ Pengaturan Profil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="storeName">Nama Perusahaan</Label>
                      <Input 
                        id="storeName" 
                        placeholder="TukarHadiah"
                        value={storeForm.name}
                        onChange={(e) => setStoreForm({...storeForm, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="storeDesc">Deskripsi</Label>
                      <Textarea 
                        id="storeDesc" 
                        placeholder="Platform tukar poin dengan hadiah menarik"
                        value={storeForm.address}
                        onChange={(e) => setStoreForm({...storeForm, address: e.target.value})}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input 
                        id="whatsapp" 
                        placeholder="081234567890"
                        value={storeForm.whatsapp}
                        onChange={(e) => setStoreForm({...storeForm, whatsapp: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Upload Logo</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Klik untuk upload logo</p>
                        <small className="text-gray-400">Max 2MB, format JPG/PNG</small>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Upload Banner</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Klik untuk upload banner</p>
                        <small className="text-gray-400">Max 5MB, format JPG/PNG</small>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleUpdateStore} 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Simpan Perubahan
                  </Button>
                </CardContent>
              </Card>

              {/* Store Information Display */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Toko</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Nama Toko</Label>
                      <p className="text-lg text-gray-900">{storeInfo.name || "Belum diatur"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Alamat</Label>
                      <p className="text-gray-900">{storeInfo.address || "Belum diatur"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Telepon</Label>
                        <p className="text-gray-900">{storeInfo.phone || "Belum diatur"}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">WhatsApp</Label>
                        <p className="text-gray-900">{storeInfo.whatsapp || "Belum diatur"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Hadiah Tab - Matching Image 3 */}
          <TabsContent value="hadiah">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Katalog Hadiah</CardTitle>
                <Dialog open={showPrizeDialog} onOpenChange={setShowPrizeDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Tambah Hadiah
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingPrize ? 'Edit Hadiah' : 'Tambah Hadiah Baru'}</DialogTitle>
                      <DialogDescription>
                        {editingPrize ? 'Perbarui informasi hadiah' : 'Tambahkan hadiah baru ke sistem'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="prizeName">Nama Hadiah</Label>
                        <Input
                          id="prizeName"
                          value={prizeForm.name}
                          onChange={(e) => setPrizeForm({...prizeForm, name: e.target.value})}
                          placeholder="Masukkan nama hadiah"
                        />
                      </div>
                      <div>
                        <Label htmlFor="prizeDescription">Deskripsi</Label>
                        <Textarea
                          id="prizeDescription"
                          value={prizeForm.description}
                          onChange={(e) => setPrizeForm({...prizeForm, description: e.target.value})}
                          placeholder="Masukkan deskripsi hadiah"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="prizeQuantity">Stok</Label>
                          <Input
                            id="prizeQuantity"
                            type="number"
                            min="1"
                            value={prizeForm.quantity}
                            onChange={(e) => setPrizeForm({...prizeForm, quantity: parseInt(e.target.value) || 1})}
                          />
                        </div>
                        <div className="flex items-center space-x-2 mt-6">
                          <Switch
                            id="prizeActive"
                            checked={prizeForm.isActive}
                            onCheckedChange={(checked) => setPrizeForm({...prizeForm, isActive: checked})}
                          />
                          <Label htmlFor="prizeActive">Aktif</Label>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={editingPrize ? handleUpdatePrize : handleAddPrize}
                          className="flex-1"
                        >
                          {editingPrize ? 'Perbarui Hadiah' : 'Tambah Hadiah'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowPrizeDialog(false);
                            setEditingPrize(null);
                            setPrizeForm({ name: '', description: '', quantity: 1, isActive: true });
                          }}
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prizes.map((prize) => (
                    <Card key={prize.id} className="overflow-hidden">
                      <div className="h-40 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                        <Gift className="w-16 h-16 text-orange-500" />
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{prize.name}</h3>
                          <p className="text-sm text-gray-600">{prize.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant={prize.isActive ? "default" : "secondary"}>
                              Stok: {prize.quantity}
                            </Badge>
                            <Badge variant={prize.isActive ? "default" : "secondary"}>
                              {prize.isActive ? "Aktif" : "Nonaktif"}
                            </Badge>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditPrize(prize)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDeletePrize(prize.id!)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ID Pemenang Tab - Matching Image 2 */}
          <TabsContent value="pengguna">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Daftar ID Pemenang</CardTitle>
                  <p className="text-sm text-gray-600">Daftar Pengguna</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Dialog open={showCouponDialog} onOpenChange={setShowCouponDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        + ID Pemenang
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tambah ID Pemenang</DialogTitle>
                        <DialogDescription>
                          Generate kupon baru untuk hadiah tertentu
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="couponPrize">Hadiah</Label>
                          <Select onValueChange={(value) => setCouponForm({...couponForm, prizeName: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih hadiah" />
                            </SelectTrigger>
                            <SelectContent>
                              {prizes.map((prize) => (
                                <SelectItem key={prize.id} value={prize.name}>{prize.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">This column retrieves submitted data from the Gift catalog.</p>
                        </div>
                        <div>
                          <Label htmlFor="couponQuantity">Nomor ID Kupon</Label>
                          <Input
                            id="couponQuantity"
                            type="number"
                            min="1"
                            max="1000"
                            value={couponForm.quantity}
                            onChange={(e) => setCouponForm({...couponForm, quantity: parseInt(e.target.value) || 1})}
                            placeholder="Manual input"
                          />
                        </div>
                        <Button onClick={handleAddCoupons} className="w-full bg-green-600 hover:bg-green-700">
                          Simpan
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nomor ID Kupon</TableHead>
                      <TableHead>Hadiah</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCoupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell className="font-mono">{coupon.couponCode}</TableCell>
                        <TableCell>{coupon.prizeName}</TableCell>
                        <TableCell>
                          <Badge variant={coupon.isRedeemed ? "default" : "secondary"}>
                            {coupon.isRedeemed ? "Nonaktif" : "Aktif"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Penukaran Tab - Matching Image 1 */}
          <TabsContent value="penukaran">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Permintaan Penukaran</CardTitle>
                    <p className="text-sm text-gray-600">Manual exchange interface with auto-fill functionality</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Manual Redemption Form */}
                  <Card className="border-pink-200">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Manual Redemption</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="couponCode">Nomor ID Kupon</Label>
                          <Input
                            id="couponCode"
                            value={redemptionForm.couponCode}
                            onChange={(e) => setRedemptionForm({...redemptionForm, couponCode: e.target.value})}
                            placeholder="Enter coupon number in this column to detect whether a client has won a prize or not"
                            className="border-pink-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="winnerName">Nama Lengkap</Label>
                          <Input
                            id="winnerName"
                            value={redemptionForm.winnerName}
                            onChange={(e) => setRedemptionForm({...redemptionForm, winnerName: e.target.value})}
                            placeholder="The FULL NAME column and WHATSAPP NUMBER column will be automatically filled in on the Redemption Submenu."
                          />
                        </div>
                        <div>
                          <Label htmlFor="winnerWhatsApp">Nomor WhatsApp</Label>
                          <Input
                            id="winnerWhatsApp"
                            value={redemptionForm.winnerWhatsApp}
                            onChange={(e) => setRedemptionForm({...redemptionForm, winnerWhatsApp: e.target.value})}
                            placeholder="WhatsApp number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="winnerAddress">Keterangan</Label>
                          <Textarea
                            id="winnerAddress"
                            value={redemptionForm.winnerAddress}
                            onChange={(e) => setRedemptionForm({...redemptionForm, winnerAddress: e.target.value})}
                            placeholder="Additional notes"
                            rows={3}
                          />
                        </div>
                        <Button 
                          onClick={handleManualRedemption} 
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          CEK POIN SAYA
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Winners List */}
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>No ID</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead>WhatsApp</TableHead>
                          <TableHead>Ket.</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredWinners.map((winner) => (
                          <TableRow key={winner.id}>
                            <TableCell className="font-mono text-sm">{winner.couponCode}</TableCell>
                            <TableCell>{winner.winnerName}</TableCell>
                            <TableCell>{winner.winnerWhatsApp}</TableCell>
                            <TableCell className="text-xs">{winner.winnerAddress}</TableCell>
                            <TableCell className="text-sm">
                              {winner.redeemedAt ? new Date(winner.redeemedAt).toLocaleDateString('id-ID') : "-"}
                            </TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-green-500">
                                Menunggu
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline" className="bg-green-500 text-white">
                                  <Check className="w-3 h-3" />
                                  Setuju
                                </Button>
                                <Button size="sm" variant="outline" className="bg-red-500 text-white">
                                  <X className="w-3 h-3" />
                                  Tolak
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
                TukarHadiah Admin
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
