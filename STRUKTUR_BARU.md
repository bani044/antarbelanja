# Struktur Aplikasi Antar Belanja - Versi Terstruktur

## 📁 Struktur Folder Baru

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

## 🔧 Perubahan Utama

### 1. **Pemisahan Komponen**

- **AdminPanel**: Semua UI admin dipindah ke komponen terpisah
- **UserInterface**: UI konsumen dipindah ke komponen terpisah
- **Modal Components**: Cart dan Login modal dipisah

### 2. **Custom Hooks**

- **useAuth**: Mengelola autentikasi Firebase
- **useFirestore**: Mengelola data dari Firestore
- **useCart**: Mengelola state keranjang belanja

### 3. **Services Layer**

- **productService**: CRUD operasi produk
- **orderService**: Pembuatan order & integrasi WhatsApp
- **settingsService**: Pengaturan aplikasi & backup

### 4. **Configuration**

- **constants.js**: Semua konstanta aplikasi
- **firebase.js**: Konfigurasi Firebase terpusat

### 5. **Utilities**

- **helpers.js**: Fungsi-fungsi utility (generateOrderId, formatDate, compressImage)

## 📋 Keuntungan Struktur Baru

### ✅ **Maintainability**

- Kode lebih mudah dipelihara
- Setiap file memiliki tanggung jawab yang jelas
- Mudah mencari dan memperbaiki bug

### ✅ **Reusability**

- Komponen dapat digunakan kembali
- Hooks dapat dipakai di komponen lain
- Services dapat dipanggil dari mana saja

### ✅ **Scalability**

- Mudah menambah fitur baru
- Struktur mendukung pertumbuhan aplikasi
- Tim dapat bekerja pada bagian berbeda

### ✅ **Readability**

- Kode lebih mudah dibaca
- Struktur folder yang intuitif
- Pemisahan concern yang jelas

### ✅ **Testing**

- Setiap bagian dapat ditest secara terpisah
- Hooks dan services mudah di-mock
- Unit testing lebih mudah

## 🚀 Cara Kerja

### **App.jsx (Main Component)**

```jsx
// Hanya berisi:
// - State management utama (adminLevel)
// - Orchestration logic
// - Conditional rendering (Admin vs User)
```

### **Custom Hooks**

```jsx
// useAuth.js - Mengelola autentikasi
const { user } = useAuth();

// useFirestore.js - Mengelola data
const { products, orders, settings } = useFirestore(user, adminLevel);

// useCart.js - Mengelola keranjang
const { cart, addToCart, updateQty } = useCart();
```

### **Services**

```jsx
// productService.js - CRUD produk
await saveProduct(formData, editingProduct);
await deleteProduct(productId);

// orderService.js - Pemesanan
const orderId = await createOrder(cart, total, stores, user);
const message = generateWhatsAppMessage(...);
sendWhatsAppMessage(message, targetNumber);
```

## 🎯 Tidak Ada Perubahan Fungsionalitas

- ✅ Semua fitur tetap sama
- ✅ UI/UX tidak berubah
- ✅ Alur kerja aplikasi sama
- ✅ Kompatibilitas Firebase tetap
- ✅ Semua fungsi admin & user tetap

## 📝 Migrasi dari Struktur Lama

Struktur lama (1 file besar) → Struktur baru (modular):

1. **Constants** → `src/config/constants.js`
2. **Firebase Config** → `src/config/firebase.js`
3. **Utilities** → `src/utils/helpers.js`
4. **Auth Logic** → `src/hooks/useAuth.js`
5. **Data Logic** → `src/hooks/useFirestore.js`
6. **Cart Logic** → `src/hooks/useCart.js`
7. **Admin UI** → `src/components/admin/`
8. **User UI** → `src/components/user/`
9. **Business Logic** → `src/services/`

## 🔄 Cara Pengembangan Selanjutnya

### Menambah Fitur Baru:

1. **UI Component** → Tambah di `components/`
2. **Data Logic** → Tambah di `hooks/` atau `services/`
3. **Configuration** → Update di `config/`
4. **Utilities** → Tambah di `utils/`

### Contoh: Menambah Fitur Notifikasi

```
src/
├── components/
│   └── notifications/
│       └── NotificationPanel.jsx
├── hooks/
│   └── useNotifications.js
├── services/
│   └── notificationService.js
```

Struktur ini memungkinkan pengembangan yang lebih terorganisir dan mudah dikelola!

## 🔐 Environment Variables Setup

### **File Environment:**

- `.env` - File konfigurasi environment (tidak di-commit)
- `.env.example` - Template file environment
- `SETUP_FIREBASE.md` - Panduan lengkap setup Firebase

### **Environment Variables:**

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

### **Keamanan:**

- ✅ File `.env` sudah ditambahkan ke `.gitignore`
- ✅ Menggunakan `import.meta.env` untuk Vite
- ✅ Fallback values untuk development
- ✅ Template `.env.example` untuk tim

### **Setup Cepat:**

1. Copy `.env.example` ke `.env`
2. Isi dengan konfigurasi Firebase Anda
3. Jalankan `npm run dev`
4. Lihat `SETUP_FIREBASE.md` untuk panduan lengkap
