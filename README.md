# Polimasa
Website Pojok Literasi Matematika dan Sains, sebuah proyek Program Kreativitas Mahasiswa (PKM) dari Universitas Maritim Raja Ali Haji (UMRAH) bekerja sama dengan SMPN 6 Tanjungpinang.

### 🚀 Teknologi yang Digunakan
Proyek ini dibangun menggunakan tech stack modern yang terdiri dari:
- Frontend: Next.js (React Framework)
- Styling: Tailwind CSS
- Backend (CMS): Sanity.io
- Version Control: Git & GitHub

### 🛠️ Panduan Instalasi dan Setup

#### 1. Clone Repository
Salin repository ini ke komputer Anda menggunakan perintah berikut:

```
git clone https://github.com/diimass26/polimasa.git
cd polimasa
```

#### 2. Install Dependencies
Proyek ini memiliki dua bagian (Sanity Studio dan Next.js Web) yang masing-masing memerlukan instalasi paket tersendiri.

a. Setup Sanity Studio (Backend)
```
# Masuk ke direktori studio
cd studio

# Install semua paket yang dibutuhkan
npm install
```
b. Setup Next.js (Frontend)
```
# Kembali ke direktori utama, lalu masuk ke direktori web
cd ../web

# Install semua paket yang dibutuhkan
npm install
```
#### 3. Menjalankan Proyek
Anda perlu menjalankan dua terminal secara bersamaan untuk backend dan frontend.

a. Jalankan Sanity Studio
```
# Di dalam direktori /studio
sanity start
```
Studio akan berjalan di http://localhost:3333. Anda bisa mulai mengelola konten di sini.

b. Jalankan Website Next.js
```
# Di dalam direktori /web
npm run dev
```
Website akan berjalan di http://localhost:3000.