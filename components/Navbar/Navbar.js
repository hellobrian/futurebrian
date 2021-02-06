import PropTypes from "prop-types";
import Link from "next/link";

import { DarkToggle } from "@/components/DarkToggle/DarkToggle";
import { IconMenu, IconClose } from "@/components/Icons/Icons";
import styles from "./Navbar.module.css";

export function Navbar({ toggleMenu, isMenuOpen, variant = "mobile" }) {
  return (
    <header data-variant={variant} className={`${styles.Navbar}`}>
      <nav>
        {variant === "desktop" ? null : (
          <>
            {isMenuOpen ? (
              <button
                type="button"
                className={styles.Button}
                onClick={toggleMenu}
              >
                <IconClose />
              </button>
            ) : (
              <button
                type="button"
                className={styles.Button}
                onClick={toggleMenu}
              >
                <IconMenu />
              </button>
            )}
          </>
        )}

        <h1 className={styles.Heading}>
          <Link href="/">
            <a className="ff--bebas fancy-link" title="click here to go home">
              futurebrian
            </a>
          </Link>
        </h1>
        <div className={styles.DarkToggle}>
          <DarkToggle></DarkToggle>
        </div>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(["mobile", "tablet", "desktop"]),
};
