"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Partners.module.css";

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
import BankAlbilad from "../assets/partners/Bank albilad.svg";
import Jorof from "../assets/partners/jorof.svg";

const translations = {
  en: {
    title: "Trusted Partners",
    subtitle: "Working with leading brands and businesses",
  },
  ar: {
    title: "شركاء موثوقون",
    subtitle: "نعمل مع العلامات التجارية والشركات الرائدة",
  },
};

const partners = [
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
  { name: "Bank Albilad", logo: BankAlbilad },
  { name: "jorof", logo: Jorof, invertOnDark: true },
];

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

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

  return (
    <section
      id="partners"
      className={`${styles.section} ${language === "ar" ? styles.sectionRtl : ""}`}
    >
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.gridLayout}>
          {partners.map((p) => (
            <div key={p.name} className={styles.gridLogoOnly}>
              <Image
                src={p.logo}
                alt={p.name}
                width={160}
                height={160}
                className={`${styles.logoImage} ${p.invertOnDark ? styles.logoImageInverted : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
