'use client';

import styles from "@/styles/Header.module.css";  // Import the CSS module
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import MobileMenu from './MobileMenu';

export default function Header() {

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load the saved theme from localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTheme(savedTheme as 'light' | 'dark');
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!mounted) {
    return (
      <nav className={styles.nav}>
        {/* Logo Section */}
        <ul className={styles.navList}>
          <Link href="/#intro" className={styles.navLink}>
            DAVID FEIJÓO
          </Link>
        </ul>

        {/* Navigation Links Placeholder */}
        <ul className={styles.navList}>
          <div className={styles.themeTogglePlaceholder} style={{ width: '24px', height: '24px' }} />
          <li className={styles.hideMobile}>
            <Link href="/education" className={styles.navLink}>
              EDUCATION
            </Link>
          </li>
          <li className={styles.hideMobile}>
            <Link href="/projects" className={styles.navLink}>
              WORK & PROJECTS
            </Link>
          </li>
          <li className={styles.hideMobile}>
            <Link href="/#contact" className={styles.navLink}>
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <>
      <nav className={styles.nav}>
        {/* Logo Section */}
        <ul className={styles.navList}>
          <Link href="/#intro" className={styles.navLink}>
            DAVID FEIJÓO
          </Link>
        </ul>

        {/* Navigation Links */}
        <ul className={styles.navList}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <li className={styles.hideMobile}>
            <Link href="/education" className={styles.navLink}>
              EDUCATION
            </Link>
          </li>
          <li className={styles.hideMobile}>
            <Link href="/projects" className={styles.navLink}>
              WORK & PROJECTS
            </Link>
          </li>
          <li className={styles.hideMobile}>
            <Link href="/#contact" className={styles.navLink}>
              CONTACT
            </Link>
          </li>
          <button className={styles.menuButton} onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </ul>
      </nav>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} toggleTheme={toggleTheme} theme={theme} />
    </>
  );
}
