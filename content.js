/*
 * CETAK CEPAT SUMBERMAS — FILE DATA WEBSITE
 * ================================================================
 * Edit informasi bisnis, produk, harga, foto, dan cabang di file ini.
 * Tidak perlu mengubah layout index.html atau fungsi site.js.
 *
 * FOTO PRODUK:
 * - Simpan foto di folder assets/produk/ lalu isi contoh:
 *   image: "assets/produk/banner-x-banner.webp"
 * - Atau isi URL gambar lengkap (https://...).
 *
 * HARGA:
 * - Isi priceFrom dengan angka, contoh: priceFrom: 35000
 * - Gunakan null untuk menyembunyikan nominal dan menampilkan "Hubungi kami".
 * - Isi priceUnit untuk satuan, contoh: "per m²", "per pcs", "per box".
 * - Tambahkan priceVariants untuk daftar harga berdasarkan ukuran/spesifikasi.
 *   Setiap harga variant dapat diisi angka atau null.
 *
 * KONTAK:
 * - whatsapp harus format internasional tanpa tanda +, spasi, atau strip.
 *   Contoh nomor Indonesia: 6281234567890.
 * - Email kosong ("") tidak akan ditampilkan di website.
 */

window.SUMBERMAS_CONTENT = {
  site: {
    name: "Cetak Cepat SumberMas",
    brandName: "SUMBERMAS",
    tagline: "CETAK CEPAT FULL COLOUR",
    description: "Solusi digital printing, offset printing, dan hot print untuk kebutuhan bisnis, promosi, event, dan personal. Tersedia di Surabaya dan Banjarmasin.",
    ogDescription: "Digital printing, offset, dan hot print. Konsultasikan kebutuhan cetak Anda melalui WhatsApp.",
    topLine: "DIGITAL PRINTING · OFFSET · HOT PRINT",
    instagram: "https://www.instagram.com/cetakcepatsumbermas/",
    email: "", // Isi email bisnis, contoh: "info@sumbermas.co.id"
    defaultBranchId: "surabaya",
    hero: {
      eyebrow: "Solusi cetak untuk setiap kebutuhan",
      titlePrefix: "Cetak ide jadi",
      titleAccent: "nyata.",
      description: "Dari kebutuhan promosi dan perlengkapan bisnis hingga momen spesial. Wujudkan desain Anda dengan layanan digital printing, offset, dan hot print dari SumberMas.",
      proof: "Melayani kebutuhan cetak personal, bisnis, perusahaan, dan instansi.",
      image: "https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AacQ8d15vVCkGOobgZQIIHw.jpeg",
      imageAlt: "Contoh cetak banner dan X-banner SumberMas"
    },
    catalogDescription: "Pilih kategori untuk melihat beberapa contoh produk. Untuk ukuran, bahan, jumlah, dan estimasi harga, langsung konsultasikan dengan tim kami.",
    serviceDescription: "Kami melayani beragam kebutuhan cetak untuk perorangan, pelaku usaha, perusahaan, dan instansi.",
    servicePoster: {
      titleLines: ["MAKE IT", "PRINT.", "MAKE IT", "MATTER."],
      subtitle: "Print that speaks for your brand",
      footer: "CETAK CEPAT FULL COLOUR SUMBERMAS"
    },
    stripItems: [
      { icon: "✳", label: "Digital Printing" },
      { icon: "▤", label: "Offset Printing" },
      { icon: "✦", label: "Hot Print & Finishing" },
      { icon: "⌖", label: "Surabaya & Banjarmasin" }
    ],
    closingTitle: "Siap membuat brand Anda lebih terlihat?",
    copyrightLine: "Digital Printing · Offset · Hot Print"
  },

  categories: [
    { id: "all", label: "Semua produk" },
    { id: "promosi", label: "Promosi" },
    { id: "stationery", label: "Bisnis & stationery" },
    { id: "personal", label: "Personal & event" },
    { id: "merch", label: "Merchandise & kemasan" }
  ],

  products: [
    {
      id: "banner-x-banner",
      name: "Banner & X-Banner",
      category: "promosi",
      categoryLabel: "Promosi",
      description: "Media promosi untuk toko, event, pameran, dan kebutuhan informasi.",
      image: "https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AacQ8d15vVCkGOobgZQIIHw.jpeg",
      imageAlt: "Contoh produk banner dan X-banner",
      priceFrom: null,
      priceUnit: "",
      priceNote: "Harga menyesuaikan ukuran, bahan, dan finishing.",
      priceVariants: []
    },
    {
      id: "buku-yasin",
      name: "Buku Yasin & Buku",
      category: "personal",
      categoryLabel: "Personal & event",
      description: "Cetakan buku untuk acara keluarga, komunitas, dan kebutuhan khusus.",
      image: "https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AMJkRG2vSmgPVfijmq8Bn1g.jpeg",
      imageAlt: "Contoh cetak buku Yasin",
      priceFrom: null,
      priceUnit: "",
      priceNote: "Harga menyesuaikan jumlah halaman, jenis kertas, dan kuantitas.",
      priceVariants: []
    },
    {
      id: "sablon-plastik-tas",
      name: "Sablon Plastik & Tas",
      category: "merch",
      categoryLabel: "Kemasan",
      description: "Kemasan dengan identitas brand untuk usaha kuliner maupun retail.",
      image: "https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AwslXona0Wc1aDfCiBq4uGQ.jpeg",
      imageAlt: "Contoh sablon plastik dan tas kemasan",
      priceFrom: null,
      priceUnit: "",
      priceNote: "Harga menyesuaikan ukuran, bahan, jumlah, dan warna sablon.",
      priceVariants: []
    },
    {
      id: "stiker-label",
      name: "Stiker & Label",
      category: "promosi",
      categoryLabel: "Promosi",
      description: "Stiker produk, label kemasan, dan kebutuhan branding berbagai ukuran.",
      image: "https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AOkwJPK24gQRmvAT7_fAfkQ.jpeg",
      imageAlt: "Contoh cetak stiker A3",
      priceFrom: null,
      priceUnit: "",
      priceNote: "Harga menyesuaikan bahan, ukuran, cutting, dan jumlah.",
      priceVariants: []
    },
    {
      id: "atk-identitas-bisnis",
      name: "ATK & Identitas Bisnis",
      category: "stationery",
      categoryLabel: "Bisnis",
      description: "Kartu nama, nota, map, amplop, kop surat, dan company profile.",
      image: "",
      imageAlt: "Ilustrasi produk stationery dan identitas bisnis",
      priceFrom: null,
      priceUnit: "",
      priceNote: "Harga menyesuaikan jenis produk, bahan, dan kuantitas.",
      priceVariants: []
    },
    {
      id: "undangan-kalender",
      name: "Undangan & Kalender",
      category: "personal",
      categoryLabel: "Personal & event",
      description: "Beragam pilihan cetak untuk acara, hadiah, dan agenda tahunan.",
      image: "https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AEI6NLhH_M8znKWN4aKrnvA.jpeg",
      imageAlt: "Contoh undangan cetak full colour",
      priceFrom: null,
      priceUnit: "",
      priceNote: "Harga menyesuaikan model, bahan, finishing, dan kuantitas.",
      priceVariants: []
    },
    {
      id: "merchandise-souvenir",
      name: "Merchandise & Souvenir",
      category: "merch",
      categoryLabel: "Merchandise",
      description: "Mug, kaos, pin, bolpoin, gantungan kunci, dan produk promosi.",
      image: "",
      imageAlt: "Ilustrasi merchandise dan souvenir",
      priceFrom: null,
      priceUnit: "",
      priceNote: "Harga menyesuaikan jenis produk, bahan, dan jumlah pesanan.",
      priceVariants: []
    },
    {
      id: "brosur-flyer-poster",
      name: "Brosur, Flyer & Poster",
      category: "promosi",
      categoryLabel: "Promosi",
      description: "Materi promosi cetak untuk memperkenalkan produk, layanan, dan event.",
      image: "",
      imageAlt: "Ilustrasi brosur, flyer, dan poster",
      priceFrom: null,
      priceUnit: "",
      priceNote: "Harga menyesuaikan ukuran, jenis kertas, warna, dan kuantitas.",
      priceVariants: []
    }
  ],

  services: [
    { title: "Digital Printing", description: "Produksi cetak full colour" },
    { title: "Offset Printing", description: "Cetakan untuk beragam kebutuhan" },
    { title: "Hot Print", description: "Finishing dengan aksen khusus" },
    { title: "Desain & Layout", description: "Bantuan kebutuhan desain cetak" },
    { title: "Packaging", description: "Kemasan produk dan makanan" },
    { title: "Merchandise", description: "Souvenir dan media promosi" }
  ],

  branches: [
    {
      id: "surabaya",
      name: "Surabaya",
      label: "Jawa Timur",
      address: "Jl. Kapasan No. 1 (Perempatan), Surabaya, Jawa Timur",
      phoneDisplay: "0811 319 5858",
      whatsapp: "628113195858",
      email: "",
      mapQuery: "Jl. Kapasan No. 1, Surabaya, Jawa Timur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jl.+Kapasan+No.+1+Surabaya"
    },
    {
      id: "banjarmasin-pusat",
      name: "Banjarmasin — Pusat",
      label: "Kalimantan Selatan · Pusat",
      address: "Jl. Perintis Kemerdekaan No. 24, Banjarmasin, Kalimantan Selatan",
      phoneDisplay: "0811 512 5677",
      whatsapp: "628115125677",
      email: "",
      mapQuery: "Jl. Perintis Kemerdekaan No. 24, Banjarmasin, Kalimantan Selatan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jl.+Perintis+Kemerdekaan+No.+24+Banjarmasin"
    },
    {
      id: "banjarmasin-cabang",
      name: "Banjarmasin — Hasanudin",
      label: "Kalimantan Selatan · Cabang",
      address: "Jl. Hasanudin HM No. 11, Banjarmasin, Kalimantan Selatan",
      phoneDisplay: "0811 512 5533",
      whatsapp: "628115125533",
      email: "",
      mapQuery: "Jl. Hasanudin HM No. 11, Banjarmasin, Kalimantan Selatan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jl.+Hasanudin+HM+No.+11+Banjarmasin"
    }
  ]
};
