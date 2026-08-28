export const translations = {
  id: {
    // Navbar
    nav: {
      home: "Beranda",
      about: "Tentang Saya",
      experiences: "Pengalaman",
      educations: "Pendidikan",
      gallery: "Galeri",
      projects: "Proyek Unggulan",
      github: "GitHub",
      wakatime: "WakaTime",
      achievements: "Prestasi",
      contact: "Hubungi Saya",
    },

    // Hero
    hero: {
      greeting: "Halo, Saya",
      roles: "Full Stack Developer - DevOps Engineer - UI/UX & Graphic Designer - Artist",
      photography: "Penggemar Fotografi",
      quote: "“Jika kau tidak sanggup menahan lelahnya belajar, maka kau harus sanggup menahan perihnya kebodohan.”",
      visitGithub: "Kunjungi GitHub Saya",
      exploreWork: "Jelajahi Karya Saya",
      nowPlaying: "Sedang Diputar",
      paused: "Dijeda",
      clickToPlay: "Klik untuk putar",
      clickToPause: "Klik untuk jeda",
    },

    // About
    about: {
      title: "Tentang Saya",
      role: "Full Stack Developer",
      bio1: "Halo! Saya Rayyan Ammar Fadhillah, seorang Full Stack Developer yang bersemangat menciptakan solusi digital inovatif dan efisien. Dengan pengalaman lebih dari 2 tahun, saya berfokus pada pembuatan aplikasi web fungsional dengan antarmuka yang bersih.",
      bio2: "Saya saat ini berusia 18 tahun dan mendalami Rekayasa Perangkat Lunak di SMKS Telekomunikasi Telesandi Bekasi. Saya juga aktif berkontribusi pada proyek open-source untuk terus mengasah keahlian saya.",
      stats: {
        experience: "Pengalaman",
        experienceVal: "2+ Tahun",
        location: "Lokasi",
        locationVal: "Cibitung, Bekasi, ID",
        age: "Usia",
        ageVal: "18 Tahun",
        status: "Status",
        statusVal: "Pelajar / Mahasiswa",
      },
      downloadCv: "Unduh CV",
    },

    // TechStack
    techStack: {
      title: "Keahlian Teknologi",
      badge: "Keahlian & Perkakas",
      searchPlaceholder: "Cari teknologi...",
      allCategory: "Semua",
      categories: {
        All: "Semua",
        Frontend: "Frontend",
        Backend: "Backend",
        Fullstack: "Fullstack",
        Language: "Bahasa",
        Database: "Basis Data",
        Tools: "Perkakas",
        DevOps: "DevOps",
        Cloud: "Cloud",
        Design: "Desain",
      },
      levels: {
        Beginner: "Pemula",
        Intermediate: "Menengah",
        Advanced: "Mahir",
      },
      searching: "Mencari...",
      noResults: "Tidak ada teknologi yang cocok.",
    },

    // Experiences
    experiences: {
      title: "Pengalaman Kerja",
      badge: "Karier & Kontribusi",
      items: [
        {
          id: 1,
          role: "Full Stack Developer",
          company: "Freelance",
          type: "Kontrak",
          period: "2024 - Sekarang",
          description: "Mengembangkan aplikasi web kustom, platform e-commerce, dan sistem manajemen untuk berbagai klien lokal menggunakan React, Laravel, dan Tailwind CSS.",
          skills: ["React", "Laravel", "MySQL", "Tailwind CSS", "Vite"]
        },
        {
          id: 2,
          role: "Full Stack Intern",
          company: "Tech Solutions",
          type: "Magang",
          period: "2025",
          description: "Berkontribusi dalam membangun sistem tiket klinik dan perangkat lunak absensi berbasis scan kode QR. Membantu perancangan database dan optimasi sisi server.",
          skills: ["PHP", "JavaScript", "TypeScript", "MySQL"]
        }
      ]
    },

    // Educations
    educations: {
      title: "Pendidikan & Jejak",
      badge: "Riwayat Pendidikan",
      currentBadge: "Sekarang",
      items: [
        {
          year: "2007",
          title: "Awal Mula",
          subtitle: "Kelahiran",
          description: "Awal dari perjalanan hidup saya. Halaman pertama dari cerita panjang dan penuh antusiasme.",
          type: "milestone"
        },
        {
          year: "2014 - 2015",
          title: "TKIT Nurul Falah",
          subtitle: "Masa Bermain & Belajar",
          description: "Mulai mengenal dunia luar, belajar bersosialisasi, dan membangun fondasi karakter sejak dini."
        },
        {
          year: "2015 - 2020",
          title: "SDIT Al-Fath Cibitung",
          subtitle: "Sekolah Dasar",
          description: "Enam tahun eksplorasi. Belajar kedisiplinan, tanggung jawab, dan fondasi dasar sains dan teknologi.",
          logo: "/img/alpat.png"
        },
        {
          year: "2020 - 2023",
          title: "SMPIT Ulil Albab",
          subtitle: "Pencarian Jati Diri",
          description: "Mulai aktif berorganisasi dan menemukan minat besar dalam bidang teknologi serta olahraga.",
          logo: "/img/ulil.png",
          tags: ["Klub Bahasa Inggris", "Futsal"]
        },
        {
          year: "2023 - 2026",
          title: "SMK Telekomunikasi Telesandi Bekasi",
          subtitle: "Rekayasa Perangkat Lunak",
          description: "Melangkah ke dunia IT. Mempelajari pemrograman, manajemen server, dan membangun fondasi karier sebagai developer profesional.",
          logo: "/img/tels.png",
          tags: ["Syntax", "Voli", "Futsal", "Sepak Bola"]
        },
        {
          year: "2026 - Sekarang",
          title: "ASTRA TECH",
          subtitle: "Sarjana Terapan Rekayasa Perangkat Lunak",
          description: "Menempuh pendidikan vokasi tinggi untuk memperdalam keahlian rekayasa perangkat lunak lanjutan, manajemen proyek IT, dan pengembangan solusi skala industri.",
          logo: "/img/astra.jpg",
          current: true,
          tags: ["Kuliah", "Software Engineering", "Astra Tech"]
        }
      ]
    },

    // Gallery
    gallery: {
      title: "Galeri Karya & Momen",
      badge: "Koleksi Visual",
      subtext: "Kumpulan momen, lanskap, dan jepretan visual yang mengabadikan sudut pandang cerita saya.",
      items: [
        { src: "/img/ist.png", title: "Pemandangan Interior", description: "Masjid Istiqlal" },
        { src: "/img/mount.png", title: "Pemandangan Gunung", description: "Gunung Prau" },
        { src: "/img/bis.png", title: "Sigma Cat", description: "Sang penjaga kehampaan" },
        { src: "/img/senja.png", title: "Kehidupan Kota", description: "Mentari Senja" },
        { src: "/img/akt.png", title: "Euforia", description: "Momen kebahagiaan bersama" },
        { src: "/img/city.png", title: "Suasana Malam", description: "Gemerlap Cahaya Kota Jakarta" }
      ]
    },

    // Projects
    projects: {
      title: "Proyek Unggulan",
      badge: "Karya Terpilih",
      viewDetails: "Lihat Detail",
      liveDemo: "Demo Langsung",
      viewCode: "Lihat Kode",
      caseStudy: "Studi Kasus",
      overview: "Ikhtisar Proyek",
      keyFeatures: "Fitur Utama",
      techUsed: "Teknologi yang Digunakan",
      comingSoon: "Segera Hadir",
      closeModal: "Tutup",
      items: [
        {
          id: 1,
          gambar: "tiket.png",
          judul: "LonIk - Loket Klinik",
          parag: "Aplikasi berbasis web untuk memudahkan antrean tiket dan operasional klinik pelayanan kesehatan.",
          tech: ["TypeScript", "Blade", "JavaScript", "PHP", "Vite"],
          linkDemo: "https://loket-klinik.vercel.app",
          linkCode: "https://github.com/rayyanbabab/Loket-klinik",
          features: ["Penerbitan Nomor Antrean", "Tampilan Loket Aktif", "Administrasi Multi-Loket", "Pembaruan Antrean Real-time"],
          overview: "LonIk dirancang untuk klinik dan pusat kesehatan dalam mengelola alur pasien harian secara efisien. Dengan digitalisasi sistem tiket, operasional klinik menjadi lebih tertib dan waktu tunggu pasien berkurang drastis."
        },
        {
          id: 2,
          gambar: "Artilia.png",
          judul: "Artilia Inventory",
          parag: "Aplikasi manajemen stok dan aset perusahaan secara efisien, terstruktur, dan terintegrasi.",
          tech: ["Laravel", "MySQL", "Tailwind", "Vite", "Blade"],
          linkDemo: "#",
          linkCode: "https://github.com/rayyanbabab/artilia",
          isComingSoon: false,
          features: ["Pencatatan & Pelacakan Aset", "Notifikasi Stok Menipis", "Hak Akses Multi-Peran", "Audit Riwayat Pergerakan Barang"],
          overview: "Artilia Inventory memberikan visibilitas penuh bagi perusahaan atas logistik dan aset inventarisnya. Dilengkapi tabel interaktif, indikator stok, dan fitur CRUD yang kokoh."
        },
        {
          id: 3,
          gambar: "islamicBot.png",
          judul: "Islamic Portal",
          parag: "Aplikasi web Al-Quran digital, jadwal salat otomatis, dan konten ibadah harian yang menenangkan.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://dev-islamic-ten.vercel.app",
          linkCode: "https://github.com/rayyanbabab/islamic",
          isComingSoon: false,
          features: ["Surah Al-Quran Digital Lengkap", "Jadwal Waktu Salat Akurat", "Koleksi Hadis Harian", "Antarmuka Bersih & Tenang"],
          overview: "Aplikasi web ramah pengguna untuk umat Muslim yang menyajikan bacaan Al-Quran lengkap dengan terjemahan, hitungan waktu salat otomatis berbasis koordinat geografis, serta kumpulan doa pilihan."
        },
        {
          id: 4,
          gambar: "nextt.jpeg",
          judul: "Next Task",
          parag: "Aplikasi manajemen tugas minimalis dengan papan kanban drag-and-drop dan pelacak progres.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://nexttask-livid.vercel.app",
          linkCode: "https://github.com/rayyanbabab/nextTask",
          isComingSoon: false,
          features: ["Papan Tugas Kanban", "Prioritas Tugas Berlabel", "Statistik Penyelesaian Tugas", "Penyimpanan Offline LocalStorage"],
          overview: "Next Task adalah aplikasi produktivitas harian yang dirancang untuk menjaga alur kerja developer tetap teratur dan fokus melalui papan interaktif."
        },
        {
          id: 5,
          gambar: "absensi.png",
          judul: "Absensi Siswa QR Code",
          parag: "Aplikasi absensi siswa secara real-time menggunakan pemindaian QR Code yang cepat dan praktis.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "#",
          linkCode: "https://github.com/rayyanbabab/AbsensiQR",
          isComingSoon: false,
          features: ["Generator & Pemindai QR Code", "Log Kehadiran Real-Time", "Ekspor Rekap Data CSV", "Panel Kelola Siswa"],
          overview: "Mempermudah pencatatan kehadiran di sekolah. Dengan kode QR pada kartu pelajar, guru dapat memindai kehadiran seketika dan membuat rekap bulanan otomatis."
        },
        {
          id: 6,
          gambar: "RuangGaya.png",
          judul: "RuangGaya",
          parag: "Platform e-commerce busana modern dengan katalog produk interaktif dan pengalaman belanja responsif.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://ruanggaya.vercel.app",
          linkCode: "https://github.com/rayyanbabab/RuangGaya",
          isComingSoon: false,
          features: ["Keranjang Belanja Dinamis", "Halaman Detail Produk Interaktif", "Penyaringan & Pencarian Cepat", "Alur Checkout yang Mulus"],
          overview: "Showcase antarmuka butik fashion premium dengan estetika monokrom elegan, transisi halus, dan tata letak produk modern."
        },
        {
          id: 7,
          gambar: "Al-quran.png",
          judul: "Al-Quran App",
          parag: "Platform Al-Quran digital bersih dengan audio murattal dan penanda bacaan terakhir.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://aplikasi-quran-eta.vercel.app",
          linkCode: "https://github.com/rayyanbabab/Al-Qu-ran-Digital",
          isComingSoon: false,
          features: ["Kategori Surah & Juz", "Terjemahan Multi-Bahasa", "Streaming Audio Qari", "Penanda Ayat Terakhir"],
          overview: "Sahabat digital membaca dan mendengarkan Al-Quran dengan antarmuka yang jernih, bebas gangguan, dan performa tinggi."
        },
        {
          id: 8,
          gambar: "Ngasir.png",
          judul: "Ngasir Apps",
          parag: "Sistem kasir POS (Point of Sale) ringan yang dioptimalkan untuk transaksi UMKM secara cepat.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://ngasir-ten.vercel.app",
          linkCode: "https://github.com/rayyanbabab/ngasir.git",
          isComingSoon: false,
          features: ["Pelacak Stok Produk", "Kalkulator Tagihan Otomatis", "Pencatatan Riwayat Transaksi", "Cetak Struk Pembayaran"],
          overview: "Aplikasi kasir berbasis web yang intuitif untuk membantu pelaku usaha mikro mencatat penjualan dan mengelola arus stok produk harian."
        },
        {
          id: 9,
          gambar: "kas.png",
          judul: "Kas RT",
          parag: "Aplikasi pencatatan kas lingkungan RT dengan transparansi mutasi keuangan dan bukti transaksi.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://cash-flow-app-blond.vercel.app",
          linkCode: "https://github.com/rayyanbabab/cash-flow-app",
          isComingSoon: false,
          features: ["Pencatatan Pemasukan & Pengeluaran", "Laporan Saldo Bulanan", "Riwayat Mutasi yang Dapat Dicetak", "Grafik Keuangan"],
          overview: "Alat bantu pengurus RT untuk menyajikan laporan kas secara transparan dan akuntabel kepada warga secara real-time."
        },
        {
          id: 10,
          gambar: "kampus.png",
          judul: "Pendaftaran Kampus",
          parag: "Portal pendaftaran mahasiswa baru dengan formulir dinamis dan dasbor status verifikasi berkas.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://student-portal-app-teal.vercel.app",
          linkCode: "https://github.com/rayyanbabab/aplikasi-pendaftaran-kampus",
          isComingSoon: false,
          features: ["Formulir Pendaftaran Multi-Tahap", "Status Verifikasi Real-Time", "Dasbor Analitik", "Ekspor Kartu Ujian PDF"],
          overview: "Menyederhanakan alur seleksi mahasiswa baru mulai dari unggah berkas hingga pengumuman kelulusan secara terpadu."
        },
        {
          id: 11,
          gambar: "kegiatan sekolah.png",
          judul: "Sistem Kegiatan Sekolah",
          parag: "Portal informasi agenda sekolah, pendaftaran ekstrakurikuler, dan papan pengumuman terpadu.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://sistem-kegiatan-sekolah-app.vercel.app",
          linkCode: "https://github.com/rayyanbabab/sistem-kegiatan-sekolah-app",
          isComingSoon: false,
          features: ["Kalender Agenda Interaktif", "Pendaftaran Ekstrakurikuler", "Papan Pengumuman Digital", "Jadwal Acara Admin"],
          overview: "Pusat informasi kegiatan kesiswaan sekolah agar seluruh agenda terorganisir dengan rapi dan mudah diakses siswa."
        },
        {
          id: 12,
          gambar: "kataruma.png",
          judul: "Kataruma RW 10",
          parag: "Sistem administrasi laundry modern untuk mengelola pesanan, pelanggan, dan status pencucian.",
          isComingSoon: false,
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://kataruma-rw-10.vercel.app",
          linkCode: "https://github.com/rayyanbabab/kataruma",
          features: ["Penerimaan Pesanan & Nota", "Kalkulasi Tarif Otomatis", "Manajemen Data Pelanggan", "Integrasi Notifikasi WhatsApp"],
          overview: "Membantu operasional jasa binatu/laundry dengan pencatatan kiloan maupun satuan, serta pembaruan status cuci secara instan."
        },
        {
          id: 13,
          gambar: "tur.png",
          judul: "Registrasi Turnamen Online",
          parag: "Platform pendaftaran turnamen e-sports dengan manajemen slot tim dan bagan kompetisi.",
          isComingSoon: false,
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://online-tournament-registration.vercel.app",
          linkCode: "https://github.com/rayyanbabab/Tournament-Game",
          features: ["Pendaftaran Tim & Anggota", "Bagan Pertandingan", "Verifikasi Pembayaran", "Pemberitahuan Jadwal Tanding"],
          overview: "Memfasilitasi panitia e-sports dalam membuka registrasi peserta turnamen game secara terstruktur dan terotomatisasi."
        },
        {
          id: 14,
          gambar: "agus.png",
          judul: "Pendaftaran Lomba 17 Agustus",
          parag: "Aplikasi registrasi perlombaan perayaan kemerdekaan lingkungan warga secara interaktif.",
          isComingSoon: false,
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://pendaftaran-lomba.vercel.app",
          linkCode: "https://github.com/rayyanbabab/aplikasi-pendaftaran-lomba-rw",
          features: ["Daftar Kategori Lomba", "Pendaftaran Peserta Cepat", "Jadwal & Bagan Perlombaan", "Papan Pemenang Juara"],
          overview: "Meriahkan perayaan kemerdekaan dengan sistem pendaftaran perlombaan warga yang rapi, cepat, dan transparan."
        }
      ]
    },

    // GitHub
    github: {
      title: "Aktivitas GitHub",
      badge: "Open Source & Kontribusi",
      totalContributions: "Total Kontribusi",
      currentStreak: "Streak Saat Ini",
      longestStreak: "Streak Terpanjang",
      days: "hari",
      less: "Sedikit",
      more: "Banyak",
      viewProfile: "Kunjungi Profil GitHub",
    },

    // WakaTime
    wakatime: {
      title: "Statistik Coding",
      badge: "Aktivitas Coding",
      subtitle: "Data aktivitas coding saya secara real-time dari WakaTime selama 7 hari terakhir.",
      last7Days: "7 hari terakhir",
      dailyAvg: "Rata-rata Harian",
      totalWeek: "Total Minggu Ini",
      bestDay: "Hari Terbaik",
      bestDayLabel: "Tanggal terbaik",
      topLanguages: "Bahasa Teratas",
      editors: "Editor",
      loading: "Memuat data coding...",
      viewProfile: "Lihat Profil WakaTime",
      privateNotice: "Profil WakaTime bersifat privat. Menampilkan chart publik.",
      enablePublic: "Aktifkan statistik publik di pengaturan WakaTime untuk melihat data lebih lengkap.",
      hrs: "jam",
      mins: "menit",
    },

    // Achievements
    achievements: {
      title: "Prestasi & Sertifikasi",
      certifications: "Sertifikasi",
      viewDetails: "Lihat Detail",
      tapToFlip: "Ketuk untuk membalik",
      certificateInfo: "Informasi Sertifikat",
      viewCertificate: "Buka Sertifikat",
      goBack: "Kembali",
      closeModal: "Tutup",
      previewTitle: "Pratinjau Sertifikat",
      zoomIn: "Perbesar",
      zoomOut: "Perkecil",
      resetZoom: "Reset Zoom",
      fitScreen: "Sesuaikan Layar",
      zoomHintDesktop: "Gulir mouse untuk zoom • Dobel-klik untuk reset • Geser untuk menggeser gambar",
      zoomHintMobile: "Cubit layar untuk zoom • Ketuk dua kali untuk zoom • Geser untuk menggeser gambar",
    },

    // Footer & Contact
    footer: {
      title: "Mari Berkolaborasi",
      subtitle: "Punya ide proyek menarik atau ingin berdiskusi? Jangan ragu untuk mengirimkan pesan.",
      badge: "Tersedia untuk freelance",
      letsConnect: "Mari Terhubung",
      subtext: "Punya proyek di benak kamu? Ayo bangun sesuatu yang luar biasa bersama.",
      sendMessage: "Kirim Pesan",
      replyTime: "Biasanya saya membalas dalam 24 jam.",
      yourName: "Nama Kamu",
      namePlaceholder: "Rayyan",
      yourEmail: "Email Kamu",
      emailPlaceholder: "kamu@contoh.com",
      message: "Pesan",
      messagePlaceholder: "Ceritakan tentang proyekmu, ide, atau sekedar menyapa...",
      detailedPrompt: "Ceritakan selengkap mungkin!",
      sendButton: "Kirim Pesan",
      sending: "Mengirim...",
      successMessage: "Pesan berhasil terkirim!",
      errorMessage: "Gagal mengirim pesan. Silakan coba lagi.",
      fillAllFields: "Harap isi semua kolom yang diperlukan.",
      projectsLabel: "Proyek",
      responseLabel: "Respons",
      locationLabel: "Lokasi",
      allRightsReserved: "Semua hak dilindungi.",
      form: {
        nameLabel: "Nama Lengkap",
        namePlaceholder: "Masukkan nama Anda",
        emailLabel: "Alamat Email",
        emailPlaceholder: "nama@domain.com",
        messageLabel: "Pesan Anda",
        messagePlaceholder: "Tuliskan pesan atau detail proyek Anda di sini...",
        sendButton: "Kirim Pesan",
        sendingButton: "Mengirim Pesan...",
        successMsg: "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi saya.",
        errorEmpty: "Mohon lengkapi seluruh formulir.",
        errorFailed: "Gagal mengirim pesan. Silakan coba lagi nanti.",
      },
      navigationTitle: "Navigasi",
      socialTitle: "Sosial Media",
      copyright: "Hak Cipta Dilindungi Undang-Undang.",
      designedBy: "Dibuat dengan sepenuh hati oleh",
    },

    // 404
    notFound: {
      title: "Halaman Tidak Ditemukan",
      description: "Oops.. Sepertinya fitur ini belum tersedia.",
      subtitle: "Maaf, halaman yang Anda tuju sedang dalam pengembangan atau tidak tersedia.",
      backHome: "Kembali lagi",
    }
  },

  en: {
    // Navbar
    nav: {
      home: "Home",
      about: "About Me",
      experiences: "Experiences",
      educations: "Educations",
      gallery: "Gallery",
      projects: "Featured Projects",
      github: "GitHub",
      wakatime: "WakaTime",
      achievements: "Achievements",
      contact: "Contact Me",
    },

    // Hero
    hero: {
      greeting: "Hi, I'm",
      roles: "Full Stack Developer - DevOps Engineer - UI/UX & Graphic Designer - Artist",
      photography: "Photography Enthusiast",
      quote: "“If you cannot stand the fatigue of learning, then you must stand the pain of ignorance.”",
      visitGithub: "Visit my GitHub",
      exploreWork: "Explore My Work",
      nowPlaying: "Now Playing",
      paused: "Paused",
      clickToPlay: "Click to play",
      clickToPause: "Click to pause",
    },

    // About
    about: {
      title: "About Me",
      role: "Full Stack Developer",
      bio1: "Hello! I am Rayyan Ammar Fadhillah, a Full Stack Developer with a passion for creating innovative and efficient digital solutions. With over 2 years of experience, I focus on building functional web applications with clean interfaces.",
      bio2: "I am currently 18 years old and studying Software Engineering at SMKS Telekomunikasi Telesandi Bekasi. I am also active in contributing to open-source projects to continuously hone my skills.",
      stats: {
        experience: "Experience",
        experienceVal: "2+ Years",
        location: "Location",
        locationVal: "Cibitung, Bekasi, ID",
        age: "Age",
        ageVal: "18 Years",
        status: "Status",
        statusVal: "Student",
      },
      downloadCv: "Download CV",
    },

    // TechStack
    techStack: {
      title: "Tech Stack",
      badge: "Skills & Tools",
      searchPlaceholder: "Search tech stack...",
      allCategory: "All",
      categories: {
        All: "All",
        Frontend: "Frontend",
        Backend: "Backend",
        Fullstack: "Fullstack",
        Language: "Language",
        Database: "Database",
        Tools: "Tools",
        DevOps: "DevOps",
        Cloud: "Cloud",
        Design: "Design",
      },
      levels: {
        Beginner: "Beginner",
        Intermediate: "Intermediate",
        Advanced: "Advanced",
      },
      searching: "Searching...",
      noResults: "No technologies found matching your criteria.",
    },

    // Experiences
    experiences: {
      title: "Work Experiences",
      badge: "Career & Roles",
      items: [
        {
          id: 1,
          role: "Full Stack Developer",
          company: "Freelance",
          type: "Contract",
          period: "2024 - Present",
          description: "Developing custom web applications, e-commerce platforms, and management systems for various local clients using React, Laravel, and Tailwind CSS.",
          skills: ["React", "Laravel", "MySQL", "Tailwind CSS", "Vite"]
        },
        {
          id: 2,
          role: "Full Stack Intern",
          company: "Tech Solutions",
          type: "Internship",
          period: "2025",
          description: "Contributed to building clinic ticketing systems and QR code attendance tracking software. Assisted in database design and server-side optimizations.",
          skills: ["PHP", "JavaScript", "TypeScript", "MySQL"]
        }
      ]
    },

    // Educations
    educations: {
      title: "Educations & Journey",
      badge: "Academic Background",
      currentBadge: "Now",
      items: [
        {
          year: "2007",
          title: "The Genesis",
          subtitle: "Birth",
          description: "The beginning of my life journey. The first page of a long and exciting story.",
          type: "milestone"
        },
        {
          year: "2014 - 2015",
          title: "TKIT Nurul Falah",
          subtitle: "Play & Learn Era",
          description: "Getting to know the world outside, learning to socialize, and building a foundation of character early on."
        },
        {
          year: "2015 - 2020",
          title: "SDIT Al-Fath Cibitung",
          subtitle: "Elementary School",
          description: "Six years of exploration. Learning discipline, responsibility, and the core fundamentals of science.",
          logo: "/img/alpat.png"
        },
        {
          year: "2020 - 2023",
          title: "SMPIT Ulil Albab",
          subtitle: "Self-Discovery",
          description: "Beginning to participate in organizations and discovering active interests in technology and sports.",
          logo: "/img/ulil.png",
          tags: ["English Club", "Futsal"]
        },
        {
          year: "2023 - 2026",
          title: "SMK Telekomunikasi Telesandi Bekasi",
          subtitle: "Software Engineering",
          description: "Stepping into the IT world. Learning coding, server management, and building a future career as a developer.",
          logo: "/img/tels.png",
          tags: ["Syntax", "Volly", "Futsal", "Football"]
        },
        {
          year: "2026 - Now",
          title: "ASTRA TECH",
          subtitle: "Applied Bachelor in Software Engineering",
          description: "Pursuing higher vocational education to deepen advanced software engineering skills, IT project management, and industrial-grade solution development.",
          logo: "/img/astra.jpg",
          current: true,
          tags: ["College", "Software Engineering", "Astra Tech"]
        }
      ]
    },

    // Gallery
    gallery: {
      title: "Gallery & Moments",
      badge: "Visual Stories",
      subtext: "A curated collection of snapshots, urban vistas, and memorable moments captured through my lens.",
      items: [
        { src: "/img/ist.png", title: "Interior View", description: "Istiqlal Mosque" },
        { src: "/img/mount.png", title: "Mountain View", description: "Prau Mountain" },
        { src: "/img/bis.png", title: "Sigma Cat", description: "The watcher of the void" },
        { src: "/img/senja.png", title: "Urban Life", description: "The Sunset" },
        { src: "/img/akt.png", title: "Euphoria", description: "Moments of joy" },
        { src: "/img/city.png", title: "Night Vibe", description: "City Light at Jakarta" }
      ]
    },

    // Projects
    projects: {
      title: "Featured Projects",
      badge: "Selected Work",
      viewDetails: "View Details",
      liveDemo: "Live Demo",
      viewCode: "View Code",
      caseStudy: "Case Study",
      overview: "Project Overview",
      keyFeatures: "Key Features",
      techUsed: "Technologies Used",
      comingSoon: "Coming Soon",
      closeModal: "Close",
      items: [
        {
          id: 1,
          gambar: "tiket.png",
          judul: "LonIk - Clinic Queuing",
          parag: "A web-based application designed to facilitate clinic ticketing and operations for hospitals.",
          tech: ["TypeScript", "Blade", "JavaScript", "PHP", "Vite"],
          linkDemo: "https://loket-klinik.vercel.app",
          linkCode: "https://github.com/rayyanbabab/Loket-klinik",
          features: ["Queue Ticket Issuing", "Active Counter Display", "Multi-counter Administration", "Real-time Queue Updates"],
          overview: "LonIk is designed for healthcare centers to manage daily patient flow. By digitalizing the ticket queue system, clinic operations become more organized and patient waiting times are significantly reduced."
        },
        {
          id: 2,
          gambar: "Artilia.png",
          judul: "Artilia Inventory",
          parag: "An enterprise web application for managing inventory and corporate assets efficiently.",
          tech: ["Laravel", "MySQL", "Tailwind", "Vite", "Blade"],
          linkDemo: "#",
          linkCode: "https://github.com/rayyanbabab/artilia",
          isComingSoon: false,
          features: ["Asset Registration & Tracking", "Low-Stock Notifications", "Role-based Administrative Access", "Historical Movement Audits"],
          overview: "Artilia Inventory provides corporations with complete visibility over their logistics and assets. It features interactive tables, stock monitoring indicators, and robust CRUD functionalities."
        },
        {
          id: 3,
          gambar: "islamicBot.png",
          judul: "Islamic Portal",
          parag: "A web application offering digital Al-Quran features, prayer times, and daily Islamic content.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://dev-islamic-ten.vercel.app",
          linkCode: "https://github.com/rayyanbabab/islamic",
          isComingSoon: false,
          features: ["Full Digital Surahs", "Active Prayer Times Scheduler", "Daily Hadith Feed", "Clean Modern UI"],
          overview: "A feature-rich web app for Muslim users containing digital Quran, automated offline prayer times calculation based on coordinates, and a collection of daily supplications."
        },
        {
          id: 4,
          gambar: "nextt.jpeg",
          judul: "Next Task",
          parag: "A minimalist project task organizer featuring kanban drag-and-drop boards and progress trackers.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://nexttask-livid.vercel.app",
          linkCode: "https://github.com/rayyanbabab/nextTask",
          isComingSoon: false,
          features: ["Kanban Task Board", "Task Priority Sorting", "Progress Completion Analytics", "Offline LocalStorage Backup"],
          overview: "Next Task is a daily productivity app designed to keep developer workflows structured. Users can easily group, drag, edit, and archive tasks to maintain peak output."
        },
        {
          id: 5,
          gambar: "absensi.png",
          judul: "Student QR Attendance",
          parag: "An administrative web application to track student attendance in real time using QR Codes.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "#",
          linkCode: "https://github.com/rayyanbabab/AbsensiQR",
          isComingSoon: false,
          features: ["QR Code Generator & Scanner", "Real-Time Log Updates", "CSV Data Export", "Student Administration Panel"],
          overview: "This web application simplifies tracking student attendance in educational institutions. Using generated QR codes on student IDs, teachers can quickly record entry and exit times."
        },
        {
          id: 6,
          gambar: "RuangGaya.png",
          judul: "RuangGaya",
          parag: "A modern, highly-responsive fashion e-commerce storefront featuring interactive product catalogs.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://ruanggaya.vercel.app",
          linkCode: "https://github.com/rayyanbabab/RuangGaya",
          isComingSoon: false,
          features: ["Dynamic Shopping Cart", "Interactive Product Detail Pages", "Sleek Filtering & Search", "Responsive Checkout Flow"],
          overview: "RuangGaya is a front-end showcase for a premium fashion boutique. Designed with sleek monochrome aesthetics, smooth transitions, and high-fidelity product layout systems."
        },
        {
          id: 7,
          gambar: "Al-quran.png",
          judul: "Al-Quran App",
          parag: "A clean digital Al-Quran platform providing full surah translations and audio recitation streaming.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://aplikasi-quran-eta.vercel.app",
          linkCode: "https://github.com/rayyanbabab/Al-Qu-ran-Digital",
          isComingSoon: false,
          features: ["Surah & Juz Categorization", "Multi-Translator Support", "Audio Reciters Streamer", "Bookmark & Last Read Tracker"],
          overview: "A fast, accessible digital companion for reading and listening to the Holy Al-Quran with clear typography and ad-free experience."
        },
        {
          id: 8,
          gambar: "Ngasir.png",
          judul: "Ngasir Apps",
          parag: "A lightweight POS (Point of Sale) cash register system optimized for small businesses.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://ngasir-ten.vercel.app",
          linkCode: "https://github.com/rayyanbabab/ngasir.git",
          isComingSoon: false,
          features: ["Product Inventory Tracker", "Dynamic Billing Calculator", "History Transaction Logger", "Printable Receipts Generation"],
          overview: "Ngasir is a web-based cashier tool designed to help micro-businesses run day-to-day sales transactions smoothly."
        },
        {
          id: 9,
          gambar: "kas.png",
          judul: "Kas RT Financial",
          parag: "An administrative web application to track neighborhood cash flow with transparent receipt logging.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://cash-flow-app-blond.vercel.app",
          linkCode: "https://github.com/rayyanbabab/cash-flow-app",
          isComingSoon: false,
          features: ["Income & Expense Tracking", "Monthly Balance Reporting", "Printable Transaction Logs", "Interactive Charts"],
          overview: "A financial tool built for local community administrators to report cash statements transparently to residents in real time."
        },
        {
          id: 10,
          gambar: "kampus.png",
          judul: "Campus Registration",
          parag: "A student registration portal featuring data submission forms and status check dashboards.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://student-portal-app-teal.vercel.app",
          linkCode: "https://github.com/rayyanbabab/aplikasi-pendaftaran-kampus",
          isComingSoon: false,
          features: ["Multi-step Admission Form", "Real-time Verification Status", "Dashboard Analytics", "PDF Admission Ticket Export"],
          overview: "This student portal simplifies the college registration workflow with dynamic application forms and document validation tracking."
        },
        {
          id: 11,
          gambar: "kegiatan sekolah.png",
          judul: "School Activities Portal",
          parag: "A school events portal designed to publish student schedules, activities, and extracurricular logs.",
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://sistem-kegiatan-sekolah-app.vercel.app",
          linkCode: "https://github.com/rayyanbabab/sistem-kegiatan-sekolah-app",
          isComingSoon: false,
          features: ["Dynamic Event Calendar", "Registration for Extra-curriculars", "Announcement Board", "Admin Event Scheduler"],
          overview: "A centralization hub for school activities allowing students to stay informed and register for various extracurricular activities."
        },
        {
          id: 12,
          gambar: "kataruma.png",
          judul: "Kataruma RW 10",
          parag: "A modern commercial laundry administration system to track orders, customers, and payments.",
          isComingSoon: false,
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://kataruma-rw-10.vercel.app",
          linkCode: "https://github.com/rayyanbabab/kataruma",
          features: ["Order Intake & Receipt Generator", "Automatic Price Calculator", "Customer Profile Manager", "WhatsApp Notification Integration"],
          overview: "Provides laundry businesses with an organized billing and intake workflow for both weight-based and piece-based orders."
        },
        {
          id: 13,
          gambar: "tur.png",
          judul: "Tournament Registration",
          parag: "An e-sports tournament registration platform with team slot management and match brackets.",
          isComingSoon: false,
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://online-tournament-registration.vercel.app",
          linkCode: "https://github.com/rayyanbabab/Tournament-Game",
          features: ["Team Registration & Roster", "Bracket Tracking", "Payment Proof Verification", "Match Notifications"],
          overview: "Streamlines tournament administration for organizers and competitive gaming teams with automatic registration workflows."
        },
        {
          id: 14,
          gambar: "agus.png",
          judul: "Independence Day Fest",
          parag: "A community festival contest registration application for neighborhood Independence Day events.",
          isComingSoon: false,
          tech: ["React", "Tailwind", "Framer Motion", "Vite"],
          linkDemo: "https://pendaftaran-lomba.vercel.app",
          linkCode: "https://github.com/rayyanbabab/aplikasi-pendaftaran-lomba-rw",
          features: ["Competition Category Listings", "Quick Participant Sign-up", "Schedule & Brackets", "Winner Leaderboard"],
          overview: "Powers local festivities with modern, hassle-free registrations and real-time announcements."
        }
      ]
    },

    // GitHub
    github: {
      title: "GitHub Contributions",
      badge: "Open Source & Activity",
      totalContributions: "Total Contributions",
      currentStreak: "Current Streak",
      longestStreak: "Longest Streak",
      days: "days",
      less: "Less",
      more: "More",
      viewProfile: "Visit GitHub Profile",
    },

    // WakaTime
    wakatime: {
      title: "Coding Stats",
      badge: "Coding Activity",
      subtitle: "My real-time coding activity from WakaTime over the last 7 days.",
      last7Days: "last 7 days",
      dailyAvg: "Daily Average",
      totalWeek: "Total This Week",
      bestDay: "Best Day",
      bestDayLabel: "Best date",
      topLanguages: "Top Languages",
      editors: "Editors",
      loading: "Loading coding data...",
      viewProfile: "View WakaTime Profile",
      privateNotice: "WakaTime profile is private. Showing public charts.",
      enablePublic: "Enable public stats in WakaTime settings to see full data.",
      hrs: "hrs",
      mins: "mins",
    },

    // Achievements
    achievements: {
      title: "Achievements & Certifications",
      certifications: "Certifications",
      viewDetails: "View Details",
      tapToFlip: "Tap to flip",
      certificateInfo: "Certificate Info",
      viewCertificate: "View Certificate",
      goBack: "Go Back",
      closeModal: "Close",
      previewTitle: "Certificate Preview",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      resetZoom: "Reset Zoom",
      fitScreen: "Fit to screen",
      zoomHintDesktop: "Scroll to zoom • Double-click to toggle zoom • Drag to pan",
      zoomHintMobile: "Pinch to zoom • Double-tap to toggle • Drag to pan",
    },

    // Footer & Contact
    footer: {
      title: "Let's Collaborate",
      subtitle: "Have a project in mind or just want to chat? Feel free to reach out and drop a message.",
      badge: "Available for freelance",
      letsConnect: "Let's Connect",
      subtext: "Have a project in mind? Let's build something extraordinary together.",
      sendMessage: "Send a Message",
      replyTime: "I usually reply within 24 hours.",
      yourName: "Your Name",
      namePlaceholder: "Rayyan",
      yourEmail: "Your Email",
      emailPlaceholder: "you@example.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project, idea, or just say hi...",
      detailedPrompt: "Be as detailed as you like!",
      sendButton: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully!",
      errorMessage: "Failed to send message. Please try again.",
      fillAllFields: "Please fill in all required fields.",
      projectsLabel: "Projects",
      responseLabel: "Response",
      locationLabel: "Location",
      allRightsReserved: "All rights reserved.",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "Enter your full name",
        emailLabel: "Your Email",
        emailPlaceholder: "you@example.com",
        messageLabel: "Your Message",
        messagePlaceholder: "Write your message or project details here...",
        sendButton: "Send Message",
        sendingButton: "Sending Message...",
        successMsg: "Message sent successfully! Thank you for reaching out.",
        errorEmpty: "Please fill in all required fields.",
        errorFailed: "Failed to send message. Please try again later.",
      },
      navigationTitle: "Navigation",
      socialTitle: "Socials",
      copyright: "All Rights Reserved.",
      designedBy: "Designed & built with passion by",
    },

    // 404
    notFound: {
      title: "Page Not Found",
      description: "Oops.. It seems this feature is not yet available.",
      subtitle: "Sorry, the page you are looking for is currently under construction or does not exist.",
      backHome: "Go back",
    }
  }
};
