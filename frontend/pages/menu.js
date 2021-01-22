import Link from "next/link";
import { Layout } from "@/components/Layout/Layout";
import styles from "../styles/Menu.module.css";

export default function Menu() {
  return (
    <Layout className={styles.Menu}>
      <ul className={styles.List}>
        <li>
          <Link href="/keycaps">
            <a>Keycaps</a>
          </Link>
        </li>
        <li>
          <Link href="/keyboards">
            <a>Keyboards</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
