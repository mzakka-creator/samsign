"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./VisionValues.module.css";
import sectionImage from "../assets/Section.png";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

type TabType = "about" | "vision" | "values" | "why";

const initialStats: Stat[] = [
  { value: 0, suffix: "+", label: "Successful Projects" },
  { value: 0, suffix: "+", label: "Trusted Partners" },
  { value: 0, suffix: "%", label: "Custom Solutions" },
  { value: 5, suffix: "+Year", label: "Quality Guarantee" },
];

const targetStats: Stat[] = [
  { value: 500, suffix: "+", label: "Successful Projects" },
  { value: 50, suffix: "+", label: "Trusted Partners" },
  { value: 100, suffix: "%", label: "Custom Solutions" },
  { value: 5, suffix: "+Year", label: "Quality Guarantee" },
];

export default function VisionValues() {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedRef = useRef(false);

  const animateStats = () => {
    // Clear any existing animation
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    // Reset stats to initial values
    setStats(initialStats);

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    animationIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats(
        targetStats.map((target, index) => {
          // For the 5-Year guarantee, show it immediately
          if (index === 3) {
            return target;
          }
          return {
            ...target,
            value: Math.floor(target.value * progress),
          };
        })
      );

      if (currentStep >= steps) {
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
        setStats(targetStats);
        hasAnimatedRef.current = true;
      }
    }, stepDuration);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate stats when section becomes visible and about tab is active
            if (activeTab === "about") {
              hasAnimatedRef.current = false;
              animateStats();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("vision");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [activeTab]);

  useEffect(() => {
    // Animate stats when switching to about tab if section is visible
    if (activeTab === "about" && isVisible) {
      // Reset animation flag and animate
      hasAnimatedRef.current = false;
      animateStats();
    }

    // Reset stats when switching away from about tab
    if (activeTab !== "about") {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
      setStats(initialStats);
      hasAnimatedRef.current = false;
    }

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    };
  }, [activeTab, isVisible]);

  const tabs: TabType[] = ["about", "vision", "values", "why"];

  const getCurrentTabIndex = () => {
    return tabs.indexOf(activeTab);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    
    const currentIndex = getCurrentTabIndex();
    const previousIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    const previousTab = tabs[previousIndex];
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(previousTab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    const currentIndex = getCurrentTabIndex();
    const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
    const nextTab = tabs[nextIndex];
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(nextTab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const handleDotClick = (tab: TabType) => {
    if (isTransitioning || activeTab === tab) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className={styles.contentSection}>
            <h3 className={styles.columnTitle}>ABOUT SAMSIGN</h3>
            <p className={styles.aboutText}>
              Since 2018, SamSign has been at the forefront of professional advertising solutions. We're not just sign makers - we're brand storytellers who combine artistic excellence with engineering precision.
            </p>
            <p className={styles.aboutTextSecondary}>
              What started as a commitment to quality has evolved into a reputation for setting industry standards. Every indoor sign, outdoor display, and custom installation carries our signature: uncompromising craftsmanship driven by performance.
            </p>
            
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={`${styles.statValue} ${isVisible && activeTab === "about" ? styles.statValueAnimated : ''}`}>
                    {stat.value}
                    <span className={styles.statSuffix}>{stat.suffix}</span>
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "vision":
        return (
          <div className={styles.contentSection}>
            <h3 className={styles.columnTitle}>OUR VISION</h3>
            <p className={styles.aboutText}>
              To become the leading force in professional signage solutions, where art meets engineering and performance drives every project. We envision a future where brands communicate with clarity, impact, and lasting presence.
            </p>
            <p className={styles.aboutTextSecondary}>
              Our vision extends beyond creating signs - we're building a legacy of excellence that transforms how businesses connect with their audiences. Through innovation, craftsmanship, and unwavering commitment to quality, we're setting new standards in the industry.
            </p>
            <div className={styles.visionPoints}>
              <div className={styles.visionPoint}>
                <h4 className={styles.visionPointTitle}>Innovation First</h4>
                <p className={styles.visionPointText}>Pioneering new techniques and technologies in signage design and manufacturing.</p>
              </div>
              <div className={styles.visionPoint}>
                <h4 className={styles.visionPointTitle}>Industry Leadership</h4>
                <p className={styles.visionPointText}>Setting benchmarks that others follow, establishing ourselves as the go-to experts.</p>
              </div>
              <div className={styles.visionPoint}>
                <h4 className={styles.visionPointTitle}>Sustainable Growth</h4>
                <p className={styles.visionPointText}>Building lasting relationships and creating solutions that stand the test of time.</p>
              </div>
              <div className={styles.visionPoint}>
                <h4 className={styles.visionPointTitle}>Global Excellence</h4>
                <p className={styles.visionPointText}>Expanding our reach while maintaining the highest standards of quality and service worldwide.</p>
              </div>
            </div>
          </div>
        );

      case "values":
        return (
          <div className={styles.contentSection}>
            <h3 className={styles.columnTitle}>OUR VALUES</h3>
            <p className={styles.aboutText}>
              Our values are the foundation of everything we do. They guide our decisions, shape our relationships, and define our commitment to excellence.
            </p>
            <div className={styles.valuesGrid}>
              <div className={styles.valueItem}>
                <h4 className={styles.valueTitle}>Quality</h4>
                <p className={styles.valueText}>Uncompromising standards in materials, craftsmanship, and execution. Every project reflects our commitment to excellence.</p>
              </div>
              <div className={styles.valueItem}>
                <h4 className={styles.valueTitle}>Performance</h4>
                <p className={styles.valueText}>Results-driven approach that delivers measurable impact. We don't just create signs - we create solutions that work.</p>
              </div>
              <div className={styles.valueItem}>
                <h4 className={styles.valueTitle}>Innovation</h4>
                <p className={styles.valueText}>Embracing new technologies and creative approaches to stay ahead of industry trends and client expectations.</p>
              </div>
              <div className={styles.valueItem}>
                <h4 className={styles.valueTitle}>Integrity</h4>
                <p className={styles.valueText}>Honest communication, transparent processes, and ethical business practices in every interaction.</p>
              </div>
              <div className={styles.valueItem}>
                <h4 className={styles.valueTitle}>Craftsmanship</h4>
                <p className={styles.valueText}>Artistic excellence combined with engineering precision. Where creativity meets technical mastery.</p>
              </div>
              <div className={styles.valueItem}>
                <h4 className={styles.valueTitle}>Partnership</h4>
                <p className={styles.valueText}>Building long-term relationships based on trust, collaboration, and mutual success.</p>
              </div>
            </div>
          </div>
        );

      case "why":
        return (
          <div className={styles.contentSection}>
            <h3 className={styles.columnTitle}>WHY CHOOSE US</h3>
            <p className={styles.aboutText}>
              When you choose SamSign, you're choosing more than a signage provider. You're partnering with industry leaders who combine artistic vision with technical expertise.
            </p>
            <div className={styles.whyGrid}>
              <div className={styles.whyItem}>
                <h4 className={styles.whyTitle}>Proven Track Record</h4>
                <p className={styles.whyText}>Since 2018, we've completed 500+ successful projects with trusted partners across various industries.</p>
              </div>
              <div className={styles.whyItem}>
                <h4 className={styles.whyTitle}>Custom Solutions</h4>
                <p className={styles.whyText}>100% tailored to your needs. No one-size-fits-all approach - every project is unique and designed specifically for you.</p>
              </div>
              <div className={styles.whyItem}>
                <h4 className={styles.whyTitle}>Quality Guarantee</h4>
                <p className={styles.whyText}>5+ years of quality assurance. We stand behind our work with comprehensive guarantees and ongoing support.</p>
              </div>
              <div className={styles.whyItem}>
                <h4 className={styles.whyTitle}>Expert Team</h4>
                <p className={styles.whyText}>Skilled professionals who combine artistic talent with engineering expertise to deliver exceptional results.</p>
              </div>
              <div className={styles.whyItem}>
                <h4 className={styles.whyTitle}>End-to-End Service</h4>
                <p className={styles.whyText}>From concept to installation, we handle every aspect of your project with precision and care.</p>
              </div>
              <div className={styles.whyItem}>
                <h4 className={styles.whyTitle}>Industry Standards</h4>
                <p className={styles.whyText}>We don't just meet industry standards - we set them. Our work reflects the highest levels of quality and innovation.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="vision" className={styles.section}>
      {/* Background Image */}
      <div className={styles.backgroundImageContainer}>
        <Image
          src={sectionImage}
          alt="Section Background"
          fill
          className={styles.backgroundImage}
          priority
        />
      </div>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Who We Are & Where We're Going
        </h2>

        <div className={styles.grid}>
          {/* Content Section with Side Arrows */}
          <div className={styles.contentWrapperContainer}>
            {/* Left Arrow */}
            <button
              className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
              onClick={handlePrevious}
              disabled={isTransitioning}
              aria-label="Previous section"
            >
              <span className={styles.arrowIcon}>‹</span>
            </button>

            {/* Content Section */}
            <div className={`${styles.leftColumn} ${isVisible ? styles.leftColumnVisible : ''}`}>
              <div className={`${styles.aboutContainer} ${styles.contentContainer}`}>
                <div className={`${styles.contentWrapper} ${isTransitioning ? styles.contentFadeOut : styles.contentFadeIn}`}>
                  {renderContent()}
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
              onClick={handleNext}
              disabled={isTransitioning}
              aria-label="Next section"
            >
              <span className={styles.arrowIcon}>›</span>
            </button>
          </div>
        </div>

        {/* Indicator Dots Below Content */}
        <div className={styles.tabIndicator}>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleDotClick(tab)}
              className={`${styles.indicatorDot} ${activeTab === tab ? styles.indicatorDotActive : ''}`}
              disabled={isTransitioning}
              aria-label={`Go to ${tab} section`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

  