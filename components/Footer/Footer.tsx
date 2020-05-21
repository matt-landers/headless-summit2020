import { Logo } from "../Logo/Logo";

import styles from "./Footer.module.scss";

export const Footer = () => (
  <nav className={styles.footer}>
    <div className={styles.linkContainer}>
      <Logo />
    </div>
    <div className={styles.legalContainer}>
      <span className={`${styles.copyright}`}>
        © 2013–2020 WP Engine, Inc. All Rights Reserved.
      </span>
      <span className={`${styles.legal} fe`}>
        WP ENGINE®, TORQUE®, EVERCACHE®, and the cog logo service marks are
        owned by WP Engine, Inc.
      </span>
    </div>
  </nav>
);
