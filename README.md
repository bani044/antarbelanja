# Antar Belanja

Aplikasi e-commerce sederhana untuk layanan antar jemput belanja dengan integrasi WhatsApp dan sistem admin.

## Fitur Utama

### Untuk Pelanggan

- Browse produk dari berbagai lapak/toko
- Pencarian dan filter kategori
- Keranjang belanja dengan catatan khusus
- Checkout langsung ke WhatsApp kurir
- Share aplikasi ke teman

### Untuk Admin

- **Kurir**: Kelola produk dan lihat laporan
- **Pusat**: Semua fitur kurir + pengaturan sistem + backup data
- Upload foto produk dengan kompresi otomatis
- Laporan harian transaksi
- Pengaturan PIN dan format pesan WhatsApp

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Auth**: Firebase Anonymous Auth
- **Icons**: Lucide React
- **Deployment**: Vercel + Cloudflare

## Quick Start

```bash
# Clone repository
git clone <repository-url>
cd antarbelanja

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi Firebase Anda

# Run development server
npm run dev

# Build for production
npm run build
```

## Setup Firebase

### 1. Buat Project Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Tambah project"
3. Masukkan nama project (contoh: `antar-belanja-app`)
4. Ikuti langkah-langkah setup

### 2. Setup Authentication

1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di sidebar
3. Pilih tab "Sign-in method"
4. Enable "Anonymous" authentication

### 3. Setup Firestore Database

1. Klik "Firestore Database" di sidebar
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi server (pilih yang terdekat dengan Indonesia)

### 4. Dapatkan Firebase Config

1. Klik ⚙️ (Settings) di sidebar
2. Pilih "Project settings"
3. Scroll ke bawah ke bagian "Your apps"
4. Klik "Web" icon (</>) untuk menambah web app
5. Masukkan nama app (contoh: `antar-belanja-web`)
6. Copy konfigurasi Firebase yang muncul

### 5. Setup Environment Variables

Copy file environment:

```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi Firebase Anda:

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

### 6. Firestore Security Rules (Opsional)

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

## Default Admin PIN

- **Kurir**: `123456`
- **Pusat**: `777555`

Bisa diubah di pengaturan admin.

## Struktur Project

```
src/
├── components/           # Komponen UI
│   ├── admin/           # Komponen khusus admin
│   │   ├── AdminPanel.jsx
│   │   ├── OrdersTab.jsx
│   │   ├── ProductsTab.jsx
│   │   ├── SettingsTab.jsx
│   │   ├── BackupTab.jsx
│   │   └── ProductFormModal.jsx
│   └── user/            # Komponen khusus user
│       ├── UserInterface.jsx
│       ├── CartModal.jsx
│       └── LoginModal.jsx
├── config/              # Konfigurasi aplikasi
│   ├── constants.js     # Konstanta global
│   └── firebase.js      # Konfigurasi Firebase
├── hooks/               # Custom React Hooks
│   ├── useAuth.js       # Hook untuk autentikasi
│   ├── useFirestore.js  # Hook untuk data Firestore
│   └── useCart.js       # Hook untuk keranjang belanja
├── services/            # Layanan bisnis logic
│   ├── productService.js # CRUD produk
│   ├── orderService.js   # Pemesanan & WhatsApp
│   └── settingsService.js # Pengaturan & backup
├── utils/               # Utility functions
│   └── helpers.js       # Helper functions
├── App.jsx              # Komponen utama (diperkecil)
├── main.jsx            # Entry point
└── index.css           # Styles
```

### Keuntungan Struktur Baru

- **Maintainability**: Kode lebih mudah dipelihara
- **Reusability**: Komponen dapat digunakan kembali
- **Scalability**: Mudah menambah fitur baru
- **Readability**: Kode lebih mudah dibaca
- **Testing**: Setiap bagian dapat ditest secara terpisah

### Custom Hooks

```jsx
// useAuth.js - Mengelola autentikasi
const { user } = useAuth();

// useFirestore.js - Mengelola data
const { products, orders, settings } = useFirestore(user, adminLevel);

// useCart.js - Mengelola keranjang
const { cart, addToCart, updateQty } = useCart();
```

### Services

```jsx
// productService.js - CRUD produk
await saveProduct(formData, editingProduct);
await deleteProduct(productId);

