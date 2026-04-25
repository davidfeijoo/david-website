'use client';
import React from 'react';
import styles from '@/styles/Main.module.css';

// Data Definition
const educations = [
  {
    id: 'dtu',
    institution: 'Denmark\'s Technical University (DTU)',
    degree: 'MSc in Mathematical Modelling and Computation',
    date: 'Jan 2024 - Jul 2026',
    logo: '/dtuLogo.png',
    placeholderImg: '/DTU.jpg', // Placeholder for big image
    details: {
      focus: 'Advanced mathematical methods, quantitative optimization, and computational techniques.',
      keyAreas: 'Quantitative Methods & Optimization (Integer Programming, Metaheuristics), Computational Modelling (HPC, AI/ML in Python), Advanced Dynamical Systems, and Project/Innovation (X-Tech Entrepreneurship).',
      skills: 'Analytics, Data Analytics, Data Analysis.'
    }
  },
  {
    id: 'unsw',
    institution: 'University of New South Wales (UNSW)',
    degree: 'Thesis in Speech Emotion Recognition, Deep Learning',
    date: 'Feb 2023 - Jul 2023',
    logo: '/unswLogo.png',
    placeholderImg: '/unsw.jpg', // Placeholder for big image
    details: {
      focus: 'Bachelor\'s Thesis in Signal Processing and Machine Learning.',
      keyAreas: 'Deep Learning, Speech Processing, Research Methodology.',
      skills: 'Speech Recognition, Research, HCI, PyTorch, Python.'
    }
  },
  {
    id: 'upc',
    institution: 'Polytechnical University of Catalonia (UPC)',
    degree: 'BSc in Telecommunications Technologies Engineering',
    date: 'Sep 2019 - Jul 2023',
    logo: '/upcLogo.png',
    placeholderImg: '/upc.jpg', // Placeholder for big image
    details: {
      focus: 'Foundational engineering principles in telecommunications and graduated with Honors.',
      keyAreas: 'Signal Processing, Network Architecture, Statistical Analysis, and Software Engineering.',
      skills: 'Problem Solving, Java, MATLAB, C, HTML, Python, Statistics.'
    }
  }
];

export default function EducationPage() {

  return (
    <main className="min-h-screen bg-[var(--background-color)] pb-24">
      
      {/* 1. Overview Section with Vertical Cards (Home Style) */}
      <section className={`${styles.educationSection} !h-auto py-24`}>
        <h2>Education</h2>
        <div className={styles.educationGrid}>
          {/* University 1: UPC */}
          <a href="#upc" className={styles.educationCard}>
            <div className={styles.educationLogoContainer}>
              <img src="/upcLogo.png" alt="UPC Logo" className={`${styles.educationLogo} ${styles.light}`} />
              <img src="/upcLogo.png" alt="UPC Logo" className={`${styles.educationLogo} ${styles.dark}`} />
            </div>
            <img src="/upc.jpg" alt="UPC" className={styles.educationImage} />
            <p className={styles.educationText}>
              <strong>Polytechnical University of Catalonia (UPC)</strong>
              BSc in Telecommunications Technologies Engineering, graduated with Honors.
            </p>
          </a>

          {/* University 2: UNSW */}
          <a href="#unsw" className={styles.educationCard}>
            <div className={styles.educationLogoContainer}>
              <img src="/unswLogo.png" alt="UNSW Logo" className={`${styles.educationLogo} ${styles.light}`} />
              <img src="/unswLogoWhite.png" alt="UNSW Logo" className={`${styles.educationLogo} ${styles.dark}`} />
            </div>
            <img src="/unsw.jpg" alt="UNSW" className={styles.educationImage} />
            <p className={styles.educationText}>
              <strong>University of New South Wales (UNSW)</strong>
              Bachelor&apos;s Thesis in Signal Processing and Machine Learning.
            </p>
          </a>

          {/* University 3: DTU */}
          <a href="#dtu" className={styles.educationCard}>
            <div className={styles.educationLogoContainer}>
              <img src="/dtuLogo.png" alt="DTU Logo" className={`${styles.educationLogo} ${styles.light}`} />
              <img src="/dtuLogo.png" alt="DTU Logo" className={`${styles.educationLogo} ${styles.dark}`} />
            </div>
            <img src="/DTU.jpg" alt="DTU" className={styles.educationImage} />
            <p className={styles.educationText}>
              <strong>Denmark&apos;s Technical University (DTU)</strong>
              MSc in Mathematical Modelling and Computation.
            </p>
          </a>
        </div>
      </section>

      {/* 2. Detailed Horizontal Alternating Blocks */}
      <div className={styles.educationDetailsContainer}>
        {educations.map((edu) => (
          <section key={edu.id} id={edu.id} className={styles.educationDetailsBlock}>
            
            {/* Text Side */}
            <div className={styles.detailsContent}>
              <div className={styles.detailsHeader}>
                <h3>{edu.institution}</h3>
                <div className={styles.detailsMeta}>
                  <span className={styles.detailsDegree}>{edu.degree}</span>
                  <span className={styles.detailsDate}>{edu.date}</span>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                {edu.details.focus && (
                  <div className={styles.detailsCard}>
                    <h4>Focus</h4>
                    <p>{edu.details.focus}</p>
                  </div>
                )}
                
                {edu.details.keyAreas && (
                  <div className={styles.detailsCard}>
                    <h4>Key Areas</h4>
                    <p>{edu.details.keyAreas}</p>
                  </div>
                )}
                
                {edu.details.skills && (
                  <div className={styles.detailsCard}>
                    <h4>Skills</h4>
                    <p>{edu.details.skills}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Image Side (Placeholder) */}
            <div className={styles.detailsImageContainer}>
              {/* This is a placeholder for your big images. 
                  Currently using the existing images but you can swap these paths easily later. */}
              <img src={edu.placeholderImg} alt={edu.institution} className={styles.detailsImage} />
              {!edu.placeholderImg && <span>Image Placeholder</span>}
            </div>

          </section>
        ))}
      </div>
    </main>
  );
}
