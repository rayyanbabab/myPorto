import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Folder, X, ZoomIn, Eye, Sparkles } from 'lucide-react';

export default function JourneyArchiveFolder({
  year = '2025',
  title = 'Project Documentation',
  photos = [
    { src: '/img/tiket.png', title: 'Clinic Ticketing System' },
    { src: '/img/ukom.jpeg', title: 'Uji Kompetensi Keahlian' },
    { src: '/img/absensi.png', title: 'QR Attendance App' },
  ],
  isLight = false,
  className = '',
}) {
  const { isId } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Safe fallback if photos array is shorter
  const p1 = photos[0] || { src: '/img/tiket.png', title: 'Project 1' };
  const p2 = photos[1] || { src: '/img/ukom.jpeg', title: 'Project 2' };
  const p3 = photos[2] || { src: '/img/absensi.png', title: 'Project 3' };

  return (
    <>
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Background Year Watermark with Stroke Outline */}
        <div className="relative cursor-default mb-2 md:mb-4 pointer-events-none">
          <span
            className="text-6xl sm:text-7xl md:text-9xl font-black font-mono leading-none tracking-tight block transition-all duration-500"
            style={{
              WebkitTextStroke: isLight ? '1.5px rgba(0,0,0,0.25)' : '1.5px rgba(255,255,255,0.2)',
              color: 'transparent',
              opacity: isLight ? 0.35 : 0.25,
            }}
          >
            {year}
          </span>

          {/* Centered Year Icon Floating Badge */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ perspective: '800px' }}
          >
            <div
              className={`p-3 rounded-2xl border shadow-lg transition-transform duration-300 ${
                isLight
                  ? 'bg-white/90 border-black/20 text-black shadow-black/10'
                  : 'bg-neutral-900/90 border-white/20 text-white shadow-black/50'
              }`}
            >
              <Folder size={20} className={isLight ? 'text-black' : 'text-cyan-400'} />
            </div>
          </div>
        </div>

        {/* Interactive 3D Folder Container */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="group relative cursor-pointer flex flex-col items-center transition-transform duration-500 hover:scale-105"
          style={{ perspective: '1000px' }}
        >
          {/* Physical 3D Folder */}
          <div className="relative w-44 sm:w-52 md:w-56 h-32 sm:h-36 md:h-40">
            {/* Folder Tab Backing */}
            <div
              className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 shadow-md ${
                isLight
                  ? 'bg-neutral-200 border-neutral-400/80'
                  : 'bg-neutral-800 border-neutral-600'
              }`}
            >
              {/* Folder Top Tab */}
              <div
                className={`absolute -top-3 left-4 w-16 sm:w-20 h-4 rounded-t-lg border-t-2 border-x-2 transition-colors ${
                  isLight
                    ? 'bg-neutral-200 border-neutral-400/80'
                    : 'bg-neutral-800 border-neutral-600'
                }`}
              />
            </div>

            {/* Paper 1 (Left Pop-out) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(p1);
              }}
              className="absolute inset-x-3 top-3 h-28 sm:h-32 rounded-xl overflow-hidden border shadow-md transition-all duration-500 ease-out z-10 cursor-zoom-in"
              style={{
                borderColor: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)',
                background: isLight ? '#ffffff' : '#1e222d',
                transform: isOpen
                  ? 'translateY(-75px) rotate(-11deg) scale(0.96)'
                  : 'translateY(0px) rotate(-2deg)',
              }}
            >
              <img
                src={p1.src}
                alt={p1.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ZoomIn size={18} />
              </div>
            </div>

            {/* Paper 2 (Center Pop-out, Main) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(p2);
              }}
              className="absolute inset-x-2 top-2 h-30 sm:h-34 rounded-xl overflow-hidden border-2 shadow-lg transition-all duration-500 ease-out z-20 cursor-zoom-in"
              style={{
                borderColor: isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)',
                background: isLight ? '#ffffff' : '#1e222d',
                transform: isOpen
                  ? 'translateY(-95px) rotate(0deg) scale(1.05)'
                  : 'translateY(-6px) rotate(0deg)',
              }}
            >
              <img
                src={p2.src}
                alt={p2.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 p-1.5 bg-black/70 backdrop-blur-xs text-[9px] font-mono text-white truncate text-center">
                {p2.title}
              </div>
            </div>

            {/* Paper 3 (Right Pop-out) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(p3);
              }}
              className="absolute inset-x-3 top-3 h-28 sm:h-32 rounded-xl overflow-hidden border shadow-md transition-all duration-500 ease-out z-10 cursor-zoom-in"
              style={{
                borderColor: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)',
                background: isLight ? '#ffffff' : '#1e222d',
                transform: isOpen
                  ? 'translateY(-70px) rotate(11deg) scale(0.96)'
                  : 'translateY(2px) rotate(3deg)',
              }}
            >
              <img
                src={p3.src}
                alt={p3.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ZoomIn size={18} />
              </div>
            </div>

            {/* Folder Front Flap (Opens forward on hover/open) */}
            <div
              className={`absolute inset-x-0 bottom-0 h-24 sm:h-28 rounded-2xl border-2 transition-transform duration-500 origin-bottom z-30 shadow-xl ${
                isLight
                  ? 'bg-neutral-100 border-neutral-400 text-neutral-800'
                  : 'bg-neutral-900 border-neutral-600 text-neutral-200'
              }`}
              style={{
                transform: isOpen ? 'rotateX(-45deg)' : 'rotateX(0deg)',
              }}
            >
              <div className="h-full flex flex-col justify-between p-3">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-wider opacity-70">
                  <span>ARCHIVE // {year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-xs font-mono font-extrabold uppercase truncate">
                    {title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Label below folder */}
          <div className="mt-4 flex flex-col items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">
              {isId ? 'Arsip Proyek' : 'Project Archive'}
            </span>
            <div className={`h-[1px] w-8 ${isLight ? 'bg-black/20' : 'bg-white/20'}`} />
            <span className="text-[9px] font-bold text-neutral-500 font-mono">
              {isOpen
                ? isId
                  ? 'Tutup Folder'
                  : 'Close Folder'
                : isId
                  ? 'Buka Folder ✦'
                  : 'Click to Open ✦'}
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-blur-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-neutral-950 border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-white text-black text-[10px] font-black rounded-full uppercase">
                  {year}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  {selectedPhoto.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* High-res Image Preview */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-neutral-900 border border-white/10">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="pt-4 flex items-center justify-between font-mono text-xs text-neutral-400">
              <span>Rayyan Ammar Fadhillah — Career Milestone</span>
              <span className="text-[10px] opacity-75">ESC / Click outside to exit</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
