import styles from "@/styles/Footer.module.css";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";  // Import icons

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2025 David Feijóo</p>
      <div className={styles.footerContent}>
        <p className={styles.footerItem}>
          <FaEnvelope className={styles.icon} />
          <a href="mailto:dfeijoo2001@gmail.com" className={styles.footerLink}>dfeijoo2001@gmail.com</a>
        </p>
        <p className={styles.footerItem}>
          <FaLinkedin className={styles.icon} />
          <a href="https://www.linkedin.com/in/david-feijoo-rodriguez" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>LinkedIn</a>
        </p>
        <p className={styles.footerItem}>
          <FaGithub className={styles.icon} />
          <a href="https://github.com/davidfeijoo" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a>
        </p>
      </div>
    </footer>
  );
}
