import Link from "next/link";
import { useRouter } from "next/router";
import { IconMenu, IconClose } from "@/components/Icons/Icons";
import styles from "./Navbar.module.css";

export function Navbar() {
  const router = useRouter();

  return (
    <header className={styles.Navbar}>
      <h1>
        <Link href="/">
          <a>futurebrian</a>
        </Link>
      </h1>
      <nav>
        {router.pathname === "/" ? (
          <Link href="/menu">
            <a className={styles.Toggle}>
              <IconMenu className={styles.IconMenu}></IconMenu>
            </a>
          </Link>
        ) : (
          <Link href="/">
            <a className={styles.Toggle}>
              <IconClose className={styles.IconClose}></IconClose>
            </a>
          </Link>
        )}
      </nav>
    </header>
  );
}
