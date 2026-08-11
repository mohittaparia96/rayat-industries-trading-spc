import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  Factory,
  FileText,
  Globe,
  Handshake,
  HardHat,
  Heart,
  Hotel,
  Layers,
  Lightbulb,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Newspaper,
  Package,
  Phone,
  Server,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Users,
  Wheat,
  Wifi,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
//import { type Backend, createActor } from "./backend";

// VideoBackground removed — external video CDNs are unreliable in production.
// All sections now use static high-quality image backgrounds.

// ─── Language types & helpers ─────────────────────────────────────────────────
type Lang = "en" | "ar" | "zh";
function makeT(lang: Lang) {
  return (en: string, ar: string, zh?: string) =>
    lang === "ar" ? ar : lang === "zh" ? (zh ?? en) : en;
}

// ─── Page type ────────────────────────────────────────────────────────────────
type Page =
  | "home"
  | "labour"
  | "services"
  | "portfolio"
  | "team"
  | "news"
  | "contact"
  | "trading-divisions"
  | "fmcg"
  | "networking"
  | "construction-materials"
  | "safety-ppe"
  | "solar"
  | "tyres-adhesives";

// ─── Watermark component ──────────────────────────────────────────────────────
function LogoWatermark({ size = 320 }: { size?: number }) {
  return (
    <img
      src="/assets/generated/rayat-logo-extracted-transparent-transparent.dim_400x400.png"
      alt=""
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        width: size,
        height: size,
        opacity: 0.08,
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        objectFit: "contain",
        zIndex: 1,
      }}
    />
  );
}

