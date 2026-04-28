'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Main.module.css';
import { 
  SiPython, SiJulia, SiPytorch, SiLangchain, 
  SiGooglecloud, SiOpenai, SiC 
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { 
  FaDatabase, FaChartBar, FaBrain, FaNetworkWired, FaBroadcastTower, 
  FaWaveSquare, FaCode, FaCogs, FaTasks, FaChartLine, FaLightbulb,
  FaVideo, FaJava
} from 'react-icons/fa';
import { MdSettingsInputAntenna, MdFiberSmartRecord } from 'react-icons/md';

// Data Definition
const educations = [
  {
    id: 'dtu',
    institution: 'Technical University of Denmark (DTU)',
    degree: 'MSc in Mathematical Modelling and Computation',
    date: 'Jan 2024 - Jun 2026',
    logo: '/dtuLogo.png',
    placeholderImg: '/DTU.jpg',
    focus: "Master's degree connecting applied mathematics with a practical approach to optimization and Machine Learning.",
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Julia', icon: <SiJulia /> },
      { name: 'PyTorch', icon: <SiPytorch /> },
      { name: 'LangChain', icon: <SiLangchain /> },
      { name: 'NLP & LLMs', icon: <SiOpenai /> },
      { name: 'Azure / GCP', icon: <VscAzure /> },
      { name: 'Data Eng.', icon: <FaDatabase /> },
      { name: 'Quant Modeling', icon: <FaChartBar /> },
    ],
    keyAreas: [
      {
        title: "Master's Thesis - with ECB",
        desc: "Applying advanced NLP to extract geopolitical risk indicators from unstructured text and analyze their impact on global energy markets."
      },
      {
        title: "Quantitative Optimization",
        desc: "Courses in Integer Programming, Metaheuristics and Teaching Assistant for 'Introduction to Operations Research,' guiding students through complex optimization frameworks."
      },
      {
        title: "Computational Modelling",
        desc: "Advanced dynamical systems and high-performance computing."
      },
      {
        title: "Projects & Innovation",
        desc: "X-Tech Entrepreneurship and translating mathematical models into real-world business applications."
      }
    ]
  },
  {
    id: 'unsw',
    institution: 'University of New South Wales (UNSW)',
    degree: "Bachelor's Thesis in Signal Processing and Machine Learning",
    date: 'Jan 2023 - Jul 2023',
    logo: '/unswLogo.png',
    placeholderImg: '/unsw.jpg',
    focus: 'Independent research and development of deep neural networks for Speech Emotion Recognition (SER) within the UNSW Signal Processing Laboratory.',
    keyAreas: [
      {
        title: 'Machine & Deep Learning',
        desc: 'Constructed and trained robust Deep Neural Networks (DNNs) from scratch to automatically classify emotions, implementing adaptation techniques to personalize models to specific target speakers.',
        skills: ['Python', 'PyTorch', 'Deep Neural Networks', 'HPC (NCI Gadi)']
      },
      {
        title: 'Signal Processing',
        desc: 'Managed and processed over 16,000 acoustic segments, extracting and standardizing thousands of high-dimensional audio features to capture the paralinguistic elements of speech.',
        skills: ['Speech Emotion Recognition', 'Audio Feature Extraction (openSMILE)', 'Data Processing Pipelines']
      },
      {
        title: 'Quantitative Techniques',
        desc: 'Implemented advanced mathematical models to compare complex data distributions, measure divergence, and optimize system performance through dimensionality reduction.',
        skills: ['PCA', 'Gaussian Mixture Models (GMM)', 'Kullback-Leibler Divergence (KLD)']
      }
    ]
  },
  {
    id: 'upc',
    institution: 'Polytechnical University of Catalonia (UPC)',
    degree: 'BSc in Telecommunications Technologies and Services Engineering',
    date: 'Sep 2019 - Jul 2023',
    logo: '/upcLogo.png',
    placeholderImg: '/upc.jpg',
    focus: 'A comprehensive engineering foundation combining telecommunications infrastructure, advanced signal processing, software development, and ICT management.',
    keyAreas: [
      {
        title: 'Telecommunications',
        desc: 'Mastered the fundamentals of physical data transmission, earning honours in Smart Optical Networks and Fundamentals of Physics, alongside rigorous coursework in Digital Transmission, Antennas, and Optical Communications.',
        skills: [
          { name: 'Smart Optical Networks', icon: <MdFiberSmartRecord /> },
          { name: 'Digital Transmission', icon: <FaBroadcastTower /> },
          { name: 'Antennas', icon: <MdSettingsInputAntenna /> },
          { name: 'Optical Communications', icon: <FaNetworkWired /> },
        ]
      },
      {
        title: 'Signal Processing',
        desc: 'Developed a strong mathematical foundation in data and signal analysis, achieving honours in Audiovisual Processing and extensively utilizing MATLAB for complex signal manipulation across multiple degree subjects.',
        skills: [
          { name: 'MATLAB', icon: <FaChartBar /> },
          { name: 'Audiovisual Processing', icon: <FaVideo /> },
          { name: 'Digital Signal Processing (DSP)', icon: <FaWaveSquare /> },
        ]
      },
      {
        title: 'Software Engineering',
        desc: 'Built a robust technical base in core engineering principles and software development, highlighted by achieving the maximum grade in Python programming and demonstrating high proficiency in Object-Oriented Programming.',
        skills: [
          { name: 'Python', icon: <SiPython /> },
          { name: 'C', icon: <SiC /> },
          { name: 'Java', icon: <FaJava /> },
          { name: 'OOP', icon: <FaCode /> },
        ]
      },
      {
        title: 'Economy & ICT Management',
        desc: 'Acquired essential business and operational competencies to bridge technical engineering with strategic business goals through dedicated coursework in Economy, Management, and ICT Operations.',
        skills: [
          { name: 'ICT Management', icon: <FaTasks /> },
          { name: 'Economy & Management', icon: <FaChartLine /> },
        ]
      }
    ]
  }
];

