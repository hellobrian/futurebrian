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
          <a className="ff--bebas" title="click here to go home">
            futurebrian
          </a>
        </Link>
      </h1>

      <nav>
        {router.pathname === "/menu" ? (
          <button
            type="button"
            className={styles.Toggle}
            onClick={() => router.back()}
          >
            <IconClose className={styles.IconClose}></IconClose>
          </button>
        ) : (
          <Link href="/menu">
            <a className={styles.Toggle}>
              <IconMenu className={styles.IconMenu}></IconMenu>
            </a>
          </Link>
        )}
      </nav>
    </header>
  );
}
