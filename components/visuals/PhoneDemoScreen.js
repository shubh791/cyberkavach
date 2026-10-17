'use client';

export const DEMO_SCENARIOS = [
  {
    name: 'RewardBonus.apk',
    size: '18 MB',
    kind: 'bug',
    finding: 'Unknown source • suspicious package',
    message: 'Bhai ye install krle, free paise milenge 💸',
  },
  {
    name: 'ParcelGift.apk',
    size: '12 MB',
    kind: 'package',
    finding: 'Unverified sender • altered package',
    message: 'Your parcel is waiting. Install tracker to confirm delivery 📦',
  },
  {
    name: 'PrizeUnlock.apk',
    size: '16 MB',
    kind: 'warning',
    finding: 'Misleading offer • suspicious package',
    message: 'Congratulations! You won ₹25,000 cash bonus. Install now 🎁',
  },
  {
    name: 'CashHelper.apk',
    size: '9 MB',
    kind: 'code',
    finding: 'Unknown source • tampered signature',
    message: 'Instant loan pre-approved ₹50,000. Install app to claim ⚡',
  },
];

export function AppSymbol({ kind, width = '100%', height = '100%', className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === 'bug' && (
        <>
          <ellipse cx="16" cy="17" rx="8" ry="10" />
          <path d="M16 7V3M8 11 3 8M24 11l5-3M8 17H3M24 17h5M8 23l-4 4M24 23l4 4M16 7v20M11 15h10" />
        </>
      )}
      {kind === 'package' && (
        <>
          <path d="m16 3 12 7v14l-12 6-12-6V10Z" />
          <path d="m4 10 12 7 12-7M16 17v13M10 6l12 7" />
        </>
      )}
      {kind === 'warning' && (
        <>
          <path d="M16 3 30 28H2Z" />
          <path d="M16 12v7M16 24v.1" />
        </>
      )}
      {kind === 'code' && <path d="m11 8-7 8 7 8M21 8l7 8-7 8M19 4l-6 24" />}
    </svg>
  );
}

function ShieldCheck() {
  return (
    <svg className="demo-shield" viewBox="0 0 86 96" fill="none" aria-hidden="true">
      <path
        d="M43 2 79 17v27c0 23-15 43-36 50C22 87 7 67 7 44V17Z"
        fill="var(--accent-muted)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m28 45 10 10 21-24"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PackageLabel({ scenario }) {
  return (
    <div className="demo-package">
      <span>
        <AppSymbol kind={scenario.kind} />
      </span>
      <div>
        <strong>{scenario.name}</strong>
        <small>{scenario.size} · APK file</small>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="demo-home">
      <ShieldCheck />
      <h2>Protection active</h2>
      <p>Ready for new installations</p>
      <div className="demo-card">
        <span>APP INSTALLATION</span>
        <strong>Protection ready</strong>
        <span className="demo-ready">● Inspection enabled</span>
      </div>
    </div>
  );
}

function ChatScreen({ scenario, attachment, tapping }) {
  return (
    <div className="demo-chat">
      <div className="chat-heading">
        <span className="chat-avatar">?</span>
        <div>
          <strong>Unknown sender</strong>
          <small>Message request</small>
        </div>
      </div>
      <span className="chat-today">Today</span>
      <div className="chat-bubble">
        {scenario.message}
        <small>10:42</small>
      </div>
      <div className={`chat-attachment ${attachment ? 'is-visible' : ''}`}>
        <PackageLabel scenario={scenario} />
        <span className={`demo-tap ${tapping ? 'is-visible' : ''}`} />
      </div>
    </div>
  );
}

function PrepareScreen({ scenario }) {
  return (
    <div className="demo-prepare">
      <span className="demo-app-large">
        <AppSymbol kind={scenario.kind} />
      </span>
      <h2>Preparing installation…</h2>
      <PackageLabel scenario={scenario} />
      <p>Opening package for review</p>
    </div>
  );
}

function ScanScreen({ scenario, check, progressRef }) {
  return (
    <div className="demo-scan">
      <span className="demo-eyebrow">Cyber Kavach review</span>
      <h2>
        Scanning<br />
        <span>{scenario.name}</span>
      </h2>
      <div className="demo-progress">
        <span ref={progressRef} />
      </div>
      <ul className="demo-checks">
        {[
          'Checking app source',
          'Reviewing requested access',
          'Analysing risk signals',
        ].map((label, index) => (
          <li key={label} className={index <= check ? 'is-current' : ''}>
            <span>{index < check ? '✓' : '•'}</span>
            {label}
          </li>
        ))}
      </ul>
      <p>Inspecting before installation</p>
    </div>
  );
}

function WarningScreen({ scenario }) {
  return (
    <div className="demo-warning">
      <span className="demo-app-large">
        <AppSymbol kind="warning" />
      </span>
      <h2>High-risk app</h2>
      <p className="demo-finding">{scenario.finding}</p>
      <PackageLabel scenario={scenario} />
      <span className="demo-eyebrow">Requested access</span>
      <ul className="demo-permissions">
        {['Read SMS', 'Access contacts', 'Accessibility control'].map((label) => (
          <li key={label}>
            <span>!</span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlockedScreen({ scenario }) {
  return (
    <div className="demo-blocked">
      <ShieldCheck />
      <h2>Installation blocked</h2>
      <p>Cyber Kavach stopped this risky installation.</p>
      <div className="demo-block-result">
        <strong>{scenario.name}</strong>
        <span>High-risk app</span>
        <small>{scenario.finding}</small>
      </div>
      <span className="demo-ready">✓ Stopped before installation</span>
    </div>
  );
}

export function PhoneDemoScreen({ scene, scenario, check, progressRef }) {
  return (
    <div className="phone-demo-screen" data-scene={scene}>
      {scene === 'home' && <HomeScreen />}
      {['chat', 'attachment', 'tap'].includes(scene) && (
        <ChatScreen
          scenario={scenario}
          attachment={scene !== 'chat'}
          tapping={scene === 'tap'}
        />
      )}
      {scene === 'prepare' && <PrepareScreen scenario={scenario} />}
      {/* Keep the scan track mounted so the timeline always owns the same node */}
      <div hidden={scene !== 'scan'} className="h-full">
        <ScanScreen
          scenario={scenario}
          check={check}
          progressRef={progressRef}
        />
      </div>
      {scene === 'warning' && <WarningScreen scenario={scenario} />}
      {scene === 'blocked' && <BlockedScreen scenario={scenario} />}
    </div>
  );
}
