"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Navigation.module.css";
import logo from "../assets/logo.png";

const translations = {
  en: {
    partners: "Partners",
    philosophy: "Philosophy",
    vision: "Vision",
    gallery: "Gallery",
    contact: "Contact",
  },
  ar: {
    partners: "الشركاء",
    philosophy: "الفلسفة",
    vision: "الرؤية",
    gallery: "المعرض",
    contact: "اتصل بنا",
  },
};

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    // If we're on a different page, navigate to homepage first
    if (pathname !== "/") {
      router.push("/#" + id);
      setIsMobileMenuOpen(false);
      return;
    }

    // Normal section scroll for homepage
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = translations[language];

  // Define menu items in order
  const menuItems = [
    { id: "partners", label: t.partners, isButton: false },
    { id: "philosophy", label: t.philosophy, isButton: false },
    { id: "vision", label: t.vision, isButton: false },
    { id: "gallery", label: t.gallery, isButton: false },
    { id: "contact", label: t.contact, isButton: true },
  ];

  // Reverse order when Arabic is selected
  const orderedMenuItems = language === "ar" ? [...menuItems].reverse() : menuItems;

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : styles.navTransparent} ${language === "ar" ? styles.navRtl : ""}`}>
      {/* Glass morphism overlay */}
      <div className={styles.blurOverlay}></div>
      
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          {/* Logo */}
          <div 
            className={styles.logoSection}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
          >
            <Image 
              src={logo}
              alt="SAM SIGN"
              className={`${styles.logoImage} ${!isScrolled ? styles.logoImageTransparent : ''}`}
              priority
            />
          </div>
          
          {/* Desktop Navigation Menu */}
          <div className={styles.navMenu}>
            {language === "ar" && (
              <button
                onClick={toggleLanguage}
                className={`${styles.languageButton} ${isScrolled ? styles.languageButtonScrolled : styles.languageButtonTransparent}`}
                aria-label="Toggle language"
              >
                {language.toUpperCase()}
              </button>
            )}
            
            {orderedMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={item.isButton 
                  ? `${styles.contactButton} ${isScrolled ? styles.contactButtonScrolled : styles.contactButtonTransparent}`
                  : `${styles.navButton} ${isScrolled ? styles.navButtonScrolled : styles.navButtonTransparent}`
                }
              >
                {item.label}
              </button>
            ))}
            
            {language === "en" && (
              <button
                onClick={toggleLanguage}
                className={`${styles.languageButton} ${isScrolled ? styles.languageButtonScrolled : styles.languageButtonTransparent}`}
                aria-label="Toggle language"
              >
                {language.toUpperCase()}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOverlayOpen : ''}`} onClick={toggleMobileMenu}>
        <div className={`${styles.mobileMenu} ${language === "ar" ? styles.mobileMenuRtl : ""}`} onClick={(e) => e.stopPropagation()}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={item.isButton 
                ? styles.mobileContactButton 
                : `${styles.mobileNavButton} ${isScrolled ? styles.mobileNavButtonScrolled : ''}`
              }
            >
              {item.label}
            </button>
          ))}
          
          {/* Language button always at bottom on mobile */}
          <button
            onClick={toggleLanguage}
            className={styles.mobileLanguageButton}
            aria-label="Toggle language"
          >
            {language.toUpperCase()}
          </button>
        </div>
      </div>
    </nav>
  );
}