// orderService.js - Pemesanan
const orderId = await createOrder(cart, total, stores, user);
const message = generateWhatsAppMessage(...);
sendWhatsAppMessage(message, targetNumber);
```

## Deployment

### Deploy ke Vercel

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Login ke Vercel**

```bash
vercel login
```

3. **Deploy Project**

```bash
npm run build
vercel --prod
```

4. **Set Environment Variables di Vercel**

- Masuk ke dashboard Vercel
- Pilih project Anda
- Klik "Settings" → "Environment Variables"
- Tambahkan semua environment variables dari file `.env`

### Setup Subdomain Otomatis Vercel ke Cloudflare

**Video Tutorial**: 

[▶️ Lihat Video Tutorial - Atur Subdomain](assets-docs/tutorial-atur-subdomain.mp4)

#### 1. Setup di Vercel

1. **Buka Dashboard Vercel**

   - Masuk ke [vercel.com](https://vercel.com)
   - Pilih project Anda

2. **Tambah Custom Domain**
   - Klik "Settings" → "Domains"
   - Klik "Add Domain"
   - Masukkan subdomain Anda (contoh: `belanja.yourdomain.com`)
   - Vercel akan memberikan CNAME record

#### 2. Setup di Cloudflare

1. **Login ke Cloudflare Dashboard**

   - Masuk ke [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pilih domain Anda

2. **Tambah DNS Record**
   - Klik "DNS" di sidebar
   - Klik "Add record"
   - **Type**: CNAME
   - **Name**: belanja (atau subdomain yang Anda inginkan)
   - **Target**: cname.vercel-dns.com (dari Vercel)
   - **Proxy status**: Proxied (orange cloud)
   - Klik "Save"

#### 3. Verifikasi Domain di Vercel

1. **Kembali ke Vercel Dashboard**
   - Refresh halaman "Domains"
   - Tunggu beberapa menit untuk propagasi DNS
   - Status akan berubah menjadi "Valid Configuration"

#### 4. Setup SSL (Otomatis)

- Cloudflare dan Vercel akan otomatis setup SSL
- Pastikan SSL/TLS mode di Cloudflare diset ke "Full (strict)"
- Akses: Cloudflare Dashboard → SSL/TLS → Overview → Full (strict)

#### 5. Optimasi Cloudflare (Opsional)

1. **Speed Optimization**

   - Speed → Optimization → Auto Minify (centang semua)
   - Speed → Optimization → Brotli (On)

2. **Caching**

   - Caching → Configuration → Browser Cache TTL (4 hours)
   - Caching → Configuration → Always Online (On)

3. **Security**
   - Security → Settings → Security Level (Medium)
   - Security → Settings → Bot Fight Mode (On)

#### 6. Testing

1. **Test Akses**

   ```bash
   curl -I https://belanja.yourdomain.com
   ```

2. **Test SSL**

   - Buka https://belanja.yourdomain.com di browser
   - Pastikan ada ikon gembok hijau

3. **Test Performance**
   - Gunakan [GTmetrix](https://gtmetrix.com)
   - Atau [PageSpeed Insights](https://pagespeed.web.dev)

#### Troubleshooting Subdomain

**Domain tidak bisa diakses:**

- Tunggu 5-10 menit untuk propagasi DNS
- Cek DNS dengan `nslookup belanja.yourdomain.com`
- Pastikan CNAME record sudah benar

**SSL Error:**

- Pastikan SSL mode di Cloudflare = "Full (strict)"
- Tunggu beberapa menit untuk SSL provisioning
- Clear browser cache

**Redirect Loop:**

- Ubah SSL mode ke "Full" (bukan "Flexible")
- Disable "Always Use HTTPS" sementara
- Cek Edge Certificates di Cloudflare

### Deploy ke Netlify (Alternatif)

```bash
npm run build
# Upload dist/ folder ke Netlify
```

## Testing Aplikasi

Setelah setup, test fitur-fitur berikut:

### User Features

- [ ] Melihat daftar produk
- [ ] Mencari produk
- [ ] Filter kategori
- [ ] Tambah ke keranjang
- [ ] Checkout via WhatsApp
- [ ] Share aplikasi

### Admin Features

- [ ] Login dengan PIN (default: 123456 untuk kurir, 777555 untuk pusat)
- [ ] Tambah/edit/hapus produk
- [ ] Lihat laporan order
- [ ] Ubah pengaturan
- [ ] Backup data

## Troubleshooting

### Firebase Errors

**Error: Firebase not initialized**

- Pastikan semua environment variables sudah diset
- Cek apakah nama environment variables benar (harus diawali `VITE_`)

**Error: Permission denied**

- Cek Firestore security rules
- Pastikan Anonymous authentication sudah enabled

**Error: Project not found**

- Pastikan `VITE_FIREBASE_PROJECT_ID` sesuai dengan project ID di Firebase Console

**Data tidak tersimpan**

- Cek koneksi internet
- Cek Firebase Console untuk melihat data di Firestore
- Cek browser console untuk error messages

### Deployment Errors

**Build failed**

- Cek environment variables di hosting platform
- Pastikan semua dependencies ter-install
- Cek error di build logs

**Domain tidak bisa diakses**

- Tunggu propagasi DNS (5-10 menit)
- Cek DNS settings di Cloudflare
- Pastikan CNAME record sudah benar

## Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_PRODUCTION_URL=your_production_url
VITE_APP_ID=your_app_id
```

### Keamanan Environment Variables

- File `.env` sudah ditambahkan ke `.gitignore`
- **JANGAN** commit file `.env` ke repository
- Gunakan `.env.example` sebagai template
- Untuk production, set environment variables di hosting platform

## Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## Support

Jika ada masalah:

1. Cek [Firebase Documentation](https://firebase.google.com/docs)
2. Cek [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
3. Lihat browser console untuk error messages
4. Tonton video tutorial di `assets-docs/tutorial-atur-subdomain.mp4`

## License

MIT License - bebas digunakan untuk project komersial maupun personal.
