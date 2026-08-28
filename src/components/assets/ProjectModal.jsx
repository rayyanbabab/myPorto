/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Cpu, Layers } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const ProjectModal = ({ isOpen, onClose, project, isLight }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border shadow-2xl ${
              isLight
                ? "bg-white border-gray-200 text-gray-900"
                : "bg-neutral-950 border-neutral-800 text-white"
            }`}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-50 p-2 rounded-full border transition-all ${
                isLight
                  ? "bg-gray-50 border-gray-200 text-black hover:bg-gray-200 active:scale-90"
                  : "bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800 active:scale-90"
              }`}
              aria-label={t.projects.closeModal}
            >
              <X size={18} />
            </button>

            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img
                src={`/img/${project.gambar}`}
                alt={project.judul}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 sm:left-8 z-20">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
                  {project.judul}
                </h2>
                {project.isComingSoon && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/20 bg-white/10 text-white">
                    {t.projects.comingSoon}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-3">
                <h3 className={`text-base font-bold flex items-center gap-2 ${
                  isLight ? "text-gray-800" : "text-gray-200"
                }`}>
                  <Cpu size={16} /> {t.projects.overview}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}>
                  {project.overview || project.parag}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div className="space-y-3">
                  <h3 className={`text-base font-bold flex items-center gap-2 ${
                    isLight ? "text-gray-800" : "text-gray-200"
                  }`}>
                    <Layers size={16} /> {t.projects.keyFeatures}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {project.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 ${
                          isLight ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${
                          isLight ? "bg-black" : "bg-white"
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${
                  isLight ? "text-gray-500" : "text-gray-400"
                }`}>
                  {t.projects.techUsed}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech?.map((tItem, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                        isLight
                          ? "bg-gray-50 border-gray-200 text-gray-700"
                          : "bg-neutral-900 border-neutral-800 text-gray-300"
                      }`}
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`flex flex-wrap items-center justify-between gap-4 pt-6 border-t ${
                isLight ? "border-gray-100" : "border-neutral-800"
              }`}>
                {project.linkDemo && project.linkDemo !== "#" ? (
                  <a
                    href={project.linkDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      isLight
                        ? "bg-black text-white hover:bg-gray-800 active:scale-95"
                        : "bg-white text-black hover:bg-gray-200 active:scale-95"
                    }`}
                  >
                    <span>{t.projects.liveDemo}</span>
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <span className={`text-xs font-medium tracking-wide ${
                    isLight ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {project.isComingSoon ? t.projects.comingSoon : "Live demo not available"}
                  </span>
                )}

                {project.linkCode && project.linkCode !== "#" && (
                  <a
                    href={project.linkCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-bold hover:underline ${
                      isLight ? "text-gray-900" : "text-white"
                    }`}
                  >
                    <Github size={18} />
                    <span>{t.projects.viewCode}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
