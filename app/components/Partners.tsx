"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Partners.module.css";

// Import all partner logos
import Amaz from "../assets/partners/Amaz.svg";
import AOK from "../assets/partners/AOK.svg";
import ASSO from "../assets/partners/ASSO.svg";
import Balenc from "../assets/partners/Balenc.svg";
import Black from "../assets/partners/Black.svg";
import BOTT from "../assets/partners/BOTT.svg";
import Brunch from "../assets/partners/Brunch.svg";
import cicch from "../assets/partners/cicch.svg";
import cRAZY from "../assets/partners/cRAZY.svg";
import Fonte from "../assets/partners/Fonte.svg";
import Gucci from "../assets/partners/Gucci.svg";
import half from "../assets/partners/half.svg";
import ILBARR from "../assets/partners/IL BARR.svg";
import Jadwa from "../assets/partners/Jadwa.svg";
import JON from "../assets/partners/JON.svg";
import Koen from "../assets/partners/Koen.svg";
import KURU from "../assets/partners/KURU.svg";
import lisen from "../assets/partners/lisen.svg";
import Liza from "../assets/partners/Liza.svg";
import MRCHOW from "../assets/partners/MR CHOW.svg";
import namm from "../assets/partners/namm.svg";
import NATUZZI from "../assets/partners/NATUZZI.svg";
import ROBATA from "../assets/partners/ROBATA.svg";
import ROKA from "../assets/partners/ROKA.svg";
import Ruya from "../assets/partners/Ruya.svg";
import Seven from "../assets/partners/Seven.svg";
import Tash from "../assets/partners/Tash.svg";
import Urth from "../assets/partners/Urth.svg";
import ZUMA from "../assets/partners/ZUMA.svg";

type Partner = { name: string; logo: string };
type Layout = 1 | 2 | 3 | 4;

const translations = {
  en: {
    title: "Trusted Partners",
    subtitle: "Working with leading brands and businesses",
    prevLayout: "Previous layout",
    nextLayout: "Next layout",
    layout: "Layout",
  },
  ar: {
    title: "شركاء موثوقون",
    subtitle: "نعمل مع العلامات التجارية والشركات الرائدة",
    prevLayout: "التخطيط السابق",
    nextLayout: "التخطيط التالي",
    layout: "تخطيط",
  },
};

const partners: Partner[] = [
  { name: "Amaz", logo: Amaz },
  { name: "AOK", logo: AOK },
  { name: "ASSO", logo: ASSO },
  { name: "Balenc", logo: Balenc },
  { name: "Black", logo: Black },
  { name: "BOTT", logo: BOTT },
  { name: "Brunch", logo: Brunch },
  { name: "Cicch", logo: cicch },
  { name: "cRAZY", logo: cRAZY },
  { name: "Fonte", logo: Fonte },
  { name: "Gucci", logo: Gucci },
  { name: "Half", logo: half },
  { name: "IL BARR", logo: ILBARR },
  { name: "Jadwa", logo: Jadwa },
  { name: "JON", logo: JON },
  { name: "Koen", logo: Koen },
  { name: "KURU", logo: KURU },
  { name: "Lisen", logo: lisen },
  { name: "Liza", logo: Liza },
  { name: "MR CHOW", logo: MRCHOW },
  { name: "Namm", logo: namm },
  { name: "NATUZZI", logo: NATUZZI },
  { name: "ROBATA", logo: ROBATA },
  { name: "ROKA", logo: ROKA },
  { name: "Ruya", logo: Ruya },
  { name: "Seven", logo: Seven },
  { name: "Tash", logo: Tash },
  { name: "Urth", logo: Urth },
  { name: "ZUMA", logo: ZUMA },
];

// ─── Layout sub-components ──────────────────────────────────────────────────

