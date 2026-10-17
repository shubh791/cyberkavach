'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

function SunIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme, mounted } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  // Maintain dimension during SSR/initial hydration to eliminate layout shift
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Toggle visual theme"
        className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border-subtle bg-surface text-foreground-secondary opacity-60 cursor-default ${className}`}
      >
        <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-border-subtle animate-pulse" />
      </button>
    );
  }

  const nextModeLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={nextModeLabel}
      aria-pressed={isDark}
      title={nextModeLabel}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border-subtle bg-surface text-foreground-secondary hover:text-foreground hover:bg-surface-elevated hover:border-border-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'dark' : 'light'}
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, rotate: isDark ? -45 : 45, scale: 0.75 }
          }
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, rotate: isDark ? 45 : -45, scale: 0.75 }
          }
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="inline-flex items-center justify-center"
        >
          {isDark ? (
            <SunIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
          ) : (
            <MoonIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
