"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import styles from "./page.module.css";

// Import images from assets
import img1 from "../assets/samsign/1.jpeg";
import img2 from "../assets/samsign/2.jpeg";
import img3 from "../assets/samsign/3.jpeg";
import img4 from "../assets/samsign/4.jpeg";
import img5 from "../assets/samsign/5.jpeg";
import img6 from "../assets/samsign/6.jpeg";
import img7 from "../assets/samsign/7.jpeg";
import img8 from "../assets/samsign/8.jpeg";
import img9 from "../assets/samsign/9.jpeg";
import img10 from "../assets/samsign/10.jpeg";
import img11 from "../assets/samsign/11.jpeg";
import img12 from "../assets/samsign/12.jpeg";
import img13 from "../assets/samsign/13.jpeg";
import img14 from "../assets/samsign/14.jpeg";
import img15 from "../assets/samsign/15.jpeg";
import img16 from "../assets/samsign/16.jpeg";
import img17 from "../assets/samsign/17.jpeg";
import img18 from "../assets/samsign/18.jpeg";
import img19 from "../assets/samsign/19.jpeg";
import img20 from "../assets/samsign/20.jpeg";
import img21 from "../assets/samsign/21.jpeg";
import img22 from "../assets/samsign/22.jpeg";
import img23 from "../assets/samsign/23.jpeg";
import img24 from "../assets/samsign/24.jpeg";
import img25 from "../assets/samsign/25.jpeg";

const translations = {
  en: {
    title: "Our Work Gallery",
    subtitle: "Explore our portfolio of exceptional signage projects",
    backToHome: "Back to Home",
    allProjects: "All Projects",
  },
  ar: {
    title: "معرض أعمالنا",
    subtitle: "استكشف مجموعتنا من مشاريع اللافتات الاستثنائية",
    backToHome: "العودة إلى الصفحة الرئيسية",
    allProjects: "جميع المشاريع",
  },
};

// Gallery items with images
const galleryItems = [
  { id: 1, image: img1, alt: "Signage project 1" },
  { id: 2, image: img2, alt: "Signage project 2" },
  { id: 3, image: img3, alt: "Signage project 3" },
  { id: 4, image: img4, alt: "Signage project 4" },
  { id: 5, image: img5, alt: "Signage project 5" },
  { id: 6, image: img6, alt: "Signage project 6" },
  { id: 7, image: img7, alt: "Signage project 7" },
  { id: 8, image: img8, alt: "Signage project 8" },
  { id: 9, image: img9, alt: "Signage project 9" },
  { id: 10, image: img10, alt: "Signage project 10" },
  { id: 11, image: img11, alt: "Signage project 11" },
  { id: 12, image: img12, alt: "Signage project 12" },
  { id: 13, image: img13, alt: "Signage project 13" },
  { id: 14, image: img14, alt: "Signage project 14" },
  { id: 15, image: img15, alt: "Signage project 15" },
  { id: 16, image: img16, alt: "Signage project 16" },
  { id: 17, image: img17, alt: "Signage project 17" },
  { id: 18, image: img18, alt: "Signage project 18" },
  { id: 19, image: img19, alt: "Signage project 19" },
  { id: 20, image: img20, alt: "Signage project 20" },
  { id: 21, image: img21, alt: "Signage project 21" },
  { id: 22, image: img22, alt: "Signage project 22" },
  { id: 23, image: img23, alt: "Signage project 23" },
  { id: 24, image: img24, alt: "Signage project 24" },
  { id: 25, image: img25, alt: "Signage project 25" },
];

export default function GalleryPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Read language from document element (set by Navigation component)
    const currentLang = document.documentElement.lang as "en" | "ar" | undefined;
    if (currentLang === "ar" || currentLang === "en") {
      setLanguage(currentLang);
    }
    
    // Listen for language changes
    const observer = new MutationObserver(() => {
      const lang = document.documentElement.lang as "en" | "ar" | undefined;
      if (lang === "ar" || lang === "en") {
        setLanguage(lang);
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    
    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  const t = translations[language];

  return (
    <main className={`${styles.main} ${language === "ar" ? styles.mainRtl : ""}`}>
      <Navigation />
      
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          {/* Back Button */}
          <div className={`${styles.backButton} ${isVisible ? styles.backButtonVisible : styles.backButtonHidden}`}>
            <Link href="/" className={styles.backLink}>
              <span className={styles.backArrow}>←</span>
              {t.backToHome}
            </Link>
          </div>

          {/* Header */}
          <div className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </div>

          {/* Gallery Grid */}
          <div className={styles.grid}>
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.gridItem} ${isVisible ? styles.gridItemVisible : styles.gridItemHidden}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => openLightbox(index)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>
            ×
          </button>
          
          <button 
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            ←
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryItems[currentImageIndex].image}
              alt={galleryItems[currentImageIndex].alt}
              fill
              className={styles.lightboxImage}
              sizes="100vw"
              priority
            />
          </div>

          <button 
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            →
          </button>

          <div className={styles.lightboxCounter}>
            {currentImageIndex + 1} / {galleryItems.length}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
