import { Layout } from "@/components/Layout/Layout";
import styles from "../styles/Menu.module.css";

export default function Menu() {
  return (
    <Layout className={styles.Menu}>
      <ul className={styles.List}>
        <li>Keycaps</li>
        <li>Keyboards</li>
        <li>Blog</li>
        <li>About</li>
      </ul>
    </Layout>
  );
}
