# Volkpedia Backend

Backend API untuk aplikasi Volkpedia, dibangun menggunakan Node.js, Express, dan MongoDB.

## Fitur

- Autentikasi pengguna (admin, owner, customer)
- Manajemen produk, customer, cart, dashboard
- Email OTP & invoice (menggunakan Mustache & Nodemailer)
- RESTful API dengan JWT authentication
- Seed database dengan data mock

## Struktur Folder

```
.
├── api/
├── app/
│   ├── api/
│   ├── db/
│   ├── errors/
│   ├── middlewares/
│   ├── mock/
│   ├── services/
│   ├── utils/
│   └── views/
├── bin/
├── public/
├── .env
├── index.js
├── package.json
├── seed.js
└── vercel.json
```

## Instalasi

1. **Clone repository**

   ```sh
   git clone <repo-url>
   cd volkpedia-backend
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Buat file `.env`**  
   Contoh isi:

   ```
   URL_MONGODB_DEV=mongodb://localhost:27017/volkpedia
   JWT_SECRET_KEY=your_jwt_secret
   JWT_EXPIRATION=1d
   JWT_REFRESH_TOKEN_SECRET_KEY=your_refresh_secret
   JWT_REFRESH_TOKEN_EXPIRATION=7d
   GMAIL=your_gmail@gmail.com
   PASSWORD=your_gmail_app_password
   ```

4. **Seed database (opsional)**
   ```sh
   node seed.js
   ```

## Menjalankan Project

### Mode Development

```sh
npm run dev
```

### Mode Production

```sh
npm start
```

Server akan berjalan di port 3000 (atau sesuai variabel `PORT` di `.env`).

## Endpoint Utama

- `POST /api/v1/auth/signin` — Login admin/owner
- `POST /api/v1/auth/admin` — Tambah admin (hanya owner)
- `POST /api/v1/auth/signup` — Registrasi customer
- `POST /api/v1/auth/signin` — Login customer
- `PUT /api/v1/auth/active` — Aktivasi customer via OTP
- `GET /api/v1/product` — List produk (customer)
- `GET /api/v1/cms/product` — List produk (admin)
- `GET /api/v1/cart` — Lihat cart customer
- `GET /api/v1/dashboard` — Dashboard admin

Dokumentasi endpoint lebih lengkap dapat dilihat pada kode di folder [`app/api/v1`](app/api/v1).

## Deployment

Project ini dapat dideploy di Vercel menggunakan [vercel.json](vercel.json).

---

**Lisensi:** ISC
