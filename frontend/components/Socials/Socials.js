import styles from "./Socials.module.css";

export function Socials() {
  return (
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
  );
}
