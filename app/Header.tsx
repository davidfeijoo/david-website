'use client';

import styles from "@/styles/Header.module.css";  // Import the CSS module
import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons


export default function Header() {

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load the saved theme from localStorage
  useEffect(() => {
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

  return (
    <nav className={styles.nav}>
      {/* Logo Section */}
      <ul className={styles.navList}>
        <a href="/" className={styles.navLink}>
          DAVID FEIJÓO
        </a>
      </ul>

      {/* Navigation Links */}
      <ul className={styles.navList}>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? <FaMoon />: <FaSun />}
        </button>
        <li>
          <a href="/education" className={styles.navLink}>
            EDUCATION
          </a>
        </li>
        <li>
          <a href="/projects" className={styles.navLink}>
            WORK & PROJECTS
          </a>
        </li>
        <li>
          <a href="/" className={styles.navLink}>
            CONTACT
          </a>
        </li>
      </ul>
    </nav>
  );
}

