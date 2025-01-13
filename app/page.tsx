'use client'; // Mark the component as a client component
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from '@/styles/Main.module.css'; // Import the new module-specific styles

export default function Home() {

  const projectsGridRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Function to scroll to a specific section by ID
  const scrollToSection = (sectionId: string) => {
    const nextSection = document.getElementById(sectionId); // Get the section by ID
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" }); // Smooth scroll to the section, aligned to the top
    }
  };
  const scrollRight = () => {
    const projectsGrid = document.querySelector(`.${styles.projectsGrid}`);
    if (projectsGrid) {
      projectsGrid.scrollBy({ left: 600, behavior: "smooth" }); // Adjust the scroll value as needed
    }
  };
  const scrollLeft = () => {
    const projectsGrid = document.querySelector(`.${styles.projectsGrid}`);
    if (projectsGrid) {
      projectsGrid.scrollBy({ left: -600, behavior: "smooth" }); // Negative value for left scroll
    }
  };

  // Update the visibility of arrows based on the scroll position
  const handleScroll = () => {
    if (projectsGridRef.current) {
      const scrollLeftPosition = projectsGridRef.current.scrollLeft;
      const scrollWidth = projectsGridRef.current.scrollWidth;
      const clientWidth = projectsGridRef.current.clientWidth;

      // Show or hide left arrow
      setCanScrollLeft(scrollLeftPosition > 0);
      // Show or hide right arrow
      setCanScrollRight(scrollLeftPosition < scrollWidth - clientWidth);
    }
  };

  // Use effect to add event listener for scroll
  useEffect(() => {
    if (projectsGridRef.current) {
      projectsGridRef.current.addEventListener("scroll", handleScroll);
      // Clean up the event listener
      return () => {
        if (projectsGridRef.current) {
          projectsGridRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className={`${styles.hero} section-header`}>
        <h1>HELLO, I'M</h1>
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
        <div className={styles.educationGrid}>
          {/* University 1 */}
          <div className={styles.educationCard}>
            <div className={styles.educationLogoContainer}>
              <img
                src="/upcLogo.png"
                alt="UPC Logo"
                className={`${styles.educationLogo} ${styles.light}`}
              />
              <img
                src="/upcLogo.png"
                alt="UPC Logo"
                className={`${styles.educationLogo} ${styles.dark}`}
              />
            </div>
            <img
              src="/upc.jpg"
              alt="Polytechnical University of Catalonia (UPC)"
              className={styles.educationImage}
            />
            <p className={styles.educationText}>
              <strong>Polytechnical University of Catalonia (UPC)</strong>
              <br />
              BSc in Telecommunications Technologies Engineering, graduated with Honors.
            </p>
          </div>

          {/* University 2 */}
          <div className={styles.educationCard}>
            <div className={styles.educationLogoContainer}>
              <img
                src="/unswLogo.png"
                alt="UNSW Logo"
                className={`${styles.educationLogo} ${styles.light}`}
              />
              <img
                src="/unswLogoWhite.png"
                alt="UNSW Logo"
                className={`${styles.educationLogo} ${styles.dark}`}
              />
            </div>
            <img
              src="/unsw.jpg"
              alt="University of New South Wales"
              className={styles.educationImage}
            />
            <p className={styles.educationText}>
              <strong>University of New South Wales (UNSW)</strong>
              <br />
              Bachelor's Thesis in Signal Processing and Machine Learning.
            </p>
          </div>

          {/* University 3 */}
          <div className={styles.educationCard}>
            <div className={styles.educationLogoContainer}>
              <img
                src="/dtuLogo.png"
                alt="DTU Logo"
                className={`${styles.educationLogo} ${styles.light}`}
              />
              <img
                src="/dtuLogo.png"
                alt="DTU Logo"
                className={`${styles.educationLogo} ${styles.dark}`}
              />
            </div>
            <img
              src="/dtu.jpg"
              alt="Denmark's Technical University (DTU)"
              className={styles.educationImage}
            />
            <p className={styles.educationText}>
              <strong>Denmark's Technical University (DTU)</strong>
              <br />
              MSc in Mathematical Modelling and Computation.
            </p>
          </div>
        </div>

        {/* Arrow icon for scrolling to the Projects Section */}
        <div className={styles.arrowContainer}>
          <IoIosArrowDown className={styles.arrow} onClick={() => scrollToSection("projects")} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.projectsSection}>
        <h2>Projects</h2>
        <div className={styles.projectWrapper}>
          <div className={styles.projectsGrid} ref={projectsGridRef}>

            {/* Project 1 */}
            <div className={styles.projectCard}>
              <div className={styles.projectLogoContainer}>
                <img
                  src="/cern.png" // Placeholder logo
                  alt="Cern Ideasquare Logo"
                  className={`${styles.projectLogo} ${styles.light}`}
                />
                <img
                  src="/cern.png" // Placeholder logo
                  alt="Cern Ideasquare Logo"
                  className={`${styles.projectLogo} ${styles.dark}`}
                />
              </div>
              <img
                src="/cernImage.jpeg" // Placeholder image
                alt="Cern Image"
                className={styles.projectImage}
              />
              <p className={styles.projectText}>
                <strong>CBI at CERN</strong>
                <br />
                European Union project called Challenge Based Innovation (CBI) to find new ways to tackle systemic challenges.
              </p>
            </div>

            {/* Project 2 */}
            <div className={styles.projectCard}>
              <div className={styles.projectLogoContainer}>
                <img
                  src="/overlay.png" // Placeholder logo
                  alt="Overlay Logo light"
                  className={`${styles.projectLogo} ${styles.light}`}
                />
                <img
                  src="/overlay.png" // Placeholder logo
                  alt="Overlay Logo Dark"
                  className={`${styles.projectLogo} ${styles.dark}`}
                />
              </div>
              <img
                src="/overlayImage.png" // Placeholder image
                alt="Overlay image"
                className={styles.projectImage}
              />
              <p className={styles.projectText}>
                <strong>Overlay</strong>
                <br />
                Early-stage start-up where we develop multi-agentic systems that integrate with our customers' software.
              </p>
            </div>
      
            {/* Project 3 */}
            <div className={styles.projectCard}>
              <div className={styles.projectLogoContainer}>
                <img
                  src="/unswLogo.png" // Placeholder logo
                  alt="SER Project Logo"
                  className={`${styles.projectLogo} ${styles.light}`}
                />
                <img
                  src="/unswLogoWhite.png" // Placeholder logo
                  alt="SER Project Logo"
                  className={`${styles.projectLogo} ${styles.dark}`}
                />
              </div>
              <img
                src="/serImage.png" // Placeholder image
                alt="Speech Emotion recognition"
                className={styles.projectImage}
              />
              <p className={styles.projectText}>
                <strong>Speech Emotion Recognition</strong>
                <br />
                Comparative analysis of methods for the adaptation of Speech Emotion Recognition (SER) systems
              </p>
            </div>

            {/* Project 4 */}
            <div className={styles.projectCard}>
              <div className={styles.projectLogoContainer}>
                <img
                  src="/uniConnectLogo.png" // Placeholder logo
                  alt="UniConnect Project Logo"
                  className={`${styles.projectLogo} ${styles.light}`}
                />
                <img
                  src="/uniConnectLogo.png" // Placeholder logo
                  alt="UniConnect Project Logo"
                  className={`${styles.projectLogo} ${styles.dark}`}
                />
              </div>
              <img
                src="/uniConnectImage.png" // Placeholder image
                alt="UniConnect Project"
                className={styles.projectImage}
              />
              <p className={styles.projectText}>
                <strong>UniConnect</strong>
                <br />
                Website for students to access quality resources and content.
              </p>
            </div>

            {/* Project 5 */}
            <div className={styles.projectCard}>
              <div className={styles.projectLogoContainer}>
                <img
                  src="/uniraid.png" // Placeholder logo
                  alt="UniRaid black"
                  className={`${styles.projectLogo} ${styles.light}`}
                />
                <img
                  src="/uniraid.png" // Placeholder logo
                  alt="Uniraid white"
                  className={`${styles.projectLogo} ${styles.dark}`}
                />
              </div>
              <img
                src="/uniraidImage.jpg" // Placeholder image
                alt="UniRaid Image"
                className={styles.projectImage}
              />
              <p className={styles.projectText}>
                <strong>Uniraid Volunteering</strong>
                <br />
                Volunteer in this humanitarian rally that takes place in Morocco.
                Brought +100 kg of school supplies and other material.
              </p>
            </div>
          </div> {/* End of projectsGrid */}
          
          {/* Left Arrow for scrolling to the left */}
          {canScrollLeft && (
            <div className={styles.arrowLeftContainer}>
              <IoIosArrowBack className={styles.arrowLeft} onClick={scrollLeft} />
            </div>
          )}

          {/* Right Arrow for scrolling to the right */}
          {canScrollRight && (
            <div className={styles.arrowRightContainer}>
              <IoIosArrowForward className={styles.arrowRight} onClick={scrollRight} />
            </div>
          )}
        </div>

        {/* Arrow icon for scrolling to the next section */}
        <div className={styles.arrowContainer}>
          <IoIosArrowDown className={styles.arrow} onClick={() => scrollToSection("contact")} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contactSection}>
        <h2>Contact Me :)</h2>
        <div className={styles.contactInfo}>
          <div className={styles.contactImageContainer}>
            <img src="/miFoto.jpg" alt="David Feijóo" className={styles.contactImage} />
          </div>
          <a href="mailto:dfeijoo2001@gmail.com" className={styles.contactEmail} >
            dfeijoo2001@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
