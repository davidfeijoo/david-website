'use client';
import React from 'react';
import styles from '@/styles/Main.module.css';

// Data Definition
const educations = [
  {
    id: 'dtu',
    institution: 'DTU - Technical University of Denmark',
    degree: 'MSc in Mathematical Modelling and Computation',
    date: 'Jan 2024 - Jul 2026',
    details: {
      focus: 'Advanced mathematical methods, quantitative optimization, and computational techniques.',
      keyAreas: 'Quantitative Methods & Optimization (Integer Programming, Metaheuristics), Computational Modelling (HPC, AI/ML in Python), Advanced Dynamical Systems, and Project/Innovation (X-Tech Entrepreneurship).',
      skills: 'Analytics, Data Analytics, Data Analysis.'
    },
    images: [
      { src: "/dtu.jpg", caption: "DTU Campus" },
      { src: "/dtuLogo.png", caption: "DTU Logo" },
      { src: "/dtu.jpg", caption: "Mathematical Modelling" },
      { src: "/dtuLogo.png", caption: "Innovation at DTU" },
    ]
  },
  {
    id: 'unsw',
    institution: 'UNSW - University of New South Wales',
    degree: 'Thesis in Speech Emotion Recognition, Deep Learning',
    date: 'Feb 2023 - Jul 2023',
    details: {
      focus: null,
      keyAreas: null,
      skills: 'Speech Recognition, Research, HCI, PyTorch, Python.'
    },
    images: [
      { src: "/unsw.jpg", caption: "UNSW Campus" },
      { src: "/unswLogo.png", caption: "UNSW Logo" },
      { src: "/unsw.jpg", caption: "Deep Learning Lab" },
      { src: "/unswLogoWhite.png", caption: "Research Thesis" },
      { src: "/unsw.jpg", caption: "Sydney" },
      { src: "/unswLogo.png", caption: "Signal Processing" },
    ]
  },
  {
    id: 'upc',
    institution: 'UPC - ETSETB TelecomBCN',
    degree: 'Bachelor’s degree in Telecommunication Technologies and Services Engineering',
    date: 'Sep 2019 - Jul 2023',
    details: {
      focus: null,
      keyAreas: null,
      skills: 'Problem Solving, Java, MATLAB, C, HTML, Python, Statistics.'
    },
    images: [
      { src: "/upc.jpg", caption: "UPC Campus" },
      { src: "/upcLogo.png", caption: "UPC Logo" },
      { src: "/upc.jpg", caption: "Telecommunications" },
      { src: "/upcLogo.png", caption: "Engineering" },
      { src: "/upc.jpg", caption: "Barcelona" },
      { src: "/upcLogo.png", caption: "Networking" },
      { src: "/upc.jpg", caption: "Laboratory" },
      { src: "/upcLogo.png", caption: "Graduation" },
      { src: "/upc.jpg", caption: "Campus Life" },
    ]
  }
];

export default function EducationPage() {

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background-color)] pb-24">
      
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
              Bachelor&apos;s Thesis in Signal Processing and Machine Learning.
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
              <strong>Denmark&apos;s Technical University (DTU)</strong>
              <br />
              MSc in Mathematical Modelling and Computation.
            </p>
          </div>
        </div>
      </section>

      {/* Part 2: Detailed Sections */}
      <div className="space-y-32">
        {educations.map((edu) => (
          <section key={edu.id} id={edu.id} className="container mx-auto px-4 scroll-mt-24">
            {/* Header */}
            <div className="mb-10 border-b border-gray-200 pb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{edu.institution}</h2>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                <p className="text-xl text-blue-600 font-medium mt-2 md:mt-0">{edu.degree}</p>
                <span className="text-gray-500 font-mono mt-2 md:mt-0 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {edu.date}
                </span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
              
              {/* Text Content */}
              <div className="space-y-8 text-lg leading-relaxed text-gray-700">
                {edu.details.focus && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Focus
                    </h4>
                    <p>{edu.details.focus}</p>
                  </div>
                )}
                
                {edu.details.keyAreas && (
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      Key Areas
                    </h4>
                    <p>{edu.details.keyAreas}</p>
                  </div>
                )}
                
                {edu.details.skills && (
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                      Skills
                    </h4>
                    <p>{edu.details.skills}</p>
                  </div>
                )}
                
                {/* Fallback description if minimal details */}
                {!edu.details.focus && !edu.details.keyAreas && (
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <p>Completed {edu.degree} at {edu.institution}. Focused on core engineering principles and specialized research.</p>
                   </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
