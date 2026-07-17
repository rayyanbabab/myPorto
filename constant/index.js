

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
    text: "Gallery",
    link: "#gallery"
  },
  {
    id: 4,
    text: "Educations",
    link: "#educations"
  },
  {
    id: 5,
    text: "Featured Projects",
    link: "#projects"
  },
  {
    id: 6,
    text: "GitHub",
    link: "#github"
  },
  {
    id: 7,
    text: "Achievements",
    link: "#achievements"
  },
  {
    id: 8,
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
    linkCode: "https://github.com/rayyanbabab/Loket-klinik"
  },

  {
    id: 2,
    gambar: "Artilia.png",
    judul: "artilia inventory",
    parag: "Artilia Inventory is an application for managing inventory and assets in a company efficiently.",
    tech: ["Laravel", "MySQL", "Tailwind", "Vite", "Blade"],
    linkDemo: "#",
    linkCode: "https://github.com/rayyanbabab/artilia",
    isComingSoon: false
  },

  {
    id: 3,
    gambar: "islamicBot.png",
    judul: "islamic",
    parag: "A web application offering digital Al-Quran features, prayer times, and daily Islamic content to support daily worship.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://dev-islamic-ten.vercel.app",
    linkCode: "https://github.com/rayyanbabab/islamic",
    isComingSoon: false
  },
  {
    id: 4,
    gambar: "nextt.jpeg",
    judul: "next task",
    parag: "Application designed to track fictional character birthdays, featuring real-time countdowns, a dynamic roster, and QR code sharing capabilities. ",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://nexttask-livid.vercel.app",
    linkCode: "https://github.com/rayyanbabab/nextTask",
    isComingSoon: false
  },

  {
    id: 5,
    gambar: "absensi.png",
    judul: "absensi siswa QR Code",
    parag: "Application designed to track fictional character birthdays, featuring real-time countdowns, a dynamic roster, and QR code sharing capabilities. ",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "#",
    linkCode: "https://github.com/rayyanbabab/AbsensiQR",
    isComingSoon: false
  },

  {
    id: 6,
    gambar: "RuangGaya.png",
    judul: "RuangGaya",
    parag: "Application designed to track fictional character birthdays, featuring real-time countdowns, a dynamic roster, and QR code sharing capabilities. ",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://ruanggaya.vercel.app",
    linkCode: "https://github.com/rayyanbabab/RuangGaya",
    isComingSoon: false
  },

  {
    id: 7,
    gambar: "Al-quran.png",
    judul: "Al-Quran App",
    parag: "Application designed to track fictional character birthdays, featuring real-time countdowns, a dynamic roster, and QR code sharing capabilities. ",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "aplikasi-quran-eta.vercel.app",
    linkCode: "https://github.com/rayyanbabab/Al-Qu-ran-Digital",
    isComingSoon: false
  },

  {
    id: 8,
    gambar: "Ngasir.png",
    judul: "Ngasir Apps",
    parag: "Application designed to track fictional character birthdays, featuring real-time countdowns, a dynamic roster, and QR code sharing capabilities. ",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://ngasir-ten.vercel.app",
    linkCode: "https://github.com/rayyanbabab/ngasir.git",
    isComingSoon: false
  },

  {
    id: 9,
    gambar: "kas.png",
    judul: "Kas RT",
    parag: "Cash Flow Apps",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "https://cash-flow-app-blond.vercel.app",
    linkCode: "https://github.com/rayyanbabab/cash-flow-app",
    isComingSoon: false
  },

   {
    id: 10,
    gambar: "kampus.png",
    judul: "Campus Registration",
    parag: "Campus Registration Apps",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "student-portal-app-teal.vercel.app",
    linkCode: "https://github.com/rayyanbabab/aplikasi-pendaftaran-kampus",
    isComingSoon: false
  },

  {
    id: 11,
    gambar: "kegiatan sekolah.png",
    judul: "Sistem aplikasi kegiatan sekolah",
    parag: "aplikasi kegiatan sekolah",
    tech: ["React", "Tailwind", "Framer Motion", "Vite"],
    linkDemo: "sistem-kegiatan-sekolah-app.vercel.app",
    linkCode: "https://github.com/rayyanbabab/sistem-kegiatan-sekolah-app",
    isComingSoon: false
  },

  {
    id: 12,
    gambar: "coming-soon.png",
    judul: "LaundryApp",
    parag: "Coming soon",
    isComingSoon: true
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
  },
]
export { navlinks, techstack, projectsData, dataCerti, GITHUB_USERNAME, GITHUB_PROFILE_URL }

