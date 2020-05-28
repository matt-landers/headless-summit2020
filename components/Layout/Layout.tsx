import { Navbar } from "../Navbar/Navbar";
import Head from "next/head";
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
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      />
    </Head>
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
