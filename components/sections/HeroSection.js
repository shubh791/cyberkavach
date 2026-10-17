'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CyberPhoneVisual } from '@/components/visuals/CyberPhoneVisual';

const capabilities = [
  {
    tone: 'emerald',
    icon: 'shield',
    title: 'Spot suspicious apps',
    description: 'Reviews unknown packages & sideloads.',
  },
  {
    tone: 'blue',
    icon: 'package',
    title: 'Understand permissions',
    description: 'Flags dangerous SMS & accessibility access.',
  },
  {
    tone: 'amber',
    icon: 'keyhole',
    title: 'Prevent risky installs',
    description: 'Interception perimeter stops threats before install.',
  },
];

function CapabilityIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {name === 'shield' && (
        <>
          <path d="M12 2.8 19 6v5.6c0 4.5-2.8 8.2-7 9.6-4.2-1.4-7-5.1-7-9.6V6Z" />
          <path d="m8.6 12 2.2 2.2 4.7-5" />
        </>
      )}
      {name === 'package' && (
        <>
          <path d="m12 2.8 8 4.5v9.2l-8 4.7-8-4.7V7.3Z" />
          <path d="m4 7.3 8 4.6 8-4.6M12 11.9v9.3M8 5l8 4.6" />
          <path d="m8.1 15.9 1.8 1.8 4-4.1" />
        </>
      )}
      {name === 'keyhole' && (
        <>
          <path d="M6.5 10V8a5.5 5.5 0 0 1 11 0v2" />
          <rect x="4.5" y="10" width="15" height="11" rx="3" />
          <path d="M12 14.2v3.5" />
          <circle cx="12" cy="14" r="1.3" />
        </>
      )}
    </svg>
  );
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 320,
        damping: 26,
      },
    },
  };

  return (
    <section
      aria-labelledby="hero-headline"
      className="hero-section"
    >
      <div className="fluid-container">
        <div className="hero-grid">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-copy-block"
          >
            <motion.div variants={itemVariants}>
              <div className="launch-status" role="status" aria-label="Launching soon status">
                <span className="launch-status-beacon" aria-hidden="true">
                  <span className="launch-status-beacon-ping" />
                  <span className="launch-status-beacon-core" />
                </span>
                <span className="launch-status-label">LAUNCHING SOON</span>
                <span className="launch-status-divider" aria-hidden="true">•</span>
                <span className="launch-status-sub">A SAFER DIGITAL FUTURE</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              id="hero-headline"
              className="hero-title"
            >
              Think before you install.<br />
              <span className="hero-title-accent">Meet your Kavach.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="hero-copy"
            >
              A safer digital future is taking shape. Cyber Kavach inspects deceptive messages and unfamiliar packages before risky apps take control.
            </motion.p>

            <motion.div variants={itemVariants} className="capability-list" aria-label="Planned capabilities">
              {capabilities.map((capability) => (
                <article className={`capability-panel capability-panel--${capability.tone}`} key={capability.title}>
                  <span className="capability-icon"><CapabilityIcon name={capability.icon} /></span>
                  <span className="capability-copy">
                    <strong>{capability.title}</strong>
                    <span>{capability.description}</span>
                  </span>
                </article>
              ))}
            </motion.div>
          </motion.div>

          <div className="phone-demo-wrap">
            <CyberPhoneVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