// ─── Page Hero Banner ────────────────────────────────────────────────────────
function PageHero({
  title,
  subtitle,
  image,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/92 via-brand-teal/80 to-brand-teal-dark/90" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.07) 20px, rgba(255,255,255,0.07) 40px)",
        }}
      />
      <LogoWatermark size={340} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 pt-32 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-brand-gold/90 font-medium text-sm tracking-widest uppercase mb-3 text-outline">
            RAYAT Industries SPC &nbsp;/&nbsp; {breadcrumb}
          </p>
          <h1 className="font-display text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 text-outline-strong">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-outline">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
        >
          <path
            d="M0 50L60 42C120 34 240 18 360 13C480 8 600 16 720 21C840 26 960 26 1080 21C1200 16 1320 8 1380 4L1440 0V50H0Z"
            fill="oklch(0.97 0.02 78)"
          />
        </svg>
      </div>
    </section>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = makeT(lang);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tradingDropdownOpen, setTradingDropdownOpen] = useState(false);
  const [mobileTradingOpen, setMobileTradingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentPage is a prop used to reset scroll on navigation
  useEffect(() => {
    // Reset to top on page change, then start listening
    setScrolled(false);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPage]);

  const tradingDivisionPages: Page[] = [
    "trading-divisions",
    "fmcg",
    "networking",
    "construction-materials",
    "safety-ppe",
    "solar",
    "tyres-adhesives",
  ];
  const isTradingActive = tradingDivisionPages.includes(currentPage);

  const navLinks: { label: string; page: Page }[] = [
    { label: t("Home", "الرئيسية", "首页"), page: "home" },
    { label: t("Portfolio", "المحفظة", "项目案例"), page: "portfolio" },
    { label: t("Services", "الخدمات", "服务"), page: "services" },
  ];

  const tradingSubLinks: { label: string; page: Page }[] = [
    {
      label: t("Trading Overview", "نظرة عامة على التداول", "贸易概览"),
      page: "trading-divisions",
    },
    {
      label: t("Solar Division", "قسم الطاقة الشمسية", "太阳能事业部"),
      page: "solar",
    },
    {
      label: t("FMCG Division", "قسم السلع الاستهلاكية", "快消品事业部"),
      page: "fmcg",
    },
    {
      label: t("Networking Division", "قسم الشبكات", "网络设备事业部"),
      page: "networking",
    },
    {
      label: t("Construction Materials", "مواد البناء", "建筑材料"),
      page: "construction-materials",
    },
    {
      label: t("Safety & PPE / Metals", "السلامة والمعادن", "安全防护与金属"),
      page: "safety-ppe",
    },
    {
      label: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة", "轮胎与胶粘剂"),
      page: "tyres-adhesives",
    },
  ];

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    setTradingDropdownOpen(false);
  }

  // Pages without a full-bleed hero video/image — use opaque navbar from the start
  const hasHeroVideo: boolean = currentPage === "home";

  const isTransparent = !scrolled && hasHeroVideo;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 md:h-32">
          {/* Logo + Name — hidden on home hero (isTransparent), visible on scroll or other pages */}
          <button
            type="button"
            data-ocid="nav.home.link"
            className="flex items-center gap-4 min-w-0 cursor-pointer transition-all duration-500"
            style={{
              opacity: isTransparent ? 0 : 1,
              pointerEvents: isTransparent ? "none" : "auto",
              transform: isTransparent ? "translateY(-8px)" : "translateY(0)",
            }}
            onClick={() => navigate("home")}
            aria-hidden={isTransparent}
          >
            <div
              className="relative flex-shrink-0"
              style={{ width: "110px", height: "110px" }}
            >
              {/* Logo image centered */}
              <img
                src="/assets/generated/rayat-logo-extracted-transparent-transparent.dim_400x400.png"
                alt="RAYAT Industries SPC SPC Logo"
                className="w-full h-full object-contain"
                style={{ opacity: 0.75 }}
              />
            </div>
            <span className="flex flex-col leading-none font-display transition-colors duration-300">
              {/* RAYAT Industries SPC — single inline line, Cinzel serif style */}
              <span
                className="font-semibold tracking-widest uppercase whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                  fontFamily: "'Cinzel', 'Trajan Pro', serif",
                  letterSpacing: "0.18em",
                  color: isTransparent
                    ? "rgba(201,168,76,0.92)"
                    : "oklch(0.38 0.12 162)",
                  textShadow: isTransparent
                    ? "-0.4px -0.4px 0 rgba(0,0,0,0.5), 0.4px -0.4px 0 rgba(0,0,0,0.5), -0.4px 0.4px 0 rgba(0,0,0,0.5), 0.4px 0.4px 0 rgba(0,0,0,0.5), 0 0 8px rgba(255,255,255,0.25)"
                    : "none",
                  transition: "all 0.3s",
                }}
              >
                RAYAT Industries SPC
              </span>
              {/* Chinese brand name — sits between English and Arabic, CJK font, size between the two */}
              <span
                lang="zh"
                className="whitespace-nowrap mt-0.5"
                style={{
                  fontSize: "clamp(1.0rem, 1.7vw, 1.4rem)",
                  fontFamily:
                    "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif",
                  letterSpacing: "0.12em",
                  color: isTransparent
                    ? "rgba(201,168,76,0.86)"
                    : "oklch(0.38 0.12 162)",
                  textShadow: isTransparent
                    ? "-0.3px -0.3px 0 rgba(0,0,0,0.45), 0.3px 0.3px 0 rgba(0,0,0,0.45)"
                    : "none",
                  transition: "all 0.3s",
                  opacity: isTransparent ? 0.85 : 0.9,
                }}
              >
                瑞雅工业
              </span>
              {/* Arabic brand name below English */}
              <span
                dir="rtl"
                className="whitespace-nowrap mt-0.5"
                style={{
                  fontSize: "clamp(1.05rem, 1.9vw, 1.45rem)",
                  fontFamily:
                    "'Scheherazade New', 'Amiri', 'Arial', sans-serif",
                  letterSpacing: "0.12em",
                  wordSpacing: "0.25em",
                  color: isTransparent
                    ? "rgba(201,168,76,0.82)"
                    : "oklch(0.38 0.12 162)",
                  textShadow: isTransparent
                    ? "-0.3px -0.3px 0 rgba(0,0,0,0.45), 0.3px 0.3px 0 rgba(0,0,0,0.45)"
                    : "none",
                  transition: "all 0.3s",
                  opacity: isTransparent ? 0.85 : 0.9,
                }}
              >
                رايات للصناعات
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.page}
                data-ocid={`nav.${link.page}.link`}
                onClick={() => navigate(link.page)}
                className={`font-normal text-sm tracking-wide transition-all duration-200 cursor-pointer pb-0.5 ${
                  currentPage === link.page
                    ? isTransparent
                      ? "text-white border-b-2 border-white"
                      : "text-brand-teal border-b-2 border-brand-teal"
                    : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-brand-teal-dark hover:text-brand-teal"
                }`}
                style={{
                  fontFamily: "'Gelasio', 'Georgia', serif",
                  ...(isTransparent
                    ? {
                        textShadow:
                          "-1px -1px 0 rgba(0,0,0,0.9), 1px -1px 0 rgba(0,0,0,0.9), -1px 1px 0 rgba(0,0,0,0.9), 1px 1px 0 rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)",
                      }
                    : {}),
                }}
              >
                {link.label}
              </button>
            ))}

            {/* Trading Divisions Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-ocid="nav.trading-divisions.link"
                onClick={() => setTradingDropdownOpen((v) => !v)}
                onBlur={() =>
                  setTimeout(() => setTradingDropdownOpen(false), 150)
                }
                className={`flex items-center gap-1 font-normal text-sm tracking-wide transition-all duration-200 cursor-pointer pb-0.5 ${
                  isTradingActive
                    ? isTransparent
                      ? "text-white border-b-2 border-white"
                      : "text-brand-teal border-b-2 border-brand-teal"
                    : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-brand-teal-dark hover:text-brand-teal"
                }`}
                style={{
                  fontFamily: "'Gelasio', 'Georgia', serif",
                  ...(isTransparent
                    ? {
                        textShadow:
                          "-1px -1px 0 rgba(0,0,0,0.9), 1px -1px 0 rgba(0,0,0,0.9), -1px 1px 0 rgba(0,0,0,0.9), 1px 1px 0 rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)",
                      }
                    : {}),
                }}
              >
                {t("Trading", "التداول", "贸易")}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${tradingDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {tradingDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50"
                  >
                    {tradingSubLinks.map((link) => (
                      <button
                        key={link.page}
                        type="button"
                        data-ocid={`nav.dropdown.${link.page}.link`}
                        onClick={() => navigate(link.page)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                          currentPage === link.page
                            ? "bg-brand-teal text-white font-semibold"
                            : "text-brand-teal-dark hover:bg-brand-sand hover:text-brand-teal"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language switcher — 3-way: English / 中文 / عربي */}
            <fieldset
              aria-label={`Language selector. Current: ${
                lang === "en" ? "English" : lang === "ar" ? "Arabic" : "Chinese"
              }`}
              data-ocid="nav.lang.switcher"
              className={`flex items-center rounded-full border-2 border-brand-gold overflow-hidden ${
                isTransparent ? "" : ""
              }`}
            >
              {(
                [
                  { code: "en", label: "EN", aria: "English" },
                  { code: "zh", label: "中文", aria: "Chinese" },
                  { code: "ar", label: "عربي", aria: "Arabic" },
                ] as { code: Lang; label: string; aria: string }[]
              ).map((opt) => {
                const active = lang === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    data-ocid={`nav.lang.${opt.code}.button`}
                    onClick={() => setLang(opt.code)}
                    aria-pressed={active}
                    aria-label={`${active ? "Current language: " : "Switch to "}${opt.aria}`}
                    className={`px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                      active
                        ? "bg-brand-gold text-gray-900"
                        : isTransparent
                          ? "text-brand-gold hover:bg-brand-gold/20"
                          : "text-brand-gold hover:bg-brand-gold/20"
                    }`}
                    style={
                      isTransparent && !active
                        ? {
                            textShadow:
                              "-1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)",
                          }
                        : undefined
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </fieldset>

            <button
              type="button"
              data-ocid="nav.contact.primary_button"
              onClick={() => navigate("contact")}
              className={`px-4 py-2 rounded font-semibold text-sm transition-all duration-300 ${
                isTransparent
                  ? "bg-white/20 border border-white text-white hover:bg-white/40 backdrop-blur-sm"
                  : "bg-brand-teal text-white hover:bg-brand-teal-dark"
              } ${currentPage === "contact" && !isTransparent ? "ring-2 ring-brand-teal-dark" : ""}`}
              style={{ fontFamily: "'Gelasio', 'Georgia', serif" }}
            >
              {t("Contact Us", "تواصل معنا", "联系我们")}
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="nav.mobile_menu.toggle"
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-brand-teal-dark"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-brand-teal/20 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.page}
                  data-ocid={`nav.mobile.${link.page}.link`}
                  onClick={() => navigate(link.page)}
                  className={`text-left font-medium py-2.5 px-3 rounded-lg transition-colors text-sm ${
                    currentPage === link.page
                      ? "bg-brand-teal text-white"
                      : "text-brand-teal-dark hover:bg-brand-teal/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Mobile Trading accordion */}
              <button
                type="button"
                data-ocid="nav.mobile.trading.toggle"
                onClick={() => setMobileTradingOpen((v) => !v)}
                className={`flex items-center justify-between text-left font-medium py-2.5 px-3 rounded-lg transition-colors text-sm ${
                  isTradingActive
                    ? "bg-brand-teal text-white"
                    : "text-brand-teal-dark hover:bg-brand-teal/10"
                }`}
              >
                <span>
                  {t("Trading Divisions", "أقسام التداول", "贸易事业部")}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${mobileTradingOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileTradingOpen && (
                <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-brand-teal/30 pl-3">
                  {tradingSubLinks.map((link) => (
                    <button
                      key={link.page}
                      type="button"
                      data-ocid={`nav.mobile.${link.page}.link`}
                      onClick={() => navigate(link.page)}
                      className={`text-left font-medium py-2 px-3 rounded-lg transition-colors text-sm ${
                        currentPage === link.page
                          ? "bg-brand-teal text-white"
                          : "text-brand-teal-dark hover:bg-brand-teal/10"
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                data-ocid="nav.mobile.contact.primary_button"
                onClick={() => navigate("contact")}
                className="bg-brand-teal text-white px-4 py-2.5 rounded-lg font-semibold text-sm text-center hover:bg-brand-teal-dark transition-colors mt-2"
              >
                {t("Contact Us", "تواصل معنا", "联系我们")}
              </button>

              {/* Mobile language switcher — 3-way: English / 中文 / عربي */}
              <fieldset
                aria-label={`Language selector. Current: ${
                  lang === "en"
                    ? "English"
                    : lang === "ar"
                      ? "Arabic"
                      : "Chinese"
                }`}
                data-ocid="nav.mobile.lang.switcher"
                className="flex items-center rounded-lg border-2 border-brand-gold overflow-hidden mt-1"
              >
                {(
                  [
                    { code: "en", label: "EN", aria: "English" },
                    { code: "zh", label: "中文", aria: "Chinese" },
                    { code: "ar", label: "عربي", aria: "Arabic" },
                  ] as { code: Lang; label: string; aria: string }[]
                ).map((opt) => {
                  const active = lang === opt.code;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      data-ocid={`nav.mobile.lang.${opt.code}.button`}
                      onClick={() => {
                        setLang(opt.code);
                        setMobileOpen(false);
                      }}
                      aria-pressed={active}
                      aria-label={`${active ? "Current language: " : "Switch to "}${opt.aria}`}
                      className={`flex-1 px-3 py-2 font-bold text-sm text-center transition-colors ${
                        active
                          ? "bg-brand-gold text-gray-900"
                          : "text-brand-gold hover:bg-brand-gold/20"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </fieldset>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Scroll helper ────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HeroSection({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/generated/hero-banner.dim_1400x600.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/assets/497313683_1786217095756839-019fe2da-2ea8-77cf-ad68-0d1a2eec81b9.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/15 via-brand-teal/10 to-brand-teal-dark/15" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)",
        }}
      />
      <LogoWatermark size={480} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center mb-6">
            <img
              src="/assets/generated/rayat-logo-extracted-transparent-transparent.dim_400x400.png"
              alt="RAYAT Industries SPC SPC Logo"
              className="object-contain mb-4 drop-shadow-2xl"
              style={{
                width: "auto",
                height: "clamp(160px, 20vw, 240px)",
                opacity: 0.75,
              }}
            />
            <h1>
              <span
                className="font-semibold tracking-widest uppercase whitespace-nowrap block"
                style={{
                  fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)",
                  fontFamily: "'Cinzel', 'Trajan Pro', serif",
                  letterSpacing: "0.18em",
                  color: "rgba(201,168,76,0.92)",
                  textShadow:
                    "-0.5px -0.5px 0 rgba(0,0,0,0.6), 0.5px -0.5px 0 rgba(0,0,0,0.6), -0.5px 0.5px 0 rgba(0,0,0,0.6), 0.5px 0.5px 0 rgba(0,0,0,0.6), 0 0 12px rgba(255,255,255,0.4)",
                  opacity: 0.75,
                }}
              >
                RAYAT Industries SPC
              </span>
            </h1>
            {/* Decorative gold divider */}
            <div className="w-24 h-0.5 bg-brand-gold/60 mx-auto my-3 rounded-full" />
          </div>
          <p
            className="text-white/90 font-medium text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto leading-relaxed text-outline"
            style={{ fontFamily: "'Gelasio', 'Georgia', serif", opacity: 0.75 }}
          >
            {t(
              "Building Oman's Future Through Industrial Excellence & Global Trade",
              "بناء مستقبل عُمان من خلال التميز الصناعي والتجارة العالمية",
              "以工业卓越与全球贸易共建阿曼未来",
            )}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              type="button"
              data-ocid="hero.explore_sectors.primary_button"
              onClick={() => scrollTo("sectors")}
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded active:scale-95 transition-all duration-200 text-base shadow-xl"
              style={{
                backgroundColor: "rgba(201,168,76,0.45)",
                color: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(201,168,76,0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(201,168,76,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(201,168,76,0.45)";
              }}
            >
              {t(
                "Explore Our Sectors",
                "استكشف قطاعاتنا",
                "探索我们的业务领域",
              )}
              <ChevronRight size={18} className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              data-ocid="hero.contact_us.secondary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded hover:bg-white hover:text-brand-teal active:scale-95 transition-all duration-200 text-base"
            >
              {t("Contact Us", "تواصل معنا", "联系我们")}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
        >
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="oklch(0.97 0.02 78)"
          />
        </svg>
      </div>
    </section>
  );
}

function AboutSection({ lang }: { lang: Lang }) {
  const t = makeT(lang);
  const stats = [
    { value: "10+", label: t("Years Experience", "سنوات خبرة", "年从业经验") },
    { value: "4+", label: t("Industry Sectors", "قطاعات صناعية", "行业领域") },
    {
      value: "50+",
      label: t("Trusted Partners", "شركاء موثوقون", "信赖合作伙伴"),
    },
    { value: "100%", label: t("Omani Owned", "ملكية عُمانية", "阿曼全资") },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
              {t("Who We Are", "من نحن", "我们是谁")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t(
                "About RAYAT Industries SPC",
                "عن رايات للصناعات",
                "关于 RAYAT Industries SPC",
              )}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              {t(
                "RAYAT Industries SPC is a dynamic Omani company committed to driving industrial growth and facilitating global trade across the Sultanate. Founded on principles of integrity, quality, and innovation, we serve as a trusted partner for businesses across solar energy, seafood & food trading, construction, general trading, and industrial supply sectors.",
                "رايات للصناعات ش.ش.ف هي شركة عُمانية ديناميكية ملتزمة بدفع عجلة النمو الصناعي وتيسير التجارة العالمية في جميع أنحاء السلطنة. تأسست على مبادئ النزاهة والجودة والابتكار، ونعمل كشريك موثوق للشركات في قطاعات البناء والزراعة والتجارة العامة والإمدادات الصناعية.",
                "RAYAT Industries SPC 是一家充满活力的阿曼公司，致力于推动苏丹国的工业增长并促进全球贸易。我们秉承诚信、品质与创新的原则，为太阳能、海产与食品贸易、建筑、一般贸易及工业供应等领域的企业提供值得信赖的合作伙伴服务。",
              )}
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              {t(
                "Our deep market knowledge and strong supplier networks allow us to deliver reliable solutions that meet the evolving needs of Oman's growing economy.",
                "تتيح لنا معرفتنا العميقة بالسوق وشبكات الموردين القوية تقديم حلول موثوقة تلبي الاحتياجات المتطورة لاقتصاد عُمان المتنامي.",
                "凭借深厚的市场认知与稳固的供应商网络，我们能够提供可靠的解决方案，满足阿曼经济不断增长的需求。",
              )}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-center bg-white rounded-lg p-4 shadow-sm border border-border"
                >
                  <div className="font-display text-2xl md:text-3xl font-extrabold text-brand-teal">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              {/* About section — dock crane image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('/assets/generated/about-dock-crane.dim_800x600.jpg')",
                }}
              />
              <div className="absolute inset-0 rounded-2xl ring-4 ring-brand-gold/30 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function getSectors(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      title: t(
        "Solar & Renewable Energy",
        "الطاقة الشمسية والمتجددة",
        "太阳能与可再生能源",
      ),
      description: t(
        "Solar power generation, energy storage systems, solar heating, and complete renewable energy solutions for Oman and the Gulf.",
        "توليد الطاقة الشمسية وأنظمة تخزين الطاقة والتدفئة الشمسية وحلول الطاقة المتجددة الكاملة.",
        "太阳能发电、储能系统、太阳能供热，以及面向阿曼和海湾地区的完整可再生能源解决方案。",
      ),
      image: "/assets/generated/division-solar-hero.dim_1400x600.jpg",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      page: "solar" as Page,
    },
    {
      title: t(
        "Seafood & Food Trading",
        "المأكولات البحرية وتجارة الأغذية",
        "海产与食品贸易",
      ),
      description: t(
        "Premium seafood (shrimp, tuna, salmon, mackerel, squid and more), poultry, and agricultural products connecting Oman with global supply chains.",
        "مأكولات بحرية متميزة (روبيان، تونة، سلمون وأكثر) ودواجن ومنتجات زراعية تربط عُمان بسلاسل الإمداد العالمية.",
        "优质海产（虾、金枪鱼、三文鱼、鲭鱼、鱿鱼等）、禽类及农产品，将阿曼与全球供应链紧密相连。",
      ),
      image: "/assets/generated/fmcg-section.dim_1200x800.jpg",
      icon: Wheat,
      color: "text-blue-700",
      bg: "bg-blue-50",
      page: "fmcg" as Page,
    },
    {
      title: t(
        "Construction & Infrastructure",
        "البناء والبنية التحتية",
        "建筑与基础设施",
      ),
      description: t(
        "We supply high-quality construction materials, equipment, and project support services to contractors and developers across Oman and the GCC.",
        "نوفر مواد بناء عالية الجودة ومعدات وخدمات دعم المشاريع للمقاولين والمطورين في عُمان ودول الخليج.",
        "我们为阿曼及海湾合作委员会国家的承包商和开发商供应优质建筑材料、设备及项目支持服务。",
      ),
      image: "/assets/generated/sector-construction.dim_600x400.jpg",
      icon: Building2,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      page: "services" as Page,
    },
    {
      title: t(
        "General Trading & Logistics",
        "التجارة العامة واللوجستيات",
        "综合贸易与物流",
      ),
      description: t(
        "Our general trading operations cover a broad range of commodities, managed through efficient logistics and strong international partnerships.",
        "تغطي عملياتنا التجارية العامة مجموعة واسعة من السلع، تُدار من خلال لوجستيات فعّالة وشراكات دولية قوية.",
        "我们的综合贸易业务涵盖广泛的商品类别，通过高效的物流和稳固的国际合作伙伴关系进行管理。",
      ),
      image: "/assets/generated/sector-trading.dim_600x400.jpg",
      icon: Truck,
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
      page: "services" as Page,
    },
    {
      title: t("Industrial Supplies", "الإمدادات الصناعية", "工业用品"),
      description: t(
        "We source and distribute a comprehensive range of industrial supplies, tools, and equipment to meet the operational demands of manufacturing and production facilities.",
        "نوفر ونوزع مجموعة شاملة من الإمدادات الصناعية والأدوات والمعدات لتلبية متطلبات مرافق التصنيع والإنتاج.",
        "我们采购并分销种类齐全的工业用品、工具及设备，以满足制造和生产设施的运营需求。",
      ),
      image: "/assets/generated/sector-industrial.dim_600x400.jpg",
      icon: Factory,
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
      page: "services" as Page,
    },
    {
      title: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة", "轮胎与胶粘剂"),
      description: t(
        "Premium automotive, truck, and industrial tyres alongside high-performance adhesives, sealants, and bonding products for industrial and commercial applications.",
        "إطارات سيارات وشاحنات وصناعية متميزة إلى جانب مواد لاصقة وعوازل عالية الأداء للتطبيقات الصناعية والتجارية.",
        "优质乘用车、卡车及工业轮胎，搭配适用于工业和商业用途的高性能胶粘剂、密封剂及粘合产品。",
      ),
      image: "/assets/generated/division-tyres-adhesives-hero.dim_1400x600.jpg",
      icon: Truck,
      color: "text-slate-700",
      bg: "bg-slate-50",
      page: "tyres-adhesives" as Page,
    },
  ];
}

function SectorsSection({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  return (
    <section id="sectors" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
            {t("What We Do", "ما نقوم به", "我们的业务")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {t("Our Industry Sectors", "قطاعاتنا الصناعية", "我们的行业领域")}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {getSectors(lang).map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.button
                type="button"
                key={sector.title}
                data-ocid={`sectors.card.${i + 1}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.25 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() => navigate(sector.page)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-brand-teal border border-border transition-all duration-300 text-left w-full cursor-pointer"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <div
                    className={`inline-flex items-center gap-2 ${sector.bg} ${sector.color} rounded-lg px-3 py-1.5 mb-3`}
                  >
                    <Icon size={16} />
                    <span className="text-xs font-semibold">
                      {t("Sector", "قطاع", "领域")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-brand-teal-dark text-lg mb-2 leading-snug">
                    {sector.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection({ lang }: { lang: Lang }) {
  const t = makeT(lang);
  const features = [
    {
      icon: Users,
      title: t(
        "Trusted Partnerships",
        "شراكات موثوقة",
        "值得信赖的合作伙伴关系",
      ),
      description: t(
        "Built on years of reliable relationships with global suppliers and local clients",
        "مبنية على سنوات من العلاقات الموثوقة مع الموردين العالميين والعملاء المحليين",
        "建立在多年与全球供应商和本地客户可靠合作关系的基础之上",
      ),
      accent: "bg-brand-teal/10 text-brand-teal",
    },
    {
      icon: MapPin,
      title: t("Local Expertise", "خبرة محلية", "本地专业经验"),
      description: t(
        "Deep understanding of Oman's market, regulations, and business culture",
        "فهم عميق لسوق عُمان وأنظمتها وثقافتها التجارية",
        "对阿曼市场、法规及商业文化的深入理解",
      ),
      accent: "bg-brand-gold/10 text-brand-gold",
    },
    {
      icon: ShieldCheck,
      title: t("Quality Assured", "جودة مضمونة", "品质保证"),
      description: t(
        "Every product and service meets rigorous quality standards before delivery",
        "كل منتج وخدمة تستوفي معايير الجودة الصارمة قبل التسليم",
        "每一项产品和服务在交付前均符合严格的质量标准",
      ),
      accent: "bg-green-50 text-green-700",
    },
    {
      icon: Package,
      title: t("End-to-End Solutions", "حلول متكاملة", "端到端解决方案"),
      description: t(
        "From sourcing to delivery, we manage the entire supply chain for our clients",
        "من التوريد إلى التسليم، ندير سلسلة التوريد بأكملها لعملائنا",
        "从采购到交付，我们为客户管理整个供应链",
      ),
      accent: "bg-brand-terracotta/10 text-brand-terracotta",
    },
  ];
  return (
    <section
      id="why-us"
      className="py-20 md:py-28 bg-brand-teal relative overflow-hidden"
    >
      {/* Why Us section — teal background with subtle texture, no video needed */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3 text-outline">
            {t("Our Advantage", "ميزتنا", "我们的优势")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
            {t("Why Choose RAYAT?", "لماذا تختار رايات؟", "为何选择 RAYAT？")}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.accent} mb-5`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2 text-outline">
                  {feature.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed text-outline">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── VISION & MISSION SECTION ──────────────────────────────────────────────────
function VisionMissionSection({ lang }: { lang: Lang }) {
  const t = makeT(lang);

  const coreValues = [
    { label: t("Integrity", "النزاهة", "诚信"), icon: ShieldCheck },
    { label: t("Excellence", "التميز", "卓越"), icon: Star },
    { label: t("Partnership", "الشراكة", "合作"), icon: Handshake },
    { label: t("Innovation", "الابتكار", "创新"), icon: Lightbulb },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-teal-dark relative overflow-hidden">
      {/* Geometric gold pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(201,168,76,0.3) 30px, rgba(201,168,76,0.3) 32px), repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(201,168,76,0.3) 30px, rgba(201,168,76,0.3) 32px)",
        }}
      />
      <LogoWatermark size={380} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3 text-outline">
            {t("Our Purpose", "غايتنا", "我们的宗旨")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
            {t("Vision & Mission", "الرؤية والرسالة", "愿景与使命")}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/8 backdrop-blur-sm border border-brand-gold/30 rounded-2xl p-8 hover:border-brand-gold/60 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                <Eye size={22} className="text-brand-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-gold text-outline">
                {t("Our Vision", "رؤيتنا", "我们的愿景")}
              </h3>
            </div>
            <p className="text-white/85 text-base md:text-lg leading-relaxed text-outline">
              {t(
                "To be the leading industrial and trading powerhouse of the Middle East — a bridge between global markets and regional ambition, aligned with Oman Vision 2040 and the Gulf's transformative economic agenda.",
                "أن نكون القوة الصناعية والتجارية الرائدة في الشرق الأوسط — جسر بين الأسواق العالمية والطموح الإقليمي، متوافقين مع رؤية عُمان 2040 وأجندة التحول الاقتصادي الخليجي.",
                "成为中东地区领先的工业与贸易强企——连接全球市场与区域雄心的桥梁，与阿曼2040愿景及海湾地区经济转型议程相契合。",
              )}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/8 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-brand-gold/40 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Lightbulb size={22} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white text-outline">
                {t("Our Mission", "رسالتنا", "我们的使命")}
              </h3>
            </div>
            <p className="text-white/85 text-base md:text-lg leading-relaxed text-outline">
              {t(
                "To deliver uncompromising quality and reliability across every trade, supply, and partnership — empowering businesses across Oman, the GCC, and beyond to build, grow, and prosper.",
                "تقديم الجودة والموثوقية التي لا تقبل المساومة في كل تجارة وإمداد وشراكة — تمكين الشركات في عُمان والخليج العربي وما وراءها من البناء والنمو والازدهار.",
                "在每一笔贸易、供应和合作中提供毫不妥协的品质与可靠性——赋能阿曼、海湾合作委员会国家及更广地区的企业建设、成长与繁荣。",
              )}
            </p>
          </motion.div>
        </div>

        {/* Core Values chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {coreValues.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.label}
                data-ocid={`vision.value.card.${i + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.4 }}
                className="flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/40 text-brand-gold px-5 py-2.5 rounded-full font-semibold text-sm"
              >
                <Icon size={15} />
                {val.label}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function HomeContactCTA({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  return (
    <section className="py-16 md:py-24 bg-brand-sand">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
            {t("Reach Out", "تواصل معنا", "联系我们")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t(
              "Ready to Work With Us?",
              "مستعد للعمل معنا؟",
              "准备好与我们合作了吗？",
            )}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {t(
              "Whether you need industrial supplies or general trading services — we're here to help. Contact our team for a prompt response.",
              "سواء كنت بحاجة إلى إمدادات صناعية أو خدمات تجارية عامة — نحن هنا للمساعدة. تواصل مع فريقنا للحصول على رد سريع.",
              "无论您需要工业用品还是综合贸易服务——我们随时为您提供帮助。请联系我们的团队，获取快速响应。",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              data-ocid="home.contact_cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors text-base shadow-lg"
            >
              <MessageCircle size={18} />
              {t("Get In Touch", "تواصل معنا", "联系我们")}
            </button>
            <a
              href="https://wa.me/96824000000"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="home.whatsapp_cta.secondary_button"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-green-600 transition-colors text-base shadow-lg"
            >
              <MessageCircle size={18} />
              {t("WhatsApp Us", "واتساب", "WhatsApp 联系我们")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomePage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  return (
    <>
      <HeroSection navigate={navigate} lang={lang} />
      <AboutSection lang={lang} />
      <SectorsSection navigate={navigate} lang={lang} />
      <WhyUsSection lang={lang} />
      <VisionMissionSection lang={lang} />
      <HomeContactCTA navigate={navigate} lang={lang} />
    </>
  );
}

// ─── LABOUR & MANPOWER PAGE ───────────────────────────────────────────────────
function getWorkerCategories(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      icon: HardHat,
      title: t("Construction Workers", "عمال البناء", "建筑工人"),
      desc: t(
        "Builders, masons, steel fixers, scaffolders, carpenters, and civil laborers for all construction scales.",
        "بنائون وبناة بالحجارة ومثبتو فولاذ وعمال سقالات ونجارون وعمال مدنيون لجميع أحجام البناء.",
        "建筑工、砌石工、钢筋工、脚手架工、木工及土木劳工，适用于各类规模的建筑工程。",
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Zap,
      title: t(
        "Technical & Skilled Trades",
        "المهن التقنية والمهارية",
        "技术与技能工种",
      ),
      desc: t(
        "Electricians, plumbers, welders, HVAC technicians, and pipefitters with verified certifications.",
        "كهربائيون وسباكون ولحامون وفنيو تكييف وعمال تركيب أنابيب بشهادات موثقة.",
        "持有认证资质的电工、水管工、焊工、暖通空调技术员及管道安装工。",
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Factory,
      title: t("Industrial Workers", "العمال الصناعيون", "产业工人"),
      desc: t(
        "Machine operators, warehouse staff, factory workers, and production line technicians.",
        "مشغلو آلات وطاقم المستودعات وعمال المصانع وفنيو خطوط الإنتاج.",
        "机械操作员、仓库人员、工厂工人及生产线技术员。",
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Briefcase,
      title: t("Office & Administrative", "المكتبية والإدارية", "办公与行政"),
      desc: t(
        "Data entry operators, receptionists, admin executives, and office support staff.",
        "مشغلو إدخال البيانات والموظفون الإداريون ومساعدو المكاتب.",
        "数据录入员、前台接待、行政主管及办公室支持人员。",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Hotel,
      title: t("Hospitality & Service", "الضيافة والخدمات", "酒店与服务"),
      desc: t(
        "Hotel staff, cleaners, drivers, security guards, and front-of-house personnel.",
        "طاقم الفنادق والعمال والسائقون وحراس الأمن وموظفو الاستقبال.",
        "酒店员工、保洁人员、司机、保安及前台服务人员。",
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      icon: Wheat,
      title: t("Agricultural Workers", "العمال الزراعيون", "农业工人"),
      desc: t(
        "Farm laborers, irrigation technicians, agricultural equipment operators, and produce handlers.",
        "عمال المزارع وفنيو الري ومشغلو المعدات الزراعية ومناولو المنتجات.",
        "农场劳工、灌溉技术员、农业设备操作员及农产品处理人员。",
      ),
      color: "text-green-700",
      bg: "bg-green-50",
    },
  ];
}

function getRecruitmentSteps(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      step: "01",
      title: t("Submit Requirements", "تقديم المتطلبات", "提交需求"),
      desc: t(
        "Share your workforce needs — number, skills, timeline, and any certifications required.",
        "شارك احتياجاتك من القوى العاملة — العدد والمهارات والجدول الزمني وأي شهادات مطلوبة.",
        "告知我们您的人力需求——人数、技能、时间安排及所需的任何资质认证。",
      ),
    },
    {
      step: "02",
      title: t("Candidate Sourcing", "استقطاب المرشحين", "候选人寻访"),
      desc: t(
        "We tap our network of pre-vetted candidates from 15+ source countries across South and Southeast Asia.",
        "نستغل شبكتنا من المرشحين المتحقق منهم مسبقاً من أكثر من 15 دولة عبر جنوب وجنوب شرق آسيا.",
        "我们依托覆盖南亚及东南亚15个以上来源国的预先审核候选人网络进行寻访。",
      ),
    },
    {
      step: "03",
      title: t("Screening & Vetting", "الفرز والتحقق", "筛选与审核"),
      desc: t(
        "Thorough background checks, skill verification, medical fitness, and reference validation.",
        "فحوصات خلفية شاملة والتحقق من المهارات واللياقة الطبية والتحقق من المراجع.",
        "全面的背景调查、技能核实、健康体检及推荐人验证。",
      ),
    },
    {
      step: "04",
      title: t("Deployment", "الإرسال", "派遣部署"),
      desc: t(
        "Handle all visa processing, LMRA compliance, contracts, and smooth on-boarding coordination.",
        "معالجة جميع التأشيرات والامتثال للوائح سوق العمل والعقود وتنسيق الإعداد الوظيفي السلس.",
        "办理所有签证手续、劳动力市场监管合规、合同签订及顺畅的入职协调。",
      ),
    },
  ];
}

function LabourPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const workerCategories = getWorkerCategories(lang);
  const recruitmentSteps = getRecruitmentSteps(lang);
  return (
    <div>
      <PageHero
        title={t(
          "Labour & Manpower Solutions",
          "حلول العمالة والقوى البشرية",
          "劳动力与人力解决方案",
        )}
        subtitle={t(
          "Comprehensive workforce supply and recruitment services for businesses across Oman and the GCC",
          "خدمات شاملة لتوريد القوى العاملة والتوظيف للشركات في عُمان ودول الخليج",
          "为阿曼及海合会各国企业提供全面的人力供应与招聘服务",
        )}
        image="/assets/generated/page-manpower-hero.dim_1400x600.jpg"
        breadcrumb={t(
          "Labour & Manpower",
          "العمالة والقوى البشرية",
          "劳动力与人力",
        )}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                {t("Workforce Solutions", "حلول القوى العاملة", "人力解决方案")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Your Trusted Manpower Partner in Oman",
                  "شريكك الموثوق للقوى العاملة في عُمان",
                  "您在阿曼值得信赖的人力合作伙伴",
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "RAYAT provides comprehensive manpower supply solutions for businesses in Oman and the GCC. From unskilled construction laborers to highly skilled technical professionals, we connect employers with the right talent efficiently and compliantly.",
                  "تقدم رايات حلولاً شاملة لتوريد القوى العاملة للشركات في عُمان ودول الخليج. من العمالة غير الماهرة في البناء إلى المحترفين الفنيين المهرة، نربط أصحاب العمل بالمواهب المناسبة بكفاءة وامتثال تام.",
                  "RAYAT 为阿曼及海合会各国企业提供全面的人力供应解决方案。从非技术建筑工人到高技能技术专业人员，我们以高效且合规的方式将雇主与合适的人才对接。",
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "All placements are handled with full LMRA compliance, proper employment contracts, and complete documentation support. We manage the entire recruitment lifecycle so you can focus on your core business.",
                  "تتم جميع التوظيفات مع الالتزام الكامل بلوائح سوق العمل، وعقود توظيف سليمة، ودعم توثيقي كامل. ندير دورة التوظيف بالكامل لتتمكن من التركيز على عملك الأساسي.",
                  "所有派遣均严格遵循劳动力市场法规（LMRA），签订规范的雇佣合同，并提供完整的文件支持。我们管理整个招聘流程，让您专注于核心业务。",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="labour.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Request Workers", "طلب عمال", "申请工人")}
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/labour-workers.dim_600x400.jpg"
                  alt="RAYAT manpower workers"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 rounded-2xl ring-4 ring-brand-gold/20 pointer-events-none" />
              </div>
              {/* Stats floater */}
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-2xl font-extrabold">500+</div>
                <div className="text-xs opacity-80">
                  {t("Workers Placed", "عامل تم توظيفه", "已派遣工人")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Worker Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Categories", "الفئات", "类别")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Worker Categories", "فئات العمال", "工人类别")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workerCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  data-ocid={`labour.category.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${cat.bg} ${cat.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recruitment Process */}
      <section className="py-16 md:py-24 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3">
              {t("How It Works", "كيف نعمل", "运作方式")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {t(
                "Our Recruitment Process",
                "عملية التوظيف لدينا",
                "我们的招聘流程",
              )}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruitmentSteps.map((step, i) => (
              <motion.div
                key={step.step}
                data-ocid={`labour.process.step.${i + 1}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="font-display text-5xl font-extrabold text-brand-gold/30 mb-3 leading-none">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa & Documentation */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                {t("Documentation", "التوثيق", "文件办理")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Visa & Documentation Services",
                  "خدمات التأشيرات والتوثيق",
                  "签证与文件服务",
                )}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {t(
                  "We handle all the complex paperwork so you don't have to. Our documentation team is fully versed in Omani labour law and Oman Labor Law requirements.",
                  "نتولى جميع المعاملات الورقية المعقدة بدلاً عنك. فريقنا للتوثيق ملم تماماً بقانون العمل العُماني ومتطلباته.",
                  "我们代您处理所有繁琐的文书工作。我们的文件团队精通阿曼劳动法及其各项要求。",
                )}
              </p>
              <ul className="space-y-3">
                {[
                  t(
                    "Work visa processing and renewal",
                    "معالجة وتجديد تأشيرات العمل",
                    "工作签证办理与续签",
                  ),
                  t(
                    "LMRA (Labour Market Regulatory Authority) compliance",
                    "الامتثال للوائح سوق العمل (LMRA)",
                    "劳动力市场管理局（LMRA）合规",
                  ),
                  t(
                    "Employment contracts in Arabic and English",
                    "عقود التوظيف باللغتين العربية والإنجليزية",
                    "阿拉伯语与英语雇佣合同",
                  ),
                  t(
                    "Medical fitness coordination and testing",
                    "تنسيق الفحوصات الطبية وإجراءات اللياقة الصحية",
                    "体检协调与医学检测",
                  ),
                  t(
                    "Accommodation and transport coordination",
                    "تنسيق السكن والمواصلات",
                    "住宿与交通协调",
                  ),
                  t(
                    "Insurance and health coverage setup",
                    "إعداد التأمين والتغطية الصحية",
                    "保险与健康保障办理",
                  ),
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <BadgeCheck
                      className="text-brand-teal flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/assets/generated/labour-visa-services.dim_600x400.jpg"
                  alt="Visa documentation services"
                  className="w-full h-auto object-cover aspect-[3/2]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                value: "500+",
                label: t("Workers Placed", "عامل تم توظيفه", "已派遣工人"),
              },
              {
                value: "50+",
                label: t("Client Companies", "شركة عميلة", "客户企业"),
              },
              {
                value: "15+",
                label: t("Source Countries", "دولة مصدّرة", "来源国"),
              },
              {
                value: "100%",
                label: t("LMRA Compliant", "متوافق مع LMRA", "符合 LMRA 规定"),
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                data-ocid={`labour.stat.card.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-sand rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-teal mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {t(
              "Need Skilled or Unskilled Workers?",
              "هل تحتاج إلى عمال مهرة أو غير مهرة؟",
              "需要技术工人或非技术工人？",
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Tell us your requirements and we'll have candidates ready within 72 hours.",
              "أخبرنا بمتطلباتنا وسنجهز المرشحين خلال 72 ساعة.",
              "告诉我们您的需求，我们将在 72 小时内为您准备好候选人。",
            )}
          </p>
          <button
            type="button"
            data-ocid="labour.bottom_cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Contact Our Team", "تواصل مع فريقنا", "联系我们的团队")}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────────────────
function getServices(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      icon: Building2,
      title: t(
        "Construction & Infrastructure Supply",
        "إمداد البناء والبنية التحتية",
        "建筑与基础设施供应",
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      summary: t(
        "Premium construction materials, heavy equipment, and project support for Oman's development projects.",
        "مواد بناء متميزة ومعدات ثقيلة ودعم المشاريع لمشاريع التنمية في عُمان.",
        "为阿曼发展项目提供建筑材料、重型设备及项目支持。",
      ),
      details: [
        t(
          "Structural steel, rebar, and metal works",
          "الفولاذ الهيكلي وحديد التسليح والأعمال المعدنية",
          "结构钢材、钢筋及金属工程",
        ),
        t(
          "Cement, aggregates, and ready-mix concrete",
          "الإسمنت والركام والخرسانة الجاهزة",
          "水泥、骨料及预拌混凝土",
        ),
        t(
          "MEP materials and electrical components",
          "مواد الميكانيكا والكهرباء والسباكة والمكونات الكهربائية",
          "机电材料及电气组件",
        ),
        t(
          "Heavy equipment rental and procurement",
          "استئجار وشراء المعدات الثقيلة",
          "重型设备租赁与采购",
        ),
        t(
          "Project site supply logistics management",
          "إدارة لوجستيات التوريد في مواقع المشاريع",
          "项目现场供应物流管理",
        ),
      ],
    },
    {
      icon: Wheat,
      title: t(
        "Agriculture & Food Trading",
        "الزراعة وتجارة الأغذية",
        "农业与食品贸易",
      ),
      color: "text-green-700",
      bg: "bg-green-50",
      summary: t(
        "Global sourcing of grains, fresh produce, and agricultural inputs to food businesses in Oman and GCC.",
        "التوريد العالمي للحبوب والمنتجات الطازجة والمدخلات الزراعية للشركات الغذائية في عُمان والخليج.",
        "为阿曼及海合会各国食品企业全球采购谷物、生鲜农产品及农业投入品。",
      ),
      details: [
        t(
          "Bulk grain imports: wheat, rice, barley, corn",
          "استيراد الحبوب بالجملة: قمح، أرز، شعير، ذرة",
          "大宗谷物进口：小麦、大米、大麦、玉米",
        ),
        t(
          "Fresh and frozen produce supply chains",
          "سلاسل إمداد المنتجات الطازجة والمجمدة",
          "生鲜与冷冻农产品供应链",
        ),
        t(
          "Animal feed and livestock supplies",
          "أعلاف الحيوانات ومستلزمات الثروة الحيوانية",
          "饲料及畜牧用品供应",
        ),
        t(
          "Agricultural equipment and tools",
          "معدات وأدوات زراعية",
          "农业设备与工具",
        ),
        t(
          "Fertilizers and crop protection products",
          "الأسمدة ومنتجات حماية المحاصيل",
          "肥料及作物保护产品",
        ),
      ],
    },
    {
      icon: Factory,
      title: t("Industrial Supplies", "الإمدادات الصناعية", "工业用品"),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
      summary: t(
        "Comprehensive range of industrial tools, equipment, safety gear, and consumables for manufacturing.",
        "مجموعة شاملة من الأدوات والمعدات الصناعية ومعدات السلامة والمستهلكات للتصنيع.",
        "为制造业提供全面的工业工具、设备、安全装备及耗材。",
      ),
      details: [
        t(
          "Safety gear: PPE, helmets, gloves, harnesses",
          "معدات السلامة: معدات الحماية الشخصية، خوذات، قفازات، أحزمة",
          "安全装备：个人防护用品、头盔、手套、安全带",
        ),
        t(
          "Hand tools, power tools, and cutting equipment",
          "أدوات يدوية وكهربائية ومعدات قطع",
          "手动工具、电动工具及切割设备",
        ),
        t(
          "Industrial fasteners and hardware",
          "مثبتات ومعدات صناعية",
          "工业紧固件与五金件",
        ),
        t(
          "Lubricants, sealants, and maintenance products",
          "مواد التشحيم والعوازل ومنتجات الصيانة",
          "润滑剂、密封剂及维护产品",
        ),
        t(
          "Conveyor systems and material handling",
          "أنظمة النقل والتداول المواد",
          "输送系统及物料搬运",
        ),
      ],
    },
    {
      icon: Globe,
      title: t(
        "General Trading & Commodities",
        "التجارة العامة والسلع",
        "综合贸易与大宗商品",
      ),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
      summary: t(
        "Wide-ranging import/export of commercial goods with competitive pricing and reliable global networks.",
        "استيراد وتصدير واسع النطاق للبضائع التجارية بأسعار تنافسية وشبكات عالمية موثوقة.",
        "广泛进出口各类商品，价格具竞争力，全球网络可靠。",
      ),
      details: [
        t(
          "Consumer goods import and distribution",
          "استيراد وتوزيع السلع الاستهلاكية",
          "消费品进口与分销",
        ),
        t(
          "Export facilitation for local manufacturers",
          "تيسير التصدير للمصنعين المحليين",
          "为本地制造商提供出口便利",
        ),
        t(
          "Commodity trading and brokering",
          "تجارة السلع والوساطة",
          "大宗商品贸易与经纪",
        ),
        t(
          "Cross-border trade documentation",
          "توثيق التجارة عبر الحدود",
          "跨境贸易文件办理",
        ),
        t(
          "Customs clearance advisory services",
          "خدمات استشارية للتخليص الجمركي",
          "清关咨询服务",
        ),
      ],
    },
    {
      icon: Truck,
      title: t(
        "Logistics & Freight Management",
        "إدارة اللوجستيات والشحن",
        "物流与货运管理",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
      summary: t(
        "End-to-end freight management across sea, air, and road with full customs clearance support.",
        "إدارة شاملة للشحن عبر البحر والجو والبر مع دعم كامل للتخليص الجمركي.",
        "海运、空运及陆运端到端货运管理，提供全面清关支持。",
      ),
      details: [
        t(
          "Sea freight FCL/LCL shipments",
          "شحن بحري بحاويات كاملة وأجزاء حاويات",
          "海运整箱（FCL）与拼箱（LCL）运输",
        ),
        t(
          "Air freight for time-sensitive cargo",
          "شحن جوي للبضائع الحساسة للوقت",
          "时效敏感货物的空运服务",
        ),
        t(
          "Cross-Gulf road freight services",
          "خدمات الشحن البري عبر الخليج",
          "海湾地区跨境陆运服务",
        ),
        t(
          "Customs clearance and documentation",
          "التخليص الجمركي والتوثيق",
          "清关与文件办理",
        ),
        t(
          "Warehousing and distribution in Oman",
          "التخزين والتوزيع في عُمان",
          "阿曼仓储与配送",
        ),
      ],
    },
    {
      icon: Users,
      title: t(
        "Labour & Manpower Solutions",
        "حلول العمالة والقوى البشرية",
        "劳动力与人力解决方案",
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
      summary: t(
        "Comprehensive workforce supply, recruitment, and HR outsourcing for all industries in Oman.",
        "توريد شاملة للقوى العاملة والتوظيف والاستعانة بمصادر خارجية للموارد البشرية لجميع الصناعات في عُمان.",
        "为阿曼各行业提供全面的人力供应、招聘及人力资源外包服务。",
      ),
      details: [
        t(
          "Skilled and unskilled worker supply",
          "توريد العمال المهرة وغير المهرة",
          "技术工人与非技术工人供应",
        ),
        t(
          "Permanent and contract recruitment",
          "التوظيف الدائم والتعاقدي",
          "长期与合同制招聘",
        ),
        t(
          "HR outsourcing and payroll management",
          "الاستعانة بمصادر خارجية للموارد البشرية وإدارة الرواتب",
          "人力资源外包与薪酬管理",
        ),
        t(
          "LMRA compliance and visa processing",
          "الامتثال للوائح سوق العمل ومعالجة التأشيرات",
          "劳动力市场法规合规与签证办理",
        ),
        t(
          "Staff training and onboarding support",
          "تدريب الموظفين ودعم الإعداد الوظيفي",
          "员工培训与入职支持",
        ),
      ],
    },
    {
      icon: Zap,
      title: t(
        "Solar & Renewable Energy",
        "الطاقة الشمسية والمتجددة",
        "太阳能与可再生能源",
      ),
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      summary: t(
        "Complete solar energy solutions — from power generation and storage to heating systems and accessories — for homes, businesses, and industry in Oman and the Gulf.",
        "حلول طاقة شمسية كاملة — من توليد الطاقة والتخزين إلى أنظمة التسخين والملحقات — للمنازل والشركات والصناعة في عُمان والخليج.",
        "一站式太阳能解决方案——涵盖发电、储能、供暖系统及配件——服务于阿曼及海湾地区的家庭、企业和工业客户。",
      ),
      details: [
        t(
          "Solar power generation systems (on-grid & off-grid)",
          "أنظمة توليد الطاقة الشمسية (متصلة بالشبكة ومستقلة)",
          "太阳能发电系统（并网与离网）",
        ),
        t(
          "Solar power systems design and installation",
          "تصميم وتركيب أنظمة الطاقة الشمسية",
          "太阳能系统设计与安装",
        ),
        t(
          "Energy storage and battery conversion solutions",
          "حلول تخزين الطاقة وتحويل البطاريات",
          "储能与电池转换解决方案",
        ),
        t(
          "Solar heating and hot water systems",
          "أنظمة التسخين الشمسي والمياه الساخنة",
          "太阳能供暖与热水系统",
        ),
        t(
          "Solar components and accessories supply",
          "توريد مكونات وملحقات الطاقة الشمسية",
          "太阳能组件及配件供应",
        ),
      ],
    },
    {
      icon: Wheat,
      title: t(
        "Seafood & Poultry Trading",
        "تجارة المأكولات البحرية والدواجن",
        "海鲜与禽类贸易",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
      summary: t(
        "Premium fresh and frozen seafood and certified poultry products, sourced globally and delivered reliably to food businesses across Oman and the GCC.",
        "مأكولات بحرية طازجة ومجمدة متميزة ومنتجات دواجن معتمدة، يتم توريدها عالمياً وتسليمها بشكل موثوق لشركات الأغذية في عُمان والخليج.",
        "优质新鲜与冷冻海鲜及认证禽类产品，全球采购，可靠配送至阿曼及海合会各国食品企业。",
      ),
      details: [
        t(
          "Seafood: shrimp, tuna, salmon, mackerel, squid, cuttlefish, mussels, clams",
          "مأكولات بحرية: روبيان، تونة، سلمون، ماكريل، حبار، سبيط، بلح البحر، حلزون البحر",
          "海鲜：虾、金枪鱼、三文鱼、鲭鱼、鱿鱼、墨鱼、贻贝、蛤蜊",
        ),
        t(
          "Poultry: whole chicken (800g, 1000g, 1100g grades)",
          "دواجن: دجاج كامل (فئات 800 جرام، 1000 جرام، 1100 جرام)",
          "禽类：整鸡（800克、1000克、1100克规格）",
        ),
        t(
          "Eggs — fresh and graded for commercial supply",
          "بيض — طازج ومصنف للتوريد التجاري",
          "鸡蛋——新鲜并按商业供应分级",
        ),
        t(
          "Cold-chain logistics and temperature-controlled delivery",
          "لوجستيات السلسلة الباردة والتسليم بدرجة حرارة متحكم بها",
          "冷链物流与温控配送",
        ),
        t(
          "Halal-certified sourcing and documentation",
          "توريد وتوثيق معتمد حلال",
          "清真认证采购与文件支持",
        ),
      ],
    },
    {
      icon: Truck,
      title: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة", "轮胎与胶粘剂"),
      color: "text-slate-700",
      bg: "bg-slate-100",
      summary: t(
        "Comprehensive supply of premium automotive, truck, and industrial tyres alongside high-performance adhesives, sealants, and bonding compounds for industrial applications across Oman and the GCC.",
        "توريد شامل لإطارات سيارات وشاحنات وصناعية متميزة إلى جانب مواد لاصقة وعوازل عالية الأداء للتطبيقات الصناعية في عُمان والخليج.",
        "全面供应优质乘用车、卡车及工业轮胎，并提供高性能胶粘剂、密封剂和粘合材料，服务于阿曼及海合会地区的工业应用。",
      ),
      details: [
        t(
          "Automotive tyres: passenger car, SUV, and 4x4 tyres from leading brands",
          "إطارات السيارات: سيارات ركاب، سيارات دفع رباعي من ماركات رائدة",
          "汽车轮胎：来自知名品牌的乘用车、SUV及四驱轮胎",
        ),
        t(
          "Truck & heavy-vehicle tyres: radial and bias-ply for all tonnage",
          "إطارات الشاحنات والمركبات الثقيلة: شعاعية ومتقاطعة لجميع الأوزان",
          "卡车及重型车辆轮胎：适用于各吨位的子午线与斜交轮胎",
        ),
        t(
          "Off-road and industrial tyres for construction and mining equipment",
          "إطارات طرق وعرة وصناعية لمعدات البناء والتعدين",
          "适用于建筑与采矿设备的越野及工业轮胎",
        ),
        t(
          "Industrial adhesives: structural, assembly, and multi-purpose bonding",
          "مواد لاصقة صناعية: هيكلية وتجميعية ومتعددة الأغراض",
          "工业胶粘剂：结构型、装配型及多用途粘合",
        ),
        t(
          "Sealants: silicone, polyurethane, and acrylic for construction and manufacturing",
          "عوازل: سيليكون وبولي يوريثان وأكريليك للبناء والتصنيع",
          "密封剂：用于建筑与制造的硅酮、聚氨酯及丙烯酸产品",
        ),
        t(
          "Specialty bonding products: epoxies, contact adhesives, and industrial tapes",
          "منتجات ربط متخصصة: إيبوكسي ومواد لاصقة تلامسية وأشرطة صناعية",
          "特种粘合产品：环氧树脂、接触式胶粘剂及工业胶带",
        ),
      ],
    },
  ];
}

function ServicesPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const [expanded, setExpanded] = useState<number | null>(null);
  const services = getServices(lang);

  return (
    <div>
      <PageHero
        title={t("Our Services", "خدماتنا", "我们的服务")}
        subtitle={t(
          "Integrated service lines delivering end-to-end industrial, trading, solar, and food solutions",
          "خطوط خدمة متكاملة تقدم حلولاً صناعية وتجارية وطاقة شمسية وغذائية شاملة",
          "一体化服务线，提供端到端的工业、贸易、太阳能及食品解决方案",
        )}
        image="/assets/generated/page-services-hero.dim_1400x600.jpg"
        breadcrumb={t("Services", "الخدمات", "服务")}
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("What We Offer", "ما نقدمه", "我们的业务")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Complete Service Portfolio",
                "محفظة الخدمات الكاملة",
                "完整服务体系",
              )}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isOpen = expanded === i;
              return (
                <motion.div
                  key={service.title}
                  data-ocid={`services.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-border transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.bg} ${service.color} mb-4`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.summary}
                    </p>

                    <button
                      type="button"
                      data-ocid={`services.learn_more.button.${i + 1}`}
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="text-brand-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      {isOpen
                        ? t("Show Less", "عرض أقل", "收起")
                        : t("Learn More", "اعرف المزيد", "了解更多")}
                      <ChevronRight
                        size={14}
                        className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-2 overflow-hidden"
                        >
                          {service.details.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <BadgeCheck
                                className="text-brand-teal flex-shrink-0 mt-0.5"
                                size={16}
                              />
                              {d}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 md:py-24 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Our Process", "عمليتنا", "我们的流程")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {t("How We Work", "كيف نعمل", "我们的工作方式")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                n: "01",
                title: t("Requirement Analysis", "تحليل المتطلبات", "需求分析"),
                desc: t(
                  "We deeply understand your needs, specifications, timelines, and budget constraints.",
                  "نُفهم احتياجاتك ومواصفاتك وجداولك الزمنية وقيود ميزانيتك بعمق.",
                  "我们深入理解您的需求、规格、时间表及预算限制。",
                ),
              },
              {
                n: "02",
                title: t("Sourcing", "التوريد", "采购"),
                desc: t(
                  "Our global network enables competitive sourcing from the best suppliers worldwide.",
                  "تتيح لنا شبكتنا العالمية التوريد التنافسي من أفضل الموردين حول العالم.",
                  "凭借全球网络，我们能够从世界各地最优质的供应商处进行有竞争力的采购。",
                ),
              },
              {
                n: "03",
                title: t("Negotiations", "المفاوضات", "谈判"),
                desc: t(
                  "We negotiate the best terms, pricing, and conditions on your behalf with verified suppliers.",
                  "نتفاوض نيابةً عنك للحصول على أفضل الشروط والأسعار والظروف مع موردين موثوقين.",
                  "我们代表您与经过验证的供应商谈判，争取最优的条款、价格和条件。",
                ),
              },
              {
                n: "04",
                title: t("Quality Check", "فحص الجودة", "质量检验"),
                desc: t(
                  "Rigorous quality inspection and verification before any shipment or deployment.",
                  "فحص وتحقق صارم من الجودة قبل أي شحن أو نشر.",
                  "在任何发货或部署之前进行严格的质量检验与核查。",
                ),
              },
              {
                n: "05",
                title: t("Delivery", "التسليم", "交付"),
                desc: t(
                  "On-time delivery with complete documentation, logistics support, and after-service.",
                  "تسليم في الوقت المحدد مع توثيق كامل ودعم لوجستي وخدمات ما بعد البيع.",
                  "准时交付，并提供完整的单据、物流支持及售后服务。",
                ),
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                data-ocid={`services.process.step.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="font-display text-5xl font-extrabold text-brand-gold/30 mb-3 leading-none">
                  {step.n}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t("Ready to Get Started?", "مستعد للبدء؟", "准备好开始了吗？")}
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t(
              "Contact us to discuss your requirements and receive a tailored proposal from our team.",
              "تواصل معنا لمناقشة متطلباتك وتلقي عرض مخصص من فريقنا.",
              "联系我们，讨论您的需求，获取我们团队的定制方案。",
            )}
          </p>
          <button
            type="button"
            data-ocid="services.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors shadow-lg"
          >
            {t("Request a Quote", "طلب عرض أسعار", "获取报价")}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── PORTFOLIO PAGE ────────────────────────────────────────────────────────────
type PortfolioFilter =
  | "All"
  | "Construction"
  | "Agriculture"
  | "Industrial"
  | "Trading"
  | "Manpower"
  | "Seafood"
  | "Poultry"
  | "Solar"
  | "Tyres";

function getProjects(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      name: t(
        "Muscat Grand Mall Infrastructure Supply",
        "توريد البنية التحتية لمسقط غراند مول",
        "马斯喀特大商城基础设施供应",
      ),
      sector: "Construction" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Supplied structural steel, aggregates, and MEP materials for the expansion of Muscat Grand Mall's retail and parking complex.",
        "توريد الفولاذ الهيكلي والركام ومواد الميكانيكا والكهرباء لتوسعة مجمع التسوق والمواقف في مسقط غراند مول.",
        "为马斯喀特大商城的零售与停车综合体扩建供应结构钢、骨料及机电材料。",
      ),
      image: "/assets/generated/portfolio-construction-mall.dim_600x400.jpg",
    },
    {
      name: t(
        "The Wave Muscat Development — Building Materials",
        "تطوير ذا ويف مسقط — مواد البناء",
        "马斯喀特浪潮湾开发 — 建筑材料",
      ),
      sector: "Construction" as PortfolioFilter,
      year: "2022",
      desc: t(
        "Long-term supply agreement for premium building materials throughout the prestigious The Wave Muscat waterfront development.",
        "اتفاقية توريد طويلة الأمد لمواد البناء المتميزة في مشروع ذا ويف مسقط الواجهة البحرية المرموق.",
        "为著名的马斯喀特浪潮湾滨水开发项目提供长期优质建材供应协议。",
      ),
      image: "/assets/generated/portfolio-construction-wave.dim_600x400.jpg",
    },
    {
      name: t(
        "GCC Grain Import Program",
        "برنامج استيراد الحبوب الخليجي",
        "海合会粮食进口计划",
      ),
      sector: "Agriculture" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Managed bulk import of wheat, rice, and barley from South Asia for a consortium of GCC food distributors.",
        "إدارة استيراد الجملة من القمح والأرز والشعير من جنوب آسيا لتحالف موزعي الأغذية الخليجيين.",
        "为海合会食品分销商联盟管理来自南亚的小麦、大米和大麦批量进口。",
      ),
      image: "/assets/generated/portfolio-agriculture-grain.dim_600x400.jpg",
    },
    {
      name: t(
        "Sohar Industrial Zone Supply",
        "توريد المنطقة الصناعية بصحار",
        "苏哈尔工业区供应",
      ),
      sector: "Industrial" as PortfolioFilter,
      year: "2022",
      desc: t(
        "Supplied safety gear, industrial fasteners, and maintenance consumables to multiple factories in Sohar Free Zone.",
        "توريد معدات السلامة والمثبتات الصناعية والمستهلكات للصيانة لمصانع متعددة في المنطقة الحرة بصحار.",
        "为苏哈尔自由区的多家工厂供应安全装备、工业紧固件及维护耗材。",
      ),
      image: "/assets/generated/portfolio-industrial-sohar.dim_600x400.jpg",
    },
    {
      name: t(
        "Muscat New Urban Manpower Contract",
        "عقد القوى العاملة لمشروع مسقط الحضري الجديد",
        "马斯喀特新城市人力合同",
      ),
      sector: "Manpower" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Placed 120+ construction workers, electricians, and site supervisors for Muscat's new urban Phase 2 housing project.",
        "توظيف أكثر من 120 عامل بناء وكهربائي ومشرف موقع لمشروع الإسكان الحضري الجديد بمسقط المرحلة الثانية.",
        "为马斯喀特新城市二期住房项目派遣120余名建筑工人、电工及现场主管。",
      ),
      image: "/assets/generated/labour-workers.dim_600x400.jpg",
    },
    {
      name: t(
        "Mina Sultan Qaboos Logistics Hub",
        "مركز لوجستيات ميناء السلطان قابوس",
        "苏哈尔卡布斯港物流中心",
      ),
      sector: "Trading" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Managed import logistics and customs clearance for a major retail chain's new Mina Sultan Qaboos distribution centre.",
        "إدارة لوجستيات الاستيراد والتخليص الجمركي لمركز التوزيع الجديد لسلسلة تجزئة كبرى في ميناء السلطان قابوس.",
        "为某大型零售连锁在苏丹卡布斯港的新配送中心管理进口物流及清关。",
      ),
      image: "/assets/generated/portfolio-trading-logistics.dim_600x400.jpg",
    },
    {
      name: t(
        "Oman Oil Facility Supplies",
        "توريدات منشأة النفط في عُمان",
        "阿曼石油设施供应",
      ),
      sector: "Industrial" as PortfolioFilter,
      year: "2021",
      desc: t(
        "Long-term industrial supply contract for PPE, tools, and safety equipment to an Oman oil facility.",
        "عقد توريد صناعي طويل الأمد لمعدات الحماية الشخصية والأدوات ومعدات السلامة لمنشأة نفطية عُمانية.",
        "为阿曼石油设施提供个人防护装备、工具及安全设备的长期工业供应合同。",
      ),
      image: "/assets/generated/portfolio-industrial-oil.dim_600x400.jpg",
    },
    {
      name: t(
        "Regional Food Distribution Network",
        "شبكة توزيع الغذاء الإقليمية",
        "区域食品分销网络",
      ),
      sector: "Agriculture" as PortfolioFilter,
      year: "2022",
      desc: t(
        "Established a multi-supplier fresh produce distribution network across Oman, Kuwait, and Qatar.",
        "إنشاء شبكة توزيع للمنتجات الطازجة متعددة الموردين عبر عُمان والكويت وقطر.",
        "在阿曼、科威特和卡塔尔建立多供应商生鲜产品分销网络。",
      ),
      image: "/assets/generated/portfolio-agriculture-produce.dim_600x400.jpg",
    },
    {
      name: t(
        "Gulf Shrimp & Tuna Export Program",
        "برنامج تصدير الروبيان والتونة الخليجي",
        "海湾虾类与金枪鱼出口计划",
      ),
      sector: "Seafood" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Coordinated large-scale export of fresh Omani shrimp, yellowfin tuna, and mackerel to premium buyers in the UAE, Qatar, and Saudi Arabia.",
        "تنسيق تصدير واسع النطاق للروبيان العُماني الطازج والتونة الصفراء الزعانف والماكريل لمشترين متميزين في الإمارات وقطر والسعودية.",
        "协调向阿联酋、卡塔尔和沙特阿拉伯的高端买家大规模出口新鲜阿曼虾、黄鳍金枪鱼和鲭鱼。",
      ),
      image: "/assets/generated/portfolio-seafood-export.dim_600x400.jpg",
    },
    {
      name: t(
        "Muscat Seafood Cold-Chain Distribution",
        "توزيع المأكولات البحرية بالسلسلة الباردة في مسقط",
        "马斯喀特海鲜冷链分销",
      ),
      sector: "Seafood" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Set up a temperature-controlled distribution network supplying squid, cuttlefish, mussels, and clams to supermarkets and restaurants across Muscat.",
        "إنشاء شبكة توزيع بدرجة حرارة متحكم بها لتوريد الحبار والسبيط وبلح البحر وحلزون البحر للسوبرماركت والمطاعم في مسقط.",
        "建立温控分销网络，向马斯喀特各地的超市和餐厅供应鱿鱼、墨鱼、贻贝和蛤蜊。",
      ),
      image: "/assets/generated/portfolio-seafood-coldchain.dim_600x400.jpg",
    },
    {
      name: t(
        "Integrated Poultry Supply — Oman Retailers",
        "توريد الدواجن المتكامل — تجار التجزئة في عُمان",
        "综合禽肉供应 — 阿曼零售商",
      ),
      sector: "Poultry" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Long-term supply agreement delivering graded whole chicken (800g, 1000g, 1100g classes) and fresh eggs to leading Omani supermarket chains.",
        "اتفاقية توريد طويلة الأمد لتسليم الدجاج الكامل المصنف (فئات 800 جرام، 1000 جرام، 1100 جرام) والبيض الطازج لسلاسل السوبرماركت الرائدة في عُمان.",
        "长期供应协议，向阿曼主要超市连锁交付分级整鸡（800克、1000克、1100克规格）及新鲜鸡蛋。",
      ),
      image: "/assets/generated/portfolio-poultry-supply.dim_600x400.jpg",
    },
    {
      name: t(
        "Poultry & Egg Distribution — Sohar Region",
        "توزيع الدواجن والبيض — منطقة صحار",
        "禽肉与鸡蛋分销 — 苏哈尔地区",
      ),
      sector: "Poultry" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Established reliable weekly delivery cycles for standardised chicken cuts and free-range eggs to food service businesses and hotels in Sohar.",
        "إنشاء دورات تسليم أسبوعية موثوقة لقطع الدجاج المعيارية والبيض المرعوي لشركات الخدمات الغذائية والفنادق في صحار.",
        "为苏哈尔的餐饮服务企业和酒店建立可靠的标准化鸡肉分割件及散养鸡蛋每周配送周期。",
      ),
      image: "/assets/generated/portfolio-poultry-sohar.dim_600x400.jpg",
    },
    {
      name: t(
        "Muscat Commercial Solar Rooftop Installation",
        "تركيب الطاقة الشمسية التجارية على الأسطح في مسقط",
        "马斯喀特商业屋顶太阳能安装",
      ),
      sector: "Solar" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Supplied and commissioned a 500 kW rooftop solar power generation system for a large commercial warehouse complex in Al Rusayl Industrial Estate.",
        "توريد وتشغيل نظام توليد طاقة شمسية على السطح بقدرة 500 كيلوواط لمجمع مستودعات تجاري كبير في المنطقة الصناعية بالرسيل.",
        "为位于鲁塞工业园的大型商业仓储综合体供应并调试了一套 500 千瓦屋顶太阳能发电系统。",
      ),
      image: "/assets/generated/portfolio-solar-rooftop.dim_600x400.jpg",
    },
    {
      name: t(
        "Commercial Tyre Supply — Sohar Industrial Zone",
        "توريد الإطارات التجارية — المنطقة الصناعية بصحار",
        "商用轮胎供应 — 苏哈尔工业区",
      ),
      sector: "Tyres" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Long-term supply contract for truck and heavy-vehicle tyres to multiple logistics and construction companies operating in Sohar Free Zone and Port of Sohar.",
        "عقد توريد طويل الأمد لإطارات الشاحنات والمركبات الثقيلة لعدة شركات لوجستية وإنشائية تعمل في المنطقة الحرة بصحار وميناء صحار.",
        "为在苏哈尔自由区和苏哈尔港运营的多家物流与建筑公司提供卡车及重型车辆轮胎的长期供应合同。",
      ),
      image: "/assets/generated/portfolio-tyres-sohar.dim_600x400.jpg",
    },
    {
      name: t(
        "Industrial Adhesives & Sealants — Muscat Construction Projects",
        "المواد اللاصقة والعوازل الصناعية — مشاريع البناء في مسقط",
        "工业胶粘剂与密封胶 — 马斯喀特建筑项目",
      ),
      sector: "Tyres" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Supplied structural adhesives, polyurethane sealants, and specialty bonding compounds to three major construction contractors for Muscat commercial and residential developments.",
        "توريد مواد لاصقة هيكلية وعوازل بولي يوريثان ومركبات ربط متخصصة لثلاثة مقاولي بناء رئيسيين في مشاريع مسقط التجارية والسكنية.",
        "为三家主要建筑承包商供应结构胶粘剂、聚氨酯密封胶及特种粘合材料，用于马斯喀特的商业与住宅开发项目。",
      ),
      image: "/assets/generated/portfolio-adhesives-muscat.dim_600x400.jpg",
    },
    {
      name: t(
        "Solar Water Heating — Residential Development",
        "تسخين المياه بالطاقة الشمسية — المشروع السكني",
        "太阳能热水系统 — 住宅开发项目",
      ),
      sector: "Solar" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Delivered and installed solar heating and domestic hot water systems across 120 villas in a new Muscat residential development, reducing energy costs by 65%.",
        "تسليم وتركيب أنظمة التسخين الشمسي والمياه الساخنة المنزلية في 120 فيلا في مشروع سكني جديد بمسقط، مما أدى إلى تخفيض تكاليف الطاقة بنسبة 65٪.",
        "为马斯喀特一处新建住宅项目的 120 栋别墅交付并安装了太阳能供暖及生活热水系统，使能源成本降低 65%。",
      ),
      image: "/assets/generated/portfolio-solar-residential.dim_600x400.jpg",
    },
  ];
}

const sectorColors: Record<string, { text: string; bg: string }> = {
  Construction: { text: "text-orange-700", bg: "bg-orange-50" },
  Agriculture: { text: "text-green-700", bg: "bg-green-50" },
  Industrial: { text: "text-brand-gold", bg: "bg-brand-gold/10" },
  Trading: { text: "text-brand-terracotta", bg: "bg-brand-terracotta/10" },
  Manpower: { text: "text-purple-700", bg: "bg-purple-50" },
  Seafood: { text: "text-blue-700", bg: "bg-blue-50" },
  Poultry: { text: "text-amber-700", bg: "bg-amber-50" },
  Solar: { text: "text-yellow-700", bg: "bg-yellow-50" },
  Tyres: { text: "text-slate-700", bg: "bg-slate-100" },
};

function PortfolioPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const [filter, setFilter] = useState<PortfolioFilter>("All");
  const projects = getProjects(lang);
  const filters: PortfolioFilter[] = [
    "All",
    "Solar",
    "Seafood",
    "Poultry",
    "Tyres",
    "Construction",
    "Agriculture",
    "Industrial",
    "Trading",
    "Manpower",
  ];
  // Translated display labels for filters (state values remain English for filtering)
  const filterLabels: Record<PortfolioFilter, string> = {
    All: t("All", "الكل", "全部"),
    Solar: t("Solar", "شمسية", "太阳能"),
    Seafood: t("Seafood", "مأكولات بحرية", "海鲜"),
    Poultry: t("Poultry", "دواجن", "禽类"),
    Tyres: t("Tyres", "إطارات", "轮胎"),
    Construction: t("Construction", "بناء", "建筑"),
    Agriculture: t("Agriculture", "زراعة", "农业"),
    Industrial: t("Industrial", "صناعة", "工业"),
    Trading: t("Trading", "تجارة", "贸易"),
    Manpower: t("Manpower", "قوى عاملة", "人力"),
  };
  const filtered = (
    filter === "All" ? projects : projects.filter((p) => p.sector === filter)
  )
    .slice()
    .sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <div>
      <PageHero
        title={t("Our Portfolio", "محفظتنا", "我们的项目案例")}
        subtitle={t(
          "Showcasing completed projects across solar energy, seafood & poultry, construction, industrial, and trading sectors",
          "عرض المشاريع المنجزة عبر قطاعات الطاقة الشمسية والمأكولات البحرية والدواجن والبناء والصناعة والتجارة",
          "展示涵盖太阳能、海鲜与禽类、建筑、工业及贸易领域的已完成项目",
        )}
        image="/assets/generated/page-portfolio-hero.dim_1400x600.jpg"
        breadcrumb={t("Portfolio", "المحفظة", "项目案例")}
      />

      {/* Filters + Grid */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {filters.map((f) => (
              <button
                type="button"
                key={f}
                data-ocid="portfolio.filter.tab"
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === f
                    ? "bg-brand-teal text-white shadow-md"
                    : "bg-white text-foreground border border-border hover:border-brand-teal hover:text-brand-teal"
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filtered.map((project, i) => {
                const col = sectorColors[project.sector] || {
                  text: "text-brand-teal",
                  bg: "bg-brand-teal/10",
                };
                return (
                  <motion.div
                    key={project.name}
                    data-ocid={`portfolio.project.card.${i + 1}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                  >
                    <div className="relative overflow-hidden h-40">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-brand-teal-dark text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3 ${col.bg} ${col.text}`}
                      >
                        {filterLabels[project.sector]}
                      </span>
                      <h3 className="font-display font-bold text-foreground text-sm leading-snug mb-2">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div
              data-ocid="portfolio.projects.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              {t(
                "No projects in this category yet.",
                "لا توجد مشاريع في هذه الفئة بعد.",
                "该类别暂无项目。",
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Upcoming Projects ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-teal-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(201,168,76,0.3) 30px, rgba(201,168,76,0.3) 32px), repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(201,168,76,0.3) 30px, rgba(201,168,76,0.3) 32px)",
          }}
        />
        <LogoWatermark size={320} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-gold font-semibold text-sm tracking-widest uppercase mb-3 text-outline">
              {t("Coming Soon", "قريباً", "即将推出")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
              {t("Upcoming Projects", "المشاريع القادمة", "即将开展的项目")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
            <p className="text-white/70 mt-4 max-w-2xl mx-auto text-base leading-relaxed text-outline">
              {t(
                "Projects currently in planning or execution phase — watch this space for updates.",
                "مشاريع في مرحلة التخطيط أو التنفيذ — تابعونا للتحديثات.",
                "目前处于规划或执行阶段的项目 — 敬请关注最新动态。",
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: t(
                  "Large-Scale Solar Farm — South Oman",
                  "مزرعة طاقة شمسية واسعة — جنوب عُمان",
                  "大型太阳能农场 — 阿曼南部",
                ),
                sector: t("Solar", "شمسية", "太阳能"),
                eta: "Q3 2025",
                desc: t(
                  "5 MW ground-mounted solar power generation plant with battery energy storage for an industrial client in the South Oman region. Engineering and procurement phase underway.",
                  "محطة توليد طاقة شمسية أرضية بقدرة 5 ميجاواط مع تخزين طاقة البطاريات لعميل صناعي في جنوب عُمان. مرحلة الهندسة والمشتريات جارية.",
                  "为阿曼南部地区的工业客户建设 5 兆瓦地面式太阳能发电厂并配备电池储能系统。工程与采购阶段正在进行中。",
                ),
                icon: Zap,
                color: "text-yellow-400",
                bg: "bg-yellow-400/10 border-yellow-400/30",
              },
              {
                name: t(
                  "Salmon & Tuna Cold-Chain Export to EU",
                  "تصدير السلمون والتونة بالسلسلة الباردة إلى أوروبا",
                  "三文鱼与金枪鱼冷链出口至欧盟",
                ),
                sector: t("Seafood", "مأكولات بحرية", "海鲜"),
                eta: "Q4 2025",
                desc: t(
                  "Establishing an export pipeline for premium Omani and Indian Ocean salmon and bluefin tuna to European buyers, including compliance with EU food safety standards.",
                  "إنشاء مسار تصدير لسلمون عُماني متميز وتونة زعنفة زرقاء من المحيط الهندي لمشترين أوروبيين، بما يتوافق مع معايير سلامة الغذاء الأوروبية.",
                  "建立面向欧洲买家的优质阿曼及印度洋三文鱼与蓝鳍金枪鱼出口通道，并确保符合欧盟食品安全标准。",
                ),
                icon: Globe,
                color: "text-blue-300",
                bg: "bg-blue-300/10 border-blue-300/30",
              },
              {
                name: t(
                  "Poultry Processing Facility Partnership",
                  "شراكة منشأة معالجة الدواجن",
                  "禽肉加工厂合作项目",
                ),
                sector: t("Poultry", "دواجن", "禽类"),
                eta: "Q1 2026",
                desc: t(
                  "Strategic partnership with a licensed Omani poultry processor to establish a grading, packaging, and cold-storage facility for chicken and egg distribution across the GCC.",
                  "شراكة استراتيجية مع معالج دواجن عُماني مرخص لإنشاء منشأة تصنيف وتغليف وتخزين بارد لتوزيع الدجاج والبيض عبر دول الخليج.",
                  "与持牌阿曼禽肉加工企业建立战略合作，设立分级、包装及冷藏设施，面向海合会各国分销鸡肉与鸡蛋。",
                ),
                icon: Wheat,
                color: "text-amber-300",
                bg: "bg-amber-300/10 border-amber-300/30",
              },
              {
                name: t(
                  "Solar Energy Storage Systems — Commercial Rollout",
                  "أنظمة تخزين الطاقة الشمسية — الطرح التجاري",
                  "太阳能储能系统 — 商业化推广",
                ),
                sector: t("Solar", "شمسية", "太阳能"),
                eta: "Q2 2026",
                desc: t(
                  "Rollout of modular lithium battery storage systems paired with solar installations across commercial and industrial clients in Muscat and Sohar.",
                  "طرح أنظمة تخزين بطاريات ليثيوم معيارية مقترنة بتركيبات الطاقة الشمسية لدى العملاء التجاريين والصناعيين في مسقط وصحار.",
                  "向马斯喀特和苏哈尔的工商业客户推广与太阳能装置配套的模块化锂电池储能系统。",
                ),
                icon: Zap,
                color: "text-yellow-400",
                bg: "bg-yellow-400/10 border-yellow-400/30",
              },
              {
                name: t(
                  "Seafood Distribution Hub — Muscat Port",
                  "مركز توزيع المأكولات البحرية — ميناء مسقط",
                  "海鲜分销中心 — 马斯喀特港",
                ),
                sector: t("Seafood", "مأكولات بحرية", "海鲜"),
                eta: "Q3 2026",
                desc: t(
                  "Development of a dedicated seafood import, grading, and distribution hub at Muscat port to streamline shrimp, squid, and fish supply to hotels, restaurants, and retailers.",
                  "تطوير مركز متخصص لاستيراد وتصنيف وتوزيع المأكولات البحرية في ميناء مسقط لتبسيط توريد الروبيان والحبار والأسماك للفنادق والمطاعم والتجزئة.",
                  "在马斯喀特港建设专门的海鲜进口、分级与分销中心，精简虾、鱿鱼及鱼类向酒店、餐厅和零售商的供应流程。",
                ),
                icon: Globe,
                color: "text-blue-300",
                bg: "bg-blue-300/10 border-blue-300/30",
              },
              {
                name: t(
                  "Integrated Poultry & Seafood FMCG Export Program",
                  "برنامج تصدير الدواجن والمأكولات البحرية المتكامل",
                  "禽肉与海鲜快消品综合出口计划",
                ),
                sector: t("Poultry", "دواجن", "禽类"),
                eta: "Q4 2026",
                desc: t(
                  "Combined FMCG export program targeting GCC and East African markets — bundling graded chicken, eggs, and certified frozen seafood under a single RAYAT-managed supply chain.",
                  "برنامج تصدير سلع استهلاكية مشترك يستهدف أسواق الخليج وشرق أفريقيا — يجمع الدجاج المصنف والبيض والمأكولات البحرية المجمدة المعتمدة في سلسلة إمداد واحدة تديرها رايات.",
                  "面向海合会及东非市场的快消品综合出口计划——将分级鸡肉、鸡蛋及认证冷冻海鲜整合于由 RAYAT 统一管理的供应链中。",
                ),
                icon: Wheat,
                color: "text-amber-300",
                bg: "bg-amber-300/10 border-amber-300/30",
              },
              {
                name: t(
                  "Gulf-Wide Tyre & Adhesives Distribution Network",
                  "شبكة توزيع الإطارات والمواد اللاصقة الخليجية",
                  "海湾地区轮胎与胶粘剂分销网络",
                ),
                sector: t("Tyres", "إطارات", "轮胎"),
                eta: "Q2 2026",
                desc: t(
                  "Establishing a regional distribution hub in Muscat to supply premium automotive and industrial tyres plus construction-grade adhesives and sealants to dealers and contractors across Oman, UAE, and Qatar.",
                  "إنشاء مركز توزيع إقليمي في مسقط لتوريد إطارات سيارات وصناعية متميزة ومواد لاصقة وعوازل درجة البناء للوكلاء والمقاولين في عُمان والإمارات وقطر.",
                  "在马斯喀特设立区域分销中心，向阿曼、阿联酋及卡塔尔的经销商和承包商供应优质乘用车及工业轮胎，以及建筑级胶粘剂和密封剂。",
                ),
                icon: Truck,
                color: "text-slate-300",
                bg: "bg-slate-300/10 border-slate-300/30",
              },
            ].map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.name}
                  data-ocid={`portfolio.upcoming.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl p-6 border backdrop-blur-sm ${project.bg} hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`inline-flex items-center gap-2 ${project.color} font-semibold text-xs uppercase tracking-wider`}
                    >
                      <Icon size={15} />
                      {project.sector}
                    </div>
                    <span className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-2.5 py-1 rounded-full border border-brand-gold/30">
                      {project.eta}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base leading-snug mb-3 text-outline">
                    {project.name}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-gold/50 rounded-full"
                        style={{ width: i < 2 ? "60%" : i < 4 ? "35%" : "15%" }}
                      />
                    </div>
                    <span className="text-white/40 text-xs">
                      {i < 2
                        ? t("In Progress", "جارٍ", "进行中")
                        : i < 4
                          ? t("Planning", "تخطيط", "规划中")
                          : t("Scoping", "استكشاف", "评估中")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 bg-brand-teal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                value: "40+",
                label: t("Projects Completed", "مشاريع مكتملة", "已完成项目"),
              },
              {
                value: "OMR 5M+",
                label: t("Value Delivered", "قيمة محققة", "已交付价值"),
              },
              {
                value: "8+",
                label: t("Years Active", "سنوات نشاط", "运营年限"),
              },
              {
                value: "30+",
                label: t("Happy Clients", "عملاء راضون", "满意客户"),
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                data-ocid={`portfolio.achievement.card.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-white"
              >
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t(
              "Let's Work Together on Your Next Project",
              "لنعمل معًا في مشروعك القادم",
              "让我们携手推进您的下一个项目",
            )}
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t(
              "Whether it's construction supply, manpower, or trading — RAYAT delivers results you can count on.",
              "سواء كان إمداد إنشاءات أو عمالة أو تجارة — رايات تحقق النتائج التي يمكنك الاعتماد عليها.",
              "无论是建材供应、人力配备还是贸易业务——RAYAT 都能交付您可以信赖的成果。",
            )}
          </p>
          <button
            type="button"
            data-ocid="portfolio.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors shadow-lg"
          >
            {t("Discuss Your Project", "ناقش مشروعك", "探讨您的项目")}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── OUR TEAM PAGE ─────────────────────────────────────────────────────────────
function getTeamMembers(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      initials: "AR",
      name: "Abdullah Al-Rayat",
      title: t(
        "Founder & Managing Director",
        "المؤسس والمدير العام",
        "创始人兼董事总经理",
      ),
      bio: t(
        "With over 20 years of experience in Oman's industrial sector, Abdullah founded RAYAT with a vision to build a world-class trading and industrial company. He leads the company's strategic direction and key client relationships.",
        "بخبرة تمتد لأكثر من 20 عاماً في القطاع الصناعي العُماني، أسّس عبدالله رايات برؤية لبناء شركة تجارة وصناعة عالمية المستوى. يقود الاتجاه الاستراتيجي للشركة وعلاقات العملاء الرئيسية.",
        "凭借在阿曼工业领域逾 20 年的经验，阿卜杜拉创立了 RAYAT，立志打造一家世界级的贸易与工业公司。他主导公司的战略方向及核心客户关系。",
      ),
      color: "bg-brand-teal text-white",
    },
    {
      initials: "MK",
      name: "Mohammed Al-Khalifa",
      title: t("Deputy Managing Director", "نائب المدير العام", "副总经理"),
      bio: t(
        "Mohammed brings 15 years of commercial trading expertise to RAYAT. He oversees the company's trading operations, supplier relations, and international business development partnerships.",
        "يضيف محمد 15 عاماً من الخبرة في التجارة التجارية لرايات. يشرف على العمليات التجارية للشركة وعلاقات الموردين وشراكات تطوير الأعمال الدولية.",
        "穆罕默德为 RAYAT 带来 15 年的商业贸易经验。他负责监管公司的贸易运营、供应商关系及国际业务拓展合作。",
      ),
      color: "bg-brand-teal-dark text-white",
    },
    {
      initials: "PS",
      name: "Priya Sharma",
      title: t("Head of Operations", "رئيسة العمليات", "运营总监"),
      bio: t(
        "Priya manages day-to-day operations across all service lines, ensuring seamless delivery for clients. Her expertise in logistics and process optimization has significantly improved our service turnaround times.",
        "تدير بريا العمليات اليومية عبر جميع خطوط الخدمة، مما يضمن التسليم السلس للعملاء. أدت خبرتها في اللوجستيات وتحسين العمليات إلى تحسين ملحوظ في أوقات تسليم الخدمات.",
        "普里亚负责管理各业务线的日常运营，确保为客户提供顺畅的交付服务。她在物流与流程优化方面的专业能力显著提升了我们的服务响应速度。",
      ),
      color: "bg-brand-terracotta text-white",
    },
    {
      initials: "TH",
      name: "Tariq Hassan",
      title: t(
        "Business Development Manager",
        "مدير تطوير الأعمال",
        "业务拓展经理",
      ),
      bio: t(
        "Tariq leads RAYAT's growth initiatives, with a focus on expanding manpower services and forging new partnerships in the GCC market. He has brought over 20 new enterprise clients to RAYAT in the past two years.",
        "يقود طارق مبادرات نمو رايات، مع التركيز على توسيع خدمات القوى العاملة وإقامة شراكات جديدة في سوق الخليج. جلب أكثر من 20 عميلاً مؤسسياً جديداً لرايات في العامين الماضيين.",
        "塔里克主导 RAYAT 的增长举措，重点拓展人力服务并在海湾市场建立新的合作伙伴关系。过去两年间，他为 RAYAT 引入了 20 余家新的企业客户。",
      ),
      color: "bg-brand-gold text-gray-900",
    },
  ];
}

function getCompanyValues(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      icon: ShieldCheck,
      title: t("Integrity", "النزاهة", "诚信"),
      desc: t(
        "We operate with full transparency in all business dealings, honouring every commitment we make.",
        "نعمل بشفافية كاملة في جميع المعاملات التجارية، نفي بكل التزام نقدمه.",
        "我们在所有商业往来中秉持完全透明的原则，信守每一项承诺。",
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Star,
      title: t("Excellence", "التميز", "卓越"),
      desc: t(
        "Every service, every delivery, every interaction — we hold ourselves to the highest possible standard.",
        "كل خدمة، كل تسليم، كل تفاعل — نمسك أنفسنا بأعلى المعايير الممكنة.",
        "每一项服务、每一次交付、每一次互动——我们都以最高标准要求自己。",
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Handshake,
      title: t("Partnership", "الشراكة", "合作"),
      desc: t(
        "We view our clients and suppliers as long-term partners, not just transactions.",
        "ننظر إلى عملائنا وموردينا كشركاء على المدى البعيد، وليس مجرد معاملات.",
        "我们将客户与供应商视为长期合作伙伴，而非单纯的交易对象。",
      ),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
    {
      icon: Lightbulb,
      title: t("Innovation", "الابتكار", "创新"),
      desc: t(
        "We continuously seek smarter ways to source, supply, and serve in an evolving market.",
        "نسعى باستمرار إلى طرق أذكى للتوريد والتزويد والخدمة في سوق متطور.",
        "在不断变化的市场中，我们持续探索更智慧的采购、供应与服务方式。",
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];
}

function TeamPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const teamMembers = getTeamMembers(lang);
  const values = getCompanyValues(lang);
  return (
    <div>
      <PageHero
        title={t("Our Team", "فريقنا", "我们的团队")}
        subtitle={t(
          "Meet the leadership and management behind RAYAT's success",
          "تعرف على القيادة والإدارة وراء نجاح رايات",
          "认识 RAYAT 成功背后的领导与管理团队",
        )}
        image="/assets/generated/page-team-hero.dim_1400x600.jpg"
        breadcrumb={t("Our Team", "فريقنا", "我们的团队")}
      />

      {/* Leadership */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Leadership", "القيادة", "领导团队")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Meet Our Leadership Team",
                "تعرف على فريق القيادة لدينا",
                "认识我们的领导团队",
              )}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                data-ocid={`team.member.card.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300 text-center"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-display ${member.color} shadow-lg`}
                >
                  {member.initials}
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-0.5">
                  {member.name}
                </h3>
                <p className="text-brand-teal text-sm font-medium mb-3">
                  {member.title}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed text-left">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("What Drives Us", "ما يحفزنا", "我们的动力")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Our Values", "قيمنا", "我们的价值观")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  data-ocid={`team.value.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-sand rounded-2xl p-6 border border-border hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${v.bg} ${v.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-14 bg-brand-teal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="text-brand-gold mx-auto mb-4" size={36} />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              {t("Our Culture", "ثقافتنا", "我们的文化")}
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
              {t(
                "At RAYAT, we believe that a company is only as strong as the people behind it. We foster a culture of respect, continuous learning, and cross-functional collaboration. Every team member — from operations to business development — is empowered to make decisions that benefit our clients. We celebrate diversity and bring together talent from across the globe to serve Oman's growing economy.",
                "في رايات، نؤمن بأن الشركة بقوة الأشخاص الذين يقفون وراءها. نحن نرعى ثقافة الاحترام والتعلم المستمر والتعاون بين الإدارات. كل عضو في الفريق — من العمليات إلى تطوير الأعمال — مخوّل باتخاذ قرارات تفيد عملاءنا. نحن نحتفل بالتنوع ونجمع المواهب من مختلف أنحاء العالم لخدمة الاقتصاد العُماني المتنامي.",
                "在 RAYAT，我们坚信一家公司的实力取决于其背后的人才。我们倡导尊重、持续学习与跨部门协作的企业文化。从运营到业务拓展，每一位团队成员都被赋予为客户利益做出决策的权力。我们拥抱多元化，汇聚来自全球的人才，共同服务于阿曼不断增长的经济。",
              )}
            </p>
            <button
              type="button"
              data-ocid="team.cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              {t("Join Our Team", "انضم إلى فريقنا", "加入我们的团队")}
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── NEWS PAGE ─────────────────────────────────────────────────────────────────
function getNewsArticles(lang: Lang) {
  const t = makeT(lang);
  return [
    {
      title: t(
        "RAYAT Expands Manpower Services to Include Hospitality Sector",
        "رايات توسع خدمات القوى العاملة لتشمل قطاع الضيافة",
        "RAYAT 劳务服务扩展至酒店服务业",
      ),
      date: t("January 2026", "يناير 2026", "2026年1月"),
      month: t("JAN", "يناير", "1月"),
      year: "2026",
      excerpt: t(
        "RAYAT Industries SPC has officially expanded its manpower division to include dedicated hospitality and service industry placements. The move follows growing demand from Oman's hospitality sector, which is experiencing rapid growth ahead of major tourism initiatives. RAYAT will now supply hotel staff, housekeeping teams, and food service personnel to hotels and resorts across the Sultanate.",
        "وسّعت رايات للصناعات رسمياً قسم القوى العاملة لديها ليشمل توظيفاً متخصصاً في قطاع الضيافة والخدمات. جاء ذلك استجابةً للطلب المتزايد من قطاع الضيافة العُماني الذي يشهد نمواً متسارعاً. ستوفر رايات طاقم الفنادق وفرق التدبير المنزلي وموظفي خدمة الطعام للفنادق والمنتجعات.",
        "RAYAT Industries SPC 已正式将劳务业务扩展至酒店及服务行业专属岗位。此举响应了阿曼酒店业在重大旅游倡议推动下快速增长所带来的需求。RAYAT 现将向苏丹国各地的酒店和度假村供应酒店员工、客房服务团队及餐饮服务人员。",
      ),
      category: t("Company News", "أخبار الشركة", "公司新闻"),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      title: t(
        "New Partnership with South Asian Labour Agencies Announced",
        "الإعلان عن شراكة جديدة مع وكالات العمالة في جنوب آسيا",
        "宣布与南亚劳务机构建立新合作伙伴关系",
      ),
      date: t("December 2025", "ديسمبر 2025", "2025年12月"),
      month: t("DEC", "ديسمبر", "12月"),
      year: "2025",
      excerpt: t(
        "RAYAT has signed formal partnership agreements with five major recruitment agencies in India, Bangladesh, and Nepal. These partnerships will significantly expand our candidate pool and reduce placement timelines for clients requiring large-scale workforce deployments. The agreements cover all worker categories from skilled trades to domestic workers.",
        "وقّعت رايات اتفاقيات شراكة رسمية مع خمس وكالات توظيف كبرى في الهند وبنغلاديش ونيبال. ستوسع هذه الشراكات تجمع المرشحين لدينا وتقلل مواعيد التوظيف. تغطي الاتفاقيات جميع فئات العمال من المهن المهارية إلى العمالة المنزلية.",
        "RAYAT 已与印度、孟加拉国和尼泊尔的五家主要招聘机构签署正式合作协议。这些合作将大幅扩充我们的候选人储备，并缩短需要大规模人员部署的客户的招聘周期。协议涵盖从技术工种到家政人员的所有工人类别。",
      ),
      category: t("Partnerships", "الشراكات", "合作伙伴"),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      title: t(
        "RAYAT Wins Preferred Supplier Status at Major Bahrain Construction Project",
        "رايات تحصل على وضع المورد المفضل في مشروع بناء كبير",
        "RAYAT 获巴林大型建筑项目首选供应商资格",
      ),
      date: t("November 2025", "نوفمبر 2025", "2025年11月"),
      month: t("NOV", "نوفمبر", "11月"),
      year: "2025",
      excerpt: t(
        "Following a competitive tender process, RAYAT Industries SPC has been awarded preferred supplier status for a landmark infrastructure development in Oman's Northern Governorate. The multi-year supply contract covers structural steel, aggregates, and MEP materials valued at over OMR 2 million. This represents RAYAT's largest single construction supply contract to date.",
        "بعد عملية مناقصة تنافسية، مُنحت رايات للصناعات وضع المورد المفضل لتطوير بنية تحتية بارزة في المحافظة الشمالية بعُمان. يغطي عقد التوريد متعدد السنوات الفولاذ الهيكلي والركام ومواد الميكانيكا والكهرباء بقيمة تتجاوز مليوني ريال عُماني.",
        "经过竞争性招标程序，RAYAT Industries SPC 获得了阿曼北部省一项标志性基础设施开发项目的首选供应商资格。该多年期供应合同涵盖结构钢材、骨料及机电材料，合同价值超过 200 万阿曼里亚尔。这是 RAYAT 迄今为止最大的单项建筑供应合同。",
      ),
      category: t("Awards", "الجوائز", "奖项荣誉"),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      title: t(
        "Agriculture Trading Volume Grows 40% in FY2025",
        "حجم تجارة الزراعة ينمو 40٪ في السنة المالية 2025",
        "2025财年农产品贸易量增长40%",
      ),
      date: t("October 2025", "أكتوبر 2025", "2025年10月"),
      month: t("OCT", "أكتوبر", "10月"),
      year: "2025",
      excerpt: t(
        "RAYAT's agriculture and food trading division has recorded a 40% year-on-year increase in trading volume for FY2025. Growth was driven by expanded grain import programs and new contracts with Omani food manufacturers. The company plans to further invest in cold-chain logistics infrastructure to support fresh produce trading in 2026.",
        "سجّل قسم التجارة الزراعية والغذائية في رايات زيادة بنسبة 40٪ سنوياً في حجم التداول للسنة المالية 2025. وكان النمو مدفوعاً ببرامج استيراد الحبوب الموسعة وعقود جديدة مع المصنعين الغذائيين العُمانيين.",
        "RAYAT 农业与食品贸易部门在2025财年录得贸易量同比增长40%。增长动力来自扩大的谷物进口计划以及与阿曼食品制造商签订的新合同。公司计划进一步投资冷链物流基础设施，以支持2026年的生鲜农产品贸易。",
      ),
      category: t("Financial", "المالية", "财务业绩"),
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      title: t(
        "LMRA Compliance Certification Renewed for 2025–2026",
        "تجديد شهادة الامتثال لقانون العمل للفترة 2025-2026",
        "2025–2026年度劳动合规认证完成续期",
      ),
      date: t("September 2025", "سبتمبر 2025", "2025年9月"),
      month: t("SEP", "سبتمبر", "9月"),
      year: "2025",
      excerpt: t(
        "RAYAT Industries SPC has successfully renewed its Oman Labor Law compliance certification for the 2025–2026 period. This certification confirms our commitment to ethical recruitment practices, fair employment terms, and full compliance with Omani labour law — giving our clients complete confidence in every placement we make.",
        "جدّدت رايات للصناعات بنجاح شهادة الامتثال لقانون العمل العُماني للفترة 2025-2026. تؤكد هذه الشهادة التزامنا بممارسات التوظيف الأخلاقية وشروط العمل العادلة والامتثال الكامل لقانون العمل العُماني.",
        "RAYAT Industries SPC 已成功续期2025–2026年度的阿曼劳动法合规认证。该认证印证了我们恪守道德招聘实践、公平雇佣条款及全面遵守阿曼劳动法的承诺——让客户对我们每一次人员安置都充满信心。",
      ),
      category: t("Compliance", "الامتثال", "合规认证"),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
    {
      title: t(
        "Company Celebrates 10th Anniversary in Bahrain Market",
        "الشركة تحتفل بالذكرى السنوية العاشرة في السوق العُمانية",
        "公司庆祝进入阿曼市场十周年",
      ),
      date: t("August 2025", "أغسطس 2025", "2025年8月"),
      month: t("AUG", "أغسطس", "8月"),
      year: "2025",
      excerpt: t(
        "RAYAT Industries SPC marked its 10th anniversary in the Oman market with a gala dinner for clients, partners, and employees. The milestone reflects a decade of growth from a small trading enterprise to a diversified company spanning industrial supply, agriculture, logistics, and trading services. The Managing Director pledged continued investment in Oman's economic future.",
        "احتفلت رايات للصناعات بذكراها السنوية العاشرة في السوق العُمانية بحفل عشاء للعملاء والشركاء والموظفين. يعكس هذا الإنجاز عقداً من النمو من مشروع تجاري صغير إلى شركة متنوعة تمتد عبر الإمدادات الصناعية والزراعة واللوجستيات والخدمات التجارية.",
        "RAYAT Industries SPC 举办盛大晚宴款待客户、合作伙伴及员工，庆祝进入阿曼市场十周年。这一里程碑见证了公司从一家小型贸易企业成长为业务横跨工业供应、农业、物流及贸易服务的多元化企业的十年历程。董事总经理承诺将持续投资于阿曼的经济未来。",
      ),
      category: t("Milestone", "الإنجازات", "里程碑"),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
  ];
}

function NewsPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const newsArticles = getNewsArticles(lang);
  const [email, setEmail] = useState("");

  return (
    <div>
      <PageHero
        title={t("News & Updates", "الأخبار والتحديثات", "新闻与动态")}
        subtitle={t(
          "Latest announcements, milestones, and industry updates from RAYAT",
          "أحدث الإعلانات والإنجازات وتحديثات الصناعة من رايات",
          "来自 RAYAT 的最新公告、里程碑及行业动态",
        )}
        image="/assets/generated/page-news-hero.dim_1400x600.jpg"
        breadcrumb={t("News & Updates", "الأخبار والتحديثات", "新闻与动态")}
      />

      {/* News Grid */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Latest", "الأحدث", "最新动态")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Recent News & Announcements",
                "آخر الأخبار والإعلانات",
                "最新资讯与公告",
              )}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, i) => (
              <motion.article
                key={article.title}
                data-ocid={`news.article.card.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-border transition-shadow duration-300 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-brand-teal text-white rounded-lg px-3 py-2 text-center min-w-[50px]">
                        <div className="text-xs font-medium leading-none">
                          {article.month}
                        </div>
                        <div className="font-display text-lg font-bold leading-none">
                          {article.year}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${article.bg} ${article.color}`}
                    >
                      {article.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-foreground text-base leading-snug mb-3">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {article.excerpt.slice(0, 180)}…
                  </p>

                  <button
                    type="button"
                    data-ocid={`news.read_more.button.${i + 1}`}
                    className="mt-4 text-brand-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    {t("Read More", "اقرأ المزيد", "阅读更多")}{" "}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Newspaper className="text-brand-gold mx-auto mb-4" size={36} />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              {t("Stay Updated", "ابق على اطلاع", "保持关注")}
            </h3>
            <p className="text-white/75 mb-8 leading-relaxed">
              {t(
                "Subscribe to receive RAYAT news, industry updates, and market insights directly to your inbox.",
                "اشترك لتصلك أخبار رايات وتحديثات الصناعة ورؤى السوق مباشرةً إلى بريدك الإلكتروني.",
                "订阅即可将 RAYAT 的新闻、行业动态及市场洞察直接发送至您的邮箱。",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t(
                  "Enter your email address",
                  "أدخل بريدك الإلكتروني",
                  "请输入您的电子邮箱",
                )}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="news.newsletter.input"
                className="bg-white/90 border-0 flex-1 text-foreground placeholder:text-muted-foreground rounded-lg"
              />
              <button
                type="button"
                data-ocid="news.newsletter.submit_button"
                onClick={() => {
                  toast.success(
                    t(
                      "Subscribed! We'll keep you posted.",
                      "تم الاشتراك! سنبقيك على اطلاع.",
                      "订阅成功！我们会持续为您推送最新动态。",
                    ),
                  );
                  setEmail("");
                }}
                className="bg-brand-gold text-gray-900 font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                {t("Subscribe", "اشترك", "订阅")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">
            {t(
              "Want to Learn More About RAYAT?",
              "هل ترغب في معرفة المزيد عن رايات؟",
              "想进一步了解 RAYAT 吗？",
            )}
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t(
              "Explore our services, portfolio, or get in touch with our team directly.",
              "استكشف خدماتنا ومحفظتنا، أو تواصل مع فريقنا مباشرةً.",
              "浏览我们的服务与项目案例，或直接与我们的团队取得联系。",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              data-ocid="news.services_cta.secondary_button"
              onClick={() => navigate("services")}
              className="inline-flex items-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
            >
              {t("View Our Services", "استعرض خدماتنا", "查看我们的服务")}
            </button>
            <button
              type="button"
              data-ocid="news.contact_cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
            >
              {t("Contact Us", "تواصل معنا", "联系我们")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────────
function ContactForm({ lang }: { lang: Lang }) {
  const t = makeT(lang);
  //const { actor } = useActor<Backend>(createActor);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      
    },
    onSuccess: () => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success(
        t(
          "Message sent! We'll get back to you shortly.",
          "تم إرسال الرسالة! سنعود إليك قريباً.",
          "消息已发送！我们将尽快与您联系。",
        ),
      );
    },
    onError: () => {
      toast.error(
        t(
          "Failed to send your message. Please try again.",
          "تعذّر إرسال رسالتك. يرجى المحاولة مرة أخرى.",
          "发送消息失败，请重试。",
        ),
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(
        t(
          "Please fill in all fields.",
          "يرجى ملء جميع الحقول.",
          "请填写所有字段。",
        ),
      );
      return;
    }
    mutation.mutate({ name, email, message });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
      <h3 className="font-display text-xl font-bold text-foreground mb-6">
        {t("Send Us a Message", "أرسل لنا رسالة", "给我们留言")}
      </h3>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            data-ocid="contact.form.success_state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-brand-teal" size={32} />
            </div>
            <h4 className="font-display text-xl font-bold text-foreground mb-2">
              {t("Message Sent!", "تم إرسال الرسالة!", "消息已发送！")}
            </h4>
            <p className="text-muted-foreground mb-6">
              {t(
                "Thank you for reaching out. Our team will contact you shortly.",
                "شكراً للتواصل معنا. سيتصل بك فريقنا قريباً.",
                "感谢您联系我们。我们的团队将尽快与您取得联系。",
              )}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-brand-teal font-semibold hover:underline"
            >
              {t("Send another message", "إرسال رسالة أخرى", "再发一条消息")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="contact.form.panel"
          >
            <div>
              <Label
                htmlFor="contact-name"
                className="text-sm font-semibold text-foreground mb-1.5 block"
              >
                {t("Full Name", "الاسم الكامل", "姓名")}
              </Label>
              <Input
                id="contact-name"
                data-ocid="contact.name.input"
                placeholder={t("Your full name", "اسمك الكامل", "您的姓名")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-border focus:ring-brand-teal"
              />
            </div>
            <div>
              <Label
                htmlFor="contact-email"
                className="text-sm font-semibold text-foreground mb-1.5 block"
              >
                {t("Email Address", "البريد الإلكتروني", "电子邮箱")}
              </Label>
              <Input
                id="contact-email"
                data-ocid="contact.email.input"
                type="email"
                placeholder={t(
                  "you@example.com",
                  "بريدك@مثال.com",
                  "you@example.com",
                )}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border focus:ring-brand-teal"
              />
            </div>
            <div>
              <Label
                htmlFor="contact-message"
                className="text-sm font-semibold text-foreground mb-1.5 block"
              >
                {t("Message", "الرسالة", "留言")}
              </Label>
              <Textarea
                id="contact-message"
                data-ocid="contact.message.textarea"
                placeholder={t(
                  "How can we help you?",
                  "كيف يمكننا مساعدتك؟",
                  "我们能为您做些什么？",
                )}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="border-border focus:ring-brand-teal resize-none"
              />
            </div>

            {mutation.isError && (
              <p
                data-ocid="contact.form.error_state"
                className="text-red-600 text-sm"
              >
                {t(
                  "Something went wrong. Please try again.",
                  "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
                  "出现问题，请重试。",
                )}
              </p>
            )}

            <Button
              type="submit"
              data-ocid="contact.form.submit_button"
              disabled={mutation.isPending}
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-3 rounded-lg transition-colors"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="me-2 h-4 w-4 animate-spin" />
                  {t("Sending...", "جارٍ الإرسال...", "发送中…")}
                </>
              ) : (
                t("Send Message", "إرسال الرسالة", "发送消息")
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactPage({ lang }: { lang: Lang }) {
  const t = makeT(lang);
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-brand-teal">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <LogoWatermark size={240} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center py-16 pt-32 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-gold font-medium text-sm tracking-widest uppercase mb-3">
              RAYAT Industries SPC / {t("Contact", "تواصل", "联系我们")}
            </p>
            <h1 className="font-display text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-shadow-lg">
              {t("Get In Touch", "تواصل معنا", "联系我们")}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              {t(
                "We're here to help. Reach out to discuss requirements, request a quote, or simply learn more about RAYAT.",
                "نحن هنا للمساعدة. تواصل معنا لمناقشة المتطلبات أو طلب عرض أسعار أو معرفة المزيد عن رايات.",
                "我们随时为您提供帮助。欢迎联系我们，探讨需求、索取报价，或进一步了解 RAYAT。",
              )}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            aria-hidden="true"
          >
            <path d="M0 40L720 10L1440 40V40H0Z" fill="oklch(0.97 0.02 78)" />
          </svg>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm lang={lang} />
            </motion.div>

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="bg-brand-teal rounded-2xl p-8 text-white shadow-lg">
                <h3 className="font-display text-xl font-bold mb-6">
                  {t("Contact Information", "معلومات التواصل", "联系方式")}
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: MapPin,
                      label: t("Address", "العنوان", "地址"),
                      content: t(
                        "Way 4521, Building 3, Al Ghubra North, Muscat 133, Sultanate of Oman",
                        "طريق 4521، مبنى 3، الغبرة شمال، مسقط 133، سلطنة عُمان",
                        "阿曼苏丹国马斯喀特北古布拉区 4521 路 3 号楼，邮编 133",
                      ),
                      href: undefined as string | undefined,
                    },
                    {
                      icon: Mail,
                      label: t("Email", "البريد الإلكتروني", "电子邮箱"),
                      content: "info@rayatindustries.com",
                      href: "mailto:info@rayatindustries.com",
                    },
                    {
                      icon: Phone,
                      label: t("Phone", "الهاتف", "电话"),
                      content: "+968 2400 0000",
                      href: "tel:+96824000000",
                    },
                    {
                      icon: MessageCircle,
                      label: t("WhatsApp", "واتساب", "WhatsApp"),
                      content: "+968 2400 0000",
                      href: "https://wa.me/96824000000",
                    },
                    {
                      icon: Clock,
                      label: t("Office Hours", "ساعات العمل", "办公时间"),
                      content: t(
                        "Sunday–Thursday, 8:00 AM – 5:00 PM",
                        "الأحد–الخميس، 8:00 ص – 5:00 م",
                        "周日至周四，上午 8:00 – 下午 5:00",
                      ),
                      href: undefined as string | undefined,
                    },
                  ].map(({ icon: Icon, label, content, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white/70 mb-0.5">
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            data-ocid={`contact.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
                            className="text-white hover:text-brand-gold transition-colors"
                            target={
                              href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="text-white">{content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration info */}
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="text-brand-teal" size={18} />
                  {t("Company Registration", "تسجيل الشركة", "公司注册信息")}
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    {t(
                      "Registered with the Ministry of Commerce, Industry and Investment Promotion, Sultanate of Oman",
                      "مسجلة لدى وزارة التجارة والصناعة وترويج الاستثمار، سلطنة عُمان",
                      "在阿曼苏丹国商业、工业与投资促进部注册",
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      {t("CR No.:", "رقم السجل التجاري:", "商业注册号：")}
                    </span>{" "}
                    Oman CR Registration
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      {t(
                        "LMRA Licensed:",
                        "مرخص من هيئة سوق العمل:",
                        "LMRA 许可：",
                      )}
                    </span>{" "}
                    {t(
                      "Labour & Manpower Recruitment",
                      "توظيف العمالة والقوى البشرية",
                      "劳动力与人力招聘",
                    )}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden flex-1 min-h-[280px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14631.5!2d58.3700!3d23.5950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91fce5d2ae3deb%3A0x6a2a4fe88c71ee4a!2sAl+Ghubra+North%2C+Muscat%2C+Oman!5e0!3m2!1sen!2s!4v1700000000001!5m2!1sen!2s"
                  width="100%"
                  height="280"
                  className="border-0 w-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RAYAT Industries SPC Location - Al Ghubra North, Muscat, Oman"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── TRADING DIVISIONS OVERVIEW PAGE ─────────────────────────────────────────
function TradingDivisionsPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const divisions = [
    {
      title: t("Solar Division", "قسم الطاقة الشمسية", "太阳能事业部"),
      description: t(
        "Oman's trusted solar energy trading partner — solar panels, complete PV systems, energy storage, solar heating, and all components for clean energy projects.",
        "شريككم الموثوق في عُمان لتجارة الطاقة الشمسية — ألواح شمسية وأنظمة كهروضوئية متكاملة وتخزين الطاقة والتدفئة الشمسية وجميع مكونات مشاريع الطاقة النظيفة.",
        "阿曼值得信赖的太阳能贸易合作伙伴 — 太阳能板、完整光伏系统、储能、太阳能供热，以及清洁能源项目所需的所有组件。",
      ),
      image: "/assets/generated/division-solar-hero.dim_1400x600.jpg",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      page: "solar" as Page,
    },
    {
      title: t("FMCG Division", "قسم السلع الاستهلاكية", "快消品事业部"),
      description: t(
        "Supplying the Gulf's finest retail channels with food, beverages, household products, and personal care items from trusted global manufacturers.",
        "نزوّد أرقى قنوات التجزئة في الخليج بالأغذية والمشروبات والمنتجات المنزلية ومستلزمات العناية الشخصية من مُصنّعين عالميين موثوقين.",
        "为海湾地区优质零售渠道供应来自值得信赖的全球制造商的食品、饮料、家居用品及个人护理产品。",
      ),
      image: "/assets/generated/fmcg-hero.dim_1600x900.jpg",
      icon: ShoppingBag,
      color: "text-green-700",
      bg: "bg-green-50",
      page: "fmcg" as Page,
    },
    {
      title: t("Networking Division", "قسم الشبكات", "网络设备事业部"),
      description: t(
        "Delivering cutting-edge networking equipment, structured cabling, telecom hardware, and IT infrastructure solutions across the region.",
        "نوفّر أحدث معدات الشبكات والكابلات المنظمة وأجهزة الاتصالات وحلول البنية التحتية لتقنية المعلومات في جميع أنحاء المنطقة.",
        "为整个地区提供前沿的网络设备、结构化布线、电信硬件及 IT 基础设施解决方案。",
      ),
      image: "/assets/generated/division-networking-hero.dim_1400x600.jpg",
      icon: Network,
      color: "text-blue-700",
      bg: "bg-blue-50",
      page: "networking" as Page,
    },
    {
      title: t("Construction Materials", "مواد البناء", "建筑材料"),
      description: t(
        "The Raw Materials Powering Gulf Megaprojects — reinforcing steel, aluminum, copper, pipes and more for contractors and developers.",
        "المواد الخام التي تُحرّك المشاريع العملاقة في الخليج — حديد التسليح والألمنيوم والنحاس والأنابيب والمزيد للمقاولين والمطورين.",
        "驱动海湾大型项目的原材料 — 为承包商和开发商提供螺纹钢、铝材、铜材、管材等。",
      ),
      image:
        "/assets/generated/division-construction-materials-hero.dim_1400x600.jpg",
      icon: Building2,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      page: "construction-materials" as Page,
    },
    {
      title: t("Safety & PPE / Metals", "السلامة والمعادن", "安全防护与金属"),
      description: t(
        "Comprehensive construction safety & raw materials from helmet to boot, meeting EN/ANSI/OSHA standards for Gulf megaprojects.",
        "مجموعة شاملة من معدات السلامة والمواد الخام للبناء من الخوذة إلى الحذاء، تستوفي معايير EN/ANSI/OSHA للمشاريع العملاقة في الخليج.",
        "从安全帽到防护靴的全方位建筑安全与原材料，符合海湾大型项目的 EN/ANSI/OSHA 标准。",
      ),
      image: "/assets/generated/division-safety-ppe-hero.dim_1400x600.jpg",
      icon: ShieldCheck,
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
      page: "safety-ppe" as Page,
    },
    {
      title: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة", "轮胎与胶粘剂"),
      description: t(
        "Premium automotive, truck, and industrial tyres alongside high-performance adhesives, sealants, and bonding compounds for construction and manufacturing.",
        "إطارات سيارات وشاحنات وصناعية متميزة إلى جانب مواد لاصقة وعوازل ومركبات لاصقة عالية الأداء للبناء والتصنيع.",
        "优质乘用车、卡车及工业轮胎，搭配适用于建筑与制造业的高性能胶粘剂、密封剂及粘合材料。",
      ),
      image: "/assets/generated/division-tyres-adhesives-hero.dim_1400x600.jpg",
      icon: Truck,
      color: "text-slate-700",
      bg: "bg-slate-100",
      page: "tyres-adhesives" as Page,
    },
  ];

  const stats = [
    {
      value: "500+",
      label: t("Products Traded", "منتج مُتاجَر", "贸易产品种类"),
    },
    {
      value: "15+",
      label: t("Countries Served", "دولة نخدمها", "服务国家"),
    },
    {
      value: "20+",
      label: t("Years Gulf Experience", "سنوات خبرة في الخليج", "海湾从业年数"),
    },
    {
      value: "ISO",
      label: t("9001 Compliant", "متوافق مع 9001", "符合 9001 标准"),
    },
  ];

  return (
    <div>
      <PageHero
        title={t(
          "Our Trading Divisions",
          "أقسام التداول لدينا",
          "我们的贸易事业部",
        )}
        subtitle={t(
          "Trusted trading partner across FMCG, Networking & Construction Materials. Building partnerships. Delivering excellence.",
          "شريك تجاري موثوق في السلع الاستهلاكية والشبكات ومواد البناء. بناء شراكات. تحقيق التميز.",
          "值得信赖的贸易合作伙伴，业务涵盖快消品、网络与建筑材料。建立合作伙伴关系，追求卓越品质。",
        )}
        image="/assets/generated/trading-divisions-overview.dim_1400x600.jpg"
        breadcrumb={t("Trading Divisions", "أقسام التداول", "贸易事业部")}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
              {t(
                "About Our Trading Operations",
                "عن عملياتنا التجارية",
                "关于我们的贸易业务",
              )}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t(
                "Delivering Excellence in Every Trade",
                "نحقق التميز في كل صفقة",
                "在每一笔贸易中追求卓越",
              )}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
              {t(
                "RAYAT Industries SPC is a diversified trading conglomerate with deep roots in the Gulf region. Founded with the vision of bridging global markets with local expertise, we have grown to become a trusted name across Solar Energy, FMCG (Seafood & Poultry), Networking infrastructure, and Construction materials.",
                "رايات للصناعات ش.ش.ف هي مجموعة تجارية متنوعة ذات جذور عميقة في منطقة الخليج. تأسست برؤية ربط الأسواق العالمية بالخبرة المحلية، وقد أصبحنا اسماً موثوقاً في الطاقة الشمسية والسلع الاستهلاكية (المأكولات البحرية والدواجن) والبنية التحتية للشبكات ومواد البناء.",
                "RAYAT Industries SPC 是一家业务多元化的贸易集团，在海湾地区根基深厚。我们以连接全球市场与本地专业经验的愿景创立，如今已在太阳能、快消品（海产与禽类）、网络基础设施及建筑材料领域成为值得信赖的品牌。",
              )}
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t(
                "Founded in Oman with a vision to reshape Gulf commerce. Building trusted partnerships across the Gulf since 2004, our trading divisions serve hypermarkets, data centers, mega construction projects, and industrial facilities with uncompromising quality and reliability.",
                "تأسست في عُمان برؤية إعادة تشكيل التجارة في الخليج. ومنذ عام 2004 نبني شراكات موثوقة في جميع أنحاء الخليج، حيث تخدم أقسامنا التجارية الأسواق الكبرى ومراكز البيانات ومشاريع البناء العملاقة والمرافق الصناعية بجودة وموثوقية لا تقبل المساومة.",
                "我们创立于阿曼，怀揣重塑海湾商业格局的愿景。自 2004 年起在海湾各国建立值得信赖的合作伙伴关系，我们的贸易事业部以毫不妥协的品质与可靠性服务于大型超市、数据中心、大型建筑项目及工业设施。",
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                data-ocid={`trading_divisions.stat.card.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-sand rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-teal mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Division Cards */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Our Divisions", "أقسامنا", "我们的事业部")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Explore Our Trading Divisions",
                "استكشف أقسامنا التجارية",
                "探索我们的贸易事业部",
              )}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              return (
                <motion.button
                  type="button"
                  key={div.title}
                  data-ocid={`trading_divisions.card.${i + 1}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(div.page)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-border transition-all duration-300 text-left w-full cursor-pointer"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                        <Icon size={14} />
                        {div.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div
                      className={`inline-flex items-center gap-2 ${div.bg} ${div.color} rounded-lg px-3 py-1.5 mb-3`}
                    >
                      <Icon size={16} />
                      <span className="text-xs font-semibold">
                        {t("Trading Division", "قسم تجاري", "贸易事业部")}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-xl mb-3 leading-snug">
                      {div.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {div.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-brand-teal font-semibold text-sm group-hover:gap-2.5 transition-all">
                      {t("Explore Division", "استكشف القسم", "探索事业部")}{" "}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {t(
              "Ready to Partner with RAYAT Trading?",
              "هل أنت مستعد للشراكة مع رايات للتجارة؟",
              "准备好与 RAYAT 贸易合作了吗？",
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Contact our trading team to discuss product availability, pricing, and partnership opportunities across our four divisions.",
              "تواصل مع فريقنا التجاري لمناقشة توافر المنتجات والأسعار وفرص الشراكة عبر أقسامنا الأربعة.",
              "联系我们的贸易团队，探讨产品供应、价格及我们四大事业部的合作机会。",
            )}
          </p>
          <button
            type="button"
            data-ocid="trading_divisions.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t(
              "Contact Our Trading Team",
              "تواصل مع فريقنا التجاري",
              "联系我们的贸易团队",
            )}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── FMCG DIVISION PAGE ────────────────────────────────────────────────────────
function FMCGPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const productCategories = [
    {
      icon: Star,
      title: t("Seafood & Poultry", "المأكولات البحرية والدواجن", "海鲜与禽类"),
      desc: t(
        "Premium fresh and frozen seafood: Shrimp, Tuna, Salmon, Mackerel, Squid, Cuttlefish, Mussels, Clams. Plus Poultry: Whole Chicken (1000g, 800g, 1100g sizes), Eggs.",
        "مأكولات بحرية طازجة ومجمدة متميزة: روبيان، تونة، سلمون، ماكريل، حبار، سبيط، بلح البحر، حلزون البحر. بالإضافة إلى الدواجن: دجاج كامل (أحجام 1000 جرام، 800 جرام، 1100 جرام)، بيض.",
        "优质新鲜与冷冻海鲜：虾、金枪鱼、三文鱼、鲭鱼、鱿鱼、墨鱼、贻贝、蛤蜊。另有禽类：整鸡（1000克、800克、1100克规格）、鸡蛋。",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Wheat,
      title: t("Food & Staples", "الأغذية والمواد الأساسية", "食品与主食"),
      desc: t(
        "Rice, flour, sugar, cooking oils, pulses, spices, canned goods, and dry staples from global suppliers.",
        "أرز ودقيق وسكر وزيوت طهي وبقوليات وتوابل ومعلبات ومواد أساسية جافة من موردين عالميين.",
        "大米、面粉、糖、食用油、豆类、香料、罐头食品及干货主食，均来自全球供应商。",
      ),
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      icon: Package,
      title: t("Beverages", "المشروبات", "饮料"),
      desc: t(
        "Juices, water, soft drinks, energy drinks, tea, coffee, and dairy beverages for retail and hospitality.",
        "عصائر ومياه ومشروبات غازية ومشروبات الطاقة والشاي والقهوة ومشروبات الألبان للبيع بالتجزئة والضيافة.",
        "果汁、水、碳酸饮料、能量饮料、茶、咖啡及乳制品饮料，面向零售与酒店餐饮业。",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Zap,
      title: t("Household Cleaning", "منظفات المنزل", "家居清洁"),
      desc: t(
        "Detergents, fabric softeners, multi-surface cleaners, dishwashing products, and hygiene solutions.",
        "منظفات ومنعمات الأقمشة ومنظفات متعددة الأسطح ومنتجات غسل الأطباق وحلول النظافة الشخصية.",
        "洗衣剂、织物柔顺剂、多表面清洁剂、洗碗产品及卫生清洁解决方案。",
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Heart,
      title: t("Personal Care", "العناية الشخصية", "个人护理"),
      desc: t(
        "Shampoos, conditioners, body wash, skincare, oral care, and grooming products for all demographics.",
        "شامبو وبلسم وغسول الجسم والعناية بالبشرة والعناية بالفم ومنتجات العناية لجميع الفئات.",
        "洗发水、护发素、沐浴露、护肤品、口腔护理及美容理容产品，适合各类人群。",
      ),
      color: "text-pink-700",
      bg: "bg-pink-50",
    },
    {
      icon: Star,
      title: t(
        "Snacks & Confectionery",
        "الوجبات الخفيفة والحلويات",
        "零食与糖果",
      ),
      desc: t(
        "Snacks, confectionery, frozen foods, dairy products, and impulse purchase categories.",
        "وجبات خفيفة وحلويات وأطعمة مجمدة ومنتجات الألبان وفئات الشراء العفوي.",
        "零食、糖果、冷冻食品、乳制品及冲动消费品类。",
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Users,
      title: t("Baby & Infant", "الأطفال والرضع", "婴幼儿用品"),
      desc: t(
        "Baby food, diapers, wipes, lotions, powders, and feeding accessories for infant care.",
        "أطعمة الأطفال وحفاضات ومناديل مبللة وكريمات وبودرة وملحقات التغذية للعناية بالرضع.",
        "婴儿食品、纸尿裤、湿巾、乳液、爽身粉及喂养用品，满足婴幼儿护理需求。",
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  const whoWeServe = [
    {
      title: t(
        "Hypermarkets & Supermarkets",
        "الأسواق الكبرى والسوبرماركت",
        "大型超市与超级市场",
      ),
      icon: ShoppingBag,
    },
    {
      title: t("Hotels & Hospitality", "الفنادق والضيافة", "酒店与餐饮业"),
      icon: Hotel,
    },
    {
      title: t("Institutional Buyers", "المشترون المؤسسيون", "机构采购方"),
      icon: Briefcase,
    },
    {
      title: t("Convenience Stores", "متاجر الراحة", "便利店"),
      icon: Package,
    },
  ];

  return (
    <div>
      <PageHero
        title={t("FMCG Division", "قسم السلع الاستهلاكية", "快消品事业部")}
        subtitle={t(
          "Gulf's Trusted FMCG Trading Partner — Food, Beverages, Household & Personal Care",
          "شريك تجاري موثوق للسلع الاستهلاكية في الخليج — الغذاء والمشروبات والمنزل والعناية الشخصية",
          "海湾地区值得信赖的快消品贸易合作伙伴 — 食品、饮料、家居与个人护理",
        )}
        image="/assets/generated/fmcg-hero.dim_1600x900.jpg"
        breadcrumb={t("FMCG Division", "قسم السلع الاستهلاكية", "快消品事业部")}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                {t("Division Overview", "نظرة عامة على القسم", "事业部概述")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Your Gulf FMCG Supply Partner",
                  "شريكك لتوريد السلع الاستهلاكية في الخليج",
                  "您在海湾地区的快消品供应合作伙伴",
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "Our FMCG division has built an extensive network of trusted manufacturers and distribution partners across the Gulf. We supply food, beverages, household cleaning products, and personal care items to hypermarkets, supermarkets, hotels, and institutional buyers. Our portfolio spans premium international brands and competitive value offerings.",
                  "قسمنا للسلع الاستهلاكية بنى شبكة واسعة من المصنعين الموثوقين وشركاء التوزيع في جميع أنحاء الخليج. نحن نوفر الأغذية والمشروبات ومنتجات تنظيف المنزل ومواد العناية الشخصية للأسواق الكبرى والسوبرماركت والفنادق والمشترون المؤسسيون. تشمل محفظتنا العلامات التجارية الدولية المتميزة والعروض التنافسية القيمة.",
                  "我们的快消品事业部在海湾地区建立了由值得信赖的制造商和分销合作伙伴组成的广泛网络。我们向大型超市、超级市场、酒店及机构采购方供应食品、饮料、家居清洁用品及个人护理产品。我们的产品组合涵盖优质国际品牌和具竞争力的实惠产品。",
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From staple foods to premium personal care, we curate product ranges that meet the diverse demands of the Gulf's multicultural consumer base. Our logistics network ensures on-time delivery to 12+ countries across the MENA region.",
                  "من الأغذية الأساسية إلى العناية الشخصية المتميزة، نقوم بانتقاء مجموعات المنتجات التي تلبي الاحتياجات المتنوعة لقاعدة المستهلكين متعددي الثقافات في الخليج. تضمن شبكتنا اللوجستية التسليم في الوقت المحدد إلى أكثر من 12 دولة في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا.",
                  "从主食食品到高端个人护理，我们精心挑选产品组合，满足海湾地区多元文化消费群体的多样化需求。我们的物流网络确保准时送达中东及北非地区12个以上国家。",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="fmcg.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("FMCG Enquiry", "استفسار السلع الاستهلاكية", "快消品咨询")}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="fmcg.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام", "全部事业部")}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/fmcg-section.dim_1200x800.jpg"
                  alt="Fresh Seafood and Poultry Products"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-2xl font-extrabold">12+</div>
                <div className="text-xs opacity-80">
                  {t(
                    "MENA Countries",
                    "دول الشرق الأوسط وشمال أفريقيا",
                    "中东及北非国家",
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seafood & Poultry Featured Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Featured Sector", "القطاع المميز", "特色领域")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Seafood & Poultry",
                "المأكولات البحرية والدواجن",
                "海鲜与禽类",
              )}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              {t(
                "Our major focus area — supplying premium quality seafood and poultry products across Oman and the Gulf.",
                "مجال تركيزنا الرئيسي — توريد منتجات المأكولات البحرية والدواجن عالية الجودة في جميع أنحاء عُمان والخليج.",
                "我们的重点业务领域——向阿曼及海湾地区供应优质海鲜与禽类产品。",
              )}
            </p>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seafood */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-sand rounded-2xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Star size={20} className="text-blue-700" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl">
                  {t("Seafood", "المأكولات البحرية", "海鲜")}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  t("Shrimp", "روبيان", "虾"),
                  t("Tuna", "تونة", "金枪鱼"),
                  t("Salmon", "سلمون", "三文鱼"),
                  t("Mackerel", "ماكريل", "鲭鱼"),
                  t("Squid", "حبار", "鱿鱼"),
                  t("Cuttlefish", "سبيط", "墨鱼"),
                  t("Mussels", "بلح البحر", "贻贝"),
                  t("Clams", "حلزون البحر", "蛤蜊"),
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    <BadgeCheck size={13} /> {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Poultry */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-sand rounded-2xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Wheat size={20} className="text-amber-700" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl">
                  {t("Poultry", "الدواجن", "禽类")}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  t("Chicken — 800g", "دجاج — 800 جرام", "整鸡 — 800克"),
                  t("Chicken — 1000g", "دجاج — 1000 جرام", "整鸡 — 1000克"),
                  t("Chicken — 1100g", "دجاج — 1100 جرام", "整鸡 — 1100克"),
                  t("Eggs", "بيض", "鸡蛋"),
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    <BadgeCheck size={13} /> {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/assets/generated/fmcg-section.dim_1200x800.jpg"
              alt="Seafood and Poultry Products"
              className="w-full object-cover max-h-64"
            />
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("What We Supply", "ما نقدمه", "我们的供应")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Product Categories", "فئات المنتجات", "产品类别")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  data-ocid={`fmcg.category.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${cat.bg} ${cat.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 md:py-20 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Our Clients", "عملاؤنا", "我们的客户")}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {t("Who We Serve", "من نخدم", "我们服务对象")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {whoWeServe.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  data-ocid={`fmcg.client.card.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-border text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal mb-3 mx-auto">
                    <Icon size={18} />
                  </div>
                  <p className="font-semibold text-foreground text-sm leading-snug">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why RAYAT FMCG */}
      <section className="py-14 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              {t(
                "Why RAYAT FMCG?",
                "لماذا رايات للسلع الاستهلاكية؟",
                "为何选择 RAYAT 快消品？",
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                t(
                  "15+ years building an extensive portfolio of trusted international and regional manufacturers",
                  "أكثر من 15 عاماً في بناء محفظة واسعة من المصنعين الدوليين والإقليميين الموثوقين",
                  "15年以上积累，建立由值得信赖的国际与区域制造商组成的广泛产品组合",
                ),
                t(
                  "We bridge the gap between global producers and Gulf consumers with efficiency, speed, and uncompromising quality control",
                  "نسد الفجوة بين المنتجين العالميين والمستهلكين في الخليج بالكفاءة والسرعة ومراقبة الجودة التي لا تقبل المساومة",
                  "我们以高效、快速和毫不妥协的品质管控，连接全球生产商与海湾消费者",
                ),
                t(
                  "Direct relationships with mills and manufacturers ensure competitive pricing and consistent supply",
                  "العلاقات المباشرة مع المطاحن والمصنعين تضمن أسعاراً تنافسية وإمداداً مستمراً",
                  "与工厂和制造商的直接合作关系确保价格竞争力与稳定供应",
                ),
                t(
                  "Full logistics support with on-time delivery to 12+ MENA countries",
                  "دعم لوجستي كامل مع التسليم في الوقت المحدد إلى أكثر من 12 دولة في الشرق الأوسط وشمال أفريقيا",
                  "全方位物流支持，准时送达中东及北非地区12个以上国家",
                ),
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-left bg-white/10 rounded-xl p-4 border border-white/15"
                >
                  <BadgeCheck
                    className="text-brand-gold flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-white/90 text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-white/75 mb-6 text-base">
              {t(
                "Contact our FMCG team for product catalogues, pricing, and availability.",
                "تواصل مع فريق السلع الاستهلاكية لدينا للحصول على كتالوجات المنتجات والأسعار والتوافر.",
                "请联系我们的快消品团队，获取产品目录、报价及库存信息。",
              )}
            </p>
            <button
              type="button"
              data-ocid="fmcg.enquiry.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              {t("FMCG Enquiry", "استفسار السلع الاستهلاكية", "快消品咨询")}{" "}
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── NETWORKING DIVISION PAGE ──────────────────────────────────────────────────
function NetworkingPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const productLines = [
    {
      icon: Server,
      title: t("Network Switches", "مفاتيح الشبكة", "网络交换机"),
      desc: t(
        "Layer 2 & Layer 3 managed switches from enterprise-grade manufacturers for data center and campus deployments.",
        "مفاتيح شبكة مُدارة من الطبقة 2 والطبقة 3 من مصنعين بمستوى المؤسسات لنشر مراكز البيانات والحرم الجامعي.",
        "来自企业级制造商的二层与三层托管交换机，适用于数据中心和园区部署。",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Layers,
      title: t("Structured Cabling", "الكابلات المنظمة", "综合布线"),
      desc: t(
        "Cat6, Cat6A, Cat8 cables, patch panels, keystone jacks, cabinets, and complete structured cabling systems.",
        "كابلات Cat6 وCat6A وCat8 ولوحات التوصيل ومقابس كيستون والخزائن وأنظمة الكابلات المنظمة الكاملة.",
        "Cat6、Cat6A、Cat8 网线、配线架、信息模块、机柜及完整的综合布线系统。",
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Zap,
      title: t("Fiber Optics", "الألياف البصرية", "光纤"),
      desc: t(
        "Single-mode and multi-mode fiber optic cables, transceivers, media converters, and fiber distribution systems.",
        "كابلات الألياف البصرية أحادية الوضع ومتعددة الأوضاع والمستقبلات والمحولات وأنظمة توزيع الألياف.",
        "单模与多模光纤光缆、光收发器、媒体转换器及光纤分配系统。",
      ),
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      icon: Wifi,
      title: t("Wireless / Wi-Fi", "اللاسلكي / واي فاي", "无线 / Wi-Fi"),
      desc: t(
        "Indoor and outdoor Wi-Fi 6 & Wi-Fi 6E access points for high-density enterprise and industrial environments.",
        "نقاط وصول Wi-Fi 6 وWi-Fi 6E داخلية وخارجية للبيئات المؤسسية والصناعية عالية الكثافة.",
        "适用于高密度企业与工业环境的室内外 Wi-Fi 6 与 Wi-Fi 6E 无线接入点。",
      ),
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      icon: ShieldCheck,
      title: t("Network Security", "أمن الشبكات", "网络安全"),
      desc: t(
        "Firewalls, UTM appliances, VPN concentrators, and network access control systems for enterprise security.",
        "جدران الحماية وأجهزة UTM ومركزات VPN وأنظمة التحكم في الوصول إلى الشبكة لأمن المؤسسات.",
        "防火墙、统一威胁管理（UTM）设备、VPN 集中器及网络访问控制系统，保障企业安全。",
      ),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
    {
      icon: Phone,
      title: t(
        "IP Telephony / VoIP",
        "الاتصالات الهاتفية IP / الصوت عبر IP",
        "IP 电话 / VoIP",
      ),
      desc: t(
        "IP PBX systems, VoIP phones, DECT handsets, and unified communications infrastructure for businesses.",
        "أنظمة IP PBX وهواتف VoIP وهواتف DECT والبنية التحتية للاتصالات الموحدة للشركات.",
        "IP PBX 系统、VoIP 电话、DECT 无线话机及企业统一通信基础设施。",
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  const whoWeServe = [
    { title: t("Data Centers", "مراكز البيانات", "数据中心"), icon: Server },
    {
      title: t("Banking & Finance", "البنوك والتمويل", "银行与金融"),
      icon: Briefcase,
    },
    {
      title: t("IT & Telecom", "تكنولوجيا المعلومات والاتصالات", "IT 与电信"),
      icon: Network,
    },
    {
      title: t("Hotels & Hospitality", "الفنادق والضيافة", "酒店与餐饮业"),
      icon: Hotel,
    },
    {
      title: t(
        "Infrastructure Solutions",
        "حلول البنية التحتية",
        "基础设施解决方案",
      ),
      icon: Layers,
    },
  ];

  return (
    <div>
      <PageHero
        title={t("Networking Division", "قسم الشبكات", "网络事业部")}
        subtitle={t(
          "Delivering cutting-edge IT & telecom infrastructure solutions across the Gulf",
          "تقديم حلول البنية التحتية لتكنولوجيا المعلومات والاتصالات المتطورة عبر الخليج",
          "为海湾地区提供前沿的 IT 与电信基础设施解决方案",
        )}
        image="/assets/generated/division-networking-hero.dim_1400x600.jpg"
        breadcrumb={t("Networking Division", "قسم الشبكات", "网络事业部")}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                {t("Division Overview", "نظرة عامة على القسم", "事业部概述")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Gulf's Digital Infrastructure Partner",
                  "شريك البنية التحتية الرقمية للخليج",
                  "海湾地区的数字基础设施合作伙伴",
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "As the Gulf's digital infrastructure rapidly expands, RAYAT's Networking division has become a key supplier of networking equipment, structured cabling solutions, telecom hardware, and IT infrastructure components. We serve systems integrators, telecom providers, and large enterprise clients with reliable, high-quality products.",
                  "مع التوسع السريع للبنية التحتية الرقمية في الخليج، أصبح قسم الشبكات في رايات مورداً رئيسياً لمعدات الشبكات وحلول الكابلات المنظمة ومعدات الاتصالات ومكونات البنية التحتية لتكنولوجيا المعلومات. نخدم مدمجي الأنظمة ومزودي الاتصالات وعملاء المؤسسات الكبار بمنتجات موثوقة وعالية الجودة.",
                  "随着海湾地区数字基础设施的快速扩张，RAYAT 网络事业部已成为网络设备、综合布线解决方案、电信硬件及 IT 基础设施组件的关键供应商。我们以可靠、高品质的产品服务于系统集成商、电信运营商及大型企业客户。",
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From structured cabling for greenfield developments to fiber optic solutions for carrier-grade networks, we offer a comprehensive portfolio of products backed by technical expertise and reliable after-sale support.",
                  "من الكابلات المنظمة للتطوير الجديد إلى حلول الألياف البصرية للشبكات بمستوى شركات الاتصالات، نقدم محفظة شاملة من المنتجات مدعومة بالخبرة الفنية ودعم ما بعد البيع الموثوق.",
                  "从新建项目的综合布线到运营商级网络的光纤解决方案，我们提供全面的产品组合，并以专业技术能力和可靠的售后支持为后盾。",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="networking.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t(
                    "Get Technical Support",
                    "احصل على الدعم الفني",
                    "获取技术支持",
                  )}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="networking.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام", "全部事业部")}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-networking-hero.dim_1400x600.jpg"
                  alt="Networking Infrastructure"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-2xl font-extrabold">ISO</div>
                <div className="text-xs opacity-80">
                  {t("9001 Certified", "9001 معتمد", "9001 认证")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Our Products", "منتجاتنا", "我们的产品")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Product Lines", "خطوط المنتجات", "产品线")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productLines.map((prod, i) => {
              const Icon = prod.icon;
              return (
                <motion.div
                  key={prod.title}
                  data-ocid={`networking.product.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${prod.bg} ${prod.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {prod.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 md:py-20 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Our Clients", "عملاؤنا", "我们的客户")}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {t("Who We Serve", "من نخدم", "我们服务对象")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {whoWeServe.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  data-ocid={`networking.client.card.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-border text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-700 mb-3 mx-auto">
                    <Icon size={18} />
                  </div>
                  <p className="font-semibold text-foreground text-sm leading-snug">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-10 bg-white border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              t("ISO 9001 Compliant", "متوافق مع ISO 9001", "ISO 9001 合规"),
              t("EN / ANSI / OSHA", "EN / ANSI / OSHA", "EN / ANSI / OSHA"),
              t(
                "Mill-Certified Products",
                "منتجات معتمدة من المصنع",
                "工厂认证产品",
              ),
              t(
                "Cross-Industry Expertise",
                "خبرة عبر الصناعات",
                "跨行业专业能力",
              ),
            ].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal-dark font-semibold text-sm px-4 py-2 rounded-full border border-brand-teal/20"
              >
                <BadgeCheck size={15} className="text-brand-teal" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {t(
              "Looking for Networking Solutions?",
              "تبحث عن حلول الشبكات؟",
              "正在寻找网络解决方案？",
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Connect with our technical team for product specifications, availability, and project support.",
              "تواصل مع فريقنا الفني للحصول على مواصفات المنتجات والتوافر ودعم المشاريع.",
              "联系我们的技术团队，获取产品规格、库存信息及项目支持。",
            )}
          </p>
          <button
            type="button"
            data-ocid="networking.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Get Technical Support", "احصل على الدعم الفني", "获取技术支持")}{" "}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── CONSTRUCTION MATERIALS PAGE ───────────────────────────────────────────────
function ConstructionMaterialsPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const materials = [
    {
      title: t("Steel Products", "منتجات الصلب", "钢材产品"),
      items: [
        t(
          "Deformed steel rebar (Grade 60/75), welded wire mesh, and reinforcing accessories for concrete structures.",
          "حديد تسليح مجدول (درجة 60/75)، شبكة لحام بالأسلاك، وملحقات تسليح للهياكل الخرسانية.",
          "螺纹钢筋（60/75级）、焊接钢丝网及混凝土结构用加固配件。",
        ),
        t(
          "Structural steel, steel beams, H-beams, angle iron, flat bars, and steel plates for construction projects.",
          "صلب إنشائي، عوارض فولاذية، عوارض H، زوايا حديدية، قضبان مسطحة، وألواح فولاذية لمشاريع البناء.",
          "建筑项目用结构钢、钢梁、H型钢、角钢、扁钢及钢板。",
        ),
      ],
      icon: Layers,
      color: "text-gray-700",
      bg: "bg-gray-100",
    },
    {
      title: t("Aluminum Profiles", "أقسام الألومنيوم", "铝型材"),
      items: [
        t(
          "Extruded aluminum sections, aluminum sheet, roofing, cladding, and architectural aluminum systems.",
          "أقسام ألومنيوم بثق، صفائح ألومنيوم، أسقف، كسوات، وأنظمة ألومنيوم معمارية.",
          "挤压铝型材、铝板、屋面、包层及建筑铝系统。",
        ),
      ],
      icon: Building2,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      title: t("Copper & Wire", "النحاس والأسلاك", "铜材与线材"),
      items: [
        t(
          "Copper rods, copper sheets, electrical copper wire, bare copper conductors, and copper tubes.",
          "قضبان نحاس، صفائح نحاس، أسلاك نحاسية كهربائية، موصلات نحاسية عارية، وأنابيب نحاسية.",
          "铜棒、铜板、电气铜线、裸铜导体及铜管。",
        ),
      ],
      icon: Zap,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      title: t("Pipes & Fittings", "الأنابيب والوصلات", "管材与管件"),
      items: [
        t(
          "GI pipes, HDPE pipes, PVC pipes, copper pipes, and complete pipe fittings for plumbing and HVAC.",
          "أنابيب مجلفنة، أنابيب HDPE، أنابيب PVC، أنابيب نحاسية، ووصلات أنابيب كاملة للسباكة وأنظمة التكييف.",
          "镀锌管、HDPE管、PVC管、铜管及完整的管道配件，适用于管道与暖通空调系统。",
        ),
      ],
      icon: Globe,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      title: t("Cement & Masonry", "الأسمنت والبناء", "水泥与砌体"),
      items: [
        t(
          "Portland cement, gypsum boards, insulation panels, concrete blocks, and masonry products.",
          "أسمنت بورتلاند، ألواح جبسية، ألواح عازلة، كتل خرسانية، ومنتجات البناء.",
          "硅酸盐水泥、石膏板、保温板、混凝土砌块及砌体产品。",
        ),
      ],
      icon: Package,
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
  ];

  return (
    <div>
      <PageHero
        title={t("Construction Materials", "مواد البناء", "建筑材料")}
        subtitle={t(
          "The Raw Materials Powering Gulf Megaprojects — Steel, Aluminum, Copper & More",
          "المواد الخام التي تُشغّل مشاريع الخليج الكبرى — الصلب والألومنيوم والنحاس وأكثر",
          "驱动海湾大型项目的原材料——钢材、铝材、铜材及更多",
        )}
        image="/assets/generated/division-construction-materials-hero.dim_1400x600.jpg"
        breadcrumb={t("Construction Materials", "مواد البناء", "建筑材料")}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                {t("Division Overview", "نظرة عامة على القسم", "事业部概览")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Fueling the Gulf's Construction Boom",
                  "نُشغّل طفرة البناء في الخليج",
                  "助力海湾建筑热潮",
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "Fueling the Gulf's construction boom, our Construction Materials division provides everything from Safety & PPE equipment to metals and raw materials. With active Gulf megaprojects driving unprecedented demand, we supply contractors, developers, and project managers with the materials they need to build safely and efficiently.",
                  "نُشغّل طفرة البناء في الخليج، ويوفر قسم مواد البناء لدينا كل شيء من معدات السلامة والوقاية إلى المعادن والمواد الخام. ومع قيادة مشاريع الخليج الكبرى لطلب غير مسبوق، نُزوّد المقاولين والمطورين ومديري المشاريع بالمواد التي يحتاجونها للبناء بأمان وكفاءة.",
                  "助力海湾建筑热潮，我们的建筑材料事业部提供从安全防护装备到金属及原材料的全方位供应。随着海湾大型项目带来前所未有的需求，我们为承包商、开发商和项目经理提供安全高效施工所需的材料。",
                )}
              </p>
              <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-xl p-4 mb-8">
                <p className="text-brand-teal-dark font-semibold text-sm">
                  {t("Supplying", "نُزوّد", "供应")}{" "}
                  <span className="text-brand-teal font-bold">
                    {t(
                      "Active Project Sites",
                      "مواقع المشاريع النشطة",
                      "在建项目现场",
                    )}
                  </span>{" "}
                  {t("Across the Gulf", "في جميع أنحاء الخليج", "遍布海湾地区")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="construction.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Request a Quote", "اطلب عرض سعر", "索取报价")}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="construction.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام", "全部事业部")}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-metals-materials.dim_800x600.jpg"
                  alt={t("Construction Materials", "مواد البناء", "建筑材料")}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">
                  Grade 60/75
                </div>
                <div className="text-xs opacity-80">
                  {t("Certified Rebar", "حديد تسليح معتمد", "认证钢筋")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Material Types */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("What We Supply", "ما نُزوّده", "我们的供应")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Material Types", "أنواع المواد", "材料类型")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((mat, i) => {
              const Icon = mat.icon;
              return (
                <motion.div
                  key={mat.title}
                  data-ocid={`construction.material.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${mat.bg} ${mat.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-3">
                    {mat.title}
                  </h3>
                  <ul className="space-y-2">
                    {mat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed"
                      >
                        <BadgeCheck
                          size={14}
                          className="text-brand-teal flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-10 bg-brand-sand border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">
            {t(
              "Standards & Certifications",
              "المعايير والشهادات",
              "标准与认证",
            )}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              t(
                "Mill-Certified Materials",
                "مواد معتمدة من المصنع",
                "工厂认证材料",
              ),
              t("Grade 60/75 Rebar", "حديد تسليح درجة 60/75", "60/75级钢筋"),
              t("ISO 9001 Compliant", "متوافق مع ISO 9001", "符合 ISO 9001"),
              t("EN & ANSI Standards", "معايير EN و ANSI", "EN 与 ANSI 标准"),
            ].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal-dark font-semibold text-sm px-4 py-2 rounded-full border border-brand-teal/20"
              >
                <BadgeCheck size={15} className="text-brand-teal" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {t(
              "Ready to Supply Your Project?",
              "هل أنت مستعد لتزويد مشروعك؟",
              "准备好为您的项目供货了吗？",
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Get quotes, request samples, or discuss large-scale project requirements with our team.",
              "احصل على عروض أسعار، اطلب عينات، أو ناقش متطلبات المشاريع واسعة النطاق مع فريقنا.",
              "获取报价、索取样品，或与我们的团队讨论大型项目需求。",
            )}
          </p>
          <button
            type="button"
            data-ocid="construction.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Request a Quote", "اطلب عرض سعر", "索取报价")}{" "}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── SAFETY & PPE / METALS PAGE ────────────────────────────────────────────────
function SafetyPPEPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const ppeCategories = [
    {
      icon: HardHat,
      title: t("Head Protection", "حماية الرأس", "头部防护"),
      desc: t(
        "Safety helmets, hard hats, bump caps, and head protection systems meeting EN 397 and ANSI Z89 standards.",
        "خوذات سلامة، خوذ صلبة، قبعات واقية، وأنظمة حماية الرأس تلبي معايير EN 397 و ANSI Z89.",
        "安全帽、硬帽、防撞帽及符合 EN 397 和 ANSI Z89 标准的头部防护系统。",
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Eye,
      title: t("Eye & Face Protection", "حماية العين والوجه", "眼面部防护"),
      desc: t(
        "Safety glasses, goggles, face shields, welding masks, and complete eye protection solutions.",
        "نظارات سلامة، نظارات واقية، واقيات وجه، أقنعة لحام، وحلول كاملة لحماية العين.",
        "安全眼镜、护目镜、面罩、焊接面罩及全套眼部防护解决方案。",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: ShieldCheck,
      title: t("Hand Protection", "حماية اليدين", "手部防护"),
      desc: t(
        "Safety gloves — cut-resistant, chemical-resistant, welding, and general purpose work gloves.",
        "قفازات سلامة — مقاومة للقطع، مقاومة للمواد الكيميائية، للحام، وقفازات عمل للأغراض العامة.",
        "安全手套——防切割、耐化学、焊接及通用作业手套。",
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Star,
      title: t("Hearing Protection", "حماية السمع", "听力防护"),
      desc: t(
        "Ear plugs, ear muffs, communication headsets, and hearing conservation solutions for noisy environments.",
        "سدادات أذن، واقيات أذن، سماعات اتصال، وحلول حفظ السمع للبيئات الصاخبة.",
        "耳塞、耳罩、通讯耳机及适用于嘈杂环境的听力保护方案。",
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      icon: Wind,
      title: t("Respiratory Protection", "حماية الجهاز التنفسي", "呼吸防护"),
      desc: t(
        "Dust masks, half-face respirators, full-face respirators, and self-contained breathing apparatus.",
        "أقنعة غبار، أقنعة نصفية، أقنعة كاملة، وأجهزة تنفس ذاتية.",
        "防尘口罩、半面罩呼吸器、全面罩呼吸器及自给式呼吸设备。",
      ),
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      icon: Layers,
      title: t("Fall Protection", "الحماية من السقوط", "坠落防护"),
      desc: t(
        "Safety harnesses, lanyards, self-retracting lifelines, and complete fall arrest systems.",
        "أحزمة سلامة، أحبال، خطوط حياة ذاتية الانكماش، وأنظمة كاملة لإيقاف السقوط.",
        "安全带、安全绳、自缩式生命线及完整的坠落制动系统。",
      ),
      color: "text-red-700",
      bg: "bg-red-50",
    },
    {
      icon: Package,
      title: t("Safety Footwear", "أحذية السلامة", "安全鞋"),
      desc: t(
        "Steel-toed boots, composite toe shoes, anti-puncture footwear, and chemical-resistant footwear.",
        "أحذية بقبضة فولاذية، أحذية بقبضة مركبة، أحذية مضادة للثقب، وأحذية مقاومة للمواد الكيميائية.",
        "钢头靴、复合头鞋、防刺穿鞋及耐化学鞋。",
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Zap,
      title: t("High-Visibility Vests", "سترات عالية الوضوح", "高可视反光背心"),
      desc: t(
        "Class 2 & Class 3 hi-vis vests, reflective jackets, and safety workwear for all site conditions.",
        "سترات عالية الوضوح من الفئة 2 و 3، سترات عاكسة، وملابس عمل سلامة لجميع ظروف الموقع.",
        "2级和3级高可视背心、反光夹克及适用于各种现场条件的安全工作服。",
      ),
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div>
      <PageHero
        title={t(
          "Safety & PPE / Metals & Raw Materials",
          "السلامة ومعدات الوقاية / المعادن والمواد الخام",
          "安全与个人防护装备 / 金属与原材料",
        )}
        subtitle={t(
          "Safety & PPE and Metals & Raw Materials for Gulf Megaprojects",
          "معدات السلامة والوقاية والمعادن والمواد الخام لمشاريع الخليج الكبرى",
          "面向海湾大型项目的安全防护装备与金属及原材料",
        )}
        image="/assets/generated/division-safety-ppe-hero.dim_1400x600.jpg"
        breadcrumb={t(
          "Safety & PPE / Metals",
          "السلامة والمعادن",
          "安全与防护装备 / 金属",
        )}
      />

      {/* Overview */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                {t("Division Overview", "نظرة عامة على القسم", "事业部概览")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Safety First, Every Site, Every Time",
                  "السلامة أولاً، في كل موقع، في كل مرة",
                  "安全第一，每个现场，每次如此",
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "Safety is non-negotiable in Gulf construction. RAYAT's Safety & PPE range includes certified personal protective equipment meeting international standards (EN, ANSI, OSHA). From helmet to boot, we provide comprehensive protection solutions for construction, industrial, and oil & gas environments across the region.",
                  "السلامة غير قابلة للتفاوض في بناء الخليج. تشمل مجموعة السلامة ومعدات الوقاية من رايات معدات وقاية شخصية معتمدة تلبي المعايير الدولية (EN، ANSI، OSHA). من الخوذة إلى الحذاء، نقدم حلول حماية شاملة لبيئات البناء والصناعة والنفط والغاز في جميع أنحاء المنطقة.",
                  "在海湾建筑领域，安全不容妥协。RAYAT 的安全与个人防护装备系列包括符合国际标准（EN、ANSI、OSHA）的认证个人防护装备。从头盔到工鞋，我们为该地区的建筑、工业及油气环境提供全方位防护解决方案。",
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From reinforcing steel for high-rise towers to copper wire for electrical systems, RAYAT's Metals & Raw Materials division supplies contractors and developers across the Gulf with premium-grade materials. Our direct relationships with mills and manufacturers ensure competitive pricing and consistent supply for projects of any scale.",
                  "من حديد التسليح للأبراج الشاهقة إلى أسلاك النحاس للأنظمة الكهربائية، يُزوّد قسم المعادن والمواد الخام من رايات المقاولين والمطورين في جميع أنحاء الخليج بمواد عالية الجودة. تضمن علاقاتنا المباشرة مع المصانع والمصنّعين أسعاراً تنافسية وإمداداً مستمراً لمشاريع أي حجم.",
                  "从高层塔楼的加固钢筋到电气系统的铜线，RAYAT 的金属与原材料事业部为海湾各地的承包商和开发商供应优质材料。我们与钢厂和制造商的直接合作关系确保了具有竞争力的价格和任何规模项目的稳定供应。",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="safety-ppe.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Enquire Now", "استفسر الآن", "立即咨询")}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="safety-ppe.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام", "全部事业部")}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-safety-ppe-hero.dim_1400x600.jpg"
                  alt={t(
                    "Safety PPE Equipment",
                    "معدات السلامة والوقاية",
                    "安全防护装备",
                  )}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">
                  EN/ANSI
                </div>
                <div className="text-xs opacity-80">
                  {t("OSHA Certified", "معتمد من OSHA", "OSHA 认证")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PPE Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("Product Range", "نطاق المنتجات", "产品系列")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "PPE Product Categories",
                "فئات منتجات الوقاية",
                "个人防护装备产品类别",
              )}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ppeCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  data-ocid={`safety-ppe.category.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${cat.bg} ${cat.color} mb-3`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-10 bg-brand-sand border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">
            {t("Standards Compliance", "الامتثال للمعايير", "标准合规")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              t("EN Certified PPE", "معدات وقاية معتمدة EN", "EN 认证防护装备"),
              t("ANSI Standards", "معايير ANSI", "ANSI 标准"),
              t("OSHA Compliant", "متوافق مع OSHA", "符合 OSHA"),
              t(
                "Mill-Certified Metals",
                "معادن معتمدة من المصنع",
                "工厂认证金属",
              ),
              t("ISO 9001 Compliant", "متوافق مع ISO 9001", "符合 ISO 9001"),
            ].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal-dark font-semibold text-sm px-4 py-2 rounded-full border border-brand-teal/20"
              >
                <BadgeCheck size={15} className="text-brand-teal" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-teal-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {t(
              "Comprehensive Safety Solutions for Gulf Projects",
              "حلول سلامة شاملة لمشاريع الخليج",
              "面向海湾项目的综合安全解决方案",
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Comprehensive safety solutions for Gulf construction projects — contact our team to discuss your PPE and materials requirements.",
              "حلول سلامة شاملة لمشاريع البناء في الخليج — تواصل مع فريقنا لمناقشة متطلباتك من معدات الوقاية والمواد.",
              "面向海湾建筑项目的综合安全解决方案——请联系我们的团队，探讨您的防护装备和材料需求。",
            )}
          </p>
          <button
            type="button"
            data-ocid="safety-ppe.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Enquire Now", "استفسر الآن", "立即咨询")}{" "}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── SOLAR DIVISION PAGE ──────────────────────────────────────────────────────
function SolarDivisionPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const products = [
    {
      icon: Zap,
      title: t("Solar Power Generation", "توليد الطاقة الشمسية", "太阳能发电"),
      desc: t(
        "Complete solar photovoltaic (PV) systems for residential, commercial, and industrial power generation. Monocrystalline and polycrystalline panels from top-tier manufacturers.",
        "أنظمة الطاقة الكهروضوئية الشمسية المتكاملة للمنازل والمشاريع التجارية والصناعية. ألواح أحادية ومتعددة البلورة من كبار المصنعين.",
        "面向住宅、商业和工业发电的完整太阳能光伏（PV）系统。来自顶级制造商的单晶和多晶组件。",
      ),
      color: "text-yellow-700",
      bg: "bg-yellow-50",
    },
    {
      icon: Wind,
      title: t("Solar Power Systems", "أنظمة الطاقة الشمسية", "太阳能电力系统"),
      desc: t(
        "End-to-end solar power system design and supply: grid-tied, off-grid, and hybrid systems. Inverters, charge controllers, mounting structures, and complete turnkey packages.",
        "تصميم وتوريد أنظمة الطاقة الشمسية من البداية إلى النهاية: أنظمة متصلة بالشبكة وخارج الشبكة وهجينة. عاكسات الشحن ووحدات التحكم وهياكل التركيب وحزم جاهزة للتشغيل.",
        "端到端太阳能电力系统设计与供应：并网、离网及混合系统。逆变器、充电控制器、安装支架及全套交钥匙方案。",
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Package,
      title: t(
        "Energy Storage & Conversion",
        "تخزين وتحويل الطاقة",
        "储能与能量转换",
      ),
      desc: t(
        "Battery energy storage systems (BESS), lithium-ion and lead-acid battery banks, DC-AC inverters, UPS systems, and power conversion equipment for reliable energy management.",
        "أنظمة تخزين الطاقة بالبطاريات (BESS)، ووحدات بطاريات الليثيوم أيون والرصاص الحمضي، وعاكسات التيار المستمر إلى المتردد، وأنظمة UPS، ومعدات تحويل الطاقة لإدارة طاقة موثوقة.",
        "电池储能系统（BESS）、锂离子和铅酸电池组、直流-交流逆变器、UPS系统及电力转换设备，实现可靠的能源管理。",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Layers,
      title: t(
        "Solar Heating & Water Systems",
        "أنظمة التسخين الشمسي والمياه",
        "太阳能供暖与热水系统",
      ),
      desc: t(
        "Solar water heaters, solar pool heating, solar thermal collectors, and complete solar hot water solutions for residential, commercial, and industrial applications.",
        "سخانات المياه الشمسية، وتسخين حمامات السباحة بالطاقة الشمسية، والمجمعات الحرارية الشمسية، وحلول المياه الساخنة الشمسية المتكاملة للتطبيقات السكنية والتجارية والصناعية.",
        "太阳能热水器、太阳能泳池加热、太阳能集热器，以及面向住宅、商业和工业应用的完整太阳能热水解决方案。",
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Star,
      title: t("Components & Accessories", "المكونات والملحقات", "组件与配件"),
      desc: t(
        "Solar cables, MC4 connectors, combiner boxes, surge protection devices, monitoring systems, junction boxes, and all accessories for a complete solar installation.",
        "كابلات الطاقة الشمسية، ووصلات MC4، وصناديق التجميع، وأجهزة الحماية من ارتفاع الجهد، وأنظمة المراقبة، وصناديق التوصيل، وجميع الملحقات لتركيب شمسي متكامل.",
        "太阳能电缆、MC4连接器、汇流箱、浪涌保护器、监控系统、接线盒及完整太阳能安装所需的所有配件。",
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
  ];

  return (
    <div>
      <PageHero
        title={t("Solar Division", "قسم الطاقة الشمسية", "太阳能事业部")}
        subtitle={t(
          "Renewable Energy Solutions for Oman & the Gulf — Solar Power, Storage & Heating Systems",
          "حلول الطاقة المتجددة لعُمان والخليج — الطاقة الشمسية والتخزين وأنظمة التسخين",
          "面向阿曼及海湾地区的可再生能源解决方案——太阳能、储能与供暖系统",
        )}
        image="/assets/generated/division-solar-hero.dim_1400x600.jpg"
        breadcrumb={t("Solar Division", "قسم الطاقة الشمسية", "太阳能事业部")}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                {t("Division Overview", "نظرة عامة على القسم", "事业部概览")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Oman's Solar Energy Trading Partner",
                  "شريك عُمان في تجارة الطاقة الشمسية",
                  "阿曼的太阳能能源贸易伙伴",
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "RAYAT's Solar Division is at the forefront of Oman's transition to clean, renewable energy. We supply solar panels, complete power systems, energy storage solutions, and heating systems to contractors, developers, and businesses across Oman and the Gulf — aligned with Oman Vision 2040's sustainability goals.",
                  "قسم الطاقة الشمسية في RAYAT في طليعة انتقال عُمان نحو الطاقة النظيفة والمتجددة. نوفّر الألواح الشمسية وأنظمة الطاقة المتكاملة وحلول تخزين الطاقة وأنظمة التسخين للمقاولين والمطورين والشركات في جميع أنحاء عُمان والخليج — بما يتماشى مع أهداف رؤية عُمان 2040 للاستدامة.",
                  "RAYAT太阳能事业部处于阿曼向清洁可再生能源转型的前沿。我们为阿曼及海湾地区的承包商、开发商和企业供应太阳能电池板、完整电力系统、储能解决方案及供暖系统——契合阿曼2040愿景的可持续发展目标。",
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From rooftop solar installations to large-scale solar farms, we provide high-quality products from globally certified manufacturers with competitive pricing and full technical support.",
                  "من تركيبات الطاقة الشمسية على الأسطح إلى المزارع الشمسية واسعة النطاق، نوفّر منتجات عالية الجودة من مصنعين معتمدين عالميًا بأسعار تنافسية ودعم فني شامل.",
                  "从屋顶太阳能装置到大型太阳能农场，我们提供来自全球认证制造商的高品质产品，价格具竞争力并提供全面技术支持。",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="solar.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Solar Enquiry", "استفسار الطاقة الشمسية", "太阳能咨询")}{" "}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="solar.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام", "全部事业部")}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-solar-hero.dim_1400x600.jpg"
                  alt={t(
                    "Solar Division",
                    "قسم الطاقة الشمسية",
                    "太阳能事业部",
                  )}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">100%</div>
                <div className="text-xs opacity-80">
                  {t("Clean Energy", "طاقة نظيفة", "清洁能源")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("What We Supply", "ما نوفّره", "我们的供应")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Solar Product Categories",
                "فئات منتجات الطاقة الشمسية",
                "太阳能产品类别",
              )}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod, i) => {
              const Icon = prod.icon;
              return (
                <motion.div
                  key={prod.title}
                  data-ocid={`solar.product.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${prod.bg} ${prod.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {prod.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Solar RAYAT */}
      <section className="py-14 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              {t(
                "Why Choose RAYAT Solar?",
                "لماذا تختار RAYAT للطاقة الشمسية؟",
                "为什么选择RAYAT太阳能？",
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                t(
                  "Aligned with Oman Vision 2040 renewable energy targets",
                  "متوافق مع أهداف رؤية عُمان 2040 للطاقة المتجددة",
                  "契合阿曼2040愿景的可再生能源目标",
                ),
                t(
                  "Globally certified solar products from top manufacturers",
                  "منتجات شمسية معتمدة عالميًا من كبار المصنعين",
                  "来自顶级制造商的全球认证太阳能产品",
                ),
                t(
                  "Complete supply chain from panels to installation accessories",
                  "سلسلة توريد متكاملة من الألواح إلى ملحقات التركيب",
                  "从组件到安装配件的完整供应链",
                ),
                t(
                  "Competitive pricing with full technical support across the Gulf",
                  "أسعار تنافسية مع دعم فني شامل في جميع أنحاء الخليج",
                  "具竞争力的价格，覆盖海湾地区的全面技术支持",
                ),
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-left bg-white/10 rounded-xl p-4 border border-white/15"
                >
                  <BadgeCheck
                    className="text-brand-gold flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-white/90 text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              data-ocid="solar.enquiry.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              {t("Solar Enquiry", "استفسار الطاقة الشمسية", "太阳能咨询")}{" "}
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── TYRES & ADHESIVES DIVISION PAGE ─────────────────────────────────────────
function TyresAdhesivesDivisionPage({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const products = [
    {
      icon: Truck,
      title: t("Automotive Tyres", "إطارات السيارات", "汽车轮胎"),
      desc: t(
        "Premium passenger car, SUV, and 4x4 tyres from globally certified brands. Full range of sizes covering performance, comfort, and all-season applications.",
        "إطارات سيارات ركاب ودفع رباعي وSUV فاخرة من علامات تجارية معتمدة عالميًا. تشكيلة كاملة من المقاسات تغطي الأداء والراحة والاستخدام في جميع الفصول.",
        "来自全球认证品牌的优质乘用车、SUV 及四驱轮胎。涵盖性能、舒适及全季应用的完整尺寸系列。",
      ),
      color: "text-slate-700",
      bg: "bg-slate-100",
    },
    {
      icon: Package,
      title: t(
        "Truck & Heavy-Vehicle Tyres",
        "إطارات الشاحنات والمركبات الثقيلة",
        "卡车及重型车辆轮胎",
      ),
      desc: t(
        "Radial and bias-ply tyres for light commercial vehicles, heavy trucks, trailers, and buses. High load-rating options for Gulf road conditions and long-haul routes.",
        "إطارات راديالية وطبقية للمركبات التجارية الخفيفة والشاحنات الثقيلة والمقطورات والحافلات. خيارات بقدرة تحميل عالية تناسب ظروف الطرق في الخليج والمسارات الطويلة.",
        "适用于轻型商用车、重型卡车、拖车及客车的子午线与斜交轮胎。具备高载荷等级，适合海湾道路状况及长途运输路线。",
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Building2,
      title: t(
        "Off-Road & Industrial Tyres",
        "إطارات الطرق الوعرة والصناعية",
        "越野与工业轮胎",
      ),
      desc: t(
        "Robust tyres for construction machinery, forklifts, agricultural equipment, and mining vehicles. Designed for heavy-duty performance on rough terrain.",
        "إطارات متينة لآلات البناء والرافعات الشوكية والمعدات الزراعية ومركبات التعدين. مصممة للأداء الثقيل على التضاريس الوعرة.",
        "适用于建筑机械、叉车、农业设备及矿用车辆的坚固轮胎。专为恶劣地形下的重载作业而设计。",
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Layers,
      title: t("Industrial Adhesives", "المواد اللاصقة الصناعية", "工业胶粘剂"),
      desc: t(
        "High-strength structural adhesives, assembly adhesives, and multi-purpose bonding agents for manufacturing, construction, and maintenance applications.",
        "مواد لاصقة هيكلية عالية القوة ومواد تجميع وعوامل ربط متعددة الأغراض لتطبيقات التصنيع والبناء والصيانة.",
        "高强度结构胶粘剂、装配胶粘剂及多用途粘合剂，适用于制造、建筑及维护应用。",
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: ShieldCheck,
      title: t(
        "Sealants & Waterproofing",
        "المواد العازلة والعوازل المائية",
        "密封剂与防水材料",
      ),
      desc: t(
        "Silicone, polyurethane, and acrylic sealants for construction joints, facades, roofing, and waterproofing — suitable for extreme Gulf climate conditions.",
        "مواد عزل سيليكونية وبولي يوريثان وأكريليكية لوصلات البناء والواجهات والأسقف والعزل المائي — مناسبة لظروف المناخ القاسي في الخليج.",
        "硅酮、聚氨酯及丙烯酸密封剂，适用于建筑接缝、外墙、屋面及防水工程——适合海湾地区极端气候条件。",
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Star,
      title: t(
        "Specialty Bonding Products",
        "منتجات الربط المتخصصة",
        "特种粘合产品",
      ),
      desc: t(
        "Epoxy adhesives, contact adhesives, anaerobic compounds, cyanoacrylates, and industrial tapes for specialized engineering and fabrication applications.",
        "مواد لاصقة إيبوكسي ولاصقة تلامسية ومركبات لاهوائية وسيانو أكريلات وأشرطة صناعية لتطبيقات الهندسة والتصنيع المتخصصة.",
        "环氧胶粘剂、接触胶粘剂、厌氧化合物、氰基丙烯酸酯及工业胶带，适用于专业工程与制造应用。",
      ),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
  ];

  return (
    <div>
      <PageHero
        title={t(
          "Tyres & Adhesives Division",
          "قسم الإطارات والمواد اللاصقة",
          "轮胎与胶粘剂事业部",
        )}
        subtitle={t(
          "Premium Tyres, Industrial Adhesives & Sealants for Automotive, Construction and Manufacturing",
          "إطارات فاخرة ومواد لاصقة صناعية وعوازل للسيارات والبناء والتصنيع",
          "面向汽车、建筑与制造业的优质轮胎、工业胶粘剂与密封剂",
        )}
        image="/assets/generated/division-tyres-adhesives-hero.dim_1400x600.jpg"
        breadcrumb={t(
          "Tyres & Adhesives",
          "الإطارات والمواد اللاصقة",
          "轮胎与胶粘剂",
        )}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3 border-s-4 border-brand-gold ps-3">
                {t("Division Overview", "نظرة عامة على القسم", "事业部概览")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Your Trusted Tyres & Adhesives Partner in Oman",
                  "شريكك الموثوق للإطارات والمواد اللاصقة في عُمان",
                  "您在阿曼值得信赖的轮胎与胶粘剂合作伙伴",
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "RAYAT's Tyres & Adhesives Division supplies premium-quality tyres and industrial bonding solutions to automotive businesses, construction contractors, and manufacturers across Oman and the GCC. We source from globally certified brands and maintain competitive pricing with reliable local delivery.",
                  "قسم الإطارات والمواد اللاصقة في RAYAT يوفّر إطارات عالية الجودة وحلول ربط صناعية لشركات السيارات ومقاولي البناء والمصنعين في جميع أنحاء عُمان ودول الخليج. نوفّر منتجات من علامات تجارية معتمدة عالميًا مع أسعار تنافسية وتسليم محلي موثوق.",
                  "RAYAT轮胎与胶粘剂事业部为阿曼及海湾合作委员会国家的汽车企业、建筑承包商和制造商供应优质轮胎及工业粘合解决方案。我们采购自全球认证品牌，保持具竞争力的价格并提供可靠的本地配送。",
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From passenger car tyres to heavy off-road equipment rubber, and from everyday sealants to advanced structural adhesives, we cover the full spectrum of requirements for Oman's growing automotive and construction sectors.",
                  "من إطارات سيارات الركاب إلى مطاط المعدات الثقيلة للطرق الوعرة، ومن العوازل اليومية إلى المواد اللاصقة الهيكلية المتقدمة، نغطي الطيف الكامل من المتطلبات لقطاعات السيارات والبناء المتنامية في عُمان.",
                  "从乘用车轮胎到重型越野设备橡胶，从日常密封剂到先进结构胶粘剂，我们全面覆盖阿曼不断增长的汽车与建筑行业的各类需求。",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="tyres.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Request a Quote", "اطلب عرض سعر", "获取报价")}{" "}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="tyres.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام", "全部事业部")}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/division-tyres-adhesives-hero.dim_1400x600.jpg"
                  alt={t(
                    "Tyres & Adhesives Division",
                    "قسم الإطارات والمواد اللاصقة",
                    "轮胎与胶粘剂事业部",
                  )}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">GCC</div>
                <div className="text-xs opacity-80">
                  {t("Wide Supply", "إمداد واسع", "供应广泛")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-brand-teal font-semibold text-sm tracking-widest uppercase mb-3">
              {t("What We Supply", "ما نوفّره", "我们的供应")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Product Categories", "فئات المنتجات", "产品类别")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod, i) => {
              const Icon = prod.icon;
              return (
                <motion.div
                  key={prod.title}
                  data-ocid={`tyres.product.card.${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-border transition-shadow duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${prod.bg} ${prod.color} mb-4`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {prod.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why RAYAT Tyres */}
      <section className="py-14 bg-brand-teal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              {t(
                "Why Choose RAYAT Tyres & Adhesives?",
                "لماذا تختار RAYAT للإطارات والمواد اللاصقة؟",
                "为什么选择 RAYAT 轮胎与胶粘剂？",
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                t(
                  "Globally certified tyre brands suited for Gulf road and climate conditions",
                  "علامات إطارات معتمدة عالميًا تناسب ظروف الطرق والمناخ في الخليج",
                  "适合海湾道路与气候条件的全球认证轮胎品牌",
                ),
                t(
                  "Full range from passenger vehicles to heavy industrial equipment",
                  "تشكيلة كاملة من سيارات الركاب إلى المعدات الصناعية الثقيلة",
                  "从乘用车到重型工业设备的完整产品系列",
                ),
                t(
                  "Construction-grade adhesives and sealants tested for extreme heat and humidity",
                  "مواد لاصقة وعوازل بدرجة البناء مختبرة للحرارة والرطوبة الشديدين",
                  "经过极端高温高湿测试的建筑级胶粘剂与密封剂",
                ),
                t(
                  "Competitive pricing, fast delivery, and dedicated after-sales support across Oman",
                  "أسعار تنافسية وتسليم سريع ودعم ما بعد البيع مخصص في جميع أنحاء عُمان",
                  "具竞争力的价格、快速配送及覆盖阿曼全境的专属售后服务",
                ),
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-left bg-white/10 rounded-xl p-4 border border-white/15"
                >
                  <BadgeCheck
                    className="text-brand-gold flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-white/90 text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              data-ocid="tyres.enquiry.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              {t("Enquire Now", "استفسر الآن", "立即咨询")}{" "}
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({
  navigate,
  lang,
}: { navigate: (p: Page) => void; lang: Lang }) {
  const t = makeT(lang);
  const year = 2017;

  const footerLinks: { label: string; page: Page }[] = [
    { label: t("Home", "الرئيسية", "首页"), page: "home" },
    { label: t("Portfolio", "المحفظة", "项目案例"), page: "portfolio" },
    { label: t("Services", "الخدمات", "服务"), page: "services" },
    { label: t("Contact", "تواصل", "联系我们"), page: "contact" },
    {
      label: t("Trading Divisions", "أقسام التداول", "贸易事业部"),
      page: "trading-divisions",
    },
    {
      label: t("Solar Division", "قسم الطاقة الشمسية", "太阳能事业部"),
      page: "solar",
    },
    {
      label: t("FMCG Division", "قسم السلع الاستهلاكية", "快消品事业部"),
      page: "fmcg",
    },
    {
      label: t("Networking Division", "قسم الشبكات", "网络事业部"),
      page: "networking",
    },
    {
      label: t("Construction Materials", "مواد البناء", "建筑材料"),
      page: "construction-materials",
    },
    {
      label: t(
        "Safety & PPE / Metals",
        "السلامة والمعادن",
        "安全与防护装备 / 金属",
      ),
      page: "safety-ppe",
    },
    {
      label: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة", "轮胎与胶粘剂"),
      page: "tyres-adhesives",
    },
  ];

  return (
    <footer className="bg-brand-teal-dark text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/15">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/rayat-logo-extracted-transparent-transparent.dim_400x400.png"
                alt="RAYAT Industries SPC SPC"
                className="w-auto object-contain"
                style={{ height: "80px", opacity: 0.75 }}
              />
            </div>
            <p className="font-display font-bold text-lg text-white">
              RAYAT Industries SPC
            </p>
            <p
              lang="zh"
              className="text-brand-gold mt-1"
              style={{
                fontFamily:
                  "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif",
                letterSpacing: "0.12em",
              }}
            >
              瑞雅工业
            </p>
            <p className="text-brand-gold mt-1" dir="rtl">
              رايات للصناعات
            </p>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              {t(
                "A trusted Omani partner for industrial growth and global trade.",
                "شريك عُماني موثوق للنمو الصناعي والتجارة العالمية.",
                "值得信赖的阿曼合作伙伴，助力工业增长与全球贸易。",
              )}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">
              {t("Quick Links", "روابط سريعة", "快速链接")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.page}.link`}
                    onClick={() => {
                      navigate(link.page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white/70 hover:text-brand-gold text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact summary */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">
              {t("Contact", "تواصل", "联系我们")}
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="flex-shrink-0 text-brand-gold mt-0.5"
                />
                <span>
                  {t(
                    "Way 4521, Building 3, Al Ghubra North, Muscat 133, Oman",
                    "طريق 4521، مبنى 3، الغبرة شمال، مسقط 133، عُمان",
                    "阿曼马斯喀特北古布拉区 4521 路 3 号楼，邮编 133",
                  )}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0 text-brand-gold" />
                <a
                  href="mailto:info@rayatindustries.com"
                  className="hover:text-white transition-colors"
                >
                  info@rayatindustries.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0 text-brand-gold" />
                <a
                  href="tel:+96824000000"
                  className="hover:text-white transition-colors"
                >
                  +968 2400 0000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle
                  size={14}
                  className="flex-shrink-0 text-brand-gold"
                />
                <a
                  href="https://wa.me/96824000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t(
                    "WhatsApp: +968 2400 0000",
                    "واتساب: +968 2400 0000",
                    "WhatsApp：+968 2400 0000",
                  )}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={14} className="flex-shrink-0 text-brand-gold" />
                {t(
                  "Sun–Thu, 8:00 AM – 5:00 PM",
                  "الأحد–الخميس، 8:00 ص – 5:00 م",
                  "周日至周四，上午 8:00 – 下午 5:00",
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            © {year} RAYAT Industries SPC.{" "}
            {t("All rights reserved.", "جميع الحقوق محفوظة.", "版权所有。")}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [lang, setLang] = useState<Lang>("en");

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className="min-h-screen"
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
    >
      <Toaster richColors position="top-right" />
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigate}
        lang={lang}
        setLang={setLang}
      />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {currentPage === "home" && (
              <HomePage navigate={navigate} lang={lang} />
            )}
            {currentPage === "labour" && (
              <LabourPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "services" && (
              <ServicesPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "portfolio" && (
              <PortfolioPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "team" && (
              <TeamPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "news" && (
              <NewsPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "contact" && <ContactPage lang={lang} />}
            {currentPage === "trading-divisions" && (
              <TradingDivisionsPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "fmcg" && (
              <FMCGPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "networking" && (
              <NetworkingPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "construction-materials" && (
              <ConstructionMaterialsPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "safety-ppe" && (
              <SafetyPPEPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "solar" && (
              <SolarDivisionPage navigate={navigate} lang={lang} />
            )}
            {currentPage === "tyres-adhesives" && (
              <TyresAdhesivesDivisionPage navigate={navigate} lang={lang} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer navigate={navigate} lang={lang} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/96824000000"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.floating.button"
        className="fixed bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 ltr:right-6 rtl:left-6"
        aria-label={
          lang === "ar"
            ? "تواصل معنا عبر واتساب"
            : lang === "zh"
              ? "通过 WhatsApp 联系我们"
              : "Contact us on WhatsApp"
        }
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
