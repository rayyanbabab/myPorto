import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroOrbitCards from './ui/HeroOrbitCards';
import defaultOrbitCards from '../data/orbitCardsData';
import { ArrowLeft, RefreshCw, Sparkles, Moon, Sun } from 'lucide-react';

export default function OrbitDemo() {
  const [mode, setMode] = useState('scroll');
  const [themeMode, setThemeMode] = useState('original'); // 'original' (#f7f2ec) or 'dark' (#07090e)

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        themeMode === 'original'
          ? 'bg-[#f7f2ec] text-[#3b2a22]'
          : 'bg-[#06080d] text-slate-100'
      }`}
    >
      {/* Top Floating Control Bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full backdrop-blur-xl border border-white/20 bg-white/70 dark:bg-black/60 shadow-lg text-xs font-medium">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Kembali</span>
        </Link>

        <div className="h-4 w-[1px] bg-slate-400/30" />

        {/* Mode Toggle */}
        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full">
          <button
            onClick={() => setMode('scroll')}
            className={`px-3 py-1 rounded-full transition-all ${
              mode === 'scroll'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Scroll Morphing
          </button>
          <button
            onClick={() => setMode('static-arc')}
            className={`px-3 py-1 rounded-full transition-all ${
              mode === 'static-arc'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Static Arc
          </button>
        </div>

        <div className="h-4 w-[1px] bg-slate-400/30" />

        {/* Theme Toggle */}
        <button
          onClick={() => setThemeMode(themeMode === 'original' ? 'dark' : 'original')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:opacity-80 transition-opacity"
          title="Ganti Tema"
        >
          {themeMode === 'original' ? (
            <>
              <Moon size={14} />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <Sun size={14} />
              <span>Original Cream</span>
            </>
          )}
        </button>
      </nav>

      {/* Main Orbit Cards Component */}
      <HeroOrbitCards
        key={`${mode}-${themeMode}`}
        mode={mode}
        theme={themeMode}
        cards={defaultOrbitCards}
      />

      {/* Additional Section below in scroll mode */}
      {mode === 'scroll' && (
        <section className="py-24 px-6 max-w-5xl mx-auto text-center border-t border-black/10 dark:border-white/10">
          <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            Komponen Siap Digunakan
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold mt-2 mb-4">
            Animasi Kartu Melengkung (Hero Orbit) Berhasil Diekstrak
          </h3>
          <p className="max-w-2xl mx-auto text-sm opacity-80 mb-8">
            Semua aset gambar WebP asli dari repository <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-xs">ecommerceunificado</code> telah disimpan ke dalam folder <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-xs">public/orbit-cards/</code> dan siap dipakai untuk portofolio maupun proyek lainnya.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors shadow-md"
            >
              Kembali ke Portofolio
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
