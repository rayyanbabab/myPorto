/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import CertificateModal from './CertificateModal'
import { useLanguage } from '../../context/LanguageContext'

const CertificationCard = ({ 
  gambar, 
  judul, 
  issuer, 
  period, 
  caption, 
  captionEn, 
  link, 
  isLight = false 
}) => {
  const { t, isEn } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const wrapRef = useRef(null);

  const displayCaption = isEn ? (captionEn || caption) : (caption || captionEn);

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
          {/* Front Side */}
          <div
            className={`relative flex flex-col rounded-2xl p-4 sm:p-5 border transition-all duration-500 overflow-hidden min-h-[380px] ${
                isLight 
                    ? 'bg-white/90 border-gray-200 hover:border-gray-400 hover:shadow-xl backdrop-blur-sm' 
                    : 'bg-neutral-900/80 border-white/10 hover:border-white/25 hover:shadow-2xl hover:shadow-white/5 backdrop-blur-md'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Image Thumbnail */}
            <div className={`w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 relative ${
                isLight ? 'bg-gray-100 border border-gray-200' : 'bg-neutral-800/80 border border-white/5'
            }`}>
              <img
                src={`/img/${gambar}`}
                alt={judul}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Issuer and Period Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
              {issuer && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium truncate max-w-[180px] ${
                  isLight ? 'bg-gray-100 text-gray-700 border border-gray-200' : 'bg-white/10 text-gray-300 border border-white/10'
                }`}>
                  {issuer}
                </span>
              )}
              {period && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  isLight ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}>
                  {period}
                </span>
              )}
            </div>

            <h3 className={`text-sm font-semibold tracking-tight leading-snug text-center mb-3 line-clamp-2 ${
                isLight ? 'text-gray-900' : 'text-white'
            }`}>
              {judul}
            </h3>

            <div className="mt-auto flex flex-col items-center gap-2 pt-2">
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

          {/* Back Side */}
          <div
            className={`absolute inset-0 flex flex-col justify-between rounded-2xl p-5 sm:p-6 text-center border transition-all duration-500 min-h-[380px] ${
                isLight 
                    ? 'bg-white border-gray-100 shadow-xl' 
                    : 'bg-neutral-900 border-white/10 shadow-2xl backdrop-blur-xl'
            }`}
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            <div className="flex flex-col items-center w-full my-auto">
              <div className={`h-1 w-12 rounded-full mb-3 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
              
              {/* Issuer Tag */}
              {issuer && (
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full mb-2 ${
                  isLight ? 'bg-gray-100 text-gray-600' : 'bg-white/10 text-gray-300'
                }`}>
                  {issuer}
                </span>
              )}

              <h2 className={`text-sm sm:text-base font-bold mb-2 tracking-tight line-clamp-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {judul}
              </h2>
              
              {/* Caption */}
              <p className={`text-xs mb-4 leading-relaxed line-clamp-5 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                {displayCaption}
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
                className={`mt-3 text-[10px] font-medium uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity ${
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
        caption={displayCaption}
        isLight={isLight}
      />
    </>
  )
}

export default CertificationCard