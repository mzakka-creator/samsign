"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "./Gallery.module.css";

const translations = {
  en: {
    title: "Our Work",
    subtitle: "Crafting excellence, one sign at a time",
    categories: ["All", "Outdoor Signs", "Indoor Signs", "LED", "3D Letters", "Vehicle Wraps"],
    ctaButton: "View Full Gallery",
  },
  ar: {
    title: "أعمالنا",
    subtitle: "صناعة التميز، لافتة واحدة في كل مرة",
    categories: ["الكل", "لافتات خارجية", "لافتات داخلية", "LED", "حروف 3D", "أغلفة المركبات"],
    ctaButton: "عرض المعرض الكامل",
  },
};

// Gallery items with videos
const galleryItems = [
  { id: 1, category: "outdoor", video: "/videos/26.mp4", alt: "Outdoor signage project" },
  { id: 2, category: "led", video: "/videos/27.mp4", alt: "LED sign installation" },
  { id: 3, category: "indoor", video: "/videos/28.mp4", alt: "Indoor signage project" },
  { id: 4, category: "3d", video: "/videos/29.mp4", alt: "3D letter signage" },
  { id: 5, category: "vehicle", video: "/videos/30.mp4", alt: "Vehicle wrap design" },
  { id: 6, category: "outdoor", video: "/videos/31.mp4", alt: "Outdoor signage project" },
  { id: 7, category: "led", video: "/videos/32.mp4", alt: "LED sign installation" },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [activeCategory, setActiveCategory] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
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

  const t = translations[language];

  const filterItems = (index: number) => {
    if (index === 0) return galleryItems; // Show all
    const categoryMap: { [key: number]: string } = {
      1: "outdoor",
      2: "indoor",
      3: "led",
      4: "3d",
      5: "vehicle",
    };
    return galleryItems.filter(item => item.category === categoryMap[index]);
  };

  const displayedItems = filterItems(activeCategory);

  // Reorder items to put featured video first
  const reorderedItems = displayedItems.length > 0 
    ? [
        displayedItems[featuredIndex],
        ...displayedItems.slice(0, featuredIndex),
        ...displayedItems.slice(featuredIndex + 1)
      ]
    : [];

  // Handle video click - make it featured
  const handleVideoClick = (index: number) => {
    setFeaturedIndex(index);
  };

  // Reset featured index when category changes
  useEffect(() => {
    setFeaturedIndex(0);
  }, [activeCategory]);

  return (
    <section 
      id="gallery"
      ref={sectionRef} 
      className={`${styles.gallery} ${language === "ar" ? styles.galleryRtl : ""}`}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>


        {/* Featured Video - Large Cinematic */}
        {reorderedItems.length > 0 && (
          <div 
            className={`${styles.featuredVideo} ${isVisible ? styles.featuredVideoVisible : styles.featuredVideoHidden}`}
          >
            <div className={styles.featuredVideoWrapper}>
              <video
                key={reorderedItems[0].id}
                src={reorderedItems[0].video}
                className={styles.video}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        )}

        {/* Gallery Grid - Remaining Videos */}
        {reorderedItems.length > 1 && (
          <div className={styles.grid}>
            {reorderedItems.slice(1).map((item, index) => (
              <div
                key={item.id}
                className={`${styles.gridItem} ${isVisible ? styles.gridItemVisible : styles.gridItemHidden}`}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                onClick={() => handleVideoClick(displayedItems.findIndex(i => i.id === item.id))}
              >
                <div className={styles.imageWrapper}>
                  <video
                    src={item.video}
                    className={styles.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className={`${styles.ctaContainer} ${isVisible ? styles.ctaVisible : styles.ctaHidden}`}>
          <Link href="/gallery" className={styles.ctaButton}>
            {t.ctaButton}
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

