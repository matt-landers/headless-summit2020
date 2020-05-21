import { Navbar } from "../Navbar/Navbar";

import styles from "./Layout.module.scss";

interface LayoutProps {
  className?: string;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
}) => (
  <div className={styles.layout}>
    <Navbar />
    <main className={`${styles.main} ${className}`}>{children}</main>
    <div className={styles.backgroundContainer}>
      <div className={styles.backgroundGradient}></div>
      <div className={styles.backgroundImage}>
        <img className={styles.backgroundImage} src="/images/vaporwave.png" />
      </div>
    </div>
  </div>
);
