

const navlinks = [
  {
    id: 1,
    text: "Home",
    link: "#home"
  },
  {
    id: 2,
    text: "About Me",
    link: "#about"
  },
  {
    id: 3,
    text: "Experiences",
    link: "#experiences"
  },
  {
    id: 4,
    text: "Educations",
    link: "#educations"
  },
  {
    id: 5,
    text: "Gallery",
    link: "#gallery"
  },
  {
    id: 6,
    text: "Featured Projects",
    link: "#projects"
  },
  {
    id: 7,
    text: "GitHub",
    link: "#github"
  },
  {
    id: 8,
    text: "Achievements",
    link: "#achievements"
  },
  {
    id: 9,
    text: "Contact Me",
    link: "#contact"
  },
]

const GITHUB_USERNAME = "rayyanbabab";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const techstack = [
  {
    id: 1,
    src: "Frame-1.png"
  },

  {
    id: 2,
    src: "Frame-2.png"
  },

  {
    id: 3,
    src: "Frame-3.png"
  },

  {
    id: 4,
    src: "Frame-4.png"
  },

  {
    id: 5,
    src: "Frame-5.png"
  },

  {
    id: 6,
    src: "Frame-6.png"
  },

  {
    id: 7,
    src: "Frame-7.png"
  },

  {
    id: 8,
    src: "Frame-8.png"
  },

  {
    id: 9,
    src: "Frame-9.png"
  },

  {
    id: 10,
    src: "Frame-10.png"
  },

  {
    id: 11,
    src: "Frame-11.png"
  },

  {
    id: 12,
    src: "Frame-12.png"
  },

  {
    id: 13,
    src: "Frame-13.png"
  },

  {
    id: 14,
    src: "Frame-14.png"
  },

  {
    id: 15,
    src: "Frame-15.png"
  },

  {
    id: 16,
    src: "Frame-16.png"
  },

  {
    id: 17,
    src: "Frame-17.png"
  },

  {
    id: 18,
    src: "Frame-18.png"
  },

  {
    id: 19,
    src: "Frame.png"
  },

  {
    id: 20,
    src: "Vector.png"
  },
]

