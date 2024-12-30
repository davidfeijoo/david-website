import { FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineCloudDownload } from "react-icons/ai";
import styles from "@/styles/Sidebar.module.css";  // Import the CSS module


export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
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