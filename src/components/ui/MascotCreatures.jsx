import { useEffect, useRef, useCallback, useState } from 'react';
import { Code2, Search } from 'lucide-react';

const MESSAGES = [
  "Hello! 👋",
  "Selamat datang!",
  "Scroll down! ↓",
  "Hai!",
  "Ayo explore 💻",
  "Salam! 🙌",
  "Rayyan Ammar F.",
  "Check my projects 💼",
  "Tinggalkan jejak! 💬"
];

const PROMPT_MESSAGES = [
  "Hubungi aku di bawah! 📬",
  "Scroll ke bawah yuk! ↓",
  "Bisa klik aku lho! 🖱️",
  "Buka buku tamu di kanan! ✍️"
];

export default function MascotCreatures() {
  const containerRef = useRef(null);
  const elementsRef = useRef([null, null]);
  const stateRef = useRef([]);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isMobileRef = useRef(false);

  // Synchronize theme with data-theme attribute
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });
  const isDark = theme === 'dark';

  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((index) => {
    const list = stateRef.current;
    if (!list[index]) return;
    const c = list[index];
    const r = Math.random();

    if (r < 0.35) {
      // 360 Flip Jump
      c.action = 'flipping';
      c.mood = 'happy';
      c.timer = 60;
      c.jumpY = 0;
      c.jumpVY = -12;
      c.flipRotation = 0;
      c.speechBubble = 'Yay! 🎉';
      c.speechTimer = 60;
    } else if (r < 0.7) {
      // Wave & speak
      const pool = c.x > (window.innerWidth - 250) ? PROMPT_MESSAGES : MESSAGES;
      const msg = pool[Math.floor(Math.random() * pool.length)];
      c.action = 'waving';
      c.mood = 'happy';
      c.timer = 90;
      c.speechBubble = msg;
      c.speechTimer = 85;
    } else if (r < 0.85) {
      // Invite to guestbook
      c.action = 'waving';
      c.mood = 'happy';
      c.timer = 90;
      c.speechBubble = 'Tinggalkan jejak di Buku Tamu! ✍️';
      c.speechTimer = 90;
    } else {
      // High jump
      c.action = 'flipping';
      c.mood = 'happy';
      c.timer = 50;
      c.jumpY = 0;
      c.jumpVY = -10;
      c.flipRotation = 0;
      c.speechBubble = 'Woohoo! 🚀';
      c.speechTimer = 70;
    }
  }, []);

  useEffect(() => {
    stateRef.current = [
      {
        type: 'thief',
        x: -80,
        vx: 0,
        targetX: Math.max(60, window.innerWidth * 0.28),
        mood: 'normal',
        action: 'walking',
        flip: false,
        timer: 100,
        speechBubble: '',
        speechTimer: 0,
        flipRotation: 0,
        jumpY: 0,
        jumpVY: 0
      },
      {
        type: 'scout',
        x: window.innerWidth + 80,
        vx: 0,
        targetX: Math.min(window.innerWidth - 100, window.innerWidth * 0.65),
        mood: 'normal',
        action: 'walking',
        flip: true,
        timer: 140,
        speechBubble: '',
        speechTimer: 0,
        flipRotation: 0,
        jumpY: 0,
        jumpVY: 0
      }
    ];

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    onResize();

    // Initial greeting sequence
    const greetTimeout = setTimeout(() => {
      const list = stateRef.current;
      if (list[0]) {
        list[0].speechBubble = 'Hello! 👋';
        list[0].speechTimer = 80;
        list[0].mood = 'happy';
        list[0].action = 'waving';
        list[0].timer = 90;
      }
      setTimeout(() => {
        if (list[1]) {
          list[1].speechBubble = 'Selamat datang! ✨';
          list[1].speechTimer = 80;
          list[1].mood = 'happy';
          list[1].action = 'waving';
          list[1].timer = 90;
        }
      }, 1800);
    }, 4500);

    let lastTime = performance.now();
    let lastRender = 0;

    const tick = (now) => {
      if (document.hidden || now - lastRender < 30) {
        animFrameRef.current = requestAnimationFrame(tick);
        return;
      }
      lastRender = now;
      const dt = Math.min((now - lastTime) / 16.66, 2.5);
      lastTime = now;

      const list = stateRef.current;
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      for (let i = 0; i < list.length; i++) {
        const c = list[i];
        c.timer -= dt;
        c.speechTimer -= dt;
        if (c.speechTimer <= 0) {
          c.speechBubble = '';
          c.speechTimer = 0;
        }

        // Flipping / Jump physics
        if (c.action === 'flipping') {
          c.jumpVY += 0.6 * dt;
          c.jumpY += c.jumpVY * dt;
          c.flipRotation += 12 * dt;
          if (c.jumpY >= 0 && c.jumpVY > 0) {
            c.jumpY = 0;
            c.jumpVY = 0;
            c.flipRotation = 0;
            if (c.timer <= 0) {
              c.action = 'idle';
              c.mood = 'happy';
              c.timer = 60;
            }
          }
        }

        if (c.action === 'waving' && c.timer <= 0) {
          c.action = 'idle';
          c.mood = 'normal';
          c.timer = 80;
        }

        // Proximity detection to mouse
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const distDistX = Math.abs(mx - c.x);
        const distDistY = Math.abs(my - (winH - 45));
        const isNear = distDistX < 140 && distDistY < 140 && !isMobileRef.current;

        if (c.action !== 'flipping' && c.action !== 'waving') {
          if (isNear) {
            // Panic & run away
            c.action = 'running';
            c.mood = 'running';
            if (mx > c.x) {
              c.targetX = Math.max(30, c.x - 280);
            } else {
              c.targetX = Math.min(winW - 70, c.x + 280);
            }
            c.timer = 50;
          } else if (c.timer <= 0) {
            // Idle state generator
            const roll = Math.random();
            if (roll < 0.16) {
              c.action = 'idle';
              c.mood = 'normal';
              c.timer = 100 + Math.random() * 100;
            } else if (roll < 0.24) {
              c.action = 'sleeping';
              c.mood = 'normal';
              c.timer = 150 + Math.random() * 100;
            } else if (roll < 0.35) {
              const pool = c.x > winW - 250 && Math.random() < 0.5 ? PROMPT_MESSAGES : MESSAGES;
              c.action = 'waving';
              c.mood = 'happy';
              c.speechBubble = pool[Math.floor(Math.random() * pool.length)];
              c.speechTimer = 75;
              c.timer = 85;
            } else {
              c.action = 'walking';
              c.mood = Math.random() > 0.8 ? 'happy' : 'normal';
              c.targetX = 40 + Math.random() * Math.max(100, winW - 190);
              c.timer = 100 + Math.random() * 200;
            }
          }
        }

        // Movement Physics
        if (c.action === 'walking' || c.action === 'running') {
          const dx = c.targetX - c.x;
          const maxSpeed = c.action === 'running' ? 5.5 : 1.4;
          const accel = c.action === 'running' ? 0.35 : 0.05;

          c.vx += Math.sign(dx) * accel * dt;
          if (Math.abs(c.vx) > maxSpeed) {
            c.vx = Math.sign(c.vx) * maxSpeed;
          }

          if (Math.abs(dx) < 12) {
            c.vx *= 0.8;
            if (Math.abs(c.vx) < 0.4) {
              c.vx = 0;
              if (c.action !== 'running') c.action = 'idle';
            }
          }

          c.x += c.vx * dt;
          if (c.vx > 0.4) c.flip = true;
          if (c.vx < -0.4) c.flip = false;
        } else if (c.action !== 'flipping' && c.action !== 'waving') {
          c.vx *= 0.8;
          c.x += c.vx * dt;
        }

        // Keep inside screen bounds
        if (c.x < -40) c.x = -40;
        if (c.x > winW + 40) c.x = winW + 40;

        // Apply DOM updates
        const el = elementsRef.current[i];
        if (!el) continue;

        el.style.transform = `translate3d(${c.x}px, ${-4 + c.jumpY}px, 0)`;

        // Speech bubble
        const speechEl = el.querySelector('[data-speech]');
        if (speechEl) {
          if (c.speechBubble) {
            speechEl.style.display = 'block';
            speechEl.textContent = c.speechBubble;
          } else {
            speechEl.style.display = 'none';
          }
        }

        // Flip & rotation
        const flipEl = el.querySelector('[data-flip]');
        if (flipEl) {
          flipEl.style.transform = `${c.flip ? 'scaleX(-1)' : 'scaleX(1)'} rotate(${c.flipRotation}deg)`;
          flipEl.style.transition = c.action === 'flipping' ? 'none' : 'transform 0.2s';
        }

        // Shadow scale during jumps
        const shadowEl = el.querySelector('[data-shadow]');
        if (shadowEl) {
          const sFactor = c.jumpY < -5 ? 0.5 : 1;
          shadowEl.style.transform = `translateX(-50%) scale(${sFactor})`;
          shadowEl.style.opacity = c.jumpY < -5 ? '0.3' : '1';
        }

        // Body squashing
        const bodyEl = el.querySelector('[data-body]');
        if (bodyEl) {
          bodyEl.classList.remove('anim-squash');
          if (c.action === 'running') bodyEl.classList.add('anim-squash');
        }

        // Pupil / Eye tracking & shapes
        const eyeL = el.querySelector('[data-eye-l]');
        const eyeR = el.querySelector('[data-eye-r]');
        if (eyeL && eyeR) {
          const isWaving = c.action === 'waving';
          const eyeBorderColor = isDark ? 'border-black' : 'border-white';
          const eyeBgColor = isDark ? 'bg-black' : 'bg-white';

          if (c.mood === 'happy' || isWaving) {
            eyeL.className = `w-2.5 h-1.5 border-t-2 ${eyeBorderColor} rounded-t-full mt-1`;
            eyeR.className = `w-2.5 h-1.5 border-t-2 ${eyeBorderColor} rounded-t-full mt-1`;
            eyeL.style.transform = 'none';
            eyeR.style.transform = 'none';
          } else if (c.mood === 'running') {
            eyeL.className = `w-2.5 h-3.5 ${eyeBgColor} rounded-full`;
            eyeR.className = `w-2.5 h-3.5 ${eyeBgColor} rounded-full`;
            eyeL.style.transform = 'scale(1.25)';
            eyeR.style.transform = 'scale(1.25)';
          } else if (c.action === 'sleeping') {
            eyeL.className = `w-2.5 h-3 ${eyeBgColor} rounded-full transition-transform`;
            eyeR.className = `w-2.5 h-3 ${eyeBgColor} rounded-full transition-transform`;
            eyeL.style.transform = 'scaleY(0.2)';
            eyeR.style.transform = 'scaleY(0.2)';
          } else {
            // Normal - compute gaze tracking towards mouse
            const gazeX = Math.max(-2, Math.min(2, (mx - c.x) * 0.02));
            const gazeY = Math.max(-1, Math.min(1.5, (my - (winH - 45)) * 0.02));
            eyeL.className = `w-2.5 h-3.5 ${eyeBgColor} rounded-full transition-transform`;
            eyeR.className = `w-2.5 h-3.5 ${eyeBgColor} rounded-full transition-transform`;
            eyeL.style.transform = `translate(${gazeX}px, ${gazeY}px)`;
            eyeR.style.transform = `translate(${gazeX}px, ${gazeY}px)`;
          }
        }

        // Legs
        const legL = el.querySelector('[data-leg-l]');
        const legR = el.querySelector('[data-leg-r]');
        if (legL && legR) {
          if (c.action === 'walking' || c.action === 'running') {
            const legClass = c.action === 'running' ? 'leg-walk-fast' : 'leg-walk-slow';
            legL.className = `absolute -bottom-[8px] left-[8px] w-3 h-4 opacity-100 origin-top ${legClass}`;
            legR.className = `absolute -bottom-[8px] right-[8px] w-3 h-4 opacity-100 origin-top ${legClass}`;
            legR.style.animationDelay = c.action === 'running' ? '-100ms' : '-250ms';
          } else {
            legL.className = 'absolute -bottom-[4px] left-[8px] w-3 h-2 opacity-100 origin-top';
            legR.className = 'absolute -bottom-[4px] right-[8px] w-3 h-2 opacity-100 origin-top';
            legR.style.animationDelay = '0s';
          }
        }

        // Sleep indicator
        const zzzEl = el.querySelector('[data-zzz]');
        if (zzzEl) zzzEl.style.display = c.action === 'sleeping' ? 'flex' : 'none';

        // Panic exclamation mark
        const excEl = el.querySelector('[data-exc]');
        if (excEl) excEl.style.display = c.action === 'running' ? 'block' : 'none';

        // Waving hand
        const waveEl = el.querySelector('[data-wave]');
        if (waveEl) waveEl.style.display = c.action === 'waving' ? 'block' : 'none';

        // Accessories
        const accEl = el.querySelector('[data-acc]');
        if (accEl) accEl.style.display = c.action === 'waving' ? 'none' : 'flex';
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(greetTimeout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 w-full h-0 pointer-events-none z-[100]"
    >
      {['thief', 'scout'].map((type, idx) => (
        <div
          key={type}
          ref={(el) => { elementsRef.current[idx] = el; }}
          className="absolute bottom-0 w-[50px] h-[50px] pointer-events-auto select-none"
          style={{ transform: 'translate3d(-100px, -4px, 0)' }}
          onClick={() => handleClick(idx)}
        >
          {/* Speech Bubble */}
          <div
            data-speech
            onClick={(e) => {
              e.stopPropagation();
              if (window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('open-guestbook'));
              }
            }}
            className={`absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-xl border-2 shadow-xl z-50 pointer-events-auto cursor-pointer select-none transition-colors ${
              isDark 
                ? 'bg-neutral-900 border-neutral-700 text-white shadow-black/60' 
                : 'bg-white border-black text-black shadow-black/20'
            }`}
            style={{ display: 'none', animation: 'speechPop 0.3s ease-out' }}
          >
            <div 
              className={`absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 border-r-2 border-b-2 rotate-45 ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-700' 
                  : 'bg-white border-black'
              }`} 
            />
          </div>

          {/* Flip Container */}
          <div
            data-flip
            className="w-full h-full relative cursor-pointer"
          >
            {/* Soft Ground Shadow */}
            <div
              data-shadow
              className={`absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-8 h-2 rounded-[100%] blur-[2px] ${
                isDark ? 'bg-white/20' : 'bg-black/25'
              }`}
              style={{ transition: 'transform 0.1s, opacity 0.1s' }}
            />

            {/* Mascot Body: WHITE in dark mode, BLACK in light mode! */}
            <div
              data-body
              className={`mascot-body w-full h-full rounded-[20px] rounded-br-[12px] rounded-bl-[12px] relative flex flex-col justify-between p-1.5 hover:scale-110 transition-transform duration-300 ${
                isDark
                  ? 'bg-white text-black border-2 border-white/80 shadow-[0_4px_20px_rgba(255,255,255,0.35)]'
                  : 'bg-black text-white border-2 border-black/80 shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
              }`}
            >
              {/* Eyes */}
              <div className="mascot-eyes-container flex justify-between px-1.5 pt-1.5 gap-1 relative z-20">
                <div
                  data-eye-l
                  className={`w-2.5 h-3.5 rounded-full transition-transform ${
                    isDark ? 'bg-black' : 'bg-white'
                  }`}
                />
                <div
                  data-eye-r
                  className={`w-2.5 h-3.5 rounded-full transition-transform ${
                    isDark ? 'bg-black' : 'bg-white'
                  }`}
                />
              </div>

              {/* Sleeping Zzz */}
              <div
                data-zzz
                className="absolute -top-6 right-0 flex flex-col items-end z-30 pointer-events-none"
                style={{ display: 'none' }}
              >
                <span className={`font-bold text-[10px] animate-pulse mb-[-4px] ${isDark ? 'text-black/80' : 'text-white/80'}`}>z</span>
                <span className={`font-black text-sm animate-bounce ${isDark ? 'text-black' : 'text-white'}`}>Z</span>
              </div>

              {/* Alert Exclamation */}
              <div
                data-exc
                className="absolute -top-5 right-0 text-amber-500 font-black text-lg z-30 pointer-events-none drop-shadow"
                style={{ display: 'none' }}
              >
                !
              </div>

              {/* Waving Hand Emoji */}
              <div
                data-wave
                className="absolute -top-3 -right-4 z-40 text-lg select-none pointer-events-none"
                style={{ display: 'none', animation: 'mascotWave 0.4s ease-in-out infinite alternate' }}
              >
                🖐️
              </div>

              {/* Thief Accessory (Code Badge) */}
              {type === 'thief' && (
                <div data-acc className="flex" style={{ display: 'flex' }}>
                  <div className={`absolute top-1/2 -right-1 w-3 h-[3px] rounded-full origin-left rotate-45 z-30 ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`} />
                  <div className={`absolute top-[30%] -right-5 z-40 p-1 rounded-md border-2 shadow-md transform rotate-12 ${
                    isDark
                      ? 'bg-neutral-900 border-neutral-700 text-white'
                      : 'bg-white border-black text-black'
                  }`}>
                    <Code2 size={12} />
                  </div>
                </div>
              )}

              {/* Scout Accessory (Magnifying Glass) */}
              {type === 'scout' && (
                <div data-acc className="flex" style={{ display: 'flex' }}>
                  <div className={`absolute top-[40%] -right-1 w-3 h-[3px] rounded-full origin-left -rotate-45 z-30 ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`} />
                  <div className={`absolute -top-1 -right-4 z-40 drop-shadow transform rotate-12 ${
                    isDark ? 'text-black' : 'text-white'
                  }`}>
                    <Search size={14} strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>

            {/* Left Leg with Foot */}
            <div
              data-leg-l
              className="absolute -bottom-[4px] left-[8px] w-3 h-2 opacity-100 origin-top"
            >
              <div className={`w-full h-full border-2 rounded-full ${
                isDark ? 'bg-white border-black/10' : 'bg-black border-transparent'
              }`} />
              <div className={`absolute bottom-0 right-0 w-[120%] h-[60%] border-2 rounded-full translate-x-[20%] ${
                isDark ? 'bg-white border-black/10' : 'bg-black border-transparent'
              }`} />
            </div>

            {/* Right Leg with Foot */}
            <div
              data-leg-r
              className="absolute -bottom-[4px] right-[8px] w-3 h-2 opacity-100 origin-top"
            >
              <div className={`w-full h-full border-2 rounded-full ${
                isDark ? 'bg-white border-black/10' : 'bg-black border-transparent'
              }`} />
              <div className={`absolute bottom-0 right-0 w-[120%] h-[60%] border-2 rounded-full translate-x-[20%] ${
                isDark ? 'bg-white border-black/10' : 'bg-black border-transparent'
              }`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
