'use client';

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineCloudDownload } from "react-icons/ai";
import styles from "@/styles/Sidebar.module.css";  // Import the CSS module
import { useScroll } from "./ScrollContext";

export default function Sidebar() {
  const { isContactActive } = useScroll();

  return (
    <div className={`${styles.sidebar} ${isContactActive ? styles.hidden : ''}`}>
      {/* CV Downloader icon */}
      <a href="/cv.pdf" download className={styles.cvDownloadLink}>
        <AiOutlineCloudDownload className={styles.cvIcon} />
        <span>CV</span>
      </a>
      <a href="https://www.linkedin.com/in/david-feijoo-rodriguez" target="_blank" rel="noopener noreferrer" >
        <FaLinkedin className={styles.icon} />
      </a>
      <a href="https://github.com/davidfeijoo" target="_blank" rel="noopener noreferrer" >
        <FaGithub className={styles.icon} />
      </a>
    </div>
  );
}