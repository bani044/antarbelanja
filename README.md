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
- **Deployment**: Ready for Vercel/Netlify

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

1. Buat project di [Firebase Console](https://console.firebase.google.com/)
2. Enable Anonymous Authentication
3. Buat Firestore Database (test mode)
4. Copy config ke file `.env`

Lihat [SETUP_FIREBASE.md](SETUP_FIREBASE.md) untuk panduan lengkap.

## Default Admin PIN

- **Kurir**: `123456`
- **Pusat**: `777555`

Bisa diubah di pengaturan admin.

## Struktur Project

```
src/
├── components/     # UI components
├── hooks/          # Custom React hooks
├── services/       # Business logic
├── config/         # App configuration
└── utils/          # Helper functions
```

Detail struktur ada di [STRUKTUR_BARU.md](STRUKTUR_BARU.md).

## Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Deployment

### Vercel

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
# Upload dist/ folder
```

Jangan lupa set environment variables di dashboard hosting.

## Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## License

MIT License - bebas digunakan untuk project komersial maupun personal.
