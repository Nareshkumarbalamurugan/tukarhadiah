# 🔧 Firebase Security Rules Fix

## The Problem
Your Firebase Firestore database is currently blocking read/write operations due to restrictive security rules. This is causing the "Missing or insufficient permissions" errors you're seeing.

## The Solution
I've created a `firestore.rules` file that allows the necessary operations for your coupon system.

## 🚀 Quick Fix Options

### Option 1: Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **tukarhadiah-42ee0**
3. Click on **Firestore Database** in the left menu
4. Click on the **Rules** tab
5. Replace the existing rules with this content:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents for the main coupon checking functionality
    match /{document=**} {
      allow read: if true;
    }
    
    // Prizes collection - allow full access for admin operations
    match /prizes/{prizeId} {
      allow read, write, create, update, delete: if true;
    }
    
    // Coupons collection - allow full access for admin operations and coupon checking
    match /coupons/{couponId} {
      allow read, write, create, update, delete: if true;
    }
    
    // Winners collection - allow full access for tracking redemptions
    match /winners/{winnerId} {
      allow read, write, create, update, delete: if true;
    }
    
    // Settings collection - allow full access for admin configuration
    match /settings/{settingId} {
      allow read, write, create, update, delete: if true;
    }
    
    // Store info collection - allow full access for store management
    match /storeInfo/{storeId} {
      allow read, write, create, update, delete: if true;
    }
    
    // Promo settings collection - allow full access for promotion management
    match /promoSettings/{promoId} {
      allow read, write, create, update, delete: if true;
    }
  }
}
```

6. Click **Publish** to save the rules

### Option 2: Firebase CLI (For Developers)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize project: `firebase init firestore` (select existing project)
4. Deploy rules: `firebase deploy --only firestore:rules`

## 🔒 Security Note
These rules allow full access for development and testing. For production, you may want to add authentication checks:

```javascript
// Example of more secure rules for production:
match /prizes/{prizeId} {
  allow read: if true;
  allow write: if request.auth != null; // Only authenticated users can write
}
```

## ✅ After Applying Rules
1. Refresh your browser
2. The permission errors should disappear
3. The admin dashboard should work properly
4. Coupon checking should function correctly

## 🎯 What These Rules Allow
- ✅ Public read access for coupon checking
- ✅ Full admin operations for prize management
- ✅ Coupon generation and redemption
- ✅ Winner tracking and management
- ✅ Store information updates
- ✅ Promotion settings configuration

## 🚨 Priority Action Required
**Apply these Firebase rules immediately** to fix the permission errors and make your coupon system fully functional!
