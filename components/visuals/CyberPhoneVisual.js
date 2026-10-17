'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PhoneDemoScreen, DEMO_SCENARIOS } from './PhoneDemoScreen';

const attacks = [
  {
    name: 'RewardBonus.apk',
    start: [130, 150],
    mid: [175, 191],
    impact: [221, 232],
    trailIndex: 0,
    color: 'var(--station-0-color)',
    bg: 'var(--station-0-bg)',
    border: 'var(--station-0-border)',
  },
  {
    name: 'ParcelGift.apk',
    start: [130, 415],
    mid: [175, 410],
    impact: [221, 404],
    trailIndex: 1,
    color: 'var(--station-1-color)',
    bg: 'var(--station-1-bg)',
    border: 'var(--station-1-border)',
  },
  {
    name: 'PrizeUnlock.apk',
    start: [548, 150],
    mid: [531, 191],
    impact: [513, 232],
    trailIndex: 2,
    color: 'var(--station-2-color)',
    bg: 'var(--station-2-bg)',
    border: 'var(--station-2-border)',
  },
  {
    name: 'CashHelper.apk',
    start: [548, 415],
    mid: [531, 410],
    impact: [513, 404],
    trailIndex: 3,
    color: 'var(--station-3-color)',
    bg: 'var(--station-3-bg)',
    border: 'var(--station-3-border)',
  },
];

