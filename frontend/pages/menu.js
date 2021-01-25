// import Link from "next/link";
import { Layout } from "@/components/Layout/Layout";
import styles from "../styles/Menu.module.css";

export default function Menu() {
  return (
    <Layout className={styles.Menu}>
      <ul className={styles.List}>
        <li>
          <a href="https://www.instagram.com/futurebrian_/">instagram</a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCQGq3OYhoZJrlRaemSCe6Zg">
            youtube
          </a>
        </li>
        <li>
          <a href="https://www.reddit.com/user/futurebrian">reddit</a>
        </li>
      </ul>
    </Layout>
  );
}