const projectsData = [
  {
    id: 1,
    gambar: "tiket.png",
    judul: "LonIk",
    parag: "LonIk is a web-based application designed to facilitate clinic ticketing and operations for hospitals.",
    tech: ["TypeScript", "Blade", "JavaScript", "PHP", "Vite"],
    linkDemo: "#",
    linkCode: "https://github.com/rayyanbabab/Loket-klinik",
    features: ["Queue Ticket Issuing", "Active Counter Display", "Multi-counter Administration", "Real-time Queue Updates"],
    overview: "LonIk is designed for healthcare centers to manage daily patient flow. By digitalizing the ticket queue system, clinic operations become more organized and patient waiting times are significantly reduced."
  },

  {
    id: 2,
    gambar: "Artilia.png",
    judul: "artilia inventory",
    parag: "Artilia Inventory is an application for managing inventory and assets in a company efficiently.",
    tech: ["Laravel", "MySQL", "Tailwind", "Vite", "Blade"],
    linkDemo: "#",
    linkCode: "https://github.com/rayyanbabab/artilia",
    isComingSoon: false,
    features: ["Asset Registration & Tracking", "Low-Stock Notifications", "Role-based Administrative Access", "Historical Movement Audits"],
    overview: "Artilia Inventory provides corporations with complete visibility over their logistics and assets. It features interactive tables, stock monitoring indicators, and robust CRUD functionalities to manage equipment lifecycle."
  },

  {
    id: 3,
    gambar: "islamicBot.png",
    judul: "islamic",
    parag: "A web application offering digital Al-Quran features, prayer times, and daily Islamic content to support daily worship.",
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
    judul: "next task",
    parag: "A minimalist project task organizer featuring kanban drag-and-drop boards, task prioritization tags, and progress trackers.",
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
    judul: "absensi siswa QR Code",
    parag: "An administrative web application to track student attendance in real time using scan QR Codes, streamlining school presence logs.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "#",
    linkCode: "https://github.com/rayyanbabab/AbsensiQR",
    isComingSoon: false,
    features: ["QR Code Generator & Scanner", "Real-Time Log Updates", "CSV Data Export", "Student Administration Panel"],
    overview: "This web application simplifies tracking student attendance in educational institutions. Using generated QR codes on student IDs, teachers can quickly record entry and exit times, and compile monthly statistics easily."
  },

  {
    id: 6,
    gambar: "RuangGaya.png",
    judul: "RuangGaya",
    parag: "A modern, highly-responsive fashion e-commerce storefront featuring interactive product catalogs and clothing customization previews.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://ruanggaya.vercel.app",
    linkCode: "https://github.com/rayyanbabab/RuangGaya",
    isComingSoon: false,
    features: ["Dynamic Shopping Cart", "Interactive Product Detail Pages", "Sleek Filtering & Search", "Responsive Checkout Flow"],
    overview: "RuangGaya is a front-end showcase for a premium fashion boutique. Designed with sleek monochrome aesthetics, smooth transitions, and high-fidelity product layout systems to provide a premium shopping experience."
  },

  {
    id: 7,
    gambar: "Al-quran.png",
    judul: "Al-Quran App",
    parag: "A clean digital Al-Quran platform providing full surah translations, audio recitation streaming, and custom reading bookmark tools.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://aplikasi-quran-eta.vercel.app",
    linkCode: "https://github.com/rayyanbabab/Al-Qu-ran-Digital",
    isComingSoon: false,
    features: ["Surah & Juz Categorization", "Multi-Translator Support", "Audio Reciters Streamer", "Bookmark & Last Read Tracker"],
    overview: "A fast, accessible digital companion for reading and listening to the Holy Al-Quran. It leverages open-source APIs to deliver clear text, translations, and high-quality audio files with an ad-free user interface."
  },

  {
    id: 8,
    gambar: "Ngasir.png",
    judul: "Ngasir Apps",
    parag: "A lightweight POS (Point of Sale) cash register system optimized for small businesses to manage sales, products, and checkout logs.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://ngasir-ten.vercel.app",
    linkCode: "https://github.com/rayyanbabab/ngasir.git",
    isComingSoon: false,
    features: ["Product Inventory Tracker", "Dynamic Billing Calculator", "History Transaction Logger", "Printable Receipts Generation"],
    overview: "Ngasir is a web-based cashier tool designed to help micro-businesses run day-to-day sales transactions. It is designed to be highly intuitive, enabling fast billing, automatic stock reductions, and sales summary reports."
  },

  {
    id: 9,
    gambar: "kas.png",
    judul: "Kas RT",
    parag: "An administrative web application to track neighborhood cash flow (Kas RT) with transparent receipt logging.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://cash-flow-app-blond.vercel.app",
    linkCode: "https://github.com/rayyanbabab/cash-flow-app",
    isComingSoon: false,
    features: ["Income & Expense Tracking", "Monthly Balance Reporting", "Printable Transaction Logs", "Interactive Charts"],
    overview: "A financial tool built for local community administrators (RT) to report cash statements transparently. Members can view balance logs, category summaries, and monthly statements in real time."
  },

  {
    id: 10,
    gambar: "kampus.png",
    judul: "Campus Registration",
    parag: "A student registration portal featuring data submission forms, status check dashboards, and intake tracking.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://student-portal-app-teal.vercel.app",
    linkCode: "https://github.com/rayyanbabab/aplikasi-pendaftaran-kampus",
    isComingSoon: false,
    features: ["Multi-step Admission Form", "Real-time Verification Status", "Dashboard Analytics", "PDF Admission Ticket Export"],
    overview: "This student portal simplifies the college registration workflow. Applicants can submit document scans, monitor their review status, and receive registration credentials dynamically."
  },

  {
    id: 11,
    gambar: "kegiatan sekolah.png",
    judul: "Sistem aplikasi kegiatan sekolah",
    parag: "A school events portal designed to publish student schedules, activities, and extracurricular registration logs.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://sistem-kegiatan-sekolah-app.vercel.app",
    linkCode: "https://github.com/rayyanbabab/sistem-kegiatan-sekolah-app",
    isComingSoon: false,
    features: ["Dynamic Event Calendar", "Registration for Extra-curriculars", "Announcement Board", "Admin Event Scheduler"],
    overview: "A centralization hub for secondary school activities. Students can browse up-coming events, sign up for programs, and get notifications regarding schedule updates."
  },

  {
    id: 12,
    gambar: "coming-soon.png",
    judul: "LaundryApp",
    parag: "A modern commercial laundry service administration system to track orders, customers, and payment statuses.",
    isComingSoon: true,
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "#",
    linkCode: "#",
    features: ["Order Intake & Receipt Generator", "Automatic Price Calculator", "Customer Profile Manager", "WhatsApp Notification Integration"],
    overview: "LaundryApp provides small laundry businesses with a clear billing system. Operators can register weight or piece orders, track wash/dry/iron steps, and update status instantly."
  }
]

const dataCerti = [
  {
    id: 1,
    gambar: "machung.webp",
    judul: "Junior Web Developer - BNSP",
    link: "https://drive.google.com/drive/folders/1lQhCp73UNCH-Ky69UEpVG6vwcLmMPa2v"
  },

  {
    id: 2,
    gambar: "machung.webp",
    judul: "Responsive Web Design - freeCodeCamp",
    link: "https://drive.google.com/drive/folders/1lQhCp73UNCH-Ky69UEpVG6vwcLmMPa2v"
  },

  {
    id: 3,
    gambar: "machung.webp",
    judul: "JavaScript Algorithms & Data Structures - freeCodeCamp",
    link: "https://drive.google.com/drive/folders/1lQhCp73UNCH-Ky69UEpVG6vwcLmMPa2v"
  },

  {
    id: 4,
    gambar: "machung.webp",
    judul: "IT Support Professional Certificate - Google",
    link: "https://drive.google.com/drive/folders/1lQhCp73UNCH-Ky69UEpVG6vwcLmMPa2v"
  }
];
const experiencesData = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Freelance",
    type: "Contract",
    period: "2024 - Present",
    description: "Developing custom web applications, e-commerce platforms, and management systems for various local clients using React, Laravel, and Tailwind CSS.",
    skills: ["React", "Laravel", "MySQL", "Tailwind CSS", "Vite"],
    logo: "/img/freelance.png"
  },
  {
    id: 2,
    role: "Full Stack Intern",
    company: "Tech Solutions",
    type: "Internship",
    period: "2025",
    description: "Contributed to building clinic ticketing systems and QR code attendance tracking software. Assisted in database design and server-side optimizations.",
    skills: ["PHP", "JavaScript", "TypeScript", "MySQL"],
    logo: "/img/internship.png"
  }
];

export { navlinks, techstack, projectsData, dataCerti, experiencesData, GITHUB_USERNAME, GITHUB_PROFILE_URL }

