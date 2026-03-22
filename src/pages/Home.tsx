import React, { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ArrowRight,
  Gauge,
  Globe,
  Layers,
  LineChart,
  ListOrdered,
  Network,
  Pin,
  Search,
  ShieldCheck,
  Sparkles,
  SunMoon,
  Timer,
} from "lucide-react";

import logoUrl from "@/assets/logo.png";
import menubarDemoUrl from "@/assets/menubar-sample.jpeg";

interface HomeProps {
  targetSection?: string;
}

type Lang = "en" | "zh";

type NavItem = { id: string; label: string };

const APP_STORE_URL = "https://apps.apple.com/app/nowcoiner/id6759320009";
const GITHUB_URL = "https://github.com/mylxsw/now-coiner";
const ABOUT_URL = "https://gulu.ai";

function cnJoin(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("nowcoiner_lang");
    return saved === "zh" ? "zh" : "en"; // default EN
  });

  useEffect(() => {
    localStorage.setItem("nowcoiner_lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  return [lang, setLang];
}

const copy = {
  en: {
    nav: {
      features: "Features",
      realtime: "Real-time",
      settings: "Preferences",
      faq: "FAQ",
    },
    top: {
      subtitle: "macOS menubar crypto tracker",
      download: "Download",
      github: "GitHub",
      lang: "Language",
    },
    hero: {
      pill: "Native Swift · Real-time WebSocket · Featherlight",
      h1: "Keep prices in the corner of your eye.",
      p: "NowCoiner is a macOS menubar crypto tracker: configurable multi-coin ticker, pin/unpin, drag-to-reorder, and a rich detail view with market data — fast, clean, and distraction-free.",
      ctaPrimary: "Download NowCoiner",
      ctaSecondary: "GitHub",
      stats: {
        s1v: "< 1s",
        s1l: "Update cadence",
        s2v: "WS",
        s2l: "Binance miniTicker",
        s4v: "Swift",
        s4l: "Native & efficient",
      },
      menubarPreview: "Menubar preview",
      ws: "WebSocket",
      sample: "Sample image",
      sampleHint: "Ticker · Sparklines · Detail preview",
    },
    features: {
      k: "Powerful features",
      h2: "Everything you need—nothing you don’t",
      p: "Watchlist management, context menu, keyboard navigation, debounced search, sparklines, and a dense coin detail page. Focus on the moves—NowCoiner handles the rest.",
      cards: [
        {
          t: "Pin / Unpin + Move to Top",
          m: "Context menu",
          d: "Pin prices to the menubar for always-on visibility, plus quick actions: Move to top, Remove, TradingView, and Exchange.",
          icon: "pin",
        },
        {
          t: "Watchlist that feels like an IDE",
          m: "Drag to reorder",
          d: "Clear selection state, drag-and-drop ordering, pin status, remove, and move-to-top—fast and predictable.",
          icon: "list",
        },
        {
          t: "Snappy search (300ms debounce)",
          d: "Local filtering for instant results—add coins without waiting for the network.",
          icon: "search",
        },
        {
          t: "Inline sparklines",
          m: "Swift Charts",
          d: "See 7‑day momentum right inside the list, with strong up/down colors for instant scanning.",
          icon: "chart",
        },
      ],
    },
    realtime: {
      k: "Real-time pipeline",
      h2: "Fast. Stable. Recoverable.",
      p: "WebSocket handles second-level price updates, while periodic refresh fills in market fields—real-time and complete.",
      b1: {
        t: "Binance miniTicker WebSocket",
        d: "Live ticks · auto reconnect · ping keepalive",
      },
      b2: {
        t: "CoinGecko simple/price",
        d: "Periodic refresh for additional fields",
      },
      b3: {
        t: "CoinGecko coins/markets",
        d: "Refresh sparklines every 5 minutes",
      },
      stability: {
        title: "Stability by design",
        desc: "Let WebSocket do the fast path, and let caches + scheduled refresh do the heavy lifting—smooth under pressure.",
        bullets: [
          {
            t: "Auto reconnect",
            d: "Exponential backoff + ping keepalive.",
          },
          {
            t: "Market data backfill",
            d: "Scheduled refresh keeps fields and sparklines complete.",
          },
        ],
      },
      stats: {
        s1v: "300ms",
        s1l: "Search debounce",
        s2v: "99.9%",
        s2l: "Reliability goal",
      },
    },
    settings: {
      k: "Preferences",
      h2: "Make it yours",
      p: "The menubar rewards restraint. NowCoiner lets you tune appearance, currency, refresh strategy, and defaults to match your workflow.",
      prefs: [
        { t: "Appearance", d: "Light / Dark / System" },
        { t: "Menubar style", d: "Ticker spacing and formatting" },
        { t: "Refresh interval", d: "Tune for your network and needs" },
        { t: "Default source / exchange", d: "Match your trading habits" },
      ],
      demo: {
        title: "Quick preferences preview",
        hint: "Website demo — doesn’t change your real settings",
        badge: "Demo",
        buttons: [
          "Launch at login",
          "Quote currency",
          "Up/Down colors",
          "Default exchange",
        ],
        cta: "Configure",
      },
    },
    faq: {
      k: "FAQ",
      h2: "Common questions",
      qa: [
        {
          q: "What data sources are supported?",
          a: "Real-time prices come primarily from Binance WebSocket (miniTicker). CoinGecko endpoints are used to refresh extra fields and market data.",
        },
        {
          q: "Is it resource-heavy?",
          a: "NowCoiner is built natively in Swift and keeps updates lightweight. Usage depends on how many coins you pin and your refresh settings.",
        },
        {
          q: "Is NowCoiner open source and free?",
          a: "Yes. NowCoiner is open source, and you can build and use it yourself at no cost. If you'd like to support ongoing development, the App Store version is the same app as the open source release and costs about the price of a cup of coffee.",
        },
        {
          q: "Does NowCoiner read my private information or wallet data?",
          a: "No. NowCoiner is a market-tracking tool, not a wallet or custody service. It does not read, store, or upload your private information, wallet contents, or private keys. The app connects directly to public cryptocurrency data providers to fetch market data, so you can monitor prices without exposing personal or wallet information.",
        },
      ],
    },
    cta: {
      title: "Put prices in your menubar today.",
      desc: "Set up your watchlist once—NowCoiner keeps an eye on it while you stay focused.",
      primary: "Download",
      secondary: "Feedback / Partnerships",
    },
    footer: {
      privacy: "Privacy",
      about: "About",
      contact: "Contact",
      comingSoonTitle: "Coming soon",
      comingSoonDesc: "I’ll hook up the real link once you send it.",
      linksTip: "App Store is live · GitHub is available",
    },
  },
  zh: {
    nav: {
      features: "功能",
      realtime: "实时链路",
      settings: "设置",
      faq: "FAQ",
    },
    top: {
      subtitle: "macOS 菜单栏加密追踪",
      download: "下载",
      github: "GitHub",
      lang: "语言",
    },
    hero: {
      pill: "原生 Swift · WebSocket 实时 · 资源占用极低",
      h1: "让价格，永远在你余光里。",
      p: "NowCoiner 是一款基于 macOS 菜单栏的加密货币价格追踪应用：多币种可配置展示、Pin、拖拽排序、以及市场数据。专注、干净、响应快。",
      ctaPrimary: "下载 NowCoiner",
      ctaSecondary: "GitHub",
      stats: {
        s1v: "< 1s",
        s1l: "价格更新速度",
        s2v: "WS",
        s2l: "Binance miniTicker",
        s4v: "Swift",
        s4l: "原生低资源",
      },
      menubarPreview: "macOS 菜单栏预览",
      ws: "WebSocket",
      sample: "示例图",
      sampleHint: "多币种 ticker · Sparkline · 详情预览",
    },
    features: {
      k: "Powerful features",
      h2: "该有的效率工具，一项不落",
      p: "主页列表、右键菜单、键盘导航、搜索防抖、Sparkline、详情页市场数据与开发者信息。你只需要盯住价格波动，其他交给 NowCoiner。",
      cards: [
        {
          t: "Pin / Unpin 与置顶",
          m: "右键菜单",
          d: "Pin 到菜单栏，多币种 ticker 一眼看全；支持 Move to top、Remove、TradingView/Exchange 快捷跳转。",
          icon: "pin",
        },
        {
          t: "列表管理像在用 IDE",
          m: "拖拽排序",
          d: "选中态、拖拽排序、删除、置顶、Pin 状态清晰可见。用键盘也能完成同样的操作。",
          icon: "list",
        },
        {
          t: "搜索更快：300ms 防抖",
          d: "本地过滤，添加币种无需等待网络；适合频繁改 watchlist 的交易者与长期持仓党。",
          icon: "search",
        },
        {
          t: "行内 Sparkline",
          m: "Swift Charts",
          d: "列表里就能看到 7 天趋势，配合涨跌配色一眼判断方向与动量。",
          icon: "chart",
        },
      ],
    },
    realtime: {
      k: "Real-time pipeline",
      h2: "实时更新链路：快、稳、可恢复",
      p: "价格既实时又完整，断线重连 + 指数退避，保证波动剧烈时也能恢复更新。",
      b1: {
        t: "Binance miniTicker WebSocket",
        d: "实时推送 · 自动重连 · ping 保活",
      },
      b2: {
        t: "CoinGecko simple/price",
        d: "周期性刷新，补充字段，保证展示完整",
      },
      b3: {
        t: "CoinGecko coins/markets",
        d: "每 5 分钟刷新 Sparkline 数据",
      },
      stability: {
        title: "稳态设计：快，但不躁",
        desc: "把“秒级价格”交给 WebSocket，把“重信息”交给缓存与周期刷新。体验会更丝滑。",
        bullets: [
          {
            t: "断线自动重连",
            d: "指数退避 + ping 保活，波动剧烈也能恢复更新。",
          },
          {
            t: "市场数据定时补全",
            d: "周期刷新补充字段与 Sparkline 数据，实时又完整。",
          },
        ],
      },
      stats: {
        s1v: "300ms",
        s1l: "搜索防抖",
        s2v: "99.9%",
        s2l: "可用性目标",
      },
    },
    settings: {
      k: "Preferences",
      h2: "你可以把它调成“自己的样子”",
      p: "菜单栏是最讲究“克制与一致性”的地方。NowCoiner 把样式、计价与数据源都交给你。",
      prefs: [
        { t: "外观模式", d: "浅色 / 深色 / 跟随系统" },
        { t: "菜单栏样式", d: "文本、间距、展示顺序可配" },
        { t: "刷新间隔", d: "按你的网络与偏好调整" },
        { t: "默认数据源/交易所", d: "更符合你的交易习惯" },
      ],
      demo: {
        title: "快速偏好预览",
        hint: "（官网演示，不会真的改你的设置）",
        badge: "Demo",
        buttons: ["开机自启", "计价货币", "涨跌配色", "默认交易所"],
        cta: "配置",
      },
    },
    faq: {
      k: "FAQ",
      h2: "常见问题",
      qa: [
        {
          q: "支持哪些数据源？",
          a: "实时价格主要来自 Binance WebSocket（miniTicker）。补充字段与市场数据由 CoinGecko 的接口周期刷新。",
        },
        {
          q: "会很占资源吗？",
          a: "NowCoiner 使用原生 Swift 开发，并尽量让更新与渲染保持轻量。实际占用取决于你 Pin 的币种数量与刷新设置。",
        },
        {
          q: "NowCoiner 是开源且免费的吗？",
          a: "是的。NowCoiner 已经开源，你可以完全免费地自行编译和使用。如果你愿意支持后续开发，也欢迎在 App Store 购买正式版。它与开源版本保持一致，价格也只是一杯咖啡的钱。",
        },
        {
          q: "NowCoiner 会读取我的隐私信息或钱包数据吗？",
          a: "不会。NowCoiner 只是一个行情追踪工具，不是钱包，也不托管任何资产。它不会读取、存储或上传你的隐私信息、钱包内容或私钥。应用只是直接连接公开的加密货币数据服务来获取行情，因此你可以在不暴露个人信息或钱包信息的情况下查看市场数据。",
        },
      ],
    },
    cta: {
      title: "今天就把价格放进菜单栏。",
      desc: "适合想“少看一眼 K 线、多做一点正事”的你。把 watchlist 排好，让 NowCoiner 在余光里帮你盯着。",
      primary: "下载",
      secondary: "反馈/合作",
    },
    footer: {
      privacy: "隐私政策",
      about: "关于",
      contact: "联系",
      comingSoonTitle: "即将上线",
      comingSoonDesc: "敬请期待。",
      linksTip: "App Store 已上线 · GitHub 已可访问",
    },
  },
} as const;

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

function AppIcon({ size = 40 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex items-center justify-center overflow-hidden rounded-[14px] border border-white/10 bg-white/8 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.10)]"
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 120% at 30% 20%, color-mix(in oklab, oklch(0.74 0.14 195) 22%, transparent) 0%, transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12))",
        }}
      />
      <span className="relative m-[3px] inline-flex h-[calc(100%-6px)] w-[calc(100%-6px)] items-center justify-center overflow-hidden rounded-[12px] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
        <img
          src={logoUrl}
          alt="NowCoiner"
          className="h-full w-full object-cover"
        />
      </span>
    </span>
  );
}

