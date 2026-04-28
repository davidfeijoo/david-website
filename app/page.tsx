'use client'; // Mark the component as a client component
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineCloudDownload } from "react-icons/ai";
import styles from '@/styles/Main.module.css'; // Import the new module-specific styles
import { useScroll } from "./ScrollContext";

export default function Home() {

  const experienceGridRef = useRef<HTMLDivElement | null>(null);
  const projectsGridRef = useRef<HTMLDivElement | null>(null);
  const educationGridRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const [canScrollExpLeft, setCanScrollExpLeft] = useState(false);
  const [canScrollExpRight, setCanScrollExpRight] = useState(true);
  const [canScrollProjLeft, setCanScrollProjLeft] = useState(false);
  const [canScrollProjRight, setCanScrollProjRight] = useState(true);
  const [canScrollEduLeft, setCanScrollEduLeft] = useState(false);
  const [canScrollEduRight, setCanScrollEduRight] = useState(true);
  const [activeEduIndex, setActiveEduIndex] = useState(-1);
  const [activeExpIndex, setActiveExpIndex] = useState(-1);
  const [activeProjIndex, setActiveProjIndex] = useState(-1);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const { setIsContactActive } = useScroll();

  // Function to scroll to a specific section by ID
  const scrollToSection = (sectionId: string) => {
    const nextSection = document.getElementById(sectionId); // Get the section by ID
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" }); // Smooth scroll to the section, aligned to the top
    }
  };

  const scrollGrid = (ref: React.RefObject<HTMLDivElement | null>, distance: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  // Update the visibility of arrows and active card index based on the scroll position
  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>, 
    setLeft: (val: boolean) => void, 
    setRight: (val: boolean) => void,
    setActiveIndex: (val: number) => void
  ) => {
    if (ref.current) {
      const container = ref.current;
      const scrollLeftPosition = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      // Arrows disappear when at start/end (with a small buffer)
      setLeft(scrollLeftPosition > 5);
      setRight(scrollLeftPosition < scrollWidth - clientWidth - 5);

      // Determine active card index for mobile highlighting (only if screen is narrow)
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

        setActiveIndex(closestIndex);
      } else {
        setActiveIndex(-1); // Disable highlighting on desktop
      }
    }
  };

  // Use effect to add event listener for scroll and IntersectionObserver
  useEffect(() => {
    const expRef = experienceGridRef.current;
    const projRef = projectsGridRef.current;
    const eduRef = educationGridRef.current;

    const onExpScroll = () => handleScroll(experienceGridRef, setCanScrollExpLeft, setCanScrollExpRight, setActiveExpIndex);
    const onProjScroll = () => handleScroll(projectsGridRef, setCanScrollProjLeft, setCanScrollProjRight, setActiveProjIndex);
    const onEduScroll = () => handleScroll(educationGridRef, setCanScrollEduLeft, setCanScrollEduRight, setActiveEduIndex);

    if (expRef) {
      expRef.addEventListener("scroll", onExpScroll);
      handleScroll(experienceGridRef, setCanScrollExpLeft, setCanScrollExpRight, setActiveExpIndex);
    }
    if (projRef) {
      projRef.addEventListener("scroll", onProjScroll);
      handleScroll(projectsGridRef, setCanScrollProjLeft, setCanScrollProjRight, setActiveProjIndex);
    }
    if (eduRef) {
      eduRef.addEventListener("scroll", onEduScroll);
      handleScroll(educationGridRef, setCanScrollEduLeft, setCanScrollEduRight, setActiveEduIndex);
    }

    // IntersectionObserver for contact section
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactActive(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    // Observer to track which section is active for card highlighting
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sectionIds = ["first-section", "experience", "projects"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      if (expRef) expRef.removeEventListener("scroll", onExpScroll);
      if (projRef) projRef.removeEventListener("scroll", onProjScroll);
      if (eduRef) eduRef.removeEventListener("scroll", onEduScroll);
      if (contactRef.current) observer.unobserve(contactRef.current);
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.unobserve(el);
      });
    };
  }, [setIsContactActive]);

  return (
    <main>
      <div className={`${styles.overlay} ${isProfileHovered ? styles.active : ''}`} />
      {/* Hero Section */}
      <section id="intro" className={`${styles.hero} section-header`}>
        <h1>HELLO, I&apos;M</h1>
        <h1>DAVID FEIJÓO</h1>
        <h3>MSc STUDENT AT DTU</h3>

        {/* Arrow icon positioned at the bottom to scroll to the Education Section */}
        <div className={styles.arrowContainer}>
          <IoIosArrowDown className={styles.arrow} onClick={() => scrollToSection("first-section")} />
        </div>
      </section>

      {/* Education Section */}
      <section id="first-section" className={`${styles.educationSection} ${styles.section}`}>
        <h2>Education</h2>
        <div className={styles.educationWrapper}>
          {/* Left Arrow */}
          <div 
            className={styles.arrowLeftContainer} 
            style={{ visibility: canScrollEduLeft ? 'visible' : 'hidden', pointerEvents: canScrollEduLeft ? 'auto' : 'none' }}
          >
            <IoIosArrowBack className={styles.arrowLeft} onClick={() => scrollGrid(educationGridRef, -600)} />
          </div>

          <div className={styles.educationGrid} ref={educationGridRef}>
            {/* University 1: DTU */}
            <div className={`${styles.educationCard} ${activeSection === "first-section" && activeEduIndex === 0 ? styles.activeCard : ''}`}>
              <div className={styles.educationLogoContainer}>
                <img src="/dtuLogo.png" alt="DTU Logo" className={`${styles.educationLogo} ${styles.light}`} />
                <img src="/dtuLogo.png" alt="DTU Logo" className={`${styles.educationLogo} ${styles.dark}`} />
              </div>
              <img src="/DTU.jpg" alt="DTU" className={styles.educationImage} />
              <p className={styles.educationText}>
                <strong>Denmark&apos;s Technical University (DTU)</strong>
                <br />
                MSc in Mathematical Modelling and Computation.
              </p>
            </div>

            {/* University 2: UNSW */}
            <div className={`${styles.educationCard} ${activeSection === "first-section" && activeEduIndex === 1 ? styles.activeCard : ''}`}>
              <div className={styles.educationLogoContainer}>
                <img src="/unswLogo.png" alt="UNSW Logo" className={`${styles.educationLogo} ${styles.light}`} />
                <img src="/unswLogoWhite.png" alt="UNSW Logo" className={`${styles.educationLogo} ${styles.dark}`} />
              </div>
              <img src="/unsw.jpg" alt="UNSW" className={styles.educationImage} />
              <p className={styles.educationText}>
                <strong>University of New South Wales (UNSW)</strong>
                <br />
                Bachelor&apos;s Thesis in Signal Processing and Machine Learning.
              </p>
            </div>

            {/* University 3: UPC */}
            <div className={`${styles.educationCard} ${activeSection === "first-section" && activeEduIndex === 2 ? styles.activeCard : ''}`}>
              <div className={styles.educationLogoContainer}>
                <img src="/upcLogo.png" alt="UPC Logo" className={`${styles.educationLogo} ${styles.light}`} />
                <img src="/upcLogo.png" alt="UPC Logo" className={`${styles.educationLogo} ${styles.dark}`} />
              </div>
              <img src="/upc.jpg" alt="UPC" className={styles.educationImage} />
              <p className={styles.educationText}>
                <strong>Polytechnical University of Catalonia (UPC)</strong>
                BSc in Telecom Technologies Engineering
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <div 
            className={styles.arrowRightContainer}
            style={{ visibility: canScrollEduRight ? 'visible' : 'hidden', pointerEvents: canScrollEduRight ? 'auto' : 'none' }}
          >
            <IoIosArrowForward className={styles.arrowRight} onClick={() => scrollGrid(educationGridRef, 600)} />
          </div>
        </div>

        {/* Arrow icon for scrolling to the Experience Section */}
        <div className={styles.arrowContainer}>
          <IoIosArrowDown className={styles.arrow} onClick={() => scrollToSection("experience")} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={styles.projectsSection}>
        <h2>Experience</h2>
        <div className={styles.projectWrapper}>
          <div 
            className={styles.arrowLeftContainer} 
            style={{ visibility: canScrollExpLeft ? 'visible' : 'hidden', pointerEvents: canScrollExpLeft ? 'auto' : 'none' }}
          >
            <IoIosArrowBack className={styles.arrowLeft} onClick={() => scrollGrid(experienceGridRef, -600)} />
          </div>

          <div className={styles.projectsGrid} ref={experienceGridRef}>
            {/* ECB */}
            <div className={`${styles.projectCard} ${activeSection === "experience" && activeExpIndex === 0 ? styles.activeCard : ''}`}>
              <div className={styles.projectLogoContainer}>
                <img src="/ecbLogo.png" alt="ECB Logo" className={`${styles.projectLogo} ${styles.light}`} />
                <img src="/ecbLogo.png" alt="ECB Logo" className={`${styles.projectLogo} ${styles.dark}`} />
              </div>
              <img src="/ecbImage.jpeg" alt="ECB" className={styles.projectImage} />
              <p className={styles.projectText}>
                <strong>Technology and Innovation <br />at ECB</strong>
                <br />
                Working at the Technology and Innovation Division.
              </p>
            </div>

            {/* CERN */}
            <div className={`${styles.projectCard} ${activeSection === "experience" && activeExpIndex === 1 ? styles.activeCard : ''}`}>
              <div className={styles.projectLogoContainer}>
                <img src="/cern.png" alt="CERN Logo" className={`${styles.projectLogo} ${styles.light}`} />
                <img src="/cern.png" alt="CERN Logo" className={`${styles.projectLogo} ${styles.dark}`} />
              </div>
              <img src="/cernImage.jpeg" alt="CERN" className={styles.projectImage} />
              <p className={styles.projectText}>
                <strong>CBI at CERN</strong>
                <br />
                European Union project called Challenge Based Innovation.
              </p>
            </div>

            {/* Overlay */}
            <div className={`${styles.projectCard} ${activeSection === "experience" && activeExpIndex === 2 ? styles.activeCard : ''}`}>
              <div className={styles.projectLogoContainer}>
                <img src="/overlay.png" alt="Overlay Logo" className={`${styles.projectLogo} ${styles.light}`} />
                <img src="/overlay.png" alt="Overlay Logo" className={`${styles.projectLogo} ${styles.dark}`} />
              </div>
              <img src="/overlayImage.png" alt="Overlay" className={styles.projectImage} />
              <p className={styles.projectText}>
                <strong>Overlay</strong>
                <br />
                Early-stage start-up developing multi-agentic systems.
              </p>
            </div>
          </div>

          <div 
            className={styles.arrowRightContainer}
            style={{ visibility: canScrollExpRight ? 'visible' : 'hidden', pointerEvents: canScrollExpRight ? 'auto' : 'none' }}
          >
            <IoIosArrowForward className={styles.arrowRight} onClick={() => scrollGrid(experienceGridRef, 600)} />
          </div>
        </div>
        <div className={styles.arrowContainer}>
          <IoIosArrowDown className={styles.arrow} onClick={() => scrollToSection("projects")} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.projectsSection}>
        <h2>Projects</h2>
        <div className={styles.projectWrapper}>
          <div 
            className={styles.arrowLeftContainer} 
            style={{ visibility: canScrollProjLeft ? 'visible' : 'hidden', pointerEvents: canScrollProjLeft ? 'auto' : 'none' }}
          >
            <IoIosArrowBack className={styles.arrowLeft} onClick={() => scrollGrid(projectsGridRef, -600)} />
          </div>

          <div className={styles.projectsGrid} ref={projectsGridRef}>
            {/* SER */}
            <div className={`${styles.projectCard} ${activeSection === "projects" && activeProjIndex === 0 ? styles.activeCard : ''}`}>
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
            <div className={`${styles.projectCard} ${activeSection === "projects" && activeProjIndex === 1 ? styles.activeCard : ''}`}>
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
            style={{ visibility: canScrollProjRight ? 'visible' : 'hidden', pointerEvents: canScrollProjRight ? 'auto' : 'none' }}
          >
            <IoIosArrowForward className={styles.arrowRight} onClick={() => scrollGrid(projectsGridRef, 600)} />
          </div>
        </div>
        <div className={styles.arrowContainer}>
          <IoIosArrowDown className={styles.arrow} onClick={() => scrollToSection("contact")} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className={styles.contactSection}>
        <h2>Contact</h2>
        <div className={styles.contactInfo}>
          <div 
            className={`${styles.contactImageContainer} ${isProfileHovered ? styles.enlarged : ''}`}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
          >
            <img src="/Foto perfil.png" alt="David Feijóo" className={styles.contactImage} />
          </div>
          <a href="mailto:dfeijoo2001@gmail.com" className={styles.contactEmail} >
            dfeijoo2001@gmail.com
          </a>

          <div className={styles.contactSocials}>
            <a href="/cv.pdf" download className={styles.contactCV}>
              <AiOutlineCloudDownload className={styles.contactSocialIcon} />
              <span>CV</span>
            </a>
            <a href="https://www.linkedin.com/in/david-feijoo-rodriguez" target="_blank" rel="noopener noreferrer" >
              <FaLinkedin className={styles.contactSocialIcon} />
            </a>
            <a href="https://github.com/davidfeijoo" target="_blank" rel="noopener noreferrer" >
              <FaGithub className={styles.contactSocialIcon} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
