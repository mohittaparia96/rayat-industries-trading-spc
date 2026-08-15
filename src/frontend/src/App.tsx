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
type Lang = "en" | "ar";
function makeT(lang: Lang) {
  return (en: string, ar: string) => (lang === "ar" ? ar : en);
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

  useEffect(() => {
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
    { label: t("Home", "الرئيسية"), page: "home" },
    { label: t("Portfolio", "المحفظة"), page: "portfolio" },
    { label: t("Services", "الخدمات"), page: "services" },
  ];

  const tradingSubLinks: { label: string; page: Page }[] = [
    {
      label: t("Trading Overview", "نظرة عامة على التداول"),
      page: "trading-divisions",
    },
    {
      label: t("Solar Division", "قسم الطاقة الشمسية"),
      page: "solar",
    },
    {
      label: t("FMCG Division", "قسم السلع الاستهلاكية"),
      page: "fmcg",
    },
    {
      label: t("Networking Division", "قسم الشبكات"),
      page: "networking",
    },
    {
      label: t("Construction Materials", "مواد البناء"),
      page: "construction-materials",
    },
    {
      label: t("Safety & PPE / Metals", "السلامة والمعادن"),
      page: "safety-ppe",
    },
    {
      label: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة"),
      page: "tyres-adhesives",
    },
  ];

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    setTradingDropdownOpen(false);
  }

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
              <img
                src="/assets/generated/rayat-logo-extracted-transparent-transparent.dim_400x400.png"
                alt="RAYAT Industries SPC SPC Logo"
                className="w-full h-full object-contain"
                style={{ opacity: 0.75 }}
              />
            </div>
            <span className="flex flex-col leading-none font-display transition-colors duration-300">
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
                {t("Trading", "التداول")}
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

            {/* Language switcher — 2-way: English / عربي */}
            <fieldset
              aria-label={`Language selector. Current: ${
                lang === "en" ? "English" : "Arabic"
              }`}
              data-ocid="nav.lang.switcher"
              className={`flex items-center rounded-full border-2 border-brand-gold overflow-hidden`}
            >
              {(
                [
                  { code: "en", label: "EN", aria: "English" },
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
              {t("Contact Us", "تواصل معنا")}
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
                <span>{t("Trading Divisions", "أقسام التداول")}</span>
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
                {t("Contact Us", "تواصل معنا")}
              </button>

              {/* Mobile language switcher — 2-way: English / عربي */}
              <fieldset
                aria-label={`Language selector. Current: ${
                  lang === "en" ? "English" : "Arabic"
                }`}
                data-ocid="nav.mobile.lang.switcher"
                className="flex items-center rounded-lg border-2 border-brand-gold overflow-hidden mt-1"
              >
                {(
                  [
                    { code: "en", label: "EN", aria: "English" },
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
            <div className="w-24 h-0.5 bg-brand-gold/60 mx-auto my-3 rounded-full" />
          </div>
          <p
            className="text-white/90 font-medium text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto leading-relaxed text-outline"
            style={{ fontFamily: "'Gelasio', 'Georgia', serif", opacity: 0.75 }}
          >
            {t(
              "Building Oman's Future Through Industrial Excellence & Global Trade",
              "بناء مستقبل عُمان من خلال التميز الصناعي والتجارة العالمية"
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
              {t("Explore Our Sectors", "استكشف قطاعاتنا")}
              <ChevronRight size={18} className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              data-ocid="hero.contact_us.secondary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded hover:bg-white hover:text-brand-teal active:scale-95 transition-all duration-200 text-base"
            >
              {t("Contact Us", "تواصل معنا")}
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
    { value: "10+", label: t("Years Experience", "سنوات خبرة") },
    { value: "4+", label: t("Industry Sectors", "قطاعات صناعية") },
    { value: "50+", label: t("Trusted Partners", "شركاء موثوقون") },
    { value: "100%", label: t("Omani Owned", "ملكية عُمانية") },
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
              {t("Who We Are", "من نحن")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t("About RAYAT Industries SPC", "عن رايات للصناعات")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              {t(
                "RAYAT Industries SPC is a dynamic Omani company committed to driving industrial growth and facilitating global trade across the Sultanate. Founded on principles of integrity, quality, and innovation, we serve as a trusted partner for businesses across solar energy, seafood & food trading, construction, general trading, and industrial supply sectors.",
                "رايات للصناعات ش.ش.ف هي شركة عُمانية ديناميكية ملتزمة بدفع عجلة النمو الصناعي وتيسير التجارة العالمية في جميع أنحاء السلطنة. تأسست على مبادئ النزاهة والجودة والابتكار، ونعمل كشريك موثوق للشركات في قطاعات البناء والزراعة والتجارة العامة والإمدادات الصناعية."
              )}
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              {t(
                "Our deep market knowledge and strong supplier networks allow us to deliver reliable solutions that meet the evolving needs of Oman's growing economy.",
                "تتيح لنا معرفتنا العميقة بالسوق وشبكات الموردين القوية تقديم حلول موثوقة تلبي الاحتياجات المتطورة لاقتصاد عُمان المتنامي."
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
      title: t("Solar & Renewable Energy", "الطاقة الشمسية والمتجددة"),
      description: t(
        "Solar power generation, energy storage systems, solar heating, and complete renewable energy solutions for Oman and the Gulf.",
        "توليد الطاقة الشمسية وأنظمة تخزين الطاقة والتدفئة الشمسية وحلول الطاقة المتجددة الكاملة."
      ),
      image: "/assets/generated/division-solar-hero.dim_1400x600.jpg",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      page: "solar" as Page,
    },
    {
      title: t("Seafood & Food Trading", "المأكولات البحرية وتجارة الأغذية"),
      description: t(
        "Premium seafood (shrimp, tuna, salmon, mackerel, squid and more), poultry, and agricultural products connecting Oman with global supply chains.",
        "مأكولات بحرية متميزة (روبيان، تونة، سلمون وأكثر) ودواجن ومنتجات زراعية تربط عُمان بسلاسل الإمداد العالمية."
      ),
      image: "/assets/generated/fmcg-section.dim_1200x800.jpg",
      icon: Wheat,
      color: "text-blue-700",
      bg: "bg-blue-50",
      page: "fmcg" as Page,
    },
    {
      title: t("Construction & Infrastructure", "البناء والبنية التحتية"),
      description: t(
        "We supply high-quality construction materials, equipment, and project support services to contractors and developers across Oman and the GCC.",
        "نوفر مواد بناء عالية الجودة ومعدات وخدمات دعم المشاريع للمقاولين والمطورين في عُمان ودول الخليج."
      ),
      image: "/assets/generated/sector-construction.dim_600x400.jpg",
      icon: Building2,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      page: "services" as Page,
    },
    {
      title: t("General Trading & Logistics", "التجارة العامة واللوجستيات"),
      description: t(
        "Our general trading operations cover a broad range of commodities, managed through efficient logistics and strong international partnerships.",
        "تغطي عملياتنا التجارية العامة مجموعة واسعة من السلع، تُدار من خلال لوجستيات فعّالة وشراكات دولية قوية."
      ),
      image: "/assets/generated/sector-trading.dim_600x400.jpg",
      icon: Truck,
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
      page: "services" as Page,
    },
    {
      title: t("Industrial Supplies", "الإمدادات الصناعية"),
      description: t(
        "We source and distribute a comprehensive range of industrial supplies, tools, and equipment to meet the operational demands of manufacturing and production facilities.",
        "نوفر ونوزع مجموعة شاملة من الإمدادات الصناعية والأدوات والمعدات لتلبية متطلبات مرافق التصنيع والإنتاج."
      ),
      image: "/assets/generated/sector-industrial.dim_600x400.jpg",
      icon: Factory,
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
      page: "services" as Page,
    },
    {
      title: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة"),
      description: t(
        "Premium automotive, truck, and industrial tyres alongside high-performance adhesives, sealants, and bonding products for industrial and commercial applications.",
        "إطارات سيارات وشاحنات وصناعية متميزة إلى جانب مواد لاصقة وعوازل عالية الأداء للتطبيقات الصناعية والتجارية."
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
            {t("What We Do", "ما نقوم به")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {t("Our Industry Sectors", "قطاعاتنا الصناعية")}
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
                      {t("Sector", "قطاع")}
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
      title: t("Trusted Partnerships", "شراكات موثوقة"),
      description: t(
        "Built on years of reliable relationships with global suppliers and local clients",
        "مبنية على سنوات من العلاقات الموثوقة مع الموردين العالميين والعملاء المحليين"
      ),
      accent: "bg-brand-teal/10 text-brand-teal",
    },
    {
      icon: MapPin,
      title: t("Local Expertise", "خبرة محلية"),
      description: t(
        "Deep understanding of Oman's market, regulations, and business culture",
        "فهم عميق لسوق عُمان وأنظمتها وثقافتها التجارية"
      ),
      accent: "bg-brand-gold/10 text-brand-gold",
    },
    {
      icon: ShieldCheck,
      title: t("Quality Assured", "جودة مضمونة"),
      description: t(
        "Every product and service meets rigorous quality standards before delivery",
        "كل منتج وخدمة تستوفي معايير الجودة الصارمة قبل التسليم"
      ),
      accent: "bg-green-50 text-green-700",
    },
    {
      icon: Package,
      title: t("End-to-End Solutions", "حلول متكاملة"),
      description: t(
        "From sourcing to delivery, we manage the entire supply chain for our clients",
        "من التوريد إلى التسليم، ندير سلسلة التوريد بأكملها لعملائنا"
      ),
      accent: "bg-brand-terracotta/10 text-brand-terracotta",
    },
  ];
  return (
    <section
      id="why-us"
      className="py-20 md:py-28 bg-brand-teal relative overflow-hidden"
    >
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
            {t("Our Advantage", "ميزتنا")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
            {t("Why Choose RAYAT?", "لماذا تختار رايات؟")}
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
    { label: t("Integrity", "النزاهة"), icon: ShieldCheck },
    { label: t("Excellence", "التميز"), icon: Star },
    { label: t("Partnership", "الشراكة"), icon: Handshake },
    { label: t("Innovation", "الابتكار"), icon: Lightbulb },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-teal-dark relative overflow-hidden">
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
            {t("Our Purpose", "غايتنا")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
            {t("Vision & Mission", "الرؤية والرسالة")}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                {t("Our Vision", "رؤيتنا")}
              </h3>
            </div>
            <p className="text-white/85 text-base md:text-lg leading-relaxed text-outline">
              {t(
                "To be the leading industrial and trading powerhouse of the Middle East — a bridge between global markets and regional ambition, aligned with Oman Vision 2040 and the Gulf's transformative economic agenda.",
                "أن نكون القوة الصناعية والتجارية الرائدة في الشرق الأوسط — جسر بين الأسواق العالمية والطموح الإقليمي، متوافقين مع رؤية عُمان 2040 وأجندة التحول الاقتصادي الخليجي."
              )}
            </p>
          </motion.div>

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
                {t("Our Mission", "رسالتنا")}
              </h3>
            </div>
            <p className="text-white/85 text-base md:text-lg leading-relaxed text-outline">
              {t(
                "To deliver uncompromising quality and reliability across every trade, supply, and partnership — empowering businesses across Oman, the GCC, and beyond to build, grow, and prosper.",
                "تقديم الجودة والموثوقية التي لا تقبل المساومة في كل تجارة وإمداد وشراكة — تمكين الشركات في عُمان والخليج العربي وما وراءها من البناء والنمو والازدهار."
              )}
            </p>
          </motion.div>
        </div>

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
            {t("Reach Out", "تواصل معنا")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t(
              "Ready to Work With Us?",
              "مستعد للعمل معنا؟"
            )}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {t(
              "Whether you need industrial supplies or general trading services — we're here to help. Contact our team for a prompt response.",
              "سواء كنت بحاجة إلى إمدادات صناعية أو خدمات تجارية عامة — نحن هنا للمساعدة. تواصل مع فريقنا للحصول على رد سريع."
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
              {t("Get In Touch", "تواصل معنا")}
            </button>
            <a
              href="https://wa.me/96824000000"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="home.whatsapp_cta.secondary_button"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-green-600 transition-colors text-base shadow-lg"
            >
              <MessageCircle size={18} />
              {t("WhatsApp Us", "واتساب")}
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
      title: t("Construction Workers", "عمال البناء"),
      desc: t(
        "Builders, masons, steel fixers, scaffolders, carpenters, and civil laborers for all construction scales.",
        "بنائون وبناة بالحجارة ومثبتو فولاذ وعمال سقالات ونجارون وعمال مدنيون لجميع أحجام البناء."
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Zap,
      title: t(
        "Technical & Skilled Trades",
        "المهن التقنية والمهارية"
      ),
      desc: t(
        "Electricians, plumbers, welders, HVAC technicians, and pipefitters with verified certifications.",
        "كهربائيون وسباكون ولحامون وفنيو تكييف وعمال تركيب أنابيب بشهادات موثقة."
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Factory,
      title: t("Industrial Workers", "العمال الصناعيون"),
      desc: t(
        "Machine operators, warehouse staff, factory workers, and production line technicians.",
        "مشغلو آلات وطاقم المستودعات وعمال المصانع وفنيو خطوط الإنتاج."
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Briefcase,
      title: t("Office & Administrative", "المكتبية والإدارية"),
      desc: t(
        "Data entry operators, receptionists, admin executives, and office support staff.",
        "مشغلو إدخال البيانات والموظفون الإداريون ومساعدو المكاتب."
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Hotel,
      title: t("Hospitality & Service", "الضيافة والخدمات"),
      desc: t(
        "Hotel staff, cleaners, drivers, security guards, and front-of-house personnel.",
        "طاقم الفنادق والعمال والسائقون وحراس الأمن وموظفو الاستقبال."
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      icon: Wheat,
      title: t("Agricultural Workers", "العمال الزراعيون"),
      desc: t(
        "Farm laborers, irrigation technicians, agricultural equipment operators, and produce handlers.",
        "عمال المزارع وفنيو الري ومشغلو المعدات الزراعية ومناولو المنتجات."
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
      title: t("Submit Requirements", "تقديم المتطلبات"),
      desc: t(
        "Share your workforce needs — number, skills, timeline, and any certifications required.",
        "شارك احتياجاتك من القوى العاملة — العدد والمهارات والجدول الزمني وأي شهادات مطلوبة."
      ),
    },
    {
      step: "02",
      title: t("Candidate Sourcing", "استقطاب المرشحين"),
      desc: t(
        "We tap our network of pre-vetted candidates from 15+ source countries across South and Southeast Asia.",
        "نستغل شبكتنا من المرشحين المتحقق منهم مسبقاً من أكثر من 15 دولة عبر جنوب وجنوب شرق آسيا."
      ),
    },
    {
      step: "03",
      title: t("Screening & Vetting", "الفرز والتحقق"),
      desc: t(
        "Thorough background checks, skill verification, medical fitness, and reference validation.",
        "فحوصات خلفية شاملة والتحقق من المهارات واللياقة الطبية والتحقق من المراجع."
      ),
    },
    {
      step: "04",
      title: t("Deployment", "الإرسال"),
      desc: t(
        "Handle all visa processing, LMRA compliance, contracts, and smooth on-boarding coordination.",
        "معالجة جميع التأشيرات والامتثال للوائح سوق العمل والعقود وتنسيق الإعداد الوظيفي السلس."
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
          "حلول العمالة والقوى البشرية"
        )}
        subtitle={t(
          "Comprehensive workforce supply and recruitment services for businesses across Oman and the GCC",
          "خدمات شاملة لتوريد القوى العاملة والتوظيف للشركات في عُمان ودول الخليج"
        )}
        image="/assets/generated/page-manpower-hero.dim_1400x600.jpg"
        breadcrumb={t(
          "Labour & Manpower",
          "العمالة والقوى البشرية"
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
                {t("Workforce Solutions", "حلول القوى العاملة")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Your Trusted Manpower Partner in Oman",
                  "شريكك الموثوق للقوى العاملة في عُمان"
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "RAYAT provides comprehensive manpower supply solutions for businesses in Oman and the GCC. From unskilled construction laborers to highly skilled technical professionals, we connect employers with the right talent efficiently and compliantly.",
                  "تقدم رايات حلولاً شاملة لتوريد القوى العاملة للشركات في عُمان ودول الخليج. من العمالة غير الماهرة في البناء إلى المحترفين الفنيين المهرة، نربط أصحاب العمل بالمواهب المناسبة بكفاءة وامتثال تام."
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "All placements are handled with full LMRA compliance, proper employment contracts, and complete documentation support. We manage the entire recruitment lifecycle so you can focus on your core business.",
                  "تتم جميع التوظيفات مع الالتزام الكامل بلوائح سوق العمل، وعقود توظيف سليمة، ودعم توثيقي كامل. ندير دورة التوظيف بالكامل لتتمكن من التركيز على عملك الأساسي."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="labour.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Request Workers", "طلب عمال")}
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
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-2xl font-extrabold">500+</div>
                <div className="text-xs opacity-80">
                  {t("Workers Placed", "عامل تم توظيفه")}
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
              {t("Categories", "الفئات")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Worker Categories", "فئات العمال")}
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
              {t("How It Works", "كيف نعمل")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {t(
                "Our Recruitment Process",
                "عملية التوظيف لدينا"
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
                {t("Documentation", "التوثيق")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Visa & Documentation Services",
                  "خدمات التأشيرات والتوثيق"
                )}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {t(
                  "We handle all the complex paperwork so you don't have to. Our documentation team is fully versed in Omani labour law and Oman Labor Law requirements.",
                  "نتولى جميع المعاملات الورقية المعقدة بدلاً عنك. فريقنا للتوثيق ملم تماماً بقانون العمل العُماني ومتطلباته."
                )}
              </p>
              <ul className="space-y-3">
                {[
                  t(
                    "Work visa processing and renewal",
                    "معالجة وتجديد تأشيرات العمل"
                  ),
                  t(
                    "LMRA (Labour Market Regulatory Authority) compliance",
                    "الامتثال للوائح سوق العمل (LMRA)"
                  ),
                  t(
                    "Employment contracts in Arabic and English",
                    "عقود التوظيف باللغتين العربية والإنجليزية"
                  ),
                  t(
                    "Medical fitness coordination and testing",
                    "تنسيق الفحوصات الطبية وإجراءات اللياقة الصحية"
                  ),
                  t(
                    "Accommodation and transport coordination",
                    "تنسيق السكن والمواصلات"
                  ),
                  t(
                    "Insurance and health coverage setup",
                    "إعداد التأمين والتغطية الصحية"
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
                label: t("Workers Placed", "عامل تم توظيفه"),
              },
              {
                value: "50+",
                label: t("Client Companies", "شركة عميلة"),
              },
              {
                value: "15+",
                label: t("Source Countries", "دولة مصدّرة"),
              },
              {
                value: "100%",
                label: t("LMRA Compliant", "متوافق مع LMRA"),
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
              "هل تحتاج إلى عمال مهرة أو غير مهرة؟"
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Tell us your requirements and we'll have candidates ready within 72 hours.",
              "أخبرنا بمتطلباتنا وسنجهز المرشحين خلال 72 ساعة."
            )}
          </p>
          <button
            type="button"
            data-ocid="labour.bottom_cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Contact Our Team", "تواصل مع فريقنا")}
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
        "إمداد البناء والبنية التحتية"
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      summary: t(
        "Premium construction materials, heavy equipment, and project support for Oman's development projects.",
        "مواد بناء متميزة ومعدات ثقيلة ودعم المشاريع لمشاريع التنمية في عُمان."
      ),
      details: [
        t(
          "Structural steel, rebar, and metal works",
          "الفولاذ الهيكلي وحديد التسليح والأعمال المعدنية"
        ),
        t(
          "Cement, aggregates, and ready-mix concrete",
          "الإسمنت والركام والخرسانة الجاهزة"
        ),
        t(
          "MEP materials and electrical components",
          "مواد الميكانيكا والكهرباء والسباكة والمكونات الكهربائية"
        ),
        t(
          "Heavy equipment rental and procurement",
          "استئجار وشراء المعدات الثقيلة"
        ),
        t(
          "Project site supply logistics management",
          "إدارة لوجستيات التوريد في مواقع المشاريع"
        ),
      ],
    },
    {
      icon: Wheat,
      title: t(
        "Agriculture & Food Trading",
        "الزراعة وتجارة الأغذية"
      ),
      color: "text-green-700",
      bg: "bg-green-50",
      summary: t(
        "Global sourcing of grains, fresh produce, and agricultural inputs to food businesses in Oman and GCC.",
        "التوريد العالمي للحبوب والمنتجات الطازجة والمدخلات الزراعية للشركات الغذائية في عُمان والخليج."
      ),
      details: [
        t(
          "Bulk grain imports: wheat, rice, barley, corn",
          "استيراد الحبوب بالجملة: قمح، أرز، شعير، ذرة"
        ),
        t(
          "Fresh and frozen produce supply chains",
          "سلاسل إمداد المنتجات الطازجة والمجمدة"
        ),
        t(
          "Animal feed and livestock supplies",
          "أعلاف الحيوانات ومستلزمات الثروة الحيوانية"
        ),
        t(
          "Agricultural equipment and tools",
          "معدات وأدوات زراعية"
        ),
        t(
          "Fertilizers and crop protection products",
          "الأسمدة ومنتجات حماية المحاصيل"
        ),
      ],
    },
    {
      icon: Factory,
      title: t("Industrial Supplies", "الإمدادات الصناعية"),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
      summary: t(
        "Comprehensive range of industrial tools, equipment, safety gear, and consumables for manufacturing.",
        "مجموعة شاملة من الأدوات والمعدات الصناعية ومعدات السلامة والمستهلكات للتصنيع."
      ),
      details: [
        t(
          "Safety gear: PPE, helmets, gloves, harnesses",
          "معدات السلامة: معدات الحماية الشخصية، خوذات، قفازات، أحزمة"
        ),
        t(
          "Hand tools, power tools, and cutting equipment",
          "أدوات يدوية وكهربائية ومعدات قطع"
        ),
        t(
          "Industrial fasteners and hardware",
          "مثبتات ومعدات صناعية"
        ),
        t(
          "Lubricants, sealants, and maintenance products",
          "مواد التشحيم والعوازل ومنتجات الصيانة"
        ),
        t(
          "Conveyor systems and material handling",
          "أنظمة النقل والتداول المواد"
        ),
      ],
    },
    {
      icon: Globe,
      title: t(
        "General Trading & Commodities",
        "التجارة العامة والسلع"
      ),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
      summary: t(
        "Wide-ranging import/export of commercial goods with competitive pricing and reliable global networks.",
        "استيراد وتصدير واسع النطاق للبضائع التجارية بأسعار تنافسية وشبكات عالمية موثوقة."
      ),
      details: [
        t(
          "Consumer goods import and distribution",
          "استيراد وتوزيع السلع الاستهلاكية"
        ),
        t(
          "Export facilitation for local manufacturers",
          "تيسير التصدير للمصنعين المحليين"
        ),
        t(
          "Commodity trading and brokering",
          "تجارة السلع والوساطة"
        ),
        t(
          "Cross-border trade documentation",
          "توثيق التجارة عبر الحدود"
        ),
        t(
          "Customs clearance advisory services",
          "خدمات استشارية للتخليص الجمركي"
        ),
      ],
    },
    {
      icon: Truck,
      title: t(
        "Logistics & Freight Management",
        "إدارة اللوجستيات والشحن"
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
      summary: t(
        "End-to-end freight management across sea, air, and road with full customs clearance support.",
        "إدارة شاملة للشحن عبر البحر والجو والبر مع دعم كامل للتخليص الجمركي."
      ),
      details: [
        t(
          "Sea freight FCL/LCL shipments",
          "شحن بحري بحاويات كاملة وأجزاء حاويات"
        ),
        t(
          "Air freight for time-sensitive cargo",
          "شحن جوي للبضائع الحساسة للوقت"
        ),
        t(
          "Cross-Gulf road freight services",
          "خدمات الشحن البري عبر الخليج"
        ),
        t(
          "Customs clearance and documentation",
          "التخليص الجمركي والتوثيق"
        ),
        t(
          "Warehousing and distribution in Oman",
          "التخزين والتوزيع في عُمان"
        ),
      ],
    },
    {
      icon: Users,
      title: t(
        "Labour & Manpower Solutions",
        "حلول العمالة والقوى البشرية"
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
      summary: t(
        "Comprehensive workforce supply, recruitment, and HR outsourcing for all industries in Oman.",
        "توريد شاملة للقوى العاملة والتوظيف والاستعانة بمصادر خارجية للموارد البشرية لجميع الصناعات في عُمان."
      ),
      details: [
        t(
          "Skilled and unskilled worker supply",
          "توريد العمال المهرة وغير المهرة"
        ),
        t(
          "Permanent and contract recruitment",
          "التوظيف الدائم والتعاقدي"
        ),
        t(
          "HR outsourcing and payroll management",
          "الاستعانة بمصادر خارجية للموارد البشرية وإدارة الرواتب"
        ),
        t(
          "LMRA compliance and visa processing",
          "الامتثال للوائح سوق العمل ومعالجة التأشيرات"
        ),
        t(
          "Staff training and onboarding support",
          "تدريب الموظفين ودعم الإعداد الوظيفي"
        ),
      ],
    },
    {
      icon: Zap,
      title: t(
        "Solar & Renewable Energy",
        "الطاقة الشمسية والمتجددة"
      ),
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      summary: t(
        "Complete solar energy solutions — from power generation and storage to heating systems and accessories — for homes, businesses, and industry in Oman and the Gulf.",
        "حلول طاقة شمسية كاملة — من توليد الطاقة والتخزين إلى أنظمة التسخين والملحقات — للمنازل والشركات والصناعة في عُمان والخليج."
      ),
      details: [
        t(
          "Solar power generation systems (on-grid & off-grid)",
          "أنظمة توليد الطاقة الشمسية (متصلة بالشبكة ومستقلة)"
        ),
        t(
          "Solar power systems design and installation",
          "تصميم وتركيب أنظمة الطاقة الشمسية"
        ),
        t(
          "Energy storage and battery conversion solutions",
          "حلول تخزين الطاقة وتحويل البطاريات"
        ),
        t(
          "Solar heating and hot water systems",
          "أنظمة التسخين الشمسي والمياه الساخنة"
        ),
        t(
          "Solar components and accessories supply",
          "توريد مكونات وملحقات الطاقة الشمسية"
        ),
      ],
    },
    {
      icon: Wheat,
      title: t(
        "Seafood & Poultry Trading",
        "تجارة المأكولات البحرية والدواجن"
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
      summary: t(
        "Premium fresh and frozen seafood and certified poultry products, sourced globally and delivered reliably to food businesses across Oman and the GCC.",
        "مأكولات بحرية طازجة ومجمدة متميزة ومنتجات دواجن معتمدة، يتم توريدها عالمياً وتسليمها بشكل موثوق لشركات الأغذية في عُمان والخليج."
      ),
      details: [
        t(
          "Seafood: shrimp, tuna, salmon, mackerel, squid, cuttlefish, mussels, clams",
          "مأكولات بحرية: روبيان، تونة، سلمون، ماكريل، حبار، سبيط، بلح البحر، حلزون البحر"
        ),
        t(
          "Poultry: whole chicken (800g, 1000g, 1100g grades)",
          "دواجن: دجاج كامل (فئات 800 جرام، 1000 جرام، 1100 جرام)"
        ),
        t(
          "Eggs — fresh and graded for commercial supply",
          "بيض — طازج ومصنف للتوريد التجاري"
        ),
        t(
          "Cold-chain logistics and temperature-controlled delivery",
          "لوجستيات السلسلة الباردة والتسليم بدرجة حرارة متحكم بها"
        ),
        t(
          "Halal-certified sourcing and documentation",
          "توريد وتوثيق معتمد حلال"
        ),
      ],
    },
    {
      icon: Truck,
      title: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة"),
      color: "text-slate-700",
      bg: "bg-slate-100",
      summary: t(
        "Comprehensive supply of premium automotive, truck, and industrial tyres alongside high-performance adhesives, sealants, and bonding compounds for industrial applications across Oman and the GCC.",
        "توريد شامل لإطارات سيارات وشاحنات وصناعية متميزة إلى جانب مواد لاصقة وعوازل عالية الأداء للتطبيقات الصناعية في عُمان والخليج."
      ),
      details: [
        t(
          "Automotive tyres: passenger car, SUV, and 4x4 tyres from leading brands",
          "إطارات السيارات: سيارات ركاب، سيارات دفع رباعي من ماركات رائدة"
        ),
        t(
          "Truck & heavy-vehicle tyres: radial and bias-ply for all tonnage",
          "إطارات الشاحنات والمركبات الثقيلة: شعاعية ومتقاطعة لجميع الأوزان"
        ),
        t(
          "Off-road and industrial tyres for construction and mining equipment",
          "إطارات طرق وعرة وصناعية لمعدات البناء والتعدين"
        ),
        t(
          "Industrial adhesives: structural, assembly, and multi-purpose bonding",
          "مواد لاصقة صناعية: هيكلية وتجميعية ومتعددة الأغراض"
        ),
        t(
          "Sealants: silicone, polyurethane, and acrylic for construction and manufacturing",
          "عوازل: سيليكون وبولي يوريثان وأكريليك للبناء والتصنيع"
        ),
        t(
          "Specialty bonding products: epoxies, contact adhesives, and industrial tapes",
          "منتجات ربط متخصصة: إيبوكسي ومواد لاصقة تلامسية وأشرطة صناعية"
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
        title={t("Our Services", "خدماتنا")}
        subtitle={t(
          "Integrated service lines delivering end-to-end industrial, trading, solar, and food solutions",
          "خطوط خدمة متكاملة تقدم حلولاً صناعية وتجارية وطاقة شمسية وغذائية شاملة"
        )}
        image="/assets/generated/page-services-hero.dim_1400x600.jpg"
        breadcrumb={t("Services", "الخدمات")}
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
              {t("What We Offer", "ما نقدمه")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Complete Service Portfolio",
                "محفظة الخدمات الكاملة"
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
                        ? t("Show Less", "عرض أقل")
                        : t("Learn More", "اعرف المزيد")}
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
              {t("Our Process", "عمليتنا")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {t("How We Work", "كيف نعمل")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                n: "01",
                title: t("Requirement Analysis", "تحليل المتطلبات"),
                desc: t(
                  "We deeply understand your needs, specifications, timelines, and budget constraints.",
                  "نُفهم احتياجاتك ومواصفاتك وجداولك الزمنية وقيود ميزانيتك بعمق."
                ),
              },
              {
                n: "02",
                title: t("Sourcing", "التوريد"),
                desc: t(
                  "Our global network enables competitive sourcing from the best suppliers worldwide.",
                  "تتيح لنا شبكتنا العالمية التوريد التنافسي من أفضل الموردين حول العالم."
                ),
              },
              {
                n: "03",
                title: t("Negotiations", "المفاوضات"),
                desc: t(
                  "We negotiate the best terms, pricing, and conditions on your behalf with verified suppliers.",
                  "نتفاوض نيابةً عنك للحصول على أفضل الشروط والأسعار والظروف مع موردين موثوقين."
                ),
              },
              {
                n: "04",
                title: t("Quality Check", "فحص الجودة"),
                desc: t(
                  "Rigorous quality inspection and verification before any shipment or deployment.",
                  "فحص وتحقق صارم من الجودة قبل أي شحن أو نشر."
                ),
              },
              {
                n: "05",
                title: t("Delivery", "التسليم"),
                desc: t(
                  "On-time delivery with complete documentation, logistics support, and after-service.",
                  "تسليم في الوقت المحدد مع توثيق كامل ودعم لوجستي وخدمات ما بعد البيع."
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
            {t("Ready to Get Started?", "مستعد للبدء؟")}
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t(
              "Contact us to discuss your requirements and receive a tailored proposal from our team.",
              "تواصل معنا لمناقشة متطلباتك وتلقي عرض مخصص من فريقنا."
            )}
          </p>
          <button
            type="button"
            data-ocid="services.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors shadow-lg"
          >
            {t("Request a Quote", "طلب عرض أسعار")}
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
        "توريد البنية التحتية لمسقط غراند مول"
      ),
      sector: "Construction" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Supplied structural steel, aggregates, and MEP materials for the expansion of Muscat Grand Mall's retail and parking complex.",
        "توريد الفولاذ الهيكلي والركام ومواد الميكانيكا والكهرباء لتوسعة مجمع التسوق والمواقف في مسقط غراند مول."
      ),
      image: "/assets/generated/portfolio-construction-mall.dim_600x400.jpg",
    },
    {
      name: t(
        "The Wave Muscat Development — Building Materials",
        "تطوير ذا ويف مسقط — مواد البناء"
      ),
      sector: "Construction" as PortfolioFilter,
      year: "2022",
      desc: t(
        "Long-term supply agreement for premium building materials throughout the prestigious The Wave Muscat waterfront development.",
        "اتفاقية توريد طويلة الأمد لمواد البناء المتميزة في مشروع ذا ويف مسقط الواجهة البحرية المرموق."
      ),
      image: "/assets/generated/portfolio-construction-wave.dim_600x400.jpg",
    },
    {
      name: t(
        "GCC Grain Import Program",
        "برنامج استيراد الحبوب الخليجي"
      ),
      sector: "Agriculture" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Managed bulk import of wheat, rice, and barley from South Asia for a consortium of GCC food distributors.",
        "إدارة استيراد الجملة من القمح والأرز والشعير من جنوب آسيا لتحالف موزعي الأغذية الخليجيين."
      ),
      image: "/assets/generated/portfolio-agriculture-grain.dim_600x400.jpg",
    },
    {
      name: t(
        "Sohar Industrial Zone Supply",
        "توريد المنطقة الصناعية بصحار"
      ),
      sector: "Industrial" as PortfolioFilter,
      year: "2022",
      desc: t(
        "Supplied safety gear, industrial fasteners, and maintenance consumables to multiple factories in Sohar Free Zone.",
        "توريد معدات السلامة والمثبتات الصناعية والمستهلكات للصيانة لمصانع متعددة في المنطقة الحرة بصحار."
      ),
      image: "/assets/generated/portfolio-industrial-sohar.dim_600x400.jpg",
    },
    {
      name: t(
        "Muscat New Urban Manpower Contract",
        "عقد القوى العاملة لمشروع مسقط الحضري الجديد"
      ),
      sector: "Manpower" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Placed 120+ construction workers, electricians, and site supervisors for Muscat's new urban Phase 2 housing project.",
        "توظيف أكثر من 120 عامل بناء وكهربائي ومشرف موقع لمشروع الإسكان الحضري الجديد بمسقط المرحلة الثانية."
      ),
      image: "/assets/generated/labour-workers.dim_600x400.jpg",
    },
    {
      name: t(
        "Mina Sultan Qaboos Logistics Hub",
        "مركز لوجستيات ميناء السلطان قابوس"
      ),
      sector: "Trading" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Managed import logistics and customs clearance for a major retail chain's new Mina Sultan Qaboos distribution centre.",
        "إدارة لوجستيات الاستيراد والتخليص الجمركي لمركز التوزيع الجديد لسلسلة تجزئة كبرى في ميناء السلطان قابوس."
      ),
      image: "/assets/generated/portfolio-trading-logistics.dim_600x400.jpg",
    },
    {
      name: t(
        "Oman Oil Facility Supplies",
        "توريدات منشأة النفط في عُمان"
      ),
      sector: "Industrial" as PortfolioFilter,
      year: "2021",
      desc: t(
        "Long-term industrial supply contract for PPE, tools, and safety equipment to an Oman oil facility.",
        "عقد توريد صناعي طويل الأمد لمعدات الحماية الشخصية والأدوات ومعدات السلامة لمنشأة نفطية عُمانية."
      ),
      image: "/assets/generated/portfolio-industrial-oil.dim_600x400.jpg",
    },
    {
      name: t(
        "Regional Food Distribution Network",
        "شبكة توزيع الغذاء الإقليمية"
      ),
      sector: "Agriculture" as PortfolioFilter,
      year: "2022",
      desc: t(
        "Established a multi-supplier fresh produce distribution network across Oman, Kuwait, and Qatar.",
        "إنشاء شبكة توزيع للمنتجات الطازجة متعددة الموردين عبر عُمان والكويت وقطر."
      ),
      image: "/assets/generated/portfolio-agriculture-produce.dim_600x400.jpg",
    },
    {
      name: t(
        "Gulf Shrimp & Tuna Export Program",
        "برنامج تصدير الروبيان والتونة الخليجي"
      ),
      sector: "Seafood" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Coordinated large-scale export of fresh Omani shrimp, yellowfin tuna, and mackerel to premium buyers in the UAE, Qatar, and Saudi Arabia.",
        "تنسيق تصدير واسع النطاق للروبيان العُماني الطازج والتونة الصفراء الزعانف والماكريل لمشترين متميزين في الإمارات وقطر والسعودية."
      ),
      image: "/assets/generated/portfolio-seafood-export.dim_600x400.jpg",
    },
    {
      name: t(
        "Muscat Seafood Cold-Chain Distribution",
        "توزيع المأكولات البحرية بالسلسلة الباردة في مسقط"
      ),
      sector: "Seafood" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Set up a temperature-controlled distribution network supplying squid, cuttlefish, mussels, and clams to supermarkets and restaurants across Muscat.",
        "إنشاء شبكة توزيع بدرجة حرارة متحكم بها لتوريد الحبار والسبيط وبلح البحر وحلزون البحر للسوبرماركت والمطاعم في مسقط."
      ),
      image: "/assets/generated/portfolio-seafood-coldchain.dim_600x400.jpg",
    },
    {
      name: t(
        "Integrated Poultry Supply — Oman Retailers",
        "توريد الدواجن المتكامل — تجار التجزئة في عُمان"
      ),
      sector: "Poultry" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Long-term supply agreement delivering graded whole chicken (800g, 1000g, 1100g classes) and fresh eggs to leading Omani supermarket chains.",
        "اتفاقية توريد طويلة الأمد لتسليم الدجاج الكامل المصنف (فئات 800 جرام، 1000 جرام، 1100 جرام) والبيض الطازج لسلاسل السوبرماركت الرائدة في عُمان."
      ),
      image: "/assets/generated/portfolio-poultry-supply.dim_600x400.jpg",
    },
    {
      name: t(
        "Poultry & Egg Distribution — Sohar Region",
        "توزيع الدواجن والبيض — منطقة صحار"
      ),
      sector: "Poultry" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Established reliable weekly delivery cycles for standardised chicken cuts and free-range eggs to food service businesses and hotels in Sohar.",
        "إنشاء دورات تسليم أسبوعية موثوقة لقطع الدجاج المعيارية والبيض المرعوي لشركات الخدمات الغذائية والفنادق في صحار."
      ),
      image: "/assets/generated/portfolio-poultry-sohar.dim_600x400.jpg",
    },
    {
      name: t(
        "Muscat Commercial Solar Rooftop Installation",
        "تركيب الطاقة الشمسية التجارية على الأسطح في مسقط"
      ),
      sector: "Solar" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Supplied and commissioned a 500 kW rooftop solar power generation system for a large commercial warehouse complex in Al Rusayl Industrial Estate.",
        "توريد وتشغيل نظام توليد طاقة شمسية على السطح بقدرة 500 كيلوواط لمجمع مستودعات تجاري كبير في المنطقة الصناعية بالرسيل."
      ),
      image: "/assets/generated/portfolio-solar-rooftop.dim_600x400.jpg",
    },
    {
      name: t(
        "Commercial Tyre Supply — Sohar Industrial Zone",
        "توريد الإطارات التجارية — المنطقة الصناعية بصحار"
      ),
      sector: "Tyres" as PortfolioFilter,
      year: "2024",
      desc: t(
        "Long-term supply contract for truck and heavy-vehicle tyres to multiple logistics and construction companies operating in Sohar Free Zone and Port of Sohar.",
        "عقد توريد طويل الأمد لإطارات الشاحنات والمركبات الثقيلة لعدة شركات لوجستية وإنشائية تعمل في المنطقة الحرة بصحار وميناء صحار."
      ),
      image: "/assets/generated/portfolio-tyres-sohar.dim_600x400.jpg",
    },
    {
      name: t(
        "Industrial Adhesives & Sealants — Muscat Construction Projects",
        "المواد اللاصقة والعوازل الصناعية — مشاريع البناء في مسقط"
      ),
      sector: "Tyres" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Supplied structural adhesives, polyurethane sealants, and specialty bonding compounds to three major construction contractors for Muscat commercial and residential developments.",
        "توريد مواد لاصقة هيكلية وعوازل بولي يوريثان ومركبات ربط متخصصة لثلاثة مقاولي بناء رئيسيين في مشاريع مسقط التجارية والسكنية."
      ),
      image: "/assets/generated/portfolio-adhesives-muscat.dim_600x400.jpg",
    },
    {
      name: t(
        "Solar Water Heating — Residential Development",
        "تسخين المياه بالطاقة الشمسية — المشروع السكني"
      ),
      sector: "Solar" as PortfolioFilter,
      year: "2023",
      desc: t(
        "Delivered and installed solar heating and domestic hot water systems across 120 villas in a new Muscat residential development, reducing energy costs by 65%.",
        "تسليم وتركيب أنظمة التسخين الشمسي والمياه الساخنة المنزلية في 120 فيلا في مشروع سكني جديد بمسقط، مما أدى إلى تخفيض تكاليف الطاقة بنسبة 65٪."
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
    All: t("All", "الكل"),
    Solar: t("Solar", "شمسية"),
    Seafood: t("Seafood", "مأكولات بحرية"),
    Poultry: t("Poultry", "دواجن"),
    Tyres: t("Tyres", "إطارات"),
    Construction: t("Construction", "بناء"),
    Agriculture: t("Agriculture", "زراعة"),
    Industrial: t("Industrial", "صناعة"),
    Trading: t("Trading", "تجارة"),
    Manpower: t("Manpower", "قوى عاملة"),
  };
  const filtered = (
    filter === "All" ? projects : projects.filter((p) => p.sector === filter)
  )
    .slice()
    .sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <div>
      <PageHero
        title={t("Our Portfolio", "محفظتنا")}
        subtitle={t(
          "Showcasing completed projects across solar energy, seafood & poultry, construction, industrial, and trading sectors",
          "عرض المشاريع المنجزة عبر قطاعات الطاقة الشمسية والمأكولات البحرية والدواجن والبناء والصناعة والتجارة"
        )}
        image="/assets/generated/page-portfolio-hero.dim_1400x600.jpg"
        breadcrumb={t("Portfolio", "المحفظة")}
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
                "لا توجد مشاريع في هذه الفئة بعد."
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
              {t("Coming Soon", "قريباً")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-outline">
              {t("Upcoming Projects", "المشاريع القادمة")}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
            <p className="text-white/70 mt-4 max-w-2xl mx-auto text-base leading-relaxed text-outline">
              {t(
                "Projects currently in planning or execution phase — watch this space for updates.",
                "مشاريع في مرحلة التخطيط أو التنفيذ — تابعونا للتحديثات."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: t(
                  "Large-Scale Solar Farm — South Oman",
                  "مزرعة طاقة شمسية واسعة — جنوب عُمان"
                ),
                sector: t("Solar", "شمسية"),
                eta: "Q3 2025",
                desc: t(
                  "5 MW ground-mounted solar power generation plant with battery energy storage for an industrial client in the South Oman region. Engineering and procurement phase underway.",
                  "محطة توليد طاقة شمسية أرضية بقدرة 5 ميجاواط مع تخزين طاقة البطاريات لعميل صناعي في جنوب عُمان. مرحلة الهندسة والمشتريات جارية."
                ),
                icon: Zap,
                color: "text-yellow-400",
                bg: "bg-yellow-400/10 border-yellow-400/30",
              },
              {
                name: t(
                  "Salmon & Tuna Cold-Chain Export to EU",
                  "تصدير السلمون والتونة بالسلسلة الباردة إلى أوروبا"
                ),
                sector: t("Seafood", "مأكولات بحرية"),
                eta: "Q4 2025",
                desc: t(
                  "Establishing an export pipeline for premium Omani and Indian Ocean salmon and bluefin tuna to European buyers, including compliance with EU food safety standards.",
                  "إنشاء مسار تصدير لسلمون عُماني متميز وتونة زعنفة زرقاء من المحيط الهندي لمشترين أوروبيين، بما يتوافق مع معايير سلامة الغذاء الأوروبية."
                ),
                icon: Globe,
                color: "text-blue-300",
                bg: "bg-blue-300/10 border-blue-300/30",
              },
              {
                name: t(
                  "Poultry Processing Facility Partnership",
                  "شراكة منشأة معالجة الدواجن"
                ),
                sector: t("Poultry", "دواجن"),
                eta: "Q1 2026",
                desc: t(
                  "Strategic partnership with a licensed Omani poultry processor to establish a grading, packaging, and cold-storage facility for chicken and egg distribution across the GCC.",
                  "شراكة استراتيجية مع معالج دواجن عُماني مرخص لإنشاء منشأة تصنيف وتغليف وتخزين بارد لتوزيع الدجاج والبيض عبر دول الخليج."
                ),
                icon: Wheat,
                color: "text-amber-300",
                bg: "bg-amber-300/10 border-amber-300/30",
              },
              {
                name: t(
                  "Solar Energy Storage Systems — Commercial Rollout",
                  "أنظمة تخزين الطاقة الشمسية — الطرح التجاري"
                ),
                sector: t("Solar", "شمسية"),
                eta: "Q2 2026",
                desc: t(
                  "Rollout of modular lithium battery storage systems paired with solar installations across commercial and industrial clients in Muscat and Sohar.",
                  "طرح أنظمة تخزين بطاريات ليثيوم معيارية مقترنة بتركيبات الطاقة الشمسية لدى العملاء التجاريين والصناعيين في مسقط وصحار."
                ),
                icon: Zap,
                color: "text-yellow-400",
                bg: "bg-yellow-400/10 border-yellow-400/30",
              },
              {
                name: t(
                  "Seafood Distribution Hub — Muscat Port",
                  "مركز توزيع المأكولات البحرية — ميناء مسقط"
                ),
                sector: t("Seafood", "مأكولات بحرية"),
                eta: "Q3 2026",
                desc: t(
                  "Development of a dedicated seafood import, grading, and distribution hub at Muscat port to streamline shrimp, squid, and fish supply to hotels, restaurants, and retailers.",
                  "تطوير مركز متخصص لاستيراد وتصنيف وتوزيع المأكولات البحرية في ميناء مسقط لتبسيط توريد الروبيان والحبار والأسماك للفنادق والمطاعم والتجزئة."
                ),
                icon: Globe,
                color: "text-blue-300",
                bg: "bg-blue-300/10 border-blue-300/30",
              },
              {
                name: t(
                  "Integrated Poultry & Seafood FMCG Export Program",
                  "برنامج تصدير الدواجن والمأكولات البحرية المتكامل"
                ),
                sector: t("Poultry", "دواجن"),
                eta: "Q4 2026",
                desc: t(
                  "Combined FMCG export program targeting GCC and East African markets — bundling graded chicken, eggs, and certified frozen seafood under a single RAYAT-managed supply chain.",
                  "برنامج تصدير سلع استهلاكية مشترك يستهدف أسواق الخليج وشرق أفريقيا — يجمع الدجاج المصنف والبيض والمأكولات البحرية المجمدة المعتمدة في سلسلة إمداد واحدة تديرها رايات."
                ),
                icon: Wheat,
                color: "text-amber-300",
                bg: "bg-amber-300/10 border-amber-300/30",
              },
              {
                name: t(
                  "Gulf-Wide Tyre & Adhesives Distribution Network",
                  "شبكة توزيع الإطارات والمواد اللاصقة الخليجية"
                ),
                sector: t("Tyres", "إطارات"),
                eta: "Q2 2026",
                desc: t(
                  "Establishing a regional distribution hub in Muscat to supply premium automotive and industrial tyres plus construction-grade adhesives and sealants to dealers and contractors across Oman, UAE, and Qatar.",
                  "إنشاء مركز توزيع إقليمي في مسقط لتوريد إطارات سيارات وصناعية متميزة ومواد لاصقة وعوازل درجة البناء للوكلاء والمقاولين في عُمان والإمارات وقطر."
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
                        ? t("In Progress", "جارٍ")
                        : i < 4
                          ? t("Planning", "تخطيط")
                          : t("Scoping", "استكشاف")}
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
                label: t("Projects Completed", "مشاريع مكتملة"),
              },
              {
                value: "OMR 5M+",
                label: t("Value Delivered", "قيمة محققة"),
              },
              {
                value: "8+",
                label: t("Years Active", "سنوات نشاط"),
              },
              {
                value: "30+",
                label: t("Happy Clients", "عملاء راضون"),
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
              "لنعمل معًا في مشروعك القادم"
            )}
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t(
              "Whether it's construction supply, manpower, or trading — RAYAT delivers results you can count on.",
              "سواء كان إمداد إنشاءات أو عمالة أو تجارة — رايات تحقق النتائج التي يمكنك الاعتماد عليها."
            )}
          </p>
          <button
            type="button"
            data-ocid="portfolio.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-teal-dark transition-colors shadow-lg"
          >
            {t("Discuss Your Project", "ناقش مشروعك")}
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
        "المؤسس والمدير العام"
      ),
      bio: t(
        "With over 20 years of experience in Oman's industrial sector, Abdullah founded RAYAT with a vision to build a world-class trading and industrial company. He leads the company's strategic direction and key client relationships.",
        "بخبرة تمتد لأكثر من 20 عاماً في القطاع الصناعي العُماني، أسّس عبدالله رايات برؤية لبناء شركة تجارة وصناعة عالمية المستوى. يقود الاتجاه الاستراتيجي للشركة وعلاقات العملاء الرئيسية."
      ),
      color: "bg-brand-teal text-white",
    },
    {
      initials: "MK",
      name: "Mohammed Al-Khalifa",
      title: t("Deputy Managing Director", "نائب المدير العام"),
      bio: t(
        "Mohammed brings 15 years of commercial trading expertise to RAYAT. He oversees the company's trading operations, supplier relations, and international business development partnerships.",
        "يضيف محمد 15 عاماً من الخبرة في التجارة التجارية لرايات. يشرف على العمليات التجارية للشركة وعلاقات الموردين وشراكات تطوير الأعمال الدولية."
      ),
      color: "bg-brand-teal-dark text-white",
    },
    {
      initials: "PS",
      name: "Priya Sharma",
      title: t("Head of Operations", "رئيسة العمليات"),
      bio: t(
        "Priya manages day-to-day operations across all service lines, ensuring seamless delivery for clients. Her expertise in logistics and process optimization has significantly improved our service turnaround times.",
        "تدير بريا العمليات اليومية عبر جميع خطوط الخدمة، مما يضمن التسليم السلس للعملاء. أدت خبرتها في اللوجستيات وتحسين العمليات إلى تحسين ملحوظ في أوقات تسليم الخدمات."
      ),
      color: "bg-brand-terracotta text-white",
    },
    {
      initials: "TH",
      name: "Tariq Hassan",
      title: t(
        "Business Development Manager",
        "مدير تطوير الأعمال"
      ),
      bio: t(
        "Tariq leads RAYAT's growth initiatives, with a focus on expanding manpower services and forging new partnerships in the GCC market. He has brought over 20 new enterprise clients to RAYAT in the past two years.",
        "يقود طارق مبادرات نمو رايات، مع التركيز على توسيع خدمات القوى العاملة وإقامة شراكات جديدة في سوق الخليج. جلب أكثر من 20 عميلاً مؤسسياً جديداً لرايات في العامين الماضيين."
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
      title: t("Integrity", "النزاهة"),
      desc: t(
        "We operate with full transparency in all business dealings, honouring every commitment we make.",
        "نعمل بشفافية كاملة في جميع المعاملات التجارية، نفي بكل التزام نقدمه."
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Star,
      title: t("Excellence", "التميز"),
      desc: t(
        "Every service, every delivery, every interaction — we hold ourselves to the highest possible standard.",
        "كل خدمة، كل تسليم، كل تفاعل — نمسك أنفسنا بأعلى المعايير الممكنة."
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Handshake,
      title: t("Partnership", "الشراكة"),
      desc: t(
        "We view our clients and suppliers as long-term partners, not just transactions.",
        "ننظر إلى عملائنا وموردينا كشركاء على المدى البعيد، وليس مجرد معاملات."
      ),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
    {
      icon: Lightbulb,
      title: t("Innovation", "الابتكار"),
      desc: t(
        "We continuously seek smarter ways to source, supply, and serve in an evolving market.",
        "نسعى باستمرار إلى طرق أذكى للتوريد والتزويد والخدمة في سوق متطور."
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
        title={t("Our Team", "فريقنا")}
        subtitle={t(
          "Meet the leadership and management behind RAYAT's success",
          "تعرف على القيادة والإدارة وراء نجاح رايات"
        )}
        image="/assets/generated/page-team-hero.dim_1400x600.jpg"
        breadcrumb={t("Our Team", "فريقنا")}
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
              {t("Leadership", "القيادة")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Meet Our Leadership Team",
                "تعرف على فريق القيادة لدينا"
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
              {t("What Drives Us", "ما يحفزنا")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Our Values", "قيمنا")}
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
              {t("Our Culture", "ثقافتنا")}
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
              {t(
                "At RAYAT, we believe that a company is only as strong as the people behind it. We foster a culture of respect, continuous learning, and cross-functional collaboration. Every team member — from operations to business development — is empowered to make decisions that benefit our clients. We celebrate diversity and bring together talent from across the globe to serve Oman's growing economy.",
                "في رايات، نؤمن بأن الشركة بقوة الأشخاص الذين يقفون وراءها. نحن نرعى ثقافة الاحترام والتعلم المستمر والتعاون بين الإدارات. كل عضو في الفريق — من العمليات إلى تطوير الأعمال — مخوّل باتخاذ قرارات تفيد عملاءنا. نحن نحتفل بالتنوع ونجمع المواهب من مختلف أنحاء العالم لخدمة الاقتصاد العُماني المتنامي."
              )}
            </p>
            <button
              type="button"
              data-ocid="team.cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              {t("Join Our Team", "انضم إلى فريقنا")}
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
        "رايات توسع خدمات القوى العاملة لتشمل قطاع الضيافة"
      ),
      date: t("January 2026", "يناير 2026"),
      month: t("JAN", "يناير"),
      year: "2026",
      excerpt: t(
        "RAYAT Industries SPC has officially expanded its manpower division to include dedicated hospitality and service industry placements. The move follows growing demand from Oman's hospitality sector, which is experiencing rapid growth ahead of major tourism initiatives. RAYAT will now supply hotel staff, housekeeping teams, and food service personnel to hotels and resorts across the Sultanate.",
        "وسّعت رايات للصناعات رسمياً قسم القوى العاملة لديها ليشمل توظيفاً متخصصاً في قطاع الضيافة والخدمات. جاء ذلك استجابةً للطلب المتزايد من قطاع الضيافة العُماني الذي يشهد نمواً متسارعاً. ستوفر رايات طاقم الفنادق وفرق التدبير المنزلي وموظفي خدمة الطعام للفنادق والمنتجعات."
      ),
      category: t("Company News", "أخبار الشركة"),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      title: t(
        "New Partnership with South Asian Labour Agencies Announced",
        "الإعلان عن شراكة جديدة مع وكالات العمالة في جنوب آسيا"
      ),
      date: t("December 2025", "ديسمبر 2025"),
      month: t("DEC", "ديسمبر"),
      year: "2025",
      excerpt: t(
        "RAYAT has signed formal partnership agreements with five major recruitment agencies in India, Bangladesh, and Nepal. These partnerships will significantly expand our candidate pool and reduce placement timelines for clients requiring large-scale workforce deployments. The agreements cover all worker categories from skilled trades to domestic workers.",
        "وقّعت رايات اتفاقيات شراكة رسمية مع خمس وكالات توظيف كبرى في الهند وبنغلاديش ونيبال. ستوسع هذه الشراكات تجمع المرشحين لدينا وتقلل مواعيد التوظيف. تغطي الاتفاقيات جميع فئات العمال من المهن المهارية إلى العمالة المنزلية."
      ),
      category: t("Partnerships", "الشراكات"),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      title: t(
        "RAYAT Wins Preferred Supplier Status at Major Bahrain Construction Project",
        "رايات تحصل على وضع المورد المفضل في مشروع بناء كبير"
      ),
      date: t("November 2025", "نوفمبر 2025"),
      month: t("NOV", "نوفمبر"),
      year: "2025",
      excerpt: t(
        "Following a competitive tender process, RAYAT Industries SPC has been awarded preferred supplier status for a landmark infrastructure development in Oman's Northern Governorate. The multi-year supply contract covers structural steel, aggregates, and MEP materials valued at over OMR 2 million. This represents RAYAT's largest single construction supply contract to date.",
        "بعد عملية مناقصة تنافسية، مُنحت رايات للصناعات وضع المورد المفضل لتطوير بنية تحتية بارزة في المحافظة الشمالية بعُمان. يغطي عقد التوريد متعدد السنوات الفولاذ الهيكلي والركام ومواد الميكانيكا والكهرباء بقيمة تتجاوز مليوني ريال عُماني."
      ),
      category: t("Awards", "الجوائز"),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      title: t(
        "Agriculture Trading Volume Grows 40% in FY2025",
        "حجم تجارة الزراعة ينمو 40٪ في السنة المالية 2025"
      ),
      date: t("October 2025", "أكتوبر 2025"),
      month: t("OCT", "أكتوبر"),
      year: "2025",
      excerpt: t(
        "RAYAT's agriculture and food trading division has recorded a 40% year-on-year increase in trading volume for FY2025. Growth was driven by expanded grain import programs and new contracts with Omani food manufacturers. The company plans to further invest in cold-chain logistics infrastructure to support fresh produce trading in 2026.",
        "سجّل قسم التجارة الزراعية والغذائية في رايات زيادة بنسبة 40٪ سنوياً في حجم التداول للسنة المالية 2025. وكان النمو مدفوعاً ببرامج استيراد الحبوب الموسعة وعقود جديدة مع المصنعين الغذائيين العُمانيين."
      ),
      category: t("Financial", "المالية"),
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      title: t(
        "LMRA Compliance Certification Renewed for 2025–2026",
        "تجديد شهادة الامتثال لقانون العمل للفترة 2025-2026"
      ),
      date: t("September 2025", "سبتمبر 2025"),
      month: t("SEP", "سبتمبر"),
      year: "2025",
      excerpt: t(
        "RAYAT Industries SPC has successfully renewed its Oman Labor Law compliance certification for the 2025–2026 period. This certification confirms our commitment to ethical recruitment practices, fair employment terms, and full compliance with Omani labour law — giving our clients complete confidence in every placement we make.",
        "جدّدت رايات للصناعات بنجاح شهادة الامتثال لقانون العمل العُماني للفترة 2025-2026. تؤكد هذه الشهادة التزامنا بممارسات التوظيف الأخلاقية وشروط العمل العادلة والامتثال الكامل لقانون العمل العُماني."
      ),
      category: t("Compliance", "الامتثال"),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
    {
      title: t(
        "Company Celebrates 10th Anniversary in Bahrain Market",
        "الشركة تحتفل بالذكرى السنوية العاشرة في السوق العُمانية"
      ),
      date: t("August 2025", "أغسطس 2025"),
      month: t("AUG", "أغسطس"),
      year: "2025",
      excerpt: t(
        "RAYAT Industries SPC marked its 10th anniversary in the Oman market with a gala dinner for clients, partners, and employees. The milestone reflects a decade of growth from a small trading enterprise to a diversified company spanning industrial supply, agriculture, logistics, and trading services. The Managing Director pledged continued investment in Oman's economic future.",
        "احتفلت رايات للصناعات بذكراها السنوية العاشرة في السوق العُمانية بحفل عشاء للعملاء والشركاء والموظفين. يعكس هذا الإنجاز عقداً من النمو من مشروع تجاري صغير إلى شركة متنوعة تمتد عبر الإمدادات الصناعية والزراعة واللوجستيات والخدمات التجارية."
      ),
      category: t("Milestone", "الإنجازات"),
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
        title={t("News & Updates", "الأخبار والتحديثات")}
        subtitle={t(
          "Latest announcements, milestones, and industry updates from RAYAT",
          "أحدث الإعلانات والإنجازات وتحديثات الصناعة من رايات"
        )}
        image="/assets/generated/page-news-hero.dim_1400x600.jpg"
        breadcrumb={t("News & Updates", "الأخبار والتحديثات")}
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
              {t("Latest", "الأحدث")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Recent News & Announcements",
                "آخر الأخبار والإعلانات"
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
                    {t("Read More", "اقرأ المزيد")}{" "}
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
              {t("Stay Updated", "ابق على اطلاع")}
            </h3>
            <p className="text-white/75 mb-8 leading-relaxed">
              {t(
                "Subscribe to receive RAYAT news, industry updates, and market insights directly to your inbox.",
                "اشترك لتصلك أخبار رايات وتحديثات الصناعة ورؤى السوق مباشرةً إلى بريدك الإلكتروني."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t(
                  "Enter your email address",
                  "أدخل بريدك الإلكتروني"
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
                      "تم الاشتراك! سنبقيك على اطلاع."
                    ),
                  );
                  setEmail("");
                }}
                className="bg-brand-gold text-gray-900 font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                {t("Subscribe", "اشترك")}
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
              "هل ترغب في معرفة المزيد عن رايات؟"
            )}
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t(
              "Explore our services, portfolio, or get in touch with our team directly.",
              "استكشف خدماتنا ومحفظتنا، أو تواصل مع فريقنا مباشرةً."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              data-ocid="news.services_cta.secondary_button"
              onClick={() => navigate("services")}
              className="inline-flex items-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
            >
              {t("View Our Services", "استعرض خدماتنا")}
            </button>
            <button
              type="button"
              data-ocid="news.contact_cta.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
            >
              {t("Contact Us", "تواصل معنا")}
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
          "تم إرسال الرسالة! سنعود إليك قريباً."
        ),
      );
    },
    onError: () => {
      toast.error(
        t(
          "Failed to send your message. Please try again.",
          "تعذّر إرسال رسالتك. يرجى المحاولة مرة أخرى."
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
          "يرجى ملء جميع الحقول."
        ),
      );
      return;
    }
    mutation.mutate({ name, email, message });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
      <h3 className="font-display text-xl font-bold text-foreground mb-6">
        {t("Send Us a Message", "أرسل لنا رسالة")}
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
              {t("Message Sent!", "تم إرسال الرسالة!")}
            </h4>
            <p className="text-muted-foreground mb-6">
              {t(
                "Thank you for reaching out. Our team will contact you shortly.",
                "شكراً للتواصل معنا. سيتصل بك فريقنا قريباً."
              )}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-brand-teal font-semibold hover:underline"
            >
              {t("Send another message", "إرسال رسالة أخرى")}
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
                {t("Full Name", "الاسم الكامل")}
              </Label>
              <Input
                id="contact-name"
                data-ocid="contact.name.input"
                placeholder={t("Your full name", "اسمك الكامل")}
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
                {t("Email Address", "البريد الإلكتروني")}
              </Label>
              <Input
                id="contact-email"
                data-ocid="contact.email.input"
                type="email"
                placeholder={t(
                  "you@example.com",
                  "بريدك@مثال.com"
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
                {t("Message", "الرسالة")}
              </Label>
              <Textarea
                id="contact-message"
                data-ocid="contact.message.textarea"
                placeholder={t(
                  "How can we help you?",
                  "كيف يمكننا مساعدتك؟"
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
                  "حدث خطأ ما. يرجى المحاولة مرة أخرى."
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
                  {t("Sending...", "جارٍ الإرسال...")}
                </>
              ) : (
                t("Send Message", "إرسال الرسالة")
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
              RAYAT Industries SPC / {t("Contact", "تواصل")}
            </p>
            <h1 className="font-display text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-shadow-lg">
              {t("Get In Touch", "تواصل معنا")}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              {t(
                "We're here to help. Reach out to discuss requirements, request a quote, or simply learn more about RAYAT.",
                "نحن هنا للمساعدة. تواصل معنا لمناقشة المتطلبات أو طلب عرض أسعار أو معرفة المزيد عن رايات."
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
                  {t("Contact Information", "معلومات التواصل")}
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: MapPin,
                      label: t("Address", "العنوان"),
                      content: t(
                        "Way 4521, Building 3, Al Ghubra North, Muscat 133, Sultanate of Oman",
                        "طريق 4521، مبنى 3، الغبرة شمال، مسقط 133، سلطنة عُمان"
                      ),
                      href: undefined as string | undefined,
                    },
                    {
                      icon: Mail,
                      label: t("Email", "البريد الإلكتروني"),
                      content: "info@rayatindustries.com",
                      href: "mailto:info@rayatindustries.com",
                    },
                    {
                      icon: Phone,
                      label: t("Phone", "الهاتف"),
                      content: "+968 2400 0000",
                      href: "tel:+96824000000",
                    },
                    {
                      icon: MessageCircle,
                      label: t("WhatsApp", "واتساب"),
                      content: "+968 2400 0000",
                      href: "https://wa.me/96824000000",
                    },
                    {
                      icon: Clock,
                      label: t("Office Hours", "ساعات العمل"),
                      content: t(
                        "Sunday–Thursday, 8:00 AM – 5:00 PM",
                        "الأحد–الخميس، 8:00 ص – 5:00 م"
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
                  {t("Company Registration", "تسجيل الشركة")}
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    {t(
                      "Registered with the Ministry of Commerce, Industry and Investment Promotion, Sultanate of Oman",
                      "مسجلة لدى وزارة التجارة والصناعة وترويج الاستثمار، سلطنة عُمان"
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      {t("CR No.:", "رقم السجل التجاري:")}
                    </span>{" "}
                    Oman CR Registration
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      {t(
                        "LMRA Licensed:",
                        "مرخص من هيئة سوق العمل:"
                      )}
                    </span>{" "}
                    {t(
                      "Labour & Manpower Recruitment",
                      "توظيف العمالة والقوى البشرية"
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
      title: t("Solar Division", "قسم الطاقة الشمسية"),
      description: t(
        "Oman's trusted solar energy trading partner — solar panels, complete PV systems, energy storage, solar heating, and all components for clean energy projects.",
        "شريككم الموثوق في عُمان لتجارة الطاقة الشمسية — ألواح شمسية وأنظمة كهروضوئية متكاملة وتخزين الطاقة والتدفئة الشمسية وجميع مكونات مشاريع الطاقة النظيفة."
      ),
      image: "/assets/generated/division-solar-hero.dim_1400x600.jpg",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      page: "solar" as Page,
    },
    {
      title: t("FMCG Division", "قسم السلع الاستهلاكية"),
      description: t(
        "Supplying the Gulf's finest retail channels with food, beverages, household products, and personal care items from trusted global manufacturers.",
        "نزوّد أرقى قنوات التجزئة في الخليج بالأغذية والمشروبات والمنتجات المنزلية ومستلزمات العناية الشخصية من مُصنّعين عالميين موثوقين."
      ),
      image: "/assets/generated/fmcg-hero.dim_1600x900.jpg",
      icon: ShoppingBag,
      color: "text-green-700",
      bg: "bg-green-50",
      page: "fmcg" as Page,
    },
    {
      title: t("Networking Division", "قسم الشبكات"),
      description: t(
        "Delivering cutting-edge networking equipment, structured cabling, telecom hardware, and IT infrastructure solutions across the region.",
        "نوفّر أحدث معدات الشبكات والكابلات المنظمة وأجهزة الاتصالات وحلول البنية التحتية لتقنية المعلومات في جميع أنحاء المنطقة."
      ),
      image: "/assets/generated/division-networking-hero.dim_1400x600.jpg",
      icon: Network,
      color: "text-blue-700",
      bg: "bg-blue-50",
      page: "networking" as Page,
    },
    {
      title: t("Construction Materials", "مواد البناء"),
      description: t(
        "The Raw Materials Powering Gulf Megaprojects — reinforcing steel, aluminum, copper, pipes and more for contractors and developers.",
        "المواد الخام التي تُحرّك المشاريع العملاقة في الخليج — حديد التسليح والألمنيوم والنحاس والأنابيب والمزيد للمقاولين والمطورين."
      ),
      image:
        "/assets/generated/division-construction-materials-hero.dim_1400x600.jpg",
      icon: Building2,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
      page: "construction-materials" as Page,
    },
    {
      title: t("Safety & PPE / Metals", "السلامة والمعادن"),
      description: t(
        "Comprehensive construction safety & raw materials from helmet to boot, meeting EN/ANSI/OSHA standards for Gulf megaprojects.",
        "مجموعة شاملة من معدات السلامة والمواد الخام للبناء من الخوذة إلى الحذاء، تستوفي معايير EN/ANSI/OSHA للمشاريع العملاقة في الخليج."
      ),
      image: "/assets/generated/division-safety-ppe-hero.dim_1400x600.jpg",
      icon: ShieldCheck,
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
      page: "safety-ppe" as Page,
    },
    {
      title: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة"),
      description: t(
        "Premium automotive, truck, and industrial tyres alongside high-performance adhesives, sealants, and bonding compounds for construction and manufacturing.",
        "إطارات سيارات وشاحنات وصناعية متميزة إلى جانب مواد لاصقة وعوازل ومركبات لاصقة عالية الأداء للبناء والتصنيع."
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
      label: t("Products Traded", "منتج مُتاجَر"),
    },
    {
      value: "15+",
      label: t("Countries Served", "دولة نخدمها"),
    },
    {
      value: "20+",
      label: t("Years Gulf Experience", "سنوات خبرة في الخليج"),
    },
    {
      value: "ISO",
      label: t("9001 Compliant", "متوافق مع 9001"),
    },
  ];

  return (
    <div>
      <PageHero
        title={t(
          "Our Trading Divisions",
          "أقسام التداول لدينا"
        )}
        subtitle={t(
          "Trusted trading partner across FMCG, Networking & Construction Materials. Building partnerships. Delivering excellence.",
          "شريك تجاري موثوق في السلع الاستهلاكية والشبكات ومواد البناء. بناء شراكات. تحقيق التميز."
        )}
        image="/assets/generated/trading-divisions-overview.dim_1400x600.jpg"
        breadcrumb={t("Trading Divisions", "أقسام التداول")}
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
                "عن عملياتنا التجارية"
              )}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t(
                "Delivering Excellence in Every Trade",
                "نحقق التميز في كل صفقة"
              )}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
              {t(
                "RAYAT Industries SPC is a diversified trading conglomerate with deep roots in the Gulf region. Founded with the vision of bridging global markets with local expertise, we have grown to become a trusted name across Solar Energy, FMCG (Seafood & Poultry), Networking infrastructure, and Construction materials.",
                "رايات للصناعات ش.ش.ف هي مجموعة تجارية متنوعة ذات جذور عميقة في منطقة الخليج. تأسست برؤية ربط الأسواق العالمية بالخبرة المحلية، وقد أصبحنا اسماً موثوقاً في الطاقة الشمسية والسلع الاستهلاكية (المأكولات البحرية والدواجن) والبنية التحتية للشبكات ومواد البناء."
              )}
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t(
                "Founded in Oman with a vision to reshape Gulf commerce. Building trusted partnerships across the Gulf since 2004, our trading divisions serve hypermarkets, data centers, mega construction projects, and industrial facilities with uncompromising quality and reliability.",
                "تأسست في عُمان برؤية إعادة تشكيل التجارة في الخليج. ومنذ عام 2004 نبني شراكات موثوقة في جميع أنحاء الخليج، حيث تخدم أقسامنا التجارية الأسواق الكبرى ومراكز البيانات ومشاريع البناء العملاقة والمرافق الصناعية بجودة وموثوقية لا تقبل المساومة."
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
              {t("Our Divisions", "أقسامنا")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Explore Our Trading Divisions",
                "استكشف أقسامنا التجارية"
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
                        {t("Trading Division", "قسم تجاري")}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-xl mb-3 leading-snug">
                      {div.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {div.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-brand-teal font-semibold text-sm group-hover:gap-2.5 transition-all">
                      {t("Explore Division", "استكشف القسم")}{" "}
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
              "هل أنت مستعد للشراكة مع رايات للتجارة؟"
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Contact our trading team to discuss product availability, pricing, and partnership opportunities across our four divisions.",
              "تواصل مع فريقنا التجاري لمناقشة توافر المنتجات والأسعار وفرص الشراكة عبر أقسامنا الأربعة."
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
              "تواصل مع فريقنا التجاري"
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
      title: t("Seafood & Poultry", "المأكولات البحرية والدواجن"),
      desc: t(
        "Premium fresh and frozen seafood: Shrimp, Tuna, Salmon, Mackerel, Squid, Cuttlefish, Mussels, Clams. Plus Poultry: Whole Chicken (1000g, 800g, 1100g sizes), Eggs.",
        "مأكولات بحرية طازجة ومجمدة متميزة: روبيان، تونة، سلمون، ماكريل، حبار، سبيط، بلح البحر، حلزون البحر. بالإضافة إلى الدواجن: دجاج كامل (أحجام 1000 جرام، 800 جرام، 1100 جرام)، بيض."
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Wheat,
      title: t("Food & Staples", "الأغذية والمواد الأساسية"),
      desc: t(
        "Rice, flour, sugar, cooking oils, pulses, spices, canned goods, and dry staples from global suppliers.",
        "أرز ودقيق وسكر وزيوت طهي وبقوليات وتوابل ومعلبات ومواد أساسية جافة من موردين عالميين."
      ),
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      icon: Package,
      title: t("Beverages", "المشروبات"),
      desc: t(
        "Juices, water, soft drinks, energy drinks, tea, coffee, and dairy beverages for retail and hospitality.",
        "عصائر ومياه ومشروبات غازية ومشروبات الطاقة والشاي والقهوة ومشروبات الألبان للبيع بالتجزئة والضيافة."
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Zap,
      title: t("Household Cleaning", "منظفات المنزل"),
      desc: t(
        "Detergents, fabric softeners, multi-surface cleaners, dishwashing products, and hygiene solutions.",
        "منظفات ومنعمات الأقمشة ومنظفات متعددة الأسطح ومنتجات غسل الأطباق وحلول النظافة الشخصية."
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Heart,
      title: t("Personal Care", "العناية الشخصية"),
      desc: t(
        "Shampoos, conditioners, body wash, skincare, oral care, and grooming products for all demographics.",
        "شامبو وبلسم وغسول الجسم والعناية بالبشرة والعناية بالفم ومنتجات العناية لجميع الفئات."
      ),
      color: "text-pink-700",
      bg: "bg-pink-50",
    },
    {
      icon: Star,
      title: t(
        "Snacks & Confectionery",
        "الوجبات الخفيفة والحلويات"
      ),
      desc: t(
        "Snacks, confectionery, frozen foods, dairy products, and impulse purchase categories.",
        "وجبات خفيفة وحلويات وأطعمة مجمدة ومنتجات الألبان وفئات الشراء العفوي."
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Users,
      title: t("Baby & Infant", "الأطفال والرضع"),
      desc: t(
        "Baby food, diapers, wipes, lotions, powders, and feeding accessories for infant care.",
        "أطعمة الأطفال وحفاضات ومناديل مبللة وكريمات وبودرة وملحقات التغذية للعناية بالرضع."
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  const whoWeServe = [
    {
      title: t(
        "Hypermarkets & Supermarkets",
        "الأسواق الكبرى والسوبرماركت"
      ),
      icon: ShoppingBag,
    },
    {
      title: t("Hotels & Hospitality", "الفنادق والضيافة"),
      icon: Hotel,
    },
    {
      title: t("Institutional Buyers", "المشترون المؤسسيون"),
      icon: Briefcase,
    },
    {
      title: t("Convenience Stores", "متاجر الراحة"),
      icon: Package,
    },
  ];

  return (
    <div>
      <PageHero
        title={t("FMCG Division", "قسم السلع الاستهلاكية")}
        subtitle={t(
          "Gulf's Trusted FMCG Trading Partner — Food, Beverages, Household & Personal Care",
          "شريك تجاري موثوق للسلع الاستهلاكية في الخليج — الغذاء والمشروبات والمنزل والعناية الشخصية"
        )}
        image="/assets/generated/fmcg-hero.dim_1600x900.jpg"
        breadcrumb={t("FMCG Division", "قسم السلع الاستهلاكية")}
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
                {t("Division Overview", "نظرة عامة على القسم")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Your Gulf FMCG Supply Partner",
                  "شريكك لتوريد السلع الاستهلاكية في الخليج"
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "Our FMCG division has built an extensive network of trusted manufacturers and distribution partners across the Gulf. We supply food, beverages, household cleaning products, and personal care items to hypermarkets, supermarkets, hotels, and institutional buyers. Our portfolio spans premium international brands and competitive value offerings.",
                  "قسمنا للسلع الاستهلاكية بنى شبكة واسعة من المصنعين الموثوقين وشركاء التوزيع في جميع أنحاء الخليج. نحن نوفر الأغذية والمشروبات ومنتجات تنظيف المنزل ومواد العناية الشخصية للأسواق الكبرى والسوبرماركت والفنادق والمشترون المؤسسيون. تشمل محفظتنا العلامات التجارية الدولية المتميزة والعروض التنافسية القيمة."
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From staple foods to premium personal care, we curate product ranges that meet the diverse demands of the Gulf's multicultural consumer base. Our logistics network ensures on-time delivery to 12+ countries across the MENA region.",
                  "من الأغذية الأساسية إلى العناية الشخصية المتميزة، نقوم بانتقاء مجموعات المنتجات التي تلبي الاحتياجات المتنوعة لقاعدة المستهلكين متعددي الثقافات في الخليج. تضمن شبكتنا اللوجستية التسليم في الوقت المحدد إلى أكثر من 12 دولة في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="fmcg.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("FMCG Enquiry", "استفسار السلع الاستهلاكية")}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="fmcg.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام")}
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
                    "دول الشرق الأوسط وشمال أفريقيا"
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
              {t("Featured Sector", "القطاع المميز")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Seafood & Poultry",
                "المأكولات البحرية والدواجن"
              )}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              {t(
                "Our major focus area — supplying premium quality seafood and poultry products across Oman and the Gulf.",
                "مجال تركيزنا الرئيسي — توريد منتجات المأكولات البحرية والدواجن عالية الجودة في جميع أنحاء عُمان والخليج."
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
                  {t("Seafood", "المأكولات البحرية")}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  t("Shrimp", "روبيان"),
                  t("Tuna", "تونة"),
                  t("Salmon", "سلمون"),
                  t("Mackerel", "ماكريل"),
                  t("Squid", "حبار"),
                  t("Cuttlefish", "سبيط"),
                  t("Mussels", "بلح البحر"),
                  t("Clams", "حلزون البحر"),
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
                  {t("Poultry", "الدواجن")}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  t("Chicken — 800g", "دجاج — 800 جرام"),
                  t("Chicken — 1000g", "دجاج — 1000 جرام"),
                  t("Chicken — 1100g", "دجاج — 1100 جرام"),
                  t("Eggs", "بيض"),
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
              {t("What We Supply", "ما نقدمه")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Product Categories", "فئات المنتجات")}
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
              {t("Our Clients", "عملاؤنا")}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {t("Who We Serve", "من نخدم")}
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
                "لماذا رايات للسلع الاستهلاكية؟"
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                t(
                  "15+ years building an extensive portfolio of trusted international and regional manufacturers",
                  "أكثر من 15 عاماً في بناء محفظة واسعة من المصنعين الدوليين والإقليميين الموثوقين"
                ),
                t(
                  "We bridge the gap between global producers and Gulf consumers with efficiency, speed, and uncompromising quality control",
                  "نسد الفجوة بين المنتجين العالميين والمستهلكين في الخليج بالكفاءة والسرعة ومراقبة الجودة التي لا تقبل المساومة"
                ),
                t(
                  "Direct relationships with mills and manufacturers ensure competitive pricing and consistent supply",
                  "العلاقات المباشرة مع المطاحن والمصنعين تضمن أسعاراً تنافسية وإمداداً مستمراً"
                ),
                t(
                  "Full logistics support with on-time delivery to 12+ MENA countries",
                  "دعم لوجستي كامل مع التسليم في الوقت المحدد إلى أكثر من 12 دولة في الشرق الأوسط وشمال أفريقيا"
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
                "تواصل مع فريق السلع الاستهلاكية لدينا للحصول على كتالوجات المنتجات والأسعار والتوافر."
              )}
            </p>
            <button
              type="button"
              data-ocid="fmcg.enquiry.primary_button"
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              {t("FMCG Enquiry", "استفسار السلع الاستهلاكية")}{" "}
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
      title: t("Network Switches", "مفاتيح الشبكة"),
      desc: t(
        "Layer 2 & Layer 3 managed switches from enterprise-grade manufacturers for data center and campus deployments.",
        "مفاتيح شبكة مُدارة من الطبقة 2 والطبقة 3 من مصنعين بمستوى المؤسسات لنشر مراكز البيانات والحرم الجامعي."
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Layers,
      title: t("Structured Cabling", "الكابلات المنظمة"),
      desc: t(
        "Cat6, Cat6A, Cat8 cables, patch panels, keystone jacks, cabinets, and complete structured cabling systems.",
        "كابلات Cat6 وCat6A وCat8 ولوحات التوصيل ومقابس كيستون والخزائن وأنظمة الكابلات المنظمة الكاملة."
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Zap,
      title: t("Fiber Optics", "الألياف البصرية"),
      desc: t(
        "Single-mode and multi-mode fiber optic cables, transceivers, media converters, and fiber distribution systems.",
        "كابلات الألياف البصرية أحادية الوضع ومتعددة الأوضاع والمستقبلات والمحولات وأنظمة توزيع الألياف."
      ),
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      icon: Wifi,
      title: t("Wireless / Wi-Fi", "اللاسلكي / واي فاي"),
      desc: t(
        "Indoor and outdoor Wi-Fi 6 & Wi-Fi 6E access points for high-density enterprise and industrial environments.",
        "نقاط وصول Wi-Fi 6 وWi-Fi 6E داخلية وخارجية للبيئات المؤسسية والصناعية عالية الكثافة."
      ),
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      icon: ShieldCheck,
      title: t("Network Security", "أمن الشبكات"),
      desc: t(
        "Firewalls, UTM appliances, VPN concentrators, and network access control systems for enterprise security.",
        "جدران الحماية وأجهزة UTM ومركزات VPN وأنظمة التحكم في الوصول إلى الشبكة لأمن المؤسسات."
      ),
      color: "text-brand-terracotta",
      bg: "bg-brand-terracotta/10",
    },
    {
      icon: Phone,
      title: t(
        "IP Telephony / VoIP",
        "الاتصالات الهاتفية IP / الصوت عبر IP"
      ),
      desc: t(
        "IP PBX systems, VoIP phones, DECT handsets, and unified communications infrastructure for businesses.",
        "أنظمة IP PBX وهواتف VoIP وهواتف DECT والبنية التحتية للاتصالات الموحدة للشركات."
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  const whoWeServe = [
    { title: t("Data Centers", "مراكز البيانات"), icon: Server },
    {
      title: t("Banking & Finance", "البنوك والتمويل"),
      icon: Briefcase,
    },
    {
      title: t("IT & Telecom", "تكنولوجيا المعلومات والاتصالات"),
      icon: Network,
    },
    {
      title: t("Hotels & Hospitality", "الفنادق والضيافة"),
      icon: Hotel,
    },
    {
      title: t(
        "Infrastructure Solutions",
        "حلول البنية التحتية"
      ),
      icon: Layers,
    },
  ];

  return (
    <div>
      <PageHero
        title={t("Networking Division", "قسم الشبكات")}
        subtitle={t(
          "Delivering cutting-edge IT & telecom infrastructure solutions across the Gulf",
          "تقديم حلول البنية التحتية لتكنولوجيا المعلومات والاتصالات المتطورة عبر الخليج"
        )}
        image="/assets/generated/division-networking-hero.dim_1400x600.jpg"
        breadcrumb={t("Networking Division", "قسم الشبكات")}
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
                {t("Division Overview", "نظرة عامة على القسم")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Gulf's Digital Infrastructure Partner",
                  "شريك البنية التحتية الرقمية للخليج"
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "As the Gulf's digital infrastructure rapidly expands, RAYAT's Networking division has become a key supplier of networking equipment, structured cabling solutions, telecom hardware, and IT infrastructure components. We serve systems integrators, telecom providers, and large enterprise clients with reliable, high-quality products.",
                  "مع التوسع السريع للبنية التحتية الرقمية في الخليج، أصبح قسم الشبكات في رايات مورداً رئيسياً لمعدات الشبكات وحلول الكابلات المنظمة ومعدات الاتصالات ومكونات البنية التحتية لتكنولوجيا المعلومات. نخدم مدمجي الأنظمة ومزودي الاتصالات وعملاء المؤسسات الكبار بمنتجات موثوقة وعالية الجودة."
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From structured cabling for greenfield developments to fiber optic solutions for carrier-grade networks, we offer a comprehensive portfolio of products backed by technical expertise and reliable after-sale support.",
                  "من الكابلات المنظمة للتطوير الجديد إلى حلول الألياف البصرية للشبكات بمستوى شركات الاتصالات، نقدم محفظة شاملة من المنتجات مدعومة بالخبرة الفنية ودعم ما بعد البيع الموثوق."
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
                    "احصل على الدعم الفني"
                  )}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="networking.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام")}
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
                  {t("9001 Certified", "9001 معتمد")}
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
              {t("Our Products", "منتجاتنا")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Product Lines", "خطوط المنتجات")}
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
              {t("Our Clients", "عملاؤنا")}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {t("Who We Serve", "من نخدم")}
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
              t("ISO 9001 Compliant", "متوافق مع ISO 9001"),
              t("EN / ANSI / OSHA", "EN / ANSI / OSHA"),
              t(
                "Mill-Certified Products",
                "منتجات معتمدة من المصنع"
              ),
              t(
                "Cross-Industry Expertise",
                "خبرة عبر الصناعات"
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
              "تبحث عن حلول الشبكات؟"
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Connect with our technical team for product specifications, availability, and project support.",
              "تواصل مع فريقنا الفني للحصول على مواصفات المنتجات والتوافر ودعم المشاريع."
            )}
          </p>
          <button
            type="button"
            data-ocid="networking.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Get Technical Support", "احصل على الدعم الفني")}{" "}
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
      title: t("Steel Products", "منتجات الصلب"),
      items: [
        t(
          "Deformed steel rebar (Grade 60/75), welded wire mesh, and reinforcing accessories for concrete structures.",
          "حديد تسليح مجدول (درجة 60/75)، شبكة لحام بالأسلاك، وملحقات تسليح للهياكل الخرسانية."
        ),
        t(
          "Structural steel, steel beams, H-beams, angle iron, flat bars, and steel plates for construction projects.",
          "صلب إنشائي، عوارض فولاذية، عوارض H، زوايا حديدية، قضبان مسطحة، وألواح فولاذية لمشاريع البناء."
        ),
      ],
      icon: Layers,
      color: "text-gray-700",
      bg: "bg-gray-100",
    },
    {
      title: t("Aluminum Profiles", "أقسام الألومنيوم"),
      items: [
        t(
          "Extruded aluminum sections, aluminum sheet, roofing, cladding, and architectural aluminum systems.",
          "أقسام ألومنيوم بثق، صفائح ألومنيوم، أسقف، كسوات، وأنظمة ألومنيوم معمارية."
        ),
      ],
      icon: Building2,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      title: t("Copper & Wire", "النحاس والأسلاك"),
      items: [
        t(
          "Copper rods, copper sheets, electrical copper wire, bare copper conductors, and copper tubes.",
          "قضبان نحاس، صفائح نحاس، أسلاك نحاسية كهربائية، موصلات نحاسية عارية، وأنابيب نحاسية."
        ),
      ],
      icon: Zap,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      title: t("Pipes & Fittings", "الأنابيب والوصلات"),
      items: [
        t(
          "GI pipes, HDPE pipes, PVC pipes, copper pipes, and complete pipe fittings for plumbing and HVAC.",
          "أنابيب مجلفنة، أنابيب HDPE، أنابيب PVC، أنابيب نحاسية، ووصلات أنابيب كاملة للسباكة وأنظمة التكييف."
        ),
      ],
      icon: Globe,
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      title: t("Cement & Masonry", "الأسمنت والبناء"),
      items: [
        t(
          "Portland cement, gypsum boards, insulation panels, concrete blocks, and masonry products.",
          "أسمنت بورتلاند، ألواح جبسية، ألواح عازلة، كتل خرسانية، ومنتجات البناء."
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
        title={t("Construction Materials", "مواد البناء")}
        subtitle={t(
          "The Raw Materials Powering Gulf Megaprojects — Steel, Aluminum, Copper & More",
          "المواد الخام التي تُشغّل مشاريع الخليج الكبرى — الصلب والألومنيوم والنحاس وأكثر"
        )}
        image="/assets/generated/division-construction-materials-hero.dim_1400x600.jpg"
        breadcrumb={t("Construction Materials", "مواد البناء")}
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
                {t("Division Overview", "نظرة عامة على القسم")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Fueling the Gulf's Construction Boom",
                  "نُشغّل طفرة البناء في الخليج"
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "Fueling the Gulf's construction boom, our Construction Materials division provides everything from Safety & PPE equipment to metals and raw materials. With active Gulf megaprojects driving unprecedented demand, we supply contractors, developers, and project managers with the materials they need to build safely and efficiently.",
                  "نُشغّل طفرة البناء في الخليج، ويوفر قسم مواد البناء لدينا كل شيء من معدات السلامة والوقاية إلى المعادن والمواد الخام. ومع قيادة مشاريع الخليج الكبرى لطلب غير مسبوق، نُزوّد المقاولين والمطورين ومديري المشاريع بالمواد التي يحتاجونها للبناء بأمان وكفاءة."
                )}
              </p>
              <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-xl p-4 mb-8">
                <p className="text-brand-teal-dark font-semibold text-sm">
                  {t("Supplying", "نُزوّد")}{" "}
                  <span className="text-brand-teal font-bold">
                    {t(
                      "Active Project Sites",
                      "مواقع المشاريع النشطة"
                    )}
                  </span>{" "}
                  {t("Across the Gulf", "في جميع أنحاء الخليج")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="construction.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Request a Quote", "اطلب عرض سعر")}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="construction.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام")}
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
                  alt={t("Construction Materials", "مواد البناء")}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">
                  Grade 60/75
                </div>
                <div className="text-xs opacity-80">
                  {t("Certified Rebar", "حديد تسليح معتمد")}
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
              {t("What We Supply", "ما نُزوّده")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Material Types", "أنواع المواد")}
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
              "المعايير والشهادات"
            )}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              t(
                "Mill-Certified Materials",
                "مواد معتمدة من المصنع"
              ),
              t("Grade 60/75 Rebar", "حديد تسليح درجة 60/75"),
              t("ISO 9001 Compliant", "متوافق مع ISO 9001"),
              t("EN & ANSI Standards", "معايير EN و ANSI"),
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
              "هل أنت مستعد لتزويد مشروعك؟"
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Get quotes, request samples, or discuss large-scale project requirements with our team.",
              "احصل على عروض أسعار، اطلب عينات، أو ناقش متطلبات المشاريع واسعة النطاق مع فريقنا."
            )}
          </p>
          <button
            type="button"
            data-ocid="construction.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Request a Quote", "اطلب عرض سعر")}{" "}
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
      title: t("Head Protection", "حماية الرأس"),
      desc: t(
        "Safety helmets, hard hats, bump caps, and head protection systems meeting EN 397 and ANSI Z89 standards.",
        "خوذات سلامة، خوذ صلبة، قبعات واقية، وأنظمة حماية الرأس تلبي معايير EN 397 و ANSI Z89."
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Eye,
      title: t("Eye & Face Protection", "حماية العين والوجه"),
      desc: t(
        "Safety glasses, goggles, face shields, welding masks, and complete eye protection solutions.",
        "نظارات سلامة، نظارات واقية، واقيات وجه، أقنعة لحام، وحلول كاملة لحماية العين."
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: ShieldCheck,
      title: t("Hand Protection", "حماية اليدين"),
      desc: t(
        "Safety gloves — cut-resistant, chemical-resistant, welding, and general purpose work gloves.",
        "قفازات سلامة — مقاومة للقطع، مقاومة للمواد الكيميائية، للحام، وقفازات عمل للأغراض العامة."
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Star,
      title: t("Hearing Protection", "حماية السمع"),
      desc: t(
        "Ear plugs, ear muffs, communication headsets, and hearing conservation solutions for noisy environments.",
        "سدادات أذن، واقيات أذن، سماعات اتصال، وحلول حفظ السمع للبيئات الصاخبة."
      ),
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
    {
      icon: Wind,
      title: t("Respiratory Protection", "حماية الجهاز التنفسي"),
      desc: t(
        "Dust masks, half-face respirators, full-face respirators, and self-contained breathing apparatus.",
        "أقنعة غبار، أقنعة نصفية، أقنعة كاملة، وأجهزة تنفس ذاتية."
      ),
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      icon: Layers,
      title: t("Fall Protection", "الحماية من السقوط"),
      desc: t(
        "Safety harnesses, lanyards, self-retracting lifelines, and complete fall arrest systems.",
        "أحزمة سلامة، أحبال، خطوط حياة ذاتية الانكماش، وأنظمة كاملة لإيقاف السقوط."
      ),
      color: "text-red-700",
      bg: "bg-red-50",
    },
    {
      icon: Package,
      title: t("Safety Footwear", "أحذية السلامة"),
      desc: t(
        "Steel-toed boots, composite toe shoes, anti-puncture footwear, and chemical-resistant footwear.",
        "أحذية بقبضة فولاذية، أحذية بقبضة مركبة، أحذية مضادة للثقب، وأحذية مقاومة للمواد الكيميائية."
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Zap,
      title: t("High-Visibility Vests", "سترات عالية الوضوح"),
      desc: t(
        "Class 2 & Class 3 hi-vis vests, reflective jackets, and safety workwear for all site conditions.",
        "سترات عالية الوضوح من الفئة 2 و 3، سترات عاكسة، وملابس عمل سلامة لجميع ظروف الموقع."
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
          "السلامة ومعدات الوقاية / المعادن والمواد الخام"
        )}
        subtitle={t(
          "Safety & PPE and Metals & Raw Materials for Gulf Megaprojects",
          "معدات السلامة والوقاية والمعادن والمواد الخام لمشاريع الخليج الكبرى"
        )}
        image="/assets/generated/division-safety-ppe-hero.dim_1400x600.jpg"
        breadcrumb={t(
          "Safety & PPE / Metals",
          "السلامة والمعادن"
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
                {t("Division Overview", "نظرة عامة على القسم")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Safety First, Every Site, Every Time",
                  "السلامة أولاً، في كل موقع، في كل مرة"
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "Safety is non-negotiable in Gulf construction. RAYAT's Safety & PPE range includes certified personal protective equipment meeting international standards (EN, ANSI, OSHA). From helmet to boot, we provide comprehensive protection solutions for construction, industrial, and oil & gas environments across the region.",
                  "السلامة غير قابلة للتفاوض في بناء الخليج. تشمل مجموعة السلامة ومعدات الوقاية من رايات معدات وقاية شخصية معتمدة تلبي المعايير الدولية (EN، ANSI، OSHA). من الخوذة إلى الحذاء، نقدم حلول حماية شاملة لبيئات البناء والصناعة والنفط والغاز في جميع أنحاء المنطقة."
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From reinforcing steel for high-rise towers to copper wire for electrical systems, RAYAT's Metals & Raw Materials division supplies contractors and developers across the Gulf with premium-grade materials. Our direct relationships with mills and manufacturers ensure competitive pricing and consistent supply for projects of any scale.",
                  "من حديد التسليح للأبراج الشاهقة إلى أسلاك النحاس للأنظمة الكهربائية، يُزوّد قسم المعادن والمواد الخام من رايات المقاولين والمطورين في جميع أنحاء الخليج بمواد عالية الجودة. تضمن علاقاتنا المباشرة مع المصانع والمصنّعين أسعاراً تنافسية وإمداداً مستمراً لمشاريع أي حجم."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="safety-ppe.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Enquire Now", "استفسر الآن")}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="safety-ppe.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام")}
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
                    "معدات السلامة والوقاية"
                  )}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">
                  EN/ANSI
                </div>
                <div className="text-xs opacity-80">
                  {t("OSHA Certified", "معتمد من OSHA")}
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
              {t("Product Range", "نطاق المنتجات")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "PPE Product Categories",
                "فئات منتجات الوقاية"
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
            {t("Standards Compliance", "الامتثال للمعايير")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              t("EN Certified PPE", "معدات وقاية معتمدة EN"),
              t("ANSI Standards", "معايير ANSI"),
              t("OSHA Compliant", "متوافق مع OSHA"),
              t(
                "Mill-Certified Metals",
                "معادن معتمدة من المصنع"
              ),
              t("ISO 9001 Compliant", "متوافق مع ISO 9001"),
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
              "حلول سلامة شاملة لمشاريع الخليج"
            )}
          </h3>
          <p className="text-white/75 mb-8 text-base leading-relaxed">
            {t(
              "Comprehensive safety solutions for Gulf construction projects — contact our team to discuss your PPE and materials requirements.",
              "حلول سلامة شاملة لمشاريع البناء في الخليج — تواصل مع فريقنا لمناقشة متطلباتك من معدات الوقاية والمواد."
            )}
          </p>
          <button
            type="button"
            data-ocid="safety-ppe.cta.primary_button"
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("Enquire Now", "استفسر الآن")}{" "}
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
      title: t("Solar Power Generation", "توليد الطاقة الشمسية"),
      desc: t(
        "Complete solar photovoltaic (PV) systems for residential, commercial, and industrial power generation. Monocrystalline and polycrystalline panels from top-tier manufacturers.",
        "أنظمة الطاقة الكهروضوئية الشمسية المتكاملة للمنازل والمشاريع التجارية والصناعية. ألواح أحادية ومتعددة البلورة من كبار المصنعين."
      ),
      color: "text-yellow-700",
      bg: "bg-yellow-50",
    },
    {
      icon: Wind,
      title: t("Solar Power Systems", "أنظمة الطاقة الشمسية"),
      desc: t(
        "End-to-end solar power system design and supply: grid-tied, off-grid, and hybrid systems. Inverters, charge controllers, mounting structures, and complete turnkey packages.",
        "تصميم وتوريد أنظمة الطاقة الشمسية من البداية إلى النهاية: أنظمة متصلة بالشبكة وخارج الشبكة وهجينة. عاكسات الشحن ووحدات التحكم وهياكل التركيب وحزم جاهزة للتشغيل."
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Package,
      title: t(
        "Energy Storage & Conversion",
        "تخزين وتحويل الطاقة"
      ),
      desc: t(
        "Battery energy storage systems (BESS), lithium-ion and lead-acid battery banks, DC-AC inverters, UPS systems, and power conversion equipment for reliable energy management.",
        "أنظمة تخزين الطاقة بالبطاريات (BESS)، ووحدات بطاريات الليثيوم أيون والرصاص الحمضي، وعاكسات التيار المستمر إلى المتردد، وأنظمة UPS، ومعدات تحويل الطاقة لإدارة طاقة موثوقة."
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Layers,
      title: t(
        "Solar Heating & Water Systems",
        "أنظمة التسخين الشمسي والمياه"
      ),
      desc: t(
        "Solar water heaters, solar pool heating, solar thermal collectors, and complete solar hot water solutions for residential, commercial, and industrial applications.",
        "سخانات المياه الشمسية، وتسخين حمامات السباحة بالطاقة الشمسية، والمجمعات الحرارية الشمسية، وحلول المياه الساخنة الشمسية المتكاملة للتطبيقات السكنية والتجارية والصناعية."
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Star,
      title: t("Components & Accessories", "المكونات والملحقات"),
      desc: t(
        "Solar cables, MC4 connectors, combiner boxes, surge protection devices, monitoring systems, junction boxes, and all accessories for a complete solar installation.",
        "كابلات الطاقة الشمسية، ووصلات MC4، وصناديق التجميع، وأجهزة الحماية من ارتفاع الجهد، وأنظمة المراقبة، وصناديق التوصيل، وجميع الملحقات لتركيب شمسي متكامل."
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
  ];

  return (
    <div>
      <PageHero
        title={t("Solar Division", "قسم الطاقة الشمسية")}
        subtitle={t(
          "Renewable Energy Solutions for Oman & the Gulf — Solar Power, Storage & Heating Systems",
          "حلول الطاقة المتجددة لعُمان والخليج — الطاقة الشمسية والتخزين وأنظمة التسخين"
        )}
        image="/assets/generated/division-solar-hero.dim_1400x600.jpg"
        breadcrumb={t("Solar Division", "قسم الطاقة الشمسية")}
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
                {t("Division Overview", "نظرة عامة على القسم")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Oman's Solar Energy Trading Partner",
                  "شريك عُمان في تجارة الطاقة الشمسية"
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "RAYAT's Solar Division is at the forefront of Oman's transition to clean, renewable energy. We supply solar panels, complete power systems, energy storage solutions, and heating systems to contractors, developers, and businesses across Oman and the Gulf — aligned with Oman Vision 2040's sustainability goals.",
                  "قسم الطاقة الشمسية في RAYAT في طليعة انتقال عُمان نحو الطاقة النظيفة والمتجددة. نوفّر الألواح الشمسية وأنظمة الطاقة المتكاملة وحلول تخزين الطاقة وأنظمة التسخين للمقاولين والمطورين والشركات في جميع أنحاء عُمان والخليج — بما يتماشى مع أهداف رؤية عُمان 2040 للاستدامة."
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From rooftop solar installations to large-scale solar farms, we provide high-quality products from globally certified manufacturers with competitive pricing and full technical support.",
                  "من تركيبات الطاقة الشمسية على الأسطح إلى المزارع الشمسية واسعة النطاق، نوفّر منتجات عالية الجودة من مصنعين معتمدين عالميًا بأسعار تنافسية ودعم فني شامل."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="solar.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Solar Enquiry", "استفسار الطاقة الشمسية")}{" "}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="solar.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام")}
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
                    "قسم الطاقة الشمسية"
                  )}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">100%</div>
                <div className="text-xs opacity-80">
                  {t("Clean Energy", "طاقة نظيفة")}
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
              {t("What We Supply", "ما نوفّره")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t(
                "Solar Product Categories",
                "فئات منتجات الطاقة الشمسية"
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
                "لماذا تختار RAYAT للطاقة الشمسية؟"
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                t(
                  "Aligned with Oman Vision 2040 renewable energy targets",
                  "متوافق مع أهداف رؤية عُمان 2040 للطاقة المتجددة"
                ),
                t(
                  "Globally certified solar products from top manufacturers",
                  "منتجات شمسية معتمدة عالميًا من كبار المصنعين"
                ),
                t(
                  "Complete supply chain from panels to installation accessories",
                  "سلسلة توريد متكاملة من الألواح إلى ملحقات التركيب"
                ),
                t(
                  "Competitive pricing with full technical support across the Gulf",
                  "أسعار تنافسية مع دعم فني شامل في جميع أنحاء الخليج"
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
              {t("Solar Enquiry", "استفسار الطاقة الشمسية")}{" "}
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
      title: t("Automotive Tyres", "إطارات السيارات"),
      desc: t(
        "Premium passenger car, SUV, and 4x4 tyres from globally certified brands. Full range of sizes covering performance, comfort, and all-season applications.",
        "إطارات سيارات ركاب ودفع رباعي وSUV فاخرة من علامات تجارية معتمدة عالميًا. تشكيلة كاملة من المقاسات تغطي الأداء والراحة والاستخدام في جميع الفصول."
      ),
      color: "text-slate-700",
      bg: "bg-slate-100",
    },
    {
      icon: Package,
      title: t(
        "Truck & Heavy-Vehicle Tyres",
        "إطارات الشاحنات والمركبات الثقيلة"
      ),
      desc: t(
        "Radial and bias-ply tyres for light commercial vehicles, heavy trucks, trailers, and buses. High load-rating options for Gulf road conditions and long-haul routes.",
        "إطارات راديالية وطبقية للمركبات التجارية الخفيفة والشاحنات الثقيلة والمقطورات والحافلات. خيارات بقدرة تحميل عالية تناسب ظروف الطرق في الخليج والمسارات الطويلة."
      ),
      color: "text-brand-teal",
      bg: "bg-brand-teal/10",
    },
    {
      icon: Building2,
      title: t(
        "Off-Road & Industrial Tyres",
        "إطارات الطرق الوعرة والصناعية"
      ),
      desc: t(
        "Robust tyres for construction machinery, forklifts, agricultural equipment, and mining vehicles. Designed for heavy-duty performance on rough terrain.",
        "إطارات متينة لآلات البناء والرافعات الشوكية والمعدات الزراعية ومركبات التعدين. مصممة للأداء الثقيل على التضاريس الوعرة."
      ),
      color: "text-orange-700",
      bg: "bg-orange-50",
    },
    {
      icon: Layers,
      title: t("Industrial Adhesives", "المواد اللاصقة الصناعية"),
      desc: t(
        "High-strength structural adhesives, assembly adhesives, and multi-purpose bonding agents for manufacturing, construction, and maintenance applications.",
        "مواد لاصقة هيكلية عالية القوة ومواد تجميع وعوامل ربط متعددة الأغراض لتطبيقات التصنيع والبناء والصيانة."
      ),
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: ShieldCheck,
      title: t(
        "Sealants & Waterproofing",
        "المواد العازلة والعوازل المائية"
      ),
      desc: t(
        "Silicone, polyurethane, and acrylic sealants for construction joints, facades, roofing, and waterproofing — suitable for extreme Gulf climate conditions.",
        "مواد عزل سيليكونية وبولي يوريثان وأكريليكية لوصلات البناء والواجهات والأسقف والعزل المائي — مناسبة لظروف المناخ القاسي في الخليج."
      ),
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      icon: Star,
      title: t(
        "Specialty Bonding Products",
        "منتجات الربط المتخصصة"
      ),
      desc: t(
        "Epoxy adhesives, contact adhesives, anaerobic compounds, cyanoacrylates, and industrial tapes for specialized engineering and fabrication applications.",
        "مواد لاصقة إيبوكسي ولاصقة تلامسية ومركبات لاهوائية وسيانو أكريلات وأشرطة صناعية لتطبيقات الهندسة والتصنيع المتخصصة."
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
          "قسم الإطارات والمواد اللاصقة"
        )}
        subtitle={t(
          "Premium Tyres, Industrial Adhesives & Sealants for Automotive, Construction and Manufacturing",
          "إطارات فاخرة ومواد لاصقة صناعية وعوازل للسيارات والبناء والتصنيع"
        )}
        image="/assets/generated/division-tyres-adhesives-hero.dim_1400x600.jpg"
        breadcrumb={t(
          "Tyres & Adhesives",
          "الإطارات والمواد اللاصقة"
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
                {t("Division Overview", "نظرة عامة على القسم")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t(
                  "Your Trusted Tyres & Adhesives Partner in Oman",
                  "شريكك الموثوق للإطارات والمواد اللاصقة في عُمان"
                )}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                {t(
                  "RAYAT's Tyres & Adhesives Division supplies premium-quality tyres and industrial bonding solutions to automotive businesses, construction contractors, and manufacturers across Oman and the GCC. We source from globally certified brands and maintain competitive pricing with reliable local delivery.",
                  "قسم الإطارات والمواد اللاصقة في RAYAT يوفّر إطارات عالية الجودة وحلول ربط صناعية لشركات السيارات ومقاولي البناء والمصنعين في جميع أنحاء عُمان ودول الخليج. نوفّر منتجات من علامات تجارية معتمدة عالميًا مع أسعار تنافسية وتسليم محلي موثوق."
                )}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t(
                  "From passenger car tyres to heavy off-road equipment rubber, and from everyday sealants to advanced structural adhesives, we cover the full spectrum of requirements for Oman's growing automotive and construction sectors.",
                  "من إطارات سيارات الركاب إلى مطاط المعدات الثقيلة للطرق الوعرة، ومن العوازل اليومية إلى المواد اللاصقة الهيكلية المتقدمة، نغطي الطيف الكامل من المتطلبات لقطاعات السيارات والبناء المتنامية في عُمان."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="tyres.contact.primary_button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors"
                >
                  {t("Request a Quote", "اطلب عرض سعر")}{" "}
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  data-ocid="tyres.trading.secondary_button"
                  onClick={() => navigate("trading-divisions")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-lg hover:bg-brand-teal hover:text-white transition-all"
                >
                  {t("All Divisions", "جميع الأقسام")}
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
                    "قسم الإطارات والمواد اللاصقة"
                  )}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-teal text-white px-5 py-3 rounded-xl shadow-xl">
                <div className="font-display text-xl font-extrabold">GCC</div>
                <div className="text-xs opacity-80">
                  {t("Wide Supply", "إمداد واسع")}
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
              {t("What We Supply", "ما نوفّره")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("Product Categories", "فئات المنتجات")}
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
                "لماذا تختار RAYAT للإطارات والمواد اللاصقة؟"
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                t(
                  "Globally certified tyre brands suited for Gulf road and climate conditions",
                  "علامات إطارات معتمدة عالميًا تناسب ظروف الطرق والمناخ في الخليج"
                ),
                t(
                  "Full range from passenger vehicles to heavy industrial equipment",
                  "تشكيلة كاملة من سيارات الركاب إلى المعدات الصناعية الثقيلة"
                ),
                t(
                  "Construction-grade adhesives and sealants tested for extreme heat and humidity",
                  "مواد لاصقة وعوازل بدرجة البناء مختبرة للحرارة والرطوبة الشديدين"
                ),
                t(
                  "Competitive pricing, fast delivery, and dedicated after-sales support across Oman",
                  "أسعار تنافسية وتسليم سريع ودعم ما بعد البيع مخصص في جميع أنحاء عُمان"
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
              {t("Enquire Now", "استفسر الآن")}{" "}
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
    { label: t("Home", "الرئيسية"), page: "home" },
    { label: t("Portfolio", "المحفظة"), page: "portfolio" },
    { label: t("Services", "الخدمات"), page: "services" },
    { label: t("Contact", "تواصل"), page: "contact" },
    {
      label: t("Trading Divisions", "أقسام التداول"),
      page: "trading-divisions",
    },
    {
      label: t("Solar Division", "قسم الطاقة الشمسية"),
      page: "solar",
    },
    {
      label: t("FMCG Division", "قسم السلع الاستهلاكية"),
      page: "fmcg",
    },
    {
      label: t("Networking Division", "قسم الشبكات"),
      page: "networking",
    },
    {
      label: t("Construction Materials", "مواد البناء"),
      page: "construction-materials",
    },
    {
      label: t(
        "Safety & PPE / Metals",
        "السلامة والمعادن"
      ),
      page: "safety-ppe",
    },
    {
      label: t("Tyres & Adhesives", "الإطارات والمواد اللاصقة"),
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
            <p className="text-brand-gold mt-1" dir="rtl">
              رايات للصناعات
            </p>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              {t(
                "A trusted Omani partner for industrial growth and global trade.",
                "شريك عُماني موثوق للنمو الصناعي والتجارة العالمية."
              )}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">
              {t("Quick Links", "روابط سريعة")}
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
              {t("Contact", "تواصل")}
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
                    "طريق 4521، مبنى 3، الغبرة شمال، مسقط 133، عُمان"
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
                    "واتساب: +968 2400 0000"
                  )}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={14} className="flex-shrink-0 text-brand-gold" />
                {t(
                  "Sun–Thu, 8:00 AM – 5:00 PM",
                  "الأحد–الخميس، 8:00 ص – 5:00 م"
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            © {year} RAYAT Industries SPC.{" "}
            {t("All rights reserved.", "جميع الحقوق محفوظة.")}
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
            : "Contact us on WhatsApp"
        }
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}