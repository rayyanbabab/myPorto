/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

import { Send, Check, AlertCircle, X, Mail, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        isSubmitting: false
    });
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [themeMode, setThemeMode] = useState("dark");
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

    const playSuccessSound = () => {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.message.trim()) {
            setToast({ show: true, message: "Please fill in all fields", type: 'error' });
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
            setToast({ show: true, message: "Message sent successfully!", type: 'success' });
            setFormData({ name: "", email: "", message: "", isSubmitting: false });

            setTimeout(() => setToast({ show: false, message: '', type: '' }), 4500);
        } catch (error) {
            console.error("Error:", error);
            setToast({ show: true, message: 'Failed to send message.', type: 'error' });
            setFormData(prev => ({ ...prev, isSubmitting: false }));
            setTimeout(() => setToast({ show: false, message: '', type: '' }), 4500);
        }
    };

    const socialLinks = [
        {
            href: "https://www.instagram.com/rayyanmarf_",
            icon: <Instagram size={20} />,
            label: "Instagram"
        },
        {
            href: "https://www.youtube.com",
            icon: <Youtube size={22} />,
            label: "YouTube"
        },
        {
            href: "https://www.linkedin.com/in/rayyan-ammar/",
            icon: <Linkedin size={20} />,
            label: "LinkedIn"
        },
    ];

    return (
        <footer id="contact" className="relative pt-24 pb-12 overflow-hidden scroll-mt-24 font-sans">

            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, x: "-50%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`fixed top-6 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border backdrop-blur-xl ${isLight
                                ? "bg-white/90 border-gray-200 text-black"
                                : "bg-black/90 border-white/20 text-white"
                            }`}
                    >
                        {toast.type === 'success' ? (
                            <div className={`p-1 rounded-full ${isLight ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                <Check size={14} strokeWidth={3} />
                            </div>
                        ) : (
                            <div className="p-1 rounded-full bg-red-500 text-white">
                                <AlertCircle size={14} strokeWidth={3} />
                            </div>
                        )}
                        <span className="text-sm font-medium pr-2">{toast.message}</span>
                        <button onClick={() => setToast({ show: false, message: '', type: '' })} className="opacity-50 hover:opacity-100">
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-black'}`} />
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(${isLight ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium ${isLight
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                }`}
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                            </span>
                            Available for freelance work
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="space-y-5"
                        >
                            <div className={`relative w-24 h-24 mx-auto lg:mx-0 rounded-2xl overflow-hidden border ${isLight ? 'border-gray-100' : 'border-white/10'}`}>
                                <img
                                    src="/img/meow.jpg"
                                    alt="Logo"
                                    className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div>
                                <h2 className={`text-3xl font-bold mb-2 ${isLight ? 'text-black' : 'text-white'}`}>Let's Connect</h2>
                                <p className={`max-w-xs mx-auto lg:mx-0 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Have a project in mind? Let's build something extraordinary together.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`w-full grid grid-cols-3 divide-x rounded-2xl border overflow-hidden ${isLight
                                    ? 'border-gray-100 divide-gray-100 bg-gray-50'
                                    : 'border-white/5 divide-white/5 bg-white/3'
                                }`}
                        >
                            {[
                                { label: 'Projects', value: '7+' },
                                { label: 'Response', value: '<24h' },
                                { label: 'Location', value: 'ID 🇮🇩' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex flex-col items-center py-4 px-2">
                                    <span className={`text-xl font-bold tabular-nums ${isLight ? 'text-black' : 'text-white'}`}>{stat.value}</span>
                                    <span className={`text-[10px] uppercase tracking-widest mt-1 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-colors ${isLight
                                    ? 'bg-gray-50 border-gray-200 text-gray-800'
                                    : 'bg-white/5 border-white/10 text-gray-200'
                                }`}
                        >
                            <Mail size={18} />
                            <span className="font-mono text-sm">rayyanammar276@gmail.com</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-4"
                        >
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 group ${isLight
                                            ? 'border-gray-200 text-black hover:border-black hover:bg-black hover:text-white'
                                            : 'border-white/20 text-white hover:border-white hover:bg-white hover:text-black'
                                        }`}
                                >
                                    <div className="transition-transform duration-300 group-hover:scale-110">
                                        {social.icon}
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`relative p-8 rounded-3xl border ${isLight
                                ? 'bg-white border-gray-100 shadow-2xl shadow-gray-100'
                                : 'bg-white/5 border-white/5 shadow-2xl shadow-black/50'
                            }`}
                    >
                        
                        <div className="mb-8">
                            <h3 className={`text-xl font-bold mb-1 ${isLight ? 'text-black' : 'text-white'}`}>Send a Message</h3>
                            <p className={`text-sm ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>I usually reply within 24 hours.</p>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled={formData.isSubmitting}
                                        className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 border text-sm ${isLight
                                                ? 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5'
                                                : 'bg-black/20 border-white/10 text-white placeholder-gray-600 focus:border-white/40 focus:bg-black/30 focus:ring-2 focus:ring-white/5'
                                            }`}
                                        placeholder="Rayyan"
                                    />
                                </div>
                                <div>
                                    <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={formData.isSubmitting}
                                        className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 border text-sm ${isLight
                                                ? 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5'
                                                : 'bg-black/20 border-white/10 text-white placeholder-gray-600 focus:border-white/40 focus:bg-black/30 focus:ring-2 focus:ring-white/5'
                                            }`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    disabled={formData.isSubmitting}
                                    maxLength={500}
                                    rows={5}
                                    className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 resize-none border text-sm ${isLight
                                            ? 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5'
                                            : 'bg-black/20 border-white/10 text-white placeholder-gray-600 focus:border-white/40 focus:bg-black/30 focus:ring-2 focus:ring-white/5'
                                        }`}
                                    placeholder="Tell me about your project, idea, or just say hi..."
                                />
                                <div className={`flex justify-between items-center mt-2`}>
                                    <span className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>Be as detailed as you like!</span>
                                    <span className={`text-[10px] tabular-nums ${formData.message.length > 450 ? 'text-amber-500' : isLight ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {formData.message.length}/500
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={formData.isSubmitting}
                                className={`group w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${isLight
                                        ? 'bg-black text-white hover:bg-gray-800 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400'
                                        : 'bg-white text-black hover:bg-gray-100 active:scale-[0.98] disabled:bg-white/10 disabled:text-gray-600'
                                    }`}
                            >
                                {formData.isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                </div>

                <div className="mt-20 pt-8 border-t border-dashed border-gray-200 dark:border-white/10 text-center">
                    <p className={`text-sm font-medium ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                        © 2026 CipHunk. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;