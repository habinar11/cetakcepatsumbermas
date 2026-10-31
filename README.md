# Cetak Cepat SumberMas — Website Statis

Landing page responsif yang memisahkan tampilan website dan data konten. Cocok untuk GitHub + Cloudflare Pages.

## Isi folder

```text
cetakcepatsumbermas/
├── index.html          # Struktur halaman dan CSS
├── content.js          # DATA YANG BIASA DIEDIT
├── site.js             # Fungsi render, filter katalog, form WhatsApp
├── .nojekyll           # Membantu GitHub Pages mengabaikan pemrosesan Jekyll
└── assets/
    └── produk/         # Simpan foto produk asli di sini
```

## Cara mengubah konten website

Buka `content.js` menggunakan VS Code, Notepad, TextEdit dalam mode plain text, atau editor kode lain. File ini dibagi menjadi beberapa bagian:

- `site`: nama brand, tagline, deskripsi, Instagram, email, teks hero, dan CTA.
- `categories`: nama kategori untuk filter katalog.
- `products`: nama produk, deskripsi, kategori, foto, harga, satuan, dan variasi harga.
- `services`: daftar layanan pada bagian layanan.
- `branches`: alamat, nomor WhatsApp, email, dan lokasi peta masing-masing cabang.

Setelah mengedit `content.js`, simpan file lalu refresh website. Tidak perlu mengubah `index.html` atau `site.js` untuk perubahan konten biasa.

## Mengganti foto produk

1. Siapkan foto produk milik SumberMas, idealnya WebP/JPG dengan rasio mendekati 4:3.
2. Masukkan foto ke folder `assets/produk/`.
3. Di objek produk pada `content.js`, ganti URL `image` menjadi path relatif, contoh:

```js
image: "assets/produk/banner-x-banner.webp",
imageAlt: "Cetak X-banner full colour SumberMas",
```

4. Simpan `content.js` dan unggah folder/foto ke GitHub bersama perubahan lain.

Bisa juga memakai URL gambar HTTPS yang di-host pada layanan gambar milik sendiri. Hindari mengambil foto dari website pihak lain tanpa izin. Untuk website produksi, gunakan foto yang memang dimiliki atau diizinkan oleh SumberMas.

## Mengisi harga

Harga belum dimasukkan karena belum ada daftar harga resmi dari SumberMas. Semua kartu produk untuk sementara menampilkan **Hubungi kami**. Jangan mengganti nominal dengan perkiraan.

Untuk harga mulai, isi `priceFrom` dengan angka rupiah tanpa titik atau simbol mata uang. Misalnya:

```js
priceFrom: 35000,
priceUnit: "per pcs",
priceNote: "Minimum order 100 pcs.",
priceVariants: [
  { label: "Ukuran A5", price: 35000 },
  { label: "Ukuran A4", price: 55000 },
  { label: "Ukuran custom", price: null }
]
```

Harga variasi yang diisi angka akan diformat ke Rupiah secara otomatis. Harga `null` akan tampil sebagai **Hubungi kami**. Jika tidak ingin menampilkan rincian variasi, biarkan `priceVariants: []`.

## Mengubah kontak dan alamat

- `site.email`: isi alamat email utama; biarkan `""` jika belum ada email resmi.
- `site.instagram`: URL Instagram resmi.
- `site.defaultBranchId`: cabang tujuan tombol WhatsApp utama. Nilai awal: `"surabaya"`.
- `branches[].whatsapp`: nomor WhatsApp format internasional tanpa tanda plus/spasi, misalnya `628113195858`.
- `branches[].phoneDisplay`: nomor yang akan terlihat di halaman.
- `branches[].email`: email khusus cabang (opsional).
- `branches[].address`: alamat yang terlihat pada website.
- `branches[].mapQuery`: alamat/kata kunci yang digunakan untuk memuat peta.
- `branches[].mapUrl`: URL saat pengunjung menekan tombol Google Maps.

## Data yang masih perlu diverifikasi

1. Konfirmasi alamat rinci cabang Banjarmasin Pusat dan cabang Hasanudin berikut titik Google Maps yang tepat.
2. Konfirmasi apakah email resmi tersedia.
3. Masukkan harga resmi, ukuran, bahan, finishing, minimum order, dan ketentuan harga setiap produk.
4. Ganti contoh foto katalog lama dengan foto produk terbaru milik SumberMas.

Nomor WhatsApp awal yang dimasukkan:
- Surabaya — 0811 319 5858.
- Banjarmasin Pusat — 0811 512 5677.
- Banjarmasin Hasanudin — 0811 512 5533.

Alamat Banjarmasin yang saat ini dimasukkan bersumber dari katalog publik yang pernah ditemukan dan harus dikonfirmasi ulang sebelum publikasi.

## Cara menjalankan di komputer

Cara paling sederhana: klik dua kali `index.html`. Untuk pengujian lokal yang lebih mirip hosting, jalankan server lokal dari folder ini:

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000` di browser.

## Deploy melalui GitHub + Cloudflare Pages

1. Buat repository GitHub, misalnya `cetakcepatsumbermas`.
2. Upload seluruh isi folder website (bukan hanya `index.html`). Pastikan `content.js`, `site.js`, dan folder `assets/` ikut ter-upload.
3. Di Cloudflare Dashboard, buka **Workers & Pages → Create → Pages → Connect to Git**.
4. Pilih repository GitHub yang berisi website ini.
5. Untuk website statis biasa, biarkan **Build command** kosong dan isi **Build output directory** dengan `/` (root repository).
6. Deploy. Cloudflare akan memberikan alamat `*.pages.dev`.
7. Untuk domain sendiri, tambahkan domain melalui **Custom domains** pada project Pages dan ikuti arahan DNS Cloudflare.

Setiap perubahan yang di-push ke branch produksi repository akan memicu deployment baru. Jangan mengunggah password, token, atau API secret ke `content.js`: semua konten di file ini memang dapat dibaca publik oleh pengunjung website.

## Catatan teknis

- Website tidak membutuhkan database atau backend.
- Form konsultasi menyusun pesan dan membuka WhatsApp cabang yang dipilih. Pengunjung tetap mengirim pesan sendiri dari WhatsApp.
- Email hanya ditampilkan apabila diisi.
- Peta Google Maps memerlukan koneksi internet.
- Karena konten katalog dimuat oleh JavaScript, aktifkan JavaScript pada browser pengunjung.