export function CyberPhoneVisual({ className = '' }) {
  const rootRef = useRef(null);
  const phoneRef = useRef(null);
  const highlightRef = useRef(null);
  const shieldPulseRef = useRef(null);
  const boundaryRef = useRef(null);
  const stationRefs = useRef([]);
  const activeThreatRef = useRef(null);
  const activeRectRef = useRef(null);
  const activeIconRefs = useRef([]);
  const trailRefs = useRef([]);
  const rippleRef = useRef(null);
  const impactLightRef = useRef(null);
  const fragmentsRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [scene, setScene] = useState('home');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [checkIndex, setCheckIndex] = useState(0);

  // Check reduced motion on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setIsReducedMotion(true);
      setScene('blocked');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return undefined;
    }

    let currentAttack = 0;
    const data = () => attacks[currentAttack];

    const context = gsap.context(() => {
      // 1. Subtle, slow glass surface sweep highlight (phone is stable and upright)
      const surfaceSweep = gsap.timeline({ repeat: -1, repeatDelay: 6 });
      surfaceSweep
        .fromTo(
          highlightRef.current,
          { x: -110, opacity: 0 },
          { x: 260, opacity: 0.35, duration: 1.8, ease: 'power2.inOut' }
        )
        .to(highlightRef.current, { opacity: 0, duration: 0.3 });

      const trails = trailRefs.current.filter(Boolean);
      const stations = stationRefs.current.filter(Boolean);
      const impactElements = [rippleRef.current, impactLightRef.current, fragmentsRef.current];

      trails.forEach((trail) => {
        if (trail) gsap.set(trail, { opacity: 0, strokeDashoffset: 60 });
      });
      impactElements.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0 });
      });
      if (activeThreatRef.current) gsap.set(activeThreatRef.current, { opacity: 0 });
      if (boundaryRef.current) gsap.set(boundaryRef.current, { opacity: 0.35 });
      stations.forEach((station) => {
        if (station) gsap.set(station, { opacity: 0.72 });
      });

      const prepareDemo = () => {
        const current = data();
        setScenarioIndex(currentAttack);
        setScene('home');
        setCheckIndex(0);

        // Highlight active station around mobile with vivid presence, keep others at calm ambient
        stations.forEach((node, idx) => {
          if (node) {
            gsap.set(node, {
              opacity: idx === current.trailIndex ? 1 : 0.68,
              scale: idx === current.trailIndex ? 1.06 : 1,
            });
          }
        });

        // Set matching theme colors and icon inside active threat token
        if (activeRectRef.current) {
          activeRectRef.current.setAttribute('fill', current.bg);
          activeRectRef.current.setAttribute('stroke', current.color);
        }

        activeIconRefs.current.forEach((node, idx) => {
          if (node) {
            gsap.set(node, { opacity: idx === current.trailIndex ? 1 : 0 });
          }
        });

        gsap.set(activeThreatRef.current, {
          x: current.start[0],
          y: current.start[1],
          opacity: 0,
          scale: 0.95,
          rotation: 0,
        });

        trails.forEach((trail) => {
          if (trail) gsap.set(trail, { opacity: 0, strokeDashoffset: 60 });
        });
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(impactElements, { opacity: 0, scale: 1, rotation: 0 });
      };

      const advanceScenario = () => {
        currentAttack = (currentAttack + 1) % attacks.length;
      };

      // Single authoritative timeline: threat packages come one-by-one from their stations into the phone
      const demoTimeline = gsap.timeline({ repeat: -1, repeatRefresh: true });
      timelineRef.current = demoTimeline;

      demoTimeline
        // 0–2s: Cyber Kavach Protection Active Baseline
        .call(prepareDemo)
        .to({}, { duration: 2.0 })

        // 2–4.5s: WhatsApp chat reveals incoming scam message and attachment
        .call(() => setScene('chat'))
        .to({}, { duration: 1.2 })
        .call(() => setScene('attachment'))
        .to({}, { duration: 1.8 })

        // 4.5–6.5s: Simulated tap on attachment -> Preparing installation
        .call(() => setScene('tap'))
        .to({}, { duration: 0.35 })
        .call(() => setScene('prepare'))
        // Current small threat token departs its station and begins smooth approach along trail
        .fromTo(
          activeThreatRef.current,
          { opacity: 0, scale: 0.88, x: () => data().start[0], y: () => data().start[1] },
          { opacity: 1, scale: 1, x: () => data().mid[0], y: () => data().mid[1], duration: 1.4, ease: 'power1.out' }
        )
        // Active trail illuminates with its distinct color
        .call(() => {
          const activeIndex = data().trailIndex;
          trails.forEach((trail, idx) => {
            if (trail) {
              if (idx === activeIndex) {
                gsap.fromTo(
                  trail,
                  { strokeDashoffset: 60, opacity: 0 },
                  { strokeDashoffset: 0, opacity: 0.75, duration: 1.4, ease: 'none' }
                );
              } else {
                gsap.set(trail, { opacity: 0, strokeDashoffset: 60 });
              }
            }
          });
        })

        // 6.5–10s: In-device security scan opens
        .call(() => {
          setScene('scan');
          setCheckIndex(0);
        })
        .fromTo(
          progressRef.current,
          { scaleX: 0 },
          { scaleX: 0.35, duration: 1.1, ease: 'power1.inOut' }
        )
        // Token approaches pre-boundary perimeter
        .to(
          activeThreatRef.current,
          {
            x: () => (data().mid[0] + data().impact[0]) / 2,
            y: () => (data().mid[1] + data().impact[1]) / 2,
            duration: 2.0,
            ease: 'power1.inOut',
          },
          '<'
        )
        // Scan check 2
        .call(() => setCheckIndex(1))
        .to(progressRef.current, { scaleX: 0.7, duration: 1.0, ease: 'power1.inOut' })
        // Scan check 3
        .call(() => setCheckIndex(2))
        .to(progressRef.current, { scaleX: 1, duration: 1.0, ease: 'power1.inOut' })

        // 10–13.5s: Warning Panel with malicious findings & sensitive permissions
        .call(() => setScene('warning'))
        .to(boundaryRef.current, { opacity: 0.9, duration: 0.45, ease: 'power1.out' })
        .to({}, { duration: 3.2 }) // Clear reading window

        // 13.5–16s: Boundary Interception, Pulse Ripple & Installation Blocked
        .to(activeThreatRef.current, {
          x: () => data().impact[0],
          y: () => data().impact[1],
          duration: 0.55,
          ease: 'power2.in',
        })
        .set([rippleRef.current, impactLightRef.current, fragmentsRef.current], {
          x: () => data().impact[0],
          y: () => data().impact[1],
          transformOrigin: 'center center',
        })
        .fromTo(
          impactLightRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 0.85, scale: 1.25, duration: 0.22 }
        )
        .fromTo(
          rippleRef.current,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1.2, duration: 0.26 },
          '<'
        )
        .to(rippleRef.current, { opacity: 0, scale: 1.55, duration: 0.5, ease: 'power2.out' })
        .to(impactLightRef.current, { opacity: 0, scale: 1.4, duration: 0.35 }, '<')
        .fromTo(
          fragmentsRef.current,
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.5, duration: 0.5 },
          '<'
        )
        .to(activeThreatRef.current, { opacity: 0, scale: 0.5, duration: 0.28, ease: 'power2.in' }, '<')
        .call(() => setScene('blocked'))
        .to(
          shieldPulseRef.current,
          {
            scale: 1.05,
            duration: 0.2,
            repeat: 1,
            yoyo: true,
            transformOrigin: 'center center',
            ease: 'power1.inOut',
          },
          '<'
        )
        .call(() => {
          trails.forEach((trail) => {
            if (trail) gsap.to(trail, { opacity: 0, duration: 0.3 });
          });
        })
        .to(boundaryRef.current, { opacity: 0.35, duration: 0.4 }, '<')

        // 16–18.5s: Hold blocked result for reading, then advance to next scenario
        .to({}, { duration: 2.6 })
        .call(advanceScenario)
        .to({}, { duration: 0.5 });
    }, rootRef);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (timelineRef.current) {
          if (!isVisible || document.hidden) timelineRef.current.pause();
          else timelineRef.current.resume();
        }
      },
      { threshold: 0.08 }
    );

    if (rootRef.current) observer.observe(rootRef.current);

    const handleVisibility = () => {
      if (timelineRef.current) {
        if (document.hidden || !isVisible) timelineRef.current.pause();
        else timelineRef.current.resume();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      context.revert();
    };
  }, []);

  const currentScenario = DEMO_SCENARIOS[scenarioIndex] || DEMO_SCENARIOS[0];

  return (
    <div className={`phone-demo-wrap ${className}`}>
      <div ref={rootRef} className="phone-visual" aria-hidden="true">
        <svg viewBox="100 40 535 540" role="presentation" focusable="false">
          <defs>
            <linearGradient id="phone-metal" x1="250" y1="80" x2="492" y2="545" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--phone-metal-light)" />
              <stop offset="0.3" stopColor="var(--phone-metal-mid)" />
              <stop offset="0.72" stopColor="var(--phone-metal-dark)" />
              <stop offset="1" stopColor="var(--phone-metal-light)" />
            </linearGradient>
            <linearGradient id="phone-screen" x1="280" y1="104" x2="454" y2="526" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--phone-screen-top)" />
              <stop offset="1" stopColor="var(--phone-screen-bottom)" />
            </linearGradient>
            <linearGradient id="boundary-fill" x1="367" y1="70" x2="367" y2="560" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.12" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <filter id="phone-shadow" x="-30%" y="-20%" width="160%" height="170%">
              <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="var(--phone-shadow)" floodOpacity="0.45" />
            </filter>
            <filter id="tile-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="var(--phone-shadow)" floodOpacity="0.25" />
            </filter>
            <clipPath id="screen-clip">
              <rect x="272" y="101" width="181" height="422" rx="29" />
            </clipPath>
          </defs>

          {/* Background Ambient Defensive Stage Ring */}
          <g className="phone-stage-lines" fill="none" stroke="var(--border-subtle)" strokeWidth="1">
            <ellipse cx="367" cy="317" rx="195" ry="250" strokeDasharray="3 10" opacity="0.35" />
          </g>

          {/* Protective Boundary Surrounding Mobile Phone */}
          <g ref={boundaryRef}>
            <ellipse cx="367" cy="317" rx="148" ry="248" fill="url(#boundary-fill)" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5" />
            <ellipse cx="367" cy="317" rx="142" ry="238" fill="none" stroke="var(--accent)" strokeOpacity="0.25" strokeDasharray="4 8" />
          </g>

          {/* Approach Trail Guides from Each Station into Boundary with Matching Theme Colors */}
          <g className="attack-trails" fill="none" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 7">
            <path ref={(node) => { trailRefs.current[0] = node; }} d="M156 176 C186 188 208 208 221 232" stroke="var(--station-0-color)" opacity="0" />
            <path ref={(node) => { trailRefs.current[1] = node; }} d="M156 441 C186 429 208 417 221 404" stroke="var(--station-1-color)" opacity="0" />
            <path ref={(node) => { trailRefs.current[2] = node; }} d="M574 176 C544 188 522 208 513 232" stroke="var(--station-2-color)" opacity="0" />
            <path ref={(node) => { trailRefs.current[3] = node; }} d="M574 441 C544 429 522 417 513 404" stroke="var(--station-3-color)" opacity="0" />
          </g>

          {/* 4 Distinctly Colored Stationed Threat Tiles Around Mobile Phone (52px x 52px) */}
          {/* Station 0: Top-Left (Bug / Malware - Rose Red) */}
          <g ref={(node) => { stationRefs.current[0] = node; }} transform="translate(130 150)" filter="url(#tile-shadow)">
            <rect width="52" height="52" rx="14" fill="var(--station-0-bg)" stroke="var(--station-0-border)" strokeWidth="1.6" />
            <g transform="translate(13 13)" stroke="var(--station-0-color)">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="7" y="8" width="10" height="12" rx="5" fill="var(--station-0-bg)" />
                <path d="M12 4V1M5 6l-2-2M19 6l2-2M4 12H2M22 12h-2M5 18l-2 2M19 18l2 2M12 8v12M8 13h8" />
              </svg>
            </g>
          </g>

          {/* Station 1: Bottom-Left (Package / Altered APK - Amber Orange) */}
          <g ref={(node) => { stationRefs.current[1] = node; }} transform="translate(130 415)" filter="url(#tile-shadow)">
            <rect width="52" height="52" rx="14" fill="var(--station-1-bg)" stroke="var(--station-1-border)" strokeWidth="1.6" />
            <g transform="translate(13 13)" stroke="var(--station-1-color)">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 8 4.5v11l-8 4.5-8-4.5v-11Z" fill="var(--station-1-bg)" />
                <path d="m4 6.5 8 4.5 8-4.5M12 11v11M8 4.25l8 4.5" />
              </svg>
            </g>
          </g>

          {/* Station 2: Top-Right (Warning / Phishing - Violet Purple) */}
          <g ref={(node) => { stationRefs.current[2] = node; }} transform="translate(548 150)" filter="url(#tile-shadow)">
            <rect width="52" height="52" rx="14" fill="var(--station-2-bg)" stroke="var(--station-2-border)" strokeWidth="1.6" />
            <g transform="translate(13 13)" stroke="var(--station-2-color)">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3 10 18H2Z" fill="var(--station-2-bg)" strokeLinejoin="round" />
                <path d="M12 9v5M12 17.5v.1" strokeWidth="2.2" />
              </svg>
            </g>
          </g>

          {/* Station 3: Bottom-Right (Code / Tampered Signature - Cyan Blue) */}
          <g ref={(node) => { stationRefs.current[3] = node; }} transform="translate(548 415)" filter="url(#tile-shadow)">
            <rect width="52" height="52" rx="14" fill="var(--station-3-bg)" stroke="var(--station-3-border)" strokeWidth="1.6" />
            <g transform="translate(13 13)" stroke="var(--station-3-color)">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
              </svg>
            </g>
          </g>

          {/* Single Active Moving Threat Token (52px x 52px) */}
          <g ref={activeThreatRef} className="active-threat" filter="url(#tile-shadow)">
            <rect ref={activeRectRef} width="52" height="52" rx="14" fill="var(--station-0-bg)" stroke="var(--station-0-color)" strokeWidth="1.8" />
            {/* Bug Icon */}
            <g ref={(node) => { activeIconRefs.current[0] = node; }} transform="translate(13 13)" stroke="var(--station-0-color)">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="7" y="8" width="10" height="12" rx="5" fill="var(--station-0-bg)" />
                <path d="M12 4V1M5 6l-2-2M19 6l2-2M4 12H2M22 12h-2M5 18l-2 2M19 18l2 2M12 8v12M8 13h8" />
              </svg>
            </g>
            {/* Package Icon */}
            <g ref={(node) => { activeIconRefs.current[1] = node; }} transform="translate(13 13)" stroke="var(--station-1-color)">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 8 4.5v11l-8 4.5-8-4.5v-11Z" fill="var(--station-1-bg)" />
                <path d="m4 6.5 8 4.5 8-4.5M12 11v11M8 4.25l8 4.5" />
              </svg>
            </g>
            {/* Warning Icon */}
            <g ref={(node) => { activeIconRefs.current[2] = node; }} transform="translate(13 13)" stroke="var(--station-2-color)">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3 10 18H2Z" fill="var(--station-2-bg)" strokeLinejoin="round" />
                <path d="M12 9v5M12 17.5v.1" strokeWidth="2.2" />
              </svg>
            </g>
            {/* Code Icon */}
            <g ref={(node) => { activeIconRefs.current[3] = node; }} transform="translate(13 13)" stroke="var(--station-3-color)">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
              </svg>
            </g>
          </g>

          {/* Upright, Grounded, Stable Phone Device Hardware Frame */}
          <g ref={phoneRef} className="phone-device-frame" filter="url(#phone-shadow)">
            <rect x="248" y="76" width="238" height="482" rx="46" fill="url(#phone-metal)" />
            <rect x="250.5" y="78.5" width="233" height="477" rx="43.5" fill="none" stroke="var(--phone-edge-highlight)" strokeWidth="1" />
            <path d="M273 88 C315 76 413 76 457 91" fill="none" stroke="var(--phone-edge-highlight)" strokeWidth="1.25" strokeLinecap="round" />
            <rect x="255" y="84" width="224" height="466" rx="40" fill="var(--phone-rim)" stroke="var(--phone-edge)" strokeWidth="1.4" />
            <rect x="272" y="101" width="181" height="422" rx="29" fill="url(#phone-screen)" stroke="var(--phone-glass-border)" />
            <rect x="324" y="111" width="78" height="20" rx="10" fill="var(--phone-notch)" />
            <circle cx="385" cy="121" r="3.2" fill="var(--phone-camera)" />

            {/* Clipped Screen & Glass Sheen Overlay */}
            <g clipPath="url(#screen-clip)">
              <circle ref={shieldPulseRef} cx="362" cy="263" r="105" fill="var(--accent)" opacity="0.06" />
              <path ref={highlightRef} d="M239 82 316 82 462 542 385 542Z" fill="url(#glass-sheen)" opacity="0.2" />

              {/* React-rendered Phone Screen Components inside foreignObject */}
              <foreignObject x="272" y="101" width="181" height="422">
                <PhoneDemoScreen
                  scene={isReducedMotion ? 'blocked' : scene}
                  scenario={currentScenario}
                  check={checkIndex}
                  progressRef={progressRef}
                />
              </foreignObject>
            </g>

            <rect x="326" y="504" width="74" height="4" rx="2" fill="var(--phone-text-muted)" opacity="0.35" />
            <path d="M245 179h-5v52h5M487 205h5v72h-5" stroke="var(--phone-metal-mid)" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Interception Boundary Effects at Contact Point */}
          <circle ref={impactLightRef} cx="0" cy="0" r="24" fill="var(--accent)" opacity="0.2" />
          <g ref={rippleRef} fill="none" stroke="var(--accent)">
            <circle r="16" strokeWidth="2" />
            <circle r="26" strokeWidth="1" opacity="0.45" />
          </g>

          <g ref={fragmentsRef} fill="var(--threat)">
            <circle cx="0" cy="-6" r="2" />
            <circle cx="7" cy="4" r="1.8" opacity="0.8" />
            <circle cx="-6" cy="5" r="1.6" opacity="0.7" />
          </g>
        </svg>
      </div>
    </div>
  );
}