function Layout1() {
  const duplicated = [...partners, ...partners];
  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.scrollContainer}>
        {duplicated.map((p, i) => (
          <div key={`${p.name}-${i}`} className={styles.partnerCard}>
            <div className={styles.partnerLogo}>
              <Image src={p.logo} alt={p.name} width={220} height={220} className={styles.logoImage} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Layout2() {
  return (
    <div className={styles.gridLayout}>
      {partners.map((p) => (
        <div key={p.name} className={styles.gridLogoOnly}>
          <Image src={p.logo} alt={p.name} width={160} height={160} className={styles.logoImage} />
        </div>
      ))}
    </div>
  );
}

function Layout3() {
  return (
    <div className={styles.gridLayout}>
      {partners.map((p) => (
        <div key={p.name} className={`${styles.gridCard} ${styles.gridCardLabeled}`}>
          <div className={styles.gridLogoWrapLg}>
            <Image src={p.logo} alt={p.name} width={160} height={160} className={styles.logoImage} />
          </div>
          <span className={styles.partnerName}>{p.name}</span>
        </div>
      ))}
    </div>
  );
}

function Layout4() {
  // Group partners into triads: [featured, small, small]
  const triads: Partner[][] = [];
  for (let i = 0; i < partners.length; i += 3) {
    triads.push(partners.slice(i, i + 3));
  }

  return (
    <div className={styles.magazineWrapper}>
      {triads.map((triad, ti) => (
        <div key={ti} className={styles.magazineGroup}>
          {/* Featured large logo */}
          <div className={`${styles.magazineCard} ${styles.magazineFeatured}`}>
            <div className={styles.magazineLogoWrap}>
              <Image src={triad[0].logo} alt={triad[0].name} width={240} height={240} className={styles.logoImage} />
            </div>
          </div>
          {/* Two smaller logos stacked */}
          <div className={styles.magazineStack}>
            {triad.slice(1).map((p) => (
              <div key={p.name} className={`${styles.magazineCard} ${styles.magazineSmall}`}>
                <div className={styles.magazineLogoWrap}>
                  <Image src={p.logo} alt={p.name} width={140} height={140} className={styles.logoImage} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Arrow icon ──────────────────────────────────────────────────────────────

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {direction === "left" ? (
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [layout, setLayout] = useState<Layout>(1);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById("partners");
    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  useEffect(() => {
    const currentLang = document.documentElement.lang as "en" | "ar" | undefined;
    if (currentLang === "ar" || currentLang === "en") setLanguage(currentLang);

    const observer = new MutationObserver(() => {
      const lang = document.documentElement.lang as "en" | "ar" | undefined;
      if (lang === "ar" || lang === "en") setLanguage(lang);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  const t = translations[language];

  function switchLayout(direction: "prev" | "next") {
    if (animating) return;
    setAnimating(true);
    setLayout((prev) => {
      if (direction === "next") return prev === 4 ? 1 : ((prev + 1) as Layout);
      return prev === 1 ? 4 : ((prev - 1) as Layout);
    });
    setTimeout(() => setAnimating(false), 350);
  }

  const layoutMap: Record<Layout, React.ReactNode> = {
    1: <Layout1 />,
    2: <Layout2 />,
    3: <Layout3 />,
    4: <Layout4 />,
  };

  return (
    <section
      id="partners"
      className={`${styles.section} ${language === "ar" ? styles.sectionRtl : ""}`}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        {/* Layout Navigation */}
        <div className={styles.navRow}>
          <button
            className={styles.navBtn}
            onClick={() => switchLayout("prev")}
            aria-label={t.prevLayout}
          >
            <ArrowIcon direction="left" />
          </button>

          <div className={styles.navDots} role="tablist" aria-label={t.layout}>
            {([1, 2, 3, 4] as Layout[]).map((n) => (
              <button
                key={n}
                role="tab"
                aria-selected={layout === n}
                aria-label={`${t.layout} ${n}`}
                className={`${styles.navDot} ${layout === n ? styles.navDotActive : ""}`}
                onClick={() => { if (!animating) { setAnimating(true); setLayout(n); setTimeout(() => setAnimating(false), 350); } }}
              />
            ))}
          </div>

          <button
            className={styles.navBtn}
            onClick={() => switchLayout("next")}
            aria-label={t.nextLayout}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        {/* Layout Content */}
        <div className={`${styles.layoutContent} ${animating ? styles.layoutFadeOut : styles.layoutFadeIn}`}>
          {layoutMap[layout]}
        </div>
      </div>
    </section>
  );
}
