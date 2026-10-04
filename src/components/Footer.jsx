/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

import {
    Send,
    Check,
    AlertCircle,
    X,
    Mail,
    Instagram,
    Youtube,
    Linkedin,
    Copy,
    CheckCheck,
    FolderGit2,
    Clock,
    MapPin,
    Sparkles
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import BorderBeam from "./ui/BorderBeam";
import Magnetic from "./ui/Magnetic";
import ShinyText from "./ui/ShinyText";

const Footer = () => {
    const { t, isId } = useLanguage();
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        isSubmitting: false
    });
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [themeMode, setThemeMode] = useState("dark");
    const [copied, setCopied] = useState(false);
    const isLight = themeMode === 'light';

    const EMAILJS_SERVICE_ID = "service_kkmzp89";
    const EMAILJS_TEMPLATE_ID = "template_gl1shr7";
    const EMAILJS_PUBLIC_KEY = "EG9qC9jkGx6_xS4cu";

    useEffect(() => {
        const updateTheme = () => {
            setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
        };
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("rayyanammar276@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const playSuccessSound = () => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // AudioContext not allowed or supported
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.message.trim()) {
            setToast({ show: true, message: t.footer.fillAllFields, type: 'error' });
            setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
            return;
        }

        setFormData(prev => ({ ...prev, isSubmitting: true }));

        try {
            const templateParams = {
                to_email: "rayyanammar276@gmail.com",
                from_name: formData.name,
                from_email: formData.email,
                user_message: formData.message,
                reply_to: formData.email,
            };

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

            playSuccessSound();
            setToast({ show: true, message: t.footer.successMessage, type: 'success' });
            setFormData({ name: "", email: "", message: "", isSubmitting: false });

            setTimeout(() => setToast({ show: false, message: '', type: '' }), 4500);
        } catch (error) {
            console.error("Error:", error);
            setToast({ show: true, message: t.footer.errorMessage, type: 'error' });
            setFormData(prev => ({ ...prev, isSubmitting: false }));
            setTimeout(() => setToast({ show: false, message: '', type: '' }), 4500);
        }
    };

    const socialLinks = [
        {
            href: "https://www.instagram.com/rayyanmarf_",
            icon: <Instagram size={18} />,
            label: "Instagram"
        },
        {
            href: "https://www.youtube.com",
            icon: <Youtube size={20} />,
            label: "YouTube"
        },
        {
            href: "https://www.linkedin.com/in/rayyan-ammar/",
            icon: <Linkedin size={18} />,
            label: "LinkedIn"
        },
    ];

    return (
        <footer id="contact" className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden scroll-mt-0 font-sans">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, x: "-50%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`fixed top-6 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border backdrop-blur-xl ${
                            isLight
                                ? "bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/50"
                                : "bg-[#090d16]/95 border-white/20 text-white shadow-black/80"
                        }`}
                    >
                        {toast.type === 'success' ? (
                            <div className="p-1 rounded-full bg-emerald-500 text-white">
                                <Check size={14} strokeWidth={3} />
                            </div>
                        ) : (
                            <div className="p-1 rounded-full bg-rose-500 text-white">
                                <AlertCircle size={14} strokeWidth={3} />
                            </div>
                        )}
                        <span className="text-sm font-medium pr-2">{toast.message}</span>
                        <button
                            onClick={() => setToast({ show: false, message: '', type: '' })}
                            className="opacity-50 hover:opacity-100 transition-opacity"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient Background Glows */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-[#f8fafc]' : 'bg-[#040507]'}`} />
                {/* Subtle Radial Gradients */}
                <div
                    className={`absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-40 ${
                        isLight ? 'bg-blue-200' : 'bg-cyan-500/15'
                    }`}
                />
                <div
                    className={`absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-30 ${
                        isLight ? 'bg-indigo-200' : 'bg-blue-600/15'
                    }`}
                />
                {/* Subtle Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`,
                        backgroundSize: '48px 48px'
                    }}
                />
            </div>

            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full my-auto py-6">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* LEFT COLUMN: Profile, Title, Stats, and Contacts */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-medium tracking-wide shadow-sm backdrop-blur-md ${
                                isLight
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700'
                                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            }`}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <ShinyText
                                text={t.footer.badge}
                                className={isLight ? "text-emerald-700 font-semibold" : "text-emerald-400 font-semibold"}
                            />
                        </motion.div>

                        {/* Avatar & Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="space-y-4"
                        >
                            <div className="relative inline-block">
                                <div className={`w-20 h-20 mx-auto lg:mx-0 rounded-2xl overflow-hidden border p-0.5 shadow-xl transition-transform duration-300 hover:scale-105 ${
                                    isLight
                                        ? 'border-slate-200 bg-white shadow-slate-200/50'
                                        : 'border-white/10 bg-white/5 ring-2 ring-cyan-500/20 shadow-cyan-500/10'
                                }`}>
                                    <img
                                        src="/img/meow.jpg"
                                        alt="Rayyan Avatar"
                                        className="w-full h-full object-cover rounded-[14px]"
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                                    isLight ? 'text-slate-900' : 'text-white'
                                }`}>
                                    {t.footer.letsConnect}
                                </h2>
                                <p className={`mt-2 text-sm sm:text-base leading-relaxed max-w-sm mx-auto lg:mx-0 font-light ${
                                    isLight ? 'text-slate-600' : 'text-slate-400'
                                }`}>
                                    {t.footer.subtext}
                                </p>
                            </div>
                        </motion.div>

                        {/* Mini Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="w-full grid grid-cols-3 gap-2.5 sm:gap-3"
                        >
                            {[
                                { label: t.footer.projectsLabel, value: '7+', icon: <FolderGit2 size={13} className="text-cyan-400" /> },
                                { label: t.footer.responseLabel, value: '<24h', icon: <Clock size={13} className="text-blue-400" /> },
                                { label: t.footer.locationLabel, value: 'Bekasi, ID', icon: <MapPin size={13} className="text-emerald-400" /> },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border transition-all duration-300 ${
                                        isLight
                                            ? 'bg-slate-100/70 border-slate-200/80 hover:bg-white hover:shadow-md'
                                            : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                                    }`}
                                >
                                    <div className="flex items-center gap-1.5 mb-1">
                                        {stat.icon}
                                        <span className={`text-sm sm:text-base font-bold tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Interactive Email Copy Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="w-full"
                        >
                            <div className={`flex items-center justify-between gap-3 p-2 pl-3 rounded-2xl border backdrop-blur-md transition-all ${
                                isLight
                                    ? 'bg-white border-slate-200 shadow-sm'
                                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                            }`}>
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                        <Mail size={15} className="text-cyan-400" />
                                    </div>
                                    <span className={`text-xs sm:text-sm font-medium tracking-tight truncate ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                                        rayyanammar276@gmail.com
                                    </span>
                                </div>

                                <button
                                    onClick={handleCopyEmail}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 shrink-0 ${
                                        copied
                                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                            : isLight
                                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                                : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                                    }`}
                                    title="Copy Email"
                                >
                                    {copied ? (
                                        <>
                                            <CheckCheck size={14} className="text-emerald-400" />
                                            <span>{isId ? "Tersalin!" : "Copied!"}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} />
                                            <span>{isId ? "Salin" : "Copy"}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3 pt-1"
                        >
                            {socialLinks.map((social, idx) => (
                                <Magnetic key={idx} strength={0.3}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group shadow-sm ${
                                            isLight
                                                ? 'border-slate-200 bg-white text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-md'
                                                : 'border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10'
                                        }`}
                                    >
                                        <div className="transition-transform duration-300 group-hover:scale-110">
                                            {social.icon}
                                        </div>
                                    </a>
                                </Magnetic>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Contact Form Card */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`relative p-7 sm:p-9 rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-500 shadow-2xl ${
                                isLight
                                    ? 'bg-white/90 border-slate-200 shadow-slate-200/60'
                                    : 'bg-[#090d16]/85 border-white/10 shadow-black/80'
                            }`}
                        >
                            {/* Animated Border Beam */}
                            <BorderBeam
                                size={320}
                                duration={7}
                                colorFrom={isLight ? "#2563eb" : "#06b6d4"}
                                colorTo={isLight ? "#4f46e5" : "#3b82f6"}
                            />

                            <div className="mb-7">
                                <h3 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                    {t.footer.sendMessage}
                                </h3>
                                <p className={`text-xs sm:text-sm mt-1.5 font-light ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {t.footer.replyTime}
                                </p>
                            </div>

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${
                                            isLight ? 'text-slate-700' : 'text-slate-300'
                                        }`}>
                                            {t.footer.yourName}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            disabled={formData.isSubmitting}
                                            className={`w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 border text-sm ${
                                                isLight
                                                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10'
                                                    : 'bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-cyan-500/10'
                                            }`}
                                            placeholder={t.footer.namePlaceholder}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${
                                            isLight ? 'text-slate-700' : 'text-slate-300'
                                        }`}>
                                            {t.footer.yourEmail}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={formData.isSubmitting}
                                            className={`w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 border text-sm ${
                                                isLight
                                                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10'
                                                    : 'bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-cyan-500/10'
                                            }`}
                                            placeholder={t.footer.emailPlaceholder}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${
                                        isLight ? 'text-slate-700' : 'text-slate-300'
                                    }`}>
                                        {t.footer.message}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        disabled={formData.isSubmitting}
                                        maxLength={500}
                                        rows={4}
                                        className={`w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 resize-none border text-sm ${
                                            isLight
                                                ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10'
                                                : 'bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-cyan-500/10'
                                        }`}
                                        placeholder={t.footer.messagePlaceholder}
                                    />
                                    <div className="flex justify-between items-center mt-2 px-1">
                                        <span className={`text-[11px] font-light ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {t.footer.detailedPrompt}
                                        </span>
                                        <span className={`text-[11px] tabular-nums font-mono ${
                                            formData.message.length > 450
                                                ? 'text-amber-400 font-bold'
                                                : isLight ? 'text-slate-400' : 'text-slate-500'
                                        }`}>
                                            {formData.message.length}/500
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formData.isSubmitting}
                                    className={`group relative w-full py-4 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-300 overflow-hidden shadow-lg active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 ${
                                        isLight
                                            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 shadow-blue-600/25 hover:shadow-blue-600/40'
                                            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-400 shadow-blue-600/25 hover:shadow-blue-500/40'
                                    }`}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                                    {formData.isSubmitting ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>{t.footer.sending}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{t.footer.sendButton}</span>
                                            <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Bottom / Copyright */}
                <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-white/10 text-center">
                    <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                        © {new Date().getFullYear()} Rayyan Ammar Fadhillah. {t.footer.allRightsReserved}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;