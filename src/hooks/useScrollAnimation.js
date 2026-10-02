import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(fromVars = {}, toVars = {}, options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { start = "top 88%", toggleActions = "play none none none", scrub = false, once = true } = options;
    gsap.set(el, fromVars);
    const tween = gsap.to(el, {
      ...toVars,
      scrollTrigger: { trigger: el, start, toggleActions, scrub, once },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return ref;
}

export function useScrollStagger(childSelector = "> *", fromVars = {}, toVars = {}, options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;
    const { start = "top 85%", toggleActions = "play none none none", scrub = false, stagger = 0.08, once = true } = options;
    gsap.set(children, fromVars);
    const tween = gsap.to(children, {
      ...toVars,
      stagger,
      scrollTrigger: { trigger: el, start, toggleActions, scrub, once },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [childSelector]);
  return ref;
}

export function useParallax(speed = 0.4) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [speed]);
  return ref;
}
