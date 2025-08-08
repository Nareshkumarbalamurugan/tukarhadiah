# TukarHadiah - Coupon Redemption System

A complete coupon redemption and admin management system built with React, TypeScript, and Firebase.

## 🎯 Features

### Main Application
- **Coupon Checking**: Users can enter coupon codes to check if they won a prize
- **Real-time Validation**: Instant feedback on coupon validity
- **Responsive Design**: Mobile-first design with fixed emblem
- **User-friendly Interface**: Clean and intuitive UI with Indonesian language support

### Admin Dashboard
- **Prize Management**: Add, edit, delete, and manage prize inventory
- **Coupon Generation**: Generate coupon codes in bulk for specific prizes
- **Winner Management**: View all winners and redemption history
- **Store Information**: Manage store contact details and location
- **Promo Settings**: Configure promotion campaigns with start/end dates
- **Redemption Page**: Dedicated page for processing coupon redemptions

### Redemption System
- **Admin Authentication**: Secure login for staff members
- **Coupon Verification**: Real-time coupon status checking
- **Winner Information**: Capture winner details (name, WhatsApp, address)
- **Redemption History**: Track all redemptions with timestamps
- **Responsive Design**: Works seamlessly on mobile and desktop
- **User-friendly Interface**: Clean, modern design optimized for Indonesian users

### Admin Features
- **Dashboard Management**: Comprehensive admin panel
- **User Management**: View and manage user accounts
- **Prize Management**: Add, edit, and manage prize catalog
- **Redemption Tracking**: Monitor and approve redemption requests
- **Company Profile**: Manage company information and branding
- **Statistics**: View platform usage analytics

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query for server state
- **Build Tool**: Vite
- **Package Manager**: npm/bun

## 📱 Design Features

- **Mobile-First**: Optimized for mobile users (primary target audience)
- **Progressive Web App**: Can be installed on mobile devices
- **Offline Support**: Basic offline functionality
- **Fast Loading**: Optimized bundle size and lazy loading
- **Accessible**: WCAG compliant interface

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm or yarn or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tukarhadiah
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:8081](http://localhost:8081) in your browser

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Shadcn)
│   ├── TukarHadiahLanding.tsx    # Main landing page
│   └── ConnectPrintingLanding.tsx # Legacy component
├── pages/               # Page components
│   ├── Index.tsx        # Home page
│   ├── AdminLogin.tsx   # Admin login
│   ├── AdminDashboard.tsx # Admin panel
│   └── NotFound.tsx     # 404 page
├── lib/                 # Utility functions and APIs
│   ├── api.ts          # Mock API service
│   └── utils.ts        # Helper functions
├── hooks/               # Custom React hooks
└── styles/             # CSS files
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_endpoint
VITE_COMPANY_NAME=TukarHadiah
VITE_WHATSAPP_NUMBER=08123456789
```

### Admin Access
Default admin credentials:
- Username: `admin`
- Password: `admin123`

**⚠️ Important**: Change these credentials before deployment!

## 🎨 Customization

### Branding
Update the company branding in:
- `src/components/TukarHadiahLanding.tsx` - Logo and company name
- `src/lib/api.ts` - Company profile data
- `tailwind.config.ts` - Color scheme
- `src/index.css` - CSS custom properties

### Prize Configuration
Modify the prize catalog in `src/lib/api.ts`:
```typescript
const mockPrizes: Prize[] = [
  {
    id: '1',
    name: 'Your Prize Name',
    description: 'Prize description',
    points: 100,
    stock: 50,
    active: true,
    category: 'Category'
  }
];
```

### Coupon Configuration
Update valid coupons in `src/lib/api.ts`:
```typescript
const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'YOUR_COUPON_CODE',
    points: 150,
    isUsed: false,
    expiresAt: '2025-12-31'
  }
];
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
bun run build
```

### Preview Production Build
```bash
npm run preview
# or
bun run preview
```

### Deployment Options
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **Railway**: Deploy with git integration
- **VPS**: Upload the `dist` folder to your web server

## 📱 PWA Features

The app includes Progressive Web App features:
- **Installable**: Users can install the app on their devices
- **Offline Support**: Basic offline functionality
- **Push Notifications**: (To be implemented)

## 🔒 Security

- Input validation and sanitization
- XSS protection
- CSRF protection (to be implemented with real backend)
- Secure authentication (mock implementation provided)

## 🧪 Testing

Run tests:
```bash
npm run test
# or
bun test
```

## 📞 Support

For technical support:
- WhatsApp: [Your WhatsApp Number]
- Email: [Your Email]
- Documentation: This README file

## 🔄 Backend Integration

Currently uses mock data. To integrate with a real backend:

1. Replace `src/lib/api.ts` with actual API calls
2. Implement proper authentication
3. Add error handling and loading states
4. Configure CORS for your domain

### Required API Endpoints
- `POST /api/auth/login` - Admin authentication
- `POST /api/coupons/validate` - Validate coupon codes
- `GET /api/prizes` - Get prize catalog
- `POST /api/redemptions` - Create redemption request
- `GET /api/users` - Get user list (admin)
- `PUT /api/redemptions/:id` - Update redemption status

## 📊 Analytics

Consider integrating:
- Google Analytics for user behavior
- Hotjar for user experience insights
- Custom analytics for business metrics

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Email integration
- [ ] SMS notifications
- [ ] Advanced reporting
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Loyalty program features
- [ ] QR code scanning
- [ ] Geolocation-based rewards

---

## 💡 Client Information

**Project**: Point Redemption Landing Page
**Budget**: $10.00 – 13.00 USD
**Timeline**: 6 days

### Requirements Met:
✅ Responsive design for all devices
✅ User-friendly UI/UX design
✅ Frontend development with React/TypeScript
✅ Backend simulation with mock API
✅ Point redemption system integration
✅ Admin dashboard for management
✅ Testing and debugging completed
✅ Indonesian language support
✅ WhatsApp integration ready
✅ Mobile-optimized interface

### Ready for Production:
The system is fully functional with mock data and ready for backend integration. All features demonstrated in the wireframes have been implemented with additional enhancements for better user experience.

**Next Steps**: 
1. Review and test the application
2. Integrate with your actual backend API
3. Configure domain and hosting
4. Update branding and company information
5. Set up analytics and monitoring

---

Built with ❤️ for TukarHadiah platform
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/77ce720d-71db-4091-9a3a-f3045c05dbc9) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
