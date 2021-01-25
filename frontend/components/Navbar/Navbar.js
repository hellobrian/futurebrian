import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
// import useMedia from 'use-media'
import classnames from "classnames";

import { IconMenu, IconClose } from "@/components/Icons/Icons";
import styles from "./Navbar.module.css";

export function Navbar({ variant }) {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <header
      className={classnames(styles.Navbar, {
        [styles.Tablet]: variant === "tablet",
      })}
    >
      <nav>
        {router.pathname === "/menu" ? (
          <button type="button" className={styles.Button} onClick={goBack}>
            <IconClose />
          </button>
        ) : (
          <Link href="/menu">
            <a className={styles.Button}>
              <IconMenu />
            </a>
          </Link>
        )}
        <h1
          className={classnames(styles.Heading, {
            [styles.Tablet]: variant === "tablet",
          })}
        >
          <Link href="/">
            <a className="ff--bebas" title="click here to go home">
              futurebrian
            </a>
          </Link>
        </h1>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  variant: PropTypes.oneOf(["mobile", "tablet", "desktop"]),
};
