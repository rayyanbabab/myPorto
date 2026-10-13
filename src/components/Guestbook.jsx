import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShieldCheck, CornerDownLeft, Trash2 } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    name: 'Aku Gue',
    handle: 'akugue',
    provider: 'google',
    avatarInitial: 'A',
    avatarColor: 'bg-indigo-600',
    message: 'keren bet, info design.md nya',
    createdAt: 'Sep 26, 2026, 12:25 AM',
    isOwner: false,
    authorId: 'seed-1'
  },
  {
    id: 'msg-1-reply',
    name: 'Rayyan Ammar F.',
    handle: 'rayyan',
    provider: 'owner',
    avatarInitial: 'R',
    avatarColor: 'bg-emerald-600',
    message: 'makasi, dm aja bg',
    createdAt: 'Oct 7, 2026, 10:38 PM',
    isOwner: true,
    authorId: 'owner',
    replyTo: {
      name: 'Aku Gue',
      message: 'keren bet, info design.md nya'
    }
  },
  {
    id: 'msg-2',
    name: 'Priscilia Leza',
    handle: 'priscilia',
    provider: 'google',
    avatarInitial: 'P',
    avatarColor: 'bg-rose-500',
    message: 'Kerenn gilsss',
    createdAt: 'Sep 28, 2026, 12:39 AM',
    isOwner: false,
    authorId: 'seed-2'
  },
  {
    id: 'msg-3',
    name: 'Duta Fithra Qolby',
    handle: 'dutafq',
    provider: 'github',
    avatarInitial: 'D',
    avatarColor: 'bg-emerald-600',
    message: 'keren bang',
    createdAt: 'Oct 4, 2026, 05:25 PM',
    isOwner: false,
    authorId: 'seed-3'
  },
  {
    id: 'msg-3-reply',
    name: 'Rayyan Ammar F.',
    handle: 'rayyan',
    provider: 'owner',
    avatarInitial: 'R',
    avatarColor: 'bg-emerald-600',
    message: 'makasi udah mampiir 🥹',
    createdAt: 'Oct 7, 2026, 10:41 PM',
    isOwner: true,
    authorId: 'owner',
    replyTo: {
      name: 'Duta Fithra Qolby',
      message: 'keren bang'
    }
  },
  {
    id: 'msg-4',
    name: 'Yaasiin Muhammad',
    handle: 'yaasiinm',
    provider: 'google',
    avatarInitial: 'Y',
    avatarColor: 'bg-purple-600',
    message: 'Ampunmm suhuuuu',
    createdAt: 'Oct 10, 2026, 06:21 PM',
    isOwner: false,
    authorId: 'seed-4'
  },
  {
    id: 'msg-5',
    name: 'F4IRUZZ',
    handle: 'f4iruzz',
    provider: 'github',
    avatarInitial: 'F',
    avatarColor: 'bg-zinc-700',
    message: 'kerenn bang',
    createdAt: 'Oct 11, 2026, 06:53 PM',
    isOwner: false,
    authorId: 'seed-5'
  }
];

function GithubIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function GoogleIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
  );
}

function formatCurrentTime() {
  const now = new Date();
  const options = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return now.toLocaleString('en-US', options);
}

