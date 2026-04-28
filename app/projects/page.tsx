'use client';
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from '@/styles/Main.module.css';

export default function ProjectsPage() {
  const projectsGridRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);

  const scrollToSection = (sectionId: string) => {
    const nextSection = document.getElementById(sectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollRight = () => {
    if (projectsGridRef.current) {
      projectsGridRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (projectsGridRef.current) {
      projectsGridRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (projectsGridRef.current) {
      const container = projectsGridRef.current;
      const scrollLeftPosition = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      setCanScrollLeft(scrollLeftPosition > 5);
      setCanScrollRight(scrollLeftPosition < scrollWidth - clientWidth - 5);

      // Highlight logic for mobile
      if (window.innerWidth <= 768) {
        const containerCenter = scrollLeftPosition + clientWidth / 2;
        const cards = Array.from(container.children) as HTMLElement[];
        
        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(containerCenter - cardCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        setActiveCardIndex(closestIndex);
      } else {
        setActiveCardIndex(-1);
      }
    }
  };

  useEffect(() => {
    const currentGrid = projectsGridRef.current;
    if (currentGrid) {
      currentGrid.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        currentGrid.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  
  return (
    <main className="min-h-screen bg-[var(--background-color)]">
      <section id="projects" className={styles.projectsSection}>
        <div className={styles.projectWrapper}>
          
          <div 
            className={styles.arrowLeftContainer} 
            style={{ 
                visibility: canScrollLeft ? 'visible' : 'hidden', 
                pointerEvents: canScrollLeft ? 'auto' : 'none',
                opacity: canScrollLeft ? 1 : 0,
                transition: 'opacity 0.3s ease, visibility 0.3s ease'
            }}
          >
            <IoIosArrowBack className={styles.arrowLeft} onClick={scrollLeft} />
          </div>

          <div className={styles.projectsGrid} ref={projectsGridRef}>
            {/* SER */}
            <div className={`${styles.projectCard} ${activeCardIndex === 0 ? styles.activeCard : ''}`}>
              <div className={styles.projectLogoContainer}>
                <img src="/unswLogo.png" alt="SER Logo" className={`${styles.projectLogo} ${styles.light}`} />
                <img src="/unswLogoWhite.png" alt="SER Logo" className={`${styles.projectLogo} ${styles.dark}`} />
              </div>
              <img src="/serImage.png" alt="Speech Emotion recognition" className={styles.projectImage} />
              <p className={styles.projectText}>
                <strong>Speech Emotion Recognition</strong>
                <br />
                Comparative analysis of methods for SER systems adaptation.
              </p>
            </div>

            {/* Uniraid */}
            <div className={`${styles.projectCard} ${activeCardIndex === 1 ? styles.activeCard : ''}`}>
              <div className={styles.projectLogoContainer}>
                <img src="/uniraid.png" alt="UniRaid Logo" className={`${styles.projectLogo} ${styles.light}`} />
                <img src="/uniraid.png" alt="UniRaid Logo" className={`${styles.projectLogo} ${styles.dark}`} />
              </div>
              <img src="/uniraidCoche.JPG" alt="UniRaid" className={styles.projectImage} />
              <p className={styles.projectText}>
                <strong>Uniraid Volunteering</strong>
                <br />
                Volunteer in this humanitarian rally that takes place in Morocco.
              </p>
            </div>
          </div>

          <div 
            className={styles.arrowRightContainer}
            style={{ 
                visibility: canScrollRight ? 'visible' : 'hidden', 
                pointerEvents: canScrollRight ? 'auto' : 'none',
                opacity: canScrollRight ? 1 : 0,
                transition: 'opacity 0.3s ease, visibility 0.3s ease'
            }}
          >
            <IoIosArrowForward className={styles.arrowRight} onClick={scrollRight} />
          </div>
        </div>

        <div className={styles.arrowContainer}>
          <IoIosArrowDown className={styles.arrow} onClick={() => scrollToSection("contact")} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${styles.contactSection} min-h-screen flex flex-col items-center justify-center`}>
        <h2 className="text-4xl uppercase mb-8">Contact Me :)</h2>
        <div className={styles.contactInfo}>
          <div className={styles.contactImageContainer}>
            <img src="/Foto perfil.png" alt="David Feijóo" className={styles.contactImage} />
          </div>
          <a href="mailto:dfeijoo2001@gmail.com" className={styles.contactEmail}>
            dfeijoo2001@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
