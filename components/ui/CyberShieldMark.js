export function CyberShieldMark({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.5L4.5 5.8V11.8C4.5 16.5 7.7 20.8 12 22C16.3 20.8 19.5 16.5 19.5 11.8V5.8L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.5L7.5 9.2V13.2C7.5 16 9.4 18.5 12 19.3C14.6 18.5 16.5 16 16.5 13.2V9.2L12 6.5Z"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.2" r="1.2" fill="var(--accent)" />
    </svg>
  );
}