export default function EducationPage() {
  const educationGridRef = useRef<HTMLDivElement | null>(null);
  const [activeEduIndex, setActiveEduIndex] = useState(-1);

  const handleScroll = () => {
    if (educationGridRef.current && window.innerWidth <= 768) {
      const container = educationGridRef.current;
      const scrollLeftPosition = container.scrollLeft;
      const clientWidth = container.clientWidth;
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

      setActiveEduIndex(closestIndex);
    } else {
      setActiveEduIndex(-1);
    }
  };

  useEffect(() => {
    const eduRef = educationGridRef.current;
    if (eduRef) {
      eduRef.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }
    return () => {
      if (eduRef) {
        eduRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background-color)] pb-24">
      
      {/* 1. Overview Section with Vertical Cards (Home Style) */}
      <section className={styles.educationSection}>
        <div className={styles.educationGrid} ref={educationGridRef}>
          {/* University 1: DTU */}
          <a href="#dtu" className={`${styles.educationCard} ${activeEduIndex === 0 ? styles.activeCard : ''}`}>
            <div className={styles.educationLogoContainer}>
              <img src="/dtuLogo.png" alt="DTU Logo" className={`${styles.educationLogo} ${styles.light}`} />
              <img src="/dtuLogo.png" alt="DTU Logo" className={`${styles.educationLogo} ${styles.dark}`} />
            </div>
            <img src="/DTU.jpg" alt="DTU" className={styles.educationImage} />
            <p className={styles.educationText}>
              <strong>Technical University of Denmark (DTU)</strong>
              MSc in Mathematical Modelling and Computation.
            </p>
          </a>

          {/* University 2: UNSW */}
          <a href="#unsw" className={`${styles.educationCard} ${activeEduIndex === 1 ? styles.activeCard : ''}`}>
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

          {/* University 3: UPC */}
          <a href="#upc" className={`${styles.educationCard} ${activeEduIndex === 2 ? styles.activeCard : ''}`}>
            <div className={styles.educationLogoContainer}>
              <img src="/upcLogo.png" alt="UPC Logo" className={`${styles.educationLogo} ${styles.light}`} />
              <img src="/upcLogo.png" alt="UPC Logo" className={`${styles.educationLogo} ${styles.dark}`} />
            </div>
            <img src="/upc.jpg" alt="UPC" className={styles.educationImage} />
            <p className={styles.educationText}>
              <strong>Polytechnical University of Catalonia (UPC)</strong>
              BSc in Telecom Technologies Engineering            
            </p>
          </a>
        </div>
      </section>

      {/* 2. Detailed Horizontal Alternating Blocks */}
      <div className={styles.educationDetailsContainer}>
        {educations.map((edu) => (
          <section key={edu.id} id={edu.id} className={styles.educationDetailsBlock}>
            
            {/* Detailed view for DTU */}
            {edu.id === 'dtu' ? (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className={styles.detailsHeader}>
                  <h3>{edu.institution}</h3>
                  <div className={styles.detailsMeta}>
                    <span className={styles.detailsDegree}>{edu.degree}</span>
                    <span className={styles.detailsDate}>{edu.date}</span>
                  </div>
                </div>

                {/* 2-column layout: Left (Focus) | Right (Picture) */}
                <div className={styles.dtuTwoCol}>
                  {/* Left Column */}
                  <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                    <img
                      src={edu.placeholderImg}
                      alt={edu.institution}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Right Column */}
                  <div className={styles.detailsCard}>
                    <h4>Focus</h4>
                    <p style={{ lineHeight: 1.6 }}>{edu.focus}</p>
                  </div>

                </div>

                {/* Tech Skills (Full Width, 3 Columns) */}
                <div className={styles.detailsCard}>
                  <h4 style={{ marginBottom: '1.5rem' }}>Tech Skills</h4>
                  <div className={styles.techSkillsGrid}>
                    {[
                      {
                        title: 'Languages',
                        skills: [
                          { name: 'Python', icon: <SiPython /> },
                          { name: 'Julia', icon: <SiJulia /> },
                        ]
                      },
                      {
                        title: 'AI & Modelling',
                        skills: [
                          { name: 'NLP & LLMs', icon: <SiOpenai /> },
                          { name: 'LangChain', icon: <SiLangchain /> },
                          { name: 'Quantitative Modeling', icon: <FaChartBar /> },
                        ]
                      },
                      {
                        title: 'Cloud & Infrastructure',
                        skills: [
                          { name: 'Data Engineering', icon: <FaDatabase /> },
                          { name: 'Microsoft Azure', icon: <VscAzure /> },
                          { name: 'Google Cloud Platform', icon: <SiGooglecloud /> },
                        ]
                      }
                    ].map((col, colIdx) => (
                      <div key={colIdx}>
                        <h5 style={{
                          color: 'var(--secondary-color-strong)',
                          fontWeight: 700,
                          marginBottom: '1rem',
                          fontSize: '0.85rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          borderBottom: '2px solid var(--secondary-color-light)',
                          paddingBottom: '0.5rem'
                        }}>{col.title}</h5>
                        {col.skills.map((skill, skillIdx) => (
                          <div key={skillIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                            <span style={{ fontSize: '1.5rem', color: 'var(--secondary-color-strong)', flexShrink: 0 }}>{skill.icon}</span>
                            <span style={{ fontSize: '0.9rem' }}>{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Areas (Full Width) */}
                <div className={styles.detailsCard}>
                  <h4 style={{ marginBottom: '1.5rem' }}>Key Areas</h4>
                  <div className={styles.dtuTwoCol}>
                    {edu.keyAreas?.map((area, idx) => (
                      <div key={idx} style={{ borderLeft: '4px solid var(--secondary-color-strong)', paddingLeft: '1.25rem' }}>
                        <h5 style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{area.title}</h5>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.9 }}>{area.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : edu.id === 'unsw' ? (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className={styles.detailsHeader}>
                  <h3>{edu.institution}</h3>
                  <div className={styles.detailsMeta}>
                    <span className={styles.detailsDegree}>{edu.degree}</span>
                    <span className={styles.detailsDate}>{edu.date}</span>
                  </div>
                </div>

                {/* 2-column layout: Left (Focus) | Right (Picture) */}
                <div className={styles.dtuTwoCol}>
                  <div className={styles.detailsCard}>
                    <h4>Focus</h4>
                    <p style={{ lineHeight: 1.6 }}>{edu.focus}</p>
                  </div>
                  <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                    <img
                      src={edu.placeholderImg}
                      alt={edu.institution}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* Key Areas (Full Width, 3 Columns) */}
                <div className={styles.detailsCard}>
                  <h4 style={{ marginBottom: '1.5rem' }}>Key Areas</h4>
                  <div className={styles.techSkillsGrid}>
                    {edu.keyAreas?.map((area, idx) => (
                      <div key={idx} style={{ borderLeft: '4px solid var(--secondary-color-strong)', paddingLeft: '1.25rem' }}>
                        <h5 style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: '1rem', marginBottom: '0.75rem' }}>{area.title}</h5>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '0.75rem' }}>{area.desc}</p>
                        {'skills' in area && Array.isArray(area.skills) && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {(area.skills as string[]).map((skill, sIdx) => (
                              <span key={sIdx} style={{
                                fontSize: '0.75rem',
                                background: 'var(--background-color)',
                                color: 'var(--secondary-color-strong)',
                                border: '1px solid var(--secondary-color-light)',
                                borderRadius: '20px',
                                padding: '0.2rem 0.65rem',
                                fontWeight: 500
                              }}>{skill}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : edu.id === 'upc' ? (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className={styles.detailsHeader}>
                  <h3>{edu.institution}</h3>
                  <div className={styles.detailsMeta}>
                    <span className={styles.detailsDegree}>{edu.degree}</span>
                    <span className={styles.detailsDate}>{edu.date}</span>
                  </div>
                </div>

                {/* 2-column layout: Left (Picture) | Right (Focus) */}
                <div className={styles.dtuTwoCol}>
                  {/* Left Column */}
                  <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                    <img
                      src={edu.placeholderImg}
                      alt={edu.institution}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Right Column */}
                  <div className={styles.detailsCard}>
                    <h4>Focus</h4>
                    <p style={{ lineHeight: 1.6 }}>{edu.focus}</p>
                  </div>
                </div>

                {/* Key Areas & Skills (Full Width, 2x2 Grid) */}
                <div className={styles.detailsCard}>
                  <h4 style={{ marginBottom: '1.5rem' }}>Key Areas & Skills</h4>
                  <div className={styles.dtuTwoCol}>
                    {edu.keyAreas?.map((area, idx) => (
                      <div key={idx} style={{ borderLeft: '4px solid var(--secondary-color-strong)', paddingLeft: '1.25rem' }}>
                        <h5 style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{area.title}</h5>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '1rem' }}>{area.desc}</p>
                        {'skills' in area && Array.isArray(area.skills) && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                            {(area.skills as any[]).map((skill, sIdx) => (
                              <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem', color: 'var(--secondary-color-strong)', display: 'flex', alignItems: 'center' }}>{skill.icon}</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{skill.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Original layout for other institutions */
              <>
                {/* Text Side */}
                <div className={styles.detailsContent}>
                  <div className={styles.detailsHeader}>
                    <h3>{edu.institution}</h3>
                    <div className={styles.detailsMeta}>
                      <span className={styles.detailsDegree}>{edu.details?.degree || edu.degree}</span>
                      <span className={styles.detailsDate}>{edu.date}</span>
                    </div>
                  </div>

                  <div className={styles.detailsGrid}>
                    {edu.details?.focus && (
                      <div className={styles.detailsCard}>
                        <h4>Focus</h4>
                        <p>{edu.details.focus}</p>
                      </div>
                    )}
                    
                    {edu.details?.keyAreas && (
                      <div className={styles.detailsCard}>
                        <h4>Key Areas</h4>
                        <p>{edu.details.keyAreas}</p>
                      </div>
                    )}
                    
                    {edu.details?.skills && (
                      <div className={styles.detailsCard}>
                        <h4>Skills</h4>
                        <p>{edu.details.skills}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Side (Placeholder) */}
                <div className={styles.detailsImageContainer}>
                  <img src={edu.placeholderImg} alt={edu.institution} className={styles.detailsImage} />
                  {!edu.placeholderImg && <span>Image Placeholder</span>}
                </div>
              </>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