export default function Guestbook() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('rayyan_portfolio_guestbook_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_MESSAGES;
  });

  // Current logged in user (or null)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rayyan_guestbook_user_v2');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Auth modal prompt state
  const [authModalProvider, setAuthModalProvider] = useState(null); // 'github' | 'google'
  const [authInputName, setAuthInputName] = useState('');
  const [authInputHandle, setAuthInputHandle] = useState('');

  // Replying state
  const [replyingTo, setReplyingTo] = useState(null);
  const [inputMessage, setInputMessage] = useState('');

  const messagesEndRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rayyan_portfolio_guestbook_v2', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('rayyan_guestbook_user_v2', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('rayyan_guestbook_user_v2');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Global event listener to open
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-guestbook', handleOpen);
    return () => window.removeEventListener('open-guestbook', handleOpen);
  }, []);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (authModalProvider) {
          setAuthModalProvider(null);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, authModalProvider]);

  const handleStartSignIn = (provider) => {
    setAuthModalProvider(provider);
    setAuthInputName('');
    setAuthInputHandle('');
  };

  const handleConfirmSignIn = (e) => {
    e.preventDefault();
    if (!authInputName.trim()) return;

    const trimmedName = authInputName.trim();
    const handle = authInputHandle.trim() 
      ? authInputHandle.trim().replace(/^@/, '') 
      : trimmedName.toLowerCase().replace(/\s+/g, '');

    const avatarColors = [
      'bg-indigo-600', 'bg-blue-600', 'bg-purple-600', 
      'bg-emerald-600', 'bg-amber-600', 'bg-rose-500'
    ];
    const pickedColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newUser = {
      id: 'usr_' + Date.now(),
      name: trimmedName,
      handle,
      provider: authModalProvider,
      avatarInitial: trimmedName[0]?.toUpperCase() || 'U',
      avatarColor: pickedColor,
      avatarUrl: authModalProvider === 'github' ? `https://github.com/${handle}.png` : null
    };

    setCurrentUser(newUser);
    setAuthModalProvider(null);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!currentUser || !inputMessage.trim()) return;

    const newMsg = {
      id: 'msg_' + Date.now(),
      name: currentUser.name,
      handle: currentUser.handle,
      provider: currentUser.provider,
      avatarInitial: currentUser.avatarInitial,
      avatarColor: currentUser.avatarColor,
      avatarUrl: currentUser.avatarUrl,
      message: inputMessage.trim(),
      createdAt: formatCurrentTime(),
      isOwner: false,
      authorId: currentUser.id,
      replyTo: replyingTo ? {
        name: replyingTo.name,
        message: replyingTo.message
      } : null
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
    setReplyingTo(null);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const totalSignatures = messages.length;

  return (
    <>
      {/* Minimalist Floating Trigger (bottom-right) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/95 dark:bg-black/95 text-neutral-900 dark:text-neutral-100 font-mono text-xs shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer group select-none"
        title="Open Guestbook"
        aria-label="Open Guestbook"
      >
        <span className="font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
          {'>_'}
        </span>
        <span className="tracking-tight font-medium">guestbook.log</span>
        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
          {totalSignatures}
        </span>
      </button>

      {/* Slide-over Drawer & Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[120]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="absolute top-0 right-0 h-full w-full sm:w-[480px] bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 flex flex-col shadow-2xl overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-black select-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-mono text-xs font-bold shadow-sm">
                    {'>_'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                        ~/guestbook.log
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        ● LIVE
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {totalSignatures} total signatures
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[10px] opacity-70">ESC</span>
                  <X size={13} />
                </button>
              </div>

              {/* Top Auth Banner */}
              <div className="p-3 mx-4 my-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/40 shrink-0">
                {!currentUser ? (
                  <>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 mb-2.5">
                      <ShieldCheck size={14} className="text-neutral-500" />
                      <span>Sign In to Leave a Note</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleStartSignIn('github')}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-medium font-mono hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-sm"
                      >
                        <GithubIcon size={14} />
                        <span>GitHub</span>
                      </button>
                      <button
                        onClick={() => handleStartSignIn('google')}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-medium font-mono hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-98 transition-all cursor-pointer shadow-sm"
                      >
                        <GoogleIcon size={14} />
                        <span>Google</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-white bg-neutral-800 shrink-0">
                        {currentUser.avatarUrl ? (
                          <img 
                            src={currentUser.avatarUrl} 
                            alt={currentUser.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <span className={`w-full h-full flex items-center justify-center ${currentUser.avatarColor}`}>
                            {currentUser.avatarInitial}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                            {currentUser.name}
                          </span>
                          {currentUser.provider === 'github' ? (
                            <GithubIcon size={11} className="text-neutral-500 shrink-0" />
                          ) : (
                            <GoogleIcon size={11} className="shrink-0" />
                          )}
                        </div>
                        <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 truncate">
                          @{currentUser.handle}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleSignOut}
                      className="text-[11px] font-mono text-neutral-400 hover:text-red-500 transition-colors px-2 py-1 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Inline Auth Prompt (Modal / Input Popover) */}
              <AnimatePresence>
                {authModalProvider && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mx-4 mb-3 overflow-hidden"
                  >
                    <form
                      onSubmit={handleConfirmSignIn}
                      className="p-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 flex flex-col gap-2.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold flex items-center gap-1.5 text-neutral-900 dark:text-white">
                          {authModalProvider === 'github' ? <GithubIcon size={13} /> : <GoogleIcon size={13} />}
                          Sign in with {authModalProvider === 'github' ? 'GitHub' : 'Google'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAuthModalProvider(null)}
                          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white p-0.5 cursor-pointer"
                        >
                          <X size={13} />
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          required
                          value={authInputName}
                          onChange={(e) => setAuthInputName(e.target.value)}
                          placeholder={authModalProvider === 'github' ? "Your Name / GitHub Username" : "Your Name"}
                          autoFocus
                          className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        />
                        {authModalProvider === 'github' && (
                          <input
                            type="text"
                            value={authInputHandle}
                            onChange={(e) => setAuthInputHandle(e.target.value)}
                            placeholder="username (optional, e.g. octocat)"
                            className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                          />
                        )}
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setAuthModalProvider(null)}
                          className="px-3 py-1 text-xs font-mono text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 text-xs font-mono font-bold rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 cursor-pointer shadow-sm"
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Feed / Thread (Chat Style) */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-5">
                {messages.map((item) => {
                  const isOwner = item.isOwner;
                  const isMyMsg = currentUser && (item.authorId === currentUser.id || item.handle === currentUser.handle);

                  if (isOwner) {
                    // Owner reply on the RIGHT
                    return (
                      <div key={item.id} className="flex justify-end items-start gap-2.5 pl-10 group">
                        <div className="flex flex-col items-end max-w-[85%]">
                          {/* Owner badge header */}
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mb-1">
                            <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-black text-white dark:bg-white dark:text-black">
                              DEV
                            </span>
                            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                              {item.name}
                            </span>
                          </div>

                          {/* Chat Bubble on the RIGHT */}
                          <div className="relative px-3.5 py-2.5 rounded-2xl rounded-tr-sm bg-black text-white dark:bg-white dark:text-black shadow-sm text-xs leading-relaxed">
                            {/* Quoted replied snippet if any */}
                            {item.replyTo && (
                              <div className="border-l-2 border-neutral-500 dark:border-neutral-400 pl-2 mb-1.5 text-[10px] opacity-80 select-none">
                                <span className="font-bold block">@{item.replyTo.name}</span>
                                <span className="line-clamp-1">{item.replyTo.message}</span>
                              </div>
                            )}

                            <p className="whitespace-pre-wrap font-sans">{item.message}</p>
                          </div>

                          {/* Timestamp below bubble */}
                          <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                            <span>{item.createdAt}</span>
                          </div>
                        </div>

                        {/* Owner Avatar */}
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          {item.avatarInitial || 'R'}
                        </div>
                      </div>
                    );
                  }

                  // Visitor message on the LEFT
                  return (
                    <div key={item.id} className="flex items-start gap-2.5 pr-8 group">
                      {/* Visitor Avatar */}
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm mt-0.5">
                        {item.avatarUrl ? (
                          <img 
                            src={item.avatarUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <span className={`w-full h-full flex items-center justify-center ${item.avatarColor || 'bg-neutral-700'}`}>
                            {item.avatarInitial || item.name[0]?.toUpperCase() || 'U'}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col items-start max-w-[85%]">
                        {/* Name + Provider header */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white mb-1">
                          <span>{item.name}</span>
                          {item.provider === 'github' && (
                            <GithubIcon size={12} className="text-neutral-500" />
                          )}
                          {item.provider === 'google' && (
                            <GoogleIcon size={12} />
                          )}
                        </div>

                        {/* Chat Bubble on the LEFT */}
                        <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-xs leading-relaxed shadow-sm">
                          {item.replyTo && (
                            <div className="border-l-2 border-neutral-400 dark:border-neutral-600 pl-2 mb-1.5 text-[10px] text-neutral-500 dark:text-neutral-400 select-none">
                              <span className="font-bold block">@{item.replyTo.name}</span>
                              <span className="line-clamp-1">{item.replyTo.message}</span>
                            </div>
                          )}
                          <p className="whitespace-pre-wrap font-sans">{item.message}</p>
                        </div>

                        {/* Timestamp & Actions below bubble */}
                        <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                          <span>{item.createdAt}</span>

                          <button
                            onClick={() => {
                              setReplyingTo(item);
                            }}
                            className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <CornerDownLeft size={10} />
                            <span>Reply</span>
                          </button>

                          {isMyMsg && (
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                              title="Delete message"
                            >
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Dock Input Bar */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95 backdrop-blur-md">
                {currentUser ? (
                  <form onSubmit={handleSendMessage} className="p-3">
                    {/* Replying banner indicator */}
                    {replyingTo && (
                      <div className="mb-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-neutral-500 truncate">
                          Replying to <span className="font-bold text-neutral-800 dark:text-neutral-200">@{replyingTo.name}</span>: &quot;{replyingTo.message}&quot;
                        </span>
                        <button
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white ml-2 cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Leave a message..."
                        className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!inputMessage.trim()}
                        className="p-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black disabled:opacity-30 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
                        title="Send"
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 text-center text-xs font-mono text-neutral-500 dark:text-neutral-400 select-none">
                    Please sign in with GitHub or Google above to leave a note.
                  </div>
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
