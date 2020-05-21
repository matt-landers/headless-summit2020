import { Logo } from "../Logo/Logo";

import styles from "./Navbar.module.scss";

export const Navbar = () => (
  <nav className={styles.navbar}>
    <Logo />
  </nav>
);
