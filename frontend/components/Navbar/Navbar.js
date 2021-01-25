import Link from "next/link";
import { useRouter } from "next/router";
import { IconMenu, IconClose } from "@/components/Icons/Icons";
import styles from "./Navbar.module.css";

export function Navbar() {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <header className={styles.Navbar}>
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
        <h1 className={styles.Heading}>
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
