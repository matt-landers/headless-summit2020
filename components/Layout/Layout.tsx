import { Navbar } from "../Navbar/Navbar";

import styles from "./Layout.module.scss";
import { Footer } from "../Footer/Footer";

interface LayoutProps {
  className?: string;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
}) => (
  <div className={styles.layout}>
    <Navbar />
    <div className={`${styles.main} ${className}`}>{children}</div>
    <div className={styles.backgroundContainer}>
      <div className={styles.backgroundGradient}></div>
      <div className={styles.imageContainer}>
        <img className={styles.backgroundImage} src="/images/vaporwave.png" />
      </div>
    </div>
    <Footer />
  </div>
);
