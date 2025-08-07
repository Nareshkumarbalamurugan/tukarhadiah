import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
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
  X
} from 'lucide-react';

interface Prize {
  id: string;
  name: string;
  description: string;
  points: number;
  stock: number;
  image?: string;
  active: boolean;
}

interface User {
  id: string;
  name: string;
  whatsapp: string;
  totalPoints: number;
  redeemedPrizes: number;
  status: 'active' | 'inactive';
}

interface RedemptionRequest {
  id: string;
  userId: string;
  userName: string;
  prizeId: string;
  prizeName: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Sample data - in real app this would come from API
  const [prizes, setPrizes] = useState<Prize[]>([
    { id: '1', name: 'Tumbler Premium', description: 'Tumbler stainless steel 500ml', points: 100, stock: 50, active: true },
    { id: '2', name: 'T-Shirt Custom', description: 'T-shirt dengan design custom', points: 150, stock: 30, active: true },
    { id: '3', name: 'Voucher Makan', description: 'Voucher makan Rp 50.000', points: 75, stock: 100, active: false },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', whatsapp: '08123456789', totalPoints: 250, redeemedPrizes: 2, status: 'active' },
    { id: '2', name: 'Jane Smith', whatsapp: '08234567890', totalPoints: 180, redeemedPrizes: 1, status: 'active' },
    { id: '3', name: 'Bob Wilson', whatsapp: '08345678901', totalPoints: 320, redeemedPrizes: 3, status: 'inactive' },
  ]);

  const [redemptionRequests, setRedemptionRequests] = useState<RedemptionRequest[]>([
    { id: '1', userId: '1', userName: 'John Doe', prizeId: '1', prizeName: 'Tumbler Premium', points: 100, status: 'pending', requestDate: '2025-01-15' },
    { id: '2', userId: '2', userName: 'Jane Smith', prizeId: '2', prizeName: 'T-Shirt Custom', points: 150, status: 'approved', requestDate: '2025-01-14' },
  ]);

  const [companyProfile, setCompanyProfile] = useState({
    companyName: 'TukarHadiah Co.',
    logo: '',
    banner: '',
    description: 'Platform tukar hadiah terpercaya',
    contactInfo: {
      whatsapp: '08123456789',
      email: 'admin@tukarhadiah.com',
      address: 'Jl. Sudirman No. 123, Jakarta'
    }
  });

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const handleApproveRedemption = (id: string) => {
    setRedemptionRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: 'approved' as const } : req)
    );
  };

  const handleRejectRedemption = (id: string) => {
    setRedemptionRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: 'rejected' as const } : req)
    );
  };

  const togglePrizeStatus = (id: string) => {
    setPrizes(prev => 
      prev.map(prize => prize.id === id ? { ...prize, active: !prize.active } : prize)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
              <p className="text-sm text-muted-foreground">Kelola sistem tukar hadiah</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="prizes">Hadiah</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="redemptions">Penukaran</TabsTrigger>
          </TabsList>

          {/* Profile Management */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Pengaturan Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Nama Perusahaan</Label>
                      <Input
                        id="companyName"
                        value={companyProfile.companyName}
                        onChange={(e) => setCompanyProfile(prev => ({ ...prev, companyName: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        value={companyProfile.description}
                        onChange={(e) => setCompanyProfile(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        value={companyProfile.contactInfo.whatsapp}
                        onChange={(e) => setCompanyProfile(prev => ({ 
                          ...prev, 
                          contactInfo: { ...prev.contactInfo, whatsapp: e.target.value }
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Upload Logo</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Klik untuk upload logo</p>
                      </div>
                    </div>

                    <div>
                      <Label>Upload Banner</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Klik untuk upload banner</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full md:w-auto">
                  Simpan Perubahan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prize Management */}
          <TabsContent value="prizes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Katalog Hadiah</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Hadiah
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Hadiah</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Poin</TableHead>
                      <TableHead>Stok</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prizes.map((prize) => (
                      <TableRow key={prize.id}>
                        <TableCell className="font-medium">{prize.name}</TableCell>
                        <TableCell>{prize.description}</TableCell>
                        <TableCell>{prize.points}</TableCell>
                        <TableCell>{prize.stock}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={prize.active}
                              onCheckedChange={() => togglePrizeStatus(prize.id)}
                            />
                            <Badge variant={prize.active ? 'default' : 'secondary'}>
                              {prize.active ? 'Aktif' : 'Nonaktif'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-xl font-semibold">Daftar Pengguna</h2>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Total Poin</TableHead>
                      <TableHead>Hadiah Ditukar</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.whatsapp}</TableCell>
                        <TableCell>{user.totalPoints}</TableCell>
                        <TableCell>{user.redeemedPrizes}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
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

          {/* Redemption Management */}
          <TabsContent value="redemptions" className="space-y-6">
            <h2 className="text-xl font-semibold">Permintaan Penukaran</h2>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pengguna</TableHead>
                      <TableHead>Hadiah</TableHead>
                      <TableHead>Poin</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {redemptionRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.userName}</TableCell>
                        <TableCell>{request.prizeName}</TableCell>
                        <TableCell>{request.points}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              request.status === 'approved' ? 'default' : 
                              request.status === 'rejected' ? 'destructive' : 
                              'secondary'
                            }
                          >
                            {request.status === 'approved' ? 'Disetujui' : 
                             request.status === 'rejected' ? 'Ditolak' : 
                             'Menunggu'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleApproveRedemption(request.id)}
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Setuju
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleRejectRedemption(request.id)}
                              >
                                <X className="w-3 h-3 mr-1" />
                                Tolak
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
