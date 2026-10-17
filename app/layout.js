import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://cyberkavach.app"),
  title: {
    default: "Cyber Kavach | Next-Gen Mobile Security",
    template: "%s | Cyber Kavach",
  },
  description:
    "Think before you install. Meet Cyber Kavach — next-generation mobile cybersecurity engineering proactive threat interception, malicious package analysis, and runtime privacy protection. Launching soon.",
  applicationName: "Cyber Kavach",
  authors: [{ name: "Cyber Kavach Labs", url: "https://cyberkavach.app" }],
  generator: "Next.js",
  keywords: [
    "Cyber Kavach",
    "mobile cybersecurity",
    "Android security",
    "APK scanner",
    "malware protection",
    "permission guard",
    "sideload defense",
    "threat interception",
    "privacy shield",
    "device protection",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Cyber Kavach",
  publisher: "Cyber Kavach",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/favicon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Cyber Kavach | Next-Gen Mobile Security",
    description:
      "Think before you install. Meet your Kavach. Proactive mobile cybersecurity inspecting deceptive threats before risky apps take control.",
    url: "https://cyberkavach.app",
    siteName: "Cyber Kavach",
    images: [
      {
        url: "/favicon.svg",
        width: 512,
        height: 512,
        alt: "Cyber Kavach Security Shield",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Kavach | Next-Gen Mobile Security",
    description:
      "Think before you install. Meet your Kavach. Proactive handheld security launching soon.",
    images: ["/favicon.svg"],
    creator: "@CyberKavach",
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#080f1c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('cyberkavach-theme');
      var theme = (stored === 'dark' || stored === 'light')
        ? stored
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-foreground">
        <script
          id="cyberkavach-theme-init"
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
          suppressHydrationWarning
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