function MenuBarMock({ t }: { t: typeof copy.en }) {
  const items = useMemo(
    () => [
      { sym: "BTC", price: "63,532.42", delta: "+2.13%" },
      { sym: "ETH", price: "1,836.87", delta: "+0.48%" },
      { sym: "SOL", price: "76.95", delta: "-1.02%" },
    ],
    [],
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_120px_-60px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9">
          <AppIcon size={36} />
        </div>
        <div className="text-sm text-white/70">{t.hero.menubarPreview}</div>
        <div className="ml-auto flex items-center gap-2 text-xs text-white/50">
          <span className="inline-flex items-center gap-1">
            <Network className="h-3.5 w-3.5" /> {t.hero.ws}
          </span>
          <span className="inline-flex items-center gap-1">
            <Timer className="h-3.5 w-3.5" /> &lt; 1s
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {items.map((it) => (
          <div
            key={it.sym}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2"
          >
            <span className="font-display text-[11px] tracking-wider text-white/80">
              {it.sym}
            </span>
            <span className="font-mono text-[12px] text-white">
              ${it.price}
            </span>
            <span
              className={cnJoin(
                "text-[11px]",
                it.delta.startsWith("-") ? "text-red-300" : "text-emerald-300",
              )}
            >
              {it.delta}
            </span>
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div className="font-display text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  meta,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  meta?: string;
}) {
  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/5 p-5 text-card-foreground shadow-none">
      <div
        aria-hidden
        className="absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, oklch(0.74 0.14 195) 35%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-semibold text-white">
              {title}
            </h3>
            {meta ? (
              <Badge
                variant="secondary"
                className="border-white/10 bg-white/10 text-white/70"
              >
                {meta}
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/65">{desc}</p>
        </div>
      </div>
    </Card>
  );
}

function ResilienceBlock({ t }: { t: typeof copy.en }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-black/30 p-6">
      <div className="flex items-center gap-2 text-white">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <div className="font-display text-lg font-semibold">
          {t.realtime.stability.title}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/65">
        {t.realtime.stability.desc}
      </p>

      <div className="mt-5 grid gap-3">
        {t.realtime.stability.bullets.map((b) => (
          <div
            key={b.t}
            className="rounded-2xl border border-white/10 bg-black/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <div className="font-display text-sm font-semibold text-white">
              {b.t}
            </div>
            <div className="mt-1 text-sm text-white/60">{b.d}</div>
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, oklch(0.74 0.14 195) 35%, transparent) 0%, transparent 72%)",
        }}
      />
    </div>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const [lang, setLang] = useLang();
  const t = (lang === "zh" ? copy.zh : copy.en) as typeof copy.en;
  const openGitHub = () =>
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");

  const nav: NavItem[] = useMemo(
    () => [
      { id: "features", label: t.nav.features },
      { id: "realtime", label: t.nav.realtime },
      { id: "settings", label: t.nav.settings },
      { id: "faq", label: t.nav.faq },
    ],
    [t.nav.faq, t.nav.features, t.nav.realtime, t.nav.settings],
  );

  // Scroll to target section when URL changes (e.g., /#/features → scroll to #features)
  useEffect(() => {
    if (targetSection) {
      document
        .getElementById(targetSection)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetSection]);

  const onComingSoon = (what: string) =>
    toast.message(t.footer.comingSoonTitle, {
      description: `${what} · ${t.footer.comingSoonDesc}`,
    });

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Halo />
        <NoiseOverlay />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <AppIcon size={40} />
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold tracking-tight text-white">
                NowCoiner
              </div>
              <div className="text-[11px] text-white/55">{t.top.subtitle}</div>
            </div>
          </Link>

          <nav className="ml-auto hidden items-center gap-4 md:flex">
            {nav.map((it) => (
              <Link
                key={it.id}
                href={`/${it.id}`}
                className="text-sm text-white/65 transition-colors hover:text-white"
              >
                {it.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-4">
            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:inline-flex">
              <Button
                size="sm"
                variant={lang === "en" ? "secondary" : "ghost"}
                className={cnJoin(
                  "h-8 rounded-full px-3",
                  lang === "en"
                    ? "bg-white/12 text-white hover:bg-white/15"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
                onClick={() => setLang("en")}
              >
                EN
              </Button>
              <Button
                size="sm"
                variant={lang === "zh" ? "secondary" : "ghost"}
                className={cnJoin(
                  "h-8 rounded-full px-3",
                  lang === "zh"
                    ? "bg-white/12 text-white hover:bg-white/15"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
                onClick={() => setLang("zh")}
              >
                中文
              </Button>
            </div>

            <Button
              asChild
              variant="secondary"
              className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
            >
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                {t.top.download}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="hidden border-white/15 bg-transparent text-white/80 hover:bg-white/10 md:inline-flex"
              onClick={openGitHub}
            >
              {t.top.github}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white/75 hover:bg-white/10 hover:text-white"
              onClick={() => {
                setLang(lang === "en" ? "zh" : "en");
                toast.message(t.top.lang, {
                  description:
                    lang === "en" ? "Switched to 中文" : "Switched to English",
                });
              }}
              aria-label={t.top.lang}
            >
              <Globe className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-5">
        <section className="relative py-16 md:py-20">
          <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {t.hero.pill}
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
                {t.hero.h1}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                {t.hero.p}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-transparent text-white/80 hover:bg-white/10"
                  onClick={openGitHub}
                >
                  {t.hero.ctaSecondary}
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Stat value={t.hero.stats.s1v} label={t.hero.stats.s1l} />
                <Stat value={t.hero.stats.s2v} label={t.hero.stats.s2l} />
                <Stat value={t.hero.stats.s4v} label={t.hero.stats.s4l} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.05,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="space-y-4"
            >
              <MenuBarMock t={t} />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={menubarDemoUrl}
                  alt="NowCoiner sample screenshot"
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="text-xs text-white/70">{t.hero.sample}</div>
                  <div className="text-xs text-white/55">
                    {t.hero.sampleHint}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Separator className="bg-white/10" />

        {/* Features */}
        <section id="features" className="scroll-mt-28 py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs text-white/55">{t.features.k}</div>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white">
                {t.features.h2}
              </h2>
            </div>
            <div className="max-w-xl text-sm leading-relaxed text-white/65">
              {t.features.p}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {t.features.cards.map((c: { t: string; d: string; icon: string; m?: string }) => {
              const icon =
                c.icon === "pin" ? (
                  <Pin className="h-5 w-5" />
                ) : c.icon === "list" ? (
                  <ListOrdered className="h-5 w-5" />
                ) : c.icon === "search" ? (
                  <Search className="h-5 w-5" />
                ) : c.icon === "chart" ? (
                  <LineChart className="h-5 w-5" />
                ) : c.icon === "layers" ? (
                  <Layers className="h-5 w-5" />
                ) : (
                  <ShieldCheck className="h-5 w-5" />
                );
              return (
                <FeatureCard
                  key={c.t}
                  icon={icon}
                  title={c.t}
                  meta={"m" in c ? c.m : undefined}
                  desc={c.d}
                />
              );
            })}
          </div>
        </section>

        {/* Real-time */}
        <section id="realtime" className="scroll-mt-28 py-16">
          <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="text-xs text-white/55">{t.realtime.k}</div>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white">
                {t.realtime.h2}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {t.realtime.p}
              </p>

              <div className="mt-6 grid gap-3">
                <Card className="border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-primary">
                      <Network className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-display text-base font-semibold text-white">
                        {t.realtime.b1.t}
                      </div>
                      <div className="text-sm text-white/60">
                        {t.realtime.b1.d}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-primary">
                      <Gauge className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-display text-base font-semibold text-white">
                        {t.realtime.b2.t}
                      </div>
                      <div className="text-sm text-white/60">
                        {t.realtime.b2.d}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-primary">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-display text-base font-semibold text-white">
                        {t.realtime.b3.t}
                      </div>
                      <div className="text-sm text-white/60">
                        {t.realtime.b3.d}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <ResilienceBlock t={t} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat
                  value={t.realtime.stats.s1v}
                  label={t.realtime.stats.s1l}
                />
                <Stat
                  value={t.realtime.stats.s2v}
                  label={t.realtime.stats.s2l}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section id="settings" className="scroll-mt-28 py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
            <div>
              <div className="text-xs text-white/55">{t.settings.k}</div>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white">
                {t.settings.h2}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {t.settings.p}
              </p>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {t.settings.prefs.map((x, idx) => (
                    <div
                      key={x.t}
                      className="rounded-2xl border border-white/10 bg-black/25 p-4"
                    >
                      <div className="flex items-center gap-2 text-sm text-white">
                        <span className="text-primary">
                          {idx === 0 ? (
                            <SunMoon className="h-4 w-4" />
                          ) : idx === 1 ? (
                            <Sparkles className="h-4 w-4" />
                          ) : idx === 2 ? (
                            <Gauge className="h-4 w-4" />
                          ) : (
                            <Network className="h-4 w-4" />
                          )}
                        </span>
                        <span className="font-display font-semibold">
                          {x.t}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-white/60">{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-black/35 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-lg font-semibold text-white">
                    {t.settings.demo.title}
                  </div>
                  <div className="text-sm text-white/60">
                    {t.settings.demo.hint}
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="border-white/10 bg-white/10 text-white/70"
                >
                  {t.settings.demo.badge}
                </Badge>
              </div>

              <div className="mt-5 grid gap-3">
                {t.settings.demo.buttons.map((btn) => (
                  <div
                    key={btn}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <div className="text-sm text-white/80">{btn}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 bg-transparent text-white/70 hover:bg-white/10"
                      onClick={() => onComingSoon(btn)}
                    >
                      {t.settings.demo.cta}
                    </Button>
                  </div>
                ))}
              </div>

              <div
                aria-hidden
                className="absolute -right-28 -top-28 h-80 w-80 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in oklab, oklch(0.74 0.14 195) 30%, transparent) 0%, transparent 72%)",
                }}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-28 py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs text-white/55">{t.faq.k}</div>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white">
                {t.faq.h2}
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {t.faq.qa.map((x) => (
              <Card key={x.q} className="border-white/10 bg-white/5 p-5">
                <div className="font-display text-base font-semibold text-white">
                  {x.q}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {x.a}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-black/40 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-display text-2xl font-semibold text-white">
                  {t.cta.title}
                </div>
                <div className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
                  {t.cta.desc}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                    {t.cta.primary}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-transparent text-white/80 hover:bg-white/10"
                  onClick={() =>
                    (window.location.href =
                      "mailto:mylxsw@gmail.com?subject=NowCoiner%20Website%20links")
                  }
                >
                  {t.cta.secondary}
                </Button>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-36 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, oklch(0.74 0.14 195) 38%, transparent) 0%, transparent 72%)",
              }}
            />
          </div>
        </section>

        <footer className="pb-16 pt-6">
          <Separator className="bg-white/10" />
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <AppIcon size={30} />
              <span>© {new Date().getFullYear()} NowCoiner</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                {t.footer.privacy}
                <ShieldCheck className="h-4 w-4" />
              </Link>
              <a
                className="inline-flex items-center gap-2 hover:text-white"
                href={ABOUT_URL}
                target="_blank"
                rel="noreferrer"
              >
                {t.footer.about}
                <Sparkles className="h-4 w-4" />
              </a>
              <a
                className="inline-flex items-center gap-2 hover:text-white"
                href="mailto:mylxsw@gulu.ai"
              >
                {t.footer.contact}: mylxsw@gulu.ai
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
