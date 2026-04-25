'use client';

import Link from 'next/link';
import { FaLinkedin, FaGithub, FaSun, FaMoon } from 'react-icons/fa';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { useEffect } from 'react';
import styles from '@/styles/MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

export default function MobileMenu({ isOpen, onClose, toggleTheme, theme }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/education" className={styles.navLink} onClick={onClose}>
              EDUCATION
            </Link>
          </li>
          <li>
            <Link href="/projects" className={styles.navLink} onClick={onClose}>
              WORK & PROJECTS
            </Link>
          </li>
          <li>
            <Link href="/#contact" className={styles.navLink} onClick={onClose}>
              CONTACT
            </Link>
          </li>
        </ul>

        <div className={styles.divider} />

        <div className={styles.socialLinks}>
          <a href="/cv.pdf" download className={styles.socialLink}>
            <AiOutlineCloudDownload />
            <span>CV</span>
          </a>
          <a href="https://www.linkedin.com/in/david-feijoo-rodriguez" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/davidfeijoo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaGithub />
            <span>GitHub</span>
          </a>
        </div>
      </nav>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
    </div>
  );
}
