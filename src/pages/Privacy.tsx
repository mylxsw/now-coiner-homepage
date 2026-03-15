import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { ThemeProvider } from "@/contexts/ThemeContext";

function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.065] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E)",
      }}
    />
  );
}

function Halo() {
  return (
    <div
      aria-hidden
      className="absolute -top-32 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in oklab, oklch(0.74 0.14 195) 30%, transparent) 0%, transparent 72%)",
      }}
    />
  );
}

export default function Privacy() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Halo />
        <NoiseOverlay />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-5 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 md:py-20">
        <article className="prose prose-invert max-w-none text-white/80">
          <h1 className="font-display text-4xl font-semibold leading-tight text-white mb-2">Privacy Policy for NowCoiner</h1>
          <p className="text-white/60 mb-8"><strong>Effective date:</strong> March 15, 2026</p>

          <p>NowCoiner respects your privacy. This Privacy Policy explains how the NowCoiner macOS application handles user information.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Overview</h2>
          <p>NowCoiner is a lightweight macOS menu bar application that displays real-time cryptocurrency prices. The app retrieves publicly available market price data and displays it in the macOS menu bar.</p>
          <p>NowCoiner <strong>does not collect, store, or share personal information</strong> from users.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Information We Collect</h2>
          <p>NowCoiner does <strong>not collect personal data</strong>, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-white/70 marker:text-white/40">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Location</li>
            <li>Contacts</li>
            <li>Photos</li>
            <li>Payment information</li>
            <li>Device identifiers</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">How the App Works</h2>
          <p>The app retrieves cryptocurrency price data from a <strong>public cryptocurrency price API</strong> in order to display market prices in the menu bar.</p>
          <p>No personal data is transmitted when retrieving this public market data.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Analytics</h2>
          <p>NowCoiner <strong>does not use analytics tools</strong> and does not track user behavior.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Advertising</h2>
          <p>NowCoiner <strong>does not display advertisements</strong> and does not use advertising tracking technologies.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Data Sharing</h2>
          <p>We <strong>do not sell, share, or disclose personal information</strong> to third parties.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Data Retention</h2>
          <p>Because NowCoiner does not collect personal information, <strong>no personal user data is stored or retained</strong>.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Children's Privacy</h2>
          <p>NowCoiner does not knowingly collect personal information from children.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

          <h2 className="font-display text-2xl font-semibold text-white mt-10 mb-4">Contact</h2>
          <p>If you have any questions about this Privacy Policy, you can contact us at:</p>
          <p className="mt-2"><strong>Email:</strong> <a href="mailto:mylxsw@gmail.com" className="text-primary hover:underline">mylxsw@gmail.com</a></p>
        </article>
      </main>
    </div>
  );
}
