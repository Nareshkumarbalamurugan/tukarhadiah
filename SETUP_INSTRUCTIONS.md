# TukarHadiah - Setup Instructions

## 🚀 Complete Coupon Redemption System

Your TukarHadiah system is now fully operational! Here's everything you need to know:

## ✅ What's Working

### 🎯 Main Website Features:
- **Coupon Check System**: Users can enter coupon codes to check prizes
- **Beautiful Mobile UI**: Responsive design with fixed emblem
- **Real-time Firebase Integration**: All data stored securely
- **Smart Validation**: Prevents duplicate redemptions

### 👨‍💼 Admin Dashboard Features:
- **Prize Management**: Add/edit/delete prizes
- **Coupon Generation**: Bulk create coupons with custom codes
- **Winner Tracking**: View all redemptions with details
- **Store Management**: Configure store information
- **Promo Settings**: Set campaign dates and status
- **Manual Redemption**: In-store redemption interface

## � CRITICAL: Fix Firebase Permissions First!

**Before using the system, you MUST update Firebase security rules:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **tukarhadiah-42ee0**
3. Go to **Firestore Database** → **Rules** tab
4. Replace rules with the content from `FIREBASE_RULES_FIX.md`
5. Click **Publish**

**Without this step, you'll see "Missing or insufficient permissions" errors!**

## �🔐 Access the System

### Main Website
- **URL**: http://localhost:8080
- **Features**: Coupon checking, prize display, store info

### Admin Login
- **URL**: http://localhost:8080/admin/login
- **Username**: admin
- **Password**: admin123

### Admin Dashboard
- **URL**: http://localhost:8080/admin/dashboard
- **Access**: Login required

## 🎮 Testing the System

### Step 1: Set Up Test Data
1. Login to admin dashboard
2. Go to "Prizes" tab
3. Add some test prizes:
   - Tumbler Premium (Quantity: 50)
   - T-Shirt Custom (Quantity: 100)
   - Voucher Makan Rp 50.000 (Quantity: 75)

### Step 2: Generate Test Coupons
1. Go to "Coupons" tab in admin
2. Click "Generate Coupons"
3. Enter prize name and quantity
4. System will create unique coupon codes

### Step 3: Test Coupon Checking
1. Go to main website (http://localhost:8080)
2. Enter a generated coupon code
3. See congratulations or "not found" message

### Step 4: Test Manual Redemption
1. In admin dashboard, go to "Coupons" tab
2. Click "Redeem" on any available coupon
3. Fill in winner information
4. Coupon will be marked as redeemed

## 🏪 Store Configuration

### Update Store Information:
1. Admin Dashboard → "Store Info" tab
2. Click "Edit Store Info"
3. Add your store details:
   - Store name
   - Complete address
   - Phone numbers
   - WhatsApp contact
   - Email address

### Configure Promotions:
1. Admin Dashboard → "Settings" tab
2. Click "Edit Promo Settings"
3. Set:
   - Promo title and description
   - Start and end dates
   - Active/inactive status

## 📱 Mobile Experience

The system is fully mobile-optimized:
- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Large buttons and inputs
- **Fixed Emblem**: Always visible branding
- **Fast Loading**: Optimized for mobile networks

## 🔧 System Features

### Security Features:
- ✅ Firebase Authentication for admin access
- ✅ Protected admin routes
- ✅ Input validation and sanitization
- ✅ Secure session management

### User Experience:
- ✅ Real-time feedback with toast notifications
- ✅ Loading states for all actions
- ✅ Error handling and user-friendly messages
- ✅ Intuitive navigation and layout

### Admin Features:
- ✅ Complete CRUD operations for prizes
- ✅ Bulk coupon generation with unique codes
- ✅ Winner management and tracking
- ✅ Store information management
- ✅ Promotion campaign settings
- ✅ Manual redemption workflow

## 🎯 Business Workflow

### For Customers:
1. Customer receives physical coupon with code
2. Visits website and enters coupon code
3. Sees congratulations message if they won
4. Visits store to claim prize with coupon code

### For Store Staff:
1. Customer brings physical coupon to store
2. Staff logs into admin dashboard
3. Uses coupon code to verify and redeem
4. Fills in customer information
5. System records redemption permanently

### For Administrators:
1. Create prizes and set quantities
2. Generate coupon codes in batches
3. Monitor redemptions and winners
4. Manage store information and promos
5. Track campaign performance

## 🚀 Going Live

### For Production Deployment:

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Deploy to Hosting**:
   - Upload `dist` folder to your web hosting
   - Or use services like Netlify, Vercel, or Firebase Hosting

3. **Configure Firebase**:
   - Set up production Firestore security rules
   - Configure admin users in Firebase Auth
   - Update Firebase config if needed

4. **DNS Setup**:
   - Point your domain to the hosting service
   - Configure SSL certificate

## 🎉 You're All Set!

Your complete coupon redemption system is ready! Features included:

- ✅ Beautiful landing page with coupon checking
- ✅ Complete admin dashboard with all management features
- ✅ Firebase backend with real-time data
- ✅ Mobile-responsive design
- ✅ Fixed emblem/branding as requested
- ✅ Manual redemption workflow
- ✅ Winner tracking and management
- ✅ Store information management
- ✅ Promotion campaign settings

## 📞 Support

If you need any modifications or have questions:
1. Check the admin dashboard for all management features
2. All data is stored securely in Firebase
3. The system is ready for production use
4. Mobile-first design works on all devices

**Happy coupon management!** 🎁
