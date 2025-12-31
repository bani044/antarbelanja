# 🔥 Setup Firebase Configuration

## 📋 Langkah-langkah Setup

### 1. **Buat Project Firebase**

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Tambah project"
3. Masukkan nama project (contoh: `antar-belanja-app`)
4. Ikuti langkah-langkah setup

### 2. **Setup Authentication**

1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di sidebar
3. Pilih tab "Sign-in method"
4. Enable "Anonymous" authentication

### 3. **Setup Firestore Database**

1. Klik "Firestore Database" di sidebar
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi server (pilih yang terdekat dengan Indonesia)

### 4. **Dapatkan Firebase Config**

1. Klik ⚙️ (Settings) di sidebar
2. Pilih "Project settings"
3. Scroll ke bawah ke bagian "Your apps"
4. Klik "Web" icon (</>) untuk menambah web app
5. Masukkan nama app (contoh: `antar-belanja-web`)
6. Copy konfigurasi Firebase yang muncul

### 5. **Setup Environment Variables**

#### A. Copy file environment

```bash
cp .env.example .env
```

#### B. Edit file `.env` dengan konfigurasi Firebase Anda:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=antar-belanja-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=antar-belanja-app
VITE_FIREBASE_STORAGE_BUCKET=antar-belanja-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Optional: Production URL
VITE_PRODUCTION_URL=https://your-domain.com

# Optional: App ID for multi-tenant
VITE_APP_ID=
```

### 6. **Firestore Security Rules (Opsional)**

Untuk production, update Firestore rules di Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all users (untuk development)
    match /{document=**} {
      allow read, write: if true;
    }

    // Untuk production, gunakan rules yang lebih ketat:
    // match /products/{productId} {
    //   allow read: if true;
    //   allow write: if request.auth != null;
    // }
    // match /orders/{orderId} {
    //   allow read, write: if request.auth != null;
    // }
    // match /settings/{settingId} {
    //   allow read, write: if request.auth != null;
    // }
  }
}
```

## 🚀 Menjalankan Aplikasi

Setelah setup environment variables:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔒 Keamanan

### ⚠️ **PENTING:**

- File `.env` sudah ditambahkan ke `.gitignore`
- **JANGAN** commit file `.env` ke repository
- Gunakan `.env.example` sebagai template
- Untuk production, set environment variables di hosting platform

### 🛡️ **Best Practices:**

1. **Development**: Gunakan `.env` file
2. **Production**: Set environment variables di hosting platform:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables
   - **Firebase Hosting**: Firebase CLI dengan `firebase functions:config:set`

## 📱 Testing

Setelah setup, test fitur-fitur berikut:

### ✅ **User Features:**

- [ ] Melihat daftar produk
- [ ] Mencari produk
- [ ] Filter kategori
- [ ] Tambah ke keranjang
- [ ] Checkout via WhatsApp
- [ ] Share aplikasi

### ✅ **Admin Features:**

- [ ] Login dengan PIN (default: 123456 untuk kurir, 777555 untuk pusat)
- [ ] Tambah/edit/hapus produk
- [ ] Lihat laporan order
- [ ] Ubah pengaturan
- [ ] Backup data

## 🐛 Troubleshooting

### **Error: Firebase not initialized**

- Pastikan semua environment variables sudah diset
- Cek apakah nama environment variables benar (harus diawali `VITE_`)

### **Error: Permission denied**

- Cek Firestore security rules
- Pastikan Anonymous authentication sudah enabled

### **Error: Project not found**

- Pastikan `VITE_FIREBASE_PROJECT_ID` sesuai dengan project ID di Firebase Console

### **Data tidak tersimpan**

- Cek koneksi internet
- Cek Firebase Console untuk melihat data di Firestore
- Cek browser console untuk error messages

## 📞 Support

Jika ada masalah dengan setup Firebase, cek:

1. [Firebase Documentation](https://firebase.google.com/docs)
2. [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
3. Browser console untuk error messages
