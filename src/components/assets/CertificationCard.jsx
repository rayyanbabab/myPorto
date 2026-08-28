/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import CertificateModal from './CertificateModal'
import { useLanguage } from '../../context/LanguageContext'

const CertificationCard = ({ gambar, judul, link, isLight = false }) => {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const wrapRef = useRef(null);

  const handleOpenCertificate = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <article
        ref={wrapRef}
        onClick={() => setFlipped((v) => !v)}
        className="relative group cursor-pointer w-full"
        style={{ perspective: 1500 }}
      >
        <div
          className="relative w-full transition-all duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          <div
            className={`relative flex flex-col rounded-2xl p-4 sm:p-5 border transition-all duration-500 overflow-hidden ${
                isLight 
                    ? 'bg-white/90 border-gray-200 hover:border-gray-400 hover:shadow-xl backdrop-blur-sm' 
                    : 'bg-neutral-900/80 border-white/10 hover:border-white/25 hover:shadow-2xl hover:shadow-white/5 backdrop-blur-md'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Image Thumbnail */}
            <div className={`w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 relative ${
                isLight ? 'bg-gray-100 border border-gray-200' : 'bg-neutral-800/80 border border-white/5'
            }`}>
              <img
                src={`/img/${gambar}`}
                alt={judul}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <h3 className={`text-sm font-semibold tracking-tight leading-snug text-center mb-4 line-clamp-2 ${
                isLight ? 'text-gray-900' : 'text-white'
            }`}>
              {judul}
            </h3>

            <div className="mt-auto flex flex-col items-center gap-2">
              <div className={`px-4 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${
                  isLight 
                      ? 'bg-black text-white group-hover:bg-gray-800' 
                      : 'bg-white/10 text-white border border-white/10 group-hover:bg-white/20'
              }`}>
                {t.achievements.viewDetails}
              </div>
              <span className={`text-[9px] uppercase tracking-[0.2em] opacity-40 ${isLight ? 'text-black' : 'text-white'}`}>
                {t.achievements.tapToFlip}
              </span>
            </div>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 text-center border transition-all duration-500 ${
                isLight 
                    ? 'bg-white border-gray-100 shadow-xl' 
                    : 'bg-neutral-900 border-white/10 shadow-2xl backdrop-blur-xl'
            }`}
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            <div className="flex flex-col items-center w-full">
              <div className={`h-1 w-16 rounded-full mb-6 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
              
              <h2 className={`text-base font-bold mb-3 tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {t.achievements.certificateInfo}
              </h2>
              
              <p className={`text-xs mb-8 leading-relaxed ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                {judul}
              </p>
              
              <button 
                onClick={handleOpenCertificate}
                className={`w-full py-2.5 rounded-xl font-bold text-xs text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                    isLight 
                        ? 'bg-black text-white hover:bg-gray-800 active:scale-95' 
                        : 'bg-white text-black hover:bg-gray-200 active:scale-95'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {t.achievements.viewCertificate}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFlipped(false);
                }}
                className={`mt-4 text-[10px] font-medium uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity ${
                    isLight ? 'text-black' : 'text-white'
                }`}
              >
                {t.achievements.goBack}
              </button>
            </div>
          </div>
        </div>
      </article>

      <CertificateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        gambar={gambar}
        judul={judul}
        isLight={isLight}
      />
    </>
  )
}

export default CertificationCard