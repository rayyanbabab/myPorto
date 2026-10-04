import React, { useEffect, useRef, useState } from 'react';
import portfolioOrbitCards from '../../data/portfolioOrbitCards';
import { useLanguage } from '../../context/LanguageContext';

const CARD_W = 92;
const CARD_H = 128;

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

export default function HeroOrbitCards({
  cards = portfolioOrbitCards,
  mode = 'scroll',
  onCardClick = null,
  theme = 'original',
  className = '',
  overlay = null, // slot untuk pill/kontrol yang dirender di dalam sticky viewport
}) {
  const { t, isId } = useLanguage();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const introRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);

  const [activeCard, setActiveCard] = useState(null);
  const n = cards.length;

  const isDark = theme === 'dark';

  const formatCategory = (cat) => {
    if (!isId || !cat) return cat;
    const map = {
      'Photography': 'Fotografi',
      'Web Application': 'Aplikasi Web',
      'Web App': 'Aplikasi Web',
      'Fullstack Web': 'Web Fullstack',
      'Desktop & Web': 'Desktop & Web',
      'Bot & Automation': 'Bot & Otomasi',
      'Frontend App': 'Aplikasi Frontend',
      'Fullstack System': 'Sistem Fullstack',
      'Web Platform': 'Platform Web',
      'Landing Page': 'Halaman Landing',
      'Creative Design': 'Desain Kreatif',
    };
    return map[cat] || cat;
  };

  const formatSubtitle = (sub) => {
    if (!isId || !sub) return sub;
    const map = {
      'City Lights': 'Pemandangan Kota',
      'Nature & Landscape': 'Alam & Lanskap',
      'Interior Design': 'Desain Interior',
      'Golden Hour': 'Momen Senja',
      'Creative Shot': 'Foto Kreatif',
      'Event Captures': 'Dokumentasi Acara',
      'View': 'Lihat',
    };
    return map[sub] || sub;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || n === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let phase = mode === 'static-arc' || reduced ? 'circle' : 'scatter';
    let width = stage.clientWidth || window.innerWidth;
    let height = stage.clientHeight || window.innerHeight;
    let morph = mode === 'static-arc' || reduced ? 1 : 0;
    let shuffle = 0;
    let mouse = 0;
    let mouseTarget = 0;
    let frame = 0;

    // Posiciones de dispersión iniciales (Scatter 3D)
    const scatter = cards.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      r: (Math.random() - 0.5) * 180,
      s: 0.6,
      o: 0,
    }));
    const current = scatter.map((p) => ({ ...p }));

    const target = (i) => {
      // 1. Static Arc Mode (langsung busur melengkung anggun dan terangkat)
      if (mode === 'static-arc') {
        const arcRadius = Math.max(width * 1.05, height * 1.45);
        const apexY = height * 0.07;
        const spread = Math.min(115, Math.max(85, width / 13));
        const step = spread / (n - 1);
        const aa = -90 - spread / 2 + i * step;
        const ar = (aa * Math.PI) / 180;
        return {
          x: Math.cos(ar) * arcRadius + mouse,
          y: Math.sin(ar) * arcRadius + apexY + arcRadius,
          r: aa + 90,
          s: 1.42,
          o: 1,
        };
      }

      // 2. Scatter Phase
      if (phase === 'scatter') return scatter[i];

      // 3. Line Phase
      if (phase === 'line') {
        const spacing = Math.min(CARD_W + 10, (width * 0.92) / n);
        return {
          x: (i - (n - 1) / 2) * spacing,
          y: 0,
          r: 0,
          s: 1,
          o: 1,
        };
      }

      // 4. Circle Phase (kartu melingkar mengelilingi teks intro)
      const radius = Math.min(Math.min(width, height) * 0.34, 300);
      const ca = (i / n) * 360;
      const cr = (ca * Math.PI) / 180;
      const circle = {
        x: Math.cos(cr) * radius,
        y: Math.sin(cr) * radius,
        r: ca + 90,
      };

      // 5. Arc Phase (busur pelangi estetis Purpuratta, diangkat naik anggun di atas batas bawah layar)
      const arcRadius = Math.max(width * 1.05, height * 1.45);
      const apexY = height * 0.07;
      const spread = Math.min(115, Math.max(85, width / 13));
      const step = spread / (n - 1);
      const shuffleOffset = (shuffle - 0.5) * spread * 0.35;
      const aa = -90 - spread / 2 + i * step - shuffleOffset;
      const ar = (aa * Math.PI) / 180;
      const arc = {
        x: Math.cos(ar) * arcRadius + mouse,
        y: Math.sin(ar) * arcRadius + apexY + arcRadius,
        r: aa + 90,
      };

      // Putaran terpendek antara pose lingkaran dan busur
      const fromR = arc.r + ((((circle.r - arc.r) % 360) + 540) % 360) - 180;

      return {
        x: lerp(circle.x, arc.x, morph),
        y: lerp(circle.y, arc.y, morph),
        r: lerp(fromR, arc.r, morph),
        s: lerp(1, 1.42, morph),
        o: 1,
      };
    };

    const readScroll = () => {
      if (mode === 'static-arc') {
        morph = 1;
        return;
      }
      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      const p = range > 0 ? clamp(-rect.top / range) : 0;
      if (!reduced) {
        morph = ease(clamp(p / 0.36));
        shuffle = clamp((p - 0.36) / 0.64);
        if (p > 0.02 && phase !== 'circle') phase = 'circle';
      }
    };

    const render = () => {
      frame = 0;
      readScroll();
      mouse = lerp(mouse, mouseTarget, 0.08);
      let moving = Math.abs(mouse - mouseTarget) > 0.5;
      const k = reduced ? 1 : 0.075;

      for (let i = 0; i < n; i++) {
        const t = target(i);
        const c = current[i];
        c.x = lerp(c.x, t.x, k);
        c.y = lerp(c.y, t.y, k);
        c.r = lerp(c.r, t.r, k);
        c.s = lerp(c.s, t.s, k);
        c.o = lerp(c.o, t.o, k);

        if (
          Math.abs(c.x - t.x) + Math.abs(c.y - t.y) + Math.abs(c.r - t.r) > 0.3 ||
          Math.abs(c.o - t.o) > 0.01
        ) {
          moving = true;
        }

        const el = cardRefs.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate3d(${c.x}px, ${c.y}px, 0) rotate(${c.r}deg) scale(${c.s})`;
          el.style.opacity = String(c.o);
        }
      }

      // Animasi teks: intro terlihat saat posisi lingkaran, konten utama muncul saat busur terbentuk
      if (mode !== 'static-arc') {
        const introO = phase === 'circle' ? clamp(1 - morph * 2.2) : 0;
        if (introRef.current) {
          introRef.current.style.opacity = String(introO);
          introRef.current.style.filter = `blur(${(1 - introO) * 8}px)`;
        }
        if (contentRef.current) {
          const co = clamp((morph - 0.72) / 0.28);
          contentRef.current.style.opacity = String(co);
          contentRef.current.style.transform = `translateY(${(1 - co) * 20}px)`;
          contentRef.current.style.pointerEvents = co > 0.5 ? 'auto' : 'none';
        }
        if (hintRef.current) {
          hintRef.current.style.opacity = String(phase === 'circle' ? clamp(0.7 - morph * 2) : 0);
        }
      }

      if (moving) frame = requestAnimationFrame(render);
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onResize = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      kick();
    };

    const onMouse = (e) => {
      const rect = stage.getBoundingClientRect();
      mouseTarget = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * 60 * morph;
      kick();
    };

    let timers = [];
    let hasStarted = false;

    const startEntrance = () => {
      if (hasStarted) return;
      hasStarted = true;
      if (!reduced && mode !== 'static-arc') {
        timers.push(
          window.setTimeout(() => {
            if (phase === 'scatter') phase = 'line';
            kick();
          }, 250),
          window.setTimeout(() => {
            phase = 'circle';
            kick();
          }, 1100)
        );
      }
      kick();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          startEntrance();
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    stage.addEventListener('mousemove', onMouse);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      stage.removeEventListener('mousemove', onMouse);
    };
  }, [cards, n, mode]);

  return (
    <section
      ref={sectionRef}
      aria-label="Work Showcase Orbit"
      className={`relative ${
        mode === 'scroll' ? 'h-[300vh]' : 'h-screen min-h-[700px]'
      } ${className}`}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Sticky Stage Container — background solid mencegah section lain tembus */}
      <div
        className={`sticky top-0 h-screen w-full overflow-hidden transition-colors duration-500 ${
          isDark
            ? 'bg-[#040507] text-[#f1ede6]'
            : 'bg-[#f8fafc] text-[#0f172a]'
        }`}
      >
        <div
          ref={stageRef}
          className="relative h-full w-full overflow-hidden [perspective:1000px]"
        >
          {/* Teks di tengah ring kartu */}
          <div
            ref={introRef}
            className={`pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity ${
              mode === 'static-arc' ? '!hidden' : ''
            }`}
            style={{ paddingBottom: '8vh' }}
          >
            <p
              className={`text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] font-bold tracking-tight ${
                isDark ? 'text-white/90' : 'text-[#0f172a]'
              }`}
            >
              {t.orbit?.introTitle1 || "Things I’ve"}
              <br />
              <span
                className={`font-black ${
                  isDark
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                }`}
              >
                {t.orbit?.introTitle2 || "built & captured."}
              </span>
            </p>
            <p className={`mt-2 text-[13px] md:text-[14px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {t.orbit?.introHover || "Hover a card to preview"}
            </p>
          </div>

          {/* Hint Scroll */}
          <p
            ref={hintRef}
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-8 left-1/2 z-0 -translate-x-1/2 text-[11px] md:text-[12px] font-medium tracking-[0.18em] uppercase opacity-0 transition-opacity ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            } ${mode === 'static-arc' ? '!hidden' : ''}`}
          >
            {t.orbit?.scrollHint || "↓ Scroll to explore"}
          </p>

          {/* Konten saat busur/arc terbentuk */}
          <div
            ref={contentRef}
            className={`pointer-events-none absolute inset-x-0 top-20 md:top-24 z-20 flex flex-col items-center px-6 text-center ${
              mode === 'static-arc'
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0'
            }`}
          >
            <p
              className={`text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase mb-3 ${
                isDark ? 'text-cyan-400' : 'text-blue-600'
              }`}
            >
              {t.orbit?.badge || "Web · Apps · Photography · Design"}
            </p>

            <h2
              className={`text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-[1.1] font-serif font-normal max-w-3xl ${
                isDark ? 'text-white' : 'text-[#0f172a]'
              }`}
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
            >
              {t.orbit?.title || "Projects & creative work, all in one place"}
            </h2>

            <p
              className={`mt-3 max-w-lg text-[14px] md:text-[15px] font-light leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {t.orbit?.description || "A collection of fullstack web apps, UI/UX designs, and photography moments — hover any card to see details."}
            </p>

            {/* CTA Buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#projects"
                className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-7 rounded-full text-[12px] font-semibold tracking-wide transition-all shadow-lg ${
                  isDark
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
                }`}
              >
                {t.orbit?.viewProjects || "View Projects"}
              </a>

              <a
                href="#gallery"
                className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full text-[12px] font-semibold tracking-wide backdrop-blur-md border transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10 hover:text-white'
                    : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                {t.orbit?.seeGallery || "See Gallery"}
              </a>
            </div>
          </div>

          {/* 3. Lapisan Kartu 3D (Screenshots 1, 2, 3, 4, 5) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {cards.map((p, i) => (
              <div
                key={p.slug || i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onClick={() => {
                  setActiveCard(p);
                  if (onCardClick) onCardClick(p);
                }}
                tabIndex={-1}
                aria-hidden="true"
                className="group absolute top-1/2 left-1/2 opacity-0 cursor-pointer pointer-events-auto will-change-transform [transform-style:preserve-3d]"
                style={{ width: CARD_W, height: CARD_H }}
              >
                {/* 3D Flip Card Container */}
                <span className="relative block size-full transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Depan (Front Image) */}
                  <span
                    className={`absolute inset-0 overflow-hidden rounded-xl shadow-[0_10px_24px_-12px_rgba(28,26,24,.45)] [backface-visibility:hidden] ${
                      isDark ? 'bg-stone-900 border border-white/10' : 'bg-[#efe6da]'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.displayName || ''}
                      className="size-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                  </span>

                  {/* Belakang (Backface Detail) */}
                  <span className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2 text-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] ${isDark ? 'bg-slate-900/95 border-white/10 backdrop-blur-lg' : 'bg-white/95 border-slate-200 backdrop-blur-lg'}`}>
                    <span className={`text-[7px] font-bold tracking-[0.22em] uppercase ${isDark ? 'text-cyan-400' : 'text-blue-500'}`}>
                      {formatCategory(p.category)}
                    </span>
                    <span
                      className={`text-[10px] leading-tight font-semibold line-clamp-2 px-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
                    >
                      {p.displayName}
                    </span>
                    <span className={`text-[9px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {formatSubtitle(p.price)}
                    </span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup ketika kartu diklik */}
      {activeCard && (
        <div
          onClick={() => setActiveCard(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative max-w-xs w-full rounded-2xl overflow-hidden shadow-2xl p-5 border ${
              isDark
                ? 'bg-slate-900 border-white/10 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <button
              onClick={() => setActiveCard(null)}
              className={`absolute top-3 right-3 text-lg p-1 transition-opacity opacity-50 hover:opacity-100 ${
                isDark ? 'text-white' : 'text-slate-700'
              }`}
            >
              ✕
            </button>
            <div className={`aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <img
                src={activeCard.image}
                alt={activeCard.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? 'text-cyan-400' : 'text-blue-500'}`}>
              {formatCategory(activeCard.category)}
            </span>
            <h3 className={`text-base font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {activeCard.displayName}
            </h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {formatSubtitle(activeCard.price)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
